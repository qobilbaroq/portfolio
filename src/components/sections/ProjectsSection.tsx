'use client'

export default function ProjectsSection() {
  const projects = [
    { name: 'LogicPath', num: '01', desc: 'JS Learning Platform' },
    { name: 'Youtone', num: '02', desc: 'Flutter Music App' },
    { name: 'Tetris Mabar', num: '03', desc: 'Multiplayer Flutter Game' },
  ]

  return (
    <section style={{
      minHeight: '100vh',
      padding: 'clamp(48px, 8vw, 120px)',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(28px, 5vw, 40px)',
        fontWeight: '400',
        color: 'var(--text-primary)',
        marginBottom: '40px',
      }}>Projects</h2>
      <div>
        {projects.map(project => (
          <div key={project.name} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '0.5px solid var(--border)',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget.querySelector('.proj-name') as HTMLElement
            if (el) el.style.color = 'var(--accent)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget.querySelector('.proj-name') as HTMLElement
            if (el) el.style.color = 'var(--text-primary)'
          }}
          >
            <div>
              <span className="proj-name" style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '28px',
                fontWeight: '400',
                color: 'var(--text-primary)',
                transition: 'color 0.2s ease',
                display: 'block',
              }}>{project.name}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{project.desc}</span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({project.num})</span>
          </div>
        ))}
      </div>
    </section>
  )
}