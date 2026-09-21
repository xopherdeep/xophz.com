export interface QrdContact {
  readonly name: string
  readonly title: string
  readonly organization: string
  readonly phone: string
  readonly email: string
  readonly website: string
  readonly websites: readonly string[]
  readonly birthday?: string
  readonly location: string
  readonly avatar: string
  readonly note: string
}

export interface Props {
  readonly isOpen: boolean
}

export interface Emits {
  (e: 'close'): void
}
