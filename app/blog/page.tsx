import Link from "next/link";
import { posts } from "@/lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on engineering, systems, and things I've been thinking about.",
  openGraph: {
    title: "Blog | Parv Sharma",
    description: "Notes on engineering, systems, and things I've been thinking about.",
    url: "https://parvsharma.com/blog",
    type: "website",
    images: [
      {
        url: "https://parvsharma.com/p.png",
        width: 800,
        height: 800,
        alt: "Parv Sharma — Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Parv Sharma",
    description: "Notes on engineering, systems, and things I've been thinking about.",
    creator: "@parvsharma04",
    images: ["https://parvsharma.com/p.png"],
  },
};

export default function BlogPage() {
    const sorted = [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "3rem 1.5rem" }}>
            <Header />
            <main>
                <h1 className="section-label">blog</h1>
                <p className="dim" style={{ fontSize: "0.83rem", marginBottom: "1.8rem" }}>
                    Notes on engineering, systems, and things I&apos;ve been thinking about.
                </p>
                <div>
                    {sorted.map((post) => (
                        <div key={post.slug} style={{ marginBottom: "1.8rem" }}>
                            <p className="muted" style={{ fontSize: "0.72rem", marginBottom: "0.2rem" }}>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    year: "numeric", month: "long", day: "numeric",
                                })}
                            </p>
                            <Link
                                href={`/blog/${post.slug}`}
                                style={{ color: "#f0f0f0", fontWeight: "bold", fontSize: "0.95rem" }}
                            >
                                {post.title}
                            </Link>
                            <p style={{ fontSize: "0.82rem", color: "#666", marginTop: "0.2rem" }}>
                                {post.excerpt}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
