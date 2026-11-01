import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import { BOOKING_URL } from '~/data/workCatalog'
import { IDENTITY } from '~/constants/identity'
import type { HeroApp, HeroProfile } from './types'

export function useHeroBannerController() {
  // 1. Composables & Stores
  const { identity, heroTags } = useProfileData()

  // 2. Reactive Primitives
  const bookingUrl = BOOKING_URL

  // Live products, shown in the hero so visitors can try real shipped work.
  // Ordered by business relevance: the consulting brand first, playful apps last.
  const apps: readonly HeroApp[] = [
    { key: 'my-compass', name: 'My Compass', host: 'phone.mycompassconsulting.com', url: 'https://phone.mycompassconsulting.com/', icon: 'i-lucide-compass' },
    { key: 'kitchen-synk', name: 'Kitchen Synk', host: 'kitchensynk.app', url: 'https://kitchensynk.app/', icon: 'i-lucide-chef-hat' },
    { key: 'doit-xp', name: 'Do It for the XP', host: 'app.doit.forthexp.com', url: 'https://app.doit.forthexp.com/', icon: 'i-lucide-trophy' },
    { key: 'nook-phone', name: 'Nook Phone', host: 'nookphone.app', url: 'https://nookphone.app/', icon: 'i-lucide-smartphone' },
    { key: 'dodo-air', name: 'Dodo Air', host: 'dodoair.forthexp.com', url: 'https://dodoair.forthexp.com/', icon: 'i-lucide-plane' }
  ]

  // Opens an app in its own phone-portrait window centered on the screen.
  // The buttons are real buttons, not links, so nothing can turn the click
  // into a plain new-tab navigation. If the browser blocks the popup, fall
  // back to a normal new tab so the app still opens.
  const PHONE_WIDTH = 390
  const PHONE_HEIGHT = 844
  function openAppWindow(app: HeroApp) {
    if (typeof window === 'undefined') return
    const screenInfo = window.screen as Screen & { availLeft?: number, availTop?: number }
    const width = Math.min(PHONE_WIDTH, screenInfo.availWidth)
    const height = Math.min(PHONE_HEIGHT, screenInfo.availHeight - 40)
    const left = Math.round((screenInfo.availLeft ?? 0) + (screenInfo.availWidth - width) / 2)
    const top = Math.round((screenInfo.availTop ?? 0) + (screenInfo.availHeight - height) / 2)
    const features = `popup=yes,width=${width},height=${height},left=${left},top=${top}`
    const popup = window.open(app.url, `xophz-app-${app.key}`, features)
    if (popup) {
      popup.opener = null
      popup.focus()
      return
    }
    window.open(app.url, '_blank', 'noopener')
  }

  // 3. Computed State & 2-Stage Booleans
  const profile = computed<HeroProfile>(() => ({
    name: identity.name,
    title: identity.title,
    tagline: identity.tagline,
    origin: identity.origin,
    avatar: identity.avatar,
    // Location already shows under the buttons, so keep the badges about the work.
    tags: heroTags.filter(tag => tag !== IDENTITY.location)
  }))

  const hasTags = computed(() => profile.value.tags.length > 0)
  const isProfileComplete = computed(() => Boolean(profile.value.name && profile.value.title))
  const canDisplayHero = computed(() => isProfileComplete.value && hasTags.value)

  return {
    profile,
    canDisplayHero,
    bookingUrl,
    apps,
    openAppWindow
  }
}
