import { describe, it, expect } from 'vitest'
import { encodeQrMatrix } from '~/utils/qr'

describe('m-qrd-modal QR logic', () => {
  it('encodes vCard contact details into high-correction matrix', () => {
    const vcard = 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Xopher (XP) Pollard\r\nTEL:+15207624947\r\nEND:VCARD'
    const matrix = encodeQrMatrix(vcard, 'H')
    expect(matrix.length).toBeGreaterThanOrEqual(21)
    expect(matrix[0]![0]).toBe(true)
  })
})
