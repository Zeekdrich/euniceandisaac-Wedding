// One-off asset generation for the invitation artwork.
// Run with: node scripts/generate-images.mjs
import { writeFile } from 'node:fs/promises'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.NETLIFY_AI_GATEWAY_KEY,
  httpOptions: { baseUrl: process.env.NETLIFY_AI_GATEWAY_BASE_URL?.replace(/\/$/, '') },
})

const STYLE =
  'Fine-art watercolour and gold-leaf wedding stationery illustration. Palette: ivory and warm cream background, ' +
  'blush pink and dusty rose blooms, soft champagne and antique gold accents, muted sage and olive foliage. ' +
  'Delicate hand-painted edges, elegant and romantic, luxury letterpress invitation aesthetic. ' +
  'No text, no words, no letters, no people, no frames of photographs.'

const assets = [
  {
    file: 'hero-florals.png',
    aspectRatio: '16:9',
    prompt:
      'A wide, symmetrical floral arch composition for the top of a wedding invitation: garden roses, peonies, ' +
      'white lilies and trailing eucalyptus climbing both sides and meeting at the top, with the entire centre of ' +
      'the image left as clean empty ivory paper for text. Airy, generous negative space in the middle. ' +
      STYLE,
  },
  {
    file: 'floral-corner.png',
    aspectRatio: '1:1',
    prompt:
      'A single delicate corner spray of blush roses, small white blossoms and sage eucalyptus leaves occupying ' +
      'only the top-left corner, the rest of the square left as plain empty ivory paper. ' +
      STYLE,
  },
  {
    file: 'floral-divider.png',
    aspectRatio: '16:9',
    prompt:
      'A slim horizontal ornamental divider, centred: two mirrored sprigs of eucalyptus and tiny blush rosebuds ' +
      'flanking a small gold leaf flourish in the middle, wide empty ivory margins above and below. ' +
      STYLE,
  },
  {
    file: 'paper-texture.png',
    aspectRatio: '4:3',
    prompt:
      'An almost-plain luxury ivory cotton paper texture with a very faint blind-embossed damask pattern and the ' +
      'softest hint of champagne gold sheen in the corners. Extremely subtle, pale and even, suitable as a ' +
      'background wash behind text. ' +
      STYLE,
  },
]

for (const asset of assets) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: asset.prompt,
      config: { imageConfig: { aspectRatio: asset.aspectRatio } },
    })
    const parts = response.candidates?.[0]?.content?.parts ?? []
    const image = parts.find((part) => part.inlineData)
    if (!image) {
      console.error(`no image returned for ${asset.file}`)
      continue
    }
    await writeFile(
      new URL(`../public/img/${asset.file}`, import.meta.url),
      Buffer.from(image.inlineData.data, 'base64'),
    )
    console.log(`wrote ${asset.file}`)
  } catch (error) {
    console.error(`failed ${asset.file}:`, error.message)
  }
}
