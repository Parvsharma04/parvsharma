export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
}

export const posts: Post[] = [
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
