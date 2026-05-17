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
  metadataBase: new URL("https://parvsharma.in"),
  title: {
    default: "Parv Sharma | Full Stack Developer",
    template: "%s | Parv Sharma",
  },
  description:
    "Full Stack Developer specializing in TypeScript, React, NestJS, and low-latency systems. Currently building at Bajaj Finserv Health.",
  keywords: [
    "Parv Sharma",
    "Full Stack Developer",
    "Software Engineer",
    "TypeScript",
    "React",
    "NestJS",
    "Next.js",
    "PostgreSQL",
    "Prisma",
    "WebSockets",
    "Bajaj Finserv Health",
    "Portfolio",
  ],
  authors: [{ name: "Parv Sharma", url: "https://parvsharma.in" }],
  creator: "Parv Sharma",
  publisher: "Parv Sharma",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parvsharma.in",
    title: "Parv Sharma | Full Stack Developer",
    description:
      "Full Stack Developer specializing in TypeScript, React, NestJS, and low-latency systems. Currently building at Bajaj Finserv Health.",
    siteName: "Parv Sharma Portfolio",
    images: [
      {
        url: "/p.png",
        width: 800,
        height: 800,
        alt: "Parv Sharma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parv Sharma | Full Stack Developer",
    description:
      "Full Stack Developer specializing in TypeScript, React, NestJS, and low-latency systems. Currently building at Bajaj Finserv Health.",
    images: ["/p.png"],
  },
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
