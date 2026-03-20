'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const SECTIONS = [
  { date: 1, id: 'about' },
  { date: 2, id: 'now' },
  { date: 3, id: 'skills' },
  { date: 4, id: 'experience' },
]

const FUN_FACTS = [
  'Punya mechanical keyboard lebih dari satu',
  'Suka foto pakai kamera film analog',
  'Pernah bikin drama bahasa Sunda buat tugas sekolah',
  'Aplikasi musik pertama dibangun pakai Flutter',
  'Juara 2 lomba web, juara 1 di hati sendiri',
  'Fedora Linux user sejak SMK',
  'Bisa scroll TikTok sambil debugging',
  'Nama lengkap susah dieja tapi gampang diingat',
]

export default function CalendarPortal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const currentSectionIndex = useRef<number>(-1)
  const isAnimating = useRef<boolean>(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [popupText, setPopupText] = useState<string | null>(null)

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const todayDate = today.getDate()

  const monthNames = [
    'January','February','March','April',
    'May','June','July','August',
    'September','October','November','December'
  ]
  const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

  const firstDay = new Date(year, month, 1).getDay()
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  useEffect(() => {
    let lastScrollTime = 0
    const SCROLL_COOLDOWN = 1200

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const now = Date.now()
      if (now - lastScrollTime < SCROLL_COOLDOWN) return
      if (isAnimating.current) return
      if (Math.abs(e.deltaY) < 30) return

      lastScrollTime = now
      const direction = e.deltaY > 0 ? 1 : -1
      const nextIndex = currentSectionIndex.current + direction

      if (direction === 1 && currentSectionIndex.current === -1) {
        isAnimating.current = true
        currentSectionIndex.current = 0
        enterSection(SECTIONS[0].id)
        setTimeout(() => { isAnimating.current = false }, SCROLL_COOLDOWN)

      } else if (direction === -1 && currentSectionIndex.current === 0) {
        isAnimating.current = true
        currentSectionIndex.current = -1
        leaveSection()
        setTimeout(() => { isAnimating.current = false }, SCROLL_COOLDOWN)

      } else if (direction === 1 && currentSectionIndex.current >= 0 && currentSectionIndex.current < SECTIONS.length - 1) {
        isAnimating.current = true
        leaveSection()
        setTimeout(() => {
          currentSectionIndex.current = nextIndex
          enterSection(SECTIONS[nextIndex].id)
          setTimeout(() => { isAnimating.current = false }, SCROLL_COOLDOWN)
        }, 900)

      } else if (direction === -1 && currentSectionIndex.current > 0) {
        isAnimating.current = true
        leaveSection()
        setTimeout(() => {
          currentSectionIndex.current = nextIndex
          enterSection(SECTIONS[nextIndex].id)
          setTimeout(() => { isAnimating.current = false }, SCROLL_COOLDOWN)
        }, 900)

      } else if (direction === 1 && currentSectionIndex.current === SECTIONS.length - 1) {
        isAnimating.current = true
        currentSectionIndex.current = -1
        leaveSection()
        setTimeout(() => { isAnimating.current = false }, SCROLL_COOLDOWN)
      }
    }

    const el = containerRef.current
    el?.addEventListener('wheel', handleWheel, { passive: false })
    return () => el?.removeEventListener('wheel', handleWheel)
  }, [])

  const enterSection = (id: string) => {
    setActiveSection(id)
    gsap.to(calendarRef.current, {
      scale: 8,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.in',
    })
  }

  const leaveSection = () => {
    setActiveSection(null)
    gsap.fromTo(calendarRef.current,
      { scale: 8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
  }

  const handleDateClick = (date: number) => {
    const section = SECTIONS.find(s => s.date === date)
    if (section) {
      enterSection(section.id)
      return
    }
    const fact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]
    setPopupText(fact)
    setTimeout(() => setPopupText(null), 2500)
  }

  const cells = []
  for (let i = 0; i < adjustedFirstDay; i++) {
    cells.push(<div key={`e-${i}`} />)
  }
  for (let date = 1; date <= daysInMonth; date++) {
    const isToday = date === todayDate
    const isSectionDate = SECTIONS.some(s => s.date === date)
    cells.push(
      <button
        key={date}
        onClick={() => handleDateClick(date)}
        style={{
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          borderRadius: '4px',
          border: isSectionDate ? '1.5px solid var(--accent)' : '1.5px solid transparent',
          background: isToday ? 'var(--text-primary)' : isSectionDate ? 'transparent' : 'var(--bg-surface)',
          color: isToday ? 'var(--bg)' : isSectionDate ? 'var(--accent)' : 'var(--text-muted)',
          cursor: 'pointer',
          fontWeight: isSectionDate || isToday ? '500' : '400',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={e => {
          if (!isToday) {
            const el = e.currentTarget
            el.style.background = isSectionDate ? 'var(--accent)' : 'var(--border)'
            if (isSectionDate) el.style.color = 'var(--bg)'
          }
        }}
        onMouseLeave={e => {
          if (!isToday) {
            const el = e.currentTarget
            el.style.background = isSectionDate ? 'transparent' : 'var(--bg-surface)'
            if (isSectionDate) el.style.color = 'var(--accent)'
          }
        }}
      >
        {date}
      </button>
    )
  }

  return (
    <div ref={containerRef} style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg)',
      position: 'relative',
    }}>

      {/* Kalender */}
      <div ref={calendarRef} style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(32px, 5vw, 80px)',
      }}>
        <div style={{ width: '100%', maxWidth: '700px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '24px',
          }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Moch Nabil Al Mubaroq</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>portfolio</p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '24px',
          }}>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(48px, 10vw, 96px)',
              fontWeight: '400',
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}>{monthNames[month]}</h1>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{year}</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
            marginBottom: '8px',
          }}>
            {dayNames.map(d => (
              <div key={d} style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', padding: '4px 0' }}>{d}</div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {cells}
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {SECTIONS.map(s => (
              <button key={s.date} onClick={() => handleDateClick(s.date)} style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}>
                {s.date} — {s.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section panels */}
      {activeSection === 'about' && <AboutPanel onClose={leaveSection} />}
      {activeSection === 'now' && <NowPanel onClose={leaveSection} />}
      {activeSection === 'skills' && <SkillsPanel onClose={leaveSection} />}
      {activeSection === 'experience' && <ExperiencePanel onClose={leaveSection} />}

      {/* Fun fact popup */}
      {popupText && (
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%) rotate(-1deg)',
          background: '#F5E87A',
          color: '#412402',
          padding: '12px 20px',
          borderRadius: '4px',
          fontSize: '13px',
          zIndex: 100,
          maxWidth: '280px',
          textAlign: 'center',
          animation: 'popIn 0.3s ease',
        }}>
          {popupText}
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from { transform: translateX(-50%) rotate(-1deg) scale(0.8); opacity: 0; }
          to { transform: translateX(-50%) rotate(-1deg) scale(1); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ─── Section Panels ───────────────────────────────────────

function PanelWrapper({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(32px, 5vw, 80px)',
      animation: 'fadeUp 0.5s ease',
      zIndex: 10,
    }}>
      <div style={{ width: '100%', maxWidth: '700px' }}>
        <button onClick={onClose} style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '32px',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          display: 'block',
        }}>
          ← kembali ke kalender
        </button>
        {children}
      </div>
    </div>
  )
}

function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelWrapper onClose={onClose}>
      <span style={{
        display: 'inline-block', background: 'var(--accent)',
        color: 'var(--bg)', fontSize: '11px', padding: '3px 10px',
        borderRadius: '3px', marginBottom: '24px',
      }}>01</span>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{
          background: 'white', border: '0.5px solid var(--border)',
          padding: '10px 10px 32px', width: '120px',
          transform: 'rotate(-2deg)', flexShrink: 0,
        }}>
          <div style={{ background: 'var(--bg-surface)', width: '100px', height: '90px', borderRadius: '2px' }} />
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '8px' }}>nabil, 2024</p>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: '400', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.2,
          }}>Moch Nabil<br />Al Mubaroq</h2>
          <p style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '16px' }}>Frontend Developer</p>
          <div style={{
            display: 'inline-block', background: '#F5E87A', color: '#412402',
            fontSize: '12px', padding: '4px 10px', borderRadius: '2px',
            transform: 'rotate(1deg)', marginBottom: '16px',
          }}>Bandung, Indonesia</div>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Fresh grad yang suka bikin hal-hal yang rapi di layar.
            Vue, React, Flutter — apapun yang bikin user senang.
          </p>
        </div>
      </div>
    </PanelWrapper>
  )
}

function NowPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelWrapper onClose={onClose}>
      <span style={{
        display: 'inline-block', background: 'var(--accent)',
        color: 'var(--bg)', fontSize: '11px', padding: '3px 10px',
        borderRadius: '3px', marginBottom: '24px',
      }}>02</span>
      <h2 style={{
        fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 40px)',
        fontWeight: '400', color: 'var(--text-primary)', marginBottom: '32px',
      }}>What I&apos;m up to</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { text: 'Building: Youtone (Flutter music app)', color: '#B5D4F4', textColor: '#042C53', rotate: '-1deg' },
          { text: 'Learning: React, Next.js', color: '#F4C0D1', textColor: '#4B1528', rotate: '1.5deg' },
          { text: 'Status: Open to work', color: '#F5E87A', textColor: '#412402', rotate: '-0.5deg' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'inline-block', background: item.color, color: item.textColor,
            fontSize: '14px', padding: '10px 16px', borderRadius: '2px',
            transform: `rotate(${item.rotate})`, width: 'fit-content',
          }}>{item.text}</div>
        ))}
      </div>
    </PanelWrapper>
  )
}

function SkillsPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelWrapper onClose={onClose}>
      <span style={{
        display: 'inline-block', background: 'var(--accent)',
        color: 'var(--bg)', fontSize: '11px', padding: '3px 10px',
        borderRadius: '3px', marginBottom: '24px',
      }}>03</span>
      <h2 style={{
        fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 40px)',
        fontWeight: '400', color: 'var(--text-primary)', marginBottom: '32px',
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
        ].map(skill => (
          <div key={skill.name} style={{
            padding: '8px 14px', borderRadius: '6px', fontSize: '13px',
            fontWeight: '500', transform: `rotate(${skill.rotate})`,
            cursor: 'default', transition: 'transform 0.2s ease',
            border: skill.style === 'outline' ? '1.5px solid var(--accent)' : 'none',
            background: skill.style === 'fill' ? 'var(--text-primary)' : skill.style === 'gray' ? 'var(--bg-surface)' : 'transparent',
            color: skill.style === 'fill' ? 'var(--bg)' : skill.style === 'outline' ? 'var(--accent)' : 'var(--text-muted)',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg) scale(1.05)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = `rotate(${skill.rotate})`}
          >{skill.name}</div>
        ))}
      </div>
    </PanelWrapper>
  )
}

