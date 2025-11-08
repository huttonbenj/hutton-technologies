import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hutton Technologies - Innovative Software Solutions',
  description: 'Leading provider of custom software development, cloud infrastructure, AI/ML solutions, and more.',
  keywords: ['software development', 'cloud infrastructure', 'AI', 'machine learning', 'mobile apps', 'DevOps', 'cybersecurity'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
