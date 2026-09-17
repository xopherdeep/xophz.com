import { computed } from 'vue'
import type { TimelineFilterProps, TimelineFilterEmits, FilterCategoryOption } from './types'

export function useTimelineFilterController(
  props: TimelineFilterProps,
  emit: TimelineFilterEmits
) {
  // 1. Reactive Constants & Categories
  const categoryOptions: readonly FilterCategoryOption[] = [
    'All',
    'Founding & Advisory',
    'Enterprise Systems',
    'Software Engineering',
    'Infrastructure & Tech'
  ]

  // 2. Two-Stage Atomic Booleans
  const isDescending = computed(() => props.sortOrder === 'desc')
  const hasActiveQuery = computed(() => props.search.trim().length > 0)
  const isFiltered = computed(() => hasActiveQuery.value || props.category !== 'All')

  // 3. Helper Methods & Actions
  const selectCategory = (category: FilterCategoryOption) => {
    emit('update:category', category)
  }

  const toggleSortOrder = () => {
    const nextOrder = isDescending.value ? 'asc' : 'desc'
    emit('update:sortOrder', nextOrder)
  }

  const onSearchChange = (query: string) => {
    emit('update:search', query)
  }

  const clearFilters = () => {
    emit('update:search', '')
    emit('update:category', 'All')
  }

  return {
    categoryOptions,
    isDescending,
    isFiltered,
    selectCategory,
    toggleSortOrder,
    onSearchChange,
    clearFilters
  }
}
