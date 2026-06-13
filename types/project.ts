export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
}

export type Discipline =
  | 'graphic'
  | 'uiux'
  | 'video'
  | 'motion'
  | 'brand'
  | 'creative-direction'
  | 'media'

export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  graphic: 'Graphic Design',
  uiux: 'UI/UX',
  video: 'Video Editing',
  motion: 'Motion Design',
  brand: 'Brand Identity',
  'creative-direction': 'Creative Direction',
  media: 'Media Design',
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  year: number
  discipline: Discipline[]
  client?: string
  coverImage: SanityImage
  coverImageUrl?: string   // External URL used for mock/dev; Sanity image takes over in production
  heroVideoUrl?: string
  overview: string
  gallery: SanityImage[]
  featured: boolean
  featuredOrder?: number
  credits?: string
  seoDescription?: string
}

export interface SiteSettings {
  heroPhilosophy?: string
  aboutBio?: unknown[]
  portraitImage?: SanityImage
  cvFile?: { asset: { url: string } }
  email?: string
  instagramUrl?: string
  behanceUrl?: string
  linkedinUrl?: string
  clientLogos?: { name: string; logo: SanityImage }[]
}
