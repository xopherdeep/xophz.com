import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import type { ChannelGroup } from './types'

export function useConnectChannelsController() {
  // 1. Composables & Stores
  const { channelGroups } = useProfileData()

  // 2. Computed State
  const groups = computed<readonly ChannelGroup[]>(() => channelGroups as readonly ChannelGroup[])
  const totalChannels = computed(() => groups.value.reduce((acc, g) => acc + g.links.length, 0))

  // 3. Two-Stage Atomic Booleans
  const hasGroups = computed(() => groups.value.length > 0)
  const isComplete = computed(() => totalChannels.value > 0)

  return {
    groups,
    hasGroups,
    isComplete,
  }
}