function ExperiencePanel({ onClose }: { onClose: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const experiences = [
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
      description: 'Meraih juara 2 dalam kompetisi web development tingkat universitas di Universitas Komputer Indonesia.',
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
  ]

  return (
    <PanelWrapper onClose={onClose}>
      <span style={{
        display: 'inline-block', background: 'var(--accent)',
        color: 'var(--bg)', fontSize: '11px', padding: '3px 10px',
        borderRadius: '3px', marginBottom: '24px',
      }}>04</span>
      <h2 style={{
        fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 40px)',
        fontWeight: '400', color: 'var(--text-primary)', marginBottom: '32px',
      }}>Experience</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {experiences.map((exp, i) => (
          <div key={i} onClick={() => setOpenIndex(openIndex === i ? null : i)} style={{
            background: 'white', border: '0.5px solid var(--border)',
            borderRadius: '4px', padding: '16px',
            transform: openIndex === i ? 'rotate(0deg)' : `rotate(${exp.rotate})`,
            cursor: 'pointer', transition: 'transform 0.3s ease',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '4px' }}>{exp.company}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{exp.role} · {exp.period}</p>
              </div>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                border: '2px solid var(--accent)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '8px', color: 'var(--accent)', fontWeight: '500',
                transform: 'rotate(-15deg)', flexShrink: 0,
              }}>{exp.type}</div>
            </div>
            {openIndex === i && (
              <p style={{
                fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7,
                marginTop: '12px', borderTop: '0.5px solid var(--border)', paddingTop: '12px',
              }}>{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    </PanelWrapper>
  )
}