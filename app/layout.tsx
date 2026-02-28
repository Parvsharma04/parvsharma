import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parv Sharma",
  description:
    "Full Stack Developer — TypeScript, React, NestJS. Building at Bajaj Finserv Health.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={mono.variable}>
      <body style={{ fontFamily: "var(--font-mono), 'Courier New', monospace" }}>
        {children}
      </body>
    </html>
  );
}
