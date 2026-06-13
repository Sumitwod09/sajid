'use client'

import { useEffect, useRef } from 'react'

export function GradientBlob() {
  const blobRef = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    const el = blobRef.current
    const el2 = blob2Ref.current
    if (!el || !el2) return

    let x = window.innerWidth * 0.6
    let y = window.innerHeight * 0.4
    let tx = x, ty = y
    let x2 = window.innerWidth * 0.3
    let y2 = window.innerHeight * 0.7
    let tx2 = x2, ty2 = y2

    let rafId: number

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      // Second blob lags further behind and drifts opposite
      tx2 = e.clientX * 0.7 + window.innerWidth * 0.1
      ty2 = e.clientY * 0.7 + window.innerHeight * 0.15
    }

    const tick = () => {
      // Primary blob — medium lag
      x += (tx - x) * 0.055
      y += (ty - y) * 0.055
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`

      // Secondary blob — heavy lag, different position
      x2 += (tx2 - x2) * 0.025
      y2 += (ty2 - y2) * 0.025
      el2.style.transform = `translate(${x2}px, ${y2}px) translate(-50%, -50%)`

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Primary glow blob — gold/amber, follows mouse */}
      <div
        ref={blobRef}
        className="pointer-events-none fixed top-0 left-0"
        style={{
          zIndex: 0,
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(191,164,109,0.09) 0%, rgba(191,164,109,0.04) 40%, transparent 70%)',
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />

      {/* Secondary blob — cooler tint, drifts further behind */}
      <div
        ref={blob2Ref}
        className="pointer-events-none fixed top-0 left-0"
        style={{
          zIndex: 0,
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(180,200,240,0.04) 0%, rgba(150,170,220,0.02) 50%, transparent 70%)',
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />
    </>
  )
}
