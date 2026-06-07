const experience = [
  {
    company: "Bajaj Finserv Health",
    companyUrl: "https://bajajfinservhealth.in",
    location: "Pune",
    title: "Software Development Engineer",
    badge: null,
    period: "May'26 – Present",
    active: true,
    bullets: [
      "Transitioned to a full-time Software Development Engineer role following a successful internship conversion.",
      "Took ownership of the slots microservice, driving critical bug resolutions and system reliability.",
      "Collaborating on designing, building, and optimizing key microservices and backend architectures.",
    ],
  },
  {
    company: "Bajaj Finserv Health",
    companyUrl: "https://bajajfinservhealth.in",
    location: "Pune",
    title: "Full Stack Developer Intern",
    badge: "PPO",
    period: "May'25 – Apr'26",
    active: false,
    bullets: [
      "Developed a fast analytics SaaS, resulting in significant revenue growth.",
      "Built a GenAI chatbot to handle appointment queries, reducing support costs.",
      "Optimized event processing for smoother, error-free workflows.",
      "Contributed to partner integrations with direct business impact.",
    ],
  },
  {
    company: "Furious Warrior",
    companyUrl: "https://furiouswarrior.com",
    location: "Remote",
    title: "Full Stack Developer Intern",
    badge: null,
    period: "Nov'24 – Jan'25",
    active: false,
    bullets: [
      "Collaborated on building infrastructure from the ground up.",
      "Designed and implemented CI/CD pipelines, deployed using AWS.",
      "Boosted business by 160%, contributing to increased revenue.",
      "Maintained a clean, readable, and well-structured codebase.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="mb-8">
      <p className="section-label uppercase tracking-wider text-green-400 mb-4 flex items-center gap-2 before:content-['//'] before:opacity-50">
        experience
      </p>
      <div>
        {experience.map((job, i) => (
          <div key={i} className="mb-7">
            <div className="flex flex-wrap items-baseline gap-2">
              <a
                href={job.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 font-bold text-base"
              >
                {job.company}
              </a>
              <span className="dim text-sm">— {job.location}</span>
              {job.badge && (
                <span className={`tag ${job.active ? "active" : ""}`}>{job.badge}</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {job.title}
              <span className="mx-2 text-gray-600">·</span>
              <span className={job.active ? "text-green-400" : "text-gray-500"}>{job.period}</span>
            </p>
            <ul className="pl-4 mt-2 space-y-1">
              {job.bullets.map((b, j) => (
                <li key={j} className="text-sm text-gray-400 flex items-start">
                  <span className="mr-1 text-gray-600">▸</span>{b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
