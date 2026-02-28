import Link from "next/link";

export default function Header() {
  return (
    <header style={{ marginBottom: "2.5rem" }}>
      {/* Name with blinking cursor */}
      <h1
        className="cursor"
        style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#f0f0f0", marginBottom: "0.5rem" }}
      >
        Parv Sharma
      </h1>

      {/* Contact */}
      <p style={{ fontSize: "0.8rem", color: "#555", marginBottom: "0.8rem", lineHeight: "1.9" }}>
        <a href="mailto:sharmaparv.2004@gmail.com">sharmaparv.2004@gmail.com</a>
        <span style={{ color: "#2a2a2a", margin: "0 0.4rem" }}>·</span>
        <a href="tel:+916280730669">+91 62807 30669</a>
        <span style={{ color: "#2a2a2a", margin: "0 0.4rem" }}>·</span>
        <a href="https://parvsharma.in" target="_blank" rel="noopener noreferrer">parvsharma.in</a>
        <span style={{ color: "#2a2a2a", margin: "0 0.4rem" }}>·</span>
        <a href="https://linkedin.com/in/parvsharma04" target="_blank" rel="noopener noreferrer">linkedin</a>
        <span style={{ color: "#2a2a2a", margin: "0 0.4rem" }}>·</span>
        <a href="https://github.com/Parvsharma04" target="_blank" rel="noopener noreferrer">github</a>
      </p>

      {/* Nav */}
      <nav style={{ fontSize: "0.8rem", display: "flex", gap: "1rem" }}>
        <Link href="/" className="nav-link">~/home</Link>
        <Link href="/blog" className="nav-link">~/blog</Link>
      </nav>

      <hr />
    </header>
  );
}
