import Header from "@/components/Header";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import Leadership from "@/components/Leadership";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function Portfolio() {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <Header />
      <main>
        <Education />
        <hr />
        <Experience />
        <hr />
        <Projects />
        <hr />
        <Achievements />
        <hr />
        <Leadership />
        <hr />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}
