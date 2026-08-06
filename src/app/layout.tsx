import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COGENT — Enterprise AI Automation Partner",
  description:
    "COGENT designs, builds, and operates mission-critical AI automation for enterprises. Replacing brittle manual workflows with systems that don't sleep, don't forget, and don't quit.",
  openGraph: {
    title: "COGENT — Enterprise AI Automation Partner",
    description:
      "We engineer the nervous system for companies that can't afford downtime.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
