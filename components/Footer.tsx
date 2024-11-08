"use client";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const links = {
    resume:
      "https://docs.google.com/document/d/e/2PACX-1vTK_C3H4cy1RWgPhlgaZb1C-gJk0KxO4cOn46eJyIPeqhnhnJ2qM2lNZJ0kpaBlfkl9NKPkP0RUXXns/pub",
    linkedin: "https://www.linkedin.com/in/parv-sharma-470498259/",
    github: "https://github.com/Parvsharma04/",
    email: "sharmaparv.2004@gmail.com",
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email); // Copy email to clipboard
      setCopied(true); // Show alert
      setTimeout(() => setCopied(false), 2000); // Hide alert after 2 seconds
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap justify-center sm:justify-start space-x-4 mb-4 sm:mb-0">
        <Link href={links.resume}>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Resume
          </Button>
        </Link>
        <Link href={links.github}>
          <Button variant="outline" size="sm">
            <Github className="mr-2 h-4 w-4" /> GitHub
          </Button>
        </Link>
        <Link href={links.linkedin}>
          <Button variant="outline" size="sm">
            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
          </Button>
        </Link>
        <Link href={"mailto:"+links.email}>
          <Button variant="outline" size="sm" onClick={handleCopyEmail}>
            <Mail className="mr-2 h-4 w-4" /> Email
          </Button>
        </Link>
        {copied && (
          <div className="mt-2 text-sm text-green-500">
            Copied to clipboard!
          </div>
        )}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Parv Sharma. All rights reserved.
      </p>
    </footer>
  );
}
