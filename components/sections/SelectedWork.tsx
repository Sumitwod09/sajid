'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import { SplitText } from '@/components/ui/SplitText'
import { DISCIPLINE_LABELS } from '@/types/project'
import { getProjectCoverUrl, projectHasCover } from '@/lib/sanity/image'
import type { Project } from '@/types/project'

interface SelectedWorkProps {
  projects: Project[]
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGsapPlugins()

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 1023px)').matches
    if (prefersReduced || isMobile || !sectionRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const track = trackRef.current!

      const anim = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.2,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        animation: anim,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="selected-work-section"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      {/* Header row */}
      <div
        className="flex items-baseline justify-between"
        style={{ padding: '32px var(--margin-page) 20px' }}
      >
        <div className="flex items-baseline gap-6">
          <span className="section-label" style={{ color: 'var(--muted)' }}>03</span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(28px, 4vw, 56px)', color: 'var(--white)', lineHeight: '1' }}
          >
            Selected Work
          </h2>
        </div>
        <span className="hidden text-label md:block" style={{ color: 'var(--muted)' }}>
          scroll →
        </span>
      </div>

      {/* Horizontal card track */}
      <div
        ref={trackRef}
        className="selected-work-track flex gap-4"
        style={{
          height: 'calc(100vh - 88px)',
          paddingLeft: 'var(--margin-page)',
          paddingRight: 'var(--margin-page)',
          paddingBottom: '24px',
          width: 'max-content',
        }}
      >
        {projects.map((project, i) => {
          const coverSrc = getProjectCoverUrl(project, 1600)
          const hasCover = projectHasCover(project)

          return (
            <Link
              key={project._id}
              href={`/work/${project.slug.current}`}
              className="selected-work-card group relative flex-shrink-0 block overflow-hidden"
              style={{
                width: i === 0 ? 'clamp(300px, 52vw, 760px)' : 'clamp(260px, 36vw, 520px)',
              }}
              data-cursor-view="true"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                {hasCover ? (
                  <Image
                    src={coverSrc}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="absolute inset-0" style={{ backgroundColor: 'var(--surface)' }} />
                )}

                {/* Gradient overlay — text readable, image still prominent */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(160deg, transparent 40%, rgba(8,8,8,0.75) 75%, rgba(8,8,8,0.95) 100%)',
                  }}
                />
              </div>

              {/* Card number — top left */}
              <div className="absolute top-5 left-5">
                <span className="text-label" style={{ color: 'rgba(240,237,232,0.35)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Discipline — top right */}
              <div className="absolute top-5 right-5">
                <span
                  className="text-label px-2 py-1"
                  style={{
                    color: 'var(--accent)',
                    border: '1px solid rgba(191,164,109,0.3)',
                    backdropFilter: 'blur(4px)',
                    backgroundColor: 'rgba(8,8,8,0.4)',
                  }}
                >
                  {project.discipline[0] ? (DISCIPLINE_LABELS[project.discipline[0]] ?? project.discipline[0]) : ''}
                </span>
              </div>

              {/* Title + year — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  className="font-display mb-1 leading-tight translate-y-2 transition-transform duration-500 group-hover:translate-y-0"
                  style={{
                    fontSize: i === 0 ? 'clamp(24px, 3vw, 48px)' : 'clamp(20px, 2.2vw, 36px)',
                    color: 'var(--white)',
                  }}
                >
                  {project.title}
                </h3>
                <p className="text-label" style={{ color: 'rgba(240,237,232,0.45)' }}>
                  {project.year}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
