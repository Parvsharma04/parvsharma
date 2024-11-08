import { Calendar, GraduationCap } from "lucide-react";

export default function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Software Engineering",
      school: "Chitkara University",
      year: "2022 - Present",
    },
    {
      degree: "High School",
      school: "GMSSS, Chandigarh",
      year: "2020 - 2022",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center mb-2">
              <GraduationCap className="mr-2 h-5 w-5" />
              <h3 className="font-medium text-lg">{edu.degree}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {edu.school}
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="mr-2 h-4 w-4" />
              {edu.year}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
