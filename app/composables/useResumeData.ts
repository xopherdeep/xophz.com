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
      group: "Cloud Systems & Architecture",
      items:
        "Docker Containerization, AWS (S3, EC2, CloudFront, Route 53, RDS, Lambda), Monolith Modernization, Service Decomposition, Edge Caching, Sovereign Protocols (w4).",
    },
    {
      group: "Data Integration & Observability",
      items:
        "REST & GraphQL APIs, Telemetry Streaming, Real-Time Dashboards, MySQL / MariaDB, Redis, SQLite, Application Monitoring, Distributed State Management.",
    },
    {
      group: "Full-Stack, Graphics & Spatial Systems",
      items:
        "TypeScript, JavaScript, Node.js, Python, Vue 3 & Nuxt, React, Linux Systems Administration & Bash, WebGL & Experimental WebGPU Pipelines.",
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
      tagline: "Vue 3 Spatial Desktop & Headless Kernel",
      desc: "Browser-based spatial desktop environment built on Vue 3 and headless REST/event-driven backends, with active R&D into custom WebGPU render pipelines.",
      url: "https://www.youmeos.com",
    },
    {
      name: "Chemical X",
      category: "Agentic AI & Architectural Standards",
      tagline: "Open Engineering Standards for Deterministic AI Coding",
      desc: "Architectural standards specification, MCP runtime tooling, and AST hazard linter authored for deterministic, zero-regression agentic software development.",
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
            "Architected, deployed, and maintain multi-tenant edge infrastructure spanning 25+ active production web platforms and utilities, delivering high-availability client operations with automated edge caching and 99.99% uptime.",
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
            "Engineered browser-based spatial operating system prototypes (YouMeOS), exploring WebGPU rendering pipelines and complex state coordination for dense volumetric information spaces.",
        },
        {
          title: "Agentic AI & Quantum Architecture",
          detail:
            "Authored Chemical X agent standards, Model Context Protocol (MCP) tool bridges, and AST hazard validation suites enforcing deterministic code generation across agentic runtimes.",
        },
      ],
    },
    {
      role: "System Architect",
      company: "Vi",
      location: "Remote",
      period: "12/2021 - 01/2026",
      bullets: [
        {
          title: "Frontend Architecture & Systems Bridge",
          detail:
            "Led architecture and development of the core frontend application codebase, serving as the primary architectural bridge between product interfaces and complex distributed backend services.",
        },
        {
          title: "Containerization & Cloud Reliability",
          detail:
            "Collaborated on containerizing services with Docker across AWS environments, establishing clear API contracts and sustaining continuous 99.99% availability.",
        },
        {
          title: "CI/CD & Engineering Velocity",
          detail:
            "Implemented automated CI/CD workflows and modular component architecture, accelerating feature delivery cycles while enforcing consistent quality standards across releases.",
        },
      ],
    },
    {
      role: "Senior Front-End Engineer & AWS Cloud Manager",
      company: "Madden Media",
      location: "Tucson, AZ",
      period: "01/2020 - 10/2021",
      bullets: [
        {
          title: "Destination Web Platforms",
          detail:
            "Architected and deployed high-performance responsive web applications, interactive visual tools, and destination marketing platforms for premier travel clients.",
        },
        {
          title: "AWS Infrastructure & Deployment",
          detail:
            "Managed core AWS cloud infrastructure and deployment pipelines, optimizing asset delivery, caching policies, and reliability across client production sites.",
        },
      ],
    },
    {
      role: "Senior Full-Stack Developer",
      company: "J.D. Mellberg Financial / Tracking First",
      location: "Tucson, AZ",
      period: "06/2015 - 10/2019",
      bullets: [
        {
          title: "Operational Integration Dashboard",
          detail:
            "Architected and engineered real-time operational dashboard integrating Five9 telephony, Salesforce CRM, and marketing API endpoints, delivering actionable visibility into millions of lead and call records.",
        },
        {
          title: "Lead Validation & Operational Savings",
          detail:
            "Engineered automated data validation and analytics transparency layers, eliminating invalid financial lead acquisition and manual data-cleansing operations to save an estimated $1.2M annually.",
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
