export interface ResumeCompetency {
  readonly group: string
  readonly items: string
}

export interface ResumeBullet {
  readonly title: string
  readonly detail: string
}

export interface ResumeJob {
  readonly role: string
  readonly company: string
  readonly location: string
  readonly period: string
  readonly bullets: readonly ResumeBullet[]
}

export interface FlagshipApp {
  readonly name: string
  readonly category: string
  readonly tagline: string
  readonly desc: string
  readonly url?: string
}

export function useResumeData() {
  const competencies: readonly ResumeCompetency[] = [
    {
      group: 'Cloud-Native & Distributed Systems',
      items: 'Kubernetes, Docker, AWS (20+ core services), GCP, Terraform (IaC), Microservices, Multi-Tenancy, Zero-Trust Networking, Edge Caching, Sovereign Protocols (w4).'
    },
    {
      group: 'High-Throughput Data & Observability',
      items: 'Event-Driven Pipelines, Asynchronous Queuing, Telemetry Streaming, REST & GraphQL APIs, Prometheus, OpenTelemetry, SRE Runbooks, Distributed Caching.'
    },
    {
      group: 'Full-Stack, Graphics & Spatial Computing',
      items: 'TypeScript, Node.js, Python, C#, WebGPU & WebGL Shaders, Vue 3 & Nuxt, React & Next.js, Linux Internals, Distributed State Orchestration.'
    },
    {
      group: 'Agentic Systems & Architecture',
      items: 'Disciplined Atomic Design, Context-Isolated AI Agent Workflows, Prompt Architecture, Automated Self-Healing Runtimes.'
    }
  ]

  const flagshipApps: readonly FlagshipApp[] = [
    {
      name: 'YouMeOS',
      category: 'Spatial Operating System',
      tagline: 'Vue 3 + WebGPU Spatial Web OS',
      desc: 'Browser-based spatial computing operating system leveraging custom WebGPU pipelines for dense volumetric 3D information spaces with steady frame rates.',
      url: 'https://www.youmeos.com'
    },
    {
      name: 'COMPASS Platform & Sparks',
      category: 'Application Engine',
      tagline: 'Bespoke Personal Software Platform',
      desc: 'Bespoke internal application ecosystem and synchronized tool suite built on rigid Atomic Design with offline-first zero latency.',
      url: 'https://planner.mycompassconsulting.com'
    },
    {
      name: 'BlackBOX & w4 Protocol',
      category: 'Sovereign Infrastructure',
      tagline: 'Self-Healing Sovereign Server Nodes',
      desc: 'Proprietary sovereign infrastructure nodes featuring automated self-healing runtimes, multi-tenant container orchestration, and w4 Hyper-cube networking protocol.',
      url: 'https://www.buildablox.com'
    },
    {
      name: 'MRO Planner Wizard',
      category: 'Workflow Ecosystem',
      tagline: 'Enterprise Daily Planning & Onboarding',
      desc: 'Digital planning and onboarding ecosystem engineered to bring structural integrity, automated clarity, and rigid validation to mission-critical daily workflows.',
      url: 'https://planner.mycompassconsulting.com'
    },
    {
      name: 'Do It For The XP & GlowitheFlow',
      category: 'Gamification & Flow',
      tagline: 'Productivity Mechanics & Creator Economics',
      desc: 'Gamified progression engines translating real grinds into rewarding RPG mechanics, paired with flow-economy creator networks using mutual promotion economics.',
      url: 'https://doit.forthexp.com'
    }
  ]

  const experience: readonly ResumeJob[] = [
    {
      role: 'Managing Practice Lead & Principal Architect',
      company: 'Hall of the Gods, Inc. / My Compass Consulting',
      location: 'Tucson, AZ',
      period: '12/2004 - Present',
      bullets: [
        {
          title: 'Federated Network Operations',
          detail: 'Architected, deployed, and manage multi-tenant edge infrastructure spanning 25+ active production web platforms and utilities, routing 160,000+ monthly requests with automated edge caching and 99.99% uptime.'
        },
        {
          title: 'Sovereign Systems & Platform Engineering',
          detail: 'Designed and delivered scalable, containerized client platforms and workflow engines (including BlackBOX self-healing nodes and developer utilities), reducing ongoing maintenance overhead by 80%.'
        },
        {
          title: 'B2B Systems Advisory',
          detail: 'Directed technical infrastructure engagements for commercial and enterprise clients, conducting full-stack architecture audits, resolving DNS and database bottlenecks, and migrating fragmented on-prem setups into secure cloud environments.'
        },
        {
          title: 'Next-Gen Spatial Computing',
          detail: 'Engineered browser-based spatial operating system prototypes (YouMeOS), stress-testing WebGPU rendering pipelines and complex state coordination for dense volumetric information spaces.'
        }
      ]
    },
    {
      role: 'Principal Systems Architect & Cloud Modernization Lead',
      company: 'Vi',
      location: 'Remote',
      period: '12/2021 - 01/2026',
      bullets: [
        {
          title: 'Cloud Modernization',
          detail: 'Spearheaded enterprise transition from monolithic legacy systems to containerized cloud-native platforms on AWS and Kubernetes, sustaining continuous 99.99% availability without operational disruption.'
        },
        {
          title: 'Observability & Reliability',
          detail: 'Built automated SRE monitoring frameworks and APM telemetry pipelines, cutting incident mean-time-to-resolution (MTTR) by 45% and establishing strict on-call operational runbooks.'
        },
        {
          title: 'DevSecOps Standard',
          detail: 'Implemented multi-repository CI/CD automation and modular Terraform IaC frameworks, accelerating feature delivery velocity while enforcing rigid compliance and security boundaries.'
        }
      ]
    },
    {
      role: 'Senior Software Architect (Data-Intensive Systems)',
      company: 'J.D. Mellberg Financial / Tracking First',
      location: 'Tucson, AZ',
      period: '08/2015 - 10/2019',
      bullets: [
        {
          title: 'High-Throughput Ingestion',
          detail: 'Architected enterprise telemetry pipelines and distributed document databases, parsing and validating millions of transaction records in real time with near-zero latency and strict auditability.'
        },
        {
          title: 'Operational Cost Reduction',
          detail: 'Engineered dynamic analytics transparency layers and automated data validation services, eliminating processing redundancies and saving an estimated $1.2M in annual operational waste.'
        }
      ]
    }
  ]

  return {
    competencies,
    flagshipApps,
    experience
  }
}
