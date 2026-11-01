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
  readonly category: 'Operations' | 'Delivery' | 'Systems'
  readonly title: string
  readonly summary: string
  readonly outcome: string
  readonly url?: string
}

export const BOOKING_URL = 'https://calendar.app.google/Y732Ak5gxuCMVoHo8'
export const CONTACT_EMAIL = 'sayhi@xophz.com'

export const workServices: readonly WorkService[] = [
  {
    key: 'diagnostics',
    title: 'Operations Diagnostics',
    icon: 'i-lucide-search-check',
    color: '#8b5cf6',
    blurb: 'Find where your operations leak money and time, and why.',
    items: [
      'Audit of how work and data move between teams',
      'The structural bottleneck, named in plain English',
      'Cost of doing nothing, estimated up front',
      'A prioritized plan, not a slide deck',
    ],
  },
  {
    key: 'workflow',
    title: 'Workflow & Systems Design',
    icon: 'i-lucide-workflow',
    color: '#06b6d4',
    blurb: 'Redesign how sales, operations, and delivery hand off work, and the systems underneath.',
    items: [
      'CRM, telephony, and marketing data joined up',
      'Automated validation in place of manual cleanup',
      'Modernizing the platforms that slow teams down',
      'Lower ongoing maintenance overhead',
    ],
  },
  {
    key: 'ai-readiness',
    title: 'AI Readiness & Guardrails',
    icon: 'i-lucide-shield-check',
    color: '#10b981',
    blurb: 'Decide where AI tools fit your workflow and what guardrails they need before rollout.',
    items: [
      'Readiness review of current workflows',
      'Risk and hazard controls for AI-assisted work',
      'Adoption plan your team can follow',
      'Built on the Chemical X auditing standard',
    ],
  },
]

export const workSteps: readonly WorkStep[] = [
  { title: 'Book a call', desc: 'Tell me what is slow, expensive, or breaking. It takes a few minutes and costs nothing.' },
  { title: 'I scope it', desc: 'You get a plain-language diagnosis and a price before any work starts.' },
  { title: 'We fix it', desc: 'I lead the redesign with your team and explain every decision in normal words.' },
]

// Built only from facts already on the site (timeline and resume data).
export const workCaseStudies: readonly WorkCaseStudy[] = [
  {
    key: 'leads',
    category: 'Operations',
    title: 'Cutting $1.2M a year in waste at a financial firm',
    summary: 'Joined Five9 telephony, Salesforce CRM, and marketing data into one real-time operations view for J.D. Mellberg Financial, then automated the lead validation that was burning spend.',
    outcome: 'An estimated $1.2M a year in operational waste removed.',
    url: 'https://www.jdmellbergfinancial.com',
  },
  {
    key: 'maintenance',
    category: 'Systems',
    title: 'Cutting maintenance overhead by 75%',
    summary: 'Redesigned client platforms and workflows at My Compass Consulting so they cost far less to keep running.',
    outcome: '75% less ongoing maintenance, with 25+ production platforms at 99.99% uptime.',
  },
  {
    key: 'agency',
    category: 'Delivery',
    title: 'Running client delivery for an agency',
    summary: 'Ran Midnight Nerd, delivering systems integration and cloud management for clients, and later managed AWS delivery for destination clients at Madden Media.',
    outcome: '2014 to 2021 of client delivery.',
    url: 'https://midnightnerd.com',
  },
]
