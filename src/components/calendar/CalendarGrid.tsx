'use client'

import { useRef } from 'react'
import gsap from 'gsap'

interface CalendarGridProps {
  onDateClick: (date: number) => void
}

const SECTION_DATES = [1, 5, 7, 21]

// ── Hari Libur Nasional & Cuti Bersama 2026 ──
const HOLIDAYS_2026: Record<string, string> = {
  '1-1': 'Tahun Baru Masehi 2026',
  '1-16': 'Isra Mikraj Nabi Muhammad SAW',
  '2-16': 'Cuti Bersama Tahun Baru Imlek',
  '2-17': 'Tahun Baru Imlek 2577',
  '3-3': 'Cap Go Meh',
  '3-18': 'Cuti Bersama Hari Suci Nyepi',
  '3-19': 'Hari Suci Nyepi — Tahun Baru Saka 1948',
  '3-20': 'Cuti Bersama Idul Fitri',
  '3-21': 'Hari Raya Idul Fitri 1447 H',
  '3-22': 'Hari Raya Idul Fitri 1447 H (Hari Kedua)',
  '3-23': 'Cuti Bersama Idul Fitri',
  '3-24': 'Cuti Bersama Idul Fitri',
  '4-3': 'Wafat Isa Al-Masih',
  '5-1': 'Hari Buruh Internasional',
  '5-14': 'Kenaikan Isa Al-Masih',
  '5-15': 'Cuti Bersama Kenaikan Isa Al-Masih',
  '5-16': 'Hari Waisak 2570 BE',
  '5-18': 'Cuti Bersama Hari Waisak',
  '5-28': 'Hari Raya Idul Adha 1447 H',
  '5-29': 'Hari Lahir Pancasila',
  '6-17': 'Tahun Baru Islam 1448 H',
  '8-17': 'Hari Kemerdekaan Republik Indonesia ke-81',
  '9-7': 'Maulid Nabi Muhammad SAW',
  '12-25': 'Hari Natal',
  '12-26': 'Cuti Bersama Natal',
}

// ── Tambah tanggal spesial personal lo di sini ──
// Format: 'bulan-tanggal': 'pesan'
const MY_SPECIAL_DATES: Record<string, string> = {
  '4-1': 'April Mop! Tapi portofolio ini beneran.',
  '11-25': 'Selamat ulang tahun Nabil!',
}

export default function CalendarGrid({ onDateClick }: CalendarGridProps) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const todayDate = today.getDate()

  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const firstDay = new Date(year, month, 1).getDay()
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const popupRef = useRef<HTMLDivElement | null>(null)

  // Gabungkan — MY_SPECIAL_DATES override kalau bentrok
  const allSpecialDates = { ...HOLIDAYS_2026, ...MY_SPECIAL_DATES }

  const showPopup = (message: string, isHoliday: boolean = false) => {
    if (popupRef.current) {
      popupRef.current.remove()
    }

    const popup = document.createElement('div')
    popup.style.cssText = `
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%) rotate(-1deg);
      background: ${isHoliday ? '#C9523A' : '#F5E87A'};
      color: ${isHoliday ? '#FAF8F4' : '#412402'};
      padding: 12px 20px;
      border-radius: 4px;
      font-size: 13px;
      font-family: var(--font-sans);
      z-index: 1000;
      max-width: 300px;
      text-align: center;
      line-height: 1.5;
    `
    popup.textContent = message
    document.body.appendChild(popup)
    popupRef.current = popup

    gsap.fromTo(popup,
      { opacity: 0, y: 10, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
    )

    setTimeout(() => {
      gsap.to(popup, {
        opacity: 0,
        y: -8,
        duration: 0.3,
        onComplete: () => popup.remove()
      })
    }, 3000)
  }

  const handleDateClick = (date: number) => {
    if (SECTION_DATES.includes(date)) {
      onDateClick(date)
      return
    }

    const key = `${month + 1}-${date}`
    if (allSpecialDates[key]) {
      const isHoliday = !!HOLIDAYS_2026[key]
      showPopup(allSpecialDates[key], isHoliday)
    }
  }

  const cells = []

  for (let i = 0; i < adjustedFirstDay; i++) {
    cells.push(<div key={`empty-${i}`} />)
  }

  for (let date = 1; date <= daysInMonth; date++) {
    const isToday = date === todayDate
    const key = `${month + 1}-${date}`
    const isSpecialDate = !!allSpecialDates[key]
    const dayOfWeek = new Date(year, month, date).getDay()
    const isSunday = dayOfWeek === 0

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
          border: isSunday && !isToday
            ? '1.5px solid var(--accent)'
            : '1.5px solid transparent',
          background: isToday ? 'var(--text-primary)' : 'var(--bg-surface)',
          color: isToday
            ? 'var(--bg)'
            : isSunday
            ? 'var(--accent)'
            : 'var(--text-muted)',
          cursor: 'pointer',
          fontWeight: isToday ? '500' : '400',
          transition: 'all 0.15s ease',
          position: 'relative',
        }}
        onMouseEnter={e => {
          if (!isToday) e.currentTarget.style.background = 'var(--border)'
        }}
        onMouseLeave={e => {
          if (!isToday) {
            e.currentTarget.style.background = 'var(--bg-surface)'
            e.currentTarget.style.color = isSunday ? 'var(--accent)' : 'var(--text-muted)'
          }
        }}
      >
        {date}
        {isSpecialDate && !isToday && (
          <span style={{
            position: 'absolute',
            bottom: '3px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: 'var(--text-muted)',
            opacity: 0.4,
          }} />
        )}
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
    </div>
  )
}