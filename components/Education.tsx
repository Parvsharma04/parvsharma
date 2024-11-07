import { Calendar, GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      <div className="space-y-6">
        {[
          {
            degree: "Master of Science in Computer Science",
            school: "Tech University",
            year: "2018 - 2020",
          },
          {
            degree: "Bachelor of Science in Software Engineering",
            school: "State University",
            year: "2014 - 2018",
          },
        ].map((edu, index) => (
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
