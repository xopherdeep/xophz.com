const EXP_TABLE = new Uint8Array(512)
const LOG_TABLE = new Uint8Array(256)

let current = 1
for (let i = 0; i < 255; i++) {
  EXP_TABLE[i] = current
  EXP_TABLE[i + 255] = current
  LOG_TABLE[current] = i
  current = (current << 1) ^ (current >= 128 ? 0x11d : 0)
}

function multiply(x: number, y: number): number {
  if (x === 0 || y === 0) return 0
  return EXP_TABLE[LOG_TABLE[x]! + LOG_TABLE[y]!]!
}

export function createReedSolomonGenerator(degree: number): Uint8Array {
  const result = new Uint8Array(degree + 1)
  result[0] = 1
  let root = 1
  for (let i = 0; i < degree; i++) {
    for (let j = i + 1; j > 0; j--) {
      result[j] = result[j]! ^ multiply(result[j - 1]!, root)
    }
    root = (root << 1) ^ (root >= 128 ? 0x11d : 0)
  }
  return result
}

export function computeReedSolomonRemainder(data: Uint8Array, generator: Uint8Array): Uint8Array {
  const degree = generator.length - 1
  const remainder = new Uint8Array(degree)

  for (const byte of data) {
    const factor = byte ^ remainder[0]!
    remainder.copyWithin(0, 1)
    remainder[degree - 1] = 0
    for (let j = 0; j < degree; j++) {
      remainder[j] ^= multiply(generator[j + 1]!, factor)
    }
  }

  return remainder
}
