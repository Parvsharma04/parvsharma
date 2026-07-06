import fs from "fs/promises";
import path from "path";
import { marked } from "marked";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workplan",
  description: "Internal project workplan and roadmap.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function WorkplanPage() {
  let content = "";
  try {
    const filePath = path.join(process.cwd(), "workplan.md");
    content = await fs.readFile(filePath, "utf-8");
  } catch (error) {
    content = "# Workplan\n\nWorkplan file not found. Please create a `workplan.md` file in the root directory.";
  }

  // Parse markdown to HTML using marked
  const parsedHtml = await marked.parse(content);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <Header />
      <main>
        <p className="section-label" style={{ marginBottom: "1.5rem" }}>workplan</p>
        <div 
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: parsedHtml }}
        />
      </main>
      <Footer />
    </div>
  );
}
