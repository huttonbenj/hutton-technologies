import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hutton Technologies - Innovative Software Solutions',
  description: 'Leading provider of custom software development, cloud infrastructure, AI/ML solutions, and more.',
  keywords: ['software development', 'cloud infrastructure', 'AI', 'machine learning', 'mobile apps', 'DevOps', 'cybersecurity'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Hutton Technologies - Innovative Software Solutions',
    description: 'Building the future with cutting-edge software development, AI/ML solutions, and cloud infrastructure.',
    url: 'https://huttontechnologies.com',
    siteName: 'Hutton Technologies',
    images: [
      {
        url: 'https://huttontechnologies.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hutton Technologies - Cyberpunk themed tech logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hutton Technologies - Innovative Software Solutions',
    description: 'Building the future with cutting-edge software development, AI/ML solutions, and cloud infrastructure.',
    images: ['https://huttontechnologies.com/og-image.png'],
  },
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
