'use client'

import { useRef, useState } from 'react'
import CalendarGrid from '@/components/calendar/CalendarGrid'

const SECTIONS = {
  1: 'about',
  5: 'now',
  7: 'skills',
  21: 'experience',
}

export default function CalendarPortal() {
  const [activeSection, setActiveSection] = useState<number | null>(null)
  const sectionRefs = {
    paper: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    now: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
  }

  const handleDateClick = (date: number) => {
    const sectionKey = SECTIONS[date as keyof typeof SECTIONS]
    if (!sectionKey) return

    setActiveSection(date)
    const ref = sectionRefs[sectionKey as keyof typeof sectionRefs]
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero — Kalender */}
      <section
        className='section-paper'
        ref={sectionRefs.paper}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(32px, 6vw, 80px)',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Moch Nabil Al Mubaroq</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>portfolio</p>
        </div>
        <CalendarGrid onDateClick={handleDateClick} />
      </section>

      {/* Section: About */}
      <section
        className="section-about"
        ref={sectionRefs.about}
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
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '8px' }}>nabil, 2024</p>
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

      {/* Section: Now */}
      <section
        className="section-now"
        ref={sectionRefs.now}
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

      {/* Section: Skills */}
      <section
        className="section-skills"
        ref={sectionRefs.skills}
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
          }}>07</span>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: '400',
            color: 'var(--text-primary)',
            marginBottom: '32px',
          }}>Skills</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-start' }}>
            {[
              { name: 'Vue.js', rotate: '-3deg', style: 'outline' },
              { name: 'Laravel', rotate: '2deg', style: 'fill' },
              { name: 'Flutter', rotate: '-1deg', style: 'gray' },
              { name: 'JavaScript', rotate: '3deg', style: 'outline' },
              { name: 'TypeScript', rotate: '-2deg', style: 'fill' },
              { name: 'Tailwind CSS', rotate: '1.5deg', style: 'gray' },
              { name: 'Next.js', rotate: '-2.5deg', style: 'fill' },
              { name: 'Git / GitHub', rotate: '2.5deg', style: 'outline' },
            ].map((skill) => (
              <div
                key={skill.name}
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  transform: `rotate(${skill.rotate})`,
                  cursor: 'default',
                  transition: 'transform 0.2s ease',
                  border: skill.style === 'outline' ? '1.5px solid var(--accent)' : 'none',
                  background: skill.style === 'fill'
                    ? 'var(--text-primary)'
                    : skill.style === 'gray'
                      ? 'var(--bg-surface)'
                      : 'transparent',
                  color: skill.style === 'fill'
                    ? 'var(--bg)'
                    : skill.style === 'outline'
                      ? 'var(--accent)'
                      : 'var(--text-muted)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = `rotate(0deg) scale(1.05)`
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = `rotate(${skill.rotate})`
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Experience */}
      <section
        className="section-experience"
        ref={sectionRefs.experience}
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

    </main>
  )
}

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