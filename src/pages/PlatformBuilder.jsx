import { useState, useEffect, useRef } from 'react'
import LazyVideo from '../components/LazyVideo'

const SAVE_KEY = 'stoa_platform'
const VIDEO_URL = 'https://ssdozdtdcrkaoayzhrsa.supabase.co/storage/v1/object/public/videos/milky-way.mp4'

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
  museum: { name: 'Museum', ids: ['hero','events','shop','memberships','donations','gallery','team','contact','dashboard','inventory','orders','pos','email','social','reports','volunteer'] },
  retail: { name: 'Retail', ids: ['hero','shop','testimonials','contact','dashboard','inventory','orders','pos','email','sms','social','reviews','referrals','giftcards','portal','reports'] },
  salon: { name: 'Salon', ids: ['hero','services','booking','gallery','testimonials','team','contact','dashboard','patients','schedule','dm_inbox','email','sms','reviews','retention','referrals','wallets','portal','reports'] },
  blank: { name: 'Start Empty', ids: ['hero','dashboard'] },
}

const CATS = [...new Set(FEATURES.map(f => f.cat))]

function load() { try { return JSON.parse(localStorage.getItem(SAVE_KEY)) } catch { return null } }
function save(d) { try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)) } catch (e) { console.warn('localStorage save failed:', e.message) } }

/* ── Reveal on scroll ── */
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

/* ── Glass card base style builder ── */
const glass = (extra = {}) => ({
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: 16,
  transition: 'all 0.3s cubic-bezier(.16,1,.3,1)',
  ...extra,
})

