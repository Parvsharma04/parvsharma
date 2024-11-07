import { Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap justify-center sm:justify-start space-x-4 mb-4 sm:mb-0">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Resume
        </Button>
        <Button variant="outline" size="sm">
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Button>
        <Button variant="outline" size="sm">
          <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
        </Button>
        <Button variant="outline" size="sm">
          <Mail className="mr-2 h-4 w-4" /> Email
        </Button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Parv Sharma. All rights reserved.
      </p>
    </footer>
  );
}
