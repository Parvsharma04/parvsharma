import { posts, getPostBySlug } from "@/lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Not Found" };
    return {
        title: post.title,
        description: post.excerpt || "Engineering, systems, and thoughts by Parv Sharma",
        openGraph: {
            title: `${post.title} — Parv Sharma`,
            description: post.excerpt || "Engineering, systems, and thoughts by Parv Sharma",
            type: "article",
            url: `https://parvsharma.in/blog/${slug}`,
            publishedTime: post.date,
        },
        twitter: {
            card: "summary_large_image",
            title: `${post.title} — Parv Sharma`,
            description: post.excerpt || "Engineering, systems, and thoughts by Parv Sharma",
        }
    };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const lines = post.content.split("\n");

    // Build React nodes so we can detect and render HTML blocks (e.g. <table>...</table>)
    const contentNodes: any[] = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Detect an HTML block starting with <table>
        if (line.trim().startsWith("<table>")) {
            const htmlLines = [line];
            // collect until we find a closing </table>
            while (i + 1 < lines.length && !lines[i + 1].trim().includes("</table>")) {
                i++;
                htmlLines.push(lines[i]);
            }
            if (i + 1 < lines.length && lines[i + 1].trim().includes("</table>")) {
                i++;
                htmlLines.push(lines[i]);
            }
            const html = htmlLines.join("\n");
            contentNodes.push(
                <div key={`html-${i}`} dangerouslySetInnerHTML={{ __html: html }} />
            );
            continue;
        }

        if (line.startsWith("## ")) {
            contentNodes.push(
                <h2 key={`h2-${i}`} style={{ fontWeight: "bold", color: "#00ff88", marginTop: "1.8rem", marginBottom: "0.6rem", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {"// "} {line.slice(3)}
                </h2>
            );
            continue;
        }

        if (line.trim() === "") {
            contentNodes.push(<div key={`sp-${i}`} style={{ height: "0.7rem" }} />);
            continue;
        }

        // Inline code and bold handling
        const parts = line.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
        contentNodes.push(
            <p key={`p-${i}`}>
                {parts.map((part, j) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                        return <strong key={j} style={{ color: "#d4d4d4" }}>{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith("`") && part.endsWith("`")) {
                        return <code key={j} style={{ color: "#00ff88", fontSize: "0.85em" }}>{part.slice(1, -1)}</code>;
                    }
                    return part;
                })}
            </p>
        );
    }

    return (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "3rem 1.5rem" }}>
            <Header />
            <main>
                <p className="muted" style={{ fontSize: "0.72rem", marginBottom: "0.35rem" }}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric",
                    })}
                </p>
                <h1 style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "2rem", color: "#f0f0f0" }}>
                    {post.title}
                </h1>
                <div style={{ fontSize: "0.88rem", lineHeight: "1.85", color: "#aaa" }}>
                    {contentNodes}
                </div>
                <hr style={{ marginTop: "2.5rem" }} />
                <p style={{ fontSize: "0.8rem", marginTop: "1rem" }}>
                    <Link href="/blog">← back to blog</Link>
                </p>
            </main>
            <Footer />
        </div>
    );
}
