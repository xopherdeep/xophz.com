import type { TimelineCategory } from '~/data/timelineCatalog'
import type { TimelineSortOrder } from '~/composables/useTimelineData'

export type FilterCategoryOption = TimelineCategory | 'All'

export interface TimelineFilterProps {
  readonly search: string
  readonly category: FilterCategoryOption
  readonly sortOrder: TimelineSortOrder
  readonly count: number
}

export interface TimelineFilterEmits {
  (e: 'update:search', value: string): void
  (e: 'update:category', value: FilterCategoryOption): void
  (e: 'update:sortOrder', value: TimelineSortOrder): void
}
