'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { gsap, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import { TiltCard } from '@/components/ui/TiltCard'
import { DISCIPLINE_LABELS } from '@/types/project'
import { getProjectCoverUrl, projectHasCover } from '@/lib/sanity/image'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const coverSrc = getProjectCoverUrl(project, 1600)
  const hasCover = projectHasCover(project)

  // Scroll entrance animation
  useEffect(() => {
    registerGsapPlugins()
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        delay: (index % 2) * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [index])

  return (
    <div ref={cardRef}>
      <TiltCard maxDeg={6}>
        <Link href={`/work/${project.slug.current}`} className="block group" data-cursor-view="true">

          {/* Image container */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: '4/3' }}
          >
            {hasCover ? (
              <Image
                src={coverSrc}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                style={{ transform: 'translateZ(20px)' }} /* 3D lift on image */
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <span className="text-label" style={{ color: 'var(--muted)' }}>
                  {project.title}
                </span>
              </div>
            )}

            {/* Discipline tag */}
            <div className="absolute top-4 left-4" style={{ transform: 'translateZ(30px)' }}>
              <span
                className="text-label px-2 py-1"
                style={{
                  backgroundColor: 'rgba(8,8,8,0.72)',
                  color: 'var(--accent)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {project.discipline[0]
                  ? (DISCIPLINE_LABELS[project.discipline[0]] ?? project.discipline[0])
                  : ''}
              </span>
            </div>

            {/* Year */}
            <div className="absolute bottom-4 right-4" style={{ transform: 'translateZ(30px)' }}>
              <span className="text-label" style={{ color: 'rgba(240,237,232,0.5)' }}>
                {project.year}
              </span>
            </div>
          </div>

          {/* Title — lifts in on hover */}
          <div className="mt-4 overflow-hidden" style={{ transform: 'translateZ(10px)' }}>
            <h3
              className="font-display translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
              style={{
                fontSize: 'clamp(18px, 2vw, 28px)',
                color: 'var(--white)',
              }}
            >
              {project.title}
            </h3>
          </div>

        </Link>
      </TiltCard>
    </div>
  )
}
