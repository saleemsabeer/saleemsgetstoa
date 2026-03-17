import { useState, useEffect } from 'react'

const SAVE_KEY = 'stoa_platform'

const FEATURES = [
  // Storefront
  { id: 'hero', name: 'Hero Section', cat: 'Storefront', desc: 'Full-screen hero with your headline and CTA', on: true },
  { id: 'services', name: 'Services', cat: 'Storefront', desc: 'Service cards with pricing' },
  { id: 'booking', name: 'Online Booking', cat: 'Storefront', desc: 'Clients pick a service, provider, and time' },
  { id: 'events', name: 'Events & Tickets', cat: 'Storefront', desc: 'Event listings with RSVP and tickets' },
  { id: 'gallery', name: 'Before & After Gallery', cat: 'Storefront', desc: 'Photo comparisons' },
  { id: 'testimonials', name: 'Testimonials', cat: 'Storefront', desc: 'Client reviews and ratings' },
  { id: 'shop', name: 'Online Store', cat: 'Storefront', desc: 'Products, cart, checkout' },
  { id: 'memberships', name: 'Memberships', cat: 'Storefront', desc: 'Tiered plans with perks' },
  { id: 'team', name: 'Meet the Team', cat: 'Storefront', desc: 'Staff bios and photos' },
  { id: 'contact', name: 'Contact Form', cat: 'Storefront', desc: 'Contact with map and hours' },
  { id: 'donations', name: 'Donations', cat: 'Storefront', desc: 'Fundraising with progress bar' },
  // Admin
  { id: 'dashboard', name: 'Dashboard & KPIs', cat: 'Admin', desc: 'Real-time metrics and alerts', on: true },
  { id: 'patients', name: 'Client Manager', cat: 'Admin', desc: 'Full CRM with profiles and history' },
  { id: 'schedule', name: 'Scheduling', cat: 'Admin', desc: 'Calendar with day/week/list views' },
  { id: 'inventory', name: 'Inventory', cat: 'Admin', desc: 'Stock tracking and reorder alerts' },
  { id: 'orders', name: 'Orders', cat: 'Admin', desc: 'Online + POS order management' },
  { id: 'pos', name: 'Point of Sale', cat: 'Admin', desc: 'Tablet POS with barcode scanning' },
  { id: 'charts', name: 'Clinical Charts', cat: 'Admin', desc: 'SOAP notes with injection maps' },
  { id: 'waivers', name: 'Consent Forms', cat: 'Admin', desc: '15 templates with e-signature' },
  { id: 'treatments', name: 'Treatment Plans', cat: 'Admin', desc: 'Multi-session tracking' },
  { id: 'aftercare', name: 'Aftercare', cat: 'Admin', desc: 'Automated post-treatment texts' },
  { id: 'checkin', name: 'Check-In', cat: 'Admin', desc: 'Front desk patient flow' },
  // Marketing
  { id: 'dm_inbox', name: 'DM Inbox', cat: 'Marketing', desc: 'IG + FB + TikTok shared inbox' },
  { id: 'email', name: 'Email Marketing', cat: 'Marketing', desc: 'Templates, wizard, analytics' },
  { id: 'sms', name: 'Text / SMS', cat: 'Marketing', desc: 'Blast or individual messaging' },
  { id: 'social', name: 'Social Media', cat: 'Marketing', desc: 'Multi-platform post creator' },
  { id: 'reviews', name: 'Reviews', cat: 'Marketing', desc: 'Auto Google review requests' },
  { id: 'retention', name: 'Retention', cat: 'Marketing', desc: 'Lapsed client alerts' },
  { id: 'referrals', name: 'Referrals', cat: 'Marketing', desc: 'Tracking with auto-credits' },
  { id: 'waitlist', name: 'Waitlist', cat: 'Marketing', desc: 'Auto-backfill cancellations' },
  // Billing & Portals
  { id: 'wallets', name: 'Membership Wallets', cat: 'Billing', desc: 'Unit tracking and billing' },
  { id: 'giftcards', name: 'Gift Cards & Credits', cat: 'Billing', desc: 'Gift cards, loyalty, credits' },
  { id: 'portal', name: 'Client Portal', cat: 'Portals', desc: 'Patient-facing app' },
  { id: 'volunteer', name: 'Volunteer Portal', cat: 'Portals', desc: 'Shifts, hours, certs' },
  { id: 'reports', name: 'Reports', cat: 'Reporting', desc: 'Revenue, analytics, CSV export' },
]

