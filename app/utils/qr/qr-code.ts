import { QrEcc, appendBits, getBit, type bit, type byte, type int } from './qr-types'
import { QrSegment } from './qr-segment'
import { ECC_CODEWORDS_PER_BLOCK, NUM_ERROR_CORRECTION_BLOCKS } from './qr-tables'

export class QrCode {
  public static readonly MIN_VERSION: int = 1
  public static readonly MAX_VERSION: int = 40

  private static readonly PENALTY_N1: int = 3
  private static readonly PENALTY_N2: int = 3
  private static readonly PENALTY_N3: int = 40
  private static readonly PENALTY_N4: int = 10

  private static readonly MASK_PATTERNS: ReadonlyArray<(x: int, y: int) => boolean> = [
    (x, y) => (x + y) % 2 === 0,
    (_x, y) => y % 2 === 0,
    (x, _y) => x % 3 === 0,
    (x, y) => (x + y) % 3 === 0,
    (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
    (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
    (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
    (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0
  ]

  public static encodeText(text: string, ecl: QrEcc): QrCode {
    const segs = QrSegment.makeSegments(text)
    return QrCode.encodeSegments(segs, ecl)
  }

  public static encodeBinary(data: Readonly<byte[]>, ecl: QrEcc): QrCode {
    const seg = QrSegment.makeBytes(data)
    return QrCode.encodeSegments([seg], ecl)
  }

  public static encodeSegments(
    segs: Readonly<QrSegment[]>,
    ecl: QrEcc,
    minVersion: int = 1,
    maxVersion: int = 40,
    mask: int = -1,
    boostEcl: boolean = true
  ): QrCode {
    let version: int
    let dataUsedBits: int = 0
    for (version = minVersion; ; version++) {
      const dataCapacityBits = QrCode.getNumDataCodewords(version, ecl) * 8
      const usedBits = QrSegment.getTotalBits(segs, version)
      if (usedBits <= dataCapacityBits) {
        dataUsedBits = usedBits
        break
      }
      if (version >= maxVersion) throw new RangeError('Data too long')
    }

    for (const newEcl of [QrEcc.MEDIUM, QrEcc.QUARTILE, QrEcc.HIGH]) {
      if (boostEcl && dataUsedBits <= QrCode.getNumDataCodewords(version, newEcl) * 8) {
        ecl = newEcl
      }
    }

    const bb: bit[] = []
    for (const seg of segs) {
      appendBits(seg.mode.modeBits, 4, bb)
      appendBits(seg.numChars, seg.mode.numCharCountBits(version), bb)
      for (const b of seg.getData()) bb.push(b)
    }

    const dataCapacityBits = QrCode.getNumDataCodewords(version, ecl) * 8
    appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb)
    appendBits(0, (8 - (bb.length % 8)) % 8, bb)

    for (let padByte = 0xec; bb.length < dataCapacityBits; padByte ^= 0xec ^ 0x11) {
      appendBits(padByte, 8, bb)
    }

    const dataCodewords: byte[] = []
    while (dataCodewords.length * 8 < bb.length) dataCodewords.push(0)
    bb.forEach((b, i) => (dataCodewords[i >>> 3] |= b << (7 - (i & 7))))

    return new QrCode(version, ecl, dataCodewords, mask)
  }

  public readonly size: int
  public readonly mask: int
  public readonly version: int
  public readonly errorCorrectionLevel: QrEcc
  private readonly modules: boolean[][] = []
  private isFunction: boolean[][] = []

  public constructor(version: int, errorCorrectionLevel: QrEcc, dataCodewords: Readonly<byte[]>, msk: int) {
    this.version = version
    this.errorCorrectionLevel = errorCorrectionLevel
    this.size = version * 4 + 17

    const row: boolean[] = Array(this.size).fill(false)
    for (let i = 0; i < this.size; i++) {
      this.modules.push(row.slice())
      this.isFunction.push(row.slice())
    }

    this.drawFunctionPatterns()
    const allCodewords = this.addEccAndInterleave(dataCodewords)
    this.drawCodewords(allCodewords)

    if (msk === -1) {
      let minPenalty = 1000000000
      for (let i = 0; i < 8; i++) {
        this.applyMask(i)
        this.drawFormatBits(i)
        const penalty = this.getPenaltyScore()
        if (penalty < minPenalty) {
          msk = i
          minPenalty = penalty
        }
        this.applyMask(i)
      }
    }

    this.mask = msk
    this.applyMask(msk)
    this.drawFormatBits(msk)
    this.isFunction = []
  }

  public getModule(x: int, y: int): boolean {
    return x >= 0 && x < this.size && y >= 0 && y < this.size && this.modules[y]![x]!
  }

  private drawFunctionPatterns(): void {
    for (let i = 0; i < this.size; i++) {
      this.setFunctionModule(6, i, i % 2 === 0)
      this.setFunctionModule(i, 6, i % 2 === 0)
    }

    this.drawFinderPattern(3, 3)
    this.drawFinderPattern(this.size - 4, 3)
    this.drawFinderPattern(3, this.size - 4)

    const alignPatPos = this.getAlignmentPatternPositions()
    const numAlign = alignPatPos.length
    for (let i = 0; i < numAlign; i++) {
      for (let j = 0; j < numAlign; j++) {
        const isCorner =
          (i === 0 && j === 0) ||
          (i === 0 && j === numAlign - 1) ||
          (i === numAlign - 1 && j === 0)
        if (!isCorner) {
          this.drawAlignmentPattern(alignPatPos[i]!, alignPatPos[j]!)
        }
      }
    }

    this.drawFormatBits(0)
    this.drawVersion()
  }

  private drawFormatBits(mask: int): void {
    const data = (this.errorCorrectionLevel.formatBits << 3) | mask
    let rem = data
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537)
    const bits = ((data << 10) | rem) ^ 0x5412

    for (let i = 0; i <= 5; i++) this.setFunctionModule(8, i, getBit(bits, i))
    this.setFunctionModule(8, 7, getBit(bits, 6))
    this.setFunctionModule(8, 8, getBit(bits, 7))
    this.setFunctionModule(7, 8, getBit(bits, 8))
    for (let i = 9; i < 15; i++) this.setFunctionModule(14 - i, 8, getBit(bits, i))

    for (let i = 0; i < 8; i++) this.setFunctionModule(this.size - 1 - i, 8, getBit(bits, i))
    for (let i = 8; i < 15; i++) this.setFunctionModule(8, this.size - 15 + i, getBit(bits, i))
    this.setFunctionModule(8, this.size - 8, true)
  }

  private drawVersion(): void {
    if (this.version < 7) return
    let rem = this.version
    for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25)
    const bits = (this.version << 12) | rem
    for (let i = 0; i < 18; i++) {
      const a = this.size - 11 + (i % 3)
      const b = Math.floor(i / 3)
      const bit = getBit(bits, i)
      this.setFunctionModule(a, b, bit)
      this.setFunctionModule(b, a, bit)
    }
  }

  private drawFinderPattern(x: int, y: int): void {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const dist = Math.max(Math.abs(dx), Math.abs(dy))
        const xx = x + dx
        const yy = y + dy
        const isXInBounds = xx >= 0 && xx < this.size
        const isYInBounds = yy >= 0 && yy < this.size
        const isInBounds = isXInBounds && isYInBounds
        if (isInBounds) {
          const isFinderDark = dist !== 2 && dist !== 4
          this.setFunctionModule(xx, yy, isFinderDark)
        }
      }
    }
  }

  private drawAlignmentPattern(x: int, y: int): void {
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1)
      }
    }
  }

  private setFunctionModule(x: int, y: int, isDark: boolean): void {
    this.modules[y]![x] = isDark
    this.isFunction[y]![x] = true
  }

  private addEccAndInterleave(data: Readonly<byte[]>): byte[] {
    const numBlocks = NUM_ERROR_CORRECTION_BLOCKS[this.errorCorrectionLevel.ordinal]![this.version]!
    const blockEccLen = ECC_CODEWORDS_PER_BLOCK[this.errorCorrectionLevel.ordinal]![this.version]!
    const numShortBlocks = numBlocks - (QrCode.getNumRawDataModules(this.version) / 8 % numBlocks)
    const shortBlockLen = Math.floor(QrCode.getNumRawDataModules(this.version) / 8 / numBlocks)

    const blocks: byte[][] = []
    const rsDiv = QrCode.reedSolomonComputeDivisor(blockEccLen)
    for (let i = 0, k = 0; i < numBlocks; i++) {
      const dat = data.slice(k, k + shortBlockLen - blockEccLen + (i >= numShortBlocks ? 1 : 0))
      k += dat.length
      const ecc = QrCode.reedSolomonComputeRemainder(dat, rsDiv)
      if (i >= numShortBlocks) dat.push(0)
      blocks.push(dat.concat(ecc))
    }

    const result: byte[] = []
    for (let i = 0; i < blocks[0]!.length; i++) {
      blocks.forEach((block, j) => {
        if (i !== shortBlockLen - blockEccLen || j >= numShortBlocks) result.push(block[i]!)
      })
    }
    return result
  }

  private drawCodewords(data: Readonly<byte[]>): void {
    let i = 0
    for (let right = this.size - 1; right = right > 0 ? right : 0; right -= 2) {
      if (right === 6) right = 5
      for (let vert = 0; vert < this.size; vert++) {
        for (let j = 0; j < 2; j++) {
          const x = right - j
          const upward = ((right + 1) & 2) === 0
          const y = upward ? this.size - 1 - vert : vert
          if (!this.isFunction[y]![x] && i < data.length * 8) {
            this.modules[y]![x] = getBit(data[i >>> 3]!, 7 - (i & 7))
            i++
          }
        }
      }
      if (right === 0) break
    }
  }

  private applyMask(mask: int): void {
    const maskFn = QrCode.MASK_PATTERNS[mask]
    if (!maskFn) throw new RangeError('Invalid mask')
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const invert = maskFn(x, y)
        if (!this.isFunction[y]![x] && invert) {
          this.modules[y]![x] = !this.modules[y]![x]
        }
      }
    }
  }

  private getPenaltyScore(): int {
    let result = 0
    for (let y = 0; y < this.size; y++) {
      let runColor = false
      let runX = 0
      const runHistory = [0, 0, 0, 0, 0, 0, 0]
      for (let x = 0; x < this.size; x++) {
        if (this.modules[y]![x] === runColor) {
          runX++
          if (runX === 5) result += QrCode.PENALTY_N1
          else if (runX > 5) result++
        } else {
          this.finderPenaltyAddHistory(runX, runHistory)
          if (!runColor) result += this.finderPenaltyCountPatterns(runHistory) * QrCode.PENALTY_N3
          runColor = this.modules[y]![x]!
          runX = 1
        }
      }
      result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * QrCode.PENALTY_N3
    }

    for (let x = 0; x < this.size; x++) {
      let runColor = false
      let runY = 0
      const runHistory = [0, 0, 0, 0, 0, 0, 0]
      for (let y = 0; y < this.size; y++) {
        if (this.modules[y]![x] === runColor) {
          runY++
          if (runY === 5) result += QrCode.PENALTY_N1
          else if (runY > 5) result++
        } else {
          this.finderPenaltyAddHistory(runY, runHistory)
          if (!runColor) result += this.finderPenaltyCountPatterns(runHistory) * QrCode.PENALTY_N3
          runColor = this.modules[y]![x]!
          runY = 1
        }
      }
      result += this.finderPenaltyTerminateAndCount(runColor, runY, runHistory) * QrCode.PENALTY_N3
    }

    for (let y = 0; y < this.size - 1; y++) {
      for (let x = 0; x < this.size - 1; x++) {
        const color = this.modules[y]![x]
        const isMatchRight = color === this.modules[y]![x + 1]
        const isMatchBottom = color === this.modules[y + 1]![x]
        const isMatchCorner = color === this.modules[y + 1]![x + 1]
        const isBlockUniform = isMatchRight && isMatchBottom && isMatchCorner
        if (isBlockUniform) {
          result += QrCode.PENALTY_N2
        }
      }
    }

    let dark = 0
    for (const row of this.modules) {
      for (const color of row) if (color) dark++
    }
    const total = this.size * this.size
    const k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1
    result += k * QrCode.PENALTY_N4
    return result
  }

  private finderPenaltyCountPatterns(runHistory: Readonly<int[]>): int {
    const n = runHistory[1]!
    const core =
      n > 0 &&
      runHistory[2] === n &&
      runHistory[3] === n * 3 &&
      runHistory[4] === n &&
      runHistory[5] === n
    return (
      (core && runHistory[0]! >= n * 4 && runHistory[6]! >= n ? 1 : 0) +
      (core && runHistory[6]! >= n * 4 && runHistory[0]! >= n ? 1 : 0)
    )
  }

  private finderPenaltyTerminateAndCount(
    currentRunColor: boolean,
    currentRunLength: int,
    runHistory: int[]
  ): int {
    if (currentRunColor) {
      this.finderPenaltyAddHistory(currentRunLength, runHistory)
      currentRunLength = 0
    }
    currentRunLength += this.size
    this.finderPenaltyAddHistory(currentRunLength, runHistory)
    return this.finderPenaltyCountPatterns(runHistory)
  }

  private finderPenaltyAddHistory(currentRunLength: int, runHistory: int[]): void {
    if (runHistory[0] === 0) currentRunLength += this.size
    runHistory.pop()
    runHistory.unshift(currentRunLength)
  }

  private getAlignmentPatternPositions(): int[] {
    if (this.version === 1) return []
    const numAlign = Math.floor(this.version / 7) + 2
    const step = Math.floor((this.version * 8 + numAlign * 3 + 5) / (numAlign * 4 - 4)) * 2
    const result: int[] = [6]
    for (let pos = this.size - 7; result.length < numAlign; pos -= step) {
      result.splice(1, 0, pos)
    }
    return result
  }

  private static getNumRawDataModules(ver: int): int {
    let result = (16 * ver + 128) * ver + 64
    if (ver >= 2) {
      const numAlign = Math.floor(ver / 7) + 2
      result -= (25 * numAlign - 10) * numAlign - 55
      if (ver >= 7) result -= 36
    }
    return result
  }

  private static getNumDataCodewords(ver: int, ecl: QrEcc): int {
    return (
      Math.floor(QrCode.getNumRawDataModules(ver) / 8) -
      ECC_CODEWORDS_PER_BLOCK[ecl.ordinal]![ver]! * NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal]![ver]!
    )
  }

  private static reedSolomonComputeDivisor(degree: int): byte[] {
    const result: byte[] = Array(degree - 1).fill(0)
    result.push(1)
    let root = 1
    for (let i = 0; i < degree; i++) {
      for (let j = 0; j < result.length; j++) {
        result[j] = QrCode.reedSolomonMultiply(result[j]!, root)
        if (j + 1 < result.length) result[j] ^= result[j + 1]!
      }
      root = QrCode.reedSolomonMultiply(root, 0x02)
    }
    return result
  }

  private static reedSolomonComputeRemainder(
    data: Readonly<byte[]>,
    divisor: Readonly<byte[]>
  ): byte[] {
    const result: byte[] = divisor.map(() => 0)
    for (const b of data) {
      const factor = b ^ (result.shift() as byte)
      result.push(0)
      divisor.forEach((coef, i) => (result[i] ^= QrCode.reedSolomonMultiply(coef, factor)))
    }
    return result
  }

  private static reedSolomonMultiply(x: byte, y: byte): byte {
    let z = 0
    for (let i = 7; i >= 0; i--) {
      z = (z << 1) ^ ((z >>> 7) * 0x11d)
      z ^= ((y >>> i) & 1) * x
    }
    return z as byte
  }
}
