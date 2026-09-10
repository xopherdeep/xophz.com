import { computed } from 'vue'

export type TimeTheme = 'light' | 'dark'

export const DAY_START_HOUR = 6
export const NIGHT_START_HOUR = 18

export const resolveTimeTheme = (date: Date = new Date()): TimeTheme => {
  const currentHour = date.getHours()
  const isDayStartReached = currentHour >= DAY_START_HOUR
  const isNightStartReached = currentHour >= NIGHT_START_HOUR
  const isDayTime = isDayStartReached && !isNightStartReached

  return isDayTime ? 'light' : 'dark'
}

export const getMsUntilNextTransition = (now: Date = new Date()): number => {
  const currentHour = now.getHours()
  const target = new Date(now)
  target.setMinutes(0, 0, 0)

  const isEarlyMorning = currentHour < DAY_START_HOUR
  const isMidDay = currentHour >= DAY_START_HOUR && currentHour < NIGHT_START_HOUR

  if (isEarlyMorning) {
    target.setHours(DAY_START_HOUR)
  } else if (isMidDay) {
    target.setHours(NIGHT_START_HOUR)
  } else {
    target.setDate(target.getDate() + 1)
    target.setHours(DAY_START_HOUR)
  }

  const calculatedMs = target.getTime() - now.getTime()
  return Math.max(calculatedMs, 1000)
}

export function useTimeOfDayTheme() {
  const colorMode = useColorMode()

  const isAutoMode = computed(() => colorMode.preference === 'system')
  const expectedTheme = computed(() => resolveTimeTheme())
  const activeTheme = computed(() => colorMode.value as TimeTheme)

  const syncTheme = () => {
    const shouldSync = isAutoMode.value
    if (!shouldSync) return

    const desiredTheme = resolveTimeTheme()
    const isThemeMismatched = colorMode.value !== desiredTheme

    if (isThemeMismatched) {
      colorMode.value = desiredTheme
    }
  }

  const resetToAuto = () => {
    colorMode.preference = 'system'
    syncTheme()
  }

  return {
    isAutoMode,
    expectedTheme,
    activeTheme,
    syncTheme,
    resetToAuto
  }
}
