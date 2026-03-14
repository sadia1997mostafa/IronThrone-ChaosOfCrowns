import type { Metadata } from 'next'
import { Cinzel, Cinzel_Decorative } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
})

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel-decorative',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Iron Throne: Chaos of Crowns',
  description: 'A Game of Thrones AI simulation — Minimax, MCTS, Fuzzy Logic',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cinzelDecorative.variable}`}>
      <body>{children}</body>
    </html>
  )
}
