import Anthropic from '@anthropic-ai/sdk'

export interface BookMetadata {
  title: string
  subtitle: string
  author: string
  primary: string   // dark color hex
  accent: string    // bright/vivid color hex
  neutral: string   // light background color hex
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function extractBookMetadata(imageBase64: string, mimeType: string): Promise<BookMetadata> {
  console.log('[claude] extractBookMetadata — sending image to Claude Vision')

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
              data: imageBase64,
            },
          },
          {
            type: 'text',
            text: `Look at this 3D book cover image and extract the following. Reply ONLY with valid JSON, no explanation.

{
  "title": "The main book title",
  "subtitle": "The subtitle or tagline (empty string if none)",
  "author": "The author's full name",
  "primary": "#hex — the darkest dominant color from the cover (for dark backgrounds)",
  "accent": "#hex — the brightest vivid color from the cover (for buttons/highlights)",
  "neutral": "#hex — a light/pale version of the cover palette (for section backgrounds)"
}`,
          },
        ],
      },
    ],
  })

  const text = (response.content[0] as { type: string; text: string }).text.trim()
  console.log('[claude] raw response:', text)

  const json = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
  const data = JSON.parse(json) as BookMetadata

  console.log('[claude] extracted metadata:', data)
  return data
}
