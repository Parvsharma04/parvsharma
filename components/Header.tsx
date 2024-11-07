"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="flex justify-between items-center mb-12">
      <div className="flex items-center space-x-4">
        <Image
          src="/parv.gif"
          alt="Parv Sharma"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl font-bold">Parv Sharma</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Full Stack Developer</p>
        </div>
      </div>
      <Button variant="ghost" onClick={toggleDarkMode}>
        {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </Button>
    </header>
  );
}