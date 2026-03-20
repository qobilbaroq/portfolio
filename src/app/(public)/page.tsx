// 'use client'

// import { useRef, useState } from 'react'
// import CalendarGrid from '@/components/calendar/CalendarGrid'
// import ScrollAnimations from '@/components/calendar/ScrollAnimations'

// const SECTIONS = {
//   1: 'about',
//   2: 'now',
//   3: 'skills',
//   4: 'experience',
// }

// export default function HomePage() {
//   const [activeSection, setActiveSection] = useState<number | null>(null)
//   const sectionRefs = {
//     about: useRef<HTMLDivElement>(null),
//     now: useRef<HTMLDivElement>(null),
//     skills: useRef<HTMLDivElement>(null),
//     experience: useRef<HTMLDivElement>(null),
//     projects: useRef<HTMLDivElement>(null),
//   }

//   const handleDateClick = (date: number) => {
//     const sectionKey = SECTIONS[date as keyof typeof SECTIONS]
//     if (!sectionKey) return

//     setActiveSection(date)
//     const ref = sectionRefs[sectionKey as keyof typeof sectionRefs]
//     if (ref.current) {
//       ref.current.scrollIntoView({ behavior: 'smooth' })
//     }
//   }

//   return (
//     <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
//       <ScrollAnimations />

//       {/* Hero — Kalender */}
//       <section className="calendar-hero" style={{
//         minHeight: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         padding: 'clamp(48px, 8vw, 120px)',
//         maxWidth: '800px',
//         margin: '0 auto',
//       }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '40px',
//         }}>
//           <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
//             Moch Nabil Al Mubaroq
//           </p>
//           <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
//             portfolio
//           </p>
//         </div>

//         <CalendarGrid onDateClick={handleDateClick} />

//         <div style={{
//           marginTop: '32px',
//           display: 'flex',
//           gap: '8px',
//           flexWrap: 'wrap',
//         }}>
//           {[
//             { date: 1, label: 'about' },
//             { date: 2, label: 'now' },
//             { date: 3, label: 'skills' },
//             { date: 4, label: 'experience' },
//           ].map(({ date, label }) => (
//             <button
//               key={date}
//               onClick={() => handleDateClick(date)}
//               style={{
//                 fontSize: '12px',
//                 color: 'var(--text-muted)',
//                 background: 'transparent',
//                 border: 'none',
//                 cursor: 'pointer',
//                 padding: '4px 0',
//                 textDecoration: 'underline',
//                 textUnderlineOffset: '3px',
//               }}
//             >
//               {date} — {label}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Section: About */}
//       <section
//         className="section-about"
//         ref={sectionRefs.about}
//         style={{
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           padding: 'clamp(32px, 6vw, 80px)',
//           maxWidth: '600px',
//           margin: '0 auto',
//         }}
//       >
//         <div style={{ width: '100%' }}>
//           <span style={{
//             display: 'inline-block',
//             background: 'var(--accent)',
//             color: 'var(--bg)',
//             fontSize: '11px',
//             padding: '3px 10px',
//             borderRadius: '3px',
//             marginBottom: '24px',
//           }}>01</span>

//           <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
//             <div style={{
//               background: 'white',
//               border: '0.5px solid var(--border)',
//               padding: '10px 10px 32px',
//               width: '120px',
//               transform: 'rotate(-2deg)',
//               flexShrink: 0,
//             }}>
//               <div style={{
//                 background: 'var(--bg-surface)',
//                 width: '100px',
//                 height: '90px',
//                 borderRadius: '2px',
//               }} />
//               <p style={{
//                 fontSize: '10px',
//                 color: 'var(--text-muted)',
//                 textAlign: 'center',
//                 marginTop: '8px',
//               }}>nabil, 2024</p>
//             </div>

