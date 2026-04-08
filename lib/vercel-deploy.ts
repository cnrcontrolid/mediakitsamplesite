const VERCEL_TOKEN = process.env.VERCEL_TOKEN!
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID || ''

function vercelHeaders() {
  return {
    Authorization: `Bearer ${VERCEL_TOKEN}`,
    'Content-Type': 'application/json',
  }
}

function teamQuery() {
  return VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ''
}

/**
 * Deploy a set of static HTML files directly to Vercel.
 * Returns the live deployment URL.
 */
export async function deployToVercel(
  projectName: string,
  files: Record<string, string | Buffer>
): Promise<string> {
  console.log(`[vercel] deploying project: ${projectName}`)

  const filePayload = Object.entries(files).map(([file, content]) => ({
    file,
    data: Buffer.isBuffer(content)
      ? (content as Buffer).toString('base64')
      : Buffer.from(content as string).toString('base64'),
    encoding: 'base64',
  }))

  const body = {
    name: projectName,
    files: filePayload,
    projectSettings: {
      framework: null,
      buildCommand: null,
      outputDirectory: null,
      installCommand: null,
    },
    target: 'production',
  }

  const res = await fetch(`https://api.vercel.com/v13/deployments${teamQuery()}`, {
    method: 'POST',
    headers: vercelHeaders(),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('[vercel] deploy failed:', err)
    throw new Error(`Vercel deploy failed: ${res.status} — ${err}`)
  }

  const data = await res.json() as { url: string; id: string }
  console.log(`[vercel] deployment created — id: ${data.id}, url: ${data.url}`)

  // Poll until ready (up to 90s)
  const liveUrl = await waitForDeployment(data.id, data.url)
  console.log(`[vercel] live at: ${liveUrl}`)
  return liveUrl
}

async function waitForDeployment(deploymentId: string, rawUrl: string): Promise<string> {
  const maxAttempts = 30 // 30 × 3s = 90s
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(3000)

    const res = await fetch(
      `https://api.vercel.com/v13/deployments/${deploymentId}${teamQuery()}`,
      { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
    )

    if (!res.ok) continue

    const data = await res.json() as { readyState: string; url: string }
    console.log(`[vercel] poll ${i + 1}: state=${data.readyState}`)

    if (data.readyState === 'READY') {
      return `https://${data.url}`
    }
    if (data.readyState === 'ERROR' || data.readyState === 'CANCELED') {
      throw new Error(`Vercel deployment ${data.readyState}`)
    }
  }
  // Return URL even if polling times out — it may still become ready
  return `https://${rawUrl}`
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
