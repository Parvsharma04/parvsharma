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
];

export function getPostBySlug(slug: string): Post | undefined {
    return posts.find((p) => p.slug === slug);
}
