import { ref, computed, onMounted, onScopeDispose } from 'vue'
import { useCommandPalette } from '~/composables/useCommandPalette'

export function useCommandBarController() {
  // 1. Composables & Stores
  const palette = useCommandPalette()

  // 2. Reactive Primitives
  const inputRef = ref<HTMLInputElement | null>(null)
  const containerRef = ref<HTMLElement | null>(null)

  // 3. Computed State & 2-Stage Atomic Booleans
  const hasQuery = computed(() => palette.searchQuery.value.length > 0)
  const isDropdownOpen = computed(() => palette.isOpen.value)
  const placeholderText = computed(() => palette.currentPlaceholder.value)
  const leadLogoUrl = computed(() => {
    const cat = palette.selectedCategory.value
    if (cat === 'compass') return '/icons/plugins/xophz-compass.svg'
    if (cat === 'sparks') return '/icons/sparks/spark-u-spark-plugs.svg'
    const ctx = palette.activeContext?.value?.categoryLabel?.toLowerCase() || ''
    if (ctx.includes('compass') || ctx.includes('plugin')) return '/icons/plugins/xophz-compass.svg'
    if (ctx.includes('spark')) return '/icons/sparks/spark-u-spark-plugs.svg'
    const placeholder = palette.currentPlaceholder.value.toLowerCase()
    if (placeholder.includes('plugin') || placeholder.includes('compass')) return '/icons/plugins/xophz-compass.svg'
    if (placeholder.includes('spark')) return '/icons/sparks/spark-u-spark-plugs.svg'
    return null
  })

  // 4. Helper Methods & Actions
  const focusInput = () => { inputRef.value?.focus() }
  const handleFocus = () => { palette.open() }
  const handleClear = () => { palette.clearQuery(); focusInput() }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); palette.selectNext() }
    else if (event.key === 'ArrowUp') { event.preventDefault(); palette.selectPrevious() }
    else if (event.key === 'Enter') { event.preventDefault(); palette.executeActive() }
    else if (event.key === 'Escape') { palette.close(); inputRef.value?.blur() }
  }

  const handleGlobalKeydown = (event: KeyboardEvent) => {
    const isMetaK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
    const isSlash = event.key === '/'
    const target = event.target as HTMLElement | null
    const isEditable = target && ['INPUT', 'TEXTAREA'].includes(target.tagName)

    if (isMetaK || (isSlash && !isEditable && !palette.isOpen.value)) {
      event.preventDefault()
      palette.open()
      focusInput()
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (!palette.isOpen.value) return
    const target = event.target as Node | null
    if (containerRef.value && target && !containerRef.value.contains(target)) {
      palette.close()
    }
  }

  // 5. Lifecycle Hooks
  onMounted(() => {
    if (!import.meta.server) {
      window.addEventListener('keydown', handleGlobalKeydown)
      window.addEventListener('mousedown', handleClickOutside)
    }
  })

  onScopeDispose(() => {
    if (!import.meta.server) {
      window.removeEventListener('keydown', handleGlobalKeydown)
      window.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return {
    inputRef,
    containerRef,
    palette,
    hasQuery,
    isDropdownOpen,
    placeholderText,
    leadLogoUrl,
    handleFocus,
    handleClear,
    handleKeydown,
    focusInput
  }
}
