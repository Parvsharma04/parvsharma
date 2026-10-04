import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "3rem 1.5rem", minHeight: "100vh" }}>
      <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#00ff88", marginBottom: "1rem" }}>
        // 404
      </p>
      <h1 style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#f0f0f0", marginBottom: "0.75rem" }}>
        Page not found_
      </h1>
      <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "2rem" }}>
        This route doesn&apos;t exist. Maybe it moved, or maybe it never did.
      </p>
      <Link href="/" style={{ fontSize: "0.85rem", color: "#00ff88" }}>
        ← back to home
      </Link>
    </div>
  )
}
