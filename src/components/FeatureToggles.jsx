import { useState } from 'react'

export default function FeatureToggles({ features, enabled, onToggle }) {
  const [open, setOpen] = useState(false)

  const sections = { storefront: [], dashboard: [], portal: [] }
  Object.entries(features).forEach(([key, feat]) => {
    if (sections[feat.section]) sections[feat.section].push({ key, ...feat })
  })

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        style={s.fab}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'none'}
      >
        <span style={{ fontSize: 18 }}>{open ? '✕' : '⚙'}</span>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>
          {open ? 'Close' : 'Customize'}
        </span>
      </button>

      {/* Backdrop */}
      {open && <div style={s.backdrop} onClick={() => setOpen(false)} role="presentation" />}

      {/* Panel */}
      <div style={{
        ...s.panel,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        opacity: open ? 1 : 0,
      }}>
        <div style={s.panelHeader}>
          <div style={s.panelTitle}>Customize Features</div>
          <div style={s.panelSub}>Toggle features on/off to build your platform</div>
        </div>

        <div style={s.panelBody}>
          {Object.entries(sections).map(([section, feats]) => (
            feats.length > 0 && (
              <div key={section} style={s.sectionGroup}>
                <div style={s.sectionLabel}>
                  {section === 'storefront' ? '◈ Website' : section === 'dashboard' ? '▦ Dashboard' : '◇ Portal'}
                </div>
                {feats.map(feat => (
                  <label key={feat.key} style={s.toggleRow}>
                    <span style={s.toggleLabel}>{feat.label}</span>
                    <div
                      onClick={() => onToggle(feat.key)}
                      style={{
                        ...s.toggle,
                        background: enabled[feat.key] ? 'var(--brand)' : 'var(--border)',
                      }}
                    >
                      <div style={{
                        ...s.toggleKnob,
                        transform: enabled[feat.key] ? 'translateX(18px)' : 'translateX(2px)',
                      }} />
                    </div>
                  </label>
                ))}
              </div>
            )
          ))}
        </div>
      </div>
    </>
  )
}

const s = {
  fab: {
    position: 'fixed', bottom: 28, right: 28, zIndex: 300,
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '14px 22px', borderRadius: 100,
    background: 'var(--brand)', color: 'var(--bg)',
    boxShadow: '0 4px 24px var(--brand-glow)',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.3s ease',
    border: 'none', cursor: 'pointer',
  },
  backdrop: {
    position: 'fixed', inset: 0, zIndex: 298,
    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
  },
  panel: {
    position: 'fixed', top: 0, right: 0, bottom: 0, width: 340, zIndex: 299,
    background: 'var(--surface)', borderLeft: '1px solid var(--border)',
    boxShadow: '-8px 0 40px rgba(0,0,0,0.3)',
    transition: 'transform 0.4s cubic-bezier(.16,1,.3,1), opacity 0.3s ease',
    display: 'flex', flexDirection: 'column',
    overflowY: 'auto',
  },
  panelHeader: {
    padding: '28px 24px 20px', borderBottom: '1px solid var(--border)',
  },
  panelTitle: {
    fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--text)', marginBottom: 4,
  },
  panelSub: {
    fontSize: 13, color: 'var(--text2)',
  },
  panelBody: {
    padding: '16px 24px 80px', flex: 1,
  },
  sectionGroup: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--muted)',
    textTransform: 'uppercase', marginBottom: 12, paddingBottom: 8,
    borderBottom: '1px solid var(--border)',
  },
  toggleRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 0', cursor: 'pointer',
  },
  toggleLabel: {
    fontSize: 14, color: 'var(--text)', fontWeight: 500,
  },
  toggle: {
    width: 40, height: 22, borderRadius: 11, position: 'relative',
    transition: 'background 0.3s ease', cursor: 'pointer', flexShrink: 0,
  },
  toggleKnob: {
    width: 18, height: 18, borderRadius: '50%', background: '#fff',
    position: 'absolute', top: 2,
    transition: 'transform 0.3s cubic-bezier(.16,1,.3,1)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
  },
}
