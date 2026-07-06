import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "JuniorGolfOS — Competitive Advantage for Junior Golf Families",
  description:
    "Connect your coach, practice, tournaments, and entire development team in one system. Coaching in Context intelligence for your player — powered by GolfCoachOS. Structure free; upgrade when age and stage demand it.",
  openGraph: {
    title: "JuniorGolfOS",
    description:
      "Built for families seeking proven guidance from the world's most experienced long-term development coaches.",
    url: "https://juniorgolfos.com",
    siteName: "JuniorGolfOS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-body">
        <div className="page-shell">
          <div className="page-texture" aria-hidden />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
