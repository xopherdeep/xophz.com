import { defineNuxtPlugin } from '#imports'
import { resolveTimeTheme, getMsUntilNextTransition } from '~/composables/useTimeOfDayTheme'

interface NuxtColorModeHelper {
  preference: string
  value: string
  getColorScheme: () => string
  addColorScheme: (theme: string) => void
  removeColorScheme: (theme: string) => void
}

declare global {
  interface Window {
    __NUXT_COLOR_MODE__?: NuxtColorModeHelper
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = useColorMode()

  // Clean up any initial SSR/head forced guard
  if (document.documentElement.hasAttribute('data-color-mode-forced')) {
    document.documentElement.removeAttribute('data-color-mode-forced')
  }

  // Intercept system color-scheme resolver to return circadian theme
  if (window.__NUXT_COLOR_MODE__) {
    window.__NUXT_COLOR_MODE__.getColorScheme = () => resolveTimeTheme()
  }

  const syncCircadianTheme = () => {
    const isAutoMode = colorMode.preference === 'system'
    if (!isAutoMode) return

    const targetTheme = resolveTimeTheme()
    const isMismatched = colorMode.value !== targetTheme

    if (isMismatched) {
      colorMode.value = targetTheme
    }
  }

  let transitionTimer: ReturnType<typeof setTimeout> | null = null

  const scheduleNextTransition = () => {
    if (transitionTimer) {
      clearTimeout(transitionTimer)
      transitionTimer = null
    }

    const delayMs = getMsUntilNextTransition()
    transitionTimer = setTimeout(() => {
      syncCircadianTheme()
      scheduleNextTransition()
    }, delayMs)
  }

  const handleWakeOrVisibility = () => {
    const isVisible = document.visibilityState === 'visible'
    if (!isVisible) return

    syncCircadianTheme()
    scheduleNextTransition()
  }

  // Initial sync & schedule
  syncCircadianTheme()
  scheduleNextTransition()

  // Event handlers for tab focus and system wake
  document.addEventListener('visibilitychange', handleWakeOrVisibility)
  window.addEventListener('focus', handleWakeOrVisibility)

  window.addEventListener('pagehide', () => {
    if (transitionTimer) {
      clearTimeout(transitionTimer)
      transitionTimer = null
    }
  })
})
