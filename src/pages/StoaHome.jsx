import { useState, useEffect, useRef, useCallback } from 'react'
import LazyVideo from '../components/LazyVideo'

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
  overlayTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(to bottom, #04040c, transparent)', zIndex: 2, pointerEvents: 'none' },
  overlayBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(to top, #04040c, transparent)', zIndex: 2, pointerEvents: 'none' },
  overlay: { position: 'absolute', inset: 0, background: 'rgba(4,4,12,0.35)', zIndex: 1 },
  content: { position: 'relative', zIndex: 3, width: '100%', maxWidth: 1200, margin: '0 auto', padding: '80px 48px' },
}

/* ── Glassmorphism Nav ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      ...navS.bar,
      background: scrolled ? 'rgba(4,4,12,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(28px) saturate(1.6)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(1.6)' : 'none',
      borderBottomColor: scrolled ? 'rgba(22,22,42,0.6)' : 'transparent',
    }}>
      <div style={navS.inner}>
        <div style={navS.brand}>
          <img src="/images/logo.png" alt="STOA" style={navS.logo} />
          <span style={navS.brandText}>STOA</span>
        </div>
        <div style={navS.links}>
          {['Platform', 'Work', 'About'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={navS.link}>{l}</a>
          ))}
        </div>
        <a href="#contact" style={navS.cta}>Get Started</a>
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
  link: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#908D9A', transition: 'color 0.25s', cursor: 'pointer' },
  cta: { padding: '10px 24px', background: 'linear-gradient(135deg, #D4AF37, #E5C76B)', color: '#000', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 100, boxShadow: '0 0 20px rgba(212,175,55,0.2)' },
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════ */
export default function StoaHome({ onBuild }) {
  const [heroVis, setHeroVis] = useState(false)
  const [heroVidLoaded, setHeroVidLoaded] = useState(false)

  useEffect(() => { setTimeout(() => setHeroVis(true), 300) }, [])

  /* Animated headline words */
  const words = [
    { t: 'We', em: false }, { t: 'Build', em: false },
    { t: 'Platforms', em: false }, { t: 'That', em: false },
    { t: 'Sell.', em: true },
  ]

  return (
    <>
      <Nav />

      {/* ════ HERO ════ */}
      <section style={hero.wrap}>
        <video
          style={{ ...hero.video, opacity: heroVidLoaded ? 1 : 0 }}
          src={V + 'milky-way.mp4'}
          autoPlay muted loop playsInline
          onLoadedData={() => setHeroVidLoaded(true)}
        />
        <div style={hero.overlay} />
        <div style={hero.gradient} />
        <div style={hero.content}>
          <div style={{
            ...hero.tag,
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? 'none' : 'translateY(16px)',
            transition: 'all 0.9s cubic-bezier(.16,1,.3,1)',
            transitionDelay: '0.2s',
          }}>
            THE SELLER'S PLATFORM
          </div>
          <h1 style={hero.h1}>
            {words.map((w, i) => (
              <span key={i} style={{
                display: 'inline-block',
                opacity: heroVis ? 1 : 0,
                transform: heroVis ? 'none' : 'translateY(24px)',
                transition: 'all 0.7s cubic-bezier(.16,1,.3,1)',
                transitionDelay: `${500 + i * 150}ms`,
                marginRight: '0.22em',
                fontStyle: w.em ? 'italic' : 'normal',
                color: w.em ? '#D4AF37' : '#F0EDE6',
              }}>
                {w.t}
              </span>
            ))}
          </h1>
          <p style={{
            ...hero.sub,
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? 'none' : 'translateY(16px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1)',
            transitionDelay: '1.5s',
          }}>
            Full-stack platforms for businesses that want more than a website.<br />
            Storefronts. Admin dashboards. AI tools. Built fast. Built beautiful.
          </p>
          <div style={{
            ...hero.actions,
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? 'none' : 'translateY(16px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1)',
            transitionDelay: '1.8s',
          }}>
            <button onClick={onBuild} style={hero.btnPrimary}>Build Your Platform</button>
            <a href="#contact" style={hero.btnGhost}>Book a Demo</a>
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{
          ...hero.scrollHint,
          opacity: heroVis ? 1 : 0,
          transition: 'opacity 1s ease 2.5s',
        }}>
          <div style={hero.scrollLine} />
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

      {/* ════ "WHAT WE BUILD" INTRO ════ */}
      <section id="platform" style={sec.wrap}>
        <div style={sec.inner}>
          <Reveal>
            <div style={sec.tag}>WHAT WE BUILD</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={sec.h2}>Not websites.<br /><em style={{ fontStyle: 'italic', color: '#D4AF37' }}>Platforms.</em></h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={sec.sub}>
              A website tells people about your business. A platform runs it. We build the whole thing —
              the storefront your customers see, the admin dashboard your team uses, and the AI tools that make both better.
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

      {/* ════ VIDEO BREAK — "EDIT EVERYTHING" ════ */}
      <VideoSection src={V + 'nebula.mp4'}>
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <Reveal>
            <div style={sec.tag}>LIVE EDITING</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ ...sec.h2, color: '#fff', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
              Click the pencil.<br />Edit your site.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ ...sec.sub, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Every platform we build comes with a live CMS. Toggle admin mode, click any text,
              and change it — headlines, descriptions, prices, everything. Publish instantly. No developer needed.
            </p>
          </Reveal>
        </div>
      </VideoSection>

      {/* ════ OUR WORK — SHOWCASE ════ */}
      <section id="work" style={{ ...sec.wrap, padding: '100px 48px' }}>
        <div style={sec.inner}>
          <Reveal><div style={sec.tag}>OUR WORK</div></Reveal>
          <Reveal delay={100}><h2 style={sec.h2}>Platforms We've Built</h2></Reveal>
          <Reveal delay={200}>
            <p style={sec.sub}>
              Each one is a complete platform — not a landing page, not a template. Real working software with storefronts, admin dashboards, and AI tools.
            </p>
          </Reveal>
        </div>

        {/* ── Dark Sky ── */}
        <Reveal>
          <div style={work.card}>
            <div style={work.cardLeft}>
              <div style={work.cardTag}>NONPROFIT · GIFT SHOP · EVENTS</div>
              <h3 style={work.cardTitle}>Dark Sky Discovery Center</h3>
              <p style={work.cardDesc}>
                22+ page admin system for the International Dark Sky Discovery Center in Fountain Hills, AZ.
                Storefront with video backgrounds and starfield. Gift shop with 67 products from Printify.
                Events with ticket reservations. AI Design Studio. Social media post creator.
                Point of sale. Facility booking. Volunteer portal.
              </p>
              <div style={work.chipRow}>
                {['Video Hero', 'Edit Mode CMS', 'Online Store', 'AI Design Studio', 'Events', 'POS', 'Social Media', 'Donations', 'Volunteer Portal'].map(c => (
                  <span key={c} style={work.chip}>{c}</span>
                ))}
              </div>
              <a href="https://darksky-store.vercel.app" target="_blank" rel="noopener" style={work.cardLink}>
                View Live Demo →
              </a>
            </div>
            <div style={work.cardRight}>
              <div style={work.browser}>
                <div style={work.browserBar}>
                  <div style={work.browserDots}><span /><span /><span /></div>
                  <div style={work.browserUrl}>darksky-store.vercel.app</div>
                </div>
                <div style={work.browserBody}>
                  <LazyVideo src={V + 'desert-night-sky.mp4'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} autoPlay muted loop playsInline />
                  <div style={work.browserOverlay}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px, 2.5vw, 28px)', color: '#fff', fontWeight: 400 }}>
                      International Dark Sky<br /><em style={{ color: '#D4AF37' }}>Discovery Center</em>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── MedFlow ── */}
        <Reveal>
          <div style={{ ...work.card, flexDirection: 'row-reverse' }}>
            <div style={work.cardLeft}>
              <div style={work.cardTag}>MEDICAL SALES · CRM · 3 PORTALS</div>
              <h3 style={work.cardTitle}>MedFlow</h3>
              <p style={work.cardDesc}>
                Medical sales platform with 22 admin navigation items across 3 distinct portals — Admin,
                Sales Rep, and Doctor. AI-powered coaching, pipeline visualization, commission tracking,
                compliance (Sunshine Act), route planning, inventory management, and a full softphone.
              </p>
              <div style={work.chipRow}>
                {['AI Coaching', 'Pipeline CRM', 'Commission Tiers', 'Compliance', 'Route Planner', 'Softphone', 'Doctor Portal', 'Inventory', 'Leaderboard'].map(c => (
                  <span key={c} style={work.chip}>{c}</span>
                ))}
              </div>
              <a href="https://medflow.createandsource.com" target="_blank" rel="noopener" style={work.cardLink}>
                View Live Demo →
              </a>
            </div>
            <div style={work.cardRight}>
              <div style={work.browser}>
                <div style={work.browserBar}>
                  <div style={work.browserDots}><span /><span /><span /></div>
                  <div style={work.browserUrl}>medflow.createandsource.com</div>
                </div>
                <div style={{ ...work.browserBody, background: '#f0fdf4' }}>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 11, color: '#888', letterSpacing: '0.1em' }}>COMMAND CENTER</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 20, fontWeight: 700, color: '#1a1a2e' }}>MedFlow</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                      {[{ v: '$8.9M', l: 'Pipeline' }, { v: '34%', l: 'Close Rate' }, { v: '4', l: 'Active Reps' }].map(k => (
                        <div key={k.l} style={{ background: '#fff', borderRadius: 10, padding: '12px 10px', border: '1px solid #e5e5e5' }}>
                          <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e' }}>{k.v}</div>
                          <div style={{ fontSize: 9, color: '#888' }}>{k.l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: '#2B8A6E15', borderRadius: 10, padding: 12 }}>
                      <div style={{ fontSize: 10, color: '#2B8A6E', fontWeight: 600, marginBottom: 4 }}>✦ AI Summary</div>
                      <div style={{ fontSize: 11, color: '#555', lineHeight: 1.5 }}>Revenue is up 12%. 14 doctors overdue. Clint is on a 5-day call streak.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── MedSpa ── */}
        <Reveal>
          <div style={work.card}>
            <div style={work.cardLeft}>
              <div style={work.cardTag}>MEDSPA · BOOKING · CLIENT PORTAL</div>
              <h3 style={work.cardTitle}>Haus of Confidence</h3>
              <p style={work.cardDesc}>
                White-label medspa management platform. 22 pages covering appointment booking,
                service catalogs, client records, treatment tracking, staff management,
                inventory, analytics, and payment processing. Built as a demo for Scottsdale medspas.
              </p>
              <div style={work.chipRow}>
                {['Appointment Booking', 'Service Catalog', 'Client Portal', 'Staff Management', 'Treatment Tracking', 'Analytics'].map(c => (
                  <span key={c} style={work.chip}>{c}</span>
                ))}
              </div>
            </div>
            <div style={work.cardRight}>
              <div style={work.browser}>
                <div style={work.browserBar}>
                  <div style={work.browserDots}><span /><span /><span /></div>
                  <div style={work.browserUrl}>medspa-platform.vercel.app</div>
                </div>
                <div style={{ ...work.browserBody, background: 'linear-gradient(135deg, #f8f0e8, #faf5ef)' }}>
                  <div style={{ padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#b08d6e' }}>HAUS OF CONFIDENCE</div>
                    <div style={{ fontFamily: "'Playfair Display'", fontSize: 22, color: '#3d2e1e', fontWeight: 500 }}>Book Your Experience</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['Botox', 'Fillers', 'Facials'].map(s => (
                        <span key={s} style={{ padding: '6px 14px', borderRadius: 100, background: '#b08d6e20', color: '#8b6f4e', fontSize: 11, fontWeight: 600 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ════ VIDEO BREAK — SPEED ════ */}
      <VideoSection src={V + 'observatory-hero.mp4'}>
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <Reveal><div style={sec.tag}>SPEED</div></Reveal>
          <Reveal delay={100}>
            <h2 style={{ ...sec.h2, color: '#fff', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
              Weeks, not months.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ ...sec.sub, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Every platform on this page was designed, built, and launched faster than a traditional agency
              builds a brochure site. AI-assisted development means you get more, faster, for less.
            </p>
          </Reveal>
        </div>
      </VideoSection>

      {/* ════ ABOUT / TEAM ════ */}
      <section id="about" style={sec.wrap}>
        <div style={sec.inner}>
          <Reveal><div style={sec.tag}>WHO WE ARE</div></Reveal>
          <Reveal delay={100}><h2 style={sec.h2}>Built by Two. Powered by AI.</h2></Reveal>
          <Reveal delay={200}>
            <p style={{ ...sec.sub, maxWidth: 540 }}>
              STOA is Tovah and Saleem — a designer and an engineer who build full platforms with AI.
              We don't outsource. We don't use templates. Every pixel and every feature is built specifically for your business.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div style={about.row}>
              <div style={about.card}>
                <div style={about.avatar}>T</div>
                <div style={about.name}>Tovah</div>
                <div style={about.role}>Design & Brand</div>
              </div>
              <div style={about.card}>
                <div style={about.avatar}>S</div>
                <div style={about.name}>Saleem</div>
                <div style={about.role}>Engineering & AWS</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section id="contact" style={cta.wrap}>
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
              <div style={cta.btns}>
                <a href="https://instagram.com/getstoa" target="_blank" rel="noopener" style={cta.btn}>@getstoa on Instagram</a>
                <a href="mailto:hello@getstoa.io" style={cta.btnGold}>hello@getstoa.io</a>
              </div>
            </Reveal>
          </div>
        </VideoSection>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={foot.wrap}>
        <img src="/images/logo.png" alt="STOA" style={foot.logo} />
        <div style={foot.name}>STOA</div>
        <div style={foot.tagline}>THE SELLER'S PLATFORM</div>
        <div style={foot.copy}>© 2026 Get Stoa LLC · Scottsdale, AZ</div>
      </footer>
    </>
  )
}

/* ════ STYLES ════ */

const hero = {
  wrap: { position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  video: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 1.5s ease' },
  overlay: { position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(4,4,12,0.7) 100%)', pointerEvents: 'none' },
  gradient: { position: 'absolute', inset: '-30%', width: '160%', height: '160%', background: 'radial-gradient(ellipse at 30% 40%, rgba(26,16,64,0.5) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(18,13,48,0.35) 0%, transparent 40%), rgba(4,4,12,0.35)', zIndex: 0 },
  content: { position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 800, padding: '0 24px' },
  tag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.3em', color: '#D4AF37', marginBottom: 28 },
  h1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 400, lineHeight: 1.1, margin: '0 0 28px', letterSpacing: '-0.02em' },
  sub: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300, fontSize: 'clamp(15px, 2vw, 20px)', lineHeight: 1.7, color: '#C8C4D0', margin: '0 0 48px' },
  actions: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: { display: 'inline-block', padding: '16px 36px', background: 'linear-gradient(135deg, #D4AF37, #E5C76B)', color: '#000', fontSize: 14, fontWeight: 600, borderRadius: 100, boxShadow: '0 0 30px rgba(212,175,55,0.3)', letterSpacing: '0.02em' },
  btnGhost: { display: 'inline-block', padding: '16px 36px', background: 'transparent', color: '#D4AF37', fontSize: 14, fontWeight: 500, borderRadius: 100, border: '1px solid rgba(212,175,55,0.3)' },
  scrollHint: { position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 2 },
  scrollLine: { width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, #D4AF37, transparent)', animation: 'float 2s ease-in-out infinite' },
}

const marq = {
  wrap: { overflow: 'hidden', borderTop: '1px solid rgba(212,175,55,0.08)', borderBottom: '1px solid rgba(212,175,55,0.08)', background: 'rgba(212,175,55,0.02)', padding: '18px 0' },
  track: { display: 'flex', width: 'max-content', animation: 'marquee 30s linear infinite' },
  set: { display: 'flex', alignItems: 'center', gap: 32, paddingRight: 32 },
  item: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.15em', color: '#D4AF37', whiteSpace: 'nowrap', textTransform: 'uppercase' },
  dot: { color: '#D4AF3740', fontSize: 12 },
}

const sec = {
  wrap: { padding: '100px 48px' },
  inner: { maxWidth: 1000, margin: '0 auto', textAlign: 'center' },
  tag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em', color: '#D4AF37', marginBottom: 16, textAlign: 'center' },
  h2: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, lineHeight: 1.15, color: '#F0EDE6', margin: '0 0 16px', textAlign: 'center' },
  sub: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, lineHeight: 1.7, color: '#908D9A', maxWidth: 520, margin: '0 auto 48px', textAlign: 'center' },
  threeCol: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 900, margin: '0 auto', textAlign: 'left' },
  col: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.08)', borderRadius: 20, padding: 28 },
  colIcon: { fontSize: 28, color: '#D4AF37', marginBottom: 16, filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.3))' },
  colTitle: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, color: '#F0EDE6', marginBottom: 16 },
  colList: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 },
  colItem: { fontSize: 14, color: '#908D9A', display: 'flex', alignItems: 'center', gap: 8 },
  colCheck: { color: '#D4AF37', fontSize: 10 },
}

