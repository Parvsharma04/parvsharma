import { Award } from "lucide-react";

export default function Achievements() {
  const achievements = [
    "Won 1st place in State-Level Web3 Hackathon",
    "Runner Up at HackIndia Web3 Hackathon",
  ];

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Award className="h-6 w-6 text-yellow-500" />
            <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
