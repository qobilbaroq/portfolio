'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const PROJECTS = [
  {
    name: 'Sibening',
    num: '01',
    desc: "Sibening (Sistem Bimbingan Elektronik dan Konseling) was built as a full-featured web application tailored specifically for school BK departments. The system brings together four core modules — attendance management, late arrival tracking, problem student records, and real-time consultation chat — all under one roof.The real-time chat feature connects students directly with their BK teacher, enabling immediate counseling without scheduling constraints. Attendance data is visualized with status filters (Present, Sick, Excused, Absent), giving teachers instant visibility into class health at a glance. The result is a leaner, faster, and more humane counseling experience for both teachers and students.",
    tech: 'Next.js · JavaScript · Tailwind · Real-time WebSocket',
    year: '2024',
    link: '#',
    color: '#E8E4DE',
    images: [
      '/projects/sibening1.png',
      '/projects/sibening2.png',
    ],
  },
  {
    name: 'Elska',
    num: '02',
    desc: 'marketpace',
    tech: 'vue · tailwind · laravel',
    year: '2024',
    link: '#',
    color: '#E4E8DE',
    images: [
      '/projects/elska1.png',
      '/projects/elska2.png',
    ],
  },
  {
    name: 'Tetris Mabar',
    num: '03',
    desc: 'Multiplayer Flutter Game',
    tech: 'Flutter · WebSocket · Node.js',
    year: '2024',
    link: '#',
    color: '#DDE4E8',
    images: [
      '/projects/tetris.png',
    ],
  },
  {
    name: 'Portfolio',
    num: '04',
    desc: 'This Website',
    tech: 'Next.js · GSAP · Supabase',
    year: '2025',
    link: '#',
    color: '#E8DDE4',
    images: [
      '/projects/portfolio.png',
    ],
  },
]

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

  // Slideshow interval — reset tiap ganti project
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (activeProject !== null) {
      setCurrentImageIndex(0) // mulai dari foto pertama
      const images = PROJECTS[activeProject].images
      if (images.length > 1) {
        intervalRef.current = setInterval(() => {
          setCurrentImageIndex(prev => (prev + 1) % images.length)
        }, 2500)
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activeProject])

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
        {PROJECTS.map((project, i) => (
          <div
            key={project.name}
            onMouseEnter={() => setActiveProject(i)}
            onMouseLeave={() => setActiveProject(null)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
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

              {/* Deskripsi — muncul saat hover, animasi max-height */}
              <div style={{
                overflow: 'hidden',
                maxHeight: activeProject === i ? '60px' : '0px',
                opacity: activeProject === i ? 1 : 0,
                transition: 'max-height 0.3s ease, opacity 0.3s ease',
              }}>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                  fontFamily: 'var(--font-sans)',
                }}>{project.desc}</p>
              </div>

              <p style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginTop: '4px',
              }}>{project.tech}</p>
            </div>
            <span style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
            }}>({project.num})</span>
          </div>
        ))}
      </div>

      {/* Preview foto mengikuti mouse */}
      <div
        ref={previewRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '350px',
          pointerEvents: 'none',
          zIndex: 100,
          opacity: activeProject !== null ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        {activeProject !== null && (
          <div style={{
            width: '350px',
            transform: 'rotate(-1deg)',
          }}>
            <div style={{
              width: '350px',
              height: '250px',
              borderRadius: '6px',
              border: '0.5px solid var(--border)',
              overflow: 'hidden',
              background: PROJECTS[activeProject].color,
              position: 'relative',
            }}>
              {PROJECTS[activeProject].images.map((src, imgIdx) => (
                <img
                  key={src}
                  src={src}
                  alt={PROJECTS[activeProject].name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: currentImageIndex === imgIdx ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}