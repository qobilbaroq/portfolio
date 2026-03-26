'use client'

import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

const MENU = [
  { label: 'Profile', desc: 'Nama, role, bio, lokasi', href: '/admin/profile', icon: '01' },
  { label: 'Now', desc: 'Status, building, learning', href: '/admin/now', icon: '02' },
  { label: 'Skills', desc: 'Tambah & hapus skill', href: '/admin/skills', icon: '03' },
  { label: 'Experience', desc: 'Tambah & hapus experience', href: '/admin/experience', icon: '04' },
  { label: 'Projects', desc: 'Tambah & hapus project', href: '/admin/projects', icon: '05' },
  { label: 'Special Dates', desc: 'Kelola tanggal spesial di kalender', href: '/admin/dates', icon: '06' },
]

export default function AdminDashboard() {
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      padding: 'clamp(32px, 6vw, 80px)',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '48px',
        }}>
          <div>
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
              marginBottom: '20px',
            }}>N</div>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: '400',
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}>Dashboard</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Kelola konten portfolio kamu.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => router.push('/')}
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                background: 'transparent',
                border: '0.5px solid var(--border)',
                borderRadius: '4px',
                padding: '7px 14px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Lihat Portfolio
            </button>
            <button
              onClick={handleLogout}
              style={{
                fontSize: '12px',
                color: 'var(--bg)',
                background: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px',
                padding: '7px 14px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Menu grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '12px',
        }}>
          {MENU.map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              style={{
                background: 'white',
                border: '0.5px solid var(--border)',
                borderRadius: '6px',
                padding: '20px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{
                display: 'inline-block',
                background: 'var(--accent)',
                color: 'var(--bg)',
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: '2px',
                marginBottom: '12px',
                fontFamily: 'var(--font-sans)',
              }}>{item.icon}</span>
              <p style={{
                fontSize: '16px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}>{item.label}</p>
              <p style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-sans)',
              }}>{item.desc}</p>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}