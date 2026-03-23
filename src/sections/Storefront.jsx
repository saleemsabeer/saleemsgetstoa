import { useState, useEffect } from 'react'
import Reveal from '../components/Reveal'
import LazyVideo from '../components/LazyVideo'

export default function Storefront({ data, enabled }) {
  const [heroVis, setHeroVis] = useState(false)
  useEffect(() => {
    setHeroVis(false)
    const t = setTimeout(() => setHeroVis(true), 200)
    return () => clearTimeout(t)
  }, [data.id])

  const sf = data.storefront
  const isDark = data.background === 'stars'

  return (
    <section>
      {/* ── HERO ── */}
      <div style={s.hero}>
        {sf.heroVideo ? (
          <>
            <LazyVideo src={sf.heroVideo} style={s.heroVideo} autoPlay muted loop playsInline />
            <div style={{
              ...s.heroOverlay,
              background: `linear-gradient(to bottom, ${isDark ? 'rgba(4,4,12,0.3)' : 'rgba(0,0,0,0.15)'} 0%, ${isDark ? 'rgba(4,4,12,0.75)' : 'rgba(0,0,0,0.5)'} 100%)`,
            }} />
          </>
        ) : (
          <div style={s.heroBg}>
            {/* Decorative circles for non-video heroes */}
            <div style={{ ...s.heroOrb, width: 400, height: 400, top: '-10%', right: '-5%', opacity: 0.06, background: 'var(--brand)' }} />
            <div style={{ ...s.heroOrb, width: 300, height: 300, bottom: '-8%', left: '-3%', opacity: 0.04, background: 'var(--brand)' }} />
            <div style={{ ...s.heroOrb, width: 200, height: 200, top: '20%', left: '15%', opacity: 0.03, background: 'var(--brand)' }} />
          </div>
        )}
        <div style={{
          ...s.heroContent,
          opacity: heroVis ? 1 : 0,
          transform: heroVis ? 'none' : 'translateY(24px)',
          transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.2s',
        }}>
          <div style={s.heroTag}>{sf.heroTag}</div>
          <h2 style={s.heroTitle}>
            {sf.heroTitle.split('\n').map((line, i, arr) => (
              <span key={i}>
                {i > 0 && <br />}
                {i === arr.length - 1
                  ? <em style={{ fontStyle: 'italic', color: 'var(--brand)' }}>{line}</em>
                  : line
                }
              </span>
            ))}
          </h2>
          <p style={s.heroSub}>{sf.heroSub}</p>
          <div style={s.heroBtns}>
            <button style={s.btnPrimary}>{sf.heroCta}</button>
            <button style={s.btnGhost}>{sf.heroCta2}</button>
          </div>
        </div>
      </div>

      <div style={s.sections}>
        {/* ── EVENTS (museum) ── */}
        {enabled.events && sf.events && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>UPCOMING EVENTS</div>
              <div style={s.blockTitle}>Events & Experiences</div>
              <div style={s.cardGrid}>
                {sf.events.map(ev => (
                  <div key={ev.title} style={s.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={s.cardDate}>{ev.date}</span>
                      {ev.tag && <span style={s.cardTag}>{ev.tag}</span>}
                    </div>
                    <div style={s.cardName}>{ev.title}</div>
                    <div style={s.cardMeta}>{ev.time} · {ev.price} · {ev.spots}</div>
                    <button style={s.cardBtn}>Reserve Tickets</button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── SERVICES ── */}
        {enabled.services && sf.services && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>OUR SERVICES</div>
              <div style={s.blockTitle}>Treatments & Services</div>
              <div style={s.cardGrid}>
                {sf.services.map(svc => (
                  <div key={svc.title} style={s.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={s.cardPrice}>{svc.price}</span>
                      {svc.tag && <span style={s.cardTag}>{svc.tag}</span>}
                    </div>
                    <div style={s.cardName}>{svc.title}</div>
                    <div style={s.cardMeta}>{svc.duration}</div>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 12 }}>{svc.desc}</div>
                    <button style={s.cardBtn}>Book Now</button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── PRODUCTS (ecommerce + medflow) ── */}
        {enabled.products && sf.products && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>{data.id === 'medflow' ? 'PRODUCT CATALOG' : 'SHOP'}</div>
              <div style={s.blockTitle}>{data.id === 'medflow' ? 'Medical Devices' : 'Products'}</div>
              {/* Category filters */}
              {(enabled.categories || sf.categories) && sf.categories && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                  {sf.categories.map(c => (
                    <button key={c} style={s.filterChip}>{c}</button>
                  ))}
                </div>
              )}
              <div style={{ ...s.cardGrid, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {sf.products.map(p => (
                  <div key={p.name} style={s.card}>
                    <div style={s.productImg}>
                      <span style={{ fontSize: 28, opacity: 0.2, color: 'var(--brand)' }}>◈</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={s.cardName}>{p.name}</span>
                    </div>
                    {p.tag && <span style={{ ...s.cardTag, display: 'inline-block', marginBottom: 6 }}>{p.tag}</span>}
                    <div style={s.cardPrice}>{p.price}</div>
                    {p.category && <div style={s.cardMeta}>{p.category}</div>}
                    <button style={s.cardBtn}>{data.id === 'medflow' ? 'Request Quote' : 'Add to Cart'}</button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── PIPELINE (medflow) ── */}
        {enabled.pipeline && sf.pipeline && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>SALES PIPELINE</div>
              <div style={s.blockTitle}>Pipeline Overview</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {sf.pipeline.map((stage, i) => (
                  <div key={stage.stage} style={{
                    ...s.pipelineStage,
                    flex: '1 1 160px',
                  }}>
                    <div style={{
                      width: '100%', height: 4, borderRadius: 2,
                      background: 'var(--brand)',
                      opacity: 0.2 + ((sf.pipeline.length - i) / sf.pipeline.length) * 0.8,
                      marginBottom: 12,
                    }} />
                    <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{stage.stage}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{stage.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)' }}>{stage.count} deals</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── TERRITORIES (medflow) ── */}
        {enabled.territories && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>TERRITORY MAP</div>
              <div style={s.blockTitle}>Territory Coverage</div>
              <div style={s.card}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  {[
                    { region: 'Phoenix Metro', reps: 2, accounts: 34, revenue: '$3.2M' },
                    { region: 'Tucson', reps: 1, accounts: 18, revenue: '$1.4M' },
                    { region: 'Scottsdale', reps: 1, accounts: 22, revenue: '$2.8M' },
                    { region: 'Flagstaff', reps: 1, accounts: 12, revenue: '$890K' },
                  ].map(t => (
                    <div key={t.region} style={{ padding: 16, borderRadius: 10, background: 'var(--surface2)' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{t.region}</div>
                      <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.8 }}>
                        {t.reps} reps · {t.accounts} accounts<br />
                        <span style={{ fontWeight: 600, color: 'var(--brand)' }}>{t.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* ── COMPLIANCE (medflow) ── */}
        {enabled.compliance && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>COMPLIANCE</div>
              <div style={s.blockTitle}>Compliance Center</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {[
                  { title: 'Sunshine Act Reporting', status: 'Up to Date', statusColor: 'var(--success, #4ADE80)', desc: 'All physician interactions logged and reported' },
                  { title: 'HIPAA Training', status: '3 due this month', statusColor: 'var(--warning, #FBBF24)', desc: 'Annual certification renewal tracking' },
                  { title: 'Sample Tracking', status: 'Compliant', statusColor: 'var(--success, #4ADE80)', desc: 'DEA-compliant sample distribution records' },
                ].map(c => (
                  <div key={c.title} style={s.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={s.cardName}>{c.title}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: c.statusColor }}>{c.status}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── SHOP ITEMS (museum gift shop) ── */}
        {enabled.shop && sf.shopItems && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>GIFT SHOP</div>
              <div style={s.blockTitle}>Shop</div>
              <div style={{ ...s.cardGrid, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {sf.shopItems.map(item => (
                  <div key={item.name} style={s.card}>
                    <div style={s.productImg}>
                      <span style={{ fontSize: 28, opacity: 0.2, color: 'var(--brand)' }}>✦</span>
                    </div>
                    <div style={s.cardName}>{item.name}</div>
                    <div style={s.cardPrice}>{item.price}</div>
                    <button style={s.cardBtn}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── BEFORE & AFTER ── */}
        {enabled.beforeAfter && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>RESULTS</div>
              <div style={s.blockTitle}>Before & After Gallery</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                {[
                  { treatment: 'Botox — Forehead Lines', timeframe: '2 weeks post-treatment' },
                  { treatment: 'Dermal Fillers — Lips', timeframe: '1 week post-treatment' },
                  { treatment: 'HydraFacial — Full Face', timeframe: 'Same day results' },
                ].map(ba => (
                  <div key={ba.treatment} style={s.card}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                      <div style={{ ...s.productImg, height: 120 }}>
                        <span style={{ fontSize: 12, color: 'var(--muted)' }}>Before</span>
                      </div>
                      <div style={{ ...s.productImg, height: 120 }}>
                        <span style={{ fontSize: 12, color: 'var(--brand)' }}>After</span>
                      </div>
                    </div>
                    <div style={s.cardName}>{ba.treatment}</div>
                    <div style={s.cardMeta}>{ba.timeframe}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── CART (ecommerce) ── */}
        {enabled.cart && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>SHOPPING CART</div>
              <div style={s.blockTitle}>Your Cart</div>
              <div style={s.card}>
                {[
                  { name: 'Custom Logo Tee', qty: 2, price: '$48' },
                  { name: 'Kraft Tote Bag', qty: 1, price: '$18' },
                ].map(item => (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text2)' }}>Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{item.price}</div>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>Total: $66</span>
                  <button style={s.btnPrimary}>Checkout</button>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* ── REVIEWS (ecommerce) ── */}
        {enabled.reviews && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>CUSTOMER REVIEWS</div>
              <div style={s.blockTitle}>What Customers Say</div>
              <div style={s.cardGrid}>
                {[
                  { name: 'Sarah M.', rating: 5, text: 'Amazing quality on the custom tees. Way better than expected for the price.', product: 'Custom Logo Tee' },
                  { name: 'Mike R.', rating: 5, text: 'The poster print quality is gallery-worthy. Colors are vibrant and true.', product: 'Canvas Poster 18x24' },
                  { name: 'Alex T.', rating: 4, text: 'Love the tote bags — perfect size and the kraft color is gorgeous.', product: 'Kraft Tote Bag' },
                ].map(r => (
                  <div key={r.name} style={s.card}>
                    <div style={{ marginBottom: 8 }}>
                      {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6, marginBottom: 12, fontStyle: 'italic' }}>"{r.text}"</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text2)' }}>on {r.product}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── MEMBERSHIPS ── */}
        {enabled.memberships && sf.memberships && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>MEMBERSHIPS</div>
              <div style={s.blockTitle}>Membership Plans</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                {sf.memberships.map((m, i) => (
                  <div key={m.name} style={{
                    ...s.memberCard,
                    border: i === 1 ? '2px solid var(--brand)' : '1px solid var(--border)',
                  }}>
                    {i === 1 && <div style={s.memberPopular}>MOST POPULAR</div>}
                    <div style={s.memberName}>{m.name}</div>
                    <div style={s.memberPrice}>{m.price}</div>
                    <ul style={s.memberPerks}>
                      {m.perks.map(p => (
                        <li key={p} style={s.memberPerk}>
                          <span style={{ color: 'var(--brand)', marginRight: 8, flexShrink: 0 }}>✓</span>{p}
                        </li>
                      ))}
                    </ul>
                    <button style={i === 1 ? s.btnPrimary : s.btnGhost}>Join Now</button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── DONATIONS (museum) ── */}
        {enabled.donations && sf.donationTiers && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>SUPPORT US</div>
              <div style={s.blockTitle}>Make a Donation</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                {sf.donationTiers.map(d => (
                  <div key={d.name} style={s.card}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--brand)', marginBottom: 4 }}>{d.amount}</div>
                    <div style={s.cardName}>{d.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 12 }}>{d.desc}</div>
                    <button style={s.cardBtn}>Donate</button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── BOOKING ── */}
        {enabled.booking && (
          <Reveal>
            <div style={s.block}>
              <div style={s.blockTag}>BOOK ONLINE</div>
              <div style={s.blockTitle}>Schedule Your Appointment</div>
              <div style={s.bookingForm}>
                <div style={s.bookingRow}>
                  <div style={s.bookingField}>
                    <label style={s.bookingLabel}>Service</label>
                    <select style={s.bookingInput}><option>HydraFacial</option><option>Botox</option><option>Fillers</option><option>Body Contouring</option></select>
                  </div>
                  <div style={s.bookingField}>
                    <label style={s.bookingLabel}>Provider</label>
                    <select style={s.bookingInput}><option>Any Available</option><option>Dr. Smith</option><option>Dr. Johnson</option></select>
                  </div>
                  <div style={s.bookingField}>
                    <label style={s.bookingLabel}>Date</label>
                    <input type="date" style={s.bookingInput} />
                  </div>
                  <div style={s.bookingField}>
                    <label style={s.bookingLabel}>Time</label>
                    <select style={s.bookingInput}><option>10:00 AM</option><option>11:00 AM</option><option>1:00 PM</option><option>2:00 PM</option><option>3:00 PM</option></select>
                  </div>
                </div>
                <button style={s.btnPrimary}>Book Appointment</button>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

const s = {
  hero: { position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  heroVideo: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
  heroOverlay: { position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' },
  heroBg: { position: 'absolute', inset: 0, background: 'linear-gradient(160deg, var(--bg) 0%, var(--bg2) 40%, var(--bg) 100%)', overflow: 'hidden' },
  heroOrb: { position: 'absolute', borderRadius: '50%', filter: 'blur(80px)' },
  heroContent: { position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 700, padding: '0 24px' },
  heroTag: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em', color: 'var(--brand)', marginBottom: 20 },
  heroTitle: { fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, lineHeight: 1.15, color: 'var(--text)', margin: '0 0 20px' },
  heroSub: { fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.8vw, 17px)', lineHeight: 1.7, color: 'var(--text2)', margin: '0 0 32px' },
  heroBtns: { display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: { display: 'inline-block', padding: '14px 32px', background: 'var(--brand)', color: 'var(--bg)', fontSize: 13, fontWeight: 600, borderRadius: 100, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', letterSpacing: '0.02em', transition: 'opacity 0.3s ease' },
  btnGhost: { display: 'inline-block', padding: '14px 32px', background: 'transparent', color: 'var(--brand)', fontSize: 13, fontWeight: 500, borderRadius: 100, border: '1px solid var(--brand)', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'background 0.3s ease, color 0.3s ease' },
  sections: { maxWidth: 1100, margin: '0 auto', padding: '60px 24px 80px' },
  block: { marginBottom: 64 },
  blockTag: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--brand)', marginBottom: 8 },
  blockTitle: { fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 500, color: 'var(--text)', marginBottom: 24 },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 },
  card: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 },
  cardDate: { fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' },
  cardTag: { fontSize: 9, letterSpacing: '0.1em', padding: '3px 8px', borderRadius: 100, background: 'var(--brand)', color: 'var(--bg)', fontWeight: 700, textTransform: 'uppercase' },
  cardName: { fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 4 },
  cardPrice: { fontSize: 15, fontWeight: 700, color: 'var(--brand)', marginBottom: 4 },
  cardMeta: { fontSize: 12, color: 'var(--text2)', marginBottom: 12 },
  cardBtn: { padding: '10px 20px', borderRadius: 100, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'border-color 0.3s ease', width: '100%' },
  filterChip: { padding: '6px 16px', borderRadius: 100, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)' },
  productImg: { height: 100, borderRadius: 10, background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  pipelineStage: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 20, textAlign: 'center' },
  memberCard: { background: 'var(--surface)', borderRadius: 16, padding: 28, position: 'relative', textAlign: 'center' },
  memberPopular: { position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--brand)', color: 'var(--bg)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', padding: '4px 14px', borderRadius: 100, whiteSpace: 'nowrap' },
  memberName: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--text)', marginBottom: 4 },
  memberPrice: { fontSize: 28, fontWeight: 700, color: 'var(--brand)', marginBottom: 16 },
  memberPerks: { listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: 20 },
  memberPerk: { fontSize: 13, color: 'var(--text2)', padding: '6px 0', display: 'flex', alignItems: 'center' },
  bookingForm: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 },
  bookingRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 },
  bookingField: { display: 'flex', flexDirection: 'column', gap: 6 },
  bookingLabel: { fontSize: 12, fontWeight: 600, color: 'var(--text)', letterSpacing: '0.05em' },
  bookingInput: { padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-body)' },
}