//             <div style={{ flex: 1, minWidth: '200px' }}>
//               <h2 style={{
//                 fontFamily: 'var(--font-serif)',
//                 fontSize: 'clamp(28px, 5vw, 40px)',
//                 fontWeight: '400',
//                 color: 'var(--text-primary)',
//                 marginBottom: '8px',
//                 lineHeight: 1.2,
//               }}>
//                 Moch Nabil<br />Al Mubaroq
//               </h2>
//               <p style={{
//                 fontSize: '14px',
//                 color: 'var(--accent)',
//                 marginBottom: '16px',
//               }}>Frontend Developer</p>
//               <div style={{
//                 display: 'inline-block',
//                 background: '#F5E87A',
//                 color: '#412402',
//                 fontSize: '12px',
//                 padding: '4px 10px',
//                 borderRadius: '2px',
//                 transform: 'rotate(1deg)',
//                 marginBottom: '16px',
//               }}>
//                 Bandung, Indonesia
//               </div>
//               <p style={{
//                 fontSize: '14px',
//                 color: 'var(--text-muted)',
//                 lineHeight: 1.7,
//               }}>
//                 Fresh grad yang suka bikin hal-hal yang rapi di layar.
//                 Vue, React, Flutter — apapun yang bikin user senang.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section: Now */}
//       <section
//         className="section-now"
//         ref={sectionRefs.now}
//         style={{
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           padding: 'clamp(32px, 6vw, 80px)',
//           maxWidth: '600px',
//           margin: '0 auto',
//         }}
//       >
//         <div style={{ width: '100%' }}>
//           <span style={{
//             display: 'inline-block',
//             background: 'var(--accent)',
//             color: 'var(--bg)',
//             fontSize: '11px',
//             padding: '3px 10px',
//             borderRadius: '3px',
//             marginBottom: '24px',
//           }}>02</span>

//           <h2 style={{
//             fontFamily: 'var(--font-serif)',
//             fontSize: 'clamp(28px, 5vw, 40px)',
//             fontWeight: '400',
//             color: 'var(--text-primary)',
//             marginBottom: '32px',
//           }}>What I&apos;m up to</h2>

//           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//             {[
//               { text: 'Building: Youtone (Flutter music app)', color: '#B5D4F4', textColor: '#042C53', rotate: '-1deg' },
//               { text: 'Learning: React, Next.js', color: '#F4C0D1', textColor: '#4B1528', rotate: '1.5deg' },
//               { text: 'Status: Open to work', color: '#F5E87A', textColor: '#412402', rotate: '-0.5deg' },
//             ].map((item, i) => (
//               <div key={i} className="sticky-note" style={{
//                 display: 'inline-block',
//                 background: item.color,
//                 color: item.textColor,
//                 fontSize: '14px',
//                 padding: '10px 16px',
//                 borderRadius: '2px',
//                 transform: `rotate(${item.rotate})`,
//                 width: 'fit-content',
//               }}>
//                 {item.text}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Section: Skills */}
//       <section
//         className="section-skills"
//         ref={sectionRefs.skills}
//         style={{
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           padding: 'clamp(32px, 6vw, 80px)',
//           maxWidth: '600px',
//           margin: '0 auto',
//         }}
//       >
//         <div style={{ width: '100%' }}>
//           <span style={{
//             display: 'inline-block',
//             background: 'var(--accent)',
//             color: 'var(--bg)',
//             fontSize: '11px',
//             padding: '3px 10px',
//             borderRadius: '3px',
//             marginBottom: '24px',
//           }}>03</span>

//           <h2 style={{
//             fontFamily: 'var(--font-serif)',
//             fontSize: 'clamp(28px, 5vw, 40px)',
//             fontWeight: '400',
//             color: 'var(--text-primary)',
//             marginBottom: '32px',
//           }}>Skills</h2>

