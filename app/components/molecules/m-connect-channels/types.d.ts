export interface ChannelLink {
  readonly id: string
  readonly label: string
  readonly href: string
  readonly color: string
  readonly icon: string
}

export interface ChannelGroup {
  readonly id: string
  readonly title: string
  readonly icon: string
  readonly color: string
  readonly links: readonly ChannelLink[]
}
