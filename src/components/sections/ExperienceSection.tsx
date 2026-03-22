'use client'

import { RefObject, useState } from 'react'

function ExperienceCard({
  company, role, period, type, description, rotate
}: {
  company: string
  role: string
  period: string
  type: string
  description: string
  rotate: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: 'white',
        border: '0.5px solid var(--border)',
        borderRadius: '4px',
        padding: '16px',
        transform: open ? 'rotate(0deg)' : `rotate(${rotate})`,
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: open ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '4px' }}>
            {company}
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{role} · {period}</p>
        </div>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '2px solid var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px',
          color: 'var(--accent)',
          fontWeight: '500',
          transform: 'rotate(-15deg)',
          flexShrink: 0,
        }}>
          {type}
        </div>
      </div>

      {open && (
        <p style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          marginTop: '12px',
          borderTop: '0.5px solid var(--border)',
          paddingTop: '12px',
        }}>
          {description}
        </p>
      )}
    </div>
  )
}

export default function ExperienceSection({ sectionRef }: { sectionRef: RefObject<HTMLDivElement | null> }) {
  return (
    <section
      className="section-experience"
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
        }}>21</span>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(28px, 5vw, 40px)',
          fontWeight: '400',
          color: 'var(--text-primary)',
          marginBottom: '32px',
        }}>Experience</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            {
              company: 'PT. Diantara Inter Media',
              role: 'Frontend Developer Intern',
              period: '5 bulan · 2024',
              type: 'KERJA',
              description: 'Mengerjakan web projects menggunakan Vue.js dan Laravel. Berkolaborasi dengan tim dalam pengembangan fitur frontend.',
              rotate: '-1deg',
            },
            {
              company: 'UNIKOM Web Dev Competition',
              role: 'Juara 2',
              period: '2024',
              type: 'JUARA',
              description: 'Meraih juara 2 dalam kompetisi web developmen di Universitas Komputer Indonesia.',
              rotate: '0.5deg',
            },
            {
              company: 'SMK Prakarya Internasional',
              role: 'Software & Game Development (PPLG)',
              period: '2021 — 2024',
              type: 'EDU',
              description: 'Jurusan Pengembangan Perangkat Lunak dan Gim. Fokus di frontend development dan mobile development.',
              rotate: '-0.5deg',
            },
          ].map((exp, i) => (
            <ExperienceCard key={i} {...exp} />
          ))}
        </div>
      </div>
    </section>
  )
}
