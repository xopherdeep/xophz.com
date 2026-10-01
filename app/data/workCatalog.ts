export interface WorkService {
  readonly key: string
  readonly title: string
  readonly icon: string
  readonly color: string
  readonly blurb: string
  readonly items: readonly string[]
}

export interface WorkStep {
  readonly title: string
  readonly desc: string
}

export interface WorkCaseStudy {
  readonly key: string
  readonly category: 'Repair' | 'Websites' | 'Consulting'
  readonly title: string
  readonly summary: string
  readonly outcome: string
  readonly url?: string
}

export const BOOKING_URL = 'https://calendar.app.google/Y732Ak5gxuCMVoHo8'
export const CONTACT_EMAIL = 'sayhi@xophz.com'

export const workServices: readonly WorkService[] = [
  {
    key: 'repair',
    title: 'Computer Repair & Tech Help',
    icon: 'i-lucide-wrench',
    color: '#10b981',
    blurb: 'Slow, broken, infected, or just confusing? I fix it, on-site in Tucson or remotely.',
    items: [
      'Diagnostics and hardware repair',
      'Virus and malware cleanup',
      'Data recovery and backups',
      'Home and small office networks',
    ],
  },
  {
    key: 'websites',
    title: 'Website Design',
    icon: 'i-lucide-layout-template',
    color: '#8b5cf6',
    blurb: 'A clear, fast website for your business, built, fixed, and kept running.',
    items: [
      'New sites and redesigns',
      'Fixes, updates, and speed-ups',
      'Hosting, domains, and email',
      'Online catalogs and booking tools',
    ],
  },
  {
    key: 'consulting',
    title: 'Tech Consulting',
    icon: 'i-lucide-compass',
    color: '#06b6d4',
    blurb: 'A second opinion or a one-off project, from picking the right tools to bigger system design.',
    items: [
      'Tech audits and second opinions',
      'Moving from old systems to the cloud',
      'Custom software and automation',
      'Architecture advice for growing teams',
    ],
  },
]

export const workSteps: readonly WorkStep[] = [
  { title: 'Book a call', desc: 'Tell me what is going on. It takes a few minutes and costs nothing.' },
  { title: 'I scope it', desc: 'You get a plain-language plan and a price before any work starts.' },
  { title: 'I do the work', desc: 'Repairs, builds, and fixes done, with everything explained in normal words.' },
]

// Built only from facts already on the site (timeline and resume data).
// Replace or extend with real client jobs: what was wrong, what was done, the result.
export const workCaseStudies: readonly WorkCaseStudy[] = [
  {
    key: 'repair-years',
    category: 'Repair',
    title: '7 years of on-site repair for homes and small businesses',
    summary: 'Founded and ran Affordable Computer Services: diagnostic repairs, small business networks, and system recovery.',
    outcome: '2004 to 2011, plus earlier bench work at eMachines and Hi-Tech Computers.',
  },
  {
    key: 'agency',
    category: 'Websites',
    title: 'Midnight Nerd: custom sites and software for clients',
    summary: 'Ran a small digital agency delivering tailored websites, systems integration, and cloud management.',
    outcome: '2014 to 2020 of client delivery.',
    url: 'https://midnightnerd.com',
  },
  {
    key: 'card-vault',
    category: 'Websites',
    title: 'Card Vault: an online catalog for card shops',
    summary: 'A hosted catalog built for local card shops, show organizers, and floor vendors.',
    outcome: 'Live and in use as a turnkey service.',
    url: 'https://cardvault.worldwidewebwork.com/',
  },
  {
    key: 'leads',
    category: 'Consulting',
    title: 'Cutting waste at a financial firm',
    summary: 'Built the lead-parsing and data validation systems for JD Mellberg Financial.',
    outcome: 'An estimated $1.2M a year in operational waste removed.',
    url: 'https://www.jdmellbergfinancial.com',
  },
]
