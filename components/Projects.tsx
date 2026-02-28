const projects = [
  {
    name: "TaskBounty",
    url: "https://taskbounty.in",
    github: "https://github.com/Parvsharma04/TaskBounty",
    tags: ["Web3", "Docker", "CI/CD", "PostgreSQL"],
    description:
      "Decentralized platform for client reviews and secure crypto micropayments. Dockerized with efficient CI/CD pipelines.",
  },
  {
    name: "CodeEasy",
    url: "https://code-easy.vercel.app",
    github: "https://github.com/Parvsharma04/code-easy",
    tags: ["React", "UI Components", "Tailwind CSS"],
    description:
      "A comprehensive component library offering a variety of web components designed to make web development easier and faster.",
  },
  {
    name: "CineBrief",
    url: "https://cinebrief-ps.vercel.app",
    github: "https://github.com/Parvsharma04/cinebrief",
    tags: ["Next.js", "API", "Tailwind CSS"],
    description:
      "A platform providing quick and insightful movie summaries at a glance with a clean, responsive interface.",
  },
  {
    name: "WhatAWeather",
    url: "https://whataweather.vercel.app",
    github: "https://github.com/Parvsharma04/whataweather",
    tags: ["React", "Weather API", "Minimal ui"],
    description:
      "A minimalistic weather app providing today’s forecast at a glance! Designed to quickly show current weather details in a clean format.",
  },
  {
    name: "2048",
    url: "https://2048-ps.vercel.app",
    github: "https://github.com/Parvsharma04/2048",
    tags: ["Vanilla JS", "Games"],
    description:
      "A classic 2048 puzzle game built with vanilla JavaScript, featuring smooth animations and responsive controls.",
  },
  {
    name: "FlappyDuck",
    url: "https://flappyduck-ps.vercel.app",
    github: "https://github.com/Parvsharma04/flappyduck",
    tags: ["Vanilla JS", "Canvas"],
    description:
      "A fun, JavaScript-based version of the classic Flappy Bird game! Built to showcase core JavaScript skills in animation and game mechanics.",
  },
];

export default function Projects() {
  return (
    <section className="mb-8">
      <p className="section-label uppercase tracking-wider text-green-400 mb-4 flex items-center gap-2 before:content-['//'] before:opacity-50">
        projects
      </p>
      <div>
        {projects.map((p, i) => (
          <div key={i} className="mb-5">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-gray-100 font-bold">{p.name}</span>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm text-green-400 hover:underline">
                [live]
              </a>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-sm text-green-400 hover:underline">
                [github]
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-1">{p.description}</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {p.tags.map((t) => (
                <span key={t} className="tag text-xs px-1 py-0.5 border border-gray-700 rounded text-gray-600">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
