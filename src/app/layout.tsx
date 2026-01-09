import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "@/styles/globals.css";

import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  style: ["normal", "italic"],
  weight: ["100", "300", "400", "500", "600", "700"],
});

/* -------------------------------- Metadata -------------------------------- */

export const metadata: Metadata = {
  title: "Journally — A Quiet Space to Write & Reflect",
  description:
    "Journally is a private, calm space for daily writing, reflection, and self-awareness. Write freely, revisit your thoughts, and slow down — one page at a time.",
  metadataBase: new URL("https://www.journally.app"),
  robots: { index: true, follow: true },

  icons: {
    icon: "/images/favicon/favicon.ico",
    shortcut: "/images/favicon/favicon-16x16.png",
    apple: "/images/favicon/apple-touch-icon.png",
  },

  manifest: "/images/favicon/site.webmanifest",

  openGraph: {
    title: "Journally — A Quiet Space to Write & Reflect",
    description:
      "A private journaling app designed for reflection, presence, and gentle self-awareness. No pressure. Just writing.",
    url: "https://www.journally.app",
    siteName: "Journally",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Journally — Personal Journaling App",
      },
    ],
  },
};

/* -------------------------------- Layout -------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "selection:bg-primary/20 selection:text-foreground",
          poppins.className,
        )}
      >
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
