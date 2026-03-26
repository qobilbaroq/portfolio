'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

interface NowData {
  id: string
  building: string
  learning: string
  status: string
  stack: string
  interest: string
}

export default function AdminNow() {
  const router = useRouter()
  const [data, setData] = useState<NowData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchData = async () => {
      const { data: result } = await supabase
        .from('now')
        .select('*')
        .single()

      if (result) setData(result)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleSave = async () => {
    if (!data) return
    setSaving(true)

    const { error } = await supabase
      .from('now')
      .update({
        building: data.building,
        learning: data.learning,
        status: data.status,
        stack: data.stack,
        interest: data.interest,
      })
      .eq('id', data.id)

    setSaving(false)
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Memuat...</p>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      padding: 'clamp(32px, 6vw, 80px)',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}>
          <div>
            <button
              onClick={() => router.push('/admin')}
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                marginBottom: '12px',
                display: 'block',
                fontFamily: 'var(--font-sans)',
              }}
            >
              ← Dashboard
            </button>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: '400',
              color: 'var(--text-primary)',
            }}>Now</h1>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              fontSize: '13px',
              color: 'var(--bg)',
              background: saved ? '#4CAF50' : saving ? 'var(--border)' : 'var(--text-primary)',
              border: 'none',
              borderRadius: '4px',
              padding: '9px 20px',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-sans)',
              transition: 'background 0.2s ease',
            }}
          >
            {saved ? '✓ Tersimpan' : saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>

        {/* Form */}
        {data ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { field: 'building', label: 'Building', placeholder: 'Youtone (Flutter music app)' },
              { field: 'learning', label: 'Learning', placeholder: 'LLM AI & Exam Prep' },
              { field: 'status', label: 'Status', placeholder: 'Open to work' },
              { field: 'stack', label: 'Stack', placeholder: 'Next.js, Tailwind, GSAP' },
              { field: 'interest', label: 'Interest', placeholder: 'Mechanical Keyboard & Film Camera' },
            ].map(({ field, label, placeholder }) => (
              <div key={field}>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-sans)',
                }}>{label}</label>
                <input
                  type="text"
                  value={data[field as keyof NowData] || ''}
                  onChange={e => setData({ ...data, [field]: e.target.value })}
                  placeholder={placeholder}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    fontSize: '14px',
                    background: 'white',
                    border: '0.5px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}

            {/* Preview memo */}
            <div style={{
              marginTop: '8px',
              padding: '20px',
              background: 'var(--bg-surface)',
              borderRadius: '6px',
              border: '0.5px solid var(--border)',
            }}>
              <p style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '16px',
                fontFamily: 'var(--font-sans)',
              }}>Preview Memo</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {[
                  { label: 'Building', value: data.building, color: '#B5D4F4', textColor: '#042C53', rotate: '-1deg' },
                  { label: 'Learning', value: data.learning, color: '#F4C0D1', textColor: '#4B1528', rotate: '1.5deg' },
                  { label: 'Status', value: data.status, color: '#F5E87A', textColor: '#412402', rotate: '-0.5deg' },
                  { label: 'Stack', value: data.stack, color: '#C8F5C8', textColor: '#1A4D1A', rotate: '1deg' },
                  { label: 'Interest', value: data.interest, color: '#E8D5F5', textColor: '#3D1A5E', rotate: '-1deg' },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: 'inline-block',
                    background: item.color,
                    color: item.textColor,
                    fontSize: '12px',
                    padding: '8px 12px',
                    borderRadius: '2px',
                    transform: `rotate(${item.rotate})`,
                    fontFamily: 'var(--font-sans)',
                    whiteSpace: 'pre-line',
                  }}>
                    <span style={{
                      display: 'block',
                      fontSize: '10px',
                      opacity: 0.6,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}>{item.label}</span>
                    {item.value || '...'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            padding: '40px',
            background: 'white',
            border: '0.5px solid var(--border)',
            borderRadius: '6px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Data Now belum ada di database.
            </p>
            <button
              onClick={async () => {
                const { data: newData } = await supabase
                  .from('now')
                  .insert({
                    building: 'Youtone (Flutter music app)',
                    learning: 'LLM AI & Exam Prep',
                    status: 'Open to work',
                    stack: 'Next.js, Tailwind, GSAP',
                    interest: 'Mechanical Keyboard & Film Camera',
                  })
                  .select()
                  .single()
                if (newData) setData(newData)
              }}
              style={{
                fontSize: '13px',
                color: 'var(--bg)',
                background: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px',
                padding: '9px 20px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Buat Data Now
            </button>
          </div>
        )}

      </div>
    </div>
  )
}