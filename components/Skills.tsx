const skills: Record<string, string> = {
    "languages": "TypeScript, C++",
    "frameworks": "React, Next.js, Express, NestJS, Node.js",
    "databases": "MongoDB, PostgreSQL, Elasticsearch, Redis, ClickHouse",
    "devops": "CI/CD, Docker, K8s, AWS, Azure",
};

export default function Skills() {
    return (
        <section style={{ marginBottom: "2rem" }}>
            <p className="section-label">skills</p>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                    {Object.entries(skills).map(([key, val]) => (
                        <tr key={key} className="skill-row">
                            <td className="skill-key">{key}</td>
                            <td className="skill-val">{val}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
