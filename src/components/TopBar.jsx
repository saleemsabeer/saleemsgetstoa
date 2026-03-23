export default function TopBar({ page, onMenu, editMode, onEditToggle, isAdmin }) {
  return (
    <div style={{
      ...styles.bar,
      background: isAdmin ? 'rgba(250,250,248,0.95)' : 'rgba(0,0,0,0.9)',
      borderBottom: isAdmin ? '1px solid #e5e5e5' : '1px solid #1a1a1a',
    }}>
      <button style={{ ...styles.menuBtn, color: isAdmin ? '#1A1A2E' : '#888' }} onClick={onMenu} aria-label="Open menu">
        <span style={styles.hamburger}>☰</span>
      </button>

      <div style={styles.center}>
        <span style={{ ...styles.pageLabel, color: isAdmin ? '#1A1A2E' : '#F0EDE6' }}>
          {page?.icon} {page?.label}
        </span>
        {isAdmin && <span style={styles.adminBadge}>ADMIN</span>}
      </div>

      {!isAdmin && (
        <button
          style={{
            ...styles.editBtn,
            background: editMode ? '#D4AF37' : '#222',
            color: editMode ? '#000' : '#888',
          }}
          onClick={onEditToggle}
          aria-label={editMode ? 'Exit edit mode' : 'Enter edit mode'}
        >
          ✎
        </button>
      )}
      {isAdmin && <div style={{ width: 36 }} />}
    </div>
  )
}

const styles = {
  bar: {
    position: 'sticky',
    top: 0,
    zIndex: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 16px',
    backdropFilter: 'blur(20px)',
    gap: 8,
  },
  menuBtn: {
    fontSize: 20,
    padding: '4px 8px',
  },
  hamburger: {},
  center: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  pageLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    fontWeight: 600,
  },
  adminBadge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: '0.15em',
    padding: '3px 6px',
    borderRadius: 4,
    background: '#D4AF3720',
    color: '#D4AF37',
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
}
