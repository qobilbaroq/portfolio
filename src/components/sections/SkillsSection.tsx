'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

interface SkillsSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>
}

const SKILLS = [
  { name: 'Vue.js', file: 'vue.svg', rotate: '-8deg', top: '3%', left: '3%', size: 72 },
  { name: 'Laravel', file: 'laravel.svg', rotate: '5deg', top: '0%', left: '45%', size: 80 },
  { name: 'Flutter', file: 'flutter.svg', rotate: '-3deg', top: '8%', left: '78%', size: 68 },
  { name: 'JavaScript', file: 'javascript.svg', rotate: '7deg', top: '43%', left: '18%', size: 72 },
  { name: 'TypeScript', file: 'typescript.svg', rotate: '-6deg', top: '30%', left: '55%', size: 72 },
  { name: 'Tailwind CSS', file: 'tailwindcss-wordmark.svg', rotate: '4deg', top: '70%', left: '2%', size: 140 },
  { name: 'Next.js', file: 'nextjs_logo_light.svg', rotate: '-4deg', top: '62%', left: '38%', size: 110 },
  { name: 'GitHub', file: 'github_light.svg', rotate: '6deg', top: '28%', left: '5%', size: 68 },
  { name: 'VS Code', file: 'vscode.svg', rotate: '-7deg', top: '55%', left: '78%', size: 64 },
  { name: 'Linux', file: 'linux.svg', rotate: '3deg', top: '15%', left: '28%', size: 62 },
]

export default function SkillsSection({ sectionRef }: SkillsSectionProps) {
  const stickerRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleMouseEnter = (i: number) => {
    const el = stickerRefs.current[i]
    if (!el) return
    gsap.to(el, {
      y: -10,
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = (i: number, rotate: string) => {
    const el = stickerRefs.current[i]
    if (!el) return
    gsap.to(el, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1.2, 0.4)',
    })
  }

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="sticker" x="-20%" y="-20%" width="140%" height="140%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="8" result="expanded" />
            <feFlood floodColor="white" result="white" />
            <feComposite in="white" in2="expanded" operator="in" result="whiteOutline" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="9" result="expanded2" />
            <feFlood floodColor="#E0DAD2" result="border" />
            <feComposite in="border" in2="expanded2" operator="in" result="borderOutline" />
            <feMerge>
              <feMergeNode in="borderOutline" />
              <feMergeNode in="whiteOutline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <section
        className="section-skills"
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
        }}>03</span>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(28px, 5vw, 40px)',
          fontWeight: '400',
          color: 'var(--text-primary)',
          marginBottom: '40px',
        }}>Skills</h2>

        {/* Sticker area */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '520px',
          background: 'var(--bg)',
        }}>
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              ref={el => { stickerRefs.current[i] = el }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i, skill.rotate)}
              style={{
                position: 'absolute',
                top: skill.top,
                left: skill.left,
                transform: `rotate(${skill.rotate})`,
                cursor: 'default',
                transformOrigin: 'center center',
              }}
            >
              {/* Sticker frame */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
              }}>
                <Image
                  src={`/skills/${skill.file}`}
                  alt={skill.name}
                  width={skill.size}
                  height={skill.size}
                  style={{
                    objectFit: 'contain',
                    filter: 'url(#sticker)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}