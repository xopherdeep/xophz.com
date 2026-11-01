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

export interface ResumeOutcome {
  readonly metric: string;
  readonly label: string;
  readonly detail: string;
}

export interface FlagshipApp {
  readonly name: string;
  readonly category: string;
  readonly tagline: string;
  readonly desc: string;
  readonly url?: string;
}

export function useResumeData() {
  const outcomes: readonly ResumeOutcome[] = [
    {
      metric: "$1.2M / yr",
      label: "Operational waste removed",
      detail:
        "J.D. Mellberg Financial: unified Five9 telephony, Salesforce CRM, and marketing data into one operations view and automated lead validation.",
    },
    {
      metric: "75%",
      label: "Less maintenance overhead",
      detail:
        "My Compass Consulting: redesigned client platforms and workflows so they cost far less to keep running.",
    },
    {
      metric: "99.99%",
      label: "Availability across 25+ platforms",
      detail:
        "Kept production platforms for clients and employers up while leading cross-functional architecture work.",
    },
  ];

  const competencies: readonly ResumeCompetency[] = [
    {
      group: "Software",
      items:
        "TypeScript, JavaScript, Vue 3/Nuxt, React, Node.js, Python, REST/GraphQL APIs.",
    },
    {
      group: "Cloud",
      items:
        "AWS (S3, EC2, CloudFront, Route 53, RDS, Lambda), Docker, CI/CD, Edge Caching, Linux/Bash.",
    },
    {
      group: "Data",
      items:
        "MySQL/MariaDB, Redis, SQLite, Telemetry Streaming, Real-Time Dashboards.",
    },
    {
      group: "AI",
      items:
        "Model Context Protocol (MCP), AST-Based Linting, Agent Evals, Context-Isolated Agent Workflows.",
    },
  ];

  const flagshipApps: readonly FlagshipApp[] = [
    {
      name: "YouMeOS",
      category: "Spatial Web Operating System",
      tagline: "Vue 3 Spatial Desktop & Headless Kernel",
      desc: "Browser-based spatial desktop on Vue 3 with a headless REST/event-driven backend.",
      url: "https://www.youmeos.com",
    },
    {
      name: "My Compass Consulting & Software Suite",
      category: "Enterprise Systems & Architecture Advisory",
      tagline: "Legacy Modernization & Modular Systems",
      desc: "Enterprise legacy monolith modernization and bespoke modular software engine engineered on rigid Atomic Design principles.",
      url: "https://www.mycompassconsulting.com",
    },
  ];

  const experience: readonly ResumeJob[] = [
    {
      role: "Principal Agentic Architect & Author",
      company: "Chemical X",
      location: "Remote",
      period: "01/2026 - Present",
      bullets: [
        {
          title: "Agentic AI Engineering Standards",
          detail:
            "Author an open standard and CLI for deterministic AI-assisted coding, published as npx chemx audit and used to score repositories for AI-readiness before deployment.",
        },
        {
          title: "AST Hazard Linting",
          detail:
            "Built static analysis measuring coupling friction and context pollution in codebases where coding agents are active, catching architectural drift that review volume hides.",
        },
        {
          title: "Tool Runtimes & Evaluation",
          detail:
            "Design MCP server bridges and evaluation harnesses holding agent tool-calling to the same regression standards as the rest of the stack.",
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
          title: "Cross-Team Architecture Leadership",
          detail:
            "Led architecture of the core frontend codebase, serving as the bridge between product and backend teams.",
        },
        {
          title: "Containerization & Cloud Reliability",
          detail:
            "Collaborated on containerizing services with Docker on AWS and defined clear API contracts, sustaining 99.99% availability.",
        },
        {
          title: "CI/CD & Engineering Velocity",
          detail:
            "Implemented automated CI/CD workflows and modular component architecture, speeding feature delivery while keeping quality consistent.",
        },
      ],
    },
    {
      role: "Principal Operations & Systems Advisor",
      company: "My Compass Consulting",
      location: "Tucson, AZ",
      period: "12/2004 - Present",
      bullets: [
        {
          title: "Workflow Redesign",
          detail:
            "Redesigned client platforms and workflows, reducing ongoing maintenance overhead by 75%.",
        },
        {
          title: "Operations & Systems Audits",
          detail:
            "Audit operations and systems for commercial and enterprise clients, find the bottlenecks, and move them off fragile on-prem setups.",
        },
        {
          title: "Service Reliability",
          detail:
            "Keep 25+ production client platforms running at 99.99% uptime.",
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
            "Architected and deployed high-performance web applications and interactive tools for travel and destination clients.",
        },
        {
          title: "AWS Infrastructure & Deployment",
          detail:
            "Managed AWS infrastructure and deployment pipelines, optimizing asset delivery, caching policies, and reliability across client sites.",
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
          title: "$1.2M Annual Savings",
          detail:
            "Automated lead validation that eliminated invalid lead spend and manual data cleanup, saving an estimated $1.2M a year.",
        },
        {
          title: "Unified Operations View",
          detail:
            "Built a real-time operations dashboard joining Five9 telephony, Salesforce CRM, and marketing data across millions of lead and call records.",
        },
      ],
    },
  ];

  return {
    outcomes,
    competencies,
    flagshipApps,
    experience,
  };
}
