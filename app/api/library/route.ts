import { NextResponse } from 'next/server'
import { readLibrary } from '@/lib/library'

export async function GET() {
  console.log('[library] GET /api/library')
  const entries = await readLibrary()
  return NextResponse.json(entries)
}
