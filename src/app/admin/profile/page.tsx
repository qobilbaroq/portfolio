'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

interface Profile {
  id: string
  name: string
  role: string
  bio: string
  location: string
  email: string
  github: string
  linkedin: string
}

export default function AdminProfile() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profile')
        .select('*')
        .single()

      if (data) setProfile(data)
      setLoading(false)
    }

    fetchProfile()
  }, [])

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)

    const { error } = await supabase
      .from('profile')
      .update({
        name: profile.name,
        role: profile.role,
        bio: profile.bio,
        location: profile.location,
        email: profile.email,
        github: profile.github,
        linkedin: profile.linkedin,
      })
      .eq('id', profile.id)

    setSaving(false)

    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  const updateField = (field: keyof Profile, value: string) => {
    if (!profile) return
    setProfile({ ...profile, [field]: value })
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
            }}>Profile</h1>
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
        {profile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { field: 'name', label: 'Nama', placeholder: 'Moch Nabil Al Mubaroq' },
              { field: 'role', label: 'Role', placeholder: 'Frontend Developer' },
              { field: 'location', label: 'Lokasi', placeholder: 'Bandung, Indonesia' },
              { field: 'email', label: 'Email', placeholder: 'your@email.com' },
              { field: 'github', label: 'GitHub Username', placeholder: 'qobilbaroq' },
              { field: 'linkedin', label: 'LinkedIn', placeholder: 'Nama lengkap atau URL' },
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
                  value={profile[field as keyof Profile] || ''}
                  onChange={e => updateField(field as keyof Profile, e.target.value)}
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

            {/* Bio — textarea */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '8px',
                fontFamily: 'var(--font-sans)',
              }}>Bio</label>
              <textarea
                value={profile.bio || ''}
                onChange={e => updateField('bio', e.target.value)}
                placeholder="Cerita singkat tentang kamu..."
                rows={4}
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
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  lineHeight: 1.6,
                }}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}