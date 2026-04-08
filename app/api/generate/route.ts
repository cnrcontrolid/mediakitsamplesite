import { NextRequest, NextResponse } from 'next/server'
import { extractBookMetadata } from '@/lib/claude'
import { processBookCover } from '@/lib/imageProcess'
import {
  generateLandingPage,
  generateOrderPage,
  generateConfirmationPage,
  generateTermsPage,
  generatePrivacyPage,
} from '@/lib/generatePages'
import { createGitHubRepo, pushFilesToRepo } from '@/lib/github'
import { deployToVercel } from '@/lib/vercel-deploy'
import { addToLibrary, saveSiteFiles } from '@/lib/library'
import fs from 'fs'
import path from 'path'

export const maxDuration = 300 // 5 min max for Vercel serverless

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50)
}

export async function POST(req: NextRequest) {
  console.log('[generate] POST /api/generate — received request')

  let id = ''
  try {
    const formData = await req.formData()
    const file = formData.get('cover') as File | null
    if (!file) return NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 })

    // 1. Read file as buffer
    const arrayBuffer = await file.arrayBuffer()
    const inputBuffer = Buffer.from(arrayBuffer)
    const mimeType = file.type || 'image/png'

    // 2. Extract metadata from cover via Claude Vision
    const base64 = inputBuffer.toString('base64')
    const metadata = await extractBookMetadata(base64, mimeType)

    // 3. Process image — trim whitespace, resize to 750×1000
    const coverBuffer = await processBookCover(inputBuffer)

    // 4. Build site ID and folder
    id = `${slugify(metadata.title)}-${slugify(metadata.author)}`
    const repoName = `preorder-${id}`

    // 5. Generate 5 HTML pages
    const htmlFiles: Record<string, string> = {
      'index.html':        generateLandingPage(metadata),
      'order.html':        generateOrderPage(metadata),
      'confirmation.html': generateConfirmationPage(metadata),
      'terms.html':        generateTermsPage(metadata),
      'privacy.html':      generatePrivacyPage(metadata),
    }

    // 6. Load the secure-order badge
    const badgePath = path.join(process.cwd(), 'public', 'secure order.png')
    const badgeBuffer = fs.existsSync(badgePath) ? fs.readFileSync(badgePath) : Buffer.alloc(0)

    const allFiles: Record<string, string | Buffer> = {
      ...htmlFiles,
      'cover.png': coverBuffer,
      'secure-order.png': badgeBuffer,
    }

    // 7. Save locally to /sites/{id}/
    saveSiteFiles(id, allFiles)

    // 8. Push to GitHub
    await createGitHubRepo(repoName)
    await pushFilesToRepo(repoName, allFiles)

    // 9. Deploy to Vercel — only add to library on success
    const vercelUrl = await deployToVercel(repoName, allFiles)

    // 10. Add to library.json (persisted to GitHub — works on Vercel)
    const entry = {
      id,
      title: metadata.title,
      subtitle: metadata.subtitle,
      author: metadata.author,
      coverPath: `/sites/${id}/cover.png`,
      vercelUrl,
      createdAt: new Date().toISOString(),
    }
    await addToLibrary(entry)

    console.log('[generate] done —', id, vercelUrl)
    return NextResponse.json({ success: true, entry })

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[generate] error:', message)
    // Clean up local folder if it was created
    if (id) {
      try {
        const folderPath = path.join(process.cwd(), 'sites', id)
        if (fs.existsSync(folderPath)) fs.rmSync(folderPath, { recursive: true, force: true })
      } catch {}
    }
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
