import fs from 'fs'
import path from 'path'
import { readMainRepoFile, writeMainRepoFile } from './github'

export interface LibraryEntry {
  id: string
  title: string
  subtitle: string
  author: string
  coverPath: string
  vercelUrl: string
  createdAt: string
}

const LIBRARY_GH_PATH = 'sites/library.json'

export async function readLibrary(): Promise<LibraryEntry[]> {
  const content = await readMainRepoFile(LIBRARY_GH_PATH)
  if (!content) return []
  try {
    return JSON.parse(content) as LibraryEntry[]
  } catch {
    return []
  }
}

export async function addToLibrary(entry: LibraryEntry): Promise<void> {
  const entries = await readLibrary()
  entries.push(entry)
  await writeMainRepoFile(
    LIBRARY_GH_PATH,
    JSON.stringify(entries, null, 2),
    `Add site: ${entry.id}`
  )
  console.log(`[library] added entry: ${entry.id}`)
}

export async function removeFromLibrary(id: string): Promise<void> {
  const entries = (await readLibrary()).filter(e => e.id !== id)
  await writeMainRepoFile(
    LIBRARY_GH_PATH,
    JSON.stringify(entries, null, 2),
    `Remove site: ${id}`
  )
  console.log(`[library] removed entry: ${id}`)
}

/** Best-effort local save — skipped silently on Vercel (read-only filesystem) */
export function saveSiteFiles(id: string, files: Record<string, string | Buffer>): void {
  try {
    const folderPath = path.join(process.cwd(), 'sites', id)
    fs.mkdirSync(folderPath, { recursive: true })
    for (const [filename, content] of Object.entries(files)) {
      fs.writeFileSync(path.join(folderPath, filename), content)
    }
    console.log(`[library] saved site files locally for: ${id}`)
  } catch (err) {
    console.warn(`[library] could not save files locally (OK on Vercel):`, err)
  }
}

/** Best-effort local delete — no-op if folder doesn't exist */
export function deleteSiteFolder(id: string): void {
  try {
    const folderPath = path.join(process.cwd(), 'sites', id)
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true })
      console.log(`[library] deleted local folder: ${folderPath}`)
    }
  } catch (err) {
    console.warn(`[library] could not delete local folder (OK on Vercel):`, err)
  }
}
