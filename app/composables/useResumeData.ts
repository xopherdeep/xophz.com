export interface ResumeCompetency {
  readonly group: string;
  readonly items: string;
}

export interface ResumeBullet {
  readonly title: string;
  readonly detail: string;
}

export interface ResumeJob {
  readonly role: string;
  readonly company: string;
  readonly location: string;
  readonly period: string;
  readonly bullets: readonly ResumeBullet[];
}

export interface FlagshipApp {
  readonly name: string;
  readonly category: string;
  readonly tagline: string;
  readonly desc: string;
  readonly url?: string;
}

export function useResumeData() {
  const competencies: readonly ResumeCompetency[] = [
    {
      group: "Cloud-Native & Distributed Systems",
      items:
        "Kubernetes, Docker, AWS (20+ core services), GCP, Terraform (IaC), Microservices, Multi-Tenancy, Zero-Trust Networking, Edge Caching, Sovereign Protocols (w4).",
    },
    {
      group: "High-Throughput Data & Observability",
      items:
        "Event-Driven Pipelines, Asynchronous Queuing, Telemetry Streaming, REST & GraphQL APIs, Prometheus, OpenTelemetry, SRE Runbooks, Distributed Caching.",
    },
    {
      group: "Full-Stack, Graphics & Spatial Computing",
      items:
        "TypeScript, Node.js, Python, C#, WebGPU & WebGL Shaders, Vue 3 & Nuxt, React & Next.js, Linux Internals, Distributed State Orchestration.",
    },
    {
      group: "Agentic Systems & Architecture",
      items:
        "Model Context Protocol (MCP), Agentic Evals & Behavioral Benchmarks, AST Hazard Linting, Deterministic Tool-Calling Runtimes, Context-Isolated Agent Workflows, Disciplined Atomic Design.",
    },
  ];

  const flagshipApps: readonly FlagshipApp[] = [
    {
      name: "YouMeOS",
      category: "Spatial Web Operating System",
      tagline: "Vue 3 + WebGPU Spatial Environment",
      desc: "Browser-based spatial computing operating system leveraging custom WebGPU render pipelines for dense volumetric 3D information spaces with steady 60 FPS performance.",
      url: "https://www.youmeos.com",
    },
    {
      name: "Chemical X",
      category: "Agentic AI & Architectural Standards",
      tagline: "Engineering Standards for Deterministic AI Coding",
      desc: "Architectural standards specification and AST hazard linter for deterministic, zero-regression agentic software development and tool-calling execution.",
      url: "https://chemicalx.xophz.com",
    },
    {
      name: "My Compass Consulting & Software Suite",
      category: "Enterprise Systems & Architecture Advisory",
      tagline: "Strategic Systems Synthesis & Bespoke Software Engine",
      desc: "High-stakes technology advisory, enterprise legacy monolith modernization, and bespoke modular software engine engineered on rigid Atomic Design principles.",
      url: "https://www.mycompassconsulting.com",
    },
  ];

  const experience: readonly ResumeJob[] = [
    {
      role: "Managing Practice Lead & Principal Architect",
      company: "Hall of the Gods, Inc. / My Compass Consulting",
      location: "Tucson, AZ",
      period: "12/2004 - Present",
      bullets: [
        {
          title: "Federated Network Operations",
          detail:
            "Architected, deployed, and manage multi-tenant edge infrastructure spanning 25+ active production web platforms and utilities, routing 160,000+ monthly requests with automated edge caching and 99.99% uptime.",
        },
        {
          title: "Sovereign Systems & Platform Engineering",
          detail:
            "Designed and delivered scalable, containerized client platforms and workflow engines (including BlackBOX self-healing nodes and developer utilities), reducing ongoing maintenance overhead by 75%.",
        },
        {
          title: "B2B Systems Advisory",
          detail:
            "Directed technical infrastructure engagements for commercial and enterprise clients, conducting full-stack architecture audits, resolving DNS and database bottlenecks, and migrating fragmented on-prem setups into secure cloud environments.",
        },
        {
          title: "Next-Gen Spatial Computing",
          detail:
            "Engineered browser-based spatial operating system prototypes (YouMeOS), stress-testing WebGPU rendering pipelines and complex state coordination for dense volumetric information spaces.",
        },
        {
          title: "Agentic AI & Quantum Architecture",
          detail:
            "Engineered Chemical X zero-hallucination agent standards, Model Context Protocol (MCP) tool bridges, and AST hazard validation suites enforcing deterministic code generation across autonomous agent runtimes.",
        },
      ],
    },
    {
      role: "Principal Systems Architect & Cloud Modernization Lead",
      company: "Vi",
      location: "Remote",
      period: "12/2021 - 01/2026",
      bullets: [
        {
          title: "Cloud Modernization",
          detail:
            "Spearheaded enterprise transition from monolithic legacy systems to containerized cloud-native platforms on AWS and Kubernetes, sustaining continuous 99.99% availability without operational disruption.",
        },
        {
          title: "Observability & Reliability",
          detail:
            "Built automated SRE monitoring frameworks and APM telemetry pipelines, cutting incident mean-time-to-resolution (MTTR) by 45% and establishing strict on-call operational runbooks.",
        },
        {
          title: "DevSecOps Standard",
          detail:
            "Implemented multi-repository CI/CD automation and modular Terraform IaC frameworks, accelerating feature delivery velocity while enforcing rigid compliance and security boundaries.",
        },
      ],
    },
    {
      role: "Senior Software Architect (Data-Intensive Systems)",
      company: "J.D. Mellberg Financial / Tracking First",
      location: "Tucson, AZ",
      period: "06/2015 - 10/2019",
      bullets: [
        {
          title: "High-Throughput Ingestion",
          detail:
            "Architected enterprise telemetry pipelines and distributed document databases, parsing and validating millions of transaction records in real time with near-zero latency and strict auditability.",
        },
        {
          title: "Operational Cost Reduction",
          detail:
            "Engineered dynamic analytics transparency layers and automated data validation services, eliminating processing redundancies and saving an estimated $1.2M in annual operational waste.",
        },
      ],
    },
  ];

  return {
    competencies,
    flagshipApps,
    experience,
  };
}
