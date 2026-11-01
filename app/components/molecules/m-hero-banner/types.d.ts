export interface HeroProfile {
  readonly name: string
  readonly title: string
  readonly tagline: string
  readonly origin: string
  readonly avatar: string
  readonly tags: readonly string[]
}

export interface HeroApp {
  readonly key: string
  readonly name: string
  readonly host: string
  readonly url: string
  readonly icon: string
}
