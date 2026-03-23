import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import LazyVideo from '../components/LazyVideo'
import { LandingSelector, MiniSwitcher } from '../components/IndustrySelector'
import { industries, getIndustry } from '../industries/index'

/* Lazy-load COPIES of the demos (standalone, no router/store deps) */
const MuseumShowcase = lazy(() => import('../showcases/MuseumShowcase'))

const V = 'https://ssdozdtdcrkaoayzhrsa.supabase.co/storage/v1/object/public/videos/'

/* ── Reveal on scroll ── */
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

/* ── Video Section ── */
function VideoSection({ src, children }) {
  return (
    <div style={vs.wrap}>
      <div style={vs.clip}>
        <LazyVideo src={src} style={vs.video} autoPlay muted loop playsInline />
      </div>
      <div style={vs.overlayTop} />
      <div style={vs.overlayBottom} />
      <div style={vs.overlay} />
      <div style={vs.content}>{children}</div>
    </div>
  )
}
const vs = {
  wrap: { position: 'relative', minHeight: 500, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  clip: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  video: { width: '100%', height: '100%', objectFit: 'cover' },
  overlayTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(to bottom, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' },
  overlayBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(to top, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' },
  overlay: { position: 'absolute', inset: 0, background: 'rgba(4,4,12,0.35)', zIndex: 1 },
  content: { position: 'relative', zIndex: 3, width: '100%', maxWidth: 1200, margin: '0 auto', padding: '80px 48px' },
}

/* ── Glassmorphism Nav ── */
function Nav({ selected, onReset }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      ...navS.bar,
      background: scrolled ? 'rgba(250,250,248,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(28px) saturate(1.6)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(1.6)' : 'none',
      borderBottomColor: scrolled ? 'rgba(0,0,0,0.06)' : 'transparent',
    }}>
      <div style={navS.inner}>
        <button onClick={onReset} style={{ ...navS.brand, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
          <img src="/images/logo.png" alt="STOA" style={navS.logo} />
          <span style={navS.brandText}>STOA</span>
        </button>
        <div style={navS.links}>
          {selected ? (
            <>
              <a href="#storefront" style={navS.link}>Storefront</a>
              <a href="#dashboard" style={navS.link}>Dashboard</a>
              <a href="#portal" style={navS.link}>Portal</a>
            </>
          ) : (
            <>
              <a href="#platform" style={navS.link}>Platform</a>
              <a href="#about" style={navS.link}>About</a>
            </>
          )}
        </div>
        <a href="#contact" style={navS.cta}>Book a Demo</a>
      </div>
    </nav>
  )
}
const navS = {
  bar: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, transition: 'all 0.6s cubic-bezier(.16,1,.3,1)', borderBottom: '1px solid transparent', padding: '0 48px', height: 72 },
  inner: { maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  logo: { width: 32, height: 32, objectFit: 'contain' },
  brandText: { fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: '#D4AF37', letterSpacing: '0.15em' },
  links: { display: 'flex', gap: 32 },
  link: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666', transition: 'color 0.25s', cursor: 'pointer' },
  cta: { padding: '10px 24px', background: 'linear-gradient(135deg, #D4AF37, #E5C76B)', color: '#000', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 100, boxShadow: '0 0 20px rgba(212,175,55,0.2)' },
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════ */
const EDIT_KEY = 'stoa_edits'
const COLOR_KEY = 'stoa_color'

function loadEdits() { try { return JSON.parse(localStorage.getItem(EDIT_KEY)) || {} } catch { return {} } }
function saveEdits(e) { try { localStorage.setItem(EDIT_KEY, JSON.stringify(e)) } catch {} }

export default function StoaHome() {
  const [selectedIndustry, setSelectedIndustry] = useState(null)
  const [activeBubble, setActiveBubble] = useState(null)
  const [heroVis, setHeroVis] = useState(false)
  const [heroVidLoaded, setHeroVidLoaded] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [edits, setEdits] = useState(loadEdits)
  const [brandColor, setBrandColor] = useState(() => localStorage.getItem(COLOR_KEY) || '#D4AF37')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [transforming, setTransforming] = useState(false)

  useEffect(() => { setTimeout(() => setHeroVis(true), 300) }, [])
  useEffect(() => { saveEdits(edits) }, [edits])
  useEffect(() => {
    try { localStorage.setItem(COLOR_KEY, brandColor) } catch {}
    document.documentElement.style.setProperty('--brand', brandColor)
  }, [brandColor])

  const industry = selectedIndustry ? getIndustry(selectedIndustry) : null

  // Apply theme when industry changes
  useEffect(() => {
    if (!industry) {
      // Reset to default STOA theme
      const defaults = {
        '--brand': '#D4AF37', '--bg': '#04040c', '--bg2': '#0a0a1a',
        '--surface': '#0f0f1e', '--surface2': '#16162a', '--border': '#16162a',
        '--text': '#F0EDE6', '--text2': '#908D9A', '--muted': '#5C5870',
        '--font-display': "'Playfair Display', Georgia, serif",
        '--font-body': "'DM Sans', system-ui, sans-serif",
      }
      Object.entries(defaults).forEach(([k, v]) => document.documentElement.style.setProperty(k, v))
      return
    }
    Object.entries(industry.theme).forEach(([k, v]) => document.documentElement.style.setProperty(k, v))
  }, [industry])

  // Feature bubbles per industry — maps to showcase page keys
  const BUBBLES = {
    museum: [
      { key: 'dashboard', label: 'Dashboard', desc: 'Real-time command center with visitor counts, revenue tracking, gift shop sales, event bookings, and AI-generated operational summary.' },
      { key: 'store', label: 'Gift Shop', desc: 'Online store with products synced from Printify. Category filters, search, product detail pages, variants, and Stripe checkout.' },
      { key: 'events', label: 'Events', desc: 'Create and manage events — set capacity limits, track RSVPs, handle ticket sales, and manage private bookings from one place.' },
      { key: 'inventory', label: 'Inventory', desc: 'Full inventory management synced with Printify. Stock levels, variants, categories, and automated low-stock alerts.' },
      { key: 'orders', label: 'Orders', desc: 'Order management with status tracking, fulfillment workflow, customer details, and shipping integration.' },
      { key: 'donations', label: 'Donations', desc: 'Track donations, manage donors, generate tax receipts, view giving trends, and manage recurring gift campaigns.' },
      { key: 'email', label: 'Email Marketing', desc: 'Email campaign builder with audience segmentation, open/click analytics, scheduling, and branded templates.' },
      { key: 'pos', label: 'Point of Sale', desc: 'Tablet-ready POS terminal for in-person transactions. Quick-add products, apply discounts, process payments, and print receipts.' },
    ],
  }

  const handleSelectIndustry = useCallback((id) => {
    setTransforming(true)
    setTimeout(() => {
      setSelectedIndustry(id)
      setActiveBubble(BUBBLES[id]?.[0]?.key || 'dashboard')
      setTransforming(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 400)
  }, [])

  const handleReset = useCallback(() => {
    setTransforming(true)
    setTimeout(() => {
      setSelectedIndustry(null)
      setTransforming(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 400)
  }, [])

  // Editable text component
  const E = ({ id, children, tag: Tag = 'span', style = {} }) => {
    const savedText = edits[id]
    if (!editMode) return <Tag style={style}>{savedText || children}</Tag>
    return (
      <Tag
        contentEditable
        suppressContentEditableWarning
        style={{
          ...style,
          outline: `2px dashed ${brandColor}55`,
          outlineOffset: 4,
          cursor: 'text',
          borderRadius: 4,
          transition: 'outline-color 0.2s',
        }}
        onFocus={e => e.target.style.outlineColor = brandColor}
        onBlur={e => {
          e.target.style.outlineColor = `${brandColor}55`
          const text = e.target.innerText
          if (text !== children) setEdits(prev => ({ ...prev, [id]: text }))
        }}
        dangerouslySetInnerHTML={{ __html: savedText || (typeof children === 'string' ? children : '') }}
      />
    )
  }

  return (
    <>
      <Nav selected={selectedIndustry} onReset={handleReset} />

      {/* Transform overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 150,
        background: 'var(--bg)',
        opacity: transforming ? 1 : 0,
        pointerEvents: transforming ? 'all' : 'none',
        transition: 'opacity 0.4s ease',
      }} />

      {/* ════ LANDING — "I Am A..." Selector ════ */}
      {!selectedIndustry && (
        <div style={{
          opacity: transforming ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}>
          {/* Hero with video background */}
          <section style={hero.wrap}>
            <video
              style={{ ...hero.video, opacity: heroVidLoaded ? 1 : 0 }}
              src={V + 'milky-way.mp4'}
              autoPlay muted loop playsInline
              onLoadedData={() => setHeroVidLoaded(true)}
            />
            <div style={hero.overlay} />
            <div style={hero.gradient} />
            <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
              <LandingSelector onSelect={handleSelectIndustry} />
            </div>
          </section>

          {/* ════ MARQUEE ════ */}
          <div style={marq.wrap}>
            <div style={marq.track}>
              {[...Array(2)].map((_, ri) => (
                <div key={ri} style={marq.set}>
                  {['22+ Page Platforms', '·', 'AI-Powered', '·', 'Edit Everything Live', '·', 'Built in Weeks', '·', 'Zero Templates', '·', 'Real Working Software', '·'].map((t, i) => (
                    <span key={i} style={t === '·' ? marq.dot : marq.item}>{t}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ════ "WHAT WE BUILD" ════ */}
          <section id="platform" style={sec.wrap}>
            <div style={sec.inner}>
              <Reveal><div style={sec.tag}>WHAT WE BUILD</div></Reveal>
              <Reveal delay={100}><h2 style={sec.h2}><E id="build-h2">Not websites. Platforms.</E></h2></Reveal>
              <Reveal delay={200}>
                <p style={sec.sub}>
                  <E id="build-sub">A website tells people about your business. A platform runs it. We build the whole thing — the storefront your customers see, the admin dashboard your team uses, and the AI tools that make both better.</E>
                </p>
              </Reveal>
              <div style={sec.threeCol}>
                {[
                  { icon: '◈', title: 'Customer-Facing', items: ['Video hero & animations', 'Online store & checkout', 'Events & ticket booking', 'Membership portals', 'Donations & fundraising'] },
                  { icon: '▦', title: 'Back Office', items: ['Admin dashboard & KPIs', 'Inventory & POS', 'Order management', 'Reports & CSV exports', 'Staff & volunteer tools'] },
                  { icon: '◇', title: 'AI & Creative', items: ['AI image generation', 'Social media creator', 'Email campaign builder', 'Content management', 'Live site editing (CMS)'] },
                ].map((col, ci) => (
                  <Reveal key={col.title} delay={300 + ci * 150} style={sec.col}>
                    <div style={sec.colIcon}>{col.icon}</div>
                    <div style={sec.colTitle}>{col.title}</div>
                    <ul style={sec.colList}>
                      {col.items.map(item => (
                        <li key={item} style={sec.colItem}>
                          <span style={sec.colCheck}>✦</span> {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ════ ABOUT / TEAM ════ */}
          <section id="about" style={sec.wrap}>
            <div style={sec.inner}>
              <Reveal><div style={sec.tag}>WHO WE ARE</div></Reveal>
              <Reveal delay={100}><h2 style={sec.h2}><E id="about-h2">Built by Two. Powered by AI.</E></h2></Reveal>
              <Reveal delay={200}>
                <p style={{ ...sec.sub, maxWidth: 540 }}>
                  STOA is Tovah and Saleem — a designer and an engineer who build full platforms with AI.
                  We don't outsource. We don't use templates. Every pixel and every feature is built specifically for your business.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div style={aboutS.row}>
                  <div style={aboutS.card}>
                    <div style={aboutS.avatar}>T</div>
                    <div style={aboutS.name}>Tovah</div>
                    <div style={aboutS.role}>Design & Brand</div>
                  </div>
                  <div style={aboutS.card}>
                    <div style={aboutS.avatar}>S</div>
                    <div style={aboutS.name}>Saleem</div>
                    <div style={aboutS.role}>Engineering & AWS</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      )}

      {/* ════ INDUSTRY SELECTED — Interactive Builder ════ */}
      {selectedIndustry && industry && (
        <div style={{
          opacity: transforming ? 0 : 1,
          transition: 'opacity 0.4s ease 0.2s',
        }}>
          {/* Industry Hero */}
          <section style={iHero.wrap}>
            {industry.storefront.heroVideo ? (
              <>
                <LazyVideo src={industry.storefront.heroVideo} style={iHero.video} autoPlay muted loop playsInline />
                <div style={{
                  ...iHero.videoOverlay,
                  background: industry.background === 'stars'
                    ? 'linear-gradient(to bottom, rgba(4,4,12,0.3) 0%, rgba(4,4,12,0.75) 100%)'
                    : 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 100%)',
                }} />
              </>
            ) : (
              <div style={iHero.bg}>
                <div style={{ ...iHero.orb, width: 500, height: 500, top: '-15%', right: '-8%', opacity: 0.06, background: 'var(--brand)' }} />
                <div style={{ ...iHero.orb, width: 350, height: 350, bottom: '-10%', left: '-5%', opacity: 0.04, background: 'var(--brand)' }} />
              </div>
            )}
            <div style={iHero.content}>
              <div style={iHero.topBar}>
                <button onClick={handleReset} style={iHero.backBtn}>← Back to Industries</button>
                <div style={iHero.industryBadge}>
                  <span>{industry.icon}</span>
                  <span>{industry.industry}</span>
                </div>
              </div>
              <div style={iHero.tag}>{industry.storefront.heroTag}</div>
              <h1 style={iHero.h1}>
                {industry.storefront.heroTitle.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {i === arr.length - 1
                      ? <em style={{ fontStyle: 'italic', color: 'var(--brand)' }}>{line}</em>
                      : line
                    }
                  </span>
                ))}
              </h1>
              <p style={iHero.sub}>{industry.storefront.heroSub}</p>
              <div style={iHero.btns}>
                <button style={iHero.btnPrimary}>{industry.storefront.heroCta}</button>
                <button style={iHero.btnGhost}>{industry.storefront.heroCta2}</button>
              </div>
            </div>
          </section>

          {/* Industry Switcher */}
          <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
            <MiniSwitcher current={selectedIndustry} onSelect={handleSelectIndustry} />
          </div>

          {/* ── PLATFORM SHOWCASE ── */}
          <div style={showcase.section}>
            <Reveal>
              <div style={showcase.label}>
                <span style={{ color: 'var(--brand)', marginRight: 8 }}>▦</span>
                THIS IS THE APP WE BUILT
              </div>
            </Reveal>

            {/* Feature Bubbles */}
            {BUBBLES[selectedIndustry] && (
              <Reveal delay={100}>
                <div style={showcase.bubbles}>
                  {BUBBLES[selectedIndustry].map(b => (
                    <button
                      key={b.key}
                      onClick={() => setActiveBubble(b.key)}
                      style={{
                        ...showcase.bubble,
                        background: activeBubble === b.key ? 'var(--brand)' : 'var(--surface)',
                        color: activeBubble === b.key ? 'var(--bg)' : 'var(--text2)',
                        borderColor: activeBubble === b.key ? 'var(--brand)' : 'var(--border)',
                      }}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Browser Frame */}
            <Reveal delay={200}>
              <div style={showcase.browser}>
                <div style={showcase.browserBar}>
                  <div style={showcase.browserDots}>
                    <span style={{ ...showcase.dot, background: '#ff5f57' }} />
                    <span style={{ ...showcase.dot, background: '#febc2e' }} />
                    <span style={{ ...showcase.dot, background: '#28c840' }} />
                  </div>
                  <div style={showcase.browserUrl}>
                    {industry?.name?.toLowerCase().replace(/[^a-z0-9]/g, '')}.vercel.app / {activeBubble}
                  </div>
                </div>
                <div style={showcase.browserBody}>
                  <Suspense fallback={<div style={{ padding: 80, textAlign: 'center', color: '#999' }}>Loading...</div>}>
                    {selectedIndustry === 'museum' && (
                      <MuseumShowcase activePage={activeBubble} onPageChange={setActiveBubble} />
                    )}
                    {selectedIndustry !== 'museum' && (
                      <div style={{ padding: 80, textAlign: 'center' }}>
                        <div style={{ fontSize: 40, color: 'var(--brand)', opacity: 0.2, marginBottom: 16 }}>{industry?.icon}</div>
                        <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{industry?.name}</div>
                        <div style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 24 }}>Full interactive demo coming soon</div>
                        <a href="mailto:hello@getstoa.io" style={{ display: 'inline-block', padding: '12px 28px', background: 'var(--brand)', color: 'var(--bg)', fontSize: 13, fontWeight: 600, borderRadius: 100, fontFamily: 'var(--font-body)' }}>
                          Book a Demo
                        </a>
                      </div>
                    )}
                  </Suspense>
                </div>
              </div>
            </Reveal>

            {/* Description below browser frame */}
            {BUBBLES[selectedIndustry] && (() => {
              const active = BUBBLES[selectedIndustry].find(b => b.key === activeBubble)
              if (!active) return null
              return (
                <Reveal delay={300}>
                  <div style={showcase.desc}>
                    <div style={showcase.descTitle}>{active.label}</div>
                    <p style={showcase.descText}>{active.desc}</p>
                  </div>
                </Reveal>
              )
            })()}
          </div>
        </div>
      )}

      {/* ════ CTA ════ */}
      <section id="contact" style={ctaS.wrap}>
        <VideoSection src={V + 'andromeda.mp4'}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <Reveal><div style={sec.tag}>LET'S GO</div></Reveal>
            <Reveal delay={100}>
              <h2 style={{ ...sec.h2, color: '#fff', fontSize: 'clamp(28px, 5vw, 48px)', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                Ready to build<br />something <em style={{ fontStyle: 'italic', color: '#D4AF37' }}>real?</em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p style={{ ...sec.sub, color: 'rgba(255,255,255,0.7)', textShadow: '0 2px 10px rgba(0,0,0,0.7)', marginBottom: 32 }}>
                Tell us about your business. We'll show you what your platform looks like.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div style={ctaS.btns}>
                <a href="https://instagram.com/getstoa" target="_blank" rel="noopener" style={ctaS.btn}>@getstoa on Instagram</a>
                <a href="mailto:hello@getstoa.io" style={ctaS.btnGold}>hello@getstoa.io</a>
              </div>
            </Reveal>
          </div>
        </VideoSection>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={foot.wrap}>
        <img src="/images/logo.png" alt="STOA" style={foot.logo} />
        <E id="footer-name" tag="div" style={foot.name}>STOA</E>
        <E id="footer-tagline" tag="div" style={foot.tagline}>THE SELLER'S PLATFORM</E>
        <div style={foot.copy}>© 2026 Get Stoa LLC · Scottsdale, AZ</div>
      </footer>

      {/* ════ FLOATING PENCIL TOOLBAR ════ */}
      <div style={{
        position: 'fixed', bottom: 24, right: selectedIndustry ? 80 : 24, zIndex: 300,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8,
        transition: 'right 0.4s ease',
      }}>
        {/* Color picker */}
        {showColorPicker && (
          <div style={{
            background: 'rgba(4,4,12,0.95)', backdropFilter: 'blur(20px)',
            borderRadius: 16, padding: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.06)',
            animation: 'fadeIn 0.2s ease',
          }}>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: '0.15em', color: '#666', marginBottom: 10 }}>BRAND COLOR</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap', maxWidth: 160 }}>
              {['#D4AF37','#E1306C','#0369A1','#16A34A','#7C3AED','#111111','#DC6843','#0D9488'].map(c => (
                <button key={c} onClick={() => setBrandColor(c)} style={{
                  width: 28, height: 28, borderRadius: '50%', background: c, cursor: 'pointer',
                  border: brandColor === c ? '2.5px solid #fff' : '2px solid transparent',
                  transition: 'all 0.15s',
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="color" value={brandColor} onChange={e => setBrandColor(e.target.value)} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #333', cursor: 'pointer', padding: 2 }} />
              <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: '#666' }}>{brandColor}</span>
            </div>
          </div>
        )}

        {/* Toolbar pills */}
        <div style={{
          display: 'flex', gap: 6, alignItems: 'center',
          background: 'rgba(4,4,12,0.95)', backdropFilter: 'blur(20px)',
          borderRadius: 100, padding: '6px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
        }}>
          {editMode && (
            <>
              <button onClick={() => setShowColorPicker(!showColorPicker)} style={{
                width: 32, height: 32, borderRadius: '50%', background: brandColor, cursor: 'pointer',
                border: '2px solid rgba(255,255,255,0.15)',
              }} />
              <button onClick={() => { setEdits({}); localStorage.removeItem(EDIT_KEY) }} style={{
                padding: '8px 14px', borderRadius: 100, fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11, color: '#666', background: 'transparent', border: '1px solid #333',
              }}>Reset</button>
              <div style={{ width: 1, height: 24, background: '#333' }} />
            </>
          )}
          <button onClick={() => {
            setEditMode(!editMode)
            setShowColorPicker(false)
            if (!editMode) try { localStorage.setItem('stoa_pencil_clicked', 'true') } catch {}
          }} style={{
            width: editMode ? 'auto' : 56, height: 56, borderRadius: editMode ? 100 : '50%',
            padding: editMode ? '0 24px' : 0,
            background: editMode ? brandColor : 'rgba(255,255,255,0.08)',
            border: editMode ? 'none' : '1px solid rgba(255,255,255,0.12)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 0.25s cubic-bezier(.16,1,.3,1)',
            boxShadow: editMode ? `0 0 20px ${brandColor}40` : `0 0 0 0 ${brandColor}40`,
            animation: editMode ? 'none' : 'pencilGlow 2s ease-in-out infinite',
          }}>
            {editMode ? (
              <span style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 13, fontWeight: 600, color: '#000' }}>✓ Done Editing</span>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            )}
          </button>
          {/* "Edit This Site" label */}
          {!editMode && !localStorage.getItem('stoa_pencil_clicked') && (
            <div style={{
              position: 'absolute', right: 72, bottom: 12,
              background: 'rgba(4,4,12,0.95)', backdropFilter: 'blur(20px)',
              borderRadius: 8, padding: '8px 14px', whiteSpace: 'nowrap',
              fontFamily: "'Plus Jakarta Sans'", fontSize: 12, fontWeight: 600,
              color: '#D4AF37', letterSpacing: '0.02em',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              border: '1px solid rgba(212,175,55,0.2)',
              animation: 'fadeIn 0.5s ease',
            }}>
              Edit This Site
              <div style={{
                position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%) rotate(45deg)',
                width: 12, height: 12, background: 'rgba(4,4,12,0.95)',
                borderRight: '1px solid rgba(212,175,55,0.2)',
                borderBottom: '1px solid rgba(212,175,55,0.2)',
              }} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pencilGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(212,175,55,0.3), 0 0 20px rgba(212,175,55,0.1); }
          50% { box-shadow: 0 0 16px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.25); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Edit mode banner */}
      {editMode && (
        <div style={{
          position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 250,
          padding: '8px 24px', borderRadius: 100,
          background: 'rgba(4,4,12,0.9)', backdropFilter: 'blur(20px)',
          border: `1px solid ${brandColor}30`,
          fontFamily: "'JetBrains Mono'", fontSize: 11, letterSpacing: '0.1em', color: brandColor,
          boxShadow: `0 4px 20px ${brandColor}20`,
          animation: 'fadeIn 0.3s ease',
        }}>
          ✎ EDIT MODE — Click any highlighted text to change it
        </div>
      )}
    </>
  )
}

/* ════ STYLES ════ */

const hero = {
  wrap: { position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  video: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 1.5s ease' },
  overlay: { position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(4,4,12,0.7) 100%)', pointerEvents: 'none' },
  gradient: { position: 'absolute', inset: '-30%', width: '160%', height: '160%', background: 'radial-gradient(ellipse at 30% 40%, rgba(26,16,64,0.5) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(18,13,48,0.35) 0%, transparent 40%), rgba(4,4,12,0.35)', zIndex: 0 },
}

const marq = {
  wrap: { overflow: 'hidden', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', background: 'rgba(212,175,55,0.03)', padding: '18px 0' },
  track: { display: 'flex', width: 'max-content', animation: 'marquee 30s linear infinite' },
  set: { display: 'flex', alignItems: 'center', gap: 32, paddingRight: 32 },
  item: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.15em', color: '#D4AF37', whiteSpace: 'nowrap', textTransform: 'uppercase' },
  dot: { color: 'rgba(212,175,55,0.3)', fontSize: 12 },
}

const sec = {
  wrap: { padding: '100px 48px' },
  inner: { maxWidth: 1000, margin: '0 auto', textAlign: 'center' },
  tag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em', color: '#D4AF37', marginBottom: 16, textAlign: 'center' },
  h2: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, lineHeight: 1.15, color: 'var(--text)', margin: '0 0 16px', textAlign: 'center' },
  sub: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, lineHeight: 1.7, color: 'var(--text2)', maxWidth: 520, margin: '0 auto 48px', textAlign: 'center' },
  threeCol: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, maxWidth: 900, margin: '0 auto', textAlign: 'left' },
  col: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 28 },
  colIcon: { fontSize: 28, color: '#D4AF37', marginBottom: 16, filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.3))' },
  colTitle: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 },
  colList: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 },
  colItem: { fontSize: 14, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 8 },
  colCheck: { color: '#D4AF37', fontSize: 10 },
}

const iHero = {
  wrap: { position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 72 },
  video: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
  videoOverlay: { position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' },
  bg: { position: 'absolute', inset: 0, background: 'linear-gradient(160deg, var(--bg) 0%, var(--bg2) 40%, var(--bg) 100%)', overflow: 'hidden' },
  orb: { position: 'absolute', borderRadius: '50%', filter: 'blur(80px)' },
  content: { position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 700, padding: '60px 24px' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 12 },
  backBtn: { fontFamily: "'Plus Jakarta Sans'", fontSize: 13, fontWeight: 500, color: 'var(--text2)', background: 'rgba(128,128,128,0.1)', border: '1px solid var(--border)', borderRadius: 100, padding: '8px 20px', cursor: 'pointer', transition: 'all 0.3s ease' },
  industryBadge: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono'", fontSize: 11, letterSpacing: '0.1em', color: 'var(--brand)', background: 'var(--brand-glow)', border: '1px solid var(--brand)', borderRadius: 100, padding: '6px 16px' },
  tag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.3em', color: 'var(--brand)', marginBottom: 20 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 400, lineHeight: 1.15, color: 'var(--text)', margin: '0 0 20px' },
  sub: { fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.8vw, 17px)', lineHeight: 1.7, color: 'var(--text2)', margin: '0 0 32px' },
  btns: { display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: { display: 'inline-block', padding: '14px 32px', background: 'var(--brand)', color: 'var(--bg)', fontSize: 13, fontWeight: 600, borderRadius: 100, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', letterSpacing: '0.02em', transition: 'opacity 0.3s ease' },
  btnGhost: { display: 'inline-block', padding: '14px 32px', background: 'transparent', color: 'var(--brand)', fontSize: 13, fontWeight: 500, borderRadius: 100, border: '1px solid var(--brand)', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'background 0.3s ease, color 0.3s ease' },
}

const showcase = {
  section: { maxWidth: 1200, margin: '0 auto', padding: '60px 24px 80px' },
  label: {
    textAlign: 'center', padding: '0 0 28px',
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em',
    color: 'var(--muted)',
  },
  bubbles: {
    display: 'flex', flexWrap: 'wrap', gap: 8,
    justifyContent: 'center', padding: '0 0 28px',
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
  browser: {
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
  browserDots: { display: 'flex', gap: 6, flexShrink: 0 },
  dot: { width: 10, height: 10, borderRadius: '50%', display: 'block' },
  browserUrl: {
    flex: 1, textAlign: 'center',
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)',
    letterSpacing: '0.02em',
  },
  browserBody: {
    height: '75vh', minHeight: 550,
    overflow: 'auto', position: 'relative',
    background: 'var(--bg2)',
  },
  desc: {
    textAlign: 'center', maxWidth: 700, margin: '0 auto',
    padding: '32px 24px 0',
  },
  descTitle: {
    fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600,
    color: 'var(--text)', marginBottom: 8,
  },
  descText: {
    fontSize: 15, lineHeight: 1.7, color: 'var(--text2)', margin: 0,
  },
}

const aboutS = {
  row: { display: 'flex', gap: 24, justifyContent: 'center', marginTop: 40 },
  card: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '32px 40px', textAlign: 'center', minWidth: 180 },
  avatar: { width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #E5C76B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 600, color: '#000', margin: '0 auto 12px', fontFamily: "'Playfair Display', serif" },
  name: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 500, color: 'var(--text)', marginBottom: 4 },
  role: { fontSize: 13, color: 'var(--text2)' },
}

const ctaS = {
  wrap: {},
  btns: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' },
  btn: { display: 'inline-block', padding: '14px 32px', borderRadius: 100, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 14, fontWeight: 500, backdropFilter: 'blur(10px)' },
  btnGold: { display: 'inline-block', padding: '14px 32px', borderRadius: 100, background: 'linear-gradient(135deg, #D4AF37, #E5C76B)', color: '#000', fontSize: 14, fontWeight: 600, boxShadow: '0 0 30px rgba(212,175,55,0.3)' },
}

const foot = {
  wrap: { padding: '64px 48px 48px', textAlign: 'center', background: 'var(--bg2)', borderTop: '1px solid var(--border)' },
  logo: { width: 48, height: 48, objectFit: 'contain', margin: '0 auto 12px', opacity: 0.6 },
  name: { fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: '#D4AF37', letterSpacing: '0.15em', marginBottom: 4 },
  tagline: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.25em', color: 'var(--muted)', marginBottom: 24 },
  copy: { fontSize: 12, color: 'var(--muted)' },
}
