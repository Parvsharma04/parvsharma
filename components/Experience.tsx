import { Calendar, CheckCircle } from "lucide-react";

export default function Experience() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      <div className="space-y-6">
        {[
          {
            title: "Senior Developer",
            company: "Tech Corp",
            period: "2020 - Present",
            achievements: [
              "Led a team of 5 developers in creating a high-performance web application",
              "Implemented CI/CD pipeline, reducing deployment time by 40%",
              "Mentored junior developers, improving team productivity by 25%",
            ],
          },
          {
            title: "Web Developer",
            company: "Digital Agency",
            period: "2018 - 2020",
            achievements: [
              "Developed responsive websites for 20+ clients using React and Node.js",
              "Optimized website performance, improving load times by an average of 30%",
              "Collaborated with design team to implement pixel-perfect UIs",
            ],
          },
          {
            title: "Junior Developer",
            company: "Startup Inc",
            period: "2016 - 2018",
            achievements: [
              "Assisted in the development of a mobile app with 100k+ downloads",
              "Implemented unit testing, increasing code coverage from 40% to 80%",
              "Contributed to the company's open-source projects on GitHub",
            ],
          },
        ].map((job, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <h3 className="font-medium text-lg mb-2">{job.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {job.company}
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <Calendar className="mr-2 h-4 w-4" />
              {job.period}
            </div>
            <ul className="list-none space-y-2">
              {job.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-green-500" />
                  <span className="text-sm">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
