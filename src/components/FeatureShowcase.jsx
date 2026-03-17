import { useState, useRef, useCallback, useEffect } from 'react'

/* ═══════════════════════════════════════════════════════
   BROWSER FRAME — wraps every mini-demo
   ═══════════════════════════════════════════════════════ */
function BrowserFrame({ url, children }) {
  return (
    <div style={bf.wrap}>
      <div style={bf.bar}>
        <div style={bf.dots}>
          <span style={{ ...bf.dot, background: '#ff5f57' }} />
          <span style={{ ...bf.dot, background: '#febc2e' }} />
          <span style={{ ...bf.dot, background: '#28c840' }} />
        </div>
        <div style={bf.url}>{url}</div>
        <div style={{ width: 48 }} />
      </div>
      <div style={bf.body}>
        {children}
      </div>
    </div>
  )
}
const bf = {
  wrap: { borderRadius: 12, overflow: 'hidden', border: '1px solid #E5E5E5', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' },
  bar: { background: '#F5F5F5', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 },
  dots: { display: 'flex', gap: 5 },
  dot: { width: 10, height: 10, borderRadius: '50%', display: 'block' },
  url: { fontFamily: 'var(--font-mono)', fontSize: 12, color: '#999', flex: 1, textAlign: 'center' },
  body: { height: 280, overflow: 'hidden', position: 'relative', padding: 16, background: '#FAFAF8' },
}

/* ─── Shared pill button ─── */
function Pill({ children, active, onClick, small }) {
  return (
    <button onClick={onClick} style={{
      padding: small ? '8px 14px' : '10px 18px',
      borderRadius: 100,
      fontSize: small ? 12 : 13,
      fontWeight: 600,
      fontFamily: 'var(--font-ui)',
      background: active ? 'var(--brand)' : '#fff',
      color: active ? '#000' : '#666',
      border: active ? 'none' : '1px solid #E5E5E5',
      cursor: 'pointer',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </button>
  )
}

/* ═══════════════════════════════════════════════════════
   1. ONLINE BOOKING
   ═══════════════════════════════════════════════════════ */
function BookingDemo() {
  const [step, setStep] = useState(0)
  const [service, setService] = useState(null)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [booked, setBooked] = useState(false)

  const services = ['Botox', 'Filler', 'HydraFacial']
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1)
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  })
  const times = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM']

  const handleBook = () => { setBooked(true); setTimeout(() => { setBooked(false); setStep(0); setService(null); setDate(null); setTime(null) }, 2000) }

  if (booked) return (
    <BrowserFrame url="book.hausofc.com">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>&#10003;</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#111' }}>Booked!</div>
        <div style={{ fontSize: 13, color: '#666' }}>{service} &middot; {date} &middot; {time}</div>
      </div>
    </BrowserFrame>
  )

  return (
    <BrowserFrame url="book.hausofc.com">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
        {/* Steps indicator */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {['Service', 'Date', 'Time'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', fontSize: 11, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: step >= i ? 'var(--brand)' : '#F0F0F0',
                color: step >= i ? '#000' : '#999',
              }}>{i + 1}</div>
              <span style={{ fontSize: 12, color: step >= i ? '#111' : '#999', fontFamily: 'var(--font-ui)' }}>{s}</span>
              {i < 2 && <div style={{ width: 20, height: 1, background: '#E5E5E5' }} />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <>
            <div style={{ fontSize: 13, color: '#666', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>SELECT SERVICE</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {services.map(s => <Pill key={s} active={service === s} onClick={() => { setService(s); setTimeout(() => setStep(1), 300) }}>{s}</Pill>)}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div style={{ fontSize: 13, color: '#666', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>SELECT DATE</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {dates.map(d => <Pill key={d} small active={date === d} onClick={() => { setDate(d); setTimeout(() => setStep(2), 300) }}>{d}</Pill>)}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ fontSize: 13, color: '#666', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>SELECT TIME</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {times.map(t => <Pill key={t} small active={time === t} onClick={() => setTime(t)}>{t}</Pill>)}
            </div>
            {time && (
              <button onClick={handleBook} style={{
                marginTop: 4, padding: '10px 24px', borderRadius: 100,
                background: 'linear-gradient(135deg, var(--brand), var(--brand-hover))',
                color: '#000', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-ui)',
                boxShadow: '0 0 20px var(--brand-glow)',
              }}>Book Appointment</button>
            )}
          </>
        )}
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════
   2. DM INBOX
   ═══════════════════════════════════════════════════════ */
function InboxDemo() {
  const [selected, setSelected] = useState(0)
  const [threads, setThreads] = useState([
    { name: 'Sarah M.', platform: 'IG', unread: true, preview: 'How much for lip filler?', msgs: [
      { from: 'patient', text: 'Hi! How much for lip filler?' },
      { from: 'staff', text: 'Hi Sarah! Our lip filler starts at $650. Would you like to book a consult?' },
    ]},
    { name: 'Jess K.', platform: 'TT', unread: true, preview: 'Saw your Botox reel!!', msgs: [
      { from: 'patient', text: 'Saw your Botox reel!! Do you have openings this week?' },
      { from: 'staff', text: 'Yes! We have Thursday at 2pm and Friday at 10am.' },
      { from: 'patient', text: 'Thursday works!' },
    ]},
    { name: 'Mike R.', platform: 'IG', unread: false, preview: 'Thanks for the follow-up', msgs: [
      { from: 'patient', text: 'Thanks for the follow-up!' },
      { from: 'staff', text: 'Of course! Let us know if you have any questions about aftercare.' },
    ]},
  ])
  const [reply, setReply] = useState('')

  const sendReply = () => {
    if (!reply.trim()) return
    setThreads(prev => prev.map((t, i) => i === selected
      ? { ...t, msgs: [...t.msgs, { from: 'staff', text: reply }], preview: reply }
      : t
    ))
    setReply('')
  }

  return (
    <BrowserFrame url="inbox.hausofc.com">
      <div style={{ display: 'flex', height: '100%', gap: 0, margin: -16 }}>
        {/* Left panel */}
        <div style={{ width: 140, borderRight: '1px solid #E5E5E5', padding: '8px 0', display: 'flex', flexDirection: 'column', gap: 0, flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 8, padding: '8px 10px 8px', borderBottom: '1px solid #E5E5E5' }}>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', background: 'rgba(225,48,108,0.1)', color: '#E1306C', padding: '2px 6px', borderRadius: 4 }}>IG: $47K</span>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', background: '#F0F0F0', color: '#666', padding: '2px 6px', borderRadius: 4 }}>TT: $8.4K</span>
          </div>
          {threads.map((t, i) => (
            <button key={i} onClick={() => { setSelected(i); setThreads(prev => prev.map((th, j) => j === i ? { ...th, unread: false } : th)) }} style={{
              padding: '10px 10px', textAlign: 'left', cursor: 'pointer',
              background: selected === i ? '#fff' : 'transparent',
              borderLeft: selected === i ? '2px solid var(--brand)' : '2px solid transparent',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>{t.name}</span>
                <span style={{
                  fontSize: 9, padding: '1px 4px', borderRadius: 3,
                  background: t.platform === 'IG' ? 'rgba(225,48,108,0.1)' : '#F0F0F0',
                  color: t.platform === 'IG' ? '#E1306C' : '#666',
                }}>{t.platform}</span>
                {t.unread && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--brand)', marginLeft: 'auto' }} />}
              </div>
              <div style={{ fontSize: 11, color: '#999', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 110 }}>{t.preview}</div>
            </button>
          ))}
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 8, fontFamily: 'var(--font-ui)' }}>{threads[selected].name}</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto' }}>
            {threads[selected].msgs.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.from === 'staff' ? 'flex-end' : 'flex-start',
                background: m.from === 'staff' ? 'var(--brand)' : '#F0F0F0',
                color: m.from === 'staff' ? '#000' : '#111',
                padding: '8px 12px', borderRadius: 10, fontSize: 12, maxWidth: '80%',
                fontFamily: 'var(--font-ui)',
              }}>{m.text}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <input
              value={reply} onChange={e => setReply(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendReply()}
              placeholder="Reply..."
              style={{
                flex: 1, padding: '8px 12px', borderRadius: 8,
                background: '#fff', border: '1px solid #E5E5E5',
                color: '#111', fontSize: 12, fontFamily: 'var(--font-ui)', outline: 'none',
              }}
            />
            <button onClick={sendReply} style={{
              padding: '8px 16px', borderRadius: 8, background: 'var(--brand)',
              color: '#000', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-ui)',
            }}>Send</button>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════
   3. CLINICAL CHART — FACE MAP
   ═══════════════════════════════════════════════════════ */
function FaceMapDemo() {
  const [activeZone, setActiveZone] = useState(null)
  const zones = [
    { id: 'forehead', label: 'Forehead', detail: '20u Botox', cx: 100, cy: 52, rx: 38, ry: 14 },
    { id: 'crows-l', label: 'Crow\'s Feet L', detail: '10u Botox', cx: 52, cy: 88, rx: 10, ry: 12 },
    { id: 'crows-r', label: 'Crow\'s Feet R', detail: '10u Botox', cx: 148, cy: 88, rx: 10, ry: 12 },
    { id: 'cheeks', label: 'Cheeks', detail: '1ml Filler', cx: 100, cy: 120, rx: 44, ry: 16 },
    { id: 'lips', label: 'Lips', detail: '1ml Juvederm', cx: 100, cy: 152, rx: 22, ry: 10 },
  ]
  const soap = [
    { letter: 'S', text: 'Pt reports wanting natural results' },
    { letter: 'O', text: 'Mild asymmetry noted in glabella' },
    { letter: 'A', text: 'Good candidate for neuromodulator' },
    { letter: 'P', text: '20u Botox forehead, 10u crow\'s feet' },
  ]

  return (
    <BrowserFrame url="chart.hausofc.com">
      <div style={{ display: 'flex', gap: 12, height: '100%' }}>
        {/* Face SVG */}
        <div style={{ flex: '0 0 200px', position: 'relative' }}>
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: 'auto' }}>
            {/* Face outline */}
            <ellipse cx="100" cy="105" rx="60" ry="78" fill="none" stroke="#E5E5E5" strokeWidth="1.5" />
            {/* Hairline */}
            <path d="M50 65 Q70 25 100 20 Q130 25 150 65" fill="none" stroke="#E5E5E5" strokeWidth="1" />
            {/* Eyes */}
            <ellipse cx="78" cy="88" rx="12" ry="6" fill="none" stroke="#ddd" strokeWidth="1" />
            <ellipse cx="122" cy="88" rx="12" ry="6" fill="none" stroke="#ddd" strokeWidth="1" />
            {/* Nose */}
            <path d="M100 95 L95 120 Q100 124 105 120 L100 95" fill="none" stroke="#E5E5E5" strokeWidth="1" />
            {/* Mouth */}
            <path d="M82 148 Q100 158 118 148" fill="none" stroke="#E5E5E5" strokeWidth="1" />
            {/* Zones */}
            {zones.map(z => (
              <ellipse key={z.id} cx={z.cx} cy={z.cy} rx={z.rx} ry={z.ry}
                fill={activeZone === z.id ? 'rgba(212,175,55,0.12)' : 'transparent'}
                stroke={activeZone === z.id ? 'var(--brand)' : '#E5E5E5'}
                strokeWidth={activeZone === z.id ? 2 : 1}
                strokeDasharray={activeZone === z.id ? 'none' : '3 3'}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => setActiveZone(activeZone === z.id ? null : z.id)}
              />
            ))}
          </svg>
          {/* Popup */}
          {activeZone && (() => {
            const z = zones.find(z => z.id === activeZone)
            return (
              <div style={{
                position: 'absolute', left: z.cx - 40, top: z.cy + z.ry + 6,
                background: '#fff', border: '1px solid var(--brand)',
                borderRadius: 8, padding: '8px 12px', zIndex: 5,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}>
                <div style={{ fontSize: 11, color: 'var(--brand)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{z.label}</div>
                <div style={{ fontSize: 12, color: '#111', fontFamily: 'var(--font-ui)' }}>{z.detail}</div>
              </div>
            )
          })()}
        </div>

        {/* SOAP Notes */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: '#666', marginBottom: 4 }}>SOAP NOTES</div>
          {soap.map(s => (
            <div key={s.letter} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{
                width: 22, height: 22, borderRadius: 4, flexShrink: 0,
                background: '#fff', border: '1px solid #E5E5E5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: 'var(--brand)', fontFamily: 'var(--font-mono)',
              }}>{s.letter}</div>
              <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5, fontFamily: 'var(--font-ui)' }}>{s.text}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════
   4. DASHBOARD KPIs
   ═══════════════════════════════════════════════════════ */
function DashboardDemo() {
  const kpis = [
    { label: 'Revenue', value: '$47,200', delta: '+12%', spark: [20, 35, 28, 40, 38, 52, 47] },
    { label: 'Appts Today', value: '8', delta: '+3', spark: [5, 4, 7, 6, 8, 5, 8] },
    { label: 'Patients', value: '142', delta: '+6', spark: [120, 125, 128, 130, 135, 138, 142] },
    { label: 'Alerts', value: '3', delta: '', spark: [1, 0, 2, 1, 3, 2, 3] },
  ]
  const feed = [
    { time: '2m ago', text: 'Sarah M. checked in for Botox', color: 'var(--success)' },
    { time: '18m ago', text: 'New booking: HydraFacial tomorrow', color: 'var(--brand)' },
    { time: '1h ago', text: 'Low inventory alert: Juvederm', color: 'var(--warning)' },
  ]

  const sparkline = (data, w = 60, h = 20) => {
    const max = Math.max(...data), min = Math.min(...data)
    const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(' ')
    return (
      <svg width={w} height={h} style={{ display: 'block' }}>
        <polyline points={points} fill="none" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <BrowserFrame url="dashboard.hausofc.com">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {kpis.map(k => (
            <div key={k.label} style={{
              background: '#fff', border: '1px solid #E5E5E5',
              borderRadius: 8, padding: '10px 10px',
            }}>
              <div style={{ fontSize: 10, color: '#666', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: 4 }}>{k.label.toUpperCase()}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111', fontFamily: 'var(--font-ui)' }}>{k.value}</div>
                {k.delta && <div style={{ fontSize: 10, color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>{k.delta}</div>}
              </div>
              <div style={{ marginTop: 6 }}>{sparkline(k.spark)}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#666', letterSpacing: '0.1em' }}>ACTIVITY</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {feed.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: f.color, flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: '#111', fontFamily: 'var(--font-ui)', flex: 1 }}>{f.text}</div>
              <div style={{ fontSize: 10, color: '#999', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{f.time}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════
   5. PATIENT CHECK-IN
   ═══════════════════════════════════════════════════════ */
function CheckInDemo() {
  const statuses = ['Not Arrived', 'Checked In', 'With Provider', 'Complete']
  const colors = ['#999', 'var(--brand)', '#0ea5e9', 'var(--success)']
  const bgs = ['#fff', 'rgba(212,175,55,0.08)', 'rgba(14,165,233,0.08)', 'rgba(74,222,128,0.08)']

  const [patients, setPatients] = useState([
    { name: 'Sarah Mitchell', service: 'Botox — 10:00 AM', status: 0 },
    { name: 'Jessica Kim', service: 'HydraFacial — 10:30 AM', status: 0 },
    { name: 'David Chen', service: 'Filler — 11:00 AM', status: 0 },
  ])

  const advance = (idx) => {
    setPatients(prev => prev.map((p, i) =>
      i === idx ? { ...p, status: (p.status + 1) % 4 } : p
    ))
  }

  return (
    <BrowserFrame url="checkin.hausofc.com">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
        <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#666', letterSpacing: '0.1em' }}>TODAY'S PATIENTS</div>
        {patients.map((p, i) => (
          <div key={i} onClick={() => advance(i)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
            background: bgs[p.status], border: `1px solid ${p.status > 0 ? colors[p.status] : '#E5E5E5'}`,
            transition: 'all 0.3s',
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111', fontFamily: 'var(--font-ui)' }}>{p.name}</div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>{p.service}</div>
            </div>
            <div style={{
              padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700,
              fontFamily: 'var(--font-mono)', color: colors[p.status],
              background: '#F0F0F0', transition: 'all 0.3s',
            }}>{statuses[p.status]}</div>
          </div>
        ))}
        <div style={{ fontSize: 10, color: '#999', fontFamily: 'var(--font-ui)', textAlign: 'center', marginTop: 'auto' }}>Click a patient to advance status</div>
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════
   6. BEFORE & AFTER GALLERY
   ═══════════════════════════════════════════════════════ */
function BeforeAfterDemo() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const handleMove = useCallback((clientX) => {
    if (!dragging.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(5, Math.min(95, x)))
  }, [])

  useEffect(() => {
    const up = () => { dragging.current = false }
    const move = (e) => handleMove(e.clientX || (e.touches && e.touches[0].clientX))
    window.addEventListener('mouseup', up)
    window.addEventListener('mousemove', move)
    window.addEventListener('touchend', up)
    window.addEventListener('touchmove', move)
    return () => { window.removeEventListener('mouseup', up); window.removeEventListener('mousemove', move); window.removeEventListener('touchend', up); window.removeEventListener('touchmove', move) }
  }, [handleMove])

  return (
    <BrowserFrame url="gallery.hausofc.com">
      <div ref={containerRef} style={{ position: 'relative', height: '100%', margin: -16, overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none' }}
        onMouseDown={() => { dragging.current = true }}
        onTouchStart={() => { dragging.current = true }}
      >
        {/* Before side */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #f0eee8, #e8e4de)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#E5E5E5', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7"/></svg>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#666', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}>BEFORE</div>
          </div>
        </div>

        {/* After side (clipped) */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #e8f0e8, #deeede)', clipPath: `inset(0 ${100 - pos}% 0 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: dragging.current ? 'none' : 'clip-path 0.1s' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7"/></svg>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--success)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}>AFTER</div>
          </div>
        </div>

        {/* Slider handle */}
        <div style={{
          position: 'absolute', left: `${pos}%`, top: 0, bottom: 0,
          width: 2, background: 'var(--brand)', transform: 'translateX(-50%)',
          boxShadow: '0 0 12px var(--brand-glow)',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 32, height: 32, borderRadius: '50%', background: 'var(--brand)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px var(--brand-glow)',
          }}>
            <span style={{ fontSize: 14, color: '#000', fontWeight: 700 }}>&harr;</span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════
   7. EVENT BOOKING
   ═══════════════════════════════════════════════════════ */
function EventBookingDemo() {
  const [step, setStep] = useState(0) // 0=card, 1=form, 2=confirmed
  const [spots, setSpots] = useState(12)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const reserve = () => {
    if (!name.trim() || !email.trim()) return
    setSpots(s => s - 1)
    setStep(2)
    setTimeout(() => { setStep(0); setName(''); setEmail('') }, 2500)
  }

  return (
    <BrowserFrame url="events.darksky.org">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
        <div style={{
          background: '#fff',
          borderRadius: 10, padding: 16, border: '1px solid #E5E5E5',
        }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--brand)', letterSpacing: '0.15em', marginBottom: 6 }}>UPCOMING EVENT</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#111', marginBottom: 4 }}>Star Party</div>
          <div style={{ fontSize: 13, color: '#666', fontFamily: 'var(--font-ui)', marginBottom: 10 }}>March 25 &middot; 8:00 PM &middot; {spots} spots left</div>

          {/* Capacity bar */}
          <div style={{ height: 4, borderRadius: 2, background: '#F0F0F0', marginBottom: 12, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${((20 - spots) / 20) * 100}%`, background: 'var(--brand)', borderRadius: 2, transition: 'width 0.5s' }} />
          </div>

          {step === 0 && (
            <button onClick={() => setStep(1)} style={{
              width: '100%', padding: '10px', borderRadius: 8,
              background: 'linear-gradient(135deg, var(--brand), var(--brand-hover))',
              color: '#000', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-ui)',
            }}>Reserve Spot</button>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                style={{ padding: '8px 12px', borderRadius: 6, background: '#fff', border: '1px solid #E5E5E5', color: '#111', fontSize: 13, fontFamily: 'var(--font-ui)', outline: 'none' }} />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
                style={{ padding: '8px 12px', borderRadius: 6, background: '#fff', border: '1px solid #E5E5E5', color: '#111', fontSize: 13, fontFamily: 'var(--font-ui)', outline: 'none' }} />
              <button onClick={reserve} style={{
                padding: '10px', borderRadius: 8,
                background: 'linear-gradient(135deg, var(--brand), var(--brand-hover))',
                color: '#000', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-ui)',
              }}>Confirm Reservation</button>
            </div>
          )}

          {step === 2 && (
            <div style={{ textAlign: 'center', padding: 10 }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>&#10003;</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)', fontFamily: 'var(--font-ui)' }}>Reserved!</div>
              <div style={{ fontSize: 12, color: '#666' }}>Confirmation sent to {email}</div>
            </div>
          )}
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════
   8. POS CHECKOUT
   ═══════════════════════════════════════════════════════ */
function POSDemo() {
  const items = [
    { name: 'Botox (20u)', price: 392 },
    { name: 'HydraFacial', price: 220 },
  ]
  const tipOptions = [15, 18, 20]
  const [tipPct, setTipPct] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [paid, setPaid] = useState(false)

  const subtotal = items.reduce((a, b) => a + b.price, 0)
  const tip = tipPct ? Math.round(subtotal * tipPct / 100) : 0
  const total = subtotal + tip

  const pay = () => {
    setProcessing(true)
    setTimeout(() => { setProcessing(false); setPaid(true) }, 1500)
    setTimeout(() => { setPaid(false); setTipPct(null) }, 4000)
  }

  if (paid) return (
    <BrowserFrame url="pos.hausofc.com">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 8 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: 'var(--success)' }}>&#10003;</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#111' }}>Paid</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--brand)', fontFamily: 'var(--font-ui)' }}>${total.toLocaleString()}</div>
      </div>
    </BrowserFrame>
  )

  return (
    <BrowserFrame url="pos.hausofc.com">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
        <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#666', letterSpacing: '0.1em' }}>CHECKOUT</div>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #E5E5E5' }}>
            <span style={{ fontSize: 13, color: '#111', fontFamily: 'var(--font-ui)' }}>{item.name}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111', fontFamily: 'var(--font-mono)' }}>${item.price}</span>
          </div>
        ))}
        <div>
          <div style={{ fontSize: 11, color: '#666', fontFamily: 'var(--font-mono)', marginBottom: 6, letterSpacing: '0.1em' }}>ADD TIP</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {tipOptions.map(t => (
              <Pill key={t} small active={tipPct === t} onClick={() => setTipPct(tipPct === t ? null : t)}>{t}%{tipPct === t ? ` ($${Math.round(subtotal * t / 100)})` : ''}</Pill>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 'auto', borderTop: '1px solid #E5E5E5', paddingTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#111', fontFamily: 'var(--font-ui)' }}>Total</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--brand)', fontFamily: 'var(--font-mono)' }}>${total.toLocaleString()}</span>
          </div>
          <button onClick={pay} disabled={processing} style={{
            width: '100%', padding: '12px', borderRadius: 8,
            background: processing ? '#F0F0F0' : 'linear-gradient(135deg, var(--brand), var(--brand-hover))',
            color: processing ? '#666' : '#000', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-ui)',
            opacity: processing ? 0.7 : 1,
          }}>
            {processing ? 'Processing...' : 'Process Payment'}
          </button>
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════
   9. LIVE CMS EDIT MODE
   ═══════════════════════════════════════════════════════ */
function CMSDemo() {
  const [editing, setEditing] = useState(false)
  const [headline, setHeadline] = useState('Explore the Night Sky')
  const [paragraph, setParagraph] = useState('Join us for stargazing events, workshops, and telescope nights in the heart of the Sonoran Desert.')

  return (
    <BrowserFrame url="cms.darksky.org">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
        {/* Toggle */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => setEditing(!editing)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 6,
            background: editing ? 'var(--brand)' : '#F0F0F0',
            color: editing ? '#000' : '#666', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            {editing ? 'EDITING' : 'EDIT'}
          </button>
        </div>

        {/* Preview area */}
        <div style={{
          background: editing ? '#FAFAF8' : 'transparent',
          borderRadius: 8, padding: 12, transition: 'all 0.3s',
          border: editing ? '1px dashed rgba(212,175,55,0.4)' : '1px solid transparent',
        }}>
          <div
            contentEditable={editing}
            suppressContentEditableWarning
            onBlur={e => setHeadline(e.target.innerText)}
            style={{
              fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, color: '#111',
              marginBottom: 8, outline: 'none',
              textDecoration: editing ? `underline dashed rgba(212,175,55,0.5)` : 'none',
              textDecorationOffset: '4px',
            }}
          >{headline}</div>
          <div
            contentEditable={editing}
            suppressContentEditableWarning
            onBlur={e => setParagraph(e.target.innerText)}
            style={{
              fontSize: 13, lineHeight: 1.6, color: '#666', outline: 'none',
              fontFamily: 'var(--font-ui)',
              textDecoration: editing ? `underline dashed rgba(212,175,55,0.5)` : 'none',
              textDecorationOffset: '4px',
            }}
          >{paragraph}</div>
        </div>

        {editing && (
          <div style={{
            fontSize: 11, color: 'var(--brand)', fontFamily: 'var(--font-mono)',
            textAlign: 'center', background: 'rgba(212,175,55,0.08)',
            padding: '6px 10px', borderRadius: 4,
          }}>Click any text above to edit it live</div>
        )}
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════
   10. MEMBERSHIP TIERS
   ═══════════════════════════════════════════════════════ */
function MembershipDemo() {
  const [selected, setSelected] = useState(null)
  const tiers = [
    { name: 'Silver', price: 99, perks: ['10% off all services', 'Priority booking', 'Birthday facial'] },
    { name: 'Gold', price: 199, perks: ['20% off all services', 'Monthly HydraFacial', 'VIP lounge access'] },
    { name: 'Platinum', price: 349, perks: ['30% off all services', 'Monthly Botox included', 'Personal concierge'] },
  ]

  return (
    <BrowserFrame url="members.hausofc.com">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
        <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#666', letterSpacing: '0.1em', textAlign: 'center' }}>CHOOSE YOUR TIER</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, flex: 1 }}>
          {tiers.map((t, i) => (
            <button key={t.name} onClick={() => setSelected(i)} style={{
              background: selected === i ? 'rgba(212,175,55,0.06)' : '#fff',
              border: selected === i ? '1.5px solid var(--brand)' : '1px solid #E5E5E5',
              borderRadius: 10, padding: '14px 10px', cursor: 'pointer',
              transition: 'all 0.25s', textAlign: 'center',
              transform: selected === i ? 'scale(1.03)' : 'scale(1)',
              boxShadow: selected === i ? '0 0 20px var(--brand-glow)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: selected === i ? 'var(--brand)' : '#666', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>{t.name.toUpperCase()}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#111', fontFamily: 'var(--font-ui)' }}>${t.price}<span style={{ fontSize: 12, fontWeight: 400, color: '#666' }}>/mo</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {t.perks.map(p => (
                  <div key={p} style={{ fontSize: 10, color: '#666', fontFamily: 'var(--font-ui)', display: 'flex', alignItems: 'center', gap: 4, textAlign: 'left' }}>
                    <span style={{ color: 'var(--brand)', fontSize: 10, flexShrink: 0 }}>&#10003;</span>
                    {p}
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════
   FEATURE SHOWCASE — MAIN EXPORT
   ═══════════════════════════════════════════════════════ */
const demos = [
  {
    title: 'Online Booking',
    tag: 'MEDSPA',
    Component: BookingDemo,
    bullets: ['Multi-step appointment flow', 'Service, date & time selection', 'Real-time confirmation'],
  },
  {
    title: 'DM Inbox',
    tag: 'MEDSPA',
    Component: InboxDemo,
    bullets: ['Unified IG + TikTok messages', 'Revenue tracking by platform', 'Reply in real-time'],
  },
  {
    title: 'Clinical Face Map',
    tag: 'MEDSPA',
    Component: FaceMapDemo,
    bullets: ['Interactive injection zones', 'Click-to-view treatment data', 'SOAP notes integration'],
  },
  {
    title: 'Dashboard KPIs',
    tag: 'MEDSPA / DARK SKY',
    Component: DashboardDemo,
    bullets: ['Revenue & appointment metrics', 'Live sparkline charts', 'Real-time activity feed'],
  },
  {
    title: 'Patient Check-In',
    tag: 'MEDSPA',
    Component: CheckInDemo,
    bullets: ['Status flow tracking', 'Click-to-advance workflow', 'Color-coded patient states'],
  },
  {
    title: 'Before & After',
    tag: 'MEDSPA',
    Component: BeforeAfterDemo,
    bullets: ['Drag-to-reveal slider', 'Side-by-side comparison', 'Gallery management'],
  },
  {
    title: 'Event Booking',
    tag: 'DARK SKY',
    Component: EventBookingDemo,
    bullets: ['Capacity tracking bar', 'Inline reservation form', 'Instant confirmation'],
  },
  {
    title: 'POS Checkout',
    tag: 'MEDSPA / DARK SKY',
    Component: POSDemo,
    bullets: ['Line-item breakdown', 'Tip selection with live total', 'Payment processing flow'],
  },
  {
    title: 'Live CMS',
    tag: 'DARK SKY',
    Component: CMSDemo,
    bullets: ['Inline content editing', 'Toggle edit mode on/off', 'No developer needed'],
  },
  {
    title: 'Membership Tiers',
    tag: 'MEDSPA',
    Component: MembershipDemo,
    bullets: ['Tier comparison cards', 'Interactive selection', 'Per-tier perk breakdown'],
  },
]

export default function FeatureShowcase() {
  const ref = useRef(null)
  const [vis, setVis] = useState({})

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fs-section')
    if (!els) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setVis(p => ({ ...p, [e.target.dataset.idx]: true }))
      })
    }, { threshold: 0.15 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="features" ref={ref} style={{ padding: '100px 0 40px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 80, padding: '0 48px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.25em',
          color: 'var(--brand)', marginBottom: 16,
        }}>SEE IT IN ACTION</div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 400, lineHeight: 1.15, color: 'var(--text)', margin: '0 0 16px',
        }}>Every Feature, Live</h2>
        <p style={{
          fontFamily: 'var(--font-ui)', fontSize: 16, lineHeight: 1.7,
          color: 'var(--text2)', maxWidth: 520, margin: '0 auto',
        }}>
          Don't take our word for it. Click, type, drag — every demo below is real working software.
        </p>
      </div>

      {/* Full-width alternating sections */}
      {demos.map((demo, i) => {
        const isEven = i % 2 === 0
        const visible = vis[i]
        return (
          <div key={i} className="fs-section" data-idx={i} style={{
            maxWidth: 1100, margin: '0 auto', padding: '0 48px 80px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
            alignItems: 'center',
            direction: isEven ? 'ltr' : 'rtl',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)',
          }}>
            {/* Text side */}
            <div style={{ direction: 'ltr' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em',
                color: 'var(--brand)', padding: '6px 12px', borderRadius: 4,
                background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.12)',
              }}>{demo.tag}</span>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 400, color: 'var(--text)', margin: '16px 0 12px',
                lineHeight: 1.15,
              }}>{demo.title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {demo.bullets.map(b => (
                  <div key={b} style={{
                    fontSize: 14, color: 'var(--text2)', fontFamily: 'var(--font-ui)',
                    display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.5,
                  }}>
                    <span style={{ color: 'var(--brand)', fontSize: 12, marginTop: 3, flexShrink: 0 }}>✦</span>
                    {b}
                  </div>
                ))}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em',
                color: '#999', paddingTop: 8, borderTop: '1px solid #E5E5E5',
              }}>
                ↑ Try it — this demo is fully interactive
              </div>
            </div>

            {/* Demo side */}
            <div style={{ direction: 'ltr' }}>
              <div style={{
                borderRadius: 14, overflow: 'hidden',
                border: '1px solid #E5E5E5',
                boxShadow: '0 20px 60px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.06)' }}
              >
                {/* Browser chrome */}
                <div style={{
                  background: '#F5F5F5', padding: '8px 14px',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E' }} />
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28C840' }} />
                  </div>
                  <div style={{
                    flex: 1, background: '#fff', borderRadius: 6,
                    padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: '#999', textAlign: 'center', border: '1px solid #E5E5E5',
                  }}>yoursite.com/{demo.tag.toLowerCase().replace(/\s+/g, '-')}</div>
                </div>
                {/* Demo content */}
                <div style={{ minHeight: 340, background: '#FAFAF8', padding: 20 }}>
                  <demo.Component />
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <style>{`
        @media (max-width: 768px) {
          .fs-section {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
            gap: 24px !important;
            padding: 0 20px 60px !important;
          }
        }
      `}</style>
    </section>
  )
}
