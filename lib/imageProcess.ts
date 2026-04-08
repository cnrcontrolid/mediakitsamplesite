import sharp from 'sharp'

const TARGET_WIDTH = 750
const TARGET_HEIGHT = 1000

/**
 * Takes a raw image buffer and returns a cropped/resized PNG at 750x1000.
 * Trims whitespace/transparent edges then fits into 750x1000 with padding.
 */
export async function processBookCover(inputBuffer: Buffer): Promise<Buffer> {
  console.log('[imageProcess] processBookCover — trimming and resizing cover')

  const processed = await sharp(inputBuffer)
    .trim({ background: { r: 255, g: 255, b: 255, alpha: 1 }, threshold: 30 })
    .resize(TARGET_WIDTH, TARGET_HEIGHT, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer()

  console.log('[imageProcess] done — output size:', processed.length, 'bytes')
  return processed
}
