import type { TimelineItem } from '~/data/timelineCatalog'

export interface TimelineRailProps {
  readonly items: readonly TimelineItem[]
  readonly activeId?: string | null
}

export interface TimelineRailEmits {
  (e: 'select', id: string): void
}

export interface TimelineFileNode {
  readonly id: string
  readonly role: string
  readonly company: string
  readonly year: string
  readonly isCurrent: boolean
  readonly isLast: boolean
}

export interface TimelineTreeBranch {
  readonly key: string
  readonly dirName: string
  readonly label: string
  readonly icon: string
  readonly nodes: readonly TimelineFileNode[]
}
