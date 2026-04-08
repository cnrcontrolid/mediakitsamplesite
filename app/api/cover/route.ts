import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return new NextResponse('Missing id', { status: 400 })

  const coverPath = path.join(process.cwd(), 'sites', id, 'cover.png')
  if (!fs.existsSync(coverPath)) return new NextResponse('Not found', { status: 404 })

  const buffer = fs.readFileSync(coverPath)
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000',
    },
  })
}
