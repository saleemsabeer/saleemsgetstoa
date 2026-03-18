import { useNavigate } from 'react-router-dom'

export default function FeatureShowcase() {
  const nav = useNavigate()

  const demos = [
    {
      id: 'medspa',
      label: "I'm a MedSpa",
      icon: '◈',
      desc: 'Booking, clinical charts, DM inbox with revenue tracking, patient portal, memberships, retention engine, 32 services, 15 consent forms',
      path: '/demo/medspa',
      pages: '25 pages',
    },
    {
      id: 'museum',
      label: "I'm a Museum / Nonprofit",
      icon: '✦',
      desc: 'Gift shop with 67 products, event tickets, POS, donations with fundraising progress, volunteer portal, AI design studio',
      path: null, // coming soon
      pages: '22 pages',
    },
  ]

  return (
    <section id="features" style={{ padding: '80px 0 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48, padding: '0 32px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.25em',
          color: 'var(--brand)', marginBottom: 16,
        }}>SEE IT IN ACTION</div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 400, lineHeight: 1.15, color: 'var(--text)', margin: '0 0 12px',
        }}>What does your business need?</h2>
        <p style={{
          fontFamily: 'var(--font-ui)', fontSize: 16, lineHeight: 1.7,
          color: 'var(--text2)', maxWidth: 520, margin: '0 auto',
        }}>
          Pick your industry. Explore a full working platform — every button, every form, every page.
        </p>
      </div>

      <div style={{
        display: 'flex', gap: 20, justifyContent: 'center', padding: '0 32px',
        flexWrap: 'wrap', maxWidth: 900, margin: '0 auto',
      }}>
        {demos.map(d => (
          <button key={d.id} onClick={() => d.path && nav(d.path)} style={{
            padding: '32px', borderRadius: 20, cursor: d.path ? 'pointer' : 'default',
            textAlign: 'left', flex: '1 1 340px', maxWidth: 420,
            background: '#fff',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            transition: 'all 0.3s cubic-bezier(.16,1,.3,1)',
            opacity: d.path ? 1 : 0.6,
          }}
          onMouseEnter={e => { if (d.path) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,175,55,0.12)'; e.currentTarget.style.borderColor = 'var(--brand)'; }}}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <div style={{ fontSize: 32, marginBottom: 14 }}>{d.icon}</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500,
              color: 'var(--text)', marginBottom: 8,
            }}>{d.label}</div>
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--text2)',
              lineHeight: 1.6, marginBottom: 16,
            }}>{d.desc}</div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: 16, borderTop: '1px solid var(--border)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
                color: 'var(--muted)',
              }}>{d.pages}</span>
              {d.path ? (
                <span style={{
                  padding: '8px 20px', borderRadius: 100,
                  background: 'linear-gradient(135deg, var(--brand), var(--brand-hover))',
                  color: '#000', fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600,
                  boxShadow: '0 2px 12px var(--brand-glow)',
                }}>Explore Demo →</span>
              ) : (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
                  letterSpacing: '0.1em',
                }}>COMING SOON</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
