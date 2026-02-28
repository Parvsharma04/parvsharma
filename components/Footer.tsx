import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "3rem",
        paddingTop: "1.2rem",
        borderTop: "1px solid #1e1e1e",
        fontSize: "0.75rem",
        color: "#333",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.4rem",
      }}
    >
      <span>© {new Date().getFullYear()} Parv Sharma</span>
      <span style={{ display: "flex", gap: "1rem" }}>
        <a href="https://github.com/Parvsharma04" target="_blank" rel="noopener noreferrer">github</a>
        <Link href="/blog">blog</Link>
        <a href="mailto:sharmaparv.2004@gmail.com">mail</a>
      </span>
    </footer>
  );
}
