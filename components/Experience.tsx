const experience = [
  {
    company: "Bajaj Finserv Health",
    companyUrl: "https://bajajfinservhealth.in",
    location: "Pune",
    title: "Backend Engineer",
    badge: null,
    period: "May'25 – Present",
    active: true,
    bullets: [
      "Optimized analytical queries over 70M+ records using ClickHouse, reducing response times to ~30ms and contributing to ~₹2.5 Cr (~$300K) in annual revenue growth.",
      "Designed a GenAI-powered appointment support chatbot with dedicated intent classification and RAG layers, reducing per-call token usage from ~7,000 to ~700 (~90%) while automating customer queries and reducing customer support costs by ~30%.",
      "Architected an event-driven hospital integration platform using Factory and Adapter patterns to decouple hospital-specific integration logic, enabling integration across 7 hospitals and processing 100K+ events monthly.",
      "Engineered a large-scale appointment allocation platform for Colgate, supporting operations generating ~₹1 Cr (~$120K) in annual revenue.",
      "Developed EMI financing and lead-generation systems supporting end-to-end customer acquisition workflows and contributing to ~₹80L (~$95K) in annual revenue.",
      "Built doctor slot management, ranking, and checkout workflows, improving doctor discoverability and booking efficiency; the enhanced ranking logic reduced customer escalations and increased successful bookings.",
      "Designed and standardized database architectures and CI/CD workflows across services, eliminating redundant data storage and reducing unnecessary API management deployments, resulting in lower infrastructure costs and more consistent release processes.",
    ],
  },
  // {
  //   company: "Furious Warrior",
  //   companyUrl: "https://furiouswarrior.com",
  //   location: "Remote",
  //   title: "Full Stack Developer Intern",
  //   badge: null,
  //   period: "Nov'24 – Jan'25",
  //   active: false,
  //   bullets: [
  //     "Collaborated on building infrastructure from the ground up.",
  //     "Designed and implemented CI/CD pipelines, deployed using AWS.",
  //     "Boosted business by 160%, contributing to increased revenue.",
  //     "Maintained a clean, readable, and well-structured codebase.",
  //   ],
  // },
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
