import { computed } from 'vue'
import { BOOKING_URL, CONTACT_EMAIL } from '~/data/workCatalog'

export function useHomeCtaController() {
  // 1. Reactive Primitives
  const bookingUrl = BOOKING_URL
  const emailUrl = `mailto:${CONTACT_EMAIL}`

  // 2. Computed State & 2-Stage Booleans
  const canDisplay = computed(() => Boolean(bookingUrl && CONTACT_EMAIL))

  return {
    bookingUrl,
    emailUrl,
    canDisplay
  }
}
