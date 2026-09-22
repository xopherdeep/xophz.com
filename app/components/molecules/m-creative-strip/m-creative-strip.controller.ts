import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import type { CreativeExplorationItem } from './types'

export function useCreativeStripController() {
  const { creativePersonas } = useProfileData()

  const creativeItems = computed<CreativeExplorationItem[]>(() =>
    creativePersonas.map(p => ({
      key: p.key,
      name: p.name,
      subtitle: p.subtitle,
      icon: p.icon,
      color: p.color,
      desc: p.desc,
      link: p.link,
      linkLabel: p.linkLabel
    }))
  )

  const hasCreativeItems = computed(() => creativeItems.value.length > 0)

  return {
    creativeItems,
    hasCreativeItems
  }
}
