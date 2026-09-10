import type { Ref, ComputedRef, WritableComputedRef } from 'vue'

export type CommandCategory =
  | 'all'
  | 'context'
  | 'pages'
  | 'compass'
  | 'sparks'
  | 'projects'
  | 'posts'
  | 'actions'

export interface CommandCategoryTab {
  readonly id: CommandCategory
  readonly label: string
  readonly icon: string
  readonly logoUrl?: string
}

export interface CommandItem {
  readonly id: string
  readonly title: string
  readonly subtitle?: string
  readonly category: CommandCategory
  readonly categoryLabel: string
  readonly icon: string
  readonly logoUrl?: string
  readonly iconColor?: string
  readonly route?: string
  readonly badge?: string
  readonly isExternal?: boolean
  readonly keywords?: string[]
  readonly action?: () => void
}

export interface ContextualSearchRegistration {
  placeholder: string
  query: Ref<string> | WritableComputedRef<string>
  categoryLabel?: string
  items?: ComputedRef<CommandItem[]> | Ref<CommandItem[]>
}
