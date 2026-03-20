'use client'

import { useEffect, useRef } from 'react'

interface CalendarGridProps {
  onDateClick: (date: number) => void
}

const SECTION_DATES = [1, 2, 3, 4]

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

export default function CalendarGrid({ onDateClick }: CalendarGridProps) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const firstDay = new Date(year, month, 1).getDay()
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayDate = today.getDate()

  const popupRef = useRef<HTMLDivElement | null>(null)

  const handleDateClick = (date: number) => {
    if (SECTION_DATES.includes(date)) {
      onDateClick(date)
      return
    }

    const fact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]
    showFunFact(fact, date)
  }

  const showFunFact = (fact: string, date: number) => {
    if (popupRef.current) {
      popupRef.current.remove()
    }

    const popup = document.createElement('div')
    popup.style.cssText = `
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%) rotate(-1deg);
      background: #F5E87A;
      color: #412402;
      padding: 12px 20px;
      border-radius: 4px;
      font-size: 13px;
      font-family: var(--font-sans);
      z-index: 1000;
      max-width: 280px;
      text-align: center;
      animation: popIn 0.3s ease;
    `
    popup.innerHTML = `<span style="font-size:11px; opacity:0.6; display:block; margin-bottom:4px;">tanggal ${date}</span>${fact}`
    document.body.appendChild(popup)
    popupRef.current = popup

    setTimeout(() => {
      popup.style.opacity = '0'
      popup.style.transition = 'opacity 0.3s ease'
      setTimeout(() => popup.remove(), 300)
    }, 2500)
  }

  const cells = []

  for (let i = 0; i < adjustedFirstDay; i++) {
    cells.push(<div key={`empty-${i}`} />)
  }

  for (let date = 1; date <= daysInMonth; date++) {
    const isToday = date === todayDate
    const isSectionDate = SECTION_DATES.includes(date)

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
          background: isToday
            ? 'var(--text-primary)'
            : isSectionDate
            ? 'transparent'
            : 'var(--bg-surface)',
          color: isToday
            ? 'var(--bg)'
            : isSectionDate
            ? 'var(--accent)'
            : 'var(--text-muted)',
          cursor: 'pointer',
          fontWeight: isSectionDate || isToday ? '500' : '400',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={e => {
          if (!isToday) {
            (e.target as HTMLElement).style.background = isSectionDate ? 'var(--accent)' : 'var(--border)'
            if (isSectionDate) (e.target as HTMLElement).style.color = 'var(--bg)'
          }
        }}
        onMouseLeave={e => {
          if (!isToday) {
            (e.target as HTMLElement).style.background = isSectionDate ? 'transparent' : 'var(--bg-surface)'
            if (isSectionDate) (e.target as HTMLElement).style.color = 'var(--accent)'
          }
        }}
      >
        {date}
      </button>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '24px',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(40px, 8vw, 80px)',
          fontWeight: '400',
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}>
          {monthNames[month]}
        </h1>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {year}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
        marginBottom: '8px',
      }}>
        {dayNames.map(day => (
          <div key={day} style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            textAlign: 'center',
            padding: '4px 0',
          }}>
            {day}
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
      }}>
        {cells}
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: translateX(-50%) rotate(-1deg) scale(0.8); opacity: 0; }
          to { transform: translateX(-50%) rotate(-1deg) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}