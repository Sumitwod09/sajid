'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { MenuOverlay } from './MenuOverlay'

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-500 ${scrolled ? 'nav-scrolled' : ''}`}
        style={{ height: 'var(--nav-height)', padding: '0 var(--margin-page)' }}
      >
        {/* Logo */}
        <Link href="/" className="text-label" style={{ color: 'var(--white)' }}>
          Sajid Sheikh
        </Link>

        {/* Right nav */}
        <div className="flex items-center gap-8">
          <Link href="/work" className="swap-btn text-label hidden md:block">
            <span className="swap-btn__text">Work</span>
            <span className="swap-btn__clone" aria-hidden="true">Work</span>
          </Link>
          <Link href="/about" className="swap-btn text-label hidden md:block">
            <span className="swap-btn__text">About</span>
            <span className="swap-btn__clone" aria-hidden="true">About</span>
          </Link>

          {/* CTA */}
          <Link
            href="#contact"
            className="swap-btn text-label hidden md:flex items-center rounded-full px-5 py-2"
            style={{ border: '1px solid var(--border)' }}
          >
            <span className="swap-btn__text">Let&apos;s Talk →</span>
            <span className="swap-btn__clone" aria-hidden="true">Let&apos;s Talk →</span>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex flex-col gap-[5px] ml-2"
          >
            <span className="block h-px w-6" style={{ background: 'var(--white)' }} />
            <span className="block h-px w-6" style={{ background: 'var(--white)' }} />
          </button>
        </div>
      </nav>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
