export interface CaseStudyResult {
  readonly value: string
  readonly label: string
}

export interface CaseStudy {
  readonly key: string
  readonly client: string
  readonly title: string
  readonly role: string
  readonly period: string
  readonly url?: string
  readonly linkLabel?: string
  readonly problem: string
  readonly approach: readonly string[]
  readonly results: readonly CaseStudyResult[]
  readonly skills: readonly string[]
}

// Every claim here comes from app/composables/useResumeData.ts and
// app/data/timelineCatalog.ts. Change those first if a fact changes.
export const caseStudies: readonly CaseStudy[] = [
  {
    key: 'vi',
    client: 'Vi',
    title: 'Keeping a growing product fast to ship and always up',
    role: 'System Architect',
    period: 'Dec 2021 to Jan 2026',
    url: 'https://www.vi.co',
    linkLabel: 'Visit Vi',
    problem:
      'The product interfaces depended on a set of distributed backend services. The frontend needed one clear architecture, and services needed to run reliably on AWS while the team kept shipping features.',
    approach: [
      'Led the architecture and development of the core frontend codebase, acting as the bridge between the product interfaces and the backend services.',
      'Worked with the team to put services in Docker containers on AWS, and defined clear API contracts between them.',
      'Set up automated CI/CD workflows and a modular component architecture so new features reused tested parts.',
    ],
    results: [
      { value: '99.99%', label: 'availability sustained' },
      { value: '4+ yrs', label: 'as system architect' },
      { value: 'Faster', label: 'feature delivery with consistent quality' },
    ],
    skills: ['Frontend Architecture', 'AWS', 'Docker', 'API Contracts', 'CI/CD', 'TypeScript'],
  },
  {
    key: 'jd-mellberg-tracking-first',
    client: 'JD Mellberg Financial / Tracking First',
    title: 'Cutting $1.2M a year of wasted lead spend',
    role: 'Senior Full-Stack Developer',
    period: '2015 to 2019',
    url: 'https://www.jdmellbergfinancial.com',
    linkLabel: 'Visit JD Mellberg Financial',
    problem:
      'Leads and calls flowed in from telephony, CRM and marketing systems that did not talk to each other. Invalid leads were being paid for, and staff spent time cleaning bad data by hand.',
    approach: [
      'Built high-throughput lead parsing pipelines and an automated validation layer that stopped invalid leads before they were bought.',
      'Built a real-time operations dashboard joining Five9 telephony, Salesforce CRM and marketing APIs across millions of lead and call records.',
      'At Tracking First, automated analytics governance with real-time campaign parameter validation and enterprise integration workflows in Node.js.',
    ],
    results: [
      { value: '~$1.2M', label: 'estimated savings per year' },
      { value: 'Millions', label: 'of lead and call records in one dashboard' },
      { value: 'Less', label: 'manual data cleanup' },
    ],
    skills: ['Data Pipelines', 'Data Validation', 'Salesforce', 'Five9', 'Node.js', 'Database Architecture'],
  },
  {
    key: 'my-compass',
    client: 'My Compass Consulting clients',
    title: 'Running and modernizing 25+ client platforms',
    role: 'Founder & Principal Architect',
    period: '2018 to present',
    url: 'https://www.mycompassconsulting.com',
    linkLabel: 'Visit My Compass Consulting',
    problem:
      'Commercial and enterprise clients came with aging monoliths, on-prem servers, and slow DNS and database setups that were costly to maintain.',
    approach: [
      'Ran full-stack architecture audits to find DNS and database bottlenecks, then fixed them and moved on-prem systems to AWS.',
      'Broke legacy monoliths into modular pieces built on Atomic Design with Nuxt and Vue 3, now 40+ production extensions.',
      'Moved client platforms and workflow engines into containers on shared multi-tenant edge infrastructure with automated edge caching.',
    ],
    results: [
      { value: '25+', label: 'production web platforms hosted' },
      { value: '99.99%', label: 'uptime' },
      { value: '75%', label: 'less ongoing maintenance overhead' },
    ],
    skills: ['Architecture Audits', 'Monolith Modernization', 'AWS', 'Edge Caching', 'Nuxt & Vue 3', 'Atomic Design'],
  },
]
