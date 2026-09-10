import { onMounted, onScopeDispose, watch, isRef, type Ref, type ComputedRef } from 'vue'
import { useCommandPalette } from './useCommandPalette'
import type { CommandItem } from '~/components/molecules/m-command-bar/types'

export interface UseContextualSearchOptions {
  placeholder: string | ComputedRef<string> | Ref<string>
  query: Ref<string>
  categoryLabel?: string | ComputedRef<string> | Ref<string>
  items?: ComputedRef<CommandItem[]> | Ref<CommandItem[]>
}

export function useContextualSearch(options: UseContextualSearchOptions) {
  const palette = useCommandPalette()

  const resolveString = (val?: string | ComputedRef<string> | Ref<string>): string => {
    if (!val) return ''
    if (typeof val === 'string') return val
    return val.value
  }

  const register = () => {
    palette.setContextualSearch({
      placeholder: resolveString(options.placeholder),
      query: options.query,
      categoryLabel: resolveString(options.categoryLabel) || undefined,
      items: options.items
    })
  }

  onMounted(() => {
    register()
  })

  // Synchronize dynamic placeholder changes
  if (isRef(options.placeholder)) {
    watch(options.placeholder, (newVal) => {
      palette.setContextualSearch({
        placeholder: newVal,
        query: options.query,
        categoryLabel: resolveString(options.categoryLabel) || undefined,
        items: options.items
      })
    })
  }

  // Synchronize page query changes to palette search query
  watch(
    () => options.query.value,
    (newVal) => {
      if (palette.searchQuery.value !== newVal) {
        palette.searchQuery.value = newVal
      }
    }
  )

  onScopeDispose(() => {
    palette.clearContextualSearch()
  })
}
