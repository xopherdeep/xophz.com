import { ref, computed } from 'vue'
import {
  timelineCatalog,
  TIMELINE_ERAS,
  type TimelineItem,
  type TimelineCategory
} from '~/data/timelineCatalog'

export type TimelineSortOrder = 'desc' | 'asc'

export function useTimelineData() {
  // 1. Reactive Primitives
  const searchQuery = ref('')
  const selectedCategory = ref<TimelineCategory | 'All'>('All')
  const sortOrder = ref<TimelineSortOrder>('desc')

  // 2. Two-Stage Atomic Booleans & Filtering
  const filteredItems = computed<TimelineItem[]>(() => {
    const query = searchQuery.value.trim().toLowerCase()
    const activeCategory = selectedCategory.value

    return timelineCatalog.filter((item) => {
      // Stage 1: Atomic Concept Declarations
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesSearch =
        query === '' ||
        item.company.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        item.highlight.toLowerCase().includes(query) ||
        item.skills.some((skill) => skill.toLowerCase().includes(query))

      // Stage 2: Unified Final Decision Variable
      return matchesCategory && matchesSearch
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

  // 4. Metrics & Stats
  const stats = computed(() => {
    const activePositions = timelineCatalog.filter((item) => item.isCurrent)
    return {
      totalYears: 24,
      totalRoles: timelineCatalog.length,
      activeVentures: activePositions.length,
      eras: TIMELINE_ERAS
    }
  })

  return {
    items: sortedItems,
    searchQuery,
    selectedCategory,
    sortOrder,
    stats
  }
}
