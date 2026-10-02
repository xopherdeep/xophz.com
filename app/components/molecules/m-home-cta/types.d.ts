export interface HomeCtaProps {
  readonly title?: string
  readonly subtitle?: string
}

export interface HomeCtaAction {
  readonly label: string
  readonly to: string
  readonly isExternal?: boolean
  readonly icon?: string
  readonly variant?: 'solid' | 'outline' | 'subtle' | 'ghost'
}
