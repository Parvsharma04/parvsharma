import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Projects() {
  const projects = [
    {
      id: 1,
      name: "TaskBounty",
      link: "https://taskbounty.in",
      description:
        "A decentralized, blockchain-based platform that allows users to post tasks, set bounties, and complete tasks to earn rewards without relying on a central authority. This project leverages Web3 technologies to provide a secure, user-owned task management system.",
      github: "https://github.com/Parvsharma04/TaskBounty",
      preview: "taskbounty.png",
    },
    {
      id: 2,
      name: "codeeasy",
      link: "https://code-easy.vercel.app",
      description:
        "A comprehensive component library that offers a variety of web components designed to make web development easier and faster. Whether you need navbars, progress bars, pop-overs, accordions, forms, or more, Codeeasy has got you covered. All components are free to use and customize to fit your project needs.",
      github: "https://github.com/Parvsharma04/code-easy",
      preview: "codeeasy.png",
    },
    {
      id: 3,
      name: "flappyduck",
      link: "https://flappyduck-ps.vercel.app",
      description:
        "A fun, JavaScript-based version of the classic Flappy Bird game! Guide the duck through obstacles with precise timing to earn points and see how far you can go. Built to showcase core JavaScript skills in animation, event handling, and game mechanics.",
      github: "https://github.com/Parvsharma04/flappyduck",
      preview: "flappyduck.png",
    },
    {
      id: 4,
      name: "2048",
      link: "https://2048-ps.vercel.app",
      description:
        "A classic 2048 game built with vanilla JavaScript, it recreates the addictive sliding-tile puzzle game, where players combine numbered tiles to reach the elusive 2048 tile. It features smooth animations, responsive controls, and a simple UI for an enjoyable gameplay experience.",
      github: "https://github.com/Parvsharma04/2048",
      preview: "2048.png",
    },
    {
      id: 5,
      name: "CineBrief",
      link: "https://cinebrief-ps.vercel.app",
      description:
        "A classic 2048 game built with vanilla JavaScript, it recreates the addictive sliding-tile puzzle game, where players combine numbered tiles to reach the elusive 2048 tile. It features smooth animations, responsive controls, and a simple UI for an enjoyable gameplay experience.",
      github: "https://github.com/Parvsharma04/cinebrief",
      preview: "cinebrief.png",
    },
    {
      id: 6,
      name: "WhatAWeather",
      link: "https://whataweather.vercel.app",
      description:
        "A minimalistic weather app providing today’s forecast at a glance! WhatAWeather is designed to quickly show current weather details in a clean, easy-to-read format.",
      github: "https://github.com/Parvsharma04/whataweather",
      preview: "whataweather.png",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <Image
              src={`/${project.preview}`}
              alt={`Project ${project.name} preview`}
              width={600}
              height={200}
              className="w-full h-auto"
              quality={100}
            />
            <div className="p-4">
              <h3 className="font-medium mb-2">{project.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>
              <div className="flex space-x-2">
                <Link href={project.github}>
                  <Button variant="outline" size="sm">
                    <Github className="mr-2 h-4 w-4" /> Source
                  </Button>
                </Link>
                <Link href={project.link}>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