//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-start' }}>
//             {[
//               { name: 'Vue.js', rotate: '-3deg', style: 'outline' },
//               { name: 'Laravel', rotate: '2deg', style: 'fill' },
//               { name: 'Flutter', rotate: '-1deg', style: 'gray' },
//               { name: 'JavaScript', rotate: '3deg', style: 'outline' },
//               { name: 'TypeScript', rotate: '-2deg', style: 'fill' },
//               { name: 'Tailwind CSS', rotate: '1.5deg', style: 'gray' },
//               { name: 'Next.js', rotate: '-2.5deg', style: 'fill' },
//               { name: 'Git / GitHub', rotate: '2.5deg', style: 'outline' },
//             ].map((skill) => (
//               <div
//                 key={skill.name}
//                 className="skill-sticker"
//                 style={{
//                   padding: '8px 14px',
//                   borderRadius: '6px',
//                   fontSize: '13px',
//                   fontWeight: '500',
//                   transform: `rotate(${skill.rotate})`,
//                   cursor: 'default',
//                   transition: 'transform 0.2s ease',
//                   border: skill.style === 'outline' ? '1.5px solid var(--accent)' : 'none',
//                   background: skill.style === 'fill'
//                     ? 'var(--text-primary)'
//                     : skill.style === 'gray'
//                     ? 'var(--bg-surface)'
//                     : 'transparent',
//                   color: skill.style === 'fill'
//                     ? 'var(--bg)'
//                     : skill.style === 'outline'
//                     ? 'var(--accent)'
//                     : 'var(--text-muted)',
//                 }}
//                 onMouseEnter={e => {
//                   (e.currentTarget as HTMLElement).style.transform = `rotate(0deg) scale(1.05)`
//                 }}
//                 onMouseLeave={e => {
//                   (e.currentTarget as HTMLElement).style.transform = `rotate(${skill.rotate})`
//                 }}
//               >
//                 {skill.name}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Section: Experience */}
//       <section
//         className="section-experience"
//         ref={sectionRefs.experience}
//         style={{
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           padding: 'clamp(32px, 6vw, 80px)',
//           maxWidth: '600px',
//           margin: '0 auto',
//         }}
//       >
//         <div style={{ width: '100%' }}>
//           <span style={{
//             display: 'inline-block',
//             background: 'var(--accent)',
//             color: 'var(--bg)',
//             fontSize: '11px',
//             padding: '3px 10px',
//             borderRadius: '3px',
//             marginBottom: '24px',
//           }}>04</span>

//           <h2 style={{
//             fontFamily: 'var(--font-serif)',
//             fontSize: 'clamp(28px, 5vw, 40px)',
//             fontWeight: '400',
//             color: 'var(--text-primary)',
//             marginBottom: '32px',
//           }}>Experience</h2>

//           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//             {[
//               {
//                 company: 'PT. Diantara Inter Media',
//                 role: 'Frontend Developer Intern',
//                 period: '5 bulan · 2024',
//                 type: 'KERJA',
//                 description: 'Mengerjakan web projects menggunakan Vue.js dan Laravel. Berkolaborasi dengan tim dalam pengembangan fitur frontend.',
//                 rotate: '-1deg',
//               },
//               {
//                 company: 'UNIKOM Web Dev Competition',
//                 role: 'Juara 2',
//                 period: '2024',
//                 type: 'JUARA',
//                 description: 'Meraih juara 2 dalam kompetisi web development tingkat universitas di Universitas Komputer Indonesia.',
//                 rotate: '0.5deg',
//               },
//               {
//                 company: 'SMK Prakarya Internasional',
//                 role: 'Software & Game Development (PPLG)',
//                 period: '2021 — 2024',
//                 type: 'EDU',
//                 description: 'Jurusan Pengembangan Perangkat Lunak dan Gim. Fokus di frontend development dan mobile development.',
//                 rotate: '-0.5deg',
//               },
//             ].map((exp, i) => (
//               <ExperienceCard key={i} {...exp} className="experience-card" />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Section: Projects */}
//       <section
//         className="section-projects"
//         ref={sectionRefs.projects}
//         style={{
//           minHeight: '100vh',
//           padding: 'clamp(32px, 6vw, 80px)',
//           maxWidth: '600px',
//           margin: '0 auto',
//         }}
//       >
//         <h2 style={{
//           fontFamily: 'var(--font-serif)',
//           fontSize: 'clamp(28px, 5vw, 40px)',
//           fontWeight: '400',
//           color: 'var(--text-primary)',
//           marginBottom: '40px',
//         }}>Projects</h2>

