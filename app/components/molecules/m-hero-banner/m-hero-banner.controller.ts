import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import { BOOKING_URL } from '~/data/workCatalog'
import type { HeroProfile } from './types'

export function useHeroBannerController() {
  // 1. Composables & Stores
  const { identity } = useProfileData()

  // 2. Reactive Primitives
  const bookingUrl = BOOKING_URL

  // Homepage pitch lives here, not in identity, so the hero can say plainly
  // what the work is without changing the shared bio used on other pages.
  const heroTagline =
    "I fix computers, build websites, and help people and small businesses make smart tech decisions. Tell me what's broken or what you want built, and I'll give you a plain plan and a price before any work starts."
  const heroTags = ['Computer Repair', 'Website Design', 'Tech Consulting', 'Tucson, AZ']

  // 3. Computed State & 2-Stage Booleans
  const profile = computed<HeroProfile>(() => ({
    name: identity.name,
    title: identity.title,
    tagline: heroTagline,
    origin: identity.origin,
    avatar: identity.avatar,
    tags: heroTags
  }))

  const hasTags = computed(() => profile.value.tags.length > 0)
  const isProfileComplete = computed(() => Boolean(profile.value.name && profile.value.title))
  const canDisplayHero = computed(() => isProfileComplete.value && hasTags.value)

  return {
    profile,
    canDisplayHero,
    bookingUrl
  }
}
