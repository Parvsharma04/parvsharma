export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
}

export const posts: Post[] = [
    {
        slug: "processes-threads-and-database-connections",
        title: "Processes, Threads, and How Postgres and MySQL Handle Connections",
        date: "2026-11-25",
        excerpt:
            "Why Postgres forks a whole OS process per connection, why MySQL uses threads, what happens when hundreds of pods hammer them, and why connection pooling is basically mandatory.",
        content: `
At the end of my [year-one retrospective](/blog/year-one-backend-dev), I wrote that I wanted to stop taking databases for granted. I had spent months writing dynamic queries for ClickHouse, wiring microservices across Kubernetes pods, and tossing connection strings into environment variables. But when it came to relational databases like Postgres and MySQL, they still felt a bit like magical black boxes: you open a TCP connection, fire a query, and data comes back.

Then last week, I was reading [PlanetScale's post on processes and threads](https://planetscale.com/blog/processes-and-threads) by Ben Dicken. It is one of those articles that makes you stop, stare at your terminal, and think: wait, that is what is actually happening under the hood?

Why does PostgreSQL spin up an entire OS process for every single connection? Why does MySQL prefer threads? And what actually happens inside the server's CPU and memory when 2,000 microservice pods suddenly try to talk to them all at once?

Here is what I learned, broken down without the textbook snooze-fest.

## The ground floor: Process vs. Thread

Before touching databases, you have to peel back the OS layer. Your computer fundamentally has a CPU with execution cores, RAM, and an operating system kernel acting as traffic control.

When you run code, the OS wraps it in one of two abstractions:

**A Process** is an isolated, independent workspace. It gets its own virtual memory address space (its own page tables), open file descriptors, registers, and execution stack. The OS enforces a strict wall around it: Process A cannot touch Process B's memory without explicit IPC (Inter-Process Communication) like shared memory segments or sockets.

To create a process in Linux, the OS calls \`fork()\`. While modern kernels use Copy-on-Write (COW) so memory isn't instantly duplicated bit-for-bit, \`fork()\` is still a heavyweight operation. The kernel has to allocate page tables, copy descriptors, and track process state.

Even worse is switching between two processes (a process context switch). When the CPU stops running Process A to run Process B, it has to save registers, transition to kernel mode, swap memory page tables, and invalidate the CPU's Translation Lookaside Buffer (TLB). That takes around ~5 microseconds. It sounds fast until you realize a CPU could have executed tens of thousands of instructions in that window.

**A Thread** is an execution context *inside* a process. A single process can have dozens or hundreds of threads.

The crucial difference: all threads inside a process share the same virtual address space, the same heap, the same global memory, and the same open files. Each thread only gets its own register state and call stack.

Spawning a thread via \`pthread_create()\` (which wraps Linux's \`clone()\` syscall with \`CLONE_VM\` and \`CLONE_FILES\`) is significantly lighter. And switching between threads inside the same process takes around ~1 microsecond—roughly 4 to 5 times faster than switching processes. Why? Because the virtual memory address space doesn't change. The CPU doesn't have to flush the TLB or reload page tables. It just swaps registers and points the instruction pointer somewhere else in the same memory pool.

## PostgreSQL: The Process-per-connection model

Here is where it gets interesting for databases.

PostgreSQL is built around a **process-per-connection** architecture.

When Postgres boots up, it runs a master supervisor process called \`postmaster\`.

Every single time your application opens a new connection to Postgres, \`postmaster\` calls \`fork()\` and creates a brand new, dedicated child backend process. If you SSH into a server running Postgres and type \`ps aux | grep postgres\`, you will see a list of separate OS processes for each client: \`postgres: app_user main_db 10.0.1.12(54321) idle\`.

Why on earth would Postgres do this instead of using threads?

It goes back to the late 1980s and early 1990s at UC Berkeley when POSTGRES was created. Back then, thread implementations across Unix variants were notoriously inconsistent, buggy, or non-existent. Processes were rock solid.

More importantly: **fault isolation**. If a connection runs a buggy query, triggers a segmentation fault in a custom C extension, or leaks memory, only that specific child process crashes. The \`postmaster\` process detects the death, cleans up shared memory, and the rest of the database continues running undisturbed. One rogue query cannot corrupt the memory space of another client.

The tradeoff? Spawning an OS process takes real time, and each process needs dedicated memory (stack, per-connection buffers like \`work_mem\`, connection metadata). Even an idle Postgres connection can tie up 5MB to 10MB+ of RAM just sitting there doing nothing.

## MySQL: The Thread-per-connection model

MySQL took the other fork in the road.

MySQL runs as a single unified process daemon: \`mysqld\`.

Instead of forking a child process for every client, MySQL creates a new POSIX thread per connection (or pulls an idle thread from its internal thread cache).

Because all client connections are just threads within the single \`mysqld\` process:
- They all share the same address space.
- They share the global InnoDB buffer pool (\`innodb_buffer_pool_size\`), table caches, and lock tables directly.
- Spawning a thread is much cheaper than \`fork()\`, and context switching between threads incurs less overhead.
- Memory overhead per idle connection is substantially lower.

The catch? Lack of memory isolation. Because everything runs in one address space, if a thread causes fatal memory corruption or crashes the process, the entire \`mysqld\` daemon goes down, taking all client connections with it.

## The breaking point: Massive connection surges

When you are developing locally or running a small monolith with 20 connections, both models feel instantaneous. You won't notice a difference.

The cracks appear when you work in modern cloud architectures. Think about what happens when you have 15 microservices running across a Kubernetes cluster, each autoscaling to 20 or 50 pods (something I've seen firsthand with HPAs scaling during peak traffic). Or worse, a burst of serverless functions (like AWS Lambda) spinning up 2,000 concurrent instances.

If each pod or lambda opens 10 to 20 connections directly to the database, you suddenly have 3,000 to 10,000 simultaneous connections.

Here is what happens under the hood:

**In Postgres:**
- 5,000 connections = 5,000 separate Linux processes.
- **Memory explosion:** 5,000 processes × 10MB per connection = 50 GB of RAM gone *just holding idle connection state*. That is memory stolen directly from the OS page cache and Postgres shared buffers, where your actual table data should be cached.
- **The fork storm:** Rapidly opening and closing connections means the server is hammered with constant \`fork()\` system calls, burning CPU cycles on process setup instead of querying data.
- **Context switching death spiral:** A standard database server might have 16 or 32 physical CPU cores. Trying to juggle thousands of active processes across 16 cores means the Linux scheduler is constantly interrupting processes to switch contexts. The CPU spends a huge percentage of its clock cycles saving registers, flushing TLBs, and swapping page tables. Throughput plummets, latency skyrockets, and the server appears frozen despite high CPU utilization.

**In MySQL:**
- MySQL fares better with connection establishment because creating threads is lighter than forking processes.
- But it is not a silver bullet. 5,000 threads will still overwhelm the OS scheduler and lead to massive mutex contention inside InnoDB's internal lock structures. Threads still need stack space and per-thread memory buffers.

**The physical reality:**
No matter which database you use, the hardware has a hard physical limit. If your server has 16 CPU cores, it can only execute 16 instructions in parallel at any given instant. Trying to make 2,000 queries run simultaneously doesn't make things faster; it makes every query 100x slower while waiting in scheduler queues.

## Enter Connection Pooling

This is where connection pooling steps in to rescue the database.

Instead of allowing hundreds of application pods or lambdas to connect straight to the database engine, a connection pooler sits in the middle as an intelligent gatekeeper.

Tools like **PgBouncer** (for Postgres) or application-level poolers (like HikariCP or internal connection pools in Node/Go) solve this problem with a simple concept: **multiplexing**.

Here is how it works:
- Thousands of application clients connect to the pooler. The pooler is designed to hold thousands of cheap, lightweight network sockets open with minimal overhead.
- The pooler maintains a small, fixed pool of actual connections to the database—usually between 20 and 50 connections, carefully tuned to match the database server's CPU core count and I/O capacity.
- The pooler routes incoming queries across those few persistent database connections.

In PgBouncer, the secret sauce is **transaction pooling**. Instead of locking a database connection to an app for its entire lifetime (session pooling), PgBouncer assigns a database connection to a client *only for the exact duration of an active transaction*.

The millisecond the query finishes and issues \`COMMIT\`, PgBouncer snatches that database connection back and immediately hands it to another waiting client. To the application, it looks like it had a dedicated database connection. To Postgres, it only ever has to manage 30 running backend processes.

By capping the connection count at 30 or 50, the OS stops thrashing. Context switches drop. Memory stays free for the buffer cache. The CPU cores stay pegged on actual query work. Counter-intuitively, bottlenecking incoming connections through a small pool often makes your database run 2x to 5x *faster* under heavy load than letting everyone connect at once.

## What clicked for me

Reading about this on PlanetScale made me realize how easy it is as backend developers to live in application-land and forget the machine.

We configure pool sizes and max connection limits in our YAML files or ORMs, but behind those numbers are physical CPU cores, page tables, cache lines, and system calls like \`fork()\` and \`clone()\`.

Postgres chose bulletproof process isolation, accepting higher memory and context-switching overhead that practically mandates a tool like PgBouncer in production. MySQL chose the speed and efficiency of shared-memory threads, accepting the risk of shared-process crashes.

Neither choice is wrong—they are just two different engineering tradeoffs made decades ago that still shape how we build and scale backend systems today.

If you haven't read Ben Dicken's post on PlanetScale yet, go check out [Processes and Threads](https://planetscale.com/blog/processes-and-threads). It is rare to find an article that bridges low-level OS mechanics and high-level database architecture so clearly.
        `.trim(),
    },
    {
        slug: "i-despise-linkedin",
        title: "I Despise LinkedIn",
        date: "2026-11-01",
        excerpt:
            "Influencers, fake news, ghost jobs, and AI slop.",
        content: `
LinkedIn was supposed to be a professional networking space but it has lost it's sense of professionalism.

## Problems

- memes
- influencers
- spam job postings
- spam media reports
- political posts
- religious posts
- AI slop
- endless ad placements
- feed suggestions that also bubbles up AI slop

I open it everyday to see what's happening, then close it after one scroll because it has become unbearable.
        `.trim(),
    },
    {
        slug: "my-pr-ritual",
        title: "My PR Ritual",
        date: "2026-08-31",
        excerpt:
            "A short checklist I run through before any branch of mine becomes a PR. Long, but it's saved me more than once.",
        content: `
People sometimes ask why my branch-to-merge process has so many steps. Short answer: every step exists because skipping it has bitten me before. Here's the ritual, in order.

## 1. Checkout the right base branch

I checkout from \`master\` or \`release\`, depending on where the change actually needs to land. Branch name follows \`ps/[itemId]/{2-word-brief}\`, e.g. \`ps/1234/slot-ranking\`. Consistent naming makes it obvious what a branch is for, months later.

## 2. Finish the feature

Write the code. No shortcuts here, just build the thing.

## 3. Merge latest master/release into the branch

Before doing anything else, I merge \`origin/master\` (or \`origin/release\`) into my branch. Catching conflicts early, on my machine, is a lot less stressful than catching them mid-PR.

## 4. Lint

Run ESLint. Cheap to run, catches the dumb stuff before a reviewer has to.

## 5. Build

Build the application. If it doesn't build locally, it's not going out.

## 6. Run and dev-test locally

Actually run the app and click through the change. Automated checks don't catch everything; using the feature like a user does still finds things.

## 7. Check the Docker image

Build the image locally with Colima and make sure it comes up clean. No point discovering an image-build issue in CI when it's cheap to catch locally.

## 8. Tests

Run the existing test suite, and write or update tests for whatever I just built.

## 9. Copilot review

Run \`/review\` on the branch before opening the PR. It's not a replacement for a human reviewer, but it catches a decent chunk of issues before anyone else has to spend time on them.

## 10. Open the PR, get a senior to look

Self-review the diff one more time, then open the PR and get someone senior to weigh in.

## 11. Resolve comments

Address feedback, push updates.

## 12. UAT

Test the change on UAT before it goes anywhere near production.

## 13. Merge

Only after all of the above.

## Why bother with all this?

It clears the actionables off a branch one at a time instead of leaving them all until the end, keeps the codebase clean, and meaningfully cuts down the odds of pushing something that breaks. It's a long routine on paper, but in practice most steps take minutes, and the alternative is debugging in production.
        `.trim(),
    },
    {
        slug: "how-pnpm-saved-my-drive",
        title: "How pnpm saved my drive",
        date: "2026-07-12",
        excerpt:
            "I discovered why \'node_modules\' were multiplying across projects and how pnpm's cache model changed everything.",
        content: `
I was moving my projects to my Arch drive and my machine started crawling. Memory spiked, copy processes stalled, and disk usage ballooned. I discovered the obvious-but-ugly truth: every project had its own full copy of node_modules. Millions of files, duplicated across folders.

Then the eureka: what if my machine kept a single cache of packages and projects just referenced that? That thought led me to pnpm — and I was honestly shocked at how neat the internals are.

## The problem, in plain terms

npm and yarn historically duplicate packages per-project. If you have 50 projects using lodash@4.17.21, you get 50 copies. That's a lot of wasted space and slow installs when copying or working with many repos locally.

I wanted a local cache that:
- stores packages once
- reuses them across projects
- keeps installs deterministic and fast

## What pnpm does differently

pnpm uses a content-addressable global store and a clever node_modules layout:

- Packages are unpacked into a central store (by content hash).
- Each project gets a tiny node_modules that contains symlinks (and/or hard links) to the real files in the store, plus a .pnpm directory that maps package versions and dependency graphs.
- The layout avoids deep duplication: files live once on disk, referenced from many projects.

That means moving or cloning projects doesn't copy megabytes of identical files; the OS just points to the same data blocks. Disk usage drops dramatically.

## Quick dive into pnpm internals 

- Content-addressable store: packages are stored by a hash derived from the package tarball. If two packages are identical, they map to the same store entry.

- Virtual store and node_modules layout: pnpm installs packages into a virtual store under the project (commonly node_modules/.pnpm), and exposes flattened access via symlinks in node_modules so Node's resolver still works. The real package code remains in the global store, not duplicated per-project.

- Hard-links / symlinks: pnpm uses hard links when possible (which are very space efficient since they point multiple directory entries to the same inode) and symlinks where needed. Hard links mean the kernel doesn't duplicate file data.

- Strictness & determinism: pnpm enforces a strict dependency tree. If a package expects a dependency that isn\'t explicitly declared, pnpm won\'t silently hoist it. That reduces "it works on my machine" surprises.

- Store per Node version / compatibility: pnpm maintains different store states for varying Node versions/architectures when needed. The store includes metadata about the environment and package build artifacts so incompatible builds don\'t get reused incorrectly.

## Why it felt like magic

From a developer perspective:
- Repeated installs become much faster because packages are fetched once and cached.
- Cloning or moving projects is cheaper because node_modules references the global store rather than duplicating files.
- Disk usage drops dramatically, especially when you work on many projects with overlapping deps.

For me, seeing my drive go from multiple gigabytes of repeated files to a compact store was genuinely surprising.

## When to pick pnpm

- You juggle many projects on the same machine and see duplicated node_modules.
- You want stricter dependency guarantees (fewer hidden hoists).
- You care about disk and install performance without changing how Node resolves modules.

## Caveats and practical tips

- Some native packages that run postinstall builds can produce artifacts sensitive to Node version or OS. pnpm\'s store metadata helps, but occasionally you may need to rebuild per-project.
- If a project expects hoisted packages implicitly, pnpm\'s strictness will surface missing declarations. This is good — it forces correct manifests — but expect small fixes in older projects.
- Use pnpm\'s \`pnpm store prune\` and \`pnpm store path\` commands to inspect and clean up the store.

## Final note — why I felt legitimately excited

This started as a small, selfish wish: save time and disk when moving projects between drives. The solution turned out to be elegantly engineered: pnpm applies content-addressable storage, kernel-level file reuse, and a predictable node_modules layout to solve a mundane but painful problem. It\'s the kind of simple engineering trick that feels obvious in hindsight and delightful in practice.

If you\'re dealing with multiple JS projects on one machine, give pnpm a try. It felt like a tiny systems-level victory — and my drive is still thanking me.
        `.trim(),
    },
    {
        slug: "why-i-love-typescript",
        title: "Why I Love TypeScript",
        date: "2026-02-20",
        excerpt:
            "TypeScript has fundamentally changed how I write JavaScript. Here's what clicked for me.",
        content: `
TypeScript has fundamentally changed how I write JavaScript. At first it felt like extra boilerplate — types everywhere, compilation step, strict mode yelling at me. But after a few months of daily use, I can't imagine going back.

## The key insight

The big shift for me was realizing TypeScript isn't really about catching bugs. It's about *documenting intent*. When I write \`function processOrder(order: Order): Promise<Receipt>\`, I'm telling the next person (often future-me) exactly what this function expects and returns. No need to read through the implementation to understand the contract.

## Real benefits I've noticed

**1. Refactoring without fear.** When I renamed a field across a codebase at Bajaj Finserv Health, TypeScript told me every place that needed updating. No runtime surprises, no grep-and-pray.

**2. Autocomplete that actually works.** When your objects have types, your editor knows what properties exist. This alone speeds up development noticeably.

**3. Catching silly mistakes early.** Passing a string where a number was expected, forgetting to handle the undefined case — these show up at write-time, not in production at 2am.

## The tradeoff

It does add friction. You spend more time on setup. Some libraries have terrible types or none at all. And sometimes the type system fights you when you're doing something creative.

But for any project that'll live longer than a weekend, the investment pays back quickly.

If you haven't tried TypeScript seriously — not just \`.ts\` files with \`any\` everywhere — give it a real shot.
    `.trim(),
    },
    {
        slug: "building-ci-cd-from-scratch",
        title: "Building a CI/CD Pipeline from Scratch",
        date: "2025-12-10",
        excerpt:
            "Notes from setting up CI/CD at Furious Warrior — what I'd do differently.",
        content: `
When I joined Furious Warrior, there was no CI/CD. Deploys were manual, scary, and inconsistent. Here's how I set one up and what I learned.

## The goal

Every push to \`main\` should:
1. Run tests
2. Build the Docker image
3. Push to registry
4. Deploy to the server

Simple in theory. The devil is in the details.

## Tools I chose

- **GitHub Actions** — free for public repos, simple YAML config, tight GitHub integration
- **Docker** — consistent environments between dev and prod
- **AWS ECR + EC2** — image registry and compute

## What went wrong

**Secrets management**: I initially hard-coded environment variables in the workflow file. Bad. Moved everything to GitHub Secrets immediately.

**Long build times**: The initial pipeline took 8 minutes because node_modules wasn't cached. Added caching and got it down to under 2 minutes.

**No rollback plan**: First deploy of a broken image took down the service. Added a health check step and a rollback trigger.

## What I'd do differently

Start with the rollback strategy. It's easy to skip when you're moving fast, and painful to add after the fact.

Also: write the pipeline *before* the app is done. It forces you to think about how the app will run in production from day one.

## Result

After the pipeline was live, deploys went from a 30-minute manual process (test locally, build, ssh, restart) to under 3 minutes, fully automated. Confidence in releases went up significantly.
    `.trim(),
    },
    {
        slug: "year-one-backend-dev",
        title: "Year One as a Backend Dev: What I Actually Learned",
        date: "2026-06-07",
        excerpt:
            "Not a highlight reel. Just an honest look at the first year — the confusion, the small wins, and everything I didn't expect to be hard.",
        content: `
A year in. I keep waiting for the moment where things feel obvious, and it hasn't come yet. But something has shifted. I'm less scared of not knowing things.

Here's what actually stuck.

## Dealing with people is harder than dealing with code

Nobody tells you this going in. I thought the job was writing code. It is, but only partly.

More of it is figuring out what someone actually wants when they describe what they want. Getting on a call where everyone is talking about the same feature and somehow meaning three different things. Learning when to push back on a requirement and when to just ship the thing.

I'm still not great at it. I default to going quiet when I disagree, which doesn't help anyone. But I'm at least aware of it now, which feels like progress. The people who seem to navigate this well aren't necessarily more technical — they just ask more questions and assume less.

## Deployment stopped being magic

For a long time, "deployed to production" was just something that happened, like weather. I didn't understand the chain.

This year, I got thrown into the deep end with Azure pipelines and releases. It was a steep learning curve. I wasn't just building Docker images; I was writing Helm charts and configuring Kubernetes resources—everything from CronJobs and Pod Disruption Budgets (PDBs) to Horizontal Pod Autoscalers (HPAs) and environment value configs. 

I had to figure out secrets management using Azure Key Vault to load sensitive keys securely. I worked on exposing our API endpoints to the public through Azure APIM (API Management) while setting up ingress mappings. 

Inside the cluster, I learned the mechanics of internal pod-to-pod networking. Instead of routing calls out to the public internet, we leveraged internal cluster DNS (\`http://servicename.namespace\`) for low-latency calls between microservices, relying on ingress controllers for SSL offloading at the boundary.

What surprised me is how much of deployment is really about reproducibility and reliability. Once I understood how all these pieces fit together, the magic wore off and was replaced by an appreciation for solid infrastructure.

## High-speed analytics: ClickHouse and complex queries

At some point, I found myself working on a high-speed analytics platform. The goal was to populate our frontend dashboard in near real-time, which meant writing APIs that ran dynamic and extremely complex queries on the fly. 

This is where I got introduced to ClickHouse. 

Before this, I was used to traditional OLTP databases. ClickHouse blew my mind with how fast it could aggregate millions of rows. But it also forced me to think differently about database design. It's columnar, so wide tables are fine, but updates are expensive and joins can easily eat up all your memory if you aren't careful. 

Writing the dynamic query builder on the backend was a puzzle. You have to translate user filters from the frontend into efficient SQL that utilizes ClickHouse's primary keys and projection structures properly. It was the first time I felt the direct link between a design choice in the API code and the database execution plan. It taught me that database performance isn't just the DBA's job; it starts with how the application constructs its queries.

## Mistakes I made along the way (some big some small)

It wasn't all clean learning, though. I made some dumb mistakes early on and still do.

At the beginning, I trusted QA too much. I'd write the code, do a quick sanity check, and throw it over the fence, thinking, "The QAs will catch it if something is wrong." That was lazy. I ended up missing small, tricky details—like minor keyname mismatches in JSON payloads between services that compiled fine but broke at runtime. 

When those slipped into production, it was a wake-up call. 

I realized that handing over buggy code because "QA is there to test it" is a terrible mindset. It wastes everyone's time. Now, my rule is to review and review again. I run thorough developer testing from my end before it ever reaches QA. It taught me real accountability: if my code is going live, the ultimate responsibility for whether it works or breaks is mine, not the QA team's.

## Debugging microservices is a patience exercise

This one humbled me the most at first.

When something breaks in a monolith, the stack trace tells you roughly where to look. When something breaks in a distributed system, you might have four services in the call chain and the error surface in the third one while the actual problem is in the first.

Things changed when we got tracing properly set up. Once we had labels, trace IDs, spans, and transactions flowing cleanly into ELK, the system went from a black box to a map. Visualizing the execution paths meant I could trace where a request was dropping or bottlenecking.

Once the flow clicked, debugging actually became fun—to the point where I was able to help my team and even seniors track down bugs in our microservice layout. It made me realize that debugging isn't just about reading code until you spot the error; it's about building the right visibility so you don't have to guess.

## Where I'm at

I know more than I did. I also have a much longer list of things I want to understand better, which I think is a good sign.

The stuff I want to dig into next: database internals (I want to actually understand indexes, not just use them), system design patterns beyond the textbook examples (like exploring the finer details of multi-tenancy database structures), and getting more deliberate about how I communicate technical decisions.

Year one done. On to the next.
        `.trim(),
    },
];

export function getPostBySlug(slug: string): Post | undefined {
    return posts.find((p) => p.slug === slug);
}
