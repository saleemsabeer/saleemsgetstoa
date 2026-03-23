import { useState, useEffect, useRef } from 'react'
import LazyVideo from '../components/LazyVideo'

const SUPABASE_VIDEOS = 'https://ssdozdtdcrkaoayzhrsa.supabase.co/storage/v1/object/public/videos/'

function VideoDivider({ src, title, subtitle }) {
  return (
    <div style={vidStyles.wrap}>
      <div style={vidStyles.clip}>
        <LazyVideo src={src} style={vidStyles.video} autoPlay muted loop playsInline />
      </div>
      <div style={vidStyles.overlayTop} />
      <div style={vidStyles.overlayBottom} />
      <div style={vidStyles.content}>
        <h2 style={vidStyles.title}>{title}</h2>
        <p style={vidStyles.sub}>{subtitle}</p>
      </div>
    </div>
  )
}

function AnimatedHeadline({ visible }) {
  const words = [
    { text: 'Your', em: false }, { text: 'Brand.', em: false },
    { text: 'Your', em: false }, { text: 'Platform.', em: false },
    { text: 'Your', em: false }, { text: 'Way.', em: true },
  ]
  return (
    <h1 style={styles.heroH1}>
      {words.map((w, i) => (
        <span key={i} style={{
          display: 'inline-block',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: `opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1)`,
          transitionDelay: `${400 + i * 140}ms`,
          marginRight: '0.25em',
          fontStyle: w.em ? 'italic' : 'normal',
          color: w.em ? '#D4AF37' : '#F0EDE6',
        }}>
          {w.text}
        </span>
      ))}
    </h1>
  )
}

