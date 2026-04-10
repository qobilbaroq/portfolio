export default function Footer() {
  return (
    <footer
      className="section-footer"
      style={{
        background: 'var(--text-primary)',
        padding: 'clamp(48px, 8vw, 120px)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Kirim pesan
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 6vw, 56px)',
            color: '#FAF8F4',
            fontWeight: '400',
            marginBottom: '32px',
            lineHeight: 1.2,
          }}
        >
          Let&apos;s build<br />something.
        </h2>

        <div style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 2 }}>
          <p>
            <span style={{ color: 'var(--accent)' }}>Email ·</span>{' '}
            <a
              href="mailto:your@email.com"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
            >
              mochnabilalmubaroq@email.com
            </a>
          </p>
          <p>
            <span style={{ color: 'var(--accent)' }}>GitHub ·</span>{' '}
            <a
              href="https://github.com/qobilbaroq"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
            >
              qobilbaroq
            </a>
          </p>
          <p>
            <span style={{ color: 'var(--accent)' }}>LinkedIn ·</span>{' '}
            <a
              href="https://linkedin.com/in/moch-nabil-al-mubaroq"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
            >
              Moch Nabil Al Mubaroq
            </a>
          </p>
        </div>

        <div
          style={{
            borderTop: '0.5px solid #333',
            marginTop: '48px',
            paddingTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Bandung, Indonesia</p>
          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>2026</p>
        </div>
      </div>
    </footer>
  )
}