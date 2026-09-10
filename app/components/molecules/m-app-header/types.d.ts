import type { NavigationMenuItem } from '#ui/types'

export interface AppHeaderItem extends NavigationMenuItem {
  label: string
  to: string
  icon?: string
}

export interface AppHeaderState {
  readonly navItems: readonly AppHeaderItem[]
  readonly isMounted: boolean
}
