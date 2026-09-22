export const useProfileData = () => {
  const identity = {
    name: 'Xopher (XP) Pollard',
    title: 'Principal Systems Architect · Distributed Platforms & AI Systems',
    tagline:
      '25+ years architecting sovereign digital infrastructure, enterprise distributed platforms, and deterministic agentic AI runtimes.',
    avatar: '/xp_headshot.webp',
    headshot: '/xopher_jester.webp',
    siteLabel: 'xophz.com',
  };

  const skillTags = [
    'Principal Systems Architect',
    'Distributed Infrastructure',
    'Agentic AI Architecture (MCP)',
    'Enterprise Legacy Modernization',
    'Sovereign Cloud Platforms',
    'AWS & Cloud Systems',
    'Serial Founder',
  ];

  const executivePersonas = [
    {
      key: 'xp',
      name: 'XP',
      subtitle: 'Executive Architect & Founder',
      icon: 'i-lucide-terminal',
      color: '#8b5cf6',
      desc: 'Software architect and founder driving high-stakes systems synthesis, enterprise platforms, and sovereign infrastructure.',
      link: 'https://forthexp.com',
      linkLabel: 'forthexp.com',
      group: 'executive' as const,
    },
    {
      key: 'compass-consulting',
      name: 'My Compass Consulting',
      subtitle: 'Enterprise Systems Architecture & Advisory',
      icon: 'i-lucide-compass',
      color: '#06b6d4',
      desc: 'Principal Systems Architect providing high-ticket architecture advisory, sovereign infrastructure deployment, and enterprise legacy modernization.',
      link: 'https://www.mycompassconsulting.com',
      linkLabel: 'Advisory',
      group: 'executive' as const,
    },
    {
      key: 'midnight-nerd',
      name: 'Midnight Nerd',
      subtitle: 'Deep-Code Systems & Applied R&D',
      icon: 'i-lucide-moon',
      color: '#3b82f6',
      desc: 'Applied systems research, low-level tooling experiments, and mission-critical engineering infrastructure.',
      link: 'https://www.midnightnerd.com',
      linkLabel: 'midnightnerd.com',
      group: 'executive' as const,
    },
  ];

  const creativePersonas = [
    {
      key: 'realmajorad',
      name: 'Majora D.',
      subtitle: 'Sonic Alchemy & Sound Architecture',
      icon: 'i-lucide-music',
      color: '#ec4899',
      desc: 'Original music composition, audio production, and electronic sonic exploration.',
      link: 'https://soundcloud.com/realmajorad',
      linkLabel: 'Music',
      group: 'creative' as const,
    },
    {
      key: 'jestasugjester',
      name: 'Jesta Sugjester',
      subtitle: 'Visual Arts & Narrative Systems',
      icon: 'i-lucide-palette',
      color: '#f59e0b',
      desc: 'Visual art experiments, graphic world-building, and digital narrative aesthetics.',
      link: 'https://instagram.com/jestasugjester',
      linkLabel: '@jestasugjester',
      group: 'creative' as const,
    },
    {
      key: 'hog-tim',
      name: '[HΩG] Tim',
      subtitle: 'Gaming Systems & Network Heritage',
      icon: 'i-lucide-gamepad-2',
      color: '#10b981',
      desc: 'Original server network architect and foundation of Hall of the Gods community gaming infrastructure over 20 years ago.',
      link: 'https://hallofthegods.com',
      linkLabel: '[HΩG] Tim',
      group: 'creative' as const,
    },
  ];

  const personas = [...executivePersonas, ...creativePersonas];

  const stats = [
    { value: '25+', label: 'Years Track Record' },
    { value: 'Enterprise', label: 'Cloud & Distributed Systems' },
    { value: 'Sovereign', label: 'Zero-Trust Infrastructure' },
    { value: 'AI Runtimes', label: 'Deterministic Agentic Systems' },
  ];

  const specialties = [
    {
      key: "agentic",
      title: "Agentic AI & Quantum Architecture",
      icon: "i-lucide-cpu",
      desc: "Architecting zero-hallucination agentic runtimes, Model Context Protocol (MCP) servers, AST hazard linting, and automated evaluation harnesses.",
    },
    {
      key: "modernize",
      title: "Legacy Modernization",
      icon: "i-lucide-zap",
      desc: "Taking rotting monoliths and carving them into clean, scalable services without burning the company down during migration.",
    },
    {
      key: "architect",
      title: "Systems Architecture",
      icon: "i-lucide-building-2",
      desc: "End-to-end architectural blueprints from startup chaos to enterprise-grade reliability, cloud-first from day one.",
    },
    {
      key: "lead",
      title: "Engineering Leadership",
      icon: "i-lucide-target",
      desc: "CTO / VP Eng experience. Building teams, processes, and culture that ship product fast, reliably, and with pride.",
    },
    {
      key: "found",
      title: "Sovereign Infrastructure",
      icon: "i-lucide-rocket",
      desc: "Deploying BlackBOX sovereign architecture for zero-friction scaling, security, and total digital ownership for elite ventures.",
    },
  ];

  const skills = [
    {
      group: "Agentic & AI Systems",
      items: [
        "Model Context Protocol (MCP)",
        "Agentic Evals & Benchmarks",
        "AST Hazard Linting",
        "Deterministic Tool Runtimes",
      ],
    },
    {
      group: "Architecture",
      items: [
        "Distributed Systems",
        "Event-Driven Design",
        "Domain-Driven Design",
        "Microservices",
      ],
    },
    {
      group: "Cloud & Infra",
      items: [
        "AWS (20+ services)",
        "Terraform",
        "Docker / ECS",
        "CI/CD Pipelines",
      ],
    },
    {
      group: "Frontend",
      items: [
        "Vue 3 / Nuxt",
        "React / Next.js",
        "TypeScript",
        "Design Systems",
      ],
    },
    {
      group: "Backend",
      items: ["Node.js", "GraphQL", "REST APIs", "PostgreSQL · Redis"],
    },
  ];

  const projects = [
    {
      key: 'chemical-x',
      name: 'Chemical X',
      tag: 'Agentic AI Runtimes · Live',
      color: '#06b6d4',
      url: 'https://chemicalx.xophz.com',
      desc: 'Deterministic agentic AI runtime standards, AST hazard linter, evaluation benchmarks, and sponsor starter kit vault by 25-Year Principal Systems Architect Xopher Pollard.',
      tier: 'engineering' as const,
    },
    {
      key: 'compass',
      name: 'My Compass Consulting',
      tag: 'Enterprise Advisory · Live',
      color: 'rgb(49, 128, 137)',
      url: 'https://www.mycompassconsulting.com',
      desc: 'Strategic systems synthesis: structural integrity, performance architecture, and zero-downtime legacy modernization for high-throughput enterprise platforms.',
      tier: 'engineering' as const,
    },
    {
      key: 'blackbox',
      name: 'BlackBOX / w⁴ Protocol',
      tag: 'Distributed Compute · Live',
      color: '#555',
      url: 'https://www.buildablox.com',
      desc: 'Proprietary sovereign infrastructure: self-healing, automated compute nodes networked via the w⁴ hyper-cube mesh protocol for sovereign data governance.',
      tier: 'engineering' as const,
    },
    {
      key: 'youmeos',
      name: 'YouMeOS',
      tag: 'Spatial Operating System · Live',
      color: '#a78bfa',
      url: 'https://www.youmeos.com',
      desc: 'Low-latency spatial operating system for the browser powered by Vue 3 and WebGPU over the deterministic Compass Engine.',
      tier: 'engineering' as const,
    },
    {
      key: 'mro-wizard',
      name: 'Planner Wizard',
      tag: 'Workflow Systems · Live',
      color: '#0ea5e9',
      url: 'https://planner.mycompassconsulting.com',
      desc: 'Deterministic workflow orchestration engine and digital planning ecosystem delivering structural clarity and automation to complex enterprise operations.',
      tier: 'engineering' as const,
    },
    {
      key: 'forthexp',
      name: 'Do It for the XP',
      tag: 'State Machine Engine · Live',
      color: '#f30b0b',
      url: 'https://doit.forthexp.com',
      desc: 'Complex finite-state machine and progression engine translating real-world operational grinds into deterministic, rewarding feedback loops.',
      tier: 'engineering' as const,
    },
    {
      key: 'webwork',
      name: 'Worldwide Webwork',
      tag: 'Network Infrastructure · Live',
      color: '#3dee98',
      url: 'https://www.worldwidewebwork.com',
      desc: 'Sovereign network topology engineered for high availability, cryptographic verification, and distributed reliability.',
      tier: 'engineering' as const,
    },
    {
      key: 'bbwg',
      name: 'BlackBOX WhiteGLOVE',
      tag: 'Infrastructure Operations · Live',
      color: '#06b6d4',
      url: 'https://www.blackboxwhiteglove.com',
      desc: 'Concierge sovereign infrastructure and automated node orchestration networked via the w⁴ distributed protocol.',
      tier: 'engineering' as const,
    },
    {
      key: 'hotg',
      name: 'Hall of the Gods, Inc.',
      tag: 'Parent Organization · Live',
      color: '#d9be6f',
      url: 'https://www.hallofthegods.com',
      desc: 'Parent venture organization anchoring distributed infrastructure platforms, creative protocols, and software labs.',
      tier: 'enterprise' as const,
    },
    {
      key: 'tucsonerd',
      name: 'Tucsonerd ACS',
      tag: 'Edge Infrastructure · Active',
      color: 'green',
      url: 'https://acs.tucsonerd.com/',
      desc: 'Edge compute nodes and local network infrastructure anchoring decentralized topology in regional environments.',
      tier: 'engineering' as const,
    },
    {
      key: 'glowitheflow',
      name: 'GlowitheFlow',
      tag: 'Distributed Protocol · Active Build',
      color: '#007bff',
      url: 'https://www.glowitheflow.com',
      desc: 'Decentralized creator distribution network exploring peer-to-peer flow economics and algorithmic routing.',
      tier: 'engineering' as const,
    },
    {
      key: 'triforce',
      name: 'Triforce of the Gods',
      tag: 'Architectural Theory · Framework',
      color: '#d9be6f',
      url: 'https://www.triforceofthegods.com',
      desc: 'Unified systems design and conceptual model bridging structural geometry, alchemical principles, and decentralized web mechanics.',
      tier: 'esoteric' as const,
    },
    {
      key: 'sacredrealm',
      name: 'Sacred Realm',
      tag: 'Creative Archive · Community',
      color: '#c5a059',
      url: 'https://www.sacredrealm.org',
      desc: 'Independent creative archive exploring digital art, narrative world-building, and decentralized cultural connection.',
      tier: 'esoteric' as const,
    },
  ];

  const channelGroups = [
    {
      id: "direct",
      title: "Direct Channels",
      icon: "i-lucide-radio",
      color: "#10b981",
      links: [
        {
          id: "link-calendar",
          label: "Book a Meeting",
          href: "https://calendar.app.google/Y732Ak5gxuCMVoHo8",
          color: "#10b981",
          icon: "i-lucide-calendar",
        },
        {
          id: "link-email",
          label: "Email",
          href: "mailto:sayhi@xophz.com",
          color: "#f59e0b",
          icon: "i-lucide-mail",
        },
        {
          id: "link-discord",
          label: "Discord",
          href: "https://discord.gg/2QDwKKxEqb",
          color: "#5865f2",
          icon: "i-lucide-message-square",
        },
      ],
    },
    {
      id: "profiles",
      title: "Profiles",
      icon: "i-lucide-briefcase",
      color: "#06b6d4",
      links: [
        {
          id: "link-github",
          label: "GitHub",
          href: "https://github.com/xopherdeep",
          color: "#e4e4e7",
          icon: "i-lucide-github",
        },
        {
          id: "link-compass",
          label: "My Compass Consulting",
          href: "https://www.mycompassconsulting.com",
          color: "#06b6d4",
          icon: "i-lucide-compass",
        },
        {
          id: "link-linkedin",
          label: "LinkedIn",
          href: "https://linkedin.com/in/xophz",
          color: "#0a66c2",
          icon: "i-lucide-linkedin",
        },
      ],
    },
    {
      id: "whoami",
      title: "Whoami",
      icon: "i-lucide-fingerprint",
      color: "#a855f7",
      links: [
        {
          id: "link-twitter",
          label: "X / Twitter",
          href: "https://twitter.com/xopherdeep",
          color: "#e4e4e7",
          icon: "i-lucide-twitter",
        },
        {
          id: "link-realmajorad",
          label: "Majora D. ",
          href: "https://soundcloud.com/realmajorad",
          color: "#ec4899",
          icon: "i-lucide-music",
        },
        {
          id: "link-instagram",
          label: "Jesta Sugjester",
          href: "https://instagram.com/jestasugjester",
          color: "#f59e0b",
          icon: "i-lucide-instagram",
        },
      ],
    },
    {
      id: "treasury-social",
      title: "Treasury & Social",
      icon: "i-lucide-wallet",
      color: "#f59e0b",
      links: [
        {
          id: "link-paypal",
          label: "PayPal",
          href: "https://www.paypal.com/biz/profile/xophz",
          color: "#0070BA",
          icon: "i-lucide-credit-card",
        },
        {
          id: "link-cash",
          label: "Cash App",
          href: "https://cash.app/$xopherdeep",
          color: "#00D632",
          icon: "i-lucide-banknote",
        },
        {
          id: "link-venmo",
          label: "Venmo",
          href: "https://venmo.com/u/xopherdeep",
          color: "#008CFF",
          icon: "i-lucide-banknote",
        },
      ],
    },
  ];

  const socialLinks = channelGroups.flatMap((group) => group.links);

  const navChips = [
    { label: "About", to: "/about", icon: "i-lucide-user" },
    { label: "Resume", to: "/resume", icon: "i-lucide-file-text" },
    { label: "Opus", to: "/projects", icon: "i-lucide-briefcase" },
    { label: "Compass", to: "/my-compass", icon: "i-lucide-compass" },
    { label: "Sparks", to: "/sparks", icon: "i-lucide-sparkles" },
    { label: "Blog", to: "/posts", icon: "i-lucide-file-text" },
    { label: "Connect", to: "/connect", icon: "i-lucide-mail" },
  ];

  return {
    identity,
    personas,
    executivePersonas,
    creativePersonas,
    skillTags,
    stats,
    specialties,
    skills,
    projects,
    channelGroups,
    socialLinks,
    navChips,
  };
};