const work = {
  card: { display: 'flex', gap: 48, alignItems: 'center', marginTop: 64, maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto', flexWrap: 'wrap' },
  cardLeft: { flex: '1 1 400px', minWidth: 300 },
  cardRight: { flex: '1 1 400px', minWidth: 300 },
  cardTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', color: '#D4AF37', marginBottom: 8 },
  cardTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: '#F0EDE6', margin: '0 0 12px' },
  cardDesc: { fontSize: 15, lineHeight: 1.7, color: '#908D9A', marginBottom: 16 },
  chipRow: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 },
  chip: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.05em', padding: '5px 10px', borderRadius: 100, background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.12)', color: '#D4AF37' },
  cardLink: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, color: '#D4AF37', display: 'inline-flex', alignItems: 'center', gap: 4 },
  browser: { borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' },
  browserBar: { background: '#1a1a2e', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 },
  browserDots: { display: 'flex', gap: 5, '& span': {} },
  browserUrl: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#666', flex: 1, textAlign: 'center' },
  browserBody: { height: 260, overflow: 'hidden', position: 'relative' },
  browserOverlay: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(4,4,12,0.5)', padding: 24 },
}

const about = {
  row: { display: 'flex', gap: 24, justifyContent: 'center', marginTop: 40 },
  card: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 20, padding: '32px 40px', textAlign: 'center', minWidth: 180 },
  avatar: { width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #E5C76B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 600, color: '#000', margin: '0 auto 12px', fontFamily: "'Playfair Display', serif" },
  name: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 500, color: '#F0EDE6', marginBottom: 4 },
  role: { fontSize: 13, color: '#5C5870' },
}

const cta = {
  wrap: {},
  btns: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' },
  btn: { display: 'inline-block', padding: '14px 32px', borderRadius: 100, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 14, fontWeight: 500, backdropFilter: 'blur(10px)' },
  btnGold: { display: 'inline-block', padding: '14px 32px', borderRadius: 100, background: 'linear-gradient(135deg, #D4AF37, #E5C76B)', color: '#000', fontSize: 14, fontWeight: 600, boxShadow: '0 0 30px rgba(212,175,55,0.3)' },
}

const foot = {
  wrap: { padding: '64px 48px 48px', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.06)' },
  logo: { width: 48, height: 48, objectFit: 'contain', margin: '0 auto 12px', opacity: 0.6 },
  name: { fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: '#D4AF37', letterSpacing: '0.15em', marginBottom: 4 },
  tagline: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.25em', color: '#333', marginBottom: 24 },
  copy: { fontSize: 12, color: '#222' },
}
