// The four ventures that earn a homepage tile. xophz.com is the hub that
// explains the person; each venture has its own site and sells itself there,
// so these are doors, not pitches.
export interface Portal {
  readonly key: string
  readonly name: string
  readonly role: string
  readonly desc: string
  readonly url: string
  readonly linkLabel: string
  readonly color: string
  readonly icon: string
}

export const portals: readonly Portal[] = [
  {
    key: 'compass',
    name: 'My Compass Consulting',
    role: 'Advisory & Architecture',
    desc: 'Architecture advisory, systemic audits, and zero-downtime legacy modernization for enterprise platforms.',
    url: 'https://www.mycompassconsulting.com',
    linkLabel: 'mycompassconsulting.com',
    color: '#06b6d4',
    icon: 'i-lucide-compass',
  },
  {
    key: 'chemical-x',
    name: 'Chemical X',
    role: 'Agentic AI Standards',
    desc: 'Deterministic agentic runtimes, AST hazard linting, and evaluation benchmarks. Run it against your own repository.',
    url: 'https://chemicalx.xophz.com',
    linkLabel: 'chemicalx.xophz.com',
    color: '#8b5cf6',
    icon: 'i-lucide-cpu',
  },
  {
    key: 'webwork',
    name: 'Worldwide Webwork',
    role: 'Sovereign Infrastructure',
    desc: 'The w⁴ protocol and BlackBOX sovereign hosting: self-healing, distributed, and owned outright.',
    url: 'https://www.worldwidewebwork.com',
    linkLabel: 'worldwidewebwork.com',
    color: '#3dee98',
    icon: 'i-lucide-network',
  },
  {
    key: 'forthexp',
    name: 'Do It for the XP',
    role: 'Founder & Ventures',
    desc: 'The founder side: state machine engines, product experiments, and the ventures that come out of them.',
    url: 'https://forthexp.com',
    linkLabel: 'forthexp.com',
    color: '#f30b0b',
    icon: 'i-lucide-gamepad-2',
  },
]

// Project keys already surfaced as portals, so the platform strip below the
// tiles shows the rest of the work instead of repeating them.
export const PORTAL_PROJECT_KEYS: readonly string[] = ['compass', 'chemical-x', 'webwork', 'forthexp']
