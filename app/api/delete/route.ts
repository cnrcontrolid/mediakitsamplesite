import { NextRequest, NextResponse } from 'next/server'
import { removeFromLibrary, deleteSiteFolder } from '@/lib/library'
import { deleteGitHubRepo } from '@/lib/github'

export async function DELETE(req: NextRequest) {
  console.log('[delete] DELETE /api/delete — received request')

  try {
    const { id } = await req.json() as { id: string }
    if (!id) return NextResponse.json({ success: false, error: 'Missing id.' }, { status: 400 })

    // Delete local folder and library entry
    deleteSiteFolder(id)
    await removeFromLibrary(id)

    // Delete the GitHub repo (best effort — don't fail if it's already gone)
    const repoName = `preorder-${id}`
    try {
      await deleteGitHubRepo(repoName)
    } catch (ghErr) {
      console.warn('[delete] GitHub repo delete failed (may already be gone):', ghErr)
    }

    console.log('[delete] done —', id)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[delete] error:', message)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
