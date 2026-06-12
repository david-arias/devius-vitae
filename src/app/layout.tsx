import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'David Arias (Devius) — Head UX/UI & Frontend Developer',
  description:
    'Portfolio y CV online de David Arias (Devius). Head UX/UI Designer & Frontend Developer en Bogotá, Colombia. Especialista en React, diseño de producto y experiencias digitales.',
  keywords: ['UX/UI Designer', 'Frontend Developer', 'React', 'Figma', 'Bogotá', 'Colombia', 'Devius'],
  authors: [{ name: 'David Arias', url: 'https://github.com/david-arias' }],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    title: 'David Arias (Devius) — Head UX/UI & Frontend Developer',
    description: 'Portfolio y CV online de David Arias (Devius). Diseño y desarrollo de experiencias digitales.',
    siteName: 'Devius',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
