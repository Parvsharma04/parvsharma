import { Award } from "lucide-react";

export default function Achievements() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>
      <div className="space-y-4">
        {[
          "Won 1st place in National Coding Competition 2019",
          "Published 3 articles in top tech magazines",
          "Awarded 'Employee of the Year' at Tech Corp in 2021",
          "Contributed to an open-source project with 10k+ stars on GitHub",
        ].map((achievement, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Award className="h-6 w-6 text-yellow-500" />
            <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
