import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Rupak Ghosh — Research Portfolio',
  description:
    'Cell and molecular biology researcher working across computational neuroscience, bioinformatics, biophysics, climate technology, and scientific software.',
  keywords: [
    'Rupak Ghosh',
    'computational neuroscience',
    'bioinformatics',
    'cell biology',
    'molecular biology',
    'biophysics',
    'scientific software',
    'Seattle University',
  ],
  authors: [{ name: 'Rupak Ghosh' }],
  openGraph: {
    title: 'Rupak Ghosh — Research Portfolio',
    description:
      'Cell and molecular biology researcher working across computational neuroscience, bioinformatics, biophysics, climate technology, and scientific software.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
