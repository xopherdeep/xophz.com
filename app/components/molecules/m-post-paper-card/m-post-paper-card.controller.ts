import { computed } from 'vue'
import type { PostPaperCardProps } from './types'

export function usePostPaperCardController(props: PostPaperCardProps) {
  // 1. Composables & Stores (none needed for pure derivation)

  // 2. Reactive Primitives (none needed)

  // 3. Computed State & Two-Stage Booleans
  const formattedDate = computed(() => {
    if (!props.post.date) return ''
    return new Date(props.post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  })

  const folderName = computed(() => {
    const parts = props.post.path.split('/')
    const hasCategory = parts.length > 3
    return hasCategory ? parts[2] : 'note'
  })

  // Stage 1: Atomic Concept Declarations
  const isShortType = computed(() => props.post.type === 'short')
  const hasTitle = computed(() => !isShortType.value && Boolean(props.post.title))
  const hasSummary = computed(() => Boolean(props.post.summary))

  // Stage 2: Unified Computed Descriptors
  const typeLabel = computed(() => (isShortType.value ? 'Update' : 'Article'))

  const typeBadgeClass = computed(() => (
    isShortType.value
      ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400'
      : 'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-400'
  ))

  const accentBarClass = computed(() => (
    isShortType.value ? 'bg-cyan-500' : 'bg-violet-500'
  ))

  return {
    formattedDate,
    folderName,
    isShortType,
    hasTitle,
    hasSummary,
    typeLabel,
    typeBadgeClass,
    accentBarClass
  }
}
