import { computed } from 'vue'
import type { ContactLink, ResumeIdentity } from './types'

export function useResumeHeroController() {
  const identity: ResumeIdentity = {
    name: 'Xopher "XP" Pollard',
    role: 'Principal Systems Architect & Systems Synthesist'
  }

  const contactLinks = computed<ContactLink[]>(() => [
    { icon: 'i-lucide-map-pin', label: 'Tucson, AZ (Sonoran Desert / Global)' },
    { icon: 'i-lucide-phone', label: '520-762-4947', href: 'tel:520-762-4947' },
    { icon: 'i-lucide-mail', label: 'hello@xophz.com', href: 'mailto:hello@xophz.com' },
    { icon: 'i-lucide-linkedin', label: 'linkedin.com/in/xophz', href: 'https://linkedin.com/in/xophz', isExternal: true },
    { icon: 'i-lucide-github', label: 'github.com/xopherdeep', href: 'https://github.com/xopherdeep', isExternal: true },
    { icon: 'i-lucide-globe', label: 'xophz.com', href: 'https://xophz.com', isExternal: true }
  ])

  const hasHero = computed(() => Boolean(identity.name))

  return {
    identity,
    contactLinks,
    hasHero
  }
}
