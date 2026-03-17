import { useState, useEffect } from 'react'

const industries = [
  { id: 'museum', icon: '✦', title: 'Museum / Nonprofit', sub: 'Events, gift shop, donations, volunteer portal', preview: 'Desert Science Center' },
  { id: 'medspa', icon: '◈', title: 'MedSpa / Wellness', sub: 'Booking, services, client portal, treatments', preview: 'Haus of Confidence' },
  { id: 'ecommerce', icon: '▦', title: 'Ecommerce / Retail', sub: 'Vintage audio, collections, gallery, about', preview: 'Woolson Audio' },
  { id: 'medflow', icon: '◇', title: 'Medical Sales', sub: 'Pipeline CRM, compliance, commissions, AI coach', preview: 'MedFlow' },
]

export function LandingSelector({ onSelect }) {
  const [heroVis, setHeroVis] = useState(false)
  useEffect(() => { setTimeout(() => setHeroVis(true), 300) }, [])

  return (
    <section style={s.wrap}>
      <div style={{
        ...s.content,
        opacity: heroVis ? 1 : 0,
        transform: heroVis ? 'none' : 'translateY(32px)',
        transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.3s',
      }}>
        <div style={s.tag}>THE SELLER'S PLATFORM</div>
        <h1 style={s.h1}>
          See Your Business.{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--brand)' }}>Built.</em>
        </h1>
        <p style={s.sub}>
          Pick your industry. Watch the entire platform transform into your business —
          storefront, dashboard, and client portal. Then customize it.
        </p>
      </div>
      <div style={{
        ...s.grid,
        opacity: heroVis ? 1 : 0,
        transform: heroVis ? 'none' : 'translateY(24px)',
        transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.8s',
      }}>
        {industries.map((ind) => (
          <button
            key={ind.id}
            onClick={() => onSelect(ind.id)}
            style={s.card}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,175,55,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.1)'
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={s.cardIcon}>{ind.icon}</div>
            <div style={s.cardTitle}>{ind.title}</div>
            <div style={s.cardSub}>{ind.sub}</div>
            <div style={s.cardPreview}>{ind.preview}</div>
          </button>
        ))}
      </div>
      <div style={{
        ...s.scrollHint,
        opacity: heroVis ? 1 : 0,
        transition: 'opacity 1s ease 2s',
      }}>
        <div style={s.scrollLine} />
      </div>
    </section>
  )
}

export function MiniSwitcher({ current, onSelect }) {
  return (
    <div style={mini.wrap}>
      {industries.map(ind => (
        <button
          key={ind.id}
          onClick={() => onSelect(ind.id)}
          style={{
            ...mini.btn,
            background: current === ind.id ? 'var(--brand)' : 'rgba(128,128,128,0.08)',
            color: current === ind.id ? 'var(--bg)' : 'var(--text2)',
            borderColor: current === ind.id ? 'var(--brand)' : 'var(--border)',
          }}
        >
          <span style={{ fontSize: 14 }}>{ind.icon}</span>
          <span>{ind.title.split(' /')[0]}</span>
        </button>
      ))}
    </div>
  )
}

const s = {
  wrap: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 60px', position: 'relative' },
  content: { textAlign: 'center', maxWidth: 700, marginBottom: 56 },
  tag: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.3em', color: '#D4AF37', marginBottom: 24 },
  h1: { fontFamily: "var(--font-display)", fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 400, lineHeight: 1.1, color: '#F0EDE6', margin: '0 0 24px', letterSpacing: '-0.02em' },
  sub: { fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 'clamp(15px, 2vw, 19px)', lineHeight: 1.7, color: '#908D9A', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, maxWidth: 1060, width: '100%' },
  card: { textAlign: 'left', padding: 28, borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.1)', transition: 'all 0.4s cubic-bezier(.16,1,.3,1)', cursor: 'pointer' },
  cardIcon: { fontSize: 28, color: '#D4AF37', marginBottom: 14, filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.3))' },
  cardTitle: { fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: '#F0EDE6', marginBottom: 6 },
  cardSub: { fontSize: 13, lineHeight: 1.5, color: '#908D9A', marginBottom: 14 },
  cardPreview: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.1em', color: '#D4AF3780', textTransform: 'uppercase' },
  scrollHint: { position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' },
  scrollLine: { width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, #D4AF37, transparent)', animation: 'float 2s ease-in-out infinite' },
}

const mini = {
  wrap: { display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', padding: '16px 24px' },
  btn: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 100, border: '1px solid', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-body)', transition: 'all 0.3s ease', cursor: 'pointer' },
}
