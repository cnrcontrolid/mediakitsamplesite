import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const org = process.env.GITHUB_ORG!

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return new NextResponse('Missing id', { status: 400 })

  // 1. Try local file first (works in local dev)
  const coverPath = path.join(process.cwd(), 'sites', id, 'cover.png')
  if (fs.existsSync(coverPath)) {
    const buffer = fs.readFileSync(coverPath)
    return new NextResponse(buffer, {
      headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000' },
    })
  }

  // 2. Fallback: fetch from the book's GitHub repo (works on Vercel)
  try {
    const repoName = `preorder-${id}`
    const { data } = await octokit.repos.getContent({ owner: org, repo: repoName, path: 'cover.png' })
    if (!Array.isArray(data) && data.type === 'file' && data.content) {
      const buffer = Buffer.from(data.content, 'base64')
      return new NextResponse(buffer, {
        headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=3600' },
      })
    }
  } catch {
    // repo or file not found
  }

  return new NextResponse('Not found', { status: 404 })
}
