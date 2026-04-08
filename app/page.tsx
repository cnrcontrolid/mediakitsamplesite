'use client'

import { useState, useEffect, useRef } from 'react'

interface LibraryEntry {
  id: string
  title: string
  subtitle: string
  author: string
  coverPath: string
  vercelUrl: string
  createdAt: string
}

export default function LibraryPage() {
  const [entries, setEntries] = useState<LibraryEntry[]>([])
  const [uploadOpen, setUploadOpen] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)
  const [generating, setGenerating] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [statusMsg, setStatusMsg] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    fetchLibrary()
  }, [])

  async function fetchLibrary() {
    const res = await fetch('/api/library')
    if (res.ok) {
      const data = await res.json()
      setEntries(data)
    }
  }

  function startCountdown() {
    setCountdown(120)
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  function stopCountdown() {
    if (timerRef.current) clearInterval(timerRef.current)
    setCountdown(0)
  }

  async function handleGenerate() {
    if (!files || files.length === 0) return
    setError(null)
    setGenerating(true)
    setUploadOpen(false)
    startCountdown()

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setStatusMsg(`Processing "${file.name}" (${i + 1} of ${files.length})…`)
      const formData = new FormData()
      formData.append('cover', file)

      const res = await fetch('/api/generate', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.')
        stopCountdown()
        setGenerating(false)
        setStatusMsg('')
        return
      }

      setEntries(prev => [...prev, data.entry])
    }

    stopCountdown()
    setGenerating(false)
    setStatusMsg('')
    setFiles(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this site? This cannot be undone.')) return
    const res = await fetch('/api/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      setEntries(prev => prev.filter(e => e.id !== id))
    } else {
      alert('Failed to delete. Please try again.')
    }
  }

  return (
    <>
      {/* ── HEADER ── */}
      <header style={{ background: '#0d0d0d', padding: '32px 40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontSize: 32, letterSpacing: 2, textTransform: 'uppercase' }}>
          Preorder Sample Site Generator
        </h1>
        <p style={{ color: '#888', fontSize: 15, marginTop: 8, fontFamily: 'Raleway, sans-serif' }}>
          Upload your 3D book cover to generate a sample preorder sales funnel for your book.
        </p>
        <p style={{ color: '#666', fontSize: 13, marginTop: 6, fontFamily: 'Raleway, sans-serif', fontStyle: 'italic' }}>
          This is a non-functional site, only for reference. If you&apos;d like Raymond&apos;s team to build a preorder page like this for you, use the form below to send in your request.
        </p>
      </header>

      {/* ── COUNTDOWN BANNER ── */}
      {generating && (
        <div style={{
          background: countdown === 0 ? '#333' : '#1a1a1a',
          color: '#fff',
          textAlign: 'center',
          padding: '14px 24px',
          fontFamily: 'Raleway, sans-serif',
          fontSize: 15,
          borderBottom: '2px solid #444',
        }}>
          {statusMsg && <span style={{ marginRight: 16 }}>{statusMsg}</span>}
          {countdown > 0
            ? <span>Estimated time remaining: <strong style={{ fontFamily: 'Oswald, sans-serif', fontSize: 20 }}>{countdown}s</strong></span>
            : <span style={{ color: '#aaa' }}>Taking a bit longer than expected — still working…</span>
          }
        </div>
      )}

      {/* ── ERROR BANNER ── */}
      {error && (
        <div style={{
          background: '#fff0f0',
          color: '#c0021b',
          border: '1px solid #f5a0a0',
          padding: '12px 24px',
          fontFamily: 'Raleway, sans-serif',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1000,
          margin: '16px auto 0',
          borderRadius: 8,
        }}>
          <span>⚠ {error}</span>
          <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0021b', fontSize: 18, lineHeight: 1 }}>×</button>
        </div>
      )}

      {/* ── TOOLBAR ── */}
      <div style={{ maxWidth: 1000, margin: '32px auto 18px', padding: '0 24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setUploadOpen(true)}
          disabled={generating}
          style={{
            background: generating ? '#aaa' : '#1a1a1a',
            color: '#fff',
            fontFamily: 'Oswald, sans-serif',
            fontSize: 15,
            letterSpacing: 1,
            textTransform: 'uppercase',
            padding: '12px 28px',
            border: 'none',
            borderRadius: 8,
            cursor: generating ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7-7 7 7"/></svg>
          Create Sample Pre-Order Site
        </button>
      </div>

      {/* ── TABLE ── */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 80px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
          <thead>
            <tr style={{ background: '#1a1a1a' }}>
              {['#', 'Cover', 'Author', 'Title & Subtitle', 'Landing Page'].map(h => (
                <th key={h} style={{ fontFamily: 'Oswald, sans-serif', fontSize: 14, letterSpacing: 1.5, textTransform: 'uppercase', color: '#fff', padding: '16px 20px', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'Raleway, sans-serif', fontSize: 14, color: '#aaa' }}>
                  No sites yet. Click &ldquo;Create Sample Pre-Order Site&rdquo; to get started.
                </td>
              </tr>
            )}
            {entries.map((e, i) => (
              <tr key={e.id} style={{ borderBottom: '1px solid #ebebeb' }}>
                <td style={{ padding: '18px 20px', fontFamily: 'Oswald, sans-serif', fontSize: 22, fontWeight: 700, color: '#ccc', width: 52, textAlign: 'center' }}>{i + 1}</td>
                <td style={{ padding: '18px 20px', width: 90 }}>
                  <img
                    src={`${e.vercelUrl}/cover.png`}
                    alt={e.title}
                    onError={(ev) => { (ev.target as HTMLImageElement).src = `/api/cover?id=${e.id}` }}
                    style={{ width: 70, height: 'auto', display: 'block', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.20))' }}
                  />
                </td>
                <td style={{ padding: '18px 20px', fontFamily: 'Oswald, sans-serif', fontSize: 17, fontWeight: 600, whiteSpace: 'nowrap' }}>{e.author}</td>
                <td style={{ padding: '18px 20px' }}>
                  <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{e.title}</div>
                  <div style={{ fontSize: 13, color: '#777', lineHeight: 1.5 }}>{e.subtitle}</div>
                </td>
                <td style={{ padding: '18px 20px', whiteSpace: 'nowrap' }}>
                  <a href={e.vercelUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#1a1a1a', color: '#fff', fontFamily: 'Oswald, sans-serif', fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', marginRight: 8 }}>
                    View Site
                  </a>
                  <button
                    onClick={() => handleDelete(e.id)}
                    title="Delete site"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, background: 'none', border: '1.5px solid #e0e0e0', borderRadius: 6, cursor: 'pointer', color: '#bbb', fontSize: 15, verticalAlign: 'middle', transition: 'all .15s' }}
                    onMouseOver={ev => { (ev.target as HTMLElement).style.background = '#fff0f0'; (ev.target as HTMLElement).style.color = '#d0021b' }}
                    onMouseOut={ev => { (ev.target as HTMLElement).style.background = 'none'; (ev.target as HTMLElement).style.color = '#bbb' }}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── UPLOAD MODAL ── */}
      {uploadOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1200, background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 14, width: '92vw', maxWidth: 520, boxShadow: '0 20px 60px rgba(0,0,0,.3)', overflow: 'hidden' }}>

            {/* Modal header */}
            <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>Upload 3D Book Cover</h3>
              <button onClick={() => { setUploadOpen(false); setFiles(null) }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#aaa', lineHeight: 1, padding: '2px 6px' }}>×</button>
            </div>

            {/* Drop zone */}
            <div
              style={{ margin: '20px 24px', border: '2.5px dashed #d0d0d0', borderRadius: 12, padding: '40px 24px', textAlign: 'center', cursor: 'pointer', transition: 'border-color .2s' }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLElement).style.borderColor = '#1a1a1a' }}
              onDragLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#d0d0d0' }}
              onDrop={e => { e.preventDefault(); setFiles(e.dataTransfer.files); (e.currentTarget as HTMLElement).style.borderColor = '#d0d0d0' }}
            >
              <div style={{ fontSize: 42, marginBottom: 12 }}>📁</div>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 15, color: '#555', marginBottom: 6 }}>
                {files && files.length > 0 ? `${files.length} file${files.length > 1 ? 's' : ''} selected` : 'Click or drag & drop your book cover(s)'}
              </p>
              <p style={{ fontSize: 12, color: '#aaa' }}>PNG, JPG — one or multiple files</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => setFiles(e.target.files)} />

            {/* Footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => { setUploadOpen(false); setFiles(null) }} style={{ background: '#f3f3f3', color: '#666', fontFamily: 'Raleway, sans-serif', fontSize: 13, fontWeight: 700, padding: '10px 18px', border: 'none', borderRadius: 7, cursor: 'pointer' }}>Cancel</button>
              <button
                onClick={handleGenerate}
                disabled={!files || files.length === 0}
                style={{ background: (!files || files.length === 0) ? '#ccc' : '#1a1a1a', color: '#fff', fontFamily: 'Oswald, sans-serif', fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 24px', border: 'none', borderRadius: 7, cursor: (!files || files.length === 0) ? 'not-allowed' : 'pointer' }}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
