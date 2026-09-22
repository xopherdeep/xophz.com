import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import type { FeaturedProjectItem } from './types'

export function useFeaturedProjectsController() {
  const { projects } = useProfileData()

  const featuredList = computed<FeaturedProjectItem[]>(() =>
    projects
      .filter(p => p.tier === 'engineering')
      .slice(0, 6)
      .map(p => ({
        name: p.name,
        desc: p.desc,
        tag: p.tag,
        url: p.url,
        color: p.color
      }))
  )

  const hasProjects = computed(() => featuredList.value.length > 0)

  return {
    featuredList,
    hasProjects
  }
}
