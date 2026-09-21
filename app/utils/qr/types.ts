export type QrEccLevel = 'L' | 'M' | 'Q' | 'H'

export interface QrEcc {
  readonly ordinal: number
  readonly formatBits: number
}

export const QrEccMap: Record<QrEccLevel, QrEcc> = {
  L: { ordinal: 0, formatBits: 1 },
  M: { ordinal: 1, formatBits: 0 },
  Q: { ordinal: 2, formatBits: 3 },
  H: { ordinal: 3, formatBits: 2 }
}

declare module 'uqr' {
  export interface QrCodeGenerateResult {
    version: number
    size: number
    maskPattern: number
    data: boolean[][]
  }

  export interface QrCodeGenerateOptions {
    ecc?: 'L' | 'M' | 'Q' | 'H'
    maskPattern?: number
    boostEcc?: boolean
    minVersion?: number
    maxVersion?: number
    border?: number
    invert?: boolean
  }

  export function encode(data: string | number[], options?: QrCodeGenerateOptions): QrCodeGenerateResult
  export function renderSVG(data: string | number[], options?: any): string
}

