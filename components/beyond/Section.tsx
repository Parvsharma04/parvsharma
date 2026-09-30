"use client";

import { useState } from "react";

interface SectionProps {
  index: string;
  label: string;
  title: string;
  subtitle: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function Section({
  index,
  label,
  title,
  subtitle,
  defaultOpen = false,
  children,
}: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section style={{ marginBottom: "0" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          borderTop: "1px solid #1e1e1e",
          padding: "1.1rem 0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          textAlign: "left",
        }}
        aria-expanded={open}
      >
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#444",
              marginBottom: "0.15rem",
            }}
          >
            {index} &mdash; {label}
          </p>
          <p style={{ fontSize: "1rem", color: "#f0f0f0", fontWeight: 500 }}>
            {title}
          </p>
        </div>
        <span
          style={{
            color: "#00ff88",
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
            flexShrink: 0,
            transition: "transform 0.2s",
            display: "inline-block",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div style={{ paddingBottom: "1.8rem" }}>
          <p
            style={{
              fontSize: "0.82rem",
              color: "#666",
              marginBottom: "1.4rem",
              lineHeight: "1.6",
            }}
          >
            {subtitle}
          </p>
          {children}
        </div>
      )}
    </section>
  );
}

export const cardStyle: React.CSSProperties = {
  border: "1px solid #1e1e1e",
  borderRadius: "4px",
  overflow: "hidden",
  background: "#111",
};

export const activityLabelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  color: "#555",
  marginBottom: "0.3rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

export const mediaLinkCardStyle: React.CSSProperties = {
  border: "1px solid #1e1e1e",
  borderRadius: "4px",
  background: "#111",
  padding: "0.8rem 1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
};
