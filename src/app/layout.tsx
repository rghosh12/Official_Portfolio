import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rupak Ghosh",
  description:
    "Cell & Molecular Biology researcher and developer. Research experience across UT Austin, IISc, Seattle University, and Equilibrium Earth.",
  openGraph: {
    title: "Rupak Ghosh",
    description: "Research portfolio of Rupak Ghosh.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
