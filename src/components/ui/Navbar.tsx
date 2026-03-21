'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const NAV_ITEMS = [
  { label: 'Paper', section: 'section-paper' },
  { label: 'About', section: 'section-about' },
  { label: 'Now', section: 'section-now' },
  { label: 'Skills', section: 'section-skills' },
  { label: 'Experience', section: 'section-experience' },
  { label: 'Projects', section: 'section-projects' },
  { label: 'Contact', section: 'section-footer' },
]

const ROTATIONS = [-2, 2, -1.5, 1.8, -2.2, 1.2]
const OFFSETS = [0, 6, 10, 8, 12, 9]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [showList, setShowList] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

 const cardRef = useRef<HTMLDivElement>(null)

 useEffect(() => {
  if (open) {
    gsap.fromTo(cardRef.current,
      { width: 44 },
      {
        width: 75,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => setShowList(true),
      }
    )
  } else {
    setShowList(false)
    gsap.to(cardRef.current, {
      width: 44,
      duration: 0.25,
      ease: 'power2.in',
    })
  }
}, [open])

  useEffect(() => {
    if (showList && itemsRef.current.length > 0) {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.25,
          stagger: 0.05,
          ease: 'back.out(1.5)',
        }
      )
    }
  }, [showList])

  const handleClick = (section: string) => {
    setOpen(false)
    const el = document.querySelector(`.${section}`)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed top-5 left-5 z-[1000] w-[160px]">

      {/* Card Paper toggle */}
    <div
        ref={cardRef}
        onClick={() => setOpen(!open)}
        className="relative cursor-pointer mb-3"
        style={{ height: '24px', width: '44px', overflow: 'hidden' }}
        >
        {/* Kertas belakang 2 */}
        <div className="absolute inset-0 rounded-sm border border-[var(--border)]"
            style={{ background: '#E0DAD2', transform: 'rotate(3deg)', zIndex: 1 }} />
        {/* Kertas belakang 1 */}
        <div className="absolute inset-0 rounded-sm border border-[var(--border)]"
            style={{ background: '#EAE5DE', transform: 'rotate(-2deg)', zIndex: 2 }} />
        {/* Kertas depan */}
        <div
            className="absolute inset-0 rounded-sm border border-[var(--border)] flex items-center justify-center"
            style={{ background: 'var(--bg)', zIndex: 3 }}
        >
            <span
            className="text-[11px] font-medium tracking-widest uppercase whitespace-nowrap transition-opacity duration-150"
            style={{
                color: 'var(--text-primary)',
                opacity: open ? 0 : 1,
                fontFamily: 'var(--font-sans)',
            }}
            >
            Paper
            </span>
        </div>
    </div>

      {/* Nav list */}
      {showList && (
        <>
          <div ref={listRef} className="relative">
            {NAV_ITEMS.map((item, i) => (
              <div
                key={item.label}
                ref={el => { if (el) itemsRef.current[i] = el }}
                onClick={() => handleClick(item.section)}
                className="rounded-sm border border-[var(--border)] px-3 py-2 text-[14px] font-medium tracking-widest uppercase cursor-pointer"
                style={{
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  marginLeft: `${OFFSETS[i]}px`,
                  marginTop: i === 0 ? '0px' : '2px',
                  transform: `rotate(${ROTATIONS[i]}deg)`,
                  boxShadow: '1px 1px 0 rgba(0,0,0,0.1)',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent)'
                  e.currentTarget.style.color = 'var(--bg)'
                  gsap.to(e.currentTarget, { rotate: 0, scale: 1.03, duration: 0.15 })
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--bg)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                  gsap.to(e.currentTarget, { rotate: ROTATIONS[i], scale: 1, duration: 0.15 })
                }}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Click outside */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setOpen(false)}
          />
        </>
      )}
    </div>
  )
}