import Link from 'next/link'
import { FooterCTA } from '@/components/sections/FooterCTA'

interface FooterProps {
  email?: string
  instagramUrl?: string
  behanceUrl?: string
  linkedinUrl?: string
}

export function Footer({ email, instagramUrl, behanceUrl, linkedinUrl }: FooterProps) {
  const contactEmail = email ?? 'hello@sajidsheikh.com'

  return (
    <footer id="contact" style={{ backgroundColor: 'var(--black)' }}>
      <FooterCTA email={contactEmail} />

      {/* Bottom bar */}
      <div
        className="flex items-center justify-between py-6"
        style={{
          padding: '24px var(--margin-page)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <p className="text-label text-muted">© {new Date().getFullYear()} Sajid Sheikh</p>

        <div className="flex gap-6">
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-label text-muted swap-btn">
              <span className="swap-btn__text">IG</span>
              <span className="swap-btn__clone" aria-hidden="true">IG</span>
            </a>
          )}
          {behanceUrl && (
            <a href={behanceUrl} target="_blank" rel="noopener noreferrer" className="text-label text-muted swap-btn">
              <span className="swap-btn__text">BE</span>
              <span className="swap-btn__clone" aria-hidden="true">BE</span>
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-label text-muted swap-btn">
              <span className="swap-btn__text">LI</span>
              <span className="swap-btn__clone" aria-hidden="true">LI</span>
            </a>
          )}
          <Link href="/work" className="text-label text-muted swap-btn">
            <span className="swap-btn__text">Work</span>
            <span className="swap-btn__clone" aria-hidden="true">Work</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
