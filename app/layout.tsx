import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { CloudBackground } from "@/components/ui/cloud-background";
import { PageTransition } from "@/components/ui/page-transition";
import { PaperBackground } from "@/components/ui/paper-background";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sansFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Suchismita Das | Product Designer",
    template: "%s | Suchismita Das",
  },
  description:
    "Product designer specializing in UI/UX, brand identity, and visual design. Creating meaningful experiences that blend aesthetics with functionality.",
  keywords: [
    "Product Designer",
    "UI/UX Designer",
    "Visual Design",
    "Brand Identity",
    "Graphic Design",
    "User Experience",
  ],
  authors: [{ name: "Suchismita Das" }],
  creator: "Suchismita Das",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://suchismitadas.com",
    title: "Suchismita Das | Product Designer",
    description:
      "Product designer specializing in UI/UX, brand identity, and visual design. Creating meaningful experiences that blend aesthetics with functionality.",
    siteName: "Suchismita Das",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suchismita Das | Product Designer",
    description:
      "Product designer creating meaningful experiences through design.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <PaperBackground />
        <CloudBackground />
        <AmbientBackground />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
