export type bit = number
export type byte = number
export type int = number

export class QrEcc {
  public static readonly LOW = new QrEcc(0, 1)
  public static readonly MEDIUM = new QrEcc(1, 0)
  public static readonly QUARTILE = new QrEcc(2, 3)
  public static readonly HIGH = new QrEcc(3, 2)

  public readonly ordinal: int
  public readonly formatBits: int

  private constructor(ordinal: int, formatBits: int) {
    this.ordinal = ordinal
    this.formatBits = formatBits
  }
}

export class QrMode {
  public static readonly NUMERIC = new QrMode(0x1, [10, 12, 14])
  public static readonly ALPHANUMERIC = new QrMode(0x2, [9, 11, 13])
  public static readonly BYTE = new QrMode(0x4, [8, 16, 16])
  public static readonly KANJI = new QrMode(0x8, [8, 10, 12])
  public static readonly ECI = new QrMode(0x7, [0, 0, 0])

  public readonly modeBits: int
  private readonly numBitsCharCount: [int, int, int]

  private constructor(modeBits: int, numBitsCharCount: [int, int, int]) {
    this.modeBits = modeBits
    this.numBitsCharCount = numBitsCharCount
  }

  public numCharCountBits(ver: int): int {
    return this.numBitsCharCount[Math.floor((ver + 7) / 17)] ?? 8
  }
}

export function appendBits(val: int, len: int, bb: bit[]): void {
  const isLenInvalid = len < 0 || len > 31
  const isValInvalid = val >>> len !== 0
  const isOutOfRange = isLenInvalid || isValInvalid
  if (isOutOfRange) {
    throw new RangeError('Value out of range')
  }
  for (let i = len - 1; i >= 0; i--) {
    bb.push((val >>> i) & 1)
  }
}

export function getBit(x: int, i: int): boolean {
  return ((x >>> i) & 1) !== 0
}
