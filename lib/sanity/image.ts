import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'
import type { SanityImage, Project } from '@/types/project'

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: SanityImage | null | undefined) {
  if (!source?.asset?._ref) return null
  return builder.image(source)
}

export function urlForImageString(
  source: SanityImage | null | undefined,
  width?: number
): string {
  const url = urlForImage(source)
  if (!url) return '/images/placeholder.jpg'
  if (width) return url.width(width).auto('format').url()
  return url.auto('format').url()
}

type CoverProject = Pick<Project, 'coverImage' | 'coverImageUrl'>

/** Resolves the best available cover URL — external mock URL → Sanity image → placeholder */
export function getProjectCoverUrl(project: CoverProject, width?: number): string {
  if (project.coverImageUrl) return project.coverImageUrl
  return urlForImageString(project.coverImage, width)
}

/** True when the project has any usable cover image */
export function projectHasCover(project: CoverProject): boolean {
  return Boolean(project.coverImageUrl || project.coverImage?.asset?._ref)
}
