export type TimelineCategory =
  | 'Founding & Advisory'
  | 'Enterprise Systems'
  | 'Software Engineering'
  | 'Infrastructure & Tech'

export type TimelineEraKey =
  | 'sovereign'
  | 'enterprise'
  | 'agency'
  | 'foundational'
  | 'genesis'

export type TimelineEngagementType =
  | 'Venture Founder'
  | 'Strategic Advisory'
  | 'Enterprise Architecture'
  | 'Client SOW'
  | 'Foundational Tech'
  | 'Family Venture'

export interface TimelineEra {
  readonly key: TimelineEraKey
  readonly title: string
  readonly period: string
  readonly desc: string
}

export interface TimelineItem {
  readonly id: string
  readonly company: string
  readonly role: string
  readonly period: string
  readonly startDate: string
  readonly endDate: string | null
  readonly duration: string
  readonly url: string
  readonly logoUrl: string | null
  readonly isCurrent: boolean
  readonly isFeatured: boolean
  readonly engagementType: TimelineEngagementType
  readonly category: TimelineCategory
  readonly eraKey: TimelineEraKey
  readonly highlight: string
  readonly skills: readonly string[]
}

export const TIMELINE_ERAS: readonly TimelineEra[] = [
  {
    key: 'sovereign',
    title: 'Sovereign Architecture & Ecosystem',
    period: '2018 - Present',
    desc: 'Federated networks, spatial computing operating systems, and decentralized web protocols.'
  },
  {
    key: 'enterprise',
    title: 'Enterprise Modernization & Cloud Scale',
    period: '2014 - 2026',
    desc: 'Kubernetes containerization, high-throughput financial pipelines, and SRE observability.'
  },
  {
    key: 'agency',
    title: 'Agency Solutions & Systems Architecture',
    period: '2004 - 2014',
    desc: 'Full-stack consulting, custom enterprise CMS engineering, and client infrastructure advisory.'
  },
  {
    key: 'foundational',
    title: 'Foundational Systems & Hardware Engineering',
    period: '2001 - 2004',
    desc: 'Campus IT leadership, hardware diagnosis, network field engineering, and early commercial web design.'
  },
  {
    key: 'genesis',
    title: 'Pre-Digital Showmanship & Illusion',
    period: '1990 - 199X',
    desc: 'Apprentice magician tenure, stage illusion, family state fair road tours, and foundational crowd psychology.'
  }
]

