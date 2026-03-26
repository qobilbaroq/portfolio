'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email atau password salah.')
      setLoading(false)
      return
    }

    router.push('/admin')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '360px',
      }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--bg)',
            fontFamily: 'var(--font-serif)',
            fontSize: '14px',
            marginBottom: '24px',
          }}>N</div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '32px',
            fontWeight: '400',
            color: 'var(--text-primary)',
            marginBottom: '8px',
          }}>Admin</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Login untuk mengelola konten portfolio.
          </p>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '11px',
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                background: 'var(--bg-surface)',
                border: '0.5px solid var(--border)',
                borderRadius: '4px',
                color: 'var(--text-primary)',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '11px',
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                background: 'var(--bg-surface)',
                border: '0.5px solid var(--border)',
                borderRadius: '4px',
                color: 'var(--text-primary)',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
              }}
            />
          </div>

          {error && (
            <p style={{ fontSize: '13px', color: 'var(--accent)' }}>{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: '100%',
              padding: '11px',
              background: loading ? 'var(--border)' : 'var(--text-primary)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '4px',
              fontSize: '13px',
              fontFamily: 'var(--font-sans)',
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.04em',
              marginTop: '8px',
              transition: 'background 0.2s ease',
            }}
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </div>

      </div>
    </div>
  )
}