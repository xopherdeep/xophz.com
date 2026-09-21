import { QrMode, appendBits, type bit, type byte, type int } from './qr-types'

export class QrSegment {
  public static makeBytes(data: Readonly<byte[]>): QrSegment {
    const bb: bit[] = []
    for (const b of data) appendBits(b, 8, bb)
    return new QrSegment(QrMode.BYTE, data.length, bb)
  }

  public static makeNumeric(text: string): QrSegment {
    if (!QrSegment.isNumeric(text)) throw new RangeError('String contains non-numeric characters')
    const bb: bit[] = []
    let i = 0
    while (i + 3 <= text.length) {
      appendBits(parseInt(text.substring(i, i + 3), 10), 10, bb)
      i += 3
    }
    const rem = text.length - i
    if (rem === 2) appendBits(parseInt(text.substring(i, i + 2), 10), 7, bb)
    else if (rem === 1) appendBits(parseInt(text.substring(i, i + 1), 10), 4, bb)
    return new QrSegment(QrMode.NUMERIC, text.length, bb)
  }

  public static makeAlphanumeric(text: string): QrSegment {
    if (!QrSegment.isAlphanumeric(text)) throw new RangeError('String contains unencodable characters')
    const bb: bit[] = []
    let i = 0
    while (i + 2 <= text.length) {
      let temp = QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)) * 45
      temp += QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i + 1))
      appendBits(temp, 11, bb)
      i += 2
    }
    if (i < text.length) {
      appendBits(QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)), 6, bb)
    }
    return new QrSegment(QrMode.ALPHANUMERIC, text.length, bb)
  }

  public static makeSegments(text: string): QrSegment[] {
    if (text === '') return []
    if (QrSegment.isNumeric(text)) return [QrSegment.makeNumeric(text)]
    if (QrSegment.isAlphanumeric(text)) return [QrSegment.makeAlphanumeric(text)]
    return [QrSegment.makeBytes(QrSegment.toUtf8ByteArray(text))]
  }

  public static isNumeric(text: string): boolean {
    return QrSegment.NUMERIC_REGEX.test(text)
  }

  public static isAlphanumeric(text: string): boolean {
    return QrSegment.ALPHANUMERIC_REGEX.test(text)
  }

  public static getTotalBits(segs: Readonly<QrSegment[]>, version: int): number {
    let result = 0
    for (const seg of segs) {
      const ccbits = seg.mode.numCharCountBits(version)
      if (seg.numChars >= 1 << ccbits) return Infinity
      result += 4 + ccbits + seg.bitData.length
    }
    return result
  }

  private static toUtf8ByteArray(str: string): byte[] {
    const encoder = new TextEncoder()
    return Array.from(encoder.encode(str))
  }

  public readonly mode: QrMode
  public readonly numChars: int
  private readonly bitData: bit[]

  public constructor(mode: QrMode, numChars: int, bitData: bit[]) {
    if (numChars < 0) throw new RangeError('Invalid argument')
    this.mode = mode
    this.numChars = numChars
    this.bitData = bitData.slice()
  }

  public getData(): bit[] {
    return this.bitData.slice()
  }

  private static readonly NUMERIC_REGEX: RegExp = /^[0-9]*$/
  private static readonly ALPHANUMERIC_REGEX: RegExp = /^[A-Z0-9 $%*+./:-]*$/
  private static readonly ALPHANUMERIC_CHARSET: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:'
}
