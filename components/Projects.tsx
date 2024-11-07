import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Projects() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((project) => (
          <div
            key={project}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <Image
              src={`/placeholder.svg?height=200&width=400&text=Project+${project}`}
              alt={`Project ${project} preview`}
              width={400}
              height={200}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h3 className="font-medium mb-2">Project {project}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                A brief description of project {project}. This is where you can
                highlight key features and technologies used.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Github className="mr-2 h-4 w-4" /> Source
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
