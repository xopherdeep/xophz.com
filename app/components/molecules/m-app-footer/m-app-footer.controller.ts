import { computed } from 'vue'
import type { FooterSocialLink } from './types'

export function useAppFooterController() {
  // 1. Reactive & Computed State
  const currentYear = computed(() => new Date().getFullYear())

  const socialLinks = computed<readonly FooterSocialLink[]>(() => [
    { label: 'GitHub', href: 'https://github.com/xopherdeep', icon: 'i-lucide-github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/xopherdeep', icon: 'i-lucide-linkedin' },
    { label: 'Twitter', href: 'https://twitter.com/xopherdeep', icon: 'i-lucide-twitter' }
  ])

  const footerNav = computed(() => [
    { label: 'About', to: '/about' },
    { label: 'Resume', to: '/resume' },
    { label: 'Magnum Opus', to: '/projects' },
    { label: 'Compass Suite', to: '/my-compass' },
    { label: 'Sparks Catalog', to: '/sparks' },
    { label: 'Blog', to: '/posts' }
  ])

  // 2. Atomic Booleans
  const hasSocials = computed(() => socialLinks.value.length > 0)

  return {
    currentYear,
    socialLinks,
    hasSocials,
    footerNav
  }
}
