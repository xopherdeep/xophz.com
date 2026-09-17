import type { TimelineItem } from '~/data/timelineCatalog'

export interface TimelineCardProps {
  readonly item: TimelineItem
  readonly isTopActive?: boolean
}
