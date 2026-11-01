import type { WorkService, WorkStep } from '~/data/workCatalog'

export interface LocalJob {
  readonly key: string
  readonly title: string
  readonly summary: string
  readonly outcome: string
  readonly url?: string
}

export const localServices: readonly WorkService[] = [
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
    title: 'Small Business Websites',
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
    key: 'advice',
    title: 'Tech Advice',
    icon: 'i-lucide-compass',
    color: '#06b6d4',
    blurb: 'A second opinion before you buy, switch, or upgrade.',
    items: [
      'Picking the right computer or software',
      'Moving files and email to the cloud',
      'Setting up backups that actually run',
      'Simple automation for repetitive tasks',
    ],
  },
]

export const localSteps: readonly WorkStep[] = [
  { title: 'Call or book', desc: 'Tell me what is going on. It takes a few minutes and costs nothing.' },
  { title: 'I quote it', desc: 'You get a plain-language plan and a price before any work starts.' },
  { title: 'I fix it', desc: 'Repairs and builds done, with everything explained in normal words.' },
]

// Built only from facts already on the site (timeline data).
export const localJobs: readonly LocalJob[] = [
  {
    key: 'repair-years',
    title: '7 years of on-site repair for homes and small businesses',
    summary: 'Ran Affordable Computer Services: diagnostic repairs, small business networks, and system recovery.',
    outcome: '2004 to 2011, plus earlier bench work at eMachines and Hi-Tech Computers.',
  },
  {
    key: 'card-vault',
    title: 'Card Vault: an online catalog for card shops',
    summary: 'A hosted catalog built for local card shops, show organizers, and floor vendors.',
    outcome: 'Live and in use as a turnkey service.',
    url: 'https://cardvault.worldwidewebwork.com/',
  },
]
