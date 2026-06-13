import type { Project, SiteSettings } from '@/types/project'

// Picsum seed URLs → deterministic, varied, beautiful placeholder photos.
// Replace via Sanity CMS when real project assets are ready.
const EMPTY_IMAGE = { _type: 'image' as const, asset: { _ref: '', _type: 'reference' as const } }

export const mockProjects: Project[] = [
  {
    _id: 'mock-1',
    title: 'Aura — Brand Identity',
    slug: { current: 'aura-brand-identity' },
    year: 2024,
    discipline: ['brand', 'graphic'],
    client: 'Aura Studio',
    coverImageUrl: 'https://picsum.photos/seed/aura-brand/1600/900',
    coverImage: EMPTY_IMAGE,
    overview:
      'A full visual identity system for a luxury creative studio. The mark is a geometric abstraction of light — an oblique "A" that doubles as a prism. Built across stationery, signage, and digital touchpoints with a strict two-colour palette: deep black and warm gold.',
    gallery: [],
    featured: true,
    featuredOrder: 1,
    seoDescription: 'Brand identity system for Aura Studio — mark, palette, and full rollout.',
  },
  {
    _id: 'mock-2',
    title: 'The Black Review',
    slug: { current: 'the-black-review' },
    year: 2024,
    discipline: ['media', 'graphic'],
    client: 'The Black Review',
    coverImageUrl: 'https://picsum.photos/seed/blackreview-editorial/1600/900',
    coverImage: EMPTY_IMAGE,
    overview:
      'Six-issue editorial design system for an independent culture magazine. Each issue has a master grid but a distinct cover language — typography as the primary image. The typeface carries the visual weight so photography can breathe. Issue 03 was selected for the D&AD New Blood exhibition.',
    gallery: [],
    featured: true,
    featuredOrder: 2,
    seoDescription: 'Editorial design system for The Black Review — independent culture magazine.',
  },
  {
    _id: 'mock-3',
    title: 'Kora — App Redesign',
    slug: { current: 'kora-app-redesign' },
    year: 2024,
    discipline: ['uiux'],
    client: 'Kora',
    coverImageUrl: 'https://picsum.photos/seed/kora-uiux/1600/900',
    coverImage: EMPTY_IMAGE,
    overview:
      'End-to-end UX audit and UI redesign for a fintech app serving 200k+ users. Reduced onboarding drop-off by 34% through a restructured information architecture and a design system of 160 components. Dark-first interface with a tactile component language built for daily-use density.',
    gallery: [],
    featured: true,
    featuredOrder: 3,
    seoDescription: 'UI/UX redesign for Kora fintech app — design system and onboarding overhaul.',
  },
  {
    _id: 'mock-4',
    title: 'Frame by Frame',
    slug: { current: 'frame-by-frame' },
    year: 2023,
    discipline: ['motion', 'video'],
    client: 'Frame Studios',
    coverImageUrl: 'https://picsum.photos/seed/frame-motion/1600/900',
    coverImage: EMPTY_IMAGE,
    heroVideoUrl: '',
    overview:
      'Creative direction and motion design for a production studio relaunch. The reel is structured as three chapters — identity, product, and narrative — each with a distinct visual grammar that collapses into one coherent sensibility. Every transition is earned. Every cut is intentional.',
    gallery: [],
    featured: true,
    featuredOrder: 4,
    seoDescription: 'Motion reel direction for Frame Studios — creative direction and post-production.',
  },
  {
    _id: 'mock-5',
    title: 'Strata Architects',
    slug: { current: 'strata-architects' },
    year: 2023,
    discipline: ['brand', 'graphic'],
    client: 'Strata Architecture',
    coverImageUrl: 'https://picsum.photos/seed/strata-arch/1600/900',
    coverImage: EMPTY_IMAGE,
    overview:
      'Identity for a mid-size architecture firm repositioning from residential to commercial. The wordmark is constructed on a grid derived from plan-view architectural drawings. Collateral includes pitch decks, site hoardings, and a site-specific exhibition system for their flagship project launch.',
    gallery: [],
    featured: true,
    featuredOrder: 5,
    seoDescription: 'Brand identity for Strata Architecture — wordmark, collateral, and exhibition system.',
  },
  {
    _id: 'mock-6',
    title: 'Pulse Magazine',
    slug: { current: 'pulse-magazine' },
    year: 2023,
    discipline: ['media', 'graphic'],
    client: 'Pulse',
    coverImageUrl: 'https://picsum.photos/seed/pulse-magazine/1600/900',
    coverImage: EMPTY_IMAGE,
    overview:
      'A quarterly print magazine covering technology and culture, designed from scratch — masthead, grid system, type hierarchy, and art direction guidelines for contributing photographers. The design system scales from 48-page standard issues to a 120-page annual edition without breaking hierarchy.',
    gallery: [],
    featured: true,
    featuredOrder: 6,
    seoDescription: 'Print magazine design system for Pulse — quarterly tech and culture publication.',
  },
  {
    _id: 'mock-7',
    title: 'Motive — Creative Direction',
    slug: { current: 'motive-creative-direction' },
    year: 2023,
    discipline: ['creative-direction', 'brand'],
    client: 'Motive Apparel',
    coverImageUrl: 'https://picsum.photos/seed/motive-apparel/1600/900',
    coverImage: EMPTY_IMAGE,
    overview:
      'Creative direction for a D2C performance apparel brand from pre-launch through their first collection. Defined the visual language, led the campaign shoot, and wrote the art direction brief that now governs how the brand appears across all channels. The first collection sold out in 48 hours.',
    gallery: [],
    featured: false,
    seoDescription: 'Creative direction for Motive Apparel — brand launch and campaign art direction.',
  },
  {
    _id: 'mock-8',
    title: 'Folio Typeface',
    slug: { current: 'folio-typeface' },
    year: 2022,
    discipline: ['graphic'],
    coverImageUrl: 'https://picsum.photos/seed/folio-type/1600/900',
    coverImage: EMPTY_IMAGE,
    overview:
      'Type specimen booklet for an independent foundry\'s new grotesque. The specimen is also the argument — every layout decision is made to reveal how the typeface performs under pressure: small text, large text, colour reversal, multilingual setting. Printed offset in two colours, 64 pages, perfect bound.',
    gallery: [],
    featured: false,
    seoDescription: 'Type specimen design for Folio Foundry — print-first, 64-page booklet.',
  },
]

export const mockSiteSettings: SiteSettings = {
  heroPhilosophy:
    "Design is a decision, not a decoration. Every choice earns its place or it doesn't belong.",
  email: 'hello@sajidsheikh.com',
  instagramUrl: 'https://instagram.com',
  behanceUrl: 'https://behance.net',
  linkedinUrl: 'https://linkedin.com',
  clientLogos: [],
}
