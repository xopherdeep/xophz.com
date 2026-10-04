import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'

export function useAuditCommandController(command: () => string) {
  // 1. Composables & Stores
  const { copy, copied } = useClipboard({ copiedDuring: 2000 })

  // 2. Computed State & 2-Stage Booleans
  const copyLabel = computed(() => (copied.value ? 'Copied' : 'Copy'))
  const copyIcon = computed(() => (copied.value ? 'i-lucide-check' : 'i-lucide-copy'))

  // 3. Helper Methods & Actions
  const copyCommand = async () => {
    await copy(command())
  }

  return {
    copied,
    copyLabel,
    copyIcon,
    copyCommand
  }
}
