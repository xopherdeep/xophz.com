import { computed } from 'vue'

export function useHomeCtaController() {
  const bookingUrl = 'https://calendar.app.google/Y732Ak5gxuCMVoHo8'

  const canDisplay = computed(() => true)

  return {
    bookingUrl,
    canDisplay
  }
}
