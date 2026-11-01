// Content for the /consulting page. Kept separate from workCatalog so the
// two pages can change independently.

export const CONSULTING_BOOKING_URL = 'https://calendar.app.google/Y732Ak5gxuCMVoHo8'
export const CONSULTING_EMAIL = 'sayhi@xophz.com'

export interface ConsultingStep {
  readonly title: string
  readonly desc: string
}

export interface ConsultingPastWork {
  readonly key: string
  readonly title: string
  readonly summary: string
  readonly outcome: string
  readonly url?: string
}

export interface ConsultingEngagement {
  readonly key: string
  readonly name: string
  readonly plainName: string
  readonly icon: string
  readonly color: string
  readonly length: string
  readonly bestFor: string
  readonly youGet: readonly string[]
}

export interface ConsultingArea {
  readonly title: string
  readonly icon: string
  readonly desc: string
}

export const consultingAudience: readonly string[] = [
  'Operations and revenue leaders whose processes live in spreadsheets, inboxes, and one person\'s head.',
  'Growing companies where the tools no longer fit how the work actually gets done.',
  'Teams stuck on an old system that is slow, fragile, or costly to keep running.',
  'Leaders who want an experienced, neutral read before a big software, AI, or rebuild decision.',
]

// Merged from the /my-compass services strip and the About specialties,
// rewritten without jargon.
export const consultingAreas: readonly ConsultingArea[] = [
  {
    title: 'Mapping and fixing how work flows',
    icon: 'i-lucide-git-branch',
    desc: 'Lay out how a request, order, or lead really moves through the business, then remove the handoffs and rework that slow it down.',
  },
  {
    title: 'Numbers you can trust',
    icon: 'i-lucide-bar-chart-3',
    desc: 'Clean up the data behind your reports so pipeline, revenue, and operations numbers match across tools.',
  },
  {
    title: 'Automating the repetitive work',
    icon: 'i-lucide-workflow',
    desc: 'Connect the systems you already pay for and automate the copy-paste work your team does every week.',
  },
  {
    title: 'Updating old systems',
    icon: 'i-lucide-refresh-cw',
    desc: 'Move off aging software or servers one piece at a time, so the business keeps running while it changes.',
  },
  {
    title: 'Using AI with clear rules',
    icon: 'i-lucide-shield-check',
    desc: 'Decide where AI actually helps, set simple rules for how it is used, and check that it does what you expect.',
  },
  {
    title: 'Guiding teams through change',
    icon: 'i-lucide-users',
    desc: 'Work across operations, sales, and engineering so a new process or system is adopted, not just installed.',
  },
]

export const consultingEngagements: readonly ConsultingEngagement[] = [
  {
    key: 'audit',
    name: 'Audit',
    plainName: 'An operations check-up',
    icon: 'i-lucide-search-check',
    color: '#06b6d4',
    length: 'About 1 to 2 weeks',
    bestFor: 'You want to know where time and money are leaking before you spend on new tools or hires.',
    youGet: [
      'Interviews with the people who do the work, plus a look at your tools and data',
      'A written map of how work flows today, what is working, what is risky, and what it costs you',
      'A ranked list of fixes, from quick wins to bigger projects',
      'A call to go over it, with time for questions',
    ],
  },
  {
    key: 'sprint',
    name: 'Sprint',
    plainName: 'A focused project',
    icon: 'i-lucide-rocket',
    color: '#8b5cf6',
    length: 'Usually 2 to 6 weeks',
    bestFor: 'You know what needs fixing, like a broken handoff, a reporting mess, or a system move, and want it done properly.',
    youGet: [
      'A written scope and a fixed price before work starts',
      'Weekly updates in plain language',
      'The new process or system, tested and in use by your team',
      'Written steps and a handoff so your team can run it without me',
    ],
  },
  {
    key: 'retainer',
    name: 'Retainer',
    plainName: 'Ongoing help',
    icon: 'i-lucide-calendar-sync',
    color: '#10b981',
    length: 'Month to month',
    bestFor: 'You want a senior operations and systems advisor on call, for planning, reviews, and decisions, without a full-time hire.',
    youGet: [
      'A set number of hours each month, agreed up front',
      'A regular check-in call',
      'Quick answers by email or chat between calls',
      'Cancel any time with a month of notice',
    ],
  },
]

export const consultingNextSteps: readonly ConsultingStep[] = [
  { title: 'Book a free call', desc: 'Pick a time that works. Around 30 minutes, no cost, and no pressure to sign anything.' },
  { title: 'We talk it through', desc: 'You tell me what is going on. I ask questions and tell you honestly if I am the right fit.' },
  { title: 'You get a written proposal', desc: 'Within a few days: which engagement fits, what I will do, how long it takes, and the price.' },
  { title: 'We start', desc: 'Once you say yes, we set a start date and I keep you updated in plain words the whole way.' },
]

// Built only from facts already on the site (timeline and resume data).
export const consultingPastWork: readonly ConsultingPastWork[] = [
  {
    key: 'leads',
    title: 'Cutting waste at a financial firm',
    summary: 'Rebuilt how leads were parsed and checked at J.D. Mellberg Financial, so bad data stopped reaching the sales team.',
    outcome: 'An estimated $1.2M a year in operational waste removed.',
    url: 'https://www.jdmellbergfinancial.com',
  },
  {
    key: 'maintenance',
    title: 'Less upkeep for client platforms',
    summary: 'Moved client platforms and workflows onto a standard, containerized setup at My Compass Consulting.',
    outcome: 'Ongoing maintenance overhead down 75%.',
  },
  {
    key: 'uptime',
    title: 'Keeping 25+ platforms online',
    summary: 'Run shared hosting and caching for more than 25 production web platforms.',
    outcome: '99.99% uptime.',
  },
  {
    key: 'audits',
    title: 'System audits for commercial clients',
    summary: 'Full-stack reviews that found and fixed DNS and database bottlenecks, and moved on-prem systems to AWS.',
    outcome: 'Ongoing since 2004.',
  },
]
