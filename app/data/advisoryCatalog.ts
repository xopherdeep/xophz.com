// Homepage offerings. Distinct from workCatalog, which backs /work-with-me:
// that page catches jobs of any size, this one sells the advisory seat.
export interface AdvisoryService {
  readonly key: string
  readonly title: string
  readonly icon: string
  readonly color: string
  readonly blurb: string
  readonly items: readonly string[]
}

export interface AdvisoryStep {
  readonly title: string
  readonly desc: string
}

// Three engagement shapes rather than three topics: ongoing, build, assess.
// Each is a different budget, so nobody leaves because the only door was too big.
export const advisoryServices: readonly AdvisoryService[] = [
  {
    key: 'fractional-cto',
    title: 'Fractional CTO',
    icon: 'i-lucide-compass',
    color: '#8b5cf6',
    blurb: 'You have engineers and nobody owning the technical direction. I take that seat, part time.',
    items: [
      'Architecture decisions and standards',
      'Build versus buy calls',
      'Technical roadmaps you can staff',
      'Hiring and team guidance',
    ],
  },
  {
    key: 'agentic-ai',
    title: 'Agentic AI Systems',
    icon: 'i-lucide-cpu',
    color: '#06b6d4',
    blurb: 'AI in production without the guesswork. Deterministic tooling, tested the way the rest of your stack is.',
    items: [
      'MCP servers and tool runtimes',
      'Evaluation harnesses and benchmarks',
      'AST hazard linting',
      'AI-readiness audits',
    ],
  },
  {
    key: 'architecture-review',
    title: 'Architecture Review',
    icon: 'i-lucide-search-check',
    color: '#10b981',
    blurb: 'A clear read on what you have, what is going to break, and what to do first.',
    items: [
      'Second opinions on big decisions',
      'Legacy modernization plans',
      'Performance and reliability audits',
      'Findings in plain language',
    ],
  },
]

export const advisorySteps: readonly AdvisoryStep[] = [
  {
    title: 'Book a call',
    desc: 'Tell me what you are building and what is in the way. Thirty minutes, no charge.',
  },
  {
    title: 'I scope it',
    desc: 'You get a written read on the problem and a price before any work starts.',
  },
  {
    title: 'We start',
    desc: 'Ongoing as your CTO, or a fixed engagement with a clear end. Your call.',
  },
]
