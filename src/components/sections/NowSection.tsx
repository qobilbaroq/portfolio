'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

interface NowSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

const MEMOS = [
  {
    id: 'building',
    title: 'building',
    content: 'Youtone\nFlutter music app',
    color: '#B5D4F4',
    textColor: '#042C53',
    rotate: '-3deg',
    width: 160,
  },
  {
    id: 'learning',
    title: 'learning',
    content: 'LLM AI\n& Exam Prep',
    color: '#F4C0D1',
    textColor: '#4B1528',
    rotate: '2deg',
    width: 150,
  },
  {
    id: 'status',
    title: 'status',
    content: 'Open\nto work',
    color: '#F5E87A',
    textColor: '#412402',
    rotate: '-1.5deg',
    width: 140,
  },
  {
    id: 'stack',
    title: 'stack',
    content: 'Next.js\nTailwind\nGSAP',
    color: '#C8F5C8',
    textColor: '#1A4D1A',
    rotate: '3deg',
    width: 145,
  },
  {
    id: 'interest',
    title: 'interest',
    content: 'Mechanical\nKeyboard\n& Film Camera',
    color: '#E8D5F5',
    textColor: '#3D1A5C',
    rotate: '-2deg',
    width: 155,
  },
]

export default function NowSection({ sectionRef }: NowSectionProps) {
  const areaRef = useRef<HTMLDivElement>(null)
  const memoRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!areaRef.current) return

    const areaWidth = areaRef.current.offsetWidth
    const areaHeight = areaRef.current.offsetHeight

    // Set posisi random tiap memo
    memoRefs.current.forEach((el, i) => {
      if (!el) return

      const maxX = areaWidth - el.offsetWidth - 20
      const maxY = areaHeight - el.offsetHeight - 20
      const randomX = Math.random() * Math.max(maxX, 0)
      const randomY = Math.random() * Math.max(maxY, 0)

      gsap.set(el, { x: randomX, y: randomY })

      // Animasi masuk
      gsap.from(el, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        delay: i * 0.08,
        ease: 'back.out(1.5)',
      })

      // Draggable
      Draggable.create(el, {
        type: 'x,y',
        bounds: areaRef.current,
        onPress() {
          gsap.to(el, { scale: 1.05, rotation: 0, duration: 0.15, zIndex: 10 })
          el.style.zIndex = '10'
        },
        onRelease() {
          gsap.to(el, {
            scale: 1,
            rotation: parseFloat(MEMOS[i].rotate),
            duration: 0.4,
            ease: 'elastic.out(1, 0.5)',
          })
          el.style.zIndex = '1'
        },
      })
    })

    return () => {
      memoRefs.current.forEach(el => {
        if (el) Draggable.get(el)?.kill()
      })
    }
  }, [])

  return (
    <section
      className="section-now"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: 'clamp(32px, 6vw, 80px)',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <span style={{
        display: 'inline-block',
        background: 'var(--accent)',
        color: 'var(--bg)',
        fontSize: '11px',
        padding: '3px 10px',
        borderRadius: '3px',
        marginBottom: '24px',
        width: 'fit-content',
      }}>05</span>

      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(28px, 5vw, 40px)',
        fontWeight: '400',
        color: 'var(--text-primary)',
        marginBottom: '32px',
      }}>What I&apos;m up to</h2>

      {/* Memo area */}
      <div
        ref={areaRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '460px',
          background: 'var(--bg)',
          overflow: 'hidden',
        }}
      >
        {MEMOS.map((memo, i) => (
          <div
            key={memo.id}
            ref={el => { memoRefs.current[i] = el }}
            style={{
              position: 'absolute',
              width: `${memo.width}px`,
              background: memo.color,
              borderRadius: '3px',
              padding: '16px',
              transform: `rotate(${memo.rotate})`,
              cursor: 'grab',
              userSelect: 'none',
              boxShadow: '2px 3px 0 rgba(0,0,0,0.08)',
              zIndex: 1,
            }}
          >
            {/* Label */}
            <p style={{
              fontSize: '9px',
              fontWeight: '500',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: memo.textColor,
              opacity: 0.6,
              marginBottom: '8px',
              fontFamily: 'var(--font-sans)',
            }}>
              {memo.title}
            </p>

            {/* Konten */}
            <p style={{
              fontSize: '16px',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: memo.textColor,
              lineHeight: 1.5,
              whiteSpace: 'pre-line',
            }}>
              {memo.content}
            </p>

            {/* Tanggal kecil */}
            <p style={{
              fontSize: '9px',
              color: memo.textColor,
              opacity: 0.4,
              marginTop: '12px',
              fontFamily: 'var(--font-sans)',
            }}>
              {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: '2-digit' })}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}