export default function HomePage({ editMode }) {
  const [heroVis, setHeroVis] = useState(false)
  const [heroVideoLoaded, setHeroVideoLoaded] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeroVis(true), 200)
    return () => clearTimeout(t)
  }, [])

  const handleEdit = () => {
    if (editMode) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  const features = [
    { icon: '◈', title: 'Stunning Website', desc: 'A premium storefront with video backgrounds, animations, and a built-in CMS.' },
    { icon: '✎', title: 'Edit Everything Live', desc: 'Click the pencil, edit any text, publish instantly. No code needed.' },
    { icon: '⬡', title: 'Online Store', desc: 'Products, cart, checkout — with real inventory tracking and order management.' },
    { icon: '◎', title: 'Events & Booking', desc: 'Sell tickets, track attendance, send reminders, manage check-ins.' },
    { icon: '▦', title: 'Admin Dashboard', desc: 'KPIs, orders, inventory, reports — your entire back office in one view.' },
    { icon: '◇', title: 'AI Design Studio', desc: 'Generate custom branded images with AI. No designer needed.' },
    { icon: '✉', title: 'Email & Social', desc: 'Campaign builder, templates, social post creator — all built in.' },
    { icon: '★', title: 'Memberships', desc: 'Tiered plans, member portals, automatic tracking and perks.' },
    { icon: '◉', title: 'Visitor Tracking', desc: 'Foot traffic, volunteer management, shift scheduling, hour logging.' },
    { icon: '⊞', title: 'Point of Sale', desc: 'Ring up sales on a tablet. Syncs with inventory and orders.' },
    { icon: '♡', title: 'Donations', desc: 'Fundraising pages, donor management, campaign tracking, tax receipts.' },
    { icon: '◐', title: 'AI Everywhere', desc: 'Smart summaries, coaching tips, reorder predictions, content generation.' },
  ]

  return (
    <div style={{ background: '#04040c' }}>
      {/* ── HERO ── */}
      <section style={styles.hero}>
        <video
          style={{ ...styles.heroVideo, opacity: heroVideoLoaded ? 1 : 0 }}
          src={SUPABASE_VIDEOS + 'milky-way.mp4'}
          autoPlay muted loop playsInline
          onLoadedData={() => setHeroVideoLoaded(true)}
        />
        <div style={styles.heroOverlay} />
        <div style={styles.heroGradient} />
        <div style={styles.heroContent}>
          <div style={{
            ...styles.label,
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1)',
            transitionDelay: '0.15s',
          }} data-editable="hero-label">
            // GET STOA · THE SELLER'S PLATFORM
          </div>
          <AnimatedHeadline visible={heroVis} />
          <p style={{
            ...styles.heroSub,
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? 'none' : 'translateY(16px)',
            transition: 'opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1)',
            transitionDelay: '1.6s',
          }} data-editable="hero-subtitle">
            Everything your business needs — beautifully designed, AI-powered, ready to launch.
          </p>
          <div style={{
            ...styles.heroActions,
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? 'none' : 'translateY(16px)',
            transition: 'opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1)',
            transitionDelay: '1.9s',
          }}>
            <button style={styles.btnPrimary}>Explore the Platform ↓</button>
            <button style={styles.btnGhost}>Book a Demo</button>
          </div>
        </div>
      </section>

      {/* Edit mode banner */}
      {editMode && (
        <div style={styles.editBanner}>
          ✎ Edit Mode — Click any text on this page to change it. This is how your clients will customize their site.
        </div>
      )}

      {/* ── STATS MARQUEE ── */}
      <div style={styles.statsBar}>
        {[
          { val: '22+', label: 'Pages' },
          { val: '67', label: 'Products' },
          { val: '4', label: 'Platforms Built' },
          { val: '100%', label: 'Customizable' },
          { val: '0', label: 'Code Required' },
        ].map(s => (
          <div key={s.label} style={styles.stat}>
            <span style={styles.statVal} data-editable={`stat-${s.label}`}>{s.val}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── VIDEO DIVIDER 1 ── */}
      <VideoDivider
        src={SUPABASE_VIDEOS + 'nebula.mp4'}
        title="See What's Possible"
        subtitle="Real platforms, already running. Not mockups — working software."
      />

      {/* ── FEATURES ── */}
      <section style={styles.section}>
        <div style={styles.label} data-editable="features-tag">EVERYTHING YOU NEED</div>
        <h2 style={styles.sectionTitle} data-editable="features-title">One Platform, Every Feature</h2>
        <p style={styles.sectionSub} data-editable="features-sub">
          We didn't build a template. We built every feature a business needs — beautiful, fast, and ready to make yours.
        </p>
        <div style={styles.featureGrid}>
          {features.map(f => (
            <div key={f.title} style={styles.featureCard}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <div style={styles.featureTitle} data-editable={`f-${f.title}`}>{f.title}</div>
              <div style={styles.featureDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIDEO DIVIDER 2 ── */}
      <VideoDivider
        src={SUPABASE_VIDEOS + 'observatory-hero.mp4'}
        title="Built Different"
        subtitle="Every platform below was built with the same technology powering yours."
      />

      {/* ── CASE STUDIES ── */}
      <section style={styles.section}>
        <div style={styles.label}>PLATFORMS WE'VE BUILT</div>
        <h2 style={styles.sectionTitle} data-editable="cases-title">Real Software, Running Today</h2>
        <div style={styles.caseGrid}>
          {[
            { name: 'Dark Sky Discovery Center', type: 'Nonprofit · Gift Shop · Events · 22+ Admin Pages', desc: 'Full storefront with video backgrounds, AI design studio, POS, edit mode CMS, social media creator, volunteer portal, facility booking.' },
            { name: 'MedFlow', type: 'Medical Sales CRM · 3 Portals · 22 Admin Pages', desc: 'Admin, sales rep, and doctor portals. AI coaching, compliance tracking, commission tiers, route planning, content library.' },
            { name: 'Create & Source', type: 'Merchandise · Sourcing · Operations', desc: 'Client portal and internal ops dashboard. Order tracking, vendor management, product sourcing, team collaboration.' },
          ].map(c => (
            <div key={c.name} style={styles.caseCard}>
              <div style={styles.caseName} data-editable={`case-${c.name}`}>{c.name}</div>
              <div style={styles.caseType}>{c.type}</div>
              <div style={styles.caseDesc}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIDEO DIVIDER 3 ── */}
      <VideoDivider
        src={SUPABASE_VIDEOS + 'desert-night-sky.mp4'}
        title="Your Turn"
        subtitle="Let's build your platform."
      />

      {/* ── HOW IT WORKS ── */}
      <section style={styles.section}>
        <div style={styles.label}>HOW IT WORKS</div>
        <h2 style={styles.sectionTitle} data-editable="how-title">From Idea to Launch</h2>
        <div style={styles.stepList}>
          {[
            { num: '01', title: 'Explore', desc: 'Browse every page in the sidebar — storefront, shop, events, admin dashboard. This entire site is a working demo.' },
            { num: '02', title: 'Try Editing', desc: 'Tap the pencil icon, then click any text. Change headlines, descriptions, anything. This is how your team will manage content.' },
            { num: '03', title: 'See the Back Office', desc: 'Switch to Dashboard, Design Studio, Email Campaigns. See KPIs, send campaigns, generate images with AI.' },
            { num: '04', title: 'Make It Yours', desc: 'Tell us your brand, your features, your flow. We customize everything and launch your platform.' },
          ].map(s => (
            <div key={s.num} style={styles.step}>
              <div style={styles.stepNum}>{s.num}</div>
              <div>
                <div style={styles.stepTitle} data-editable={`step-${s.num}`}>{s.title}</div>
                <div style={styles.stepDesc}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={styles.cta}>
        <div style={styles.label}>READY?</div>
        <h2 style={{ ...styles.sectionTitle, fontSize: 'clamp(28px, 7vw, 44px)' }} data-editable="cta-title">
          Let's Build Your Platform
        </h2>
        <p style={{ ...styles.sectionSub, marginBottom: 24 }}>
          Everything you just explored — customized to your brand, your business, your way.
        </p>
        <button style={styles.btnPrimary}>Get Started →</button>
        <div style={styles.footer}>
          © 2026 Get Stoa LLC · The Seller's Platform · @getstoa
        </div>
      </section>

      {/* Toast */}
      {showToast && <div style={styles.toast}>✓ Saved</div>}
    </div>
  )
}

/* ── Video Divider styles ── */
const vidStyles = {
  wrap: {
    position: 'relative',
    height: 400,
    overflow: 'hidden',
  },
  clip: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
  },
  overlayTop: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 120,
    background: 'linear-gradient(to bottom, #04040c, transparent)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 120,
    background: 'linear-gradient(to top, #04040c, transparent)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  content: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    textAlign: 'center',
    padding: '0 24px',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic',
    fontSize: 'clamp(28px, 5vw, 48px)',
    fontWeight: 400,
    lineHeight: 1.1,
    color: '#fff',
    margin: '0 0 12px',
    textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.8), 0 8px 40px rgba(0,0,0,0.6)',
  },
  sub: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 300,
    fontSize: 'clamp(13px, 2vw, 17px)',
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.9)',
    margin: 0,
    textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.7)',
  },
}

/* ── Main page styles ── */
const styles = {
  /* Hero */
  hero: {
    position: 'relative',
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 24px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroVideo: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 1.2s ease',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(4,4,12,0.6) 100%)',
    pointerEvents: 'none',
  },
  heroGradient: {
    position: 'absolute',
    inset: '-30%',
    width: '160%',
    height: '160%',
    background: `
      radial-gradient(ellipse at 30% 40%, rgba(26,16,64,0.6) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 60%, rgba(18,13,48,0.45) 0%, transparent 40%),
      rgba(4,4,12,0.4)
    `,
    zIndex: 0,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 700,
  },
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.25em',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 24,
    outline: 'none',
  },
  heroH1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(32px, 7vw, 56px)',
    fontWeight: 400,
    lineHeight: 1.15,
    margin: '0 0 24px',
    letterSpacing: '-0.01em',
  },
  heroSub: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 300,
    fontSize: 'clamp(15px, 2.5vw, 20px)',
    lineHeight: 1.7,
    color: '#908D9A',
    letterSpacing: '0.04em',
    margin: '0 0 44px',
    outline: 'none',
  },
  heroActions: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #D4AF37, #E5C76B)',
    color: '#000',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 100,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(212,175,55,0.25)',
  },
  btnGhost: {
    padding: '14px 32px',
    background: 'transparent',
    color: '#D4AF37',
    fontWeight: 500,
    fontSize: 14,
    borderRadius: 100,
    border: '1px solid rgba(212,175,55,0.3)',
    cursor: 'pointer',
  },

  /* Edit banner */
  editBanner: {
    background: '#D4AF37',
    color: '#000',
    textAlign: 'center',
    padding: '12px 16px',
    fontSize: 13,
    fontWeight: 600,
    position: 'sticky',
    top: 52,
    zIndex: 25,
  },

  /* Stats */
  statsBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(16px, 4vw, 40px)',
    padding: '48px 20px',
    borderTop: '1px solid rgba(212,175,55,0.08)',
    borderBottom: '1px solid rgba(212,175,55,0.08)',
    background: 'rgba(212,175,55,0.02)',
    flexWrap: 'wrap',
  },
  stat: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  statVal: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(24px, 4vw, 36px)',
    fontWeight: 600,
    color: '#D4AF37',
    outline: 'none',
  },
  statLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: '0.15em',
    color: '#5C5870',
    textTransform: 'uppercase',
  },

  /* Sections */
  section: {
    padding: 'clamp(48px, 8vw, 80px) 20px',
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(24px, 5vw, 40px)',
    fontWeight: 400,
    color: '#F0EDE6',
    textAlign: 'center',
    margin: '0 0 12px',
    outline: 'none',
  },
  sectionSub: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 15,
    lineHeight: 1.6,
    color: '#908D9A',
    textAlign: 'center',
    maxWidth: 440,
    margin: '0 auto 40px',
    outline: 'none',
  },

  /* Feature grid */
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
    maxWidth: 560,
    margin: '0 auto',
  },
  featureCard: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(212,175,55,0.08)',
    borderRadius: 14,
    padding: 18,
    transition: 'border-color 0.3s, background 0.3s',
  },
  featureIcon: {
    fontSize: 22,
    color: '#D4AF37',
    marginBottom: 10,
    filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.3))',
  },
  featureTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: '#F0EDE6',
    marginBottom: 4,
    outline: 'none',
  },
  featureDesc: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#5C5870',
  },

  /* Case studies */
  caseGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    maxWidth: 500,
    margin: '0 auto',
  },
  caseCard: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(212,175,55,0.1)',
    borderRadius: 16,
    padding: 20,
  },
  caseName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 500,
    color: '#D4AF37',
    marginBottom: 4,
    outline: 'none',
  },
  caseType: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.1em',
    color: '#5C5870',
    marginBottom: 10,
  },
  caseDesc: {
    fontSize: 13,
    lineHeight: 1.6,
    color: '#908D9A',
  },

  /* Steps */
  stepList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    maxWidth: 480,
    margin: '40px auto 0',
  },
  step: {
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
  },
  stepNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 32,
    fontWeight: 500,
    color: '#D4AF37',
    lineHeight: 1,
    flexShrink: 0,
    width: 44,
    opacity: 0.6,
  },
  stepTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 17,
    fontWeight: 600,
    color: '#F0EDE6',
    marginBottom: 6,
    outline: 'none',
  },
  stepDesc: {
    fontSize: 13,
    lineHeight: 1.6,
    color: '#908D9A',
  },

  /* CTA */
  cta: {
    padding: '80px 24px 48px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  footer: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.1em',
    color: '#222',
    marginTop: 48,
  },

  /* Toast */
  toast: {
    position: 'fixed',
    top: 100,
    right: 20,
    padding: '10px 20px',
    background: '#D4AF37',
    color: '#000',
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 600,
    zIndex: 100,
  },
}
