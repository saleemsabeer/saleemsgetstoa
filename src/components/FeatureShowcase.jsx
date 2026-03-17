import { useState } from 'react'

const INDUSTRIES = [
  {
    id: 'medspa',
    label: "I'm a MedSpa",
    icon: '◈',
    desc: 'Booking, clinical charts, DM inbox, patient portal, memberships, retention',
    url: 'https://medspaglow.vercel.app',
    pages: [
      { label: 'Dashboard', path: '/admin?embed' },
      { label: 'Schedule', path: '/admin/schedule?embed' },
      { label: 'Patients', path: '/admin/patients?embed' },
      { label: 'DM Inbox', path: '/admin/inbox?embed' },
      { label: 'Clinical Charts', path: '/admin/charts?embed' },
      { label: 'Treatment Plans', path: '/admin/treatments?embed' },
      { label: 'Memberships', path: '/admin/memberships?embed' },
      { label: 'Check-In', path: '/admin/checkin?embed' },
      { label: 'Retention', path: '/admin/retention?embed' },
      { label: 'Reviews', path: '/admin/reviews?embed' },
      { label: 'Email', path: '/admin/email?embed' },
      { label: 'Reports', path: '/admin/reports?embed' },
      { label: 'Patient Portal', path: '/portal' },
      { label: 'Online Booking', path: '/book' },
    ],
  },
  {
    id: 'museum',
    label: "I'm a Museum / Nonprofit",
    icon: '✦',
    desc: 'Gift shop, events, POS, donations, volunteer portal, email marketing',
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
]

export default function FeatureShowcase() {
  const [selected, setSelected] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)

  const industry = INDUSTRIES.find(i => i.id === selected)
  const page = industry?.pages[currentPage]

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
          Pick your industry. Click through every page of a real platform.
        </p>
      </div>

      {/* Industry Selector */}
      <div style={{
        display: 'flex', gap: 16, justifyContent: 'center', padding: '0 32px 40px',
        flexWrap: 'wrap',
      }}>
        {INDUSTRIES.map(ind => (
          <button key={ind.id} onClick={() => { setSelected(selected === ind.id ? null : ind.id); setCurrentPage(0); }} style={{
            padding: '24px 28px', borderRadius: 16, cursor: 'pointer',
            textAlign: 'left', minWidth: 280, maxWidth: 400, flex: '1 1 280px',
            background: '#fff',
            border: selected === ind.id ? '2px solid var(--brand)' : '1px solid var(--border)',
            boxShadow: selected === ind.id ? '0 8px 32px rgba(212,175,55,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.25s cubic-bezier(.16,1,.3,1)',
            transform: selected === ind.id ? 'translateY(-2px)' : 'none',
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{ind.icon}</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500,
              color: selected === ind.id ? 'var(--brand)' : 'var(--text)',
              marginBottom: 6,
            }}>{ind.label}</div>
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--text2)',
              lineHeight: 1.5,
            }}>{ind.desc}</div>
            <div style={{
              marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11,
              color: selected === ind.id ? 'var(--brand)' : 'var(--muted)',
              letterSpacing: '0.1em',
            }}>
              {selected === ind.id ? '▼ VIEWING DEMO' : '▶ CLICK TO EXPLORE'}
            </div>
          </button>
        ))}
      </div>

      {/* Live Demo */}
      {industry && (
        <div style={{
          maxWidth: 1300, margin: '0 auto', padding: '0 16px',
          animation: 'fadeIn 0.4s ease',
        }}>
          {/* Page tabs */}
          <div style={{
            display: 'flex', gap: 6, padding: '12px 16px',
            background: '#fff', borderRadius: '16px 16px 0 0',
            border: '1px solid var(--border)', borderBottom: 'none',
            overflowX: 'auto', scrollbarWidth: 'none',
          }}>
            <style>{`.stoa-demo-tabs::-webkit-scrollbar{display:none}`}</style>
            <div className="stoa-demo-tabs" style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', flex: 1 }}>
              {industry.pages.map((p, i) => (
                <button key={p.path} onClick={() => setCurrentPage(i)} style={{
                  padding: '8px 16px', borderRadius: 100, whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
                  background: currentPage === i ? 'var(--brand)' : '#F5F3F0',
                  color: currentPage === i ? '#000' : 'var(--text2)',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}>{p.label}</button>
              ))}
            </div>
            <a href={industry.url + page.path.split('?')[0]} target="_blank" rel="noopener" style={{
              padding: '8px 16px', borderRadius: 100, whiteSpace: 'nowrap',
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
              background: 'transparent', color: 'var(--brand)',
              border: '1px solid rgba(212,175,55,0.3)',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
              flexShrink: 0,
            }}>
              Full Screen ↗
            </a>
          </div>

          {/* Browser frame + iframe */}
          <div style={{
            borderRadius: '0 0 16px 16px', overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          }}>
            <iframe
              key={industry.url + page.path}
              src={industry.url + page.path}
              style={{
                width: '100%', height: 750, border: 'none',
                background: '#F5F3F0',
              }}
              title={`${industry.label} — ${page.label}`}
            />
          </div>

          <div style={{
            textAlign: 'center', padding: '16px 0',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
            color: 'var(--muted)',
          }}>
            {industry.pages.length} PAGES · FULLY INTERACTIVE · THIS IS THE REAL PLATFORM
          </div>
        </div>
      )}
    </section>
  )
}
