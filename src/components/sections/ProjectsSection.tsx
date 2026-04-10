'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const PROJECTS = [
  {
    name: 'LogicPath',
    num: '01',
    desc: 'JS Learning Platform',
    tech: 'Next.js · JavaScript · Tailwind',
    year: '2024',
    link: '#',
    color: '#E8E4DE',
  },
  {
    name: 'Youtone',
    num: '02',
    desc: 'Flutter Music App',
    tech: 'Flutter · Dart · YouTube API',
    year: '2024',
    link: '#',
    color: '#E4E8DE',
  },
  {
    name: 'Tetris Mabar',
    num: '03',
    desc: 'Multiplayer Flutter Game',
    tech: 'Flutter · WebSocket · Node.js',
    year: '2024',
    link: '#',
    color: '#DDE4E8',
  },
  {
    name: 'Portfolio',
    num: '04',
    desc: 'This Website',
    tech: 'Next.js · GSAP · Supabase',
    year: '2025',
    link: '#',
    color: '#E8DDE4',
  },
]

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (previewRef.current) {
        gsap.to(previewRef.current, {
          x: e.clientX + 20,
          y: e.clientY - 60,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      className="section-projects"
      style={{
        minHeight: '100vh',
        padding: 'clamp(48px, 8vw, 120px)',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(28px, 5vw, 40px)',
        fontWeight: '400',
        color: 'var(--text-primary)',
        marginBottom: '48px',
      }}>Projects</h2>

      <div>

        {/* List project */}
        {PROJECTS.map((project, i) => (
          <div
            key={project.name}
            onMouseEnter={() => setActiveProject(i)}
            onMouseLeave={() => setActiveProject(null)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 0',
              borderBottom: '0.5px solid var(--border)',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              opacity: activeProject !== null && activeProject !== i ? 0.4 : 1,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span
                  className="proj-name"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(22px, 4vw, 32px)',
                    fontWeight: '400',
                    color: activeProject === i ? 'var(--accent)' : 'var(--text-primary)',
                    transition: 'color 0.2s ease',
                    display: 'block',
                  }}
                >{project.name}</span>
                <span style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-sans)',
                }}>{project.year}</span>
              </div>
              <p style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginTop: '2px',
              }}>{project.tech}</p>
            </div>
            <span style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
            }}>({project.num})</span>
          </div>
        ))}

      </div>

      <div
        ref={previewRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '200px',
          pointerEvents: 'none',
          zIndex: 100,
          opacity: activeProject !== null ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '200px',
              opacity: activeProject === i ? 1 : 0,
              transform: activeProject === i ? 'translateY(0) rotate(-1deg)' : 'translateY(8px) rotate(-1deg)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
          >
            <div style={{
              width: '200px',
              height: '140px',
              background: project.color,
              borderRadius: '6px',
              border: '0.5px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <p style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>preview</p>
              <p style={{
                fontSize: '18px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
              }}>{project.name}</p>
            </div>
            <p style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              marginTop: '8px',
              textAlign: 'center',
            }}>{project.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}