'use client'

import { useRef, useState } from 'react'
import CalendarGrid from '@/components/calendar/CalendarGrid'
import AboutSection from '@/components/sections/AboutSection'
import NowSection from '@/components/sections/NowSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'

const SECTIONS = {
  1: 'about',
  5: 'now',
  7: 'skills',
  21: 'experience',
}

export default function CalendarPortal() {
  const [activeSection, setActiveSection] = useState<number | null>(null)
  const sectionRefs = {
    paper: useRef<HTMLDivElement | null>(null),
    about: useRef<HTMLDivElement | null>(null),
    now: useRef<HTMLDivElement | null>(null),
    skills: useRef<HTMLDivElement | null>(null),
    experience: useRef<HTMLDivElement | null>(null),
    projects: useRef<HTMLDivElement | null>(null),
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
      <AboutSection sectionRef={sectionRefs.about} />

      {/* Section: Now */}
      <NowSection sectionRef={sectionRefs.now} />

      {/* Section: Skills */}
      <SkillsSection sectionRef={sectionRefs.skills} />

      {/* Section: Experience */}
      <ExperienceSection sectionRef={sectionRefs.experience} />

    </main>
  )
}