//         <div>
//           {[
//             { name: 'LogicPath', num: '01' },
//             { name: 'Youtone', num: '02' },
//             { name: 'Tetris Mabar', num: '03' },
//           ].map((project) => (
//             <div
//               key={project.name}
//               className="project-row"
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '20px 0',
//                 borderBottom: '0.5px solid var(--border)',
//                 cursor: 'pointer',
//               }}
//               onMouseEnter={e => {
//                 (e.currentTarget.querySelector('.proj-name') as HTMLElement).style.color = 'var(--accent)'
//               }}
//               onMouseLeave={e => {
//                 (e.currentTarget.querySelector('.proj-name') as HTMLElement).style.color = 'var(--text-primary)'
//               }}
//             >
//               <span className="proj-name" style={{
//                 fontFamily: 'var(--font-serif)',
//                 fontSize: '28px',
//                 fontWeight: '400',
//                 color: 'var(--text-primary)',
//                 transition: 'color 0.2s ease',
//               }}>{project.name}</span>
//               <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({project.num}/25)</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="section-footer" style={{
//         background: 'var(--text-primary)',
//         padding: 'clamp(32px, 6vw, 80px)',
//         maxWidth: '100%',
//       }}>
//         <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//           <p style={{
//             fontSize: '11px',
//             color: 'var(--text-muted)',
//             letterSpacing: '0.08em',
//             textTransform: 'uppercase',
//             marginBottom: '16px',
//           }}>Kirim pesan</p>
//           <h2 style={{
//             fontFamily: 'var(--font-serif)',
//             fontSize: 'clamp(32px, 6vw, 56px)',
//             fontWeight: '400',
//             color: 'var(--bg)',
//             marginBottom: '32px',
//             lineHeight: 1.2,
//           }}>Let&apos;s build<br />something.</h2>
//           <div style={{ fontSize: '13px', lineHeight: 2, color: 'var(--text-muted)' }}>
//             <p><span style={{ color: 'var(--accent)' }}>Email ·</span> your@email.com</p>
//             <p><span style={{ color: 'var(--accent)' }}>GitHub ·</span> qobilbaroq</p>
//             <p><span style={{ color: 'var(--accent)' }}>LinkedIn ·</span> Moch Nabil Al Mubaroq</p>
//           </div>
//           <div style={{
//             marginTop: '48px',
//             borderTop: '0.5px solid #333',
//             paddingTop: '16px',
//             display: 'flex',
//             justifyContent: 'space-between',
//           }}>
//             <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Bandung, Indonesia</p>
//             <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>2025</p>
//           </div>
//         </div>
//       </footer>

//     </main>
//   )
// }

// function ExperienceCard({
//   company, role, period, type, description, rotate, className
// }: {
//   company: string
//   role: string
//   period: string
//   type: string
//   description: string
//   rotate: string
//   className?: string
// }) {
//   const [open, setOpen] = useState(false)

//   return (
//     <div
//       className={className}
//       onClick={() => setOpen(!open)}
//       style={{
//         background: 'white',
//         border: '0.5px solid var(--border)',
//         borderRadius: '4px',
//         padding: '16px',
//         transform: open ? 'rotate(0deg)' : `rotate(${rotate})`,
//         cursor: 'pointer',
//         transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//         boxShadow: open ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
//       }}
//     >
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//         <div>
//           <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '4px' }}>
//             {company}
//           </p>
//           <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{role} · {period}</p>
//         </div>
//         <div style={{
//           width: '36px',
//           height: '36px',
//           borderRadius: '50%',
//           border: '2px solid var(--accent)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: '8px',
//           color: 'var(--accent)',
//           fontWeight: '500',
//           transform: 'rotate(-15deg)',
//           flexShrink: 0,
//         }}>
//           {type}
//         </div>
//       </div>

//       {open && (
//         <p style={{
//           fontSize: '13px',
//           color: 'var(--text-muted)',
//           lineHeight: 1.7,
//           marginTop: '12px',
//           borderTop: '0.5px solid var(--border)',
//           paddingTop: '12px',
//         }}>
//           {description}
//         </p>
//       )}
//     </div>
//   )
// }