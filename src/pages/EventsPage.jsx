import { useState } from 'react'

const EVENTS = [
  { id: 1, title: 'Grand Opening Night', date: 'Apr 12', time: '6:00 PM', spots: 45, total: 50, cat: 'Special', desc: 'Be among the first to experience our new space.' },
  { id: 2, title: 'Members-Only Evening', date: 'Apr 18', time: '7:00 PM', spots: 22, total: 30, cat: 'Members', desc: 'Exclusive access with complimentary refreshments.' },
  { id: 3, title: 'Weekend Workshop', date: 'Apr 25', time: '10:00 AM', spots: 8, total: 15, cat: 'Education', desc: 'Hands-on learning with expert instructors.' },
  { id: 4, title: 'Community Fundraiser', date: 'May 3', time: '5:00 PM', spots: 0, total: 100, cat: 'Community', desc: 'An evening supporting our mission.' },
  { id: 5, title: 'Summer Kickoff Party', date: 'May 15', time: '7:30 PM', spots: 10, total: 75, cat: 'Special', desc: 'Celebrate the season with live music and food.' },
]

export default function EventsPage() {
  const [reserved, setReserved] = useState(new Set())
  const [modal, setModal] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleReserve = (id) => {
    setReserved(prev => new Set([...prev, id]))
    setModal(null)
    setName('')
    setEmail('')
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.hero}>
        <div style={styles.heroTag} data-editable="events-tag">UPCOMING</div>
        <h1 style={styles.heroTitle} data-editable="events-title">Events & Experiences</h1>
        <p style={styles.heroSub} data-editable="events-sub">Reserve your spot for unforgettable moments.</p>
      </div>

      <div style={styles.list}>
        {EVENTS.map(ev => {
          const isReserved = reserved.has(ev.id)
          const spotsLeft = ev.total - ev.spots
          const pct = (ev.spots / ev.total) * 100
          const almostFull = pct > 80

          return (
            <div key={ev.id} style={styles.card}>
              <div style={styles.dateCol}>
                <div style={styles.dateMonth}>{ev.date.split(' ')[0]}</div>
                <div style={styles.dateDay}>{ev.date.split(' ')[1]}</div>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.evCat}>{ev.cat}</div>
                <div style={styles.evTitle} data-editable={`event-${ev.id}`}>{ev.title}</div>
                <div style={styles.evDesc}>{ev.desc}</div>
                <div style={styles.evMeta}>{ev.time} · {spotsLeft} spots left</div>
                <div style={styles.spotsBar}>
                  <div style={{ ...styles.spotsFill, width: pct + '%', background: almostFull ? '#EF4444' : '#D4AF37' }} />
                </div>
              </div>
              <button
                style={{
                  ...styles.reserveBtn,
                  background: isReserved ? 'transparent' : '#D4AF37',
                  color: isReserved ? '#D4AF37' : '#000',
                  border: isReserved ? '1px solid #D4AF3730' : 'none',
                }}
                onClick={() => !isReserved && setModal(ev)}
              >
                {isReserved ? '✓ Reserved' : 'Reserve'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {modal && (
        <div role="presentation" style={styles.overlay} onClick={() => setModal(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalTitle}>Reserve Your Spot</div>
            <div style={styles.modalEv}>{modal.title} · {modal.date} {modal.time}</div>
            <input style={styles.input} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
            <input style={styles.input} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button
              style={{ ...styles.modalBtn, opacity: name && email ? 1 : 0.4 }}
              onClick={() => name && email && handleReserve(modal.id)}
            >
              Confirm Reservation →
            </button>
            <button style={styles.modalCancel} onClick={() => setModal(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  wrap: { paddingBottom: 40 },
  hero: {
    padding: '48px 24px 32px', textAlign: 'center',
    background: 'linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 100%)',
  },
  heroTag: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.3em',
    color: '#D4AF37', marginBottom: 8, outline: 'none',
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 500,
    color: '#F0EDE6', margin: '0 0 8px', outline: 'none',
  },
  heroSub: { fontSize: 14, color: '#908D9A', margin: 0, outline: 'none' },
  list: { display: 'flex', flexDirection: 'column', gap: 12, padding: '0 16px' },
  card: {
    display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16,
    background: '#0a0a0a', borderRadius: 14, border: '1px solid #1a1a1a',
  },
  dateCol: { width: 44, textAlign: 'center', flexShrink: 0, paddingTop: 4 },
  dateMonth: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em',
    color: '#D4AF37', textTransform: 'uppercase',
  },
  dateDay: { fontSize: 24, fontWeight: 700, color: '#F0EDE6', lineHeight: 1 },
  cardBody: { flex: 1, minWidth: 0 },
  evCat: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '0.15em',
    color: '#D4AF37', textTransform: 'uppercase', marginBottom: 4,
  },
  evTitle: { fontSize: 16, fontWeight: 600, color: '#F0EDE6', marginBottom: 4, outline: 'none' },
  evDesc: { fontSize: 12, color: '#888', lineHeight: 1.4, marginBottom: 6 },
  evMeta: { fontSize: 11, color: '#555', marginBottom: 6 },
  spotsBar: { height: 3, background: '#222', borderRadius: 2, overflow: 'hidden' },
  spotsFill: { height: '100%', borderRadius: 2, transition: 'width 0.5s' },
  reserveBtn: {
    padding: '8px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
    flexShrink: 0, alignSelf: 'center', cursor: 'pointer', transition: 'all 0.2s',
  },
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 100,
  },
  modal: {
    background: '#111', borderRadius: 20, padding: 24, width: '100%', maxWidth: 360,
    display: 'flex', flexDirection: 'column', gap: 12, border: '1px solid #222',
  },
  modalTitle: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: '#F0EDE6' },
  modalEv: { fontSize: 13, color: '#888' },
  input: {
    padding: '14px 16px', background: '#0a0a0a', border: '1px solid #222', borderRadius: 12,
    color: '#F0EDE6', fontSize: 15, outline: 'none',
  },
  modalBtn: {
    padding: '14px 0', borderRadius: 100, background: '#D4AF37', color: '#000',
    fontSize: 15, fontWeight: 600, textAlign: 'center', border: 'none', marginTop: 4,
  },
  modalCancel: { fontSize: 13, color: '#555', textAlign: 'center', padding: 8 },
}
