import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { HobbiesSection } from "@/components/co-curricular/HobbiesSection";
import { MiscSection } from "@/components/co-curricular/MiscSection";
import { Section } from "@/components/co-curricular/Section";

export default function CoCurricularPage() {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <Header />
      <main>
        <p className="section-label">co-curriculars</p>
        <p className="dim" style={{ fontSize: "0.83rem", marginBottom: "1.5rem" }}>
          Things I do, explore, and run when I&apos;m not writing code.
        </p>

        {/* ── 01 Hobbies & Activities ─────────────────────────────────────── */}
        <Section
          index="01"
          label="hobbies & activities"
          title="Out in the world"
          subtitle="Physical things. The offline ones."
          defaultOpen={true}
        >
          <HobbiesSection />
        </Section>

        {/* ── 02 Music ────────────────────────────────────────────────────── */}
        {/* <Section
          index="02"
          label="music"
          title="What's playing"
          subtitle="Playlists I keep coming back to."
        >
          <MusicSection />
        </Section> */}

        {/* ── 03 Miscellaneous ────────────────────────────────────────────── */}
        <Section
          index="02"
          label="miscellaneous"
          title="Books"
          subtitle="Things I've read and watched."
        >
          <MiscSection />
        </Section>

        {/* closing border */}
        <div style={{ borderTop: "1px solid #1e1e1e" }} />
      </main>
      <Footer />
    </div>
  );
}
