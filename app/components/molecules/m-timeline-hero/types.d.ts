export interface TimelineHeroStat {
  readonly label: string
  readonly value: string
  readonly subtitle: string
}

export interface TimelineHeroProps {
  readonly totalYears?: number
  readonly totalRoles?: number
  readonly activeVentures?: number
}
