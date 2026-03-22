'use client'

import { RefObject } from 'react'

export default function NowSection({ sectionRef }: { sectionRef: RefObject<HTMLDivElement | null> }) {
  return (
    <section
      className="section-now"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(32px, 6vw, 80px)',
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      <div style={{ width: '100%' }}>
        <span style={{
          display: 'inline-block',
          background: 'var(--accent)',
          color: 'var(--bg)',
          fontSize: '11px',
          padding: '3px 10px',
          borderRadius: '3px',
          marginBottom: '24px',
        }}>05</span>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(28px, 5vw, 40px)',
          fontWeight: '400',
          color: 'var(--text-primary)',
          marginBottom: '32px',
        }}>What I&apos;m up to</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { text: 'Building: Youtone (Flutter music app)', color: '#B5D4F4', textColor: '#042C53', rotate: '-1deg' },
            { text: 'Learning: LLM AI & Exam Prep', color: '#F4C0D1', textColor: '#4B1528', rotate: '1.5deg' },
            { text: 'Status: Open to work', color: '#F5E87A', textColor: '#412402', rotate: '-0.5deg' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'inline-block',
              background: item.color,
              color: item.textColor,
              fontSize: '14px',
              padding: '10px 16px',
              borderRadius: '2px',
              transform: `rotate(${item.rotate})`,
              width: 'fit-content',
            }}>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
