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
  'Small business owners who need someone to sort out their tech, without hiring a full-time person.',
  'Teams stuck on an old system that is slow, fragile, or costly to keep running.',
  'Founders who want an experienced second opinion before spending money on software or a rebuild.',
  'Anyone who has been handed a tech decision and wants it explained in plain words.',
]

// Merged from the /my-compass services strip and the About specialties,
// rewritten without jargon.
export const consultingAreas: readonly ConsultingArea[] = [
  {
    title: 'Updating old systems',
    icon: 'i-lucide-refresh-cw',
    desc: 'Move off old software or servers one piece at a time, so the business keeps running while it changes.',
  },
  {
    title: 'Planning how your systems fit together',
    icon: 'i-lucide-building-2',
    desc: 'A clear map of your tools, data, and hosting, and a plan for what to keep, fix, or replace.',
  },
  {
    title: 'Cloud and hosting costs',
    icon: 'i-lucide-cloud',
    desc: 'Find out what you are paying for, cut what you do not need, and make the rest more reliable.',
  },
  {
    title: 'Custom tools and automation',
    icon: 'i-lucide-workflow',
    desc: 'Plugins, small apps, and scripts that take repetitive work off your plate, including WordPress and Vue.',
  },
  {
    title: 'Using AI safely',
    icon: 'i-lucide-cpu',
    desc: 'Where AI tools can actually help, how to set them up, and how to check they do what you expect.',
  },
  {
    title: 'Guiding a tech team',
    icon: 'i-lucide-users',
    desc: 'Senior help for a small team: reviews, standards, hiring advice, and a steady hand on big decisions.',
  },
]

export const consultingEngagements: readonly ConsultingEngagement[] = [
  {
    key: 'audit',
    name: 'Audit',
    plainName: 'A tech check-up',
    icon: 'i-lucide-search-check',
    color: '#06b6d4',
    length: 'About 1 to 2 weeks',
    bestFor: 'You want to know where you stand before spending money, or something feels off and you are not sure what.',
    youGet: [
      'A walkthrough of your current setup with you',
      'A short written report of what is working, what is risky, and what it costs you',
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
    bestFor: 'You know what needs doing, like a migration, a new tool, or a cleanup, and want it done properly.',
    youGet: [
      'A written scope and a fixed price before work starts',
      'Weekly updates in plain language',
      'The finished work, tested and running',
      'Notes and a handoff so you or your team can look after it',
    ],
  },
  {
    key: 'retainer',
    name: 'Retainer',
    plainName: 'Ongoing help',
    icon: 'i-lucide-calendar-sync',
    color: '#10b981',
    length: 'Month to month',
    bestFor: 'You want a senior tech person on call, for questions, reviews, and planning, without a full-time hire.',
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
    summary: 'Built the lead-parsing and data validation systems for JD Mellberg Financial.',
    outcome: 'An estimated $1.2M a year in operational waste removed.',
    url: 'https://www.jdmellbergfinancial.com',
  },
  {
    key: 'agency',
    title: 'Midnight Nerd: custom software and systems for clients',
    summary: 'Ran a small digital agency delivering tailored websites, systems integration, and cloud management.',
    outcome: '2014 to 2020 of client delivery.',
    url: 'https://midnightnerd.com',
  },
]
