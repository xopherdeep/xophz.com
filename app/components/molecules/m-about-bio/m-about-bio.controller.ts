import { computed } from 'vue'

export function useAboutBioController() {
  const bioTitle = 'What I do'
  const hasBio = computed(() => Boolean(bioTitle))

  return {
    bioTitle,
    hasBio
  }
}
