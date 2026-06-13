'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap, registerGsapPlugins } from '@/lib/gsap/gsapConfig'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

interface MenuOverlayProps {
  open: boolean
  onClose: () => void
}

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    registerGsapPlugins()
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (open) {
      gsap.set(overlayRef.current, { display: 'flex' })
      if (prefersReduced) {
        gsap.set(overlayRef.current, { opacity: 1 })
      } else {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out' }
        )
        const items = linksRef.current?.querySelectorAll('li')
        if (items?.length) {
          gsap.fromTo(
            items,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out', delay: 0.1 }
          )
        }
      }
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => gsap.set(overlayRef.current, { display: 'none' }),
      })
    }
  }, [open])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] hidden flex-col justify-between px-[var(--margin-page)] py-8"
      style={{ backgroundColor: 'var(--surface)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      {/* Close */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="text-label"
          style={{ color: 'var(--white)' }}
        >
          Close ✕
        </button>
      </div>

      {/* Links */}
      <ul ref={linksRef} className="flex flex-col gap-4 overflow-hidden">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href} style={{ overflow: 'hidden' }}>
            <Link
              href={href}
              onClick={onClose}
              className="text-display-lg block font-display leading-none"
              style={{ color: 'var(--white)' }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Social */}
      <div className="flex gap-6">
        {['Instagram', 'Behance', 'LinkedIn'].map((s) => (
          <a key={s} href="#" className="text-label" style={{ color: 'var(--muted)' }}>
            {s}
          </a>
        ))}
      </div>
    </div>
  )
}
