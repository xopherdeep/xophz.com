import IconGithub from '~/components/IconGithub.vue'
import IconLinkedin from '~/components/IconLinkedin.vue'
import IconTwitter from '~/components/IconTwitter.vue'
import {
  Zap as LucideZap,
  Building2 as LucideBuilding2,
  Target as LucideTarget,
  Rocket as LucideRocket,
  Calendar as LucideCalendar,
  MessageSquare as LucideMessageSquare,
  Banknote as LucideBanknote,
  Mail as LucideMail,
  User as LucideUser,
  Briefcase as LucideBriefcase,
  FileText as LucideFileText,
} from '@lucide/vue'

export const useProfileData = () => {
  const identity = {
    name: 'Xopher "XP" Pollard',
    title: 'Principal Systems Synthesist',
    tagline: '25+ years engineering massive-scale software. I build the architectural blueprints enterprises stake their futures on.',
    headshot: '/xp_headshot.png',
    siteLabel: 'xophz.com',
  }

  const skillTags = [
    'Principal Architect',
    'CTO / VP Eng',
    'AWS · Node.js · Vue',
    'Legacy Modernization',
    'Founder',
    '25+ Years',
  ]

  const stats = [
    { value: '25+', label: 'Years' },
    { value: 'CTO', label: 'VP Eng' },
    { value: '4x', label: 'Founder' },
    { value: 'F500', label: 'to Startup' },
  ]

  const specialties = [
    { key: 'modernize', title: 'Legacy Modernization', icon: LucideZap, desc: 'Taking rotting monoliths and carving them into clean, scalable services without burning the company down during migration.' },
    { key: 'architect', title: 'Systems Architecture', icon: LucideBuilding2, desc: 'End-to-end architectural blueprints from startup chaos to enterprise-grade reliability, cloud-first from day one.' },
    { key: 'lead', title: 'Engineering Leadership', icon: LucideTarget, desc: 'CTO / VP Eng experience. Building teams, processes, and culture that ship product fast, reliably, and with pride.' },
    { key: 'found', title: 'Founding & Advising', icon: LucideRocket, desc: 'Multiple founder credits. Helping early-stage teams avoid the pitfalls already survived.' },
  ]

  const skills = [
    { group: 'Architecture', items: ['Distributed Systems', 'Event-Driven Design', 'Domain-Driven Design', 'Microservices'] },
    { group: 'Cloud & Infra', items: ['AWS (20+ services)', 'Terraform', 'Docker / ECS', 'CI/CD Pipelines'] },
    { group: 'Frontend', items: ['Vue 3 / Nuxt', 'React / Next.js', 'TypeScript', 'Design Systems'] },
    { group: 'Backend', items: ['Node.js', 'GraphQL', 'REST APIs', 'PostgreSQL · Redis'] },
  ]

  const projects = [
    { key: 'hotg', name: 'Hall of the Gods, Inc.', tag: 'Parent Co · Live', color: 'rgb(217, 190, 111)', url: 'https://www.hallofthegods.com', desc: 'The Nexus of Limitless Potential - a protective Webwork for creators, brands, and ventures of any scale. Parent company housing the entire ecosystem.' },
    { key: 'triforce', name: 'Triforce of the Gods', tag: 'Architecture · Live', color: '#d9be6f', url: 'https://www.triforceofthegods.com', desc: 'The explicit source code of reality. A philosophical and architectural framework bridging sacred geometry, alchemical principles, and decentralized web mechanics into a unified system for creation.' },
    { key: 'sacredrealm', name: 'Sacred Realm', tag: 'Community · Live', color: '#c5a059', url: 'https://www.sacredrealm.org', desc: 'Forging transformative art and community. A sovereign digital space dedicated to creative expression, deep lore, and decentralized connection.' },
    { key: 'blackbox', name: 'BlackBOX / w⁴ Protocol', tag: 'Infrastructure · Live', color: '#555', url: 'https://www.buildablox.com', desc: 'Proprietary sovereign infrastructure - self-healing, fully automated BlackBOX nodes networked via the w⁴ Hyper-cube Protocol. The backbone of the Worldwide Webwork.' },
    { key: 'tucsonerd', name: 'Tucsonerd ACS', tag: 'Local Base · Active', color: 'green', url: 'https://acs.tucsonerd.com/', desc: 'Local infrastructure anchored in the Sonoran desert. Bridging the global Webwork and physical reality for the Tucson and Oro Valley digital frontier.' },
    { key: 'midnightnerd', name: 'Midnight Nerd', tag: 'Deep Code · Active', color: '#8d105e', url: 'https://www.midnightnerd.com', desc: 'The ultimate secret weapon. Deep-code alchemy and meticulous late-night engineering keeping the ecosystem\'s architecture flawless.' },
    { key: 'forthexp', name: 'Do It for the XP', tag: 'Productivity · Live', color: '#f30b0b', url: 'https://doit.forthexp.com', desc: 'Turn productivity into an adventure worth playing. A gamified progression system translating real-world grinds into tangible, rewarding mechanics.' },
    { key: 'mro-wizard', name: 'MRO Planner Wizard', tag: 'Productivity · Live', color: '#0ea5e9', url: 'https://planner.mycompassconsulting.com', desc: 'A comprehensive digital planning tool and onboarding ecosystem designed to bring structural integrity and automated clarity to daily workflows.' },
    { key: 'glowitheflow', name: 'GlowitheFlow', tag: 'Social · Active Build', color: '#007bff', url: 'https://www.glowitheflow.com', desc: 'A next-gen creator network built on mutual promotion economics. Flow economy, Tributaries, gamified click-value.' },
    { key: 'compass', name: 'My Compass Consulting', tag: 'Advisory · Live', color: 'rgb(49, 128, 137)', url: 'https://www.mycompassconsulting.com', desc: 'Strategic Synthesis - the rare bridge between executive vision and rigorous engineering. Structural Integrity, Meticulous Performance, Strategic Clarity.' },
    { key: 'bbwg', name: 'BlackBOX WhiteGLOVE', tag: 'Managed Service · Live', color: '#fff', url: 'https://www.blackboxwhiteglove.com', desc: 'Premium concierge digital management - Signature, Concierge, and Enterprise tiers. Your entire digital footprint managed.' },
    { key: 'webwork', name: 'Worldwide Webwork', tag: 'Infrastructure · Live', color: 'rgb(61, 238, 152)', url: 'https://www.worldwidewebwork.com', desc: 'The foundational architecture where sovereignty is anchored. Speed, security, and stability anchoring the entire Hall.' },
    { key: 'youmeos', name: 'YouMeOS', tag: 'Vision · 100-Year Play', color: '#a78bfa', url: 'https://www.youmeos.com', desc: 'A spatial OS for the web - Vue + WebGPU over the Compass Engine. HeliOS, NexOS, NoOSphere.' },
  ]

  const socialLinks = [
    { id: 'link-calendar', label: 'Book a Meeting', href: 'https://calendar.app.google/Y732Ak5gxuCMVoHo8', color: '#10b981', icon: LucideCalendar },
    { id: 'link-github', label: 'GitHub', href: 'https://github.com/xopherdeep', color: '#e4e4e7', icon: IconGithub },
    { id: 'link-linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/xophz', color: '#0a66c2', icon: IconLinkedin },
    { id: 'link-discord', label: 'Discord', href: 'https://discord.gg/2QDwKKxEqb', color: '#5865f2', icon: LucideMessageSquare },
    { id: 'link-twitter', label: 'X / Twitter', href: 'https://twitter.com/xopherdeep', color: '#e4e4e7', icon: IconTwitter },
    { id: 'link-cash', label: 'Cash App', href: 'https://cash.app/$xopherdeep', color: '#00D632', icon: LucideBanknote },
    { id: 'link-venmo', label: 'Venmo', href: 'https://venmo.com/u/xopherdeep', color: '#008CFF', icon: LucideBanknote },
    { id: 'link-email', label: 'Email', href: 'mailto:sayhi@xophz.com', color: '#f59e0b', icon: LucideMail },
  ]

  const navChips = [
    { label: 'About', to: '/about', icon: LucideUser },
    { label: 'Opus', to: '/projects', icon: LucideBriefcase },
    { label: 'Blog', to: '/posts', icon: LucideFileText },
    { label: 'Connect', to: '/connect', icon: LucideMail },
  ]

  return { identity, skillTags, stats, specialties, skills, projects, socialLinks, navChips }
}
