import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Rupak Ghosh — Research Portfolio",
    template: "%s | Rupak Ghosh",
  },
  description:
    "Research portfolio of Rupak Ghosh — Cell and Molecular Biology, Computational Neuroscience, Bioinformatics, and Climate Technology.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Rupak Ghosh",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Rupak Ghosh" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rupakghosh",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
