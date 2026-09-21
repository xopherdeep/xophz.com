import { QrEccMap, type QrEccLevel } from './types.ts'
import { ALIGNMENT_PATTERN_BASE, ECC_TABLE, REMAINDER_BITS } from './constants.ts'
import { BitBuffer } from './bit-buffer.ts'
import { createReedSolomonGenerator, computeReedSolomonRemainder } from './reed-solomon.ts'

const FORMAT_MASK = 0x5412

function getFormatBits(eccLevel: QrEccLevel, mask: number): number {
  const data = (QrEccMap[eccLevel].formatBits << 3) | mask
  let rem = data
  for (let i = 0; i < 10; i++) {
    rem = (rem << 1) ^ ((rem >>> 9) * 0x537)
  }
  return ((data << 10) | rem) ^ FORMAT_MASK
}

function getVersionBits(v: number): number {
  let d = v << 12
  while (d >= (1 << 12)) {
    const msb = Math.floor(Math.log2(d))
    const isPast12 = msb >= 12
    if (!isPast12) break
    d ^= 0x1f25 << (msb - 12)
  }
  return (v << 12) | d
}

export function encodeQrMatrix(text: string, preferredEcc: QrEccLevel = 'H'): boolean[][] {
  const encoder = new TextEncoder()
  const rawBytes = encoder.encode(text)

  const eccOrder: QrEccLevel[] = [preferredEcc, 'Q', 'M', 'L']
  const uniqueEccOrder = [...new Set(eccOrder)]

  let chosenVersion = 1
  let chosenEcc: QrEccLevel = 'M'
  let chosenConfig: number[] | null = null
  let totalDataBytes = 0

  for (const ecc of uniqueEccOrder) {
    const eccOrdinal = QrEccMap[ecc].ordinal
    for (let v = 1; v < ECC_TABLE.length; v++) {
      const config = ECC_TABLE[v]![eccOrdinal]!
      const cap = config[1]! * config[2]! + config[3]! * config[4]!
      const countBits = v < 10 ? 8 : 16
      const requiredBits = 4 + countBits + rawBytes.length * 8
      const doesFit = requiredBits <= cap * 8

      if (doesFit) {
        chosenVersion = v
        chosenEcc = ecc
        chosenConfig = config
        totalDataBytes = cap
        break
      }
    }
    const hasChosen = Boolean(chosenConfig)
    if (hasChosen) break
  }

  if (!chosenConfig) {
    throw new Error('Data payload too large for QR generator')
  }

  const [, numBlocksG1, dataBytesG1, numBlocksG2, dataBytesG2] = chosenConfig
  const eccCodewordsPerBlock = chosenConfig[0]!

  // 1. Bit Stream Packing
  const bb = new BitBuffer()
  bb.appendBits(0x4, 4) // Byte mode
  const countBits = chosenVersion < 10 ? 8 : 16
  bb.appendBits(rawBytes.length, countBits)
  for (const byte of rawBytes) {
    bb.appendBits(byte, 8)
  }

  // Terminator
  const totalDataBits = totalDataBytes * 8
  const termLen = Math.min(4, totalDataBits - bb.length)
  bb.appendBits(0, termLen)

  // Pad to byte
  const isByteAligned = bb.length % 8 === 0
  if (!isByteAligned) {
    bb.appendBits(0, 8 - (bb.length % 8))
  }

  // Pad bytes 0xEC, 0x11
  const padPatterns = [0xec, 0x11]
  let padIdx = 0
  while (bb.length < totalDataBits) {
    bb.appendBits(padPatterns[padIdx % 2]!, 8)
    padIdx++
  }

  const packedData = bb.getBytes()

  // 2. Error Correction Blocks
  const totalBlocks = numBlocksG1! + numBlocksG2!
  const dataBlocks: Uint8Array[] = []
  const eccBlocks: Uint8Array[] = []
  const generator = createReedSolomonGenerator(eccCodewordsPerBlock)

  let byteOffset = 0
  for (let i = 0; i < totalBlocks; i++) {
    const isGroup1 = i < numBlocksG1!
    const blockSize = isGroup1 ? dataBytesG1! : dataBytesG2!
    const blockData = packedData.slice(byteOffset, byteOffset + blockSize)
    byteOffset += blockSize
    dataBlocks.push(blockData)
    eccBlocks.push(computeReedSolomonRemainder(blockData, generator))
  }

  // 3. Interleaving
  const finalSequence: number[] = []
  const maxDataBlockLen = Math.max(dataBytesG1!, dataBytesG2!)
  for (let j = 0; j < maxDataBlockLen; j++) {
    for (let i = 0; i < totalBlocks; i++) {
      const hasBlockByte = j < dataBlocks[i]!.length
      if (hasBlockByte) {
        finalSequence.push(dataBlocks[i]![j]!)
      }
    }
  }
  for (let j = 0; j < eccCodewordsPerBlock; j++) {
    for (let i = 0; i < totalBlocks; i++) {
      finalSequence.push(eccBlocks[i]![j]!)
    }
  }

  // Final bits
  const finalBits = new BitBuffer()
  for (const byte of finalSequence) {
    finalBits.appendBits(byte, 8)
  }
  finalBits.appendBits(0, REMAINDER_BITS[chosenVersion] ?? 0)

  // 4. Matrix Population
  const size = chosenVersion * 4 + 17
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false))
  const isFunction: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false))

  // Finder Patterns
  const setFinder = (startX: number, startY: number) => {
    for (let y = -1; y <= 7; y++) {
      for (let x = -1; x <= 7; x++) {
        const px = startX + x
        const py = startY + y
        const isXInBounds = px >= 0 && px < size
        const isYInBounds = py >= 0 && py < size
        const isInBounds = isXInBounds && isYInBounds

        if (isInBounds) {
          const isHorizontalBorder = x >= 0 && x <= 6 && (y === 0 || y === 6)
          const isVerticalBorder = y >= 0 && y <= 6 && (x === 0 || x === 6)
          const isCenterSquare = x >= 2 && x <= 4 && y >= 2 && y <= 4
          const isDark = isHorizontalBorder || isVerticalBorder || isCenterSquare

          matrix[py]![px] = isDark
          isFunction[py]![px] = true
        }
      }
    }
  }
  setFinder(0, 0)
  setFinder(size - 7, 0)
  setFinder(0, size - 7)

  // Timing Patterns
  for (let i = 8; i < size - 8; i++) {
    const isDark = i % 2 === 0
    if (!isFunction[6]![i]) {
      matrix[6]![i] = isDark
      isFunction[6]![i] = true
    }
    if (!isFunction[i]![6]) {
      matrix[i]![6] = isDark
      isFunction[i]![6] = true
    }
  }

  // Alignment Patterns
  const alignCoords = ALIGNMENT_PATTERN_BASE[chosenVersion] ?? []
  for (const cy of alignCoords) {
    for (const cx of alignCoords) {
      if (isFunction[cy]![cx]) continue
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const isDark = Math.max(Math.abs(dx), Math.abs(dy)) !== 1
          matrix[cy + dy]![cx + dx] = isDark
          isFunction[cy + dy]![cx + dx] = true
        }
      }
    }
  }

  // Dark module
  matrix[4 * chosenVersion + 9]![8] = true
  isFunction[4 * chosenVersion + 9]![8] = true

  // Reserve format bits
  for (let i = 0; i <= 8; i++) {
    const isNotTiming = i !== 6
    if (isNotTiming) {
      isFunction[8]![i] = true
      isFunction[i]![8] = true
    }
  }
  for (let i = 0; i < 8; i++) {
    isFunction[8]![size - 1 - i] = true
    isFunction[size - 1 - i]![8] = true
  }

  // Reserve version bits
  const hasVersionBits = chosenVersion >= 7
  if (hasVersionBits) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        isFunction[size - 11 + j]![i] = true
        isFunction[i]![size - 11 + j] = true
      }
    }
  }

  // Mask function: pattern 2 ((x + y) % 3 === 0)
  const isMasked = (x: number, y: number) => (x + y) % 3 === 0

  // 5. Zig-Zag Data Fill
  let bitIdx = 0
  let up = true
  for (let right = size - 1; right > 0; right -= 2) {
    const isTimingCol = right === 6
    if (isTimingCol) right--
    for (let vert = 0; vert < size; vert++) {
      const y = up ? size - 1 - vert : vert
      for (let step = 0; step < 2; step++) {
        const x = right - step
        if (isFunction[y]![x]) continue
        const bit = bitIdx < finalBits.length ? finalBits.getBit(bitIdx) : 0
        bitIdx++
        const shouldInvert = isMasked(x, y)
        matrix[y]![x] = (bit === 1) !== shouldInvert
      }
    }
    up = !up
  }

  // 6. Write Format Information
  const formatVal = getFormatBits(chosenEcc, 2)
  for (let i = 0; i < 15; i++) {
    const bit = ((formatVal >>> i) & 1) === 1
    if (i < 6) matrix[8]![i] = bit
    else if (i < 8) matrix[8]![i + 1] = bit
    else matrix[8]![size - 15 + i] = bit

    if (i < 8) matrix[size - 1 - i]![8] = bit
    else if (i === 8) matrix[size - 7]![8] = bit
    else matrix[14 - i]![8] = bit
  }

  // 7. Write Version Information if version >= 7
  if (hasVersionBits) {
    const vBits = getVersionBits(chosenVersion)
    for (let i = 0; i < 18; i++) {
      const bit = ((vBits >>> i) & 1) === 1
      const a = Math.floor(i / 3)
      const b = size - 11 + (i % 3)
      matrix[b]![a] = bit
      matrix[a]![b] = bit
    }
  }

  return matrix
}
