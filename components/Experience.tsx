import { Calendar, CheckCircle } from "lucide-react";

export default function Experience() {
  const experience = [
    {
      title: "Founder",
      company: "TaskBounty",
      period: "Sep'24 - Present",
      achievements: [
        "Led a team of developers and designers to build and deliver a high-quality web application",
        "Laid out designs and collaborated with the design team to create pixel-perfect, user-friendly UIs",
        "Conducted regular project meetings to align team objectives, ensuring timely project milestones",
        "Won multiple pitch presentations at hackathons, gaining recognition for innovative project ideas",
        "Built and shipped a full-stack web app with Next.js, Node.js, and PostgreSQL",
        "Maintained clear documentation and streamlined onboarding processes for new team members",
      ],
    },
    {
      title: "Vice President",
      company: "Computer Society of India",
      period: "Aug'23 - Jun'24",
      achievements: [
        "Organized a series of coding competitions with 500+ participants.",
        "Conducted orientation sessions for over 200 new members, introducing them to the society's initiatives",
        "Led multiple bootcamps on web development, attended by 100+ students",
        "Coordinated monthly tech meetups, focusing on trending topics like AI, blockchain, and cloud computing",
        "Initiated a mentorship program connecting junior members with industry professionals",
        "Managed logistics and promotion for a cybersecurity workshop attended by 200+ participants",
        "Spearheaded a week-long coding bootcamp on competitive programming, enhancing members' coding skills",
      ],
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      <div className="space-y-6">
        {experience.map((job, index) => (
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
