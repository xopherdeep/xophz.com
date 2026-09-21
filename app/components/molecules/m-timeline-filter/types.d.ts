import type { TimelineCategory } from '~/data/timelineCatalog'
import type { TimelineSortOrder, TimelineViewMode } from '~/composables/useTimelineData'

export type FilterCategoryOption = TimelineCategory | 'All'

export interface TimelineFilterProps {
  readonly search: string
  readonly category: FilterCategoryOption
  readonly sortOrder: TimelineSortOrder
  readonly viewMode?: TimelineViewMode
  readonly count: number
  readonly featuredCount?: number
  readonly totalRoles?: number
}

export interface TimelineFilterEmits {
  (e: 'update:search', value: string): void
  (e: 'update:category', value: FilterCategoryOption): void
  (e: 'update:sortOrder', value: TimelineSortOrder): void
  (e: 'update:viewMode', value: TimelineViewMode): void
}
