'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

const SHAKING_DATES = [2, 6, 9, 13, 17, 22, 26]

const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

export default function NotFound() {
  const router = useRouter()
  const [lockedDates, setLockedDates] = useState<number[]>([])
  const [showEaster, setShowEaster] = useState(false)
  const calRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const shakingRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const remaining = SHAKING_DATES.length - lockedDates.length

  useEffect(() => {
    // Animasi masuk kalender
    gsap.fromTo(calRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )

    // Animasi goyang tiap sel
    SHAKING_DATES.forEach((date, i) => {
      const el = shakingRefs.current[date]
      if (!el) return
      gsap.to(el, {
        rotation: () => gsap.utils.random(-4, 4),
        x: () => gsap.utils.random(-2, 2),
        y: () => gsap.utils.random(-2, 2),
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.1,
      })
    })
  }, [])

  useEffect(() => {
    if (remaining === 0) {
      setShowEaster(true)
      setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.display = 'flex'
          gsap.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: 'power3.out' }
          )
        }
        setTimeout(() => router.push('/'), 5000)
      }, 50)
    }
  }, [remaining])

  const handleLock = (date: number) => {
    if (lockedDates.includes(date)) return
    const el = shakingRefs.current[date]
    if (el) {
      gsap.killTweensOf(el)
      gsap.to(el, {
        rotation: 0,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'back.out(2)',
      })
    }
    setLockedDates(prev => [...prev, date])
  }

  const dates = Array.from({ length: 31 }, (_, i) => i + 1)
  const empties = Array.from({ length: 4 }, (_, i) => i)

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(32px, 6vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Kalender */}
      <div ref={calRef} style={{ width: '100%', maxWidth: '480px', opacity: 0 }}>
        <div style={{
          background: 'var(--bg)',
          border: '0.5px solid var(--border)',
          borderRadius: '4px',
        }}>

          {/* Header */}
          <div style={{
            padding: '14px 16px',
            borderBottom: '0.5px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
            <span style={{
              fontSize: '40px',
              color: '#C9523A',
              fontFamily: 'var(--font-serif)',
              fontWeight: '400',
              fontStyle: 'italic',
              letterSpacing: '-2px',
              display: 'inline-block',
              transform: 'skewX(-4deg)',
              textDecoration: 'line-through',
              textDecorationColor: '#C9523A',
              textDecorationThickness: '2px',
            }}>404</span>
            <span style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
            }}>ERR_????</span>
          </div>

          {/* Grid */}
          <div style={{ padding: '8px' }}>

            {/* Day labels */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '3px',
              marginBottom: '4px',
            }}>
              {DAYS.map(d => (
                <div key={d} style={{
                  fontSize: '10px',
                  color: '#B0A89F',
                  textAlign: 'center',
                  padding: '2px 0',
                }}>{d}</div>
              ))}
            </div>

            {/* Dates */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
            }}>
              {dates.map(date => {
                const isShaking = SHAKING_DATES.includes(date)
                const isLocked = lockedDates.includes(date)

                if (isLocked) {
                  return (
                    <div
                      key={date}
                      ref={el => { shakingRefs.current[date] = el }}
                      style={{
                        aspectRatio: '1',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        background: '#1A1916',
                        color: '#FAF8F4',
                        position: 'relative',
                        cursor: 'default',
                      }}
                    >
                      {date}
                      <span style={{
                        position: 'absolute',
                        top: '2px',
                        right: '3px',
                        fontSize: '7px',
                        color: '#C9523A',
                      }}>✓</span>
                    </div>
                  )
                }

                if (isShaking) {
                  return (
                    <div
                      key={date}
                      ref={el => { shakingRefs.current[date] = el }}
                      onClick={() => handleLock(date)}
                      style={{
                        aspectRatio: '1',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        background: '#FAE8E5',
                        color: '#C9523A',
                        border: '1px solid #C9523A',
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                    >
                      {date}
                    </div>
                  )
                }

                return (
                  <div
                    key={date}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      background: 'var(--bg-surface)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {date}
                  </div>
                )
              })}

              {/* Empty cells */}
              {empties.map(i => (
                <div key={`empty-${i}`} style={{ aspectRatio: '1' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Easter egg overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(250,248,244,0.93)',
          display: showEaster ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          opacity: 0,
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '300px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#FAE8E5',
            border: '1.5px solid #C9523A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '20px',
            color: '#C9523A',
            fontFamily: 'var(--font-serif)',
          }}>✓</div>

          <p style={{
            fontSize: '18px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-serif)',
            fontWeight: '400',
            marginBottom: '10px',
            lineHeight: 1.3,
          }}>
            Tanggal corrupt<br />berhasil dipulihkan.
          </p>

          <p style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            fontFamily: 'var(--font-serif)',
            lineHeight: 1.7,
            marginBottom: '20px',
          }}>
            Kamu telah menstabilkan bulan yang tidak<br />
            seharusnya ada. Kalender kembali normal.
          </p>

          <p style={{
            fontSize: '10px',
            color: '#B0A89F',
            letterSpacing: '0.06em',
          }}>
            mengalihkan ke halaman utama...
          </p>
        </div>
      </div>

    </main>
  )
}