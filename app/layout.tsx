import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full scroll-smooth`}
    >
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
