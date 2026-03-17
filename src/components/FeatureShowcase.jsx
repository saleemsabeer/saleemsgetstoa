import { useState } from 'react'

const INDUSTRIES = [
  {
    id: 'medspa',
    label: "I'm a MedSpa",
    icon: '◈',
    desc: 'Booking, clinical charts, DM inbox, patient portal, memberships',
    url: 'https://medspa-platform-two.vercel.app',
    pages: [
      { label: 'Home', path: '/' },
      { label: 'Dashboard', path: '/admin' },
      { label: 'Schedule', path: '/admin/schedule' },
      { label: 'Patients', path: '/admin/patients' },
      { label: 'DM Inbox', path: '/admin/inbox' },
      { label: 'Clinical Charts', path: '/admin/charts' },
      { label: 'Treatment Plans', path: '/admin/treatments' },
      { label: 'Check-In', path: '/admin/checkin' },
      { label: 'Memberships', path: '/admin/memberships' },
      { label: 'Email Marketing', path: '/admin/email' },
      { label: 'Reviews', path: '/admin/reviews' },
      { label: 'Retention', path: '/admin/retention' },
      { label: 'Patient Portal', path: '/portal' },
      { label: 'Online Booking', path: '/book' },
    ],
  },
  {
    id: 'museum',
    label: "I'm a Museum / Nonprofit",
    icon: '✦',
    desc: 'Gift shop, events, POS, donations, volunteer portal, AI design studio',
    url: 'https://project-4pnn4.vercel.app',
    pages: [
      { label: 'Storefront', path: '/' },
      { label: 'Shop', path: '/shop' },
      { label: 'Events', path: '/events' },
      { label: 'Membership', path: '/membership' },
      { label: 'Dashboard', path: '/admin' },
      { label: 'Orders', path: '/admin/orders' },
      { label: 'Inventory', path: '/admin/inventory' },
      { label: 'Events Admin', path: '/admin/events' },
      { label: 'Email', path: '/admin/emails' },
      { label: 'Social Media', path: '/admin/social-media' },
      { label: 'Donations', path: '/admin/donations' },
      { label: 'Reports', path: '/admin/reports' },
    ],
  },
  {
    id: 'sales',
    label: "I'm in Medical Sales",
    icon: '▦',
    desc: 'Pipeline CRM, AI coaching, compliance, 3 portals, commission tracking',
    url: 'https://medflow.createandsource.com',
    pages: [
      { label: 'Dashboard', path: '/' },
      { label: 'Pipeline', path: '/pipeline' },
      { label: 'Accounts', path: '/accounts' },
      { label: 'AI Coach', path: '/ai-coach' },
      { label: 'Compliance', path: '/compliance' },
      { label: 'Route Planner', path: '/routes' },
    ],
  },
]

export default function FeatureShowcase() {
  const [selected, setSelected] = useState(null)
  const [currentPath, setCurrentPath] = useState('/')

  const industry = INDUSTRIES.find(i => i.id === selected)

  return (
    <section id="features" style={{ padding: '80px 0 40px' }}>
      {/* Header */}
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
          color: 'var(--text2)', maxWidth: 500, margin: '0 auto',
        }}>
          Pick your industry. Click through a live platform we've already built.
        </p>
      </div>

      {/* Industry Selector */}
      <div style={{
        display: 'flex', gap: 16, justifyContent: 'center', padding: '0 32px 40px',
        flexWrap: 'wrap',
      }}>
        {INDUSTRIES.map(ind => (
          <button key={ind.id} onClick={() => { setSelected(ind.id); setCurrentPath(ind.pages[0].path) }} style={{
            padding: '24px 28px', borderRadius: 16, cursor: 'pointer',
            textAlign: 'left', minWidth: 240, maxWidth: 320, flex: '1 1 240px',
            background: selected === ind.id ? '#fff' : '#fff',
            border: selected === ind.id ? `2px solid var(--brand)` : '1px solid var(--border)',
            boxShadow: selected === ind.id ? '0 8px 32px rgba(212,175,55,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.25s cubic-bezier(.16,1,.3,1)',
            transform: selected === ind.id ? 'translateY(-2px)' : 'none',
          }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>{ind.icon}</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500,
              color: selected === ind.id ? 'var(--brand)' : 'var(--text)',
              marginBottom: 6,
            }}>{ind.label}</div>
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text2)',
              lineHeight: 1.5,
            }}>{ind.desc}</div>
          </button>
        ))}
      </div>

      {/* Live Demo */}
      {industry && (
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 32px',
          animation: 'fadeIn 0.4s ease',
        }}>
          {/* Page nav */}
          <div style={{
            display: 'flex', gap: 6, padding: '12px 16px',
            background: '#fff', borderRadius: '16px 16px 0 0',
            border: '1px solid var(--border)', borderBottom: 'none',
            overflowX: 'auto', scrollbarWidth: 'none',
          }}>
            {industry.pages.map(page => (
              <button key={page.path} onClick={() => setCurrentPath(page.path)} style={{
                padding: '8px 16px', borderRadius: 100, whiteSpace: 'nowrap',
                fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
                background: currentPath === page.path ? 'var(--brand)' : '#F5F3F0',
                color: currentPath === page.path ? '#000' : 'var(--text2)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.15s',
              }}>{page.label}</button>
            ))}
            <div style={{ flex: 1 }} />
            <a href={industry.url + currentPath} target="_blank" rel="noopener" style={{
              padding: '8px 16px', borderRadius: 100, whiteSpace: 'nowrap',
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
              background: 'transparent', color: 'var(--brand)',
              border: '1px solid rgba(212,175,55,0.3)',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
            }}>
              Open Full Demo ↗
            </a>
          </div>

          {/* Browser frame */}
          <div style={{
            borderRadius: '0 0 16px 16px', overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          }}>
            {/* Chrome bar */}
            <div style={{
              background: '#F5F5F5', padding: '8px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
              </div>
              <div style={{
                flex: 1, background: '#fff', borderRadius: 8,
                padding: '6px 14px', fontFamily: 'var(--font-mono)', fontSize: 12,
                color: '#999', textAlign: 'center', border: '1px solid #E5E5E5',
              }}>
                {industry.url.replace('https://', '')}{currentPath}
              </div>
            </div>

            {/* Iframe */}
            <iframe
              key={industry.url + currentPath}
              src={industry.url + currentPath}
              style={{
                width: '100%', height: 700, border: 'none',
                background: '#fff',
              }}
              title={`${industry.label} Demo`}
            />
          </div>

          {/* Feature count */}
          <div style={{
            textAlign: 'center', padding: '20px 0',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
            color: 'var(--muted)',
          }}>
            {industry.pages.length} PAGES · FULLY INTERACTIVE · CLICK THROUGH EVERYTHING
          </div>
        </div>
      )}
    </section>
  )
}
