import { encode, type QrCodeGenerateResult } from 'uqr'

export enum QrEcc {
  LOW = 'L',
  MEDIUM = 'M',
  QUARTILE = 'Q',
  HIGH = 'H'
}

export type QrEccInput = QrEcc | 'L' | 'M' | 'Q' | 'H'

export interface QrPathData {
  readonly totalSize: number
  readonly pathD: string
}

export function resolveQrEcc(ecc?: QrEccInput): 'L' | 'M' | 'Q' | 'H' {
  if (ecc === QrEcc.LOW || ecc === 'L') return 'L'
  if (ecc === QrEcc.MEDIUM || ecc === 'M') return 'M'
  if (ecc === QrEcc.QUARTILE || ecc === 'Q') return 'Q'
  if (ecc === QrEcc.HIGH || ecc === 'H') return 'H'
  return 'M'
}

export function encodeQrMatrix(text: string, eccInput: QrEccInput = 'M'): boolean[][] {
  const ecc = resolveQrEcc(eccInput)
  const qr: QrCodeGenerateResult = encode(text, { ecc, border: 0 })
  return qr.data
}

export function getQrPathData(
  text: string,
  eccInput: QrEccInput = 'M',
  margin: number = 4
): QrPathData {
  const ecc = resolveQrEcc(eccInput)
  const qr: QrCodeGenerateResult = encode(text, { ecc, border: margin })
  const totalSize = qr.size

  let pathD = ''
  for (let y = 0; y < totalSize; y++) {
    for (let x = 0; x < totalSize; x++) {
      if (qr.data[y]![x]) {
        pathD += `M${x},${y}h1v1h-1z `
      }
    }
  }

  return { totalSize, pathD: pathD.trim() }
}

export function generateQrSvg(
  text: string,
  eccInput: QrEccInput = 'M',
  margin: number = 4
): string {
  const { totalSize, pathD } = getQrPathData(text, eccInput, margin)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize}" shape-rendering="crispEdges" class="m-qrd-modal__svg" role="img" aria-label="QR Code"><rect width="100%" height="100%" fill="#ffffff"/><path d="${pathD}" fill="#000000"/></svg>`
}

