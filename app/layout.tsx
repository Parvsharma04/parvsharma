import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parvsharma.com"),
  title: {
    default: "Parv Sharma | Software Developer",
    template: "%s | Parv Sharma",
  },
  description:
    "Software developer specializing in TypeScript, React, NestJS, and low-latency systems. Currently building at Bajaj Finserv Health.",
  keywords: [
    "Parv Sharma",
    "Software Developer",
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
    "backend engineer",
  ],
  authors: [{ name: "Parv Sharma", url: "https://parvsharma.com" }],
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
    url: "https://parvsharma.com",
    title: "Parv Sharma | Software Developer",
    description:
      "Software developer specializing in TypeScript, React, NestJS, and low-latency systems. Currently building at Bajaj Finserv Health.",
    siteName: "Parv Sharma",
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
    title: "Parv Sharma | Software Developer",
    description:
      "Software developer specializing in TypeScript, React, NestJS, and low-latency systems. Currently building at Bajaj Finserv Health.",
    creator: "@parvsharma04",
    images: ["https://parvsharma.com/p.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "theme-color": "#0d0d0d",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Parv Sharma",
  url: "https://parvsharma.com",
  image: "https://parvsharma.com/p.png",
  jobTitle: "Software Developer",
  worksFor: {
    "@type": "Organization",
    name: "Bajaj Finserv Health",
    url: "https://bajajfinservhealth.in",
  },
  sameAs: [
    "https://github.com/Parvsharma04",
    "https://linkedin.com/in/parvsharma04",
  ],
  email: "sharmaparv.2004@gmail.com",
  knowsAbout: ["TypeScript", "React", "NestJS", "Next.js", "PostgreSQL", "ClickHouse", "Docker", "Kubernetes"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={mono.variable}>
      <head>
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P12ZXMWN5T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-P12ZXMWN5T');
          `}
        </Script>
      </head>
      <body style={{ fontFamily: "var(--font-mono), 'Courier New', monospace" }}>
        {children}
      </body>
    </html>
  );
}
