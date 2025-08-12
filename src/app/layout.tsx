import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/src/components/common/header";
import Footer from "@/src/components/common/footer";

export const metadata: Metadata = {
  title: "JNA Properties - Luxury Real Estate in Dubai",
  description: "Discover Dubai's finest luxury properties with JNA Properties. Premium apartments, villas, and penthouses in prime locations like Dubai Marina, Downtown Dubai, and Palm Jumeirah.",
  keywords: "Dubai real estate, luxury properties, Dubai Marina, Downtown Dubai, Palm Jumeirah, property investment, luxury apartments, villas Dubai",
  authors: [{ name: "JNA Properties" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <Header />
        {children}
      </body>
      <Footer />
    </html>
  );
}
