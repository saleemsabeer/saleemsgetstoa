import { useNavigate } from 'react-router-dom'

const demos = [
  {
    id: 'museum',
    categories: 'NONPROFIT · GIFT SHOP · EVENTS',
    title: 'Dark Sky Discovery Center',
    desc: '22+ page admin system for the International Dark Sky Discovery Center in Fountain Hills, AZ. Storefront with video backgrounds and starfield. Gift shop with 67 products from Printify. Events with ticket reservations. AI Design Studio. Social media post creator. Point of sale. Facility booking. Volunteer portal.',
    features: ['Video Hero', 'Online Store', 'Events & Tickets', 'Donations', 'POS', 'Email Marketing', 'Inventory', 'Orders'],
    path: '/demo/museum',
    pages: '8 pages',
    previewUrl: '/demo/museum',
    previewLabel: 'getstoa.io/demo/museum',
  },
]

export default function FeatureShowcase() {
  const nav = useNavigate()

  return (
    <section id="features" style={{ padding: '100px 0 60px' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 64, padding: '0 32px' }}>
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

      {/* Demo sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 80, maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
        {demos.map((d, idx) => (
          <div key={d.id} className="showcase-row" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'center',
          }}>
            {/* Text side */}
            <div style={{ order: idx % 2 === 0 ? 0 : 1 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em',
                color: 'var(--brand)', marginBottom: 16,
              }}>{d.categories}</div>

              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 400, lineHeight: 1.15, color: 'var(--text)', margin: '0 0 16px',
              }}>{d.title}</h3>

              <p style={{
                fontFamily: 'var(--font-ui)', fontSize: 15, lineHeight: 1.75,
                color: 'var(--text2)', margin: '0 0 24px',
              }}>{d.desc}</p>

              {/* Feature pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {d.features.map(f => (
                  <span key={f} style={{
                    padding: '6px 14px', borderRadius: 100,
                    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.02em',
                    color: 'var(--brand)', background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.15)',
                  }}>{f}</span>
                ))}
              </div>

              {/* CTA */}
              <button onClick={() => nav(d.path)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500,
                color: 'var(--brand)', display: 'flex', alignItems: 'center', gap: 8,
                transition: 'gap 0.25s cubic-bezier(.16,1,.3,1)',
              }}
              onMouseEnter={e => e.currentTarget.style.gap = '14px'}
              onMouseLeave={e => e.currentTarget.style.gap = '8px'}
              >
                View Live Demo <span style={{ fontSize: 16 }}>→</span>
              </button>
            </div>

            {/* Preview side */}
            <div style={{ order: idx % 2 === 0 ? 1 : 0 }}>
              <div style={{
                borderRadius: 16, overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.04)',
                background: '#111',
                position: 'relative',
              }}>
                {/* Browser chrome */}
                <div style={{
                  padding: '10px 16px', background: '#1a1a1a',
                  display: 'flex', alignItems: 'center', gap: 8,
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                  </div>
                  <div style={{
                    flex: 1, textAlign: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.02em',
                  }}>{d.previewLabel}</div>
                </div>
                {/* Iframe */}
                <div style={{ position: 'relative', width: '100%', height: 380, overflow: 'hidden' }}>
                  <iframe
                    src={d.previewUrl}
                    title={`${d.title} preview`}
                    style={{
                      width: '200%', height: '200%',
                      transform: 'scale(0.5)', transformOrigin: 'top left',
                      border: 'none', pointerEvents: 'none',
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .showcase-row {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .showcase-row > div {
            order: unset !important;
          }
        }
      `}</style>
    </section>
  )
}