const PRESETS = {
  medspa: { name: 'MedSpa', ids: ['hero','services','booking','gallery','testimonials','team','contact','dashboard','patients','schedule','charts','waivers','treatments','aftercare','checkin','dm_inbox','email','sms','reviews','retention','referrals','wallets','giftcards','portal','reports','inventory'] },
  museum: { name: 'Museum', ids: ['hero','events','shop','memberships','donations','gallery','team','contact','dashboard','inventory','orders','pos','email','social','reports','volunteer'] },
  retail: { name: 'Retail', ids: ['hero','shop','testimonials','contact','dashboard','inventory','orders','pos','email','sms','social','reviews','referrals','giftcards','portal','reports'] },
  salon: { name: 'Salon', ids: ['hero','services','booking','gallery','testimonials','team','contact','dashboard','patients','schedule','dm_inbox','email','sms','reviews','retention','referrals','wallets','portal','reports'] },
  blank: { name: 'Start Empty', ids: ['hero','dashboard'] },
}

const CATS = [...new Set(FEATURES.map(f => f.cat))]

function load() { try { return JSON.parse(localStorage.getItem(SAVE_KEY)) } catch { return null } }
function save(d) { localStorage.setItem(SAVE_KEY, JSON.stringify(d)) }

export default function PlatformBuilder({ onBack }) {
  const saved = load()
  const [step, setStep] = useState(saved?.features?.length > 0 ? 'live' : 'setup')
  const [name, setName] = useState(saved?.name || '')
  const [color, setColor] = useState(saved?.color || '#D4AF37')
  const [features, setFeatures] = useState(saved?.features || [])
  const [texts, setTexts] = useState(saved?.texts || {})
  const [editing, setEditing] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [adminFeature, setAdminFeature] = useState(null)
  const [preset, setPreset] = useState('')

  useEffect(() => {
    document.documentElement.style.setProperty('--brand', color)
  }, [color])

  useEffect(() => {
    if (step === 'live' && name) save({ name, color, features, texts })
  }, [name, color, features, texts, step])

  const has = (id) => features.includes(id)
  const toggle = (id) => setFeatures(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id])
  const applyPreset = (key) => { setPreset(key); setFeatures(PRESETS[key].ids) }
  const txt = (id, def) => texts[id] || def

  const E = ({ id, d, tag: T = 'span', s = {} }) => {
    const v = txt(id, d)
    if (!editing) return <T style={s}>{v}</T>
    return <T contentEditable suppressContentEditableWarning style={{ ...s, outline: `2px dashed ${color}44`, outlineOffset: 3, cursor: 'text', borderRadius: 4 }} onBlur={e => setTexts(p => ({ ...p, [id]: e.target.innerText }))} dangerouslySetInnerHTML={{ __html: v }} />
  }

  // ── SETUP ──
  if (step === 'setup') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 640, width: '100%' }}>
        <button onClick={onBack} style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text2)', marginBottom: 24 }}>← Back to Stoa</button>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: color, marginBottom: 12 }}>BUILD YOUR PLATFORM</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400, color: 'var(--text)', marginBottom: 32 }}>Let's start with the basics</h2>

        {/* Name */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--text2)', marginBottom: 8 }}>BUSINESS NAME</div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Glow Aesthetics" autoFocus style={{ width: '100%', padding: '16px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text)', fontSize: 20, fontFamily: 'var(--font-display)', outline: 'none' }} />
        </div>

        {/* Color */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--text2)', marginBottom: 8 }}>BRAND COLOR</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 44, height: 44, borderRadius: 10, border: '1px solid var(--border)', cursor: 'pointer', padding: 3 }} />
            {['#D4AF37','#E1306C','#0369A1','#16A34A','#7C3AED','#111111','#DC6843'].map(c => (
              <button key={c} onClick={() => setColor(c)} style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: color === c ? '2.5px solid #fff' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.15s' }} />
            ))}
          </div>
        </div>

        {/* Preset */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--text2)', marginBottom: 10 }}>START FROM A TEMPLATE</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
            {Object.entries(PRESETS).map(([key, p]) => (
              <button key={key} onClick={() => applyPreset(key)} style={{
                padding: '14px 10px', borderRadius: 12, textAlign: 'center',
                background: preset === key ? `${color}15` : 'var(--surface)',
                border: preset === key ? `2px solid ${color}` : '1px solid var(--border)',
              }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: preset === key ? color : 'var(--text)' }}>{p.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>{p.ids.length} features</div>
              </button>
            ))}
          </div>
        </div>

        {/* Feature toggles */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--text2)', marginBottom: 10 }}>OR PICK FEATURES ({features.length}/{FEATURES.length})</div>
          <div style={{ maxHeight: 340, overflowY: 'auto', borderRadius: 12, border: '1px solid var(--border)', padding: 12 }}>
            {CATS.map(cat => (
              <div key={cat} style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', color: color, marginBottom: 6 }}>{cat.toUpperCase()}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {FEATURES.filter(f => f.cat === cat).map(f => (
                    <button key={f.id} onClick={() => toggle(f.id)} style={{
                      padding: '6px 14px', borderRadius: 100, fontSize: 12, fontFamily: 'var(--font-ui)', fontWeight: 500,
                      background: has(f.id) ? color : 'var(--surface)',
                      color: has(f.id) ? '#000' : 'var(--text2)',
                      border: has(f.id) ? 'none' : '1px solid var(--border)',
                      transition: 'all 0.15s',
                    }}>{f.name}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => { if (name.trim()) setStep('live') }} disabled={!name.trim()} style={{
          width: '100%', padding: '16px', borderRadius: 100,
          background: name.trim() ? `linear-gradient(135deg, ${color}, ${color}CC)` : 'var(--surface)',
          color: name.trim() ? '#000' : 'var(--muted)',
          fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-ui)',
          boxShadow: name.trim() ? `0 0 30px ${color}30` : 'none',
        }}>
          Launch Your Platform →
        </button>
      </div>
    </div>
  )

  // ── LIVE PLATFORM ──
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>

      {/* ═══ FLOATING TOOLBAR ═══ */}
      <div style={{
        position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 300,
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'rgba(4,4,12,0.95)', backdropFilter: 'blur(20px)',
        borderRadius: 100, padding: '6px 10px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: color, padding: '0 8px' }}>{name}</span>
        <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
        <button onClick={() => setEditing(!editing)} style={{
          padding: '7px 14px', borderRadius: 100, fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)',
          background: editing ? color : 'transparent', color: editing ? '#000' : 'var(--text2)',
          border: editing ? 'none' : '1px solid var(--border)',
        }}>{editing ? '✓ Editing' : '✎ Edit'}</button>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          padding: '7px 14px', borderRadius: 100, fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)',
          background: menuOpen ? color : 'transparent', color: menuOpen ? '#000' : 'var(--text2)',
          border: menuOpen ? 'none' : '1px solid var(--border)',
        }}>☰ {features.length}</button>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--border)', cursor: 'pointer', padding: 2 }} />
        <button onClick={() => { setStep('setup') }} style={{ padding: '5px 10px', borderRadius: 100, fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--muted)', letterSpacing: '0.1em' }}>SETUP</button>
        <button onClick={onBack} style={{ padding: '5px 10px', borderRadius: 100, fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--muted)', letterSpacing: '0.1em' }}>STOA</button>
      </div>

      {/* Edit mode banner */}
      {editing && <div style={{ position: 'fixed', top: 68, left: '50%', transform: 'translateX(-50%)', zIndex: 150, padding: '7px 20px', borderRadius: 100, background: color, color: '#000', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', fontWeight: 600, boxShadow: `0 4px 20px ${color}40` }}>EDIT MODE — Click any text</div>}

      {/* ═══ FEATURE MENU ═══ */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 250, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }} onClick={() => setMenuOpen(false)}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 360, maxWidth: '90vw', background: 'var(--bg)', borderLeft: '1px solid var(--border)', overflowY: 'auto', padding: '28px 20px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: 'var(--text)' }}>Features</h3>
              <button onClick={() => setMenuOpen(false)} style={{ fontSize: 16, color: 'var(--text2)' }}>✕</button>
            </div>
            {CATS.map(cat => (
              <div key={cat} style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', color: color, marginBottom: 8 }}>{cat.toUpperCase()}</div>
                {FEATURES.filter(f => f.cat === cat).map(f => (
                  <button key={f.id} onClick={() => toggle(f.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left',
                    padding: '10px 12px', borderRadius: 8, marginBottom: 3,
                    background: has(f.id) ? `${color}10` : 'transparent',
                    border: has(f.id) ? `1px solid ${color}25` : '1px solid transparent',
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                      background: has(f.id) ? color : 'var(--surface)',
                      border: has(f.id) ? 'none' : '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#000', fontSize: 11, fontWeight: 700,
                    }}>{has(f.id) && '✓'}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: has(f.id) ? 'var(--text)' : 'var(--text2)' }}>{f.name}</div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--muted)' }}>{f.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ ADMIN DRAWER ═══ */}
      {adminFeature && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setAdminFeature(null)}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 560, maxWidth: '95vw', background: '#FAFAF8', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E5E5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', color: '#999' }}>ADMIN</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 600, color: '#111' }}>{FEATURES.find(f => f.id === adminFeature)?.name}</div>
              </div>
              <button onClick={() => setAdminFeature(null)} style={{ padding: '6px 14px', borderRadius: 100, background: '#111', color: '#fff', fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 500 }}>Close Admin</button>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ background: '#fff', border: '1px solid #E5E5E5', borderRadius: 12, padding: 20 }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: '0.15em', color: '#999', marginBottom: 8 }}>MANAGE {FEATURES.find(f => f.id === adminFeature)?.name?.toUpperCase()}</div>
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 16 }}>This is where you manage your {FEATURES.find(f => f.id === adminFeature)?.name?.toLowerCase()}. Changes here update the website instantly.</p>
                <div style={{ display: 'grid', gap: 10 }}>
                  <input placeholder="Title" style={{ padding: '10px 14px', border: '1px solid #E5E5E5', borderRadius: 8, fontSize: 14, outline: 'none' }} />
                  <textarea placeholder="Description..." rows={3} style={{ padding: '10px 14px', border: '1px solid #E5E5E5', borderRadius: 8, fontSize: 14, outline: 'none', resize: 'vertical' }} />
                  <button style={{ padding: '10px 20px', borderRadius: 100, background: color, color: '#fff', fontSize: 13, fontWeight: 600 }}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ THE WEBSITE ═══ */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(4,4,12,0.88)', backdropFilter: 'blur(28px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0 36px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <E id="brand" d={name} s={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: color, letterSpacing: '0.05em' }} />
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {has('services') && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text2)', cursor: 'pointer' }}>Services</span>}
          {has('booking') && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text2)', cursor: 'pointer' }}>Book</span>}
          {has('shop') && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text2)', cursor: 'pointer' }}>Shop</span>}
          {has('events') && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text2)', cursor: 'pointer' }}>Events</span>}
          {has('contact') && <button style={{ padding: '7px 18px', borderRadius: 100, background: color, color: '#000', fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600 }}>Contact</button>}
        </div>
      </nav>

      <div style={{ paddingTop: 60 }}>

        {has('hero') && (
          <section style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px', position: 'relative' }}>
            <div style={{ maxWidth: 650 }}>
              <E id="hero-tag" d={`Welcome to ${name}`} s={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.25em', color: color, display: 'block', marginBottom: 20 }} />
              <E id="hero-h1" d="Your Beauty, Our Expertise" tag="h1" s={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5.5vw, 60px)', fontWeight: 400, lineHeight: 1.1, color: 'var(--text)', marginBottom: 20, letterSpacing: '-0.02em' }} />
              <E id="hero-p" d="Premium treatments tailored to your unique goals." tag="p" s={{ fontFamily: 'var(--font-ui)', fontSize: 17, fontWeight: 300, lineHeight: 1.7, color: 'var(--text2)', marginBottom: 32 }} />
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                {has('booking') && <button style={{ padding: '13px 30px', borderRadius: 100, background: color, color: '#000', fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, boxShadow: `0 0 20px ${color}30` }}>Book Now</button>}
                <button style={{ padding: '13px 30px', borderRadius: 100, background: 'transparent', border: `1px solid ${color}40`, color: color, fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 500 }}>Learn More</button>
              </div>
            </div>
            {editing && <div onClick={() => setAdminFeature('hero')} style={{ position: 'absolute', top: 10, right: 10, padding: '4px 10px', borderRadius: 6, background: `${color}20`, fontFamily: 'var(--font-mono)', fontSize: 9, color: color, cursor: 'pointer' }}>OPEN ADMIN</div>}
          </section>
        )}

        {has('services') && (
          <section style={{ padding: '70px 40px', borderTop: '1px solid var(--border)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <E id="svc-tag" d="OUR SERVICES" s={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, display: 'block', textAlign: 'center', marginBottom: 12 }} />
              <E id="svc-h2" d="What We Offer" tag="h2" s={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 400, color: 'var(--text)', textAlign: 'center', marginBottom: 40 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
                {['Botox & Fillers','Laser Treatments','Body Contouring','Skin Rejuvenation','Wellness','Consultations'].map((svc, i) => (
                  <div key={i} style={{ padding: 24, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                    <E id={`svc-${i}`} d={svc} s={{ fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }} />
                    <E id={`svc-${i}-d`} d="Personalized care with lasting results." s={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5, display: 'block', marginBottom: 8 }} />
                    <E id={`svc-${i}-p`} d="From $200" s={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: color, display: 'block' }} />
                  </div>
                ))}
              </div>
              {editing && <div style={{ textAlign: 'center', marginTop: 14 }}><button onClick={() => setAdminFeature('services')} style={{ padding: '6px 14px', borderRadius: 100, background: `${color}12`, color: color, fontFamily: 'var(--font-mono)', fontSize: 9, border: `1px solid ${color}25` }}>OPEN ADMIN → Services</button></div>}
            </div>
          </section>
        )}

        {has('events') && (
          <section style={{ padding: '70px 40px', borderTop: '1px solid var(--border)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <E id="ev-tag" d="UPCOMING EVENTS" s={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, display: 'block', textAlign: 'center', marginBottom: 12 }} />
              <E id="ev-h2" d="Join Us" tag="h2" s={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 400, color: 'var(--text)', textAlign: 'center', marginBottom: 40 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                {['VIP Glow Night','Botox & Bubbles','Open House'].map((ev, i) => (
                  <div key={i} style={{ padding: 22, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: color, marginBottom: 6 }}>MAR {20+i*5} · 6 PM</div>
                    <E id={`ev-${i}`} d={ev} s={{ fontFamily: 'var(--font-ui)', fontSize: 17, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }} />
                    <E id={`ev-${i}-d`} d="An exclusive evening of beauty." s={{ fontSize: 13, color: 'var(--text2)', display: 'block', marginBottom: 10 }} />
                    <button style={{ padding: '7px 18px', borderRadius: 100, background: color, color: '#000', fontSize: 11, fontWeight: 600 }}>Reserve</button>
                  </div>
                ))}
              </div>
              {editing && <div style={{ textAlign: 'center', marginTop: 14 }}><button onClick={() => setAdminFeature('events')} style={{ padding: '6px 14px', borderRadius: 100, background: `${color}12`, color: color, fontFamily: 'var(--font-mono)', fontSize: 9, border: `1px solid ${color}25` }}>OPEN ADMIN → Events</button></div>}
            </div>
          </section>
        )}

        {has('testimonials') && (
          <section style={{ padding: '70px 40px', borderTop: '1px solid var(--border)' }}>
            <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
              <E id="test-tag" d="TESTIMONIALS" s={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, display: 'block', marginBottom: 12 }} />
              {['Absolutely transformed my skin. The team is incredible.', 'Best medspa experience ever. Results are amazing.'].map((t, i) => (
                <div key={i} style={{ padding: 24, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', marginBottom: 12, textAlign: 'left' }}>
                  <div style={{ color: color, marginBottom: 10 }}>★★★★★</div>
                  <E id={`test-${i}`} d={t} s={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.6, display: 'block', marginBottom: 8 }} />
                  <E id={`test-${i}-n`} d={['Sarah M.','Jessica L.'][i]} s={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: 'var(--text2)', display: 'block' }} />
                </div>
              ))}
            </div>
          </section>
        )}

        {has('memberships') && (
          <section style={{ padding: '70px 40px', borderTop: '1px solid var(--border)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
              <E id="mem-tag" d="MEMBERSHIPS" s={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, display: 'block', marginBottom: 12 }} />
              <E id="mem-h2" d="Join the Club" tag="h2" s={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 400, color: 'var(--text)', marginBottom: 40 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {[{ n: 'Silver', p: '$99' }, { n: 'Gold', p: '$199' }, { n: 'Platinum', p: '$349' }].map((t, i) => (
                  <div key={i} style={{ padding: 24, borderRadius: 14, background: i === 1 ? `${color}10` : 'rgba(255,255,255,0.02)', border: i === 1 ? `2px solid ${color}40` : '1px solid var(--border)', textAlign: 'left' }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: color, marginBottom: 6 }}>{t.n}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, color: 'var(--text)', marginBottom: 12 }}>{t.p}<span style={{ fontSize: 13, color: 'var(--text2)' }}>/mo</span></div>
                    <button style={{ padding: '8px 20px', borderRadius: 100, width: '100%', background: i === 1 ? color : 'transparent', color: i === 1 ? '#000' : color, border: i === 1 ? 'none' : `1px solid ${color}40`, fontSize: 12, fontWeight: 600 }}>Join</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {has('team') && (
          <section style={{ padding: '70px 40px', borderTop: '1px solid var(--border)' }}>
            <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
              <E id="team-tag" d="OUR TEAM" s={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, display: 'block', marginBottom: 12 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
                {['Dr. Sarah Mitchell','Jessica Park, NP','Emily Chen, RN'].map((n, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', margin: '0 auto 10px', background: `linear-gradient(135deg, ${color}40, ${color}15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 20, color: color }}>{n.split(' ').map(w => w[0]).join('')}</div>
                    <E id={`team-${i}`} d={n} s={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: 2 }} />
                    <E id={`team-${i}-r`} d={['Medical Director','Nurse Practitioner','Aesthetic Nurse'][i]} s={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text2)', display: 'block' }} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {has('contact') && (
          <section style={{ padding: '70px 40px', borderTop: '1px solid var(--border)' }}>
            <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
              <E id="cta-tag" d="GET IN TOUCH" s={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, display: 'block', marginBottom: 12 }} />
              <E id="cta-h2" d="Book Your Consultation" tag="h2" s={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 400, color: 'var(--text)', marginBottom: 28 }} />
              <div style={{ display: 'grid', gap: 10 }}>
                <input placeholder="Name" style={{ padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 14 }} />
                <input placeholder="Email" style={{ padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 14 }} />
                <textarea placeholder="Message..." rows={3} style={{ padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 14, resize: 'vertical' }} />
                <button style={{ padding: '12px', borderRadius: 100, background: color, color: '#000', fontSize: 14, fontWeight: 600 }}>Send</button>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: color, letterSpacing: '0.1em', marginBottom: 6 }}>{name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: 16 }}>POWERED BY STOA</div>
          <div style={{ fontSize: 11, color: '#222' }}>© 2026 {name}</div>
        </footer>
      </div>
    </div>
  )
}
