export interface PageHeroAction {
  readonly label: string
  readonly to?: string
  readonly target?: string
  readonly variant?: 'solid' | 'outline' | 'ghost' | 'subtle' | 'soft'
  readonly color?: 'primary' | 'neutral' | 'success' | 'warning' | 'error'
  readonly icon?: string
  readonly trailingIcon?: string
  readonly class?: string
}

export interface PageHeroProps {
  readonly title: string
  readonly subtitle?: string
  readonly description?: string
  readonly avatar?: string
  readonly avatarAlt?: string
  readonly badgeText?: string
  readonly badgeIcon?: string
  readonly metaText?: string
  readonly glowPrimary?: 'violet' | 'cyan' | 'amber' | 'emerald' | 'rose'
  readonly glowSecondary?: 'violet' | 'cyan' | 'amber' | 'emerald' | 'rose'
  readonly primaryAction?: PageHeroAction
  readonly secondaryAction?: PageHeroAction
  readonly centerMobile?: boolean
}
