'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

export default function NotFound() {
  const router = useRouter()
  const calRef = useRef<HTMLDivElement>(null)
  const msgRef = useRef<HTMLDivElement>(null)
  const num404Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animasi masuk
    gsap.fromTo(calRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    gsap.fromTo(num404Ref.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
    )
    gsap.fromTo(msgRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.6, ease: 'power3.out' }
    )
  }, [])

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const ROW1 = [
    { num: null, type: 'empty' },
    { num: null, type: 'empty' },
    { num: null, type: 'empty' },
    { num: '4', type: 'hand', rotate: '-5deg' },
    { num: '5', type: 'filled', rotate: '-1deg' },
    { num: null, type: 'empty' },
    { num: '7', type: 'filled', rotate: '1deg' },
  ]

  const ROW2 = [
    { num: '8', type: 'filled', rotate: '-1deg' },
    { num: '9', type: 'filled', rotate: '0.5deg' },
    { num: null, type: 'empty' },
    { num: '11', type: 'today', rotate: '-1deg' },
    { num: null, type: 'empty' },
    { num: '0', type: 'hand', rotate: '4deg' },
    { num: '4', type: 'hand', rotate: '-3deg' },
  ]

  const ROW3 = [
    { num: '15', type: 'filled', rotate: '1deg' },
    { num: null, type: 'empty' },
    { num: '17', type: 'filled', rotate: '-0.5deg' },
    { num: null, type: 'empty' },
    { num: '19', type: 'filled', rotate: '-1deg' },
    { num: null, type: 'empty' },
    { num: '21', type: 'filled', rotate: '1deg' },
  ]

  const ROW_BELOW = [22, null, 24, null, 26, null, 28]

  const renderCell = (cell: { num: string | null, type: string, rotate?: string }, i: number) => {
    if (cell.type === 'empty') {
      return <div key={i} style={{ aspectRatio: '1' }} />
    }

    if (cell.type === 'hand') {
      return (
        <div key={i} style={{
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '18px',
          color: '#C9523A',
          transform: `rotate(${cell.rotate})`,
        }}>
          {cell.num}
        </div>
      )
    }

    if (cell.type === 'today') {
      return (
        <div key={i} style={{
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          borderRadius: '4px',
          background: '#1A1916',
          color: '#FAF8F4',
          fontWeight: '500',
          transform: `rotate(${cell.rotate})`,
        }}>
          {cell.num}
        </div>
      )
    }

    return (
      <div key={i} style={{
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        borderRadius: '4px',
        background: '#F0ECE5',
        color: '#9A9289',
        transform: `rotate(${cell.rotate})`,
      }}>
        {cell.num}
      </div>
    )
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(32px, 6vw, 80px)',
    }}>
      <div style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>

        {/* 404 di belakang */}
        <div ref={num404Ref} style={{
          position: 'absolute',
          bottom: '60px',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 1,
          opacity: 0,
        }}>
          <span style={{
            display: 'inline-block',
            fontSize: '96px',
            fontFamily: 'var(--font-serif)',
            color: '#C9523A',
            opacity: 0.2,
            transform: 'rotate(-6deg) translateY(8px)',
            lineHeight: 1,
          }}>4</span>
          <span style={{
            display: 'inline-block',
            fontSize: '96px',
            fontFamily: 'var(--font-serif)',
            color: '#C9523A',
            opacity: 0.2,
            transform: 'rotate(3deg) translateY(-4px)',
            lineHeight: 1,
          }}>0</span>
          <span style={{
            display: 'inline-block',
            fontSize: '96px',
            fontFamily: 'var(--font-serif)',
            color: '#C9523A',
            opacity: 0.2,
            transform: 'rotate(-2deg) translateY(10px)',
            lineHeight: 1,
          }}>4</span>
        </div>

        {/* Kalender */}
        <div ref={calRef} style={{ position: 'relative', zIndex: 3, opacity: 0 }}>

          {/* Calendar card */}
          <div style={{
            background: 'var(--bg)',
            border: '0.5px solid #C8C0B8',
            borderRadius: '4px 4px 0 0',
          }}>
            {/* Header */}
            <div style={{
              padding: '12px 16px 10px',
              borderBottom: '0.5px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
              <span style={{
                fontSize: '24px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
              }}>???</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>2026</span>
            </div>

            {/* Grid */}
            <div style={{ padding: '6px 8px 4px' }}>
              {/* Day labels */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '2px',
                marginBottom: '3px',
              }}>
                {DAYS.map(d => (
                  <div key={d} style={{
                    fontSize: '9px',
                    color: '#B0A89F',
                    textAlign: 'center',
                  }}>{d}</div>
                ))}
              </div>

              {/* Date rows */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
                {ROW1.map((cell, i) => renderCell(cell, i))}
                {ROW2.map((cell, i) => renderCell(cell, i + 7))}
                {ROW3.map((cell, i) => renderCell(cell, i + 14))}
              </div>
            </div>
          </div>

          {/* Tear effect */}
          <svg
            width="100%"
            height="48"
            viewBox="0 0 380 48"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', position: 'relative', zIndex: 3, marginTop: '-1px' }}
          >
            <polygon
              points="0,0 380,0 380,6 362,24 346,4 330,32 312,8 295,36 275,6 258,30 240,4 224,34 206,10 190,40 172,8 155,38 136,12 118,36 100,6 83,30 65,8 48,34 30,10 14,28 0,12"
              fill="#FAF8F4"
              stroke="#C8C0B8"
              strokeWidth="0.5"
            />
            <polygon
              points="0,18 14,32 30,16 48,40 65,14 83,36 100,12 118,42 136,18 155,44 172,14 190,46 206,16 224,40 240,10 258,36 275,14 295,44 312,16 330,38 346,10 362,30 380,14 380,48 0,48"
              fill="#FAF8F4"
            />
          </svg>

          {/* Below tear */}
          <div style={{
            background: 'var(--bg)',
            border: '0.5px solid #C8C0B8',
            borderTop: 'none',
            padding: '6px 8px 8px',
            opacity: 0.25,
            transform: 'rotate(0.3deg)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
              {ROW_BELOW.map((num, i) => (
                num ? (
                  <div key={i} style={{
                    aspectRatio: '1',
                    background: '#F0ECE5',
                    borderRadius: '3px',
                    fontSize: '9px',
                    color: '#9A9289',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: i % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)',
                  }}>{num}</div>
                ) : (
                  <div key={i} style={{ aspectRatio: '1' }} />
                )
              ))}
            </div>
          </div>
        </div>

        {/* Pesan */}
        <div ref={msgRef} style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          position: 'relative',
          zIndex: 4,
          opacity: 0,
        }}>
          <p style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            fontFamily: 'var(--font-serif)',
            lineHeight: 1.7,
            marginBottom: '16px',
          }}>
            Halaman ini tidak ada<br />di kalender manapun.
          </p>
          <button
            onClick={() => router.push('/')}
            style={{
              background: 'var(--text-primary)',
              color: 'var(--bg)',
              fontSize: '12px',
              padding: '8px 20px',
              borderRadius: '3px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            ← balik ke tanggal 1
          </button>
        </div>

      </div>
    </main>
  )
}