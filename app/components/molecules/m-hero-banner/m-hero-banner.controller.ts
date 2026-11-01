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
  const apps: readonly HeroApp[] = [
    { key: 'kitchen-synk', name: 'Kitchen Synk', host: 'kitchensynk.app', url: 'https://kitchensynk.app/', icon: 'i-lucide-chef-hat' },
    { key: 'doit-xp', name: 'Do It for the XP', host: 'app.doit.forthexp.com', url: 'https://app.doit.forthexp.com/', icon: 'i-lucide-trophy' },
    { key: 'nook-phone', name: 'Nook Phone', host: 'nookphone.app', url: 'https://nookphone.app/', icon: 'i-lucide-smartphone' },
    { key: 'compass-phone', name: 'Compass Phone', host: 'phone.mycompassconsulting.com', url: 'https://phone.mycompassconsulting.com/', icon: 'i-lucide-phone' },
    { key: 'dodo-air', name: 'Dodo Air', host: 'dodoair.forthexp.com', url: 'https://dodoair.forthexp.com/', icon: 'i-lucide-plane' }
  ]

  // Opens an app in its own phone-portrait window. If the browser blocks the
  // popup, the click falls through to the link's normal new-tab behavior.
  const PHONE_WIDTH = 390
  const PHONE_HEIGHT = 844
  function openAppWindow(event: MouseEvent, app: HeroApp) {
    if (typeof window === 'undefined') return
    // Let modified clicks (new tab, new window) behave like a normal link.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    const height = Math.min(PHONE_HEIGHT, window.screen.availHeight - 40)
    const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - PHONE_WIDTH) / 2))
    const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2))
    const features = `popup,width=${PHONE_WIDTH},height=${height},left=${left},top=${top}`
    const popup = window.open(app.url, `xophz-app-${app.key}`, features)
    if (!popup) return
    popup.opener = null
    popup.focus()
    event.preventDefault()
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
