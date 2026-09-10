export interface ContactLink {
  readonly icon: string
  readonly label: string
  readonly href?: string
  readonly isExternal?: boolean
}

export interface ResumeIdentity {
  readonly name: string
  readonly role: string
}
