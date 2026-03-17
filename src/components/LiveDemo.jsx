import { useState, useRef, useEffect } from 'react'
import Reveal from './Reveal'

export default function LiveDemo({ section }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const iframeRef = useRef(null)
  const hasFeatures = section.features && section.features.length > 0
  const active = hasFeatures ? section.features[activeIdx] : null

  // Reset active index when section changes
  useEffect(() => { setActiveIdx(0) }, [section.id])

  const iframeSrc = hasFeatures
    ? section.baseUrl + active.path
    : null

  return (
    <section style={s.wrap}>
      <Reveal>
        <div style={s.sectionLabel}>
          <span style={s.sectionIcon}>{section.icon}</span>
          {section.label}
        </div>
      </Reveal>

      {hasFeatures ? (
        <>
          {/* ── IFRAME ── */}
          <Reveal delay={100}>
            <div style={s.browserFrame}>
              <div style={s.browserBar}>
                <div style={s.browserDots}>
                  <span style={{ ...s.dot, background: '#ff5f57' }} />
                  <span style={{ ...s.dot, background: '#febc2e' }} />
                  <span style={{ ...s.dot, background: '#28c840' }} />
                </div>
                <div style={s.browserUrl}>
                  {section.baseUrl.replace('https://', '') + active.path}
                </div>
                <a
                  href={iframeSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={s.browserExternal}
                  title="Open in new tab"
                >
                  ↗
                </a>
              </div>
              <div style={s.iframeWrap}>
                <iframe
                  ref={iframeRef}
                  key={iframeSrc}
                  src={iframeSrc}
                  style={s.iframe}
                  title={`${section.label} — ${active.label}`}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          {/* ── FEATURE BUBBLES ── */}
          <Reveal delay={200}>
            <div style={s.bubblesWrap}>
              {section.features.map((feat, i) => (
                <button
                  key={feat.label}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    ...s.bubble,
                    background: i === activeIdx ? 'var(--brand)' : 'var(--surface)',
                    color: i === activeIdx ? 'var(--bg)' : 'var(--text2)',
                    borderColor: i === activeIdx ? 'var(--brand)' : 'var(--border)',
                  }}
                >
                  {feat.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* ── DESCRIPTION ── */}
          <Reveal delay={300}>
            <div style={s.descWrap}>
              <div style={s.descTitle}>{active.label}</div>
              <p style={s.descText}>{active.desc}</p>
            </div>
          </Reveal>
        </>
      ) : (
        /* ── NO LIVE DEMO — COMING SOON ── */
        <Reveal delay={100}>
          <div style={s.comingSoon}>
            <div style={s.comingSoonIcon}>{section.icon}</div>
            <p style={s.comingSoonText}>{section.note}</p>
          </div>
        </Reveal>
      )}
    </section>
  )
}

const s = {
  wrap: {
    maxWidth: 1200, margin: '0 auto', padding: '48px 24px 80px',
  },
  sectionLabel: {
    textAlign: 'center', padding: '0 0 32px',
    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.25em',
    color: 'var(--muted)',
  },
  sectionIcon: {
    color: 'var(--brand)', marginRight: 8,
  },

  /* Browser frame */
  browserFrame: {
    borderRadius: 14, overflow: 'hidden',
    border: '1px solid var(--border)',
    boxShadow: '0 20px 80px rgba(0,0,0,0.3)',
    background: 'var(--surface)',
  },
  browserBar: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '10px 16px',
    background: 'var(--surface2)',
    borderBottom: '1px solid var(--border)',
  },
  browserDots: {
    display: 'flex', gap: 6, flexShrink: 0,
  },
  dot: {
    width: 10, height: 10, borderRadius: '50%', display: 'block',
  },
  browserUrl: {
    flex: 1, textAlign: 'center',
    fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
    letterSpacing: '0.02em',
  },
  browserExternal: {
    fontSize: 14, color: 'var(--muted)', textDecoration: 'none',
    flexShrink: 0, padding: '2px 6px', borderRadius: 4,
  },
  iframeWrap: {
    height: '72vh',
    minHeight: 500,
    overflow: 'hidden',
    position: 'relative',
    background: 'var(--bg2)',
  },
  iframe: {
    width: '100%', height: '100%', border: 'none',
    display: 'block',
  },

  /* Feature bubbles */
  bubblesWrap: {
    display: 'flex', flexWrap: 'wrap', gap: 8,
    justifyContent: 'center',
    padding: '28px 0 20px',
  },
  bubble: {
    display: 'inline-flex', alignItems: 'center',
    padding: '8px 18px', borderRadius: 100,
    border: '1px solid',
    fontSize: 12, fontWeight: 600, letterSpacing: '0.02em',
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(.16,1,.3,1)',
  },

  /* Description */
  descWrap: {
    textAlign: 'center', maxWidth: 700, margin: '0 auto',
    padding: '0 24px',
  },
  descTitle: {
    fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600,
    color: 'var(--text)', marginBottom: 8,
  },
  descText: {
    fontSize: 15, lineHeight: 1.7, color: 'var(--text2)',
  },

  /* Coming soon */
  comingSoon: {
    textAlign: 'center', padding: '80px 24px',
    maxWidth: 600, margin: '0 auto',
  },
  comingSoonIcon: {
    fontSize: 40, color: 'var(--brand)', opacity: 0.3, marginBottom: 20,
  },
  comingSoonText: {
    fontSize: 15, lineHeight: 1.7, color: 'var(--text2)',
  },
}
