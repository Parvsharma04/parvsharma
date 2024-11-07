import Header from "@/components/Header";
import About from "../components/About";
import Achievements from "../components/Achievements";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Projects from "../components/Projects";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <Header />
      <main>
        <About />
        <Education />
        <Experience />
        <Achievements />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
