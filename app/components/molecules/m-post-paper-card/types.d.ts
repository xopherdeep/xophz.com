export interface PostFeedItem {
  readonly path: string
  readonly title: string
  readonly date: string
  readonly type?: string
  readonly tags?: readonly string[]
  readonly summary?: string
}

export interface PostPaperCardProps {
  readonly post: PostFeedItem
  readonly index?: number
}