/* ── Admin drawer content renderers ── */
function AdminServices({ color }) {
  const services = [
    { name: 'Botox - Forehead', price: '$250', duration: '30 min', status: 'Active' },
    { name: 'Dermal Fillers - Lips', price: '$650', duration: '45 min', status: 'Active' },
    { name: 'Chemical Peel', price: '$180', duration: '60 min', status: 'Active' },
    { name: 'Laser Hair Removal', price: '$320', duration: '40 min', status: 'Draft' },
    { name: 'Microneedling', price: '$275', duration: '50 min', status: 'Active' },
  ]
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#555' }}>5 services</div>
        <button style={{ padding: '7px 16px', borderRadius: 100, background: color, color: '#fff', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)' }}>+ Add Service</button>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E8E8E4', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', padding: '10px 16px', background: '#F5F5F2', borderBottom: '1px solid #E8E8E4' }}>
          {['Service', 'Price', 'Duration', 'Status', ''].map(h => (
            <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', color: '#999', fontWeight: 600 }}>{h}</div>
          ))}
        </div>
        {services.map((s, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', padding: '14px 16px', borderBottom: i < services.length - 1 ? '1px solid #F0F0EC' : 'none', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#222' }}>{s.name}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#444' }}>{s.price}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: '#777' }}>{s.duration}</div>
            <div><span style={{ padding: '3px 10px', borderRadius: 100, fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-ui)', background: s.status === 'Active' ? '#E8F5E9' : '#FFF3E0', color: s.status === 'Active' ? '#2E7D32' : '#E65100' }}>{s.status}</span></div>
            <button style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #E0E0DC', fontSize: 11, color: '#666', fontFamily: 'var(--font-ui)' }}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminEvents({ color }) {
  const events = [
    { name: 'VIP Glow Night', date: 'Mar 20', time: '6:00 PM', capacity: 30, booked: 24, status: 'Live' },
    { name: 'Botox & Bubbles', date: 'Mar 25', time: '7:00 PM', capacity: 20, booked: 20, status: 'Sold Out' },
    { name: 'Open House', date: 'Apr 1', time: '2:00 PM', capacity: 50, booked: 12, status: 'Live' },
  ]
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#555' }}>3 upcoming events</div>
        <button style={{ padding: '7px 16px', borderRadius: 100, background: color, color: '#fff', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)' }}>+ New Event</button>
      </div>
      {events.map((ev, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 12, border: '1px solid #E8E8E4', padding: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 54, height: 54, borderRadius: 10, background: `${color}12`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: color, lineHeight: 1 }}>{ev.date.split(' ')[1]}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#999', letterSpacing: '0.1em' }}>{ev.date.split(' ')[0].toUpperCase()}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: '#222' }}>{ev.name}</div>
              <span style={{ padding: '2px 8px', borderRadius: 100, fontSize: 9, fontWeight: 600, fontFamily: 'var(--font-ui)', background: ev.status === 'Sold Out' ? '#FFEBEE' : '#E8F5E9', color: ev.status === 'Sold Out' ? '#C62828' : '#2E7D32' }}>{ev.status}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: '#888', marginBottom: 6 }}>{ev.date} at {ev.time}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: '#F0F0EC', overflow: 'hidden' }}>
                <div style={{ width: `${(ev.booked/ev.capacity)*100}%`, height: '100%', borderRadius: 2, background: ev.booked === ev.capacity ? '#EF5350' : color, transition: 'width 0.3s ease' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#888' }}>{ev.booked}/{ev.capacity}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function AdminBooking({ color }) {
  const appointments = [
    { time: '9:00 AM', patient: 'Sarah Mitchell', service: 'Botox - Forehead', provider: 'Dr. Chen', status: 'Confirmed' },
    { time: '9:45 AM', patient: 'Jessica Park', service: 'Lip Filler', provider: 'Dr. Chen', status: 'Checked In' },
    { time: '10:30 AM', patient: 'Emily Rodriguez', service: 'Chemical Peel', provider: 'Amy L., RN', status: 'In Progress' },
    { time: '11:15 AM', patient: 'Michael Torres', service: 'Consultation', provider: 'Dr. Chen', status: 'Confirmed' },
    { time: '12:00 PM', patient: 'Lauren Kim', service: 'Microneedling', provider: 'Amy L., RN', status: 'Confirmed' },
  ]
  const statusColors = { 'Confirmed': { bg: '#E3F2FD', fg: '#1565C0' }, 'Checked In': { bg: '#FFF3E0', fg: '#E65100' }, 'In Progress': { bg: '#E8F5E9', fg: '#2E7D32' } }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700, color: '#222' }}>Today's Schedule</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: '#999' }}>Monday, March 17, 2026</div>
        </div>
        <button style={{ padding: '7px 16px', borderRadius: 100, background: color, color: '#fff', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)' }}>+ New Booking</button>
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {appointments.map((a, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 10, border: '1px solid #E8E8E4', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: color, fontWeight: 600, width: 70, flexShrink: 0 }}>{a.time}</div>
            <div style={{ width: 1, height: 32, background: '#E8E8E4' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#222' }}>{a.patient}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: '#888' }}>{a.service} with {a.provider}</div>
            </div>
            <span style={{ padding: '3px 10px', borderRadius: 100, fontSize: 9, fontWeight: 600, fontFamily: 'var(--font-ui)', background: statusColors[a.status]?.bg || '#F5F5F2', color: statusColors[a.status]?.fg || '#666' }}>{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminDashboard({ color }) {
  const kpis = [
    { label: 'Revenue', value: '$12,480', change: '+18%', up: true, icon: '$' },
    { label: 'Appointments', value: '34', change: '+6', up: true, icon: '#' },
    { label: 'New Clients', value: '12', change: '+3', up: true, icon: '+' },
    { label: 'Alerts', value: '2', change: 'action needed', up: false, icon: '!' },
  ]
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 4 }}>Dashboard</div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: '#999', marginBottom: 16 }}>This week's performance</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, border: '1px solid #E8E8E4', padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: '#888' }}>{k.label}</div>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: color, fontWeight: 700 }}>{k.icon}</div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: '#111', marginBottom: 4 }}>{k.value}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: k.up ? '#2E7D32' : '#E65100' }}>{k.change}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E8E8E4', padding: 14 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#666', marginBottom: 8 }}>Recent Activity</div>
        {['Sarah M. booked Botox - 2 min ago', 'Payment received $650 - 14 min ago', 'New review: 5 stars - 1 hr ago', 'Inventory alert: Juvederm low - 3 hr ago'].map((a, i) => (
          <div key={i} style={{ padding: '8px 0', borderBottom: i < 3 ? '1px solid #F5F5F2' : 'none', fontFamily: 'var(--font-ui)', fontSize: 12, color: '#555' }}>{a}</div>
        ))}
      </div>
    </div>
  )
}

function AdminDmInbox({ color }) {
  const convos = [
    { name: 'Sarah M.', platform: 'IG', last: 'What time are you open Saturday?', time: '2m', unread: true },
    { name: 'Jess P.', platform: 'FB', last: 'Can I reschedule my appointment?', time: '18m', unread: true },
    { name: 'Lauren K.', platform: 'IG', last: 'Thanks so much! Love my results', time: '1h', unread: false },
    { name: 'Emily R.', platform: 'TikTok', last: 'Do you offer payment plans?', time: '3h', unread: false },
  ]
  const platformColors = { IG: '#E1306C', FB: '#1877F2', TikTok: '#000' }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#555' }}>4 conversations</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['All', 'IG', 'FB', 'TikTok'].map((p, i) => (
            <button key={p} style={{ padding: '4px 10px', borderRadius: 100, fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-ui)', background: i === 0 ? '#111' : '#F5F5F2', color: i === 0 ? '#fff' : '#666', border: 'none' }}>{p}</button>
          ))}
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E8E8E4', overflow: 'hidden' }}>
        {convos.map((c, i) => (
          <div key={i} style={{ padding: '14px 16px', borderBottom: i < convos.length - 1 ? '1px solid #F0F0EC' : 'none', display: 'flex', alignItems: 'center', gap: 12, background: c.unread ? '#FAFAF8' : '#fff', cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 14, color: color, fontWeight: 600, flexShrink: 0 }}>{c.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: c.unread ? 700 : 500, color: '#222' }}>{c.name}</div>
                <span style={{ padding: '1px 6px', borderRadius: 100, fontSize: 8, fontWeight: 700, background: `${platformColors[c.platform]}18`, color: platformColors[c.platform] }}>{c.platform}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.last}</div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#BBB', flexShrink: 0 }}>{c.time}</div>
            {c.unread && <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, background: '#fff', borderRadius: 12, border: '1px solid #E8E8E4', padding: 12, display: 'flex', gap: 8 }}>
        <input placeholder="Type a reply..." style={{ flex: 1, padding: '8px 12px', border: '1px solid #E8E8E4', borderRadius: 8, fontSize: 12, outline: 'none', fontFamily: 'var(--font-ui)' }} />
        <button style={{ padding: '8px 16px', borderRadius: 8, background: color, color: '#fff', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)' }}>Send</button>
      </div>
    </div>
  )
}

function AdminInventory({ color }) {
  const items = [
    { name: 'Juvederm Ultra', qty: 3, min: 10, status: 'Low Stock' },
    { name: 'Botox (100u)', qty: 24, min: 10, status: 'In Stock' },
    { name: 'Restylane Lyft', qty: 8, min: 5, status: 'In Stock' },
    { name: 'Hyaluronidase', qty: 1, min: 3, status: 'Critical' },
    { name: 'Topical Numbing', qty: 18, min: 5, status: 'In Stock' },
  ]
  const statusStyle = { 'In Stock': { bg: '#E8F5E9', fg: '#2E7D32' }, 'Low Stock': { bg: '#FFF3E0', fg: '#E65100' }, 'Critical': { bg: '#FFEBEE', fg: '#C62828' } }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#555' }}>5 items tracked</div>
        <button style={{ padding: '7px 16px', borderRadius: 100, background: color, color: '#fff', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)' }}>+ Add Item</button>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E8E8E4', overflow: 'hidden' }}>
        {items.map((item, i) => (
          <div key={i} style={{ padding: '14px 16px', borderBottom: i < items.length - 1 ? '1px solid #F0F0EC' : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#222' }}>{item.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#999' }}>Min: {item.min} units</div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: item.qty <= item.min ? '#E65100' : '#222', width: 40, textAlign: 'center' }}>{item.qty}</div>
            <span style={{ padding: '3px 10px', borderRadius: 100, fontSize: 9, fontWeight: 600, fontFamily: 'var(--font-ui)', background: statusStyle[item.status]?.bg, color: statusStyle[item.status]?.fg, minWidth: 70, textAlign: 'center' }}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminEmail({ color }) {
  const campaigns = [
    { name: 'March Specials', sent: '2,450', opened: '42%', clicked: '18%', date: 'Mar 12', status: 'Sent' },
    { name: 'Valentine\'s Glow Up', sent: '2,380', opened: '38%', clicked: '14%', date: 'Feb 10', status: 'Sent' },
    { name: 'New Year Refresh', sent: '2,200', opened: '45%', clicked: '22%', date: 'Jan 3', status: 'Sent' },
    { name: 'Spring Preview', sent: '--', opened: '--', clicked: '--', date: 'Mar 28', status: 'Draft' },
  ]
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#555' }}>4 campaigns</div>
        <button style={{ padding: '7px 16px', borderRadius: 100, background: color, color: '#fff', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)' }}>+ New Campaign</button>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E8E8E4', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', padding: '10px 16px', background: '#F5F5F2', borderBottom: '1px solid #E8E8E4' }}>
          {['Campaign', 'Sent', 'Opened', 'Clicked', 'Status'].map(h => (
            <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', color: '#999', fontWeight: 600 }}>{h}</div>
          ))}
        </div>
        {campaigns.map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', padding: '14px 16px', borderBottom: i < campaigns.length - 1 ? '1px solid #F0F0EC' : 'none', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#222' }}>{c.name}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: '#999' }}>{c.date}</div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#444' }}>{c.sent}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: c.opened !== '--' ? '#2E7D32' : '#BBB' }}>{c.opened}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: c.clicked !== '--' ? color : '#BBB' }}>{c.clicked}</div>
            <span style={{ padding: '3px 10px', borderRadius: 100, fontSize: 9, fontWeight: 600, fontFamily: 'var(--font-ui)', background: c.status === 'Sent' ? '#E8F5E9' : '#FFF3E0', color: c.status === 'Sent' ? '#2E7D32' : '#E65100', textAlign: 'center' }}>{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminGeneric({ feature, color }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E8E8E4', padding: 28, textAlign: 'center' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: color }}>*</div>
      </div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 700, color: '#222', marginBottom: 6 }}>{feature?.name || 'Admin Panel'}</div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: '#888', lineHeight: 1.6, maxWidth: 320, margin: '0 auto 20px' }}>{feature?.desc || 'Manage this feature from your admin panel.'} Changes here update the website instantly.</div>
      <div style={{ display: 'grid', gap: 10, maxWidth: 300, margin: '0 auto' }}>
        <input placeholder="Title" style={{ padding: '10px 14px', border: '1px solid #E8E8E4', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'var(--font-ui)' }} />
        <textarea placeholder="Description..." rows={3} style={{ padding: '10px 14px', border: '1px solid #E8E8E4', borderRadius: 8, fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'var(--font-ui)' }} />
        <button style={{ padding: '10px 20px', borderRadius: 100, background: color, color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-ui)' }}>Save Changes</button>
      </div>
    </div>
  )
}

function renderAdminContent(featureId, color) {
  const feature = FEATURES.find(f => f.id === featureId)
  switch (featureId) {
    case 'services': return <AdminServices color={color} />
    case 'events': return <AdminEvents color={color} />
    case 'booking': case 'schedule': return <AdminBooking color={color} />
    case 'dashboard': return <AdminDashboard color={color} />
    case 'dm_inbox': return <AdminDmInbox color={color} />
    case 'inventory': return <AdminInventory color={color} />
    case 'email': return <AdminEmail color={color} />
    default: return <AdminGeneric feature={feature} color={color} />
  }
}

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
  const [heroVis, setHeroVis] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty('--brand', color)
  }, [color])

  useEffect(() => {
    if (step === 'live' && name) save({ name, color, features, texts })
  }, [name, color, features, texts, step])

  useEffect(() => {
    if (step === 'live') {
      setTimeout(() => setHeroVis(true), 300)
    }
  }, [step])

  const has = (id) => features.includes(id)
  const toggle = (id) => setFeatures(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id])
  const applyPreset = (key) => { setPreset(key); setFeatures(PRESETS[key].ids) }
  const txt = (id, def) => texts[id] || def

  const E = ({ id, d, tag: T = 'span', s = {} }) => {
    const v = txt(id, d)
    if (!editing) return <T style={s}>{v}</T>
    return <T contentEditable suppressContentEditableWarning style={{ ...s, outline: `2px dashed ${color}44`, outlineOffset: 3, cursor: 'text', borderRadius: 4 }} onBlur={e => setTexts(p => ({ ...p, [id]: e.target.innerText }))} dangerouslySetInnerHTML={{ __html: v }} />
  }

  // Service icons/emojis for cards
  const serviceData = [
    { icon: '\u2728', name: 'Botox & Fillers', desc: 'Smooth wrinkles and restore volume with premium injectables.', price: 'From $250' },
    { icon: '\u2604\uFE0F', name: 'Laser Treatments', desc: 'Advanced laser technology for skin resurfacing and hair removal.', price: 'From $320' },
    { icon: '\uD83C\uDF3F', name: 'Body Contouring', desc: 'Non-invasive sculpting to define your silhouette.', price: 'From $500' },
    { icon: '\uD83D\uDCA0', name: 'Skin Rejuvenation', desc: 'Facials, peels, and microneedling for radiant skin.', price: 'From $180' },
    { icon: '\uD83E\uDDD8', name: 'Wellness', desc: 'IV therapy, vitamin shots, and holistic treatments.', price: 'From $150' },
    { icon: '\uD83D\uDCAC', name: 'Consultations', desc: 'Personalized treatment planning with our experts.', price: 'Complimentary' },
  ]

  // Animated headline words
  const heroWords = [
    { t: txt('hero-w1', 'Your'), em: false },
    { t: txt('hero-w2', 'Beauty,'), em: false },
    { t: txt('hero-w3', 'Our'), em: false },
    { t: txt('hero-w4', 'Expertise.'), em: true },
  ]

  // ── SETUP ──
  if (step === 'setup') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 640, width: '100%' }}>
        <button onClick={onBack} style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text2)', marginBottom: 24 }}>&larr; Back to Stoa</button>
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
          Launch Your Platform &rarr;
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
        }}>{editing ? '\u2713 Editing' : '\u270E Edit'}</button>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          padding: '7px 14px', borderRadius: 100, fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)',
          background: menuOpen ? color : 'transparent', color: menuOpen ? '#000' : 'var(--text2)',
          border: menuOpen ? 'none' : '1px solid var(--border)',
        }}>{'\u2630'} {features.length}</button>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--border)', cursor: 'pointer', padding: 2 }} />
        <button onClick={() => { setStep('setup') }} style={{ padding: '5px 10px', borderRadius: 100, fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--muted)', letterSpacing: '0.1em' }}>SETUP</button>
        <button onClick={onBack} style={{ padding: '5px 10px', borderRadius: 100, fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--muted)', letterSpacing: '0.1em' }}>STOA</button>
      </div>

      {/* Edit mode banner */}
      {editing && <div style={{ position: 'fixed', top: 68, left: '50%', transform: 'translateX(-50%)', zIndex: 150, padding: '7px 20px', borderRadius: 100, background: color, color: '#000', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', fontWeight: 600, boxShadow: `0 4px 20px ${color}40` }}>EDIT MODE — Click any text</div>}

      {/* ═══ FEATURE MENU ═══ */}
      {menuOpen && (
        <div role="presentation" style={{ position: 'fixed', inset: 0, zIndex: 250, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }} onClick={() => setMenuOpen(false)}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 360, maxWidth: '90vw', background: 'var(--bg)', borderLeft: '1px solid var(--border)', overflowY: 'auto', padding: '28px 20px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: 'var(--text)' }}>Features</h3>
              <button onClick={() => setMenuOpen(false)} style={{ fontSize: 16, color: 'var(--text2)' }}>{'\u2715'}</button>
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
                    }}>{has(f.id) && '\u2713'}</div>
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
        <div role="presentation" style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setAdminFeature(null)}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 560, maxWidth: '95vw', background: '#FAFAF8', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E5E5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', color: '#999' }}>ADMIN</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 600, color: '#111' }}>{FEATURES.find(f => f.id === adminFeature)?.name}</div>
              </div>
              <button onClick={() => setAdminFeature(null)} style={{ padding: '6px 14px', borderRadius: 100, background: '#111', color: '#fff', fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 500 }}>Close Admin</button>
            </div>
            <div style={{ padding: 20 }}>
              {renderAdminContent(adminFeature, color)}
            </div>
          </div>
        </div>
      )}

      {/* ═══ THE WEBSITE ═══ */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(4,4,12,0.88)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0 36px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <E id="brand" d={name} s={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: color, letterSpacing: '0.05em' }} />
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {has('services') && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text2)', cursor: 'pointer', transition: 'color 0.2s' }}>Services</span>}
          {has('booking') && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text2)', cursor: 'pointer' }}>Book</span>}
          {has('shop') && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text2)', cursor: 'pointer' }}>Shop</span>}
          {has('events') && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text2)', cursor: 'pointer' }}>Events</span>}
          {has('contact') && <button style={{ padding: '7px 18px', borderRadius: 100, background: `linear-gradient(135deg, ${color}, ${color}CC)`, color: '#000', fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, boxShadow: `0 0 16px ${color}25` }}>Contact</button>}
        </div>
      </nav>

      <div style={{ paddingTop: 0 }}>

        {/* ═══ HERO — Cinematic Video ═══ */}
        {has('hero') && (
          <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {/* Video background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <LazyVideo
                src={VIDEO_URL}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                autoPlay muted loop playsInline
              />
            </div>
            {/* Overlays */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(4,4,12,0.7) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(4,4,12,0.4)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, rgba(4,4,12,0.8), transparent)', zIndex: 2, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to top, #04040c, transparent)', zIndex: 2, pointerEvents: 'none' }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', maxWidth: 750, padding: '0 24px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em', color: color, marginBottom: 28,
                opacity: heroVis ? 1 : 0, transform: heroVis ? 'none' : 'translateY(16px)',
                transition: 'all 0.9s cubic-bezier(.16,1,.3,1)', transitionDelay: '0.2s',
              }}>
                {editing ? <E id="hero-tag" d={`Welcome to ${name}`} s={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em', color: color }} /> : txt('hero-tag', `Welcome to ${name}`)}
              </div>

              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 400, lineHeight: 1.1, margin: '0 0 28px', letterSpacing: '-0.02em' }}>
                {heroWords.map((w, i) => (
                  <span key={i} style={{
                    display: 'inline-block',
                    opacity: heroVis ? 1 : 0,
                    transform: heroVis ? 'none' : 'translateY(24px)',
                    transition: 'all 0.7s cubic-bezier(.16,1,.3,1)',
                    transitionDelay: `${500 + i * 150}ms`,
                    marginRight: '0.22em',
                    fontStyle: w.em ? 'italic' : 'normal',
                    color: w.em ? color : '#F0EDE6',
                  }}>
                    {w.t}
                  </span>
                ))}
              </h1>

              <p style={{
                fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 'clamp(15px, 2vw, 20px)', lineHeight: 1.7, color: '#C8C4D0', margin: '0 0 44px',
                opacity: heroVis ? 1 : 0, transform: heroVis ? 'none' : 'translateY(16px)',
                transition: 'all 1s cubic-bezier(.16,1,.3,1)', transitionDelay: '1.3s',
              }}>
                {editing ? <E id="hero-p" d="Premium treatments tailored to your unique goals." s={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 'inherit', lineHeight: 'inherit', color: 'inherit' }} /> : txt('hero-p', 'Premium treatments tailored to your unique goals.')}
              </p>

              <div style={{
                display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap',
                opacity: heroVis ? 1 : 0, transform: heroVis ? 'none' : 'translateY(16px)',
                transition: 'all 1s cubic-bezier(.16,1,.3,1)', transitionDelay: '1.6s',
              }}>
                {has('booking') && <button style={{ padding: '16px 36px', borderRadius: 100, background: `linear-gradient(135deg, ${color}, ${color}CC)`, color: '#000', fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, boxShadow: `0 0 30px ${color}35`, letterSpacing: '0.02em' }}>Book Now</button>}
                <button style={{ padding: '16px 36px', borderRadius: 100, background: 'transparent', border: `1px solid ${color}40`, color: color, fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 500, backdropFilter: 'blur(10px)' }}>Learn More</button>
              </div>
            </div>

            {/* Scroll indicator */}
            <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', zIndex: 3, opacity: heroVis ? 1 : 0, transition: 'opacity 1s ease 2.5s' }}>
              <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, animation: 'float 2s ease-in-out infinite' }} />
            </div>

            {editing && <div role="button" tabIndex={0} onClick={() => setAdminFeature('hero')} style={{ position: 'absolute', top: 80, right: 20, zIndex: 10, padding: '4px 10px', borderRadius: 6, background: `${color}20`, fontFamily: 'var(--font-mono)', fontSize: 9, color: color, cursor: 'pointer', backdropFilter: 'blur(8px)' }}>OPEN ADMIN</div>}
          </section>
        )}

        {/* ═══ SERVICES — Glass Cards ═══ */}
        {has('services') && (
          <section style={{ padding: '100px 40px', position: 'relative' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <Reveal>
                <E id="svc-tag" d="OUR SERVICES" s={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, display: 'block', textAlign: 'center', marginBottom: 12 }} />
              </Reveal>
              <Reveal delay={100}>
                <E id="svc-h2" d="What We Offer" tag="h2" s={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: 'var(--text)', textAlign: 'center', marginBottom: 48 }} />
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {serviceData.map((svc, i) => (
                  <Reveal key={i} delay={200 + i * 80}>
                    <div style={{
                      ...glass({ padding: '28px 24px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }),
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.3), 0 0 20px ${color}15`
                      e.currentTarget.style.borderColor = `${color}30`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    }}>
                      <div style={{ fontSize: 28, marginBottom: 14, filter: `drop-shadow(0 0 8px ${color}30)` }}>{svc.icon}</div>
                      <E id={`svc-${i}`} d={svc.name} s={{ fontFamily: 'var(--font-ui)', fontSize: 17, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 8 }} />
                      <E id={`svc-${i}-d`} d={svc.desc} s={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, display: 'block', marginBottom: 14 }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <E id={`svc-${i}-p`} d={svc.price} s={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: color, fontWeight: 600 }} />
                        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: `${color}99`, fontWeight: 500 }}>View &rarr;</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              {editing && <div style={{ textAlign: 'center', marginTop: 20 }}><button onClick={() => setAdminFeature('services')} style={{ padding: '6px 14px', borderRadius: 100, background: `${color}12`, color: color, fontFamily: 'var(--font-mono)', fontSize: 9, border: `1px solid ${color}25` }}>OPEN ADMIN &rarr; Services</button></div>}
            </div>
          </section>
        )}

        {/* ═══ EVENTS — Date Badges + Glass Cards ═══ */}
        {has('events') && (
          <section style={{ padding: '100px 40px' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <Reveal>
                <E id="ev-tag" d="UPCOMING EVENTS" s={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, display: 'block', textAlign: 'center', marginBottom: 12 }} />
              </Reveal>
              <Reveal delay={100}>
                <E id="ev-h2" d="Join Us" tag="h2" s={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: 'var(--text)', textAlign: 'center', marginBottom: 48 }} />
              </Reveal>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { name: 'VIP Glow Night', day: '20', month: 'MAR', time: '6:00 PM', spots: 6, desc: 'An exclusive evening of beauty, cocktails, and complimentary mini-treatments.' },
                  { name: 'Botox & Bubbles', day: '25', month: 'MAR', time: '7:00 PM', spots: 0, desc: 'Sip champagne while our experts smooth away the years. Limited spots.' },
                  { name: 'Open House', day: '01', month: 'APR', time: '2:00 PM', spots: 38, desc: 'Tour our facilities, meet the team, and enjoy exclusive new-client specials.' },
                ].map((ev, i) => (
                  <Reveal key={i} delay={200 + i * 100}>
                    <div style={{
                      ...glass({ padding: 0, display: 'flex', alignItems: 'stretch', overflow: 'hidden' }),
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3), 0 0 16px ${color}12`
                      e.currentTarget.style.borderColor = `${color}25`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    }}>
                      {/* Date badge */}
                      <div style={{ width: 90, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `${color}08`, borderRight: `1px solid ${color}15`, padding: '20px 0' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, color: color, lineHeight: 1 }}>{ev.day}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: `${color}88`, marginTop: 4 }}>{ev.month}</div>
                      </div>
                      {/* Content */}
                      <div style={{ flex: 1, padding: '22px 24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <div>
                            <E id={`ev-${i}`} d={ev.name} s={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 4 }} />
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>{ev.month} {ev.day} at {ev.time}</div>
                          </div>
                          {ev.spots > 0 ? (
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: color, background: `${color}12`, padding: '4px 10px', borderRadius: 100, fontWeight: 600, flexShrink: 0 }}>{ev.spots} spots left</span>
                          ) : (
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#EF4444', background: '#EF444412', padding: '4px 10px', borderRadius: 100, fontWeight: 600, flexShrink: 0 }}>Sold Out</span>
                          )}
                        </div>
                        <E id={`ev-${i}-d`} d={ev.desc} s={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, display: 'block', marginBottom: 14 }} />
                        <button style={{
                          padding: '9px 22px', borderRadius: 100,
                          background: ev.spots > 0 ? `linear-gradient(135deg, ${color}, ${color}CC)` : 'rgba(255,255,255,0.04)',
                          color: ev.spots > 0 ? '#000' : 'var(--muted)',
                          fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-ui)',
                          boxShadow: ev.spots > 0 ? `0 0 20px ${color}20` : 'none',
                          cursor: ev.spots > 0 ? 'pointer' : 'default',
                        }}>{ev.spots > 0 ? 'Reserve Now' : 'Join Waitlist'}</button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              {editing && <div style={{ textAlign: 'center', marginTop: 20 }}><button onClick={() => setAdminFeature('events')} style={{ padding: '6px 14px', borderRadius: 100, background: `${color}12`, color: color, fontFamily: 'var(--font-mono)', fontSize: 9, border: `1px solid ${color}25` }}>OPEN ADMIN &rarr; Events</button></div>}
            </div>
          </section>
        )}

        {/* ═══ GALLERY — Before & After ═══ */}
        {has('gallery') && (
          <section style={{ padding: '100px 40px' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <Reveal>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, textAlign: 'center', marginBottom: 12 }}>TRANSFORMATIONS</div>
              </Reveal>
              <Reveal delay={100}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: 'var(--text)', textAlign: 'center', marginBottom: 48 }}>Before &amp; After</h2>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 20 }}>
                {['Lip Enhancement', 'Botox - Forehead', 'Dermal Filler - Cheeks'].map((label, i) => (
                  <Reveal key={i} delay={200 + i * 100}>
                    <div style={glass({ padding: 20 })}>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>{label}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                          <div style={{ position: 'absolute', top: 8, left: 8, padding: '2px 8px', borderRadius: 4, background: 'rgba(0,0,0,0.5)', fontFamily: 'var(--font-mono)', fontSize: 8, color: '#999', letterSpacing: '0.1em' }}>BEFORE</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'rgba(255,255,255,0.06)' }}>B</div>
                        </div>
                        <div style={{ background: `${color}08`, borderRadius: 10, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${color}15`, position: 'relative', overflow: 'hidden' }}>
                          <div style={{ position: 'absolute', top: 8, left: 8, padding: '2px 8px', borderRadius: 4, background: `${color}25`, fontFamily: 'var(--font-mono)', fontSize: 8, color: color, letterSpacing: '0.1em' }}>AFTER</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: `${color}20` }}>A</div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ TESTIMONIALS — Quote Cards ═══ */}
        {has('testimonials') && (
          <section style={{ padding: '100px 40px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <Reveal>
                <E id="test-tag" d="TESTIMONIALS" s={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, display: 'block', textAlign: 'center', marginBottom: 12 }} />
              </Reveal>
              <Reveal delay={100}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: 'var(--text)', textAlign: 'center', marginBottom: 48 }}>What Our Clients Say</h2>
              </Reveal>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { text: 'Absolutely transformed my skin. The team is incredible and made me feel so comfortable throughout.', name: 'Sarah M.', stars: 5 },
                  { text: 'Best experience ever. The results are amazing and the staff truly cares about each client.', name: 'Jessica L.', stars: 5 },
                  { text: 'This is by far the most professional and well-organized experience I\'ve had.', name: 'Lauren K.', stars: 5 },
                ].map((t, i) => (
                  <Reveal key={i} delay={200 + i * 100}>
                    <div style={{
                      ...glass({ padding: '28px 28px 24px', position: 'relative' }),
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${color}20`
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}>
                      {/* Large quote mark */}
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, color: `${color}20`, lineHeight: 0.6, marginBottom: 8, position: 'absolute', top: 18, left: 22 }}>&ldquo;</div>
                      <div style={{ position: 'relative', paddingTop: 24 }}>
                        {/* Stars */}
                        <div style={{ marginBottom: 12, display: 'flex', gap: 2 }}>
                          {Array.from({ length: t.stars }).map((_, si) => (
                            <span key={si} style={{ color: color, fontSize: 14 }}>{'\u2605'}</span>
                          ))}
                        </div>
                        <E id={`test-${i}`} d={t.text} s={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.7, display: 'block', marginBottom: 16 }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${color}40, ${color}15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 14, color: color, fontWeight: 600 }}>{t.name[0]}</div>
                          <E id={`test-${i}-n`} d={t.name} s={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--text2)' }} />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ MEMBERSHIPS — 3 Tier Cards ═══ */}
        {has('memberships') && (
          <section style={{ padding: '100px 40px' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
              <Reveal>
                <E id="mem-tag" d="MEMBERSHIPS" s={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, display: 'block', marginBottom: 12 }} />
              </Reveal>
              <Reveal delay={100}>
                <E id="mem-h2" d="Join the Club" tag="h2" s={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: 'var(--text)', marginBottom: 48 }} />
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, alignItems: 'stretch' }}>
                {[
                  { name: 'Silver', price: '$99', features: ['Monthly facial', '10% off services', 'Priority booking', 'Birthday gift'], recommended: false },
                  { name: 'Gold', price: '$199', features: ['Monthly facial + peel', '20% off services', 'Priority booking', 'Birthday gift', 'Free consultations', '1 guest pass/month'], recommended: true },
                  { name: 'Platinum', price: '$349', features: ['Monthly facial + treatment', '30% off services', 'Same-day booking', 'Birthday gift', 'Free consultations', 'Unlimited guest passes', 'VIP event access'], recommended: false },
                ].map((tier, i) => (
                  <Reveal key={i} delay={200 + i * 100}>
                    <div style={{
                      ...glass({
                        padding: 0,
                        overflow: 'hidden',
                        textAlign: 'left',
                        position: 'relative',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }),
                      background: tier.recommended ? `rgba(255,255,255,0.06)` : 'rgba(255,255,255,0.03)',
                      border: tier.recommended ? `1px solid ${color}40` : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: tier.recommended ? `0 8px 40px ${color}12` : 'none',
                    }}>
                      {/* Gradient top border */}
                      <div style={{ height: 3, background: tier.recommended ? `linear-gradient(90deg, ${color}, ${color}88)` : `linear-gradient(90deg, ${color}40, ${color}15)`, flexShrink: 0 }} />
                      <div style={{ padding: '24px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {tier.recommended && (
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.2em', color: color, background: `${color}12`, padding: '3px 10px', borderRadius: 100, display: 'inline-block', marginBottom: 12, alignSelf: 'flex-start' }}>RECOMMENDED</div>
                        )}
                        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700, color: color, marginBottom: 6, letterSpacing: '0.05em' }}>{tier.name}</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400, color: 'var(--text)', marginBottom: 20 }}>
                          {tier.price}<span style={{ fontSize: 14, color: 'var(--text2)', fontFamily: 'var(--font-ui)', fontWeight: 400 }}>/mo</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, flex: 1 }}>
                          {tier.features.map((f, fi) => (
                            <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>
                              <span style={{ color: color, fontSize: 12, flexShrink: 0 }}>{'\u2713'}</span>
                              {f}
                            </div>
                          ))}
                        </div>
                        <button style={{
                          padding: '11px 20px', borderRadius: 100, width: '100%',
                          background: tier.recommended ? `linear-gradient(135deg, ${color}, ${color}CC)` : 'transparent',
                          color: tier.recommended ? '#000' : color,
                          border: tier.recommended ? 'none' : `1px solid ${color}35`,
                          fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-ui)',
                          boxShadow: tier.recommended ? `0 0 20px ${color}25` : 'none',
                        }}>Join {tier.name}</button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ TEAM — Gradient Avatars ═══ */}
        {has('team') && (
          <section style={{ padding: '100px 40px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
              <Reveal>
                <E id="team-tag" d="OUR TEAM" s={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, display: 'block', marginBottom: 12 }} />
              </Reveal>
              <Reveal delay={100}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: 'var(--text)', marginBottom: 48 }}>Meet the Experts</h2>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
                {['Dr. Sarah Mitchell','Jessica Park, NP','Emily Chen, RN'].map((n, i) => (
                  <Reveal key={i} delay={200 + i * 100}>
                    <div style={glass({ padding: '32px 20px', textAlign: 'center' })}>
                      <div style={{
                        width: 80, height: 80, borderRadius: '50%', margin: '0 auto 16px',
                        background: `linear-gradient(135deg, ${color}, ${color}55)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-display)', fontSize: 26, color: '#000', fontWeight: 600,
                        boxShadow: `0 4px 20px ${color}30`,
                      }}>
                        {n.split(' ').slice(0, 2).map(w => w[0]).join('')}
                      </div>
                      <E id={`team-${i}`} d={n} s={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 4 }} />
                      <E id={`team-${i}-r`} d={['Medical Director','Nurse Practitioner','Aesthetic Nurse'][i]} s={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text2)', display: 'block' }} />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ DONATIONS ═══ */}
        {has('donations') && (
          <section style={{ padding: '100px 40px' }}>
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
              <Reveal>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, marginBottom: 12 }}>SUPPORT US</div>
              </Reveal>
              <Reveal delay={100}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}>Make a Difference</h2>
              </Reveal>
              <Reveal delay={200}>
                <div style={glass({ padding: 28, textAlign: 'center' })}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, color: color, marginBottom: 4 }}>$12,480</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text2)', marginBottom: 16 }}>raised of $25,000 goal</div>
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 20 }}>
                    <div style={{ width: '49.9%', height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${color}, ${color}CC)` }} />
                  </div>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {['$25', '$50', '$100', '$250'].map(amt => (
                      <button key={amt} style={{ padding: '10px 22px', borderRadius: 100, border: `1px solid ${color}30`, color: color, fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, background: 'transparent' }}>{amt}</button>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ═══ CONTACT — Glass Form ═══ */}
        {has('contact') && (
          <section style={{ padding: '100px 40px' }}>
            <div style={{ maxWidth: 540, margin: '0 auto', textAlign: 'center' }}>
              <Reveal>
                <E id="cta-tag" d="GET IN TOUCH" s={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: color, display: 'block', marginBottom: 12 }} />
              </Reveal>
              <Reveal delay={100}>
                <E id="cta-h2" d="Book Your Consultation" tag="h2" s={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: 'var(--text)', marginBottom: 40 }} />
              </Reveal>
              <Reveal delay={200}>
                <div style={glass({ padding: 28 })}>
                  <div style={{ display: 'grid', gap: 12 }}>
                    {['Name', 'Email', 'Phone'].map(field => (
                      <input key={field} placeholder={field} style={{
                        padding: '14px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 10, color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-ui)', outline: 'none',
                        transition: 'all 0.3s cubic-bezier(.16,1,.3,1)',
                      }}
                      onFocus={e => { e.target.style.borderColor = `${color}50`; e.target.style.boxShadow = `0 0 16px ${color}15` }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                      />
                    ))}
                    <textarea placeholder="Tell us about your goals..." rows={3} style={{
                      padding: '14px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 10, color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-ui)', outline: 'none', resize: 'vertical',
                      transition: 'all 0.3s cubic-bezier(.16,1,.3,1)',
                    }}
                    onFocus={e => { e.target.style.borderColor = `${color}50`; e.target.style.boxShadow = `0 0 16px ${color}15` }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                    />
                    <button style={{
                      padding: '14px', borderRadius: 100,
                      background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                      color: '#000', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-ui)',
                      boxShadow: `0 0 24px ${color}30`,
                      transition: 'all 0.3s cubic-bezier(.16,1,.3,1)',
                    }}>Send Message</button>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ═══ FOOTER ═══ */}
        <footer style={{ padding: '60px 40px 40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <Reveal>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: color, letterSpacing: '0.1em', marginBottom: 6 }}>{name}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: 20 }}>POWERED BY STOA</div>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 20 }}>
              {has('services') && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text2)' }}>Services</span>}
              {has('events') && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text2)' }}>Events</span>}
              {has('shop') && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text2)' }}>Shop</span>}
              {has('contact') && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text2)' }}>Contact</span>}
            </div>
            <div style={{ fontSize: 11, color: '#333' }}>&copy; 2026 {name}. All rights reserved.</div>
          </Reveal>
        </footer>

      </div>

      {/* ═══ CSS Animations ═══ */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
