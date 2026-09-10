import { defineNuxtPlugin } from '#imports'

const GTM_MEASUREMENT_ID = 'G-6FERWGTH0W'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    _hasInitializedGtm?: boolean
  }
}

export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  // Establish dataLayer and stub gtag immediately
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function () {
    window.dataLayer?.push(arguments)
  }

  window.gtag('js', new Date())
  window.gtag('config', GTM_MEASUREMENT_ID)

  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let idleCallbackId: number | null = null

  const interactionEvents = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const

  const loadGtmScript = () => {
    if (window._hasInitializedGtm) return
    window._hasInitializedGtm = true

    // Remove event listeners
    interactionEvents.forEach((evt) => {
      window.removeEventListener(evt, loadGtmScript, { capture: true })
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }

    if (idleCallbackId && 'cancelIdleCallback' in window) {
      window.cancelIdleCallback(idleCallbackId)
      idleCallbackId = null
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_MEASUREMENT_ID}`
    document.head.appendChild(script)
  }

  // Bind interaction listeners with passive/capture flags
  interactionEvents.forEach((evt) => {
    window.addEventListener(evt, loadGtmScript, { capture: true, once: true, passive: true })
  })

  // Fallback idle callback or timeout
  if ('requestIdleCallback' in window) {
    idleCallbackId = window.requestIdleCallback(loadGtmScript, { timeout: 3500 })
  } else {
    timeoutId = setTimeout(loadGtmScript, 3000)
  }
})
