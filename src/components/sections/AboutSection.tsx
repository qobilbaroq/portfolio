'use client'

import { RefObject } from 'react'

export default function AboutSection({ sectionRef }: { sectionRef: RefObject<HTMLDivElement> }) {
  return (
    <section
      className="section-about"
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
        }}>01</span>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{
            background: 'white',
            border: '0.5px solid var(--border)',
            padding: '10px 10px 32px',
            width: '120px',
            transform: 'rotate(-2deg)',
            flexShrink: 0,
          }}>
            <img
              src="/image-portofolio.jpeg"
              alt="nabil, 2024"
              style={{ width: '100px', height: '90px', borderRadius: '2px', objectFit: 'cover', display: 'block' }}
            />
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '8px' }}>nabil, 2006</p>
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: '400',
              color: 'var(--text-primary)',
              marginBottom: '8px',
              lineHeight: 1.2,
            }}>
              Moch Nabil<br />Al Mubaroq
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '16px' }}>Frontend Developer</p>
            <div style={{
              display: 'inline-block',
              background: '#F5E87A',
              color: '#412402',
              fontSize: '12px',
              padding: '4px 10px',
              borderRadius: '2px',
              transform: 'rotate(1deg)',
              marginBottom: '16px',
            }}>Bandung, Indonesia</div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Fresh grad yang suka mempelajari hal-hal baru.
              Apapun yang bikin aku senang.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
