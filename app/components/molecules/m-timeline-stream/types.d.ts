import type { TimelineItem } from '~/data/timelineCatalog'
import type { TimelineEraGroup } from '~/composables/useTimelineData'

export interface TimelineStreamProps {
  readonly items: readonly TimelineItem[]
  readonly eraGroups?: readonly TimelineEraGroup[]
  readonly activeId?: string | null
}
