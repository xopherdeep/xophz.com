import { computed } from 'vue'

export function useAboutBioController() {
  const bioTitle = 'Executive Overview'
  const hasBio = computed(() => Boolean(bioTitle))

  return {
    bioTitle,
    hasBio
  }
}
