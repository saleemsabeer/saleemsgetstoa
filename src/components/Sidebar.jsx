export default function Sidebar({ pages, active, onNavigate, open, onClose }) {
  const storefront = pages.filter(p => p.section === 'storefront')
  const admin = pages.filter(p => p.section === 'admin')

  return (
    <div style={{
      ...styles.sidebar,
      transform: open ? 'translateX(0)' : 'translateX(-100%)',
    }}>
      {/* Logo */}
      <div style={styles.logoWrap}>
        <img src="/images/logo.png" alt="STOA" style={styles.logo} />
        <div style={styles.logoText}>STOA</div>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close sidebar">✕</button>
      </div>

      <div style={styles.tagline}>THE SELLER'S PLATFORM</div>

      {/* Storefront */}
      <div style={styles.sectionLabel}>STOREFRONT</div>
      {storefront.map(p => (
        <button
          key={p.id}
          style={{
            ...styles.navItem,
            background: active === p.id ? '#D4AF3715' : 'transparent',
            color: active === p.id ? '#D4AF37' : '#888',
          }}
          onClick={() => onNavigate(p.id)}
        >
          <span style={styles.navIcon}>{p.icon}</span>
          <span style={styles.navLabel}>{p.label}</span>
          {active === p.id && <div style={styles.activeBar} />}
        </button>
      ))}

      {/* Admin */}
      <div style={{ ...styles.sectionLabel, marginTop: 24 }}>BACK OFFICE</div>
      {admin.map(p => (
        <button
          key={p.id}
          style={{
            ...styles.navItem,
            background: active === p.id ? '#D4AF3715' : 'transparent',
            color: active === p.id ? '#D4AF37' : '#888',
          }}
          onClick={() => onNavigate(p.id)}
        >
          <span style={styles.navIcon}>{p.icon}</span>
          <span style={styles.navLabel}>{p.label}</span>
          {active === p.id && <div style={styles.activeBar} />}
        </button>
      ))}

      {/* Bottom info */}
      <div style={styles.bottom}>
        <div style={styles.bottomText}>
          Every page you see here is a real, working feature your customers and team will use.
        </div>
        <div style={styles.cta}>
          <a href="https://instagram.com/getstoa" target="_blank" rel="noopener" style={styles.ctaLink}>
            @getstoa
          </a>
        </div>
      </div>
    </div>
  )
}

const styles = {
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: 260,
    background: '#0a0a0a',
    borderRight: '1px solid #1a1a1a',
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    zIndex: 50,
    transition: 'transform 0.3s cubic-bezier(.16,1,.3,1)',
    overflowY: 'auto',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '20px 20px 8px',
  },
  logo: {
    width: 36,
    height: 36,
    objectFit: 'contain',
  },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 600,
    color: '#D4AF37',
    letterSpacing: '0.15em',
    flex: 1,
  },
  closeBtn: {
    color: '#555',
    fontSize: 16,
    padding: 4,
  },
  tagline: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 8,
    letterSpacing: '0.25em',
    color: '#444',
    padding: '0 20px 20px',
  },
  sectionLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: '0.2em',
    color: '#333',
    padding: '0 20px 8px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.15s',
    position: 'relative',
    width: '100%',
    textAlign: 'left',
  },
  navIcon: {
    fontSize: 16,
    width: 20,
    textAlign: 'center',
  },
  navLabel: {},
  activeBar: {
    position: 'absolute',
    right: 0,
    top: 8,
    bottom: 8,
    width: 3,
    background: '#D4AF37',
    borderRadius: '3px 0 0 3px',
  },
  bottom: {
    marginTop: 'auto',
    padding: '24px 20px',
    borderTop: '1px solid #1a1a1a',
  },
  bottomText: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#444',
    marginBottom: 12,
  },
  cta: {},
  ctaLink: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color: '#D4AF37',
  },
}
