import { ref, computed } from 'vue'
import {
  timelineCatalog,
  TIMELINE_ERAS,
  type TimelineItem,
  type TimelineCategory,
  type TimelineEra
} from '~/data/timelineCatalog'

export type TimelineSortOrder = 'desc' | 'asc'
export type TimelineViewMode = 'all' | 'featured'

export interface TimelineEraGroup {
  readonly era: TimelineEra
  readonly items: readonly TimelineItem[]
}

export function useTimelineData() {
  // 1. Reactive Primitives
  const searchQuery = ref('')
  const selectedCategory = ref<TimelineCategory | 'All'>('All')
  const sortOrder = ref<TimelineSortOrder>('desc')
  const viewMode = ref<TimelineViewMode>('all')
  const activeItemId = ref<string | null>(null)

  // 2. Two-Stage Atomic Booleans & Filtering
  const filteredItems = computed<TimelineItem[]>(() => {
    const query = searchQuery.value.trim().toLowerCase()
    const activeCategory = selectedCategory.value
    const isFeaturedOnly = viewMode.value === 'featured'

    return timelineCatalog.filter((item) => {
      // Stage 1: Atomic Concept Declarations
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesViewMode = !isFeaturedOnly || item.isFeatured
      const matchesSearch =
        query === '' ||
        item.company.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        item.highlight.toLowerCase().includes(query) ||
        item.skills.some((skill) => skill.toLowerCase().includes(query))

      // Stage 2: Unified Final Decision Variable
      return matchesCategory && matchesViewMode && matchesSearch
    })
  })

  // 3. Sorting
  const sortedItems = computed<TimelineItem[]>(() => {
    const isAscending = sortOrder.value === 'asc'
    const items = [...filteredItems.value]

    if (isAscending) {
      return items.reverse()
    }
    return items
  })

  // 4. Grouping by Era
  const eraGroups = computed<TimelineEraGroup[]>(() => {
    const isAscending = sortOrder.value === 'asc'
    const orderedEras = isAscending ? [...TIMELINE_ERAS].reverse() : [...TIMELINE_ERAS]
    const currentItems = sortedItems.value

    return orderedEras
      .map((era) => {
        const itemsInEra = currentItems.filter((item) => item.eraKey === era.key)
        return {
          era,
          items: itemsInEra
        }
      })
      .filter((group) => group.items.length > 0)
  })

  // 5. Actions
  const scrollToRole = (id: string) => {
    activeItemId.value = id
    if (typeof window === 'undefined') return

    const targetEl = document.getElementById(`role-${id}`)
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // 6. Metrics & Stats
  const stats = computed(() => {
    const activePositions = timelineCatalog.filter((item) => item.isCurrent)
    const featuredPositions = timelineCatalog.filter((item) => item.isFeatured)

    return {
      totalYears: 36,
      totalRoles: timelineCatalog.length,
      featuredRoles: featuredPositions.length,
      activeVentures: activePositions.length,
      eras: TIMELINE_ERAS
    }
  })

  return {
    items: sortedItems,
    eraGroups,
    searchQuery,
    selectedCategory,
    sortOrder,
    viewMode,
    activeItemId,
    scrollToRole,
    stats
  }
}