export const timelineCatalog: readonly TimelineItem[] = [
  {
    id: 'chemical-x',
    company: 'Chemical X',
    role: 'Principal Agentic Architect & Author',
    period: 'Jan 2026 - Present',
    startDate: '2026-01',
    endDate: null,
    duration: '9+ mos',
    url: 'https://chemicalx.xophz.com',
    logoUrl: null,
    isCurrent: true,
    isFeatured: true,
    engagementType: 'Venture Founder',
    category: 'Founding & Advisory',
    eraKey: 'sovereign',
    highlight: 'Engineering Quantum Architecture standards, Model Context Protocol (MCP) tool bridges, and AST hazard validation suites for zero-hallucination AI software development.',
    skills: ['Agentic Systems', 'Model Context Protocol (MCP)', 'Quantum Architecture', 'AST Linting', 'Deterministic Tooling']
  },
  {
    id: 'worldwide-webwork',
    company: 'Worldwide Webwork',
    role: 'Founder & Principal Systems Synthesist',
    period: 'Oct 2019 - Present',
    startDate: '2019-10',
    endDate: null,
    duration: '6+ yrs',
    url: 'https://www.worldwidewebwork.com',
    logoUrl: null,
    isCurrent: true,
    isFeatured: true,
    engagementType: 'Venture Founder',
    category: 'Founding & Advisory',
    eraKey: 'sovereign',
    highlight: 'Architecting decentralized hyper-cube node topology and sovereign web protocols connecting modern distributed nodes.',
    skills: ['Sovereign Protocols', 'Distributed Systems', 'Edge Architecture', 'w4 Protocol']
  },
  {
    id: 'my-compass-consulting',
    company: 'My Compass Consulting',
    role: 'Founder & Custom Solutions Architect',
    period: 'May 2018 - Present',
    startDate: '2018-05',
    endDate: null,
    duration: '7+ yrs',
    url: 'https://www.mycompassconsulting.com',
    logoUrl: null,
    isCurrent: true,
    isFeatured: true,
    engagementType: 'Strategic Advisory',
    category: 'Founding & Advisory',
    eraKey: 'sovereign',
    highlight: 'Bespoke systems architecture advisory, enterprise legacy monolith modernization, and 40+ modular production extensions.',
    skills: ['Architecture Advisory', 'Monolith Modernization', 'Atomic Design', 'Nuxt & Vue 3']
  },
  {
    id: 'hall-of-the-gods',
    company: 'Hall of the Gods, Inc.',
    role: 'Founder & CEO',
    period: 'Dec 2004 - Present',
    startDate: '2004-12',
    endDate: null,
    duration: '21+ yrs',
    url: 'https://www.hallofthegods.com',
    logoUrl: null,
    isCurrent: true,
    isFeatured: true,
    engagementType: 'Venture Founder',
    category: 'Founding & Advisory',
    eraKey: 'sovereign',
    highlight: 'Foundational parent holding entity providing sovereign governance, technical direction, and infrastructure across platform ventures.',
    skills: ['Executive Leadership', 'Ecosystem Governance', 'Venture Engineering', 'Infrastructure']
  },
  {
    id: 'vi-labs',
    company: 'Vi Labs',
    role: 'System Architect',
    period: 'Dec 2021 - Jan 2026',
    startDate: '2021-12',
    endDate: '2026-01',
    duration: '4 yrs 2 mos',
    url: 'https://www.vi.co',
    logoUrl: 'https://companies-data-service-static-production.alphasights.com/logos/32117ab5-b097-4c27-b7fe-8d72192919da.png',
    isCurrent: false,
    isFeatured: true,
    engagementType: 'Enterprise Architecture',
    category: 'Enterprise Systems',
    eraKey: 'enterprise',
    highlight: 'Enterprise transition to containerized AWS and Kubernetes platforms, automated SRE pipelines, and 99.99% uptime delivery.',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'SRE & Observability', 'Docker']
  },
  {
    id: 'madden-media',
    company: 'Madden Media',
    role: 'Senior Front End Engineer',
    period: 'Jan 2020 - Oct 2021',
    startDate: '2020-01',
    endDate: '2021-10',
    duration: '1 yr 10 mos',
    url: 'https://maddenmedia.com',
    logoUrl: 'https://companies-data-service-static-production.alphasights.com/logos/dbaf77ba-fc7e-4896-b5ab-1f11877cc473.png',
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Enterprise Architecture',
    category: 'Software Engineering',
    eraKey: 'enterprise',
    highlight: 'Designed and deployed high-performance responsive web applications, interactive visual tools, and destination marketing platforms.',
    skills: ['Front-End Architecture', 'Vue.js', 'Modern JavaScript', 'Interactive UI']
  },
  {
    id: 'midnight-nerd',
    company: 'Midnight Nerd',
    role: 'Owner / Operator',
    period: 'May 2014 - Jan 2020',
    startDate: '2014-05',
    endDate: '2020-01',
    duration: '5 yrs 9 mos',
    url: 'https://midnightnerd.com',
    logoUrl: null,
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Client SOW',
    category: 'Founding & Advisory',
    eraKey: 'enterprise',
    highlight: 'Specialized digital engineering agency delivering tailored software development, systems integration, and cloud management.',
    skills: ['Agency Operations', 'Full-Stack Development', 'Linux Servers', 'Client Delivery']
  },
  {
    id: 'tracking-first',
    company: 'Tracking First',
    role: 'Senior Full-Stack Developer',
    period: 'May 2018 - Oct 2019',
    startDate: '2018-05',
    endDate: '2019-10',
    duration: '1 yr 6 mos',
    url: 'https://www.trackingfirst.com',
    logoUrl: null,
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Enterprise Architecture',
    category: 'Software Engineering',
    eraKey: 'enterprise',
    highlight: 'Automated digital analytics governance, real-time campaign parameter validation, and enterprise integration workflows.',
    skills: ['Analytics Governance', 'Node.js', 'API Integration', 'Data Validation']
  },
  {
    id: 'jd-mellberg-financial',
    company: 'JD Mellberg Financial',
    role: 'Senior Full-Stack Developer',
    period: 'Aug 2015 - May 2018',
    startDate: '2015-08',
    endDate: '2018-05',
    duration: '2 yrs 10 mos',
    url: 'https://www.jdmellbergfinancial.com',
    logoUrl: 'https://companies-data-service-static-production.alphasights.com/logos/e53c23ce-3059-4754-bc30-e0cfd92c0b2e.png',
    isCurrent: false,
    isFeatured: true,
    engagementType: 'Enterprise Architecture',
    category: 'Enterprise Systems',
    eraKey: 'enterprise',
    highlight: 'Engineered high-throughput financial lead parsing pipelines, secure CRM integrations, and data validation layers saving $1.2M annually.',
    skills: ['Financial Systems', 'Data Pipelines', 'Security Compliance', 'Database Architecture']
  },
  {
    id: 'simpleview',
    company: 'Simpleview',
    role: 'CMS Developer',
    period: 'Apr 2012 - May 2013',
    startDate: '2012-04',
    endDate: '2013-05',
    duration: '1 yr 2 mos',
    url: 'https://www.simpleviewinc.com',
    logoUrl: 'https://companies-data-service-static-production.alphasights.com/logos/44fa9a9f-891a-45f4-9803-9f1aa1c12451.png',
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Client SOW',
    category: 'Software Engineering',
    eraKey: 'agency',
    highlight: 'Enterprise CMS module development for destination marketing organizations, custom APIs, and high-traffic portal integrations.',
    skills: ['CMS Development', 'ColdFusion', 'SQL Server', 'API Integration']
  },
  {
    id: 'hi-tech-computers',
    company: 'Hi-Tech Computers',
    role: 'Sr. Computer Technician',
    period: 'Nov 2011 - Apr 2012',
    startDate: '2011-11',
    endDate: '2012-04',
    duration: '6 mos',
    url: 'https://hitechcomputers.com',
    logoUrl: null,
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Foundational Tech',
    category: 'Infrastructure & Tech',
    eraKey: 'agency',
    highlight: 'Advanced hardware component diagnostics, enterprise workstation configurations, and network troubleshooting.',
    skills: ['Hardware Diagnostics', 'System Optimization', 'Troubleshooting']
  },
  {
    id: 'affordable-computer-services',
    company: 'Affordable Computer Services',
    role: 'Founder & On-Site Computer Repair Specialist',
    period: 'Aug 2004 - Nov 2011',
    startDate: '2004-08',
    endDate: '2011-11',
    duration: '7 yrs 4 mos',
    url: 'https://acs.tucsonerd.com',
    logoUrl: null,
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Venture Founder',
    category: 'Founding & Advisory',
    eraKey: 'agency',
    highlight: 'Founded and operated on-site computer repair and tech services following tenure at ACR, providing diagnostic repairs, small business network infrastructure, and system recovery.',
    skills: ['On-Site Repair', 'Network Infrastructure', 'Disaster Recovery', 'Hardware Diagnostics']
  },
  {
    id: 'vertical-assessment-associates',
    company: 'Vertical Assessment Associates',
    role: 'Sr. Software Engineer',
    period: 'Feb 2009 - Mar 2010',
    startDate: '2009-02',
    endDate: '2010-03',
    duration: '1 yr 2 mos',
    url: 'https://verticalassessment.com',
    logoUrl: null,
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Enterprise Architecture',
    category: 'Enterprise Systems',
    eraKey: 'agency',
    highlight: 'Engineered web-based assessment reporting platforms, relational schema design, and automated survey calculation tools.',
    skills: ['Web Applications', 'Relational Databases', 'Report Generation']
  },
  {
    id: 'affordable-computer-repair',
    company: 'Affordable Computer Repair',
    role: 'On-Site Computer Technician',
    period: 'May 2003 - Aug 2004',
    startDate: '2003-05',
    endDate: '2004-08',
    duration: '1 yr 4 mos',
    url: 'https://affordablecomputerrepair.com',
    logoUrl: null,
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Foundational Tech',
    category: 'Infrastructure & Tech',
    eraKey: 'foundational',
    highlight: 'On-site enterprise and consumer network installations, hardware repair, and system restoration across southern Arizona.',
    skills: ['Field Service', 'LAN Configuration', 'System Recovery']
  },
  {
    id: 'todays-graphics',
    company: "Today's Graphics",
    role: 'Sr. Web Designer',
    period: 'May 2003 - Aug 2004',
    startDate: '2003-05',
    endDate: '2004-08',
    duration: '1 yr 4 mos',
    url: 'https://todaysgraphics.com',
    logoUrl: null,
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Client SOW',
    category: 'Software Engineering',
    eraKey: 'foundational',
    highlight: 'Digital vector illustration, graphic identity creation, and standards-compliant early commercial web layouts.',
    skills: ['Web Design', 'HTML & CSS', 'Vector Graphics', 'Typography']
  },
  {
    id: 'emachines',
    company: 'eMachines',
    role: 'Certified Sr. Technician',
    period: 'Jul 2003 - Jan 2004',
    startDate: '2003-07',
    endDate: '2004-01',
    duration: '7 mos',
    url: 'https://en.wikipedia.org/wiki/EMachines',
    logoUrl: null,
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Foundational Tech',
    category: 'Infrastructure & Tech',
    eraKey: 'foundational',
    highlight: 'Factory-certified computer bench diagnostics, OEM motherboard repair, and high-volume hardware troubleshooting.',
    skills: ['OEM Certification', 'Hardware Repair', 'Quality Assurance']
  },
  {
    id: 'microsoft',
    company: 'Microsoft',
    role: 'Certified Technician',
    period: 'Jan 2003 - Jul 2003',
    startDate: '2003-01',
    endDate: '2003-07',
    duration: '7 mos',
    url: 'https://www.microsoft.com',
    logoUrl: 'https://companies-data-service-static-production.alphasights.com/logos/59c7de16-7b30-4412-b62d-cc65f7959735.png',
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Foundational Tech',
    category: 'Infrastructure & Tech',
    eraKey: 'foundational',
    highlight: 'Windows environment diagnostics, client workstation troubleshooting, and operating system registry optimizations.',
    skills: ['Windows OS', 'Registry Tuning', 'System Administration']
  },
  {
    id: 'yahoo',
    company: 'Yahoo!',
    role: 'Certified SBC Yahoo! Technician',
    period: 'May 2002 - Jan 2003',
    startDate: '2002-05',
    endDate: '2003-01',
    duration: '9 mos',
    url: 'https://www.yahoo.com',
    logoUrl: 'https://companies-data-service-static-production.alphasights.com/logos/419e0836-8449-435d-96dc-f93f8d9ef494.png',
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Foundational Tech',
    category: 'Infrastructure & Tech',
    eraKey: 'foundational',
    highlight: 'Early broadband DSL connectivity configuration, dialup gateway routing, and technical client support during Web 1.0 expansion.',
    skills: ['DSL & Broadband', 'Network Gateways', 'TCP/IP', 'Client Support']
  },
  {
    id: 'southern-arizona-community-academy',
    company: 'Southern Arizona Community Academy',
    role: 'Lead Student IT Technician',
    period: 'Aug 2000 - May 2001',
    startDate: '2000-08',
    endDate: '2001-05',
    duration: '10 mos',
    url: 'https://saca-az.org',
    logoUrl: null,
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Foundational Tech',
    category: 'Infrastructure & Tech',
    eraKey: 'foundational',
    highlight: 'Early graduation tenure managing campus hardware diagnostics, local area network maintenance, lab workstation deployment, and faculty technical support.',
    skills: ['Campus IT Support', 'Workstation Deployment', 'Hardware Diagnostics', 'LAN Infrastructure', 'System Maintenance']
  },
  {
    id: 'showplace-novelty-magic',
    company: 'Showplace Novelty & Magic',
    role: 'Apprentice Magician & Demonstrator',
    period: '1990 - 199X',
    startDate: '1990-01',
    endDate: '1998-05',
    duration: '8+ yrs',
    url: '',
    logoUrl: null,
    isCurrent: false,
    isFeatured: false,
    engagementType: 'Family Venture',
    category: 'Founding & Advisory',
    eraKey: 'genesis',
    highlight: 'Apprentice magician and novelty demonstrator at family magic shop in Salt Lake City, touring regional state fairs, mastering sleight of hand, stage mechanics, and crowd psychology.',
    skills: ['Stage Magic', 'Sleight of Hand', 'Crowd Psychology', 'Demonstration Sales', 'Live Performance']
  }
]
