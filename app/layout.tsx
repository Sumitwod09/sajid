import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { LenisProvider } from '@/lib/lenis/LenisProvider'
import { PreloaderProvider } from '@/components/sections/Preloader'
import { GradientBlob } from '@/components/ui/GradientBlob'
import { Navbar } from '@/components/layout/Navbar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sajidsheikh.com'),
  title: {
    default: 'Sajid Sheikh — Designer & Creative',
    template: '%s | Sajid Sheikh',
  },
  description:
    'Graphic designer, UI/UX designer, video editor, and creative director based in the region.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Sajid Sheikh',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Sajid Sheikh',
              jobTitle: 'Designer & Creative',
              url: 'https://sajidsheikh.com',
            }),
          }}
        />
      </head>
      <body style={{ backgroundColor: 'var(--black)' }}>
        <LenisProvider>
          <PreloaderProvider>
            {/* Ambient cursor glow — no custom cursor shape, just atmosphere */}
            <GradientBlob />
            <Navbar />
            <main>{children}</main>
          </PreloaderProvider>
        </LenisProvider>
      </body>
    </html>
  )
}
