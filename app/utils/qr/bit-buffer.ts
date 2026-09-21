export class BitBuffer {
  private bits: number[] = []

  public get length(): number {
    return this.bits.length
  }

  public getBit(index: number): number {
    return this.bits[index] ?? 0
  }

  public appendBits(val: number, len: number): void {
    if (len < 0 || len > 32) throw new RangeError('Length out of range')
    for (let i = len - 1; i >= 0; i--) {
      this.bits.push((val >>> i) & 1)
    }
  }

  public getBytes(): Uint8Array {
    const byteCount = Math.ceil(this.bits.length / 8)
    const result = new Uint8Array(byteCount)
    for (let i = 0; i < this.bits.length; i++) {
      const bit = this.bits[i] ?? 0
      result[i >>> 3] |= bit << (7 - (i & 7))
    }
    return result
  }
}
