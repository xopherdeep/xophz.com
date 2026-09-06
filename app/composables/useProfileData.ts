import IconGithub from "~/components/IconGithub.vue";
import IconLinkedin from "~/components/IconLinkedin.vue";
import IconTwitter from "~/components/IconTwitter.vue";
import IconInstagram from "~/components/IconInstagram.vue";
import {
  LucideZap,
  LucideBuilding2,
  LucideTarget,
  LucideRocket,
  LucideCalendar,
  LucideMessageSquare,
  LucideBanknote,
  LucideMail,
  LucideUser,
  LucideBriefcase,
  LucideFileText,
  LucideMusic,
  LucideCompass,
  LucidePalette,
  LucideSparkles,
  LucideGamepad2,
  LucideTerminal,
  LucideMoon,
  LucideFileBadge,
} from "@lucide/vue";

export const useProfileData = () => {
  const identity = {
    name: 'Xopher "XP" Pollard',
    title: "Principal Systems Synthesist · Architect · Artist · Polymath",
    tagline:
      "25+ years architecting sovereign digital infrastructure, modernizing legacy monoliths, and scaling enterprise systems for visionary founders.",
    avatar: "/xopher_jester.png",
    headshot: "/xp_headshot.png",
    siteLabel: "xophz.com",
  };

  const skillTags = [
    "Principal Systems Synthesist",
    "Legacy Modernization",
    "Sovereign Infrastructure",
    "AWS & Cloud Systems",
    "CTO / Executive Leadership",
    "Serial Founder",
  ];

  const personas = [
    {
      key: "xp",
      name: "XP",
      subtitle: "Executive Architect & Founder",
      icon: LucideTerminal,
      color: "#8b5cf6",
      desc: "The executive software architect and founder alias driving high-stakes technology synthesis and enterprise systems.",
      link: "https://forthexp.com",
      linkLabel: "forthexp.com",
    },
    {
      key: "compass-consulting",
      name: "My Compass Consulting",
      subtitle: "Systems Architecture & Advisory",
      icon: LucideCompass,
      color: "#06b6d4",
      desc: "Principal Systems Synthesist providing high-ticket architecture advisory, sovereign infrastructure deployment, and enterprise legacy modernization.",
      link: "https://www.mycompassconsulting.com",
      linkLabel: "Advisory",
    },
    {
      key: "midnight-nerd",
      name: "Midnight Nerd",
      subtitle: "Tech Exploration & Media",
      icon: LucideMoon,
      color: "#3b82f6",
      desc: "Late-night technology deep dives, hardware hackery, and digital experimentations.",
      link: "https://www.midnightnerd.com",
      linkLabel: "midnightnerd.com",
    },
    {
      key: "hog-tim",
      name: "[HΩG] Tim",
      subtitle: "Gaming & Community Roots",
      icon: LucideGamepad2,
      color: "#10b981",
      desc: "Original gamer tag and origin of Hall of the Gods as a gaming server network over 20 years ago.",
      link: "https://hallofthegods.com",
      linkLabel: "[HΩG] Tim",
    },
    {
      key: "realmajorad",
      name: "Majora D.",
      subtitle: "Music & Sonic Alchemy",
      icon: LucideMusic,
      color: "#ec4899",
      desc: "Original music composition, audio production, and sonic exploration.",
      link: "https://soundcloud.com/realmajorad",
      linkLabel: "Music",
    },
    {
      key: "gestasuggestor",
      name: "Jesta Sugjester",
      subtitle: "Visual Art & Lore",
      icon: IconInstagram,
      color: "#f59e0b",
      desc: "Surreal visual art, creative writing, world-building lore, and aesthetic experiments.",
      link: "https://instagram.com/jestasugjester",
      linkLabel: "@gestasuggestor",
    },
  ];

  const stats = [
    { value: "25+", label: "Years Building" },
    { value: "Cloud", label: "Systems & AWS" },
    { value: "Sovereign", label: "Webwork & Infra" },
    { value: "Polymath", label: "Creative Synthesis" },
  ];

  const specialties = [
    {
      key: "modernize",
      title: "Legacy Modernization",
      icon: LucideZap,
      desc: "Taking rotting monoliths and carving them into clean, scalable services without burning the company down during migration.",
    },
    {
      key: "architect",
      title: "Systems Architecture",
      icon: LucideBuilding2,
      desc: "End-to-end architectural blueprints from startup chaos to enterprise-grade reliability, cloud-first from day one.",
    },
    {
      key: "lead",
      title: "Engineering Leadership",
      icon: LucideTarget,
      desc: "CTO / VP Eng experience. Building teams, processes, and culture that ship product fast, reliably, and with pride.",
    },
    {
      key: "found",
      title: "Sovereign Infrastructure",
      icon: LucideRocket,
      desc: "Deploying BlackBOX sovereign architecture for zero-friction scaling, security, and total digital ownership for elite ventures.",
    },
  ];

  const skills = [
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
      key: "hotg",
      name: "Hall of the Gods, Inc.",
      tag: "Parent Co · Live",
      color: "#d9be6f",
      url: "https://www.hallofthegods.com",
      desc: "The Nexus of Limitless Potential - a protective Webwork for creators, brands, and ventures of any scale. Parent company housing the entire ecosystem.",
    },
    {
      key: "compass",
      name: "My Compass Consulting",
      tag: "Advisory · Live",
      color: "rgb(49, 128, 137)",
      url: "https://www.mycompassconsulting.com",
      desc: "Strategic Synthesis - the rare bridge between executive vision and rigorous engineering. Structural Integrity, Meticulous Performance, Strategic Clarity.",
    },
    {
      key: "webwork",
      name: "Worldwide Webwork",
      tag: "Infrastructure · Live",
      color: "#3dee98",
      url: "https://www.worldwidewebwork.com",
      desc: "The foundational architecture where sovereignty is anchored. Speed, security, and stability anchoring the entire Hall.",
    },
    {
      key: "youmeos",
      name: "YouMeOS",
      tag: "Spatial OS · Live",
      color: "#a78bfa",
      url: "https://www.youmeos.com",
      desc: "A spatial OS for the web - Vue + WebGPU over the Compass Engine. HeliOS, NexOS, NoOSphere.",
    },
    {
      key: "bbwg",
      name: "BlackBOX WhiteGLOVE",
      tag: "Infrastructure · Live",
      color: "#06b6d4",
      url: "https://www.blackboxwhiteglove.com",
      desc: "Proprietary sovereign infrastructure and premium concierge digital management - self-healing BlackBOX nodes networked via w⁴ Protocol.",
    },
    {
      key: "triforce",
      name: "Triforce of the Gods",
      tag: "Architecture · Live",
      color: "#d9be6f",
      url: "https://www.triforceofthegods.com",
      desc: "The explicit source code of reality. A philosophical and architectural framework bridging sacred geometry, alchemical principles, and decentralized web mechanics into a unified system for creation.",
    },
    {
      key: "sacredrealm",
      name: "Sacred Realm",
      tag: "Community · Live",
      color: "#c5a059",
      url: "https://www.sacredrealm.org",
      desc: "Forging transformative art and community. A sovereign digital space dedicated to creative expression, deep lore, and decentralized connection.",
    },
    {
      key: "blackbox",
      name: "BlackBOX / w⁴ Protocol",
      tag: "Infrastructure · Live",
      color: "#555",
      url: "https://www.buildablox.com",
      desc: "Proprietary sovereign infrastructure - self-healing, fully automated BlackBOX nodes networked via the w⁴ Hyper-cube Protocol. The backbone of the Worldwide Webwork.",
    },
    {
      key: "tucsonerd",
      name: "Tucsonerd ACS",
      tag: "Local Base · Active",
      color: "green",
      url: "https://acs.tucsonerd.com/",
      desc: "Local infrastructure anchored in the Sonoran desert. Bridging the global Webwork and physical reality for the Tucson and Oro Valley digital frontier.",
    },
    {
      key: "midnightnerd",
      name: "Midnight Nerd",
      tag: "Deep Code · Active",
      color: "#8d105e",
      url: "https://www.midnightnerd.com",
      desc: "The ultimate secret weapon. Deep-code alchemy and meticulous late-night engineering keeping the ecosystem's architecture flawless.",
    },
    {
      key: "forthexp",
      name: "Do It for the XP",
      tag: "Productivity · Live",
      color: "#f30b0b",
      url: "https://doit.forthexp.com",
      desc: "Turn productivity into an adventure worth playing. A gamified progression system translating real-world grinds into tangible, rewarding mechanics.",
    },
    {
      key: "mro-wizard",
      name: "MRO Planner Wizard",
      tag: "Productivity · Live",
      color: "#0ea5e9",
      url: "https://planner.mycompassconsulting.com",
      desc: "A comprehensive digital planning tool and onboarding ecosystem designed to bring structural integrity and automated clarity to daily workflows.",
    },
    {
      key: "glowitheflow",
      name: "GlowitheFlow",
      tag: "Social · Active Build",
      color: "#007bff",
      url: "https://www.glowitheflow.com",
      desc: "A next-gen creator network built on mutual promotion economics. Flow economy, Tributaries, gamified click-value.",
    },
  ];

  const socialLinks = [
    {
      id: "link-calendar",
      label: "Book a Meeting",
      href: "https://calendar.app.google/Y732Ak5gxuCMVoHo8",
      color: "#10b981",
      icon: LucideCalendar,
    },
    {
      id: "link-resume",
      label: "Executive Resume (CV)",
      href: "/resume",
      color: "#8b5cf6",
      icon: LucideFileBadge,
    },
    {
      id: "link-instagram",
      label: "Jesta Sugjester (Instagram)",
      href: "https://instagram.com/jestasugjester",
      color: "#f59e0b",
      icon: IconInstagram,
    },
    {
      id: "link-realmajorad",
      label: "Majora D. (Music)",
      href: "https://soundcloud.com/realmajorad",
      color: "#ec4899",
      icon: LucideMusic,
    },
    {
      id: "link-compass",
      label: "My Compass Consulting",
      href: "https://www.mycompassconsulting.com",
      color: "#06b6d4",
      icon: LucideCompass,
    },
    {
      id: "link-github",
      label: "GitHub",
      href: "https://github.com/xopherdeep",
      color: "#e4e4e7",
      icon: IconGithub,
    },
    {
      id: "link-linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/xophz",
      color: "#0a66c2",
      icon: IconLinkedin,
    },
    {
      id: "link-discord",
      label: "Discord",
      href: "https://discord.gg/2QDwKKxEqb",
      color: "#5865f2",
      icon: LucideMessageSquare,
    },
    {
      id: "link-twitter",
      label: "X / Twitter",
      href: "https://twitter.com/xopherdeep",
      color: "#e4e4e7",
      icon: IconTwitter,
    },
    {
      id: "link-cash",
      label: "Cash App",
      href: "https://cash.app/$xopherdeep",
      color: "#00D632",
      icon: LucideBanknote,
    },
    {
      id: "link-venmo",
      label: "Venmo",
      href: "https://venmo.com/u/xopherdeep",
      color: "#008CFF",
      icon: LucideBanknote,
    },
    {
      id: "link-email",
      label: "Email",
      href: "mailto:sayhi@xophz.com",
      color: "#f59e0b",
      icon: LucideMail,
    },
  ];

  const navChips = [
    { label: "About", to: "/about", icon: LucideUser },
    { label: "Resume", to: "/resume", icon: LucideFileText },
    { label: "Opus", to: "/projects", icon: LucideBriefcase },
    { label: "Compass", to: "/compass", icon: LucideCompass },
    { label: "Sparks", to: "/sparks", icon: LucideSparkles },
    { label: "Blog", to: "/posts", icon: LucideFileText },
    { label: "Connect", to: "/connect", icon: LucideMail },
  ];

  return {
    identity,
    personas,
    skillTags,
    stats,
    specialties,
    skills,
    projects,
    socialLinks,
    navChips,
  };
};
