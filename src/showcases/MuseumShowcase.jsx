import { useState } from 'react'

/* ─── DATA ─── */
const PRODUCTS = [
  { id: 1, name: 'Constellation Tee', price: 34.99, cat: 'Apparel', color: '#1e3a5f' },
  { id: 2, name: 'Galaxy Print Hoodie', price: 68.00, cat: 'Apparel', color: '#2d1b4e' },
  { id: 3, name: 'Observatory Tote Bag', price: 24.99, cat: 'Accessories', color: '#3b5249' },
  { id: 4, name: 'Night Sky Poster', price: 42.00, cat: 'Art', color: '#0f1b2d' },
  { id: 5, name: 'Astronomy Field Guide', price: 19.95, cat: 'Books', color: '#4a3728' },
  { id: 6, name: 'Meteor Enamel Pin Set', price: 14.99, cat: 'Accessories', color: '#5c4033' },
]

const EVENTS = [
  { id: 1, name: 'Star Party', desc: 'Telescope viewing of Jupiter & Saturn', date: 'Mar 22', time: '8:00 PM', price: 15, spots: 18 },
  { id: 2, name: 'Planetarium Show', desc: 'Journey through the Milky Way', date: 'Mar 24', time: '2:00 PM', price: 12, spots: 42 },
  { id: 3, name: 'Kids STEM Camp', desc: 'Build your own rocket — ages 7-12', date: 'Mar 29', time: '10:00 AM', price: 45, spots: 6 },
  { id: 4, name: 'Photography Night', desc: 'Astrophotography workshop under dark skies', date: 'Apr 5', time: '7:30 PM', price: 35, spots: 10 },
]

const INVENTORY = [
  { sku: 'DSC-001', name: 'Constellation Tee', cat: 'Apparel', stock: 84, status: 'In Stock' },
  { sku: 'DSC-002', name: 'Galaxy Print Hoodie', cat: 'Apparel', stock: 32, status: 'In Stock' },
  { sku: 'DSC-003', name: 'Observatory Tote Bag', cat: 'Accessories', stock: 56, status: 'In Stock' },
  { sku: 'DSC-004', name: 'Night Sky Poster', cat: 'Art', stock: 8, status: 'Low' },
  { sku: 'DSC-005', name: 'Astronomy Field Guide', cat: 'Books', stock: 120, status: 'In Stock' },
  { sku: 'DSC-006', name: 'Meteor Enamel Pin Set', cat: 'Accessories', stock: 3, status: 'Critical' },
  { sku: 'DSC-007', name: 'Lunar Phase Mug', cat: 'Accessories', stock: 45, status: 'In Stock' },
  { sku: 'DSC-008', name: 'Solar System Mobile', cat: 'Art', stock: 11, status: 'Low' },
]

const ORDERS = [
  { id: '#4821', customer: 'Rebecca Torres', date: 'Mar 17', total: '$89.98', status: 'Fulfilled' },
  { id: '#4820', customer: 'Daniel Kim', date: 'Mar 17', total: '$42.00', status: 'Pending' },
  { id: '#4819', customer: 'Maria Gonzalez', date: 'Mar 16', total: '$127.95', status: 'Shipped' },
  { id: '#4818', customer: 'James Whitfield', date: 'Mar 16', total: '$34.99', status: 'Fulfilled' },
  { id: '#4817', customer: 'Sarah Chen', date: 'Mar 15', total: '$68.00', status: 'Shipped' },
  { id: '#4816', customer: 'Aaron Patel', date: 'Mar 15', total: '$54.98', status: 'Pending' },
]

const DONATIONS = [
  { donor: 'The Hawking Foundation', amount: '$500,000', date: 'Mar 14' },
  { donor: 'Robert & Linda Chen', amount: '$25,000', date: 'Mar 12' },
  { donor: 'Starlight Industries', amount: '$100,000', date: 'Mar 10' },
  { donor: 'Anonymous', amount: '$10,000', date: 'Mar 8' },
  { donor: 'Dr. Emily Sato', amount: '$5,000', date: 'Mar 5' },
]

const CAMPAIGNS = [
  { subject: 'Spring Stargazing Season is Here', audience: 'All Members', sent: '2,412', open: '62%', click: '18%' },
  { subject: 'Early Bird: Kids STEM Camp', audience: 'Family Members', sent: '847', open: '71%', click: '34%' },
  { subject: 'New in the Gift Shop', audience: 'Gift Shop Customers', sent: '1,203', open: '58%', click: '22%' },
]

const POS_ITEMS = [
  { id: 1, name: 'Constellation Tee', price: 34.99, color: '#1e3a5f' },
  { id: 2, name: 'Observatory Tote', price: 24.99, color: '#3b5249' },
  { id: 3, name: 'Night Sky Poster', price: 42.00, color: '#0f1b2d' },
  { id: 4, name: 'Field Guide', price: 19.95, color: '#4a3728' },
  { id: 5, name: 'Enamel Pin Set', price: 14.99, color: '#5c4033' },
  { id: 6, name: 'Lunar Phase Mug', price: 18.99, color: '#2d3748' },
  { id: 7, name: 'Galaxy Hoodie', price: 68.00, color: '#2d1b4e' },
  { id: 8, name: 'Solar Mobile', price: 36.00, color: '#1a365d' },
]

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: '◫' },
  { key: 'store', label: 'Online Store', icon: '◉' },
  { key: 'events', label: 'Events', icon: '◈' },
  { key: 'inventory', label: 'Inventory', icon: '▤' },
  { key: 'orders', label: 'Orders', icon: '▥' },
  { key: 'donations', label: 'Donations', icon: '♦' },
  { key: 'email', label: 'Email Marketing', icon: '✉' },
  { key: 'pos', label: 'POS', icon: '▣' },
]

/* ─── COMPONENT ─── */
export default function MuseumShowcase({ activePage: controlledPage, onPageChange }) {
  const [internalPage, setInternalPage] = useState('dashboard')
  const page = controlledPage || internalPage
  const setPage = (p) => { setInternalPage(p); onPageChange?.(p) }
  const [storeCat, setStoreCat] = useState('All')
  const [invCat, setInvCat] = useState('All')
  const [posCart, setPosCart] = useState([])

  const addToPosCart = (item) => {
    setPosCart(prev => {
      const ex = prev.find(i => i.id === item.id)
      if (ex) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1 }]
    })
  }
  const posSubtotal = posCart.reduce((s, i) => s + i.price * i.qty, 0)
  const posTax = posSubtotal * 0.0825
  const posTotal = posSubtotal + posTax

  /* ─── PAGES ─── */
  const renderPage = () => {
    switch (page) {

      /* ── DASHBOARD ── */
      case 'dashboard': {
        const kpis = [
          { label: "Today's Revenue", value: '$2,840', icon: '◉' },
          { label: 'Orders', value: '12', icon: '▥' },
          { label: 'Events Today', value: '2', icon: '◈' },
          { label: 'Members', value: '847', icon: '♦' },
        ]
        const recent = ORDERS.slice(0, 5)
        return (
          <>
            <div style={s.pageHeader}>
              <h1 style={s.pageTitle}>Dashboard</h1>
              <span style={s.liveBadge}>● Live</span>
            </div>
            <div style={s.kpiGrid}>
              {kpis.map(k => (
                <div key={k.label} style={s.kpiCard}>
                  <div style={s.kpiIcon}>{k.icon}</div>
                  <div style={s.kpiLabel}>{k.label}</div>
                  <div style={s.kpiValue}>{k.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
              <div style={s.card}>
                <div style={s.cardTitle}>Recent Orders</div>
                {recent.map(o => (
                  <div key={o.id} style={s.listRow}>
                    <span style={s.mono}>{o.id}</span>
                    <span style={{ flex: 1 }}>{o.customer}</span>
                    <span style={s.mono}>{o.total}</span>
                    <span style={{ ...s.statusBadge, ...statusStyle(o.status) }}>{o.status}</span>
                  </div>
                ))}
              </div>
              <div style={s.card}>
                <div style={s.cardTitle}>Quick Actions</div>
                {['Add New Product', 'Create Event', 'Send Email Campaign', 'Process Refund', 'Export Reports'].map(a => (
                  <button key={a} style={s.quickAction}>{a}</button>
                ))}
              </div>
            </div>
          </>
        )
      }

      /* ── ONLINE STORE ── */
      case 'store': {
        const cats = ['All', 'Apparel', 'Accessories', 'Art', 'Books']
        const filtered = storeCat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.cat === storeCat)
        return (
          <>
            <div style={s.pageHeader}>
              <h1 style={s.pageTitle}>Online Store</h1>
            </div>
            <div style={s.pillRow}>
              {cats.map(c => (
                <button key={c} onClick={() => setStoreCat(c)} style={{ ...s.pill, ...(storeCat === c ? s.pillActive : {}) }}>{c}</button>
              ))}
            </div>
            <div style={s.productGrid}>
              {filtered.map(p => (
                <div key={p.id} style={s.productCard}>
                  <div style={{ ...s.productImg, background: p.color }} />
                  <div style={s.productInfo}>
                    <div style={s.productName}>{p.name}</div>
                    <div style={s.productPrice}>${p.price.toFixed(2)}</div>
                  </div>
                  <button style={s.addBtn}>Add to Cart</button>
                </div>
              ))}
            </div>
          </>
        )
      }

      /* ── EVENTS ── */
      case 'events':
        return (
          <>
            <div style={s.pageHeader}>
              <h1 style={s.pageTitle}>Events</h1>
              <button style={s.primaryBtn}>+ New Event</button>
            </div>
            <div style={s.eventGrid}>
              {EVENTS.map(e => (
                <div key={e.id} style={s.eventCard}>
                  <div style={s.eventDate}>{e.date}</div>
                  <div style={s.eventName}>{e.name}</div>
                  <div style={s.eventDesc}>{e.desc}</div>
                  <div style={s.eventMeta}>
                    <span>{e.time}</span>
                    <span style={s.dot}>·</span>
                    <span>${e.price}</span>
                    <span style={s.dot}>·</span>
                    <span style={{ color: e.spots <= 10 ? 'var(--warning)' : 'var(--success)' }}>{e.spots} spots left</span>
                  </div>
                  <button style={s.reserveBtn}>Reserve Spot</button>
                </div>
              ))}
            </div>
          </>
        )

      /* ── INVENTORY ── */
      case 'inventory': {
        const cats = ['All', 'Apparel', 'Accessories', 'Art', 'Books']
        const filtered = invCat === 'All' ? INVENTORY : INVENTORY.filter(i => i.cat === invCat)
        return (
          <>
            <div style={s.pageHeader}>
              <h1 style={s.pageTitle}>Inventory</h1>
            </div>
            <div style={s.pillRow}>
              {cats.map(c => (
                <button key={c} onClick={() => setInvCat(c)} style={{ ...s.pill, ...(invCat === c ? s.pillActive : {}) }}>{c}</button>
              ))}
            </div>
            <div style={s.card}>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>Product</th>
                    <th style={s.th}>SKU</th>
                    <th style={s.th}>Category</th>
                    <th style={s.th}>Stock</th>
                    <th style={s.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(i => (
                    <tr key={i.sku}>
                      <td style={s.td}>{i.name}</td>
                      <td style={{ ...s.td, ...s.mono }}>{i.sku}</td>
                      <td style={s.td}>{i.cat}</td>
                      <td style={{ ...s.td, ...s.mono }}>{i.stock}</td>
                      <td style={s.td}>
                        <span style={{ ...s.statusBadge, ...stockStyle(i.status) }}>{i.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      }

      /* ── ORDERS ── */
      case 'orders':
        return (
          <>
            <div style={s.pageHeader}>
              <h1 style={s.pageTitle}>Orders</h1>
            </div>
            <div style={s.card}>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>Order</th>
                    <th style={s.th}>Customer</th>
                    <th style={s.th}>Date</th>
                    <th style={s.th}>Total</th>
                    <th style={s.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ORDERS.map(o => (
                    <tr key={o.id}>
                      <td style={{ ...s.td, ...s.mono }}>{o.id}</td>
                      <td style={s.td}>{o.customer}</td>
                      <td style={s.td}>{o.date}</td>
                      <td style={{ ...s.td, ...s.mono }}>{o.total}</td>
                      <td style={s.td}>
                        <span style={{ ...s.statusBadge, ...statusStyle(o.status) }}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )

      /* ── DONATIONS ── */
      case 'donations': {
        const raised = 27.2
        const goal = 29
        const pct = Math.round((raised / goal) * 100)
        return (
          <>
            <div style={s.pageHeader}>
              <h1 style={s.pageTitle}>Donations</h1>
            </div>
            <div style={s.card}>
              <div style={s.cardTitle}>Capital Campaign Progress</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--brand)' }}>${raised}M raised</span>
                <span style={{ color: 'var(--text2)', alignSelf: 'flex-end' }}>Goal: ${goal}M</span>
              </div>
              <div style={s.progressTrack}>
                <div style={{ ...s.progressBar, width: `${pct}%` }} />
              </div>
              <div style={{ textAlign: 'right', fontSize: 13, color: 'var(--text2)', marginTop: 6 }}>{pct}% complete</div>
            </div>
            <div style={{ ...s.card, marginTop: 20 }}>
              <div style={s.cardTitle}>Recent Donations</div>
              {DONATIONS.map((d, i) => (
                <div key={i} style={s.listRow}>
                  <span style={{ flex: 1, fontWeight: 500 }}>{d.donor}</span>
                  <span style={{ ...s.mono, color: 'var(--brand)', fontWeight: 600, marginRight: 16 }}>{d.amount}</span>
                  <span style={{ color: 'var(--text2)', fontSize: 13 }}>{d.date}</span>
                </div>
              ))}
            </div>
          </>
        )
      }

      /* ── EMAIL MARKETING ── */
      case 'email':
        return (
          <>
            <div style={s.pageHeader}>
              <h1 style={s.pageTitle}>Email Marketing</h1>
              <button style={s.primaryBtn}>+ Compose</button>
            </div>
            <div style={s.card}>
              <div style={s.cardTitle}>Sent Campaigns</div>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>Subject</th>
                    <th style={s.th}>Audience</th>
                    <th style={s.th}>Sent</th>
                    <th style={s.th}>Open Rate</th>
                    <th style={s.th}>Click Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {CAMPAIGNS.map((c, i) => (
                    <tr key={i}>
                      <td style={{ ...s.td, fontWeight: 500 }}>{c.subject}</td>
                      <td style={s.td}>{c.audience}</td>
                      <td style={{ ...s.td, ...s.mono }}>{c.sent}</td>
                      <td style={{ ...s.td, ...s.mono }}>{c.open}</td>
                      <td style={{ ...s.td, ...s.mono }}>{c.click}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )

      /* ── POS ── */
      case 'pos':
        return (
          <>
            <div style={s.pageHeader}>
              <h1 style={s.pageTitle}>Point of Sale</h1>
            </div>
            <div style={s.posLayout}>
              <div style={s.posProducts}>
                <div style={s.posGrid}>
                  {POS_ITEMS.map(item => (
                    <button key={item.id} onClick={() => addToPosCart(item)} style={s.posItem}>
                      <div style={{ ...s.posItemColor, background: item.color }} />
                      <div style={s.posItemName}>{item.name}</div>
                      <div style={s.posItemPrice}>${item.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={s.posCartPanel}>
                <div style={s.cardTitle}>Current Sale</div>
                <div style={s.posCartItems}>
                  {posCart.length === 0 && <div style={{ color: 'var(--muted)', textAlign: 'center', padding: 32 }}>Tap products to add</div>}
                  {posCart.map(item => (
                    <div key={item.id} style={s.posCartRow}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500 }}>{item.name}</div>
                        <div style={{ fontSize: 13, color: 'var(--text2)' }}>Qty: {item.qty}</div>
                      </div>
                      <div style={s.mono}>${(item.price * item.qty).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div style={s.posTotals}>
                  <div style={s.posTotalRow}><span>Subtotal</span><span>${posSubtotal.toFixed(2)}</span></div>
                  <div style={s.posTotalRow}><span>Tax (8.25%)</span><span>${posTax.toFixed(2)}</span></div>
                  <div style={{ ...s.posTotalRow, fontWeight: 700, fontSize: 18, borderTop: '2px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
                    <span>Total</span><span style={{ color: 'var(--brand)' }}>${posTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button style={{ ...s.primaryBtn, width: '100%', padding: '14px 0', fontSize: 16, marginTop: 16 }}>
                  Charge ${posTotal.toFixed(2)}
                </button>
              </div>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div style={s.layout}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.sidebarBrand}>
          <div style={s.logoMark}>DSC</div>
          <div>
            <div style={s.brandName}>Dark Sky</div>
            <div style={s.brandSub}>Discovery Center</div>
          </div>
        </div>
        <nav style={s.nav}>
          {NAV.map(n => (
            <button
              key={n.key}
              onClick={() => setPage(n.key)}
              style={{ ...s.navItem, ...(page === n.key ? s.navActive : {}) }}
            >
              <span style={s.navIcon}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
        <div style={s.sidebarFooter}>
          <div style={{ fontSize: 11, color: '#666', letterSpacing: 0.5 }}>POWERED BY</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--brand)', marginTop: 2 }}>Stoa</div>
        </div>
      </aside>

      {/* Main */}
      <main style={s.main}>
        {renderPage()}
      </main>
    </div>
  )
}

/* ─── HELPERS ─── */
function statusStyle(status) {
  if (status === 'Fulfilled') return { background: 'rgba(22,163,74,0.1)', color: '#16A34A' }
  if (status === 'Shipped') return { background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }
  if (status === 'Pending') return { background: 'rgba(217,119,6,0.1)', color: '#D97706' }
  return {}
}

function stockStyle(status) {
  if (status === 'In Stock') return { background: 'rgba(22,163,74,0.1)', color: '#16A34A' }
  if (status === 'Low') return { background: 'rgba(217,119,6,0.1)', color: '#D97706' }
  if (status === 'Critical') return { background: 'rgba(220,38,38,0.1)', color: '#DC2626' }
  return {}
}

/* ─── STYLES ─── */
const s = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'var(--font-body)',
    background: 'var(--bg2)',
  },

  /* Sidebar */
  sidebar: {
    width: 240,
    background: '#111',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',
  },
  sidebarBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '24px 20px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  logoMark: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: 'var(--brand)',
    color: '#111',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: 1,
  },
  brandName: {
    fontFamily: 'var(--font-display)',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.2,
  },
  brandSub: {
    fontSize: 11,
    color: '#999',
    letterSpacing: 0.5,
  },
  nav: {
    padding: '16px 12px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    borderRadius: 8,
    fontSize: 14,
    color: '#aaa',
    textAlign: 'left',
    transition: 'all 0.15s',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontFamily: 'var(--font-body)',
    width: '100%',
  },
  navActive: {
    background: 'rgba(212,175,55,0.12)',
    color: 'var(--brand)',
  },
  navIcon: {
    width: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  sidebarFooter: {
    padding: '16px 20px 20px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },

  /* Main */
  main: {
    flex: 1,
    padding: 32,
    maxWidth: 1100,
    overflowY: 'auto',
  },

  /* Common */
  pageHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  pageTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 28,
    fontWeight: 600,
  },
  liveBadge: {
    fontSize: 12,
    color: '#4ADE80',
    background: 'rgba(74,222,128,0.1)',
    padding: '4px 12px',
    borderRadius: 20,
    fontWeight: 500,
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: 24,
    border: '1px solid var(--border)',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 17,
    fontWeight: 600,
    marginBottom: 16,
  },
  listRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 0',
    borderBottom: '1px solid var(--border)',
    fontSize: 14,
  },
  mono: {
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
  },
  statusBadge: {
    padding: '3px 10px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },

  /* KPI */
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
  },
  kpiCard: {
    background: '#fff',
    borderRadius: 12,
    padding: 20,
    border: '1px solid var(--border)',
  },
  kpiIcon: {
    fontSize: 20,
    color: 'var(--brand)',
    marginBottom: 8,
  },
  kpiLabel: {
    fontSize: 13,
    color: 'var(--text2)',
    marginBottom: 4,
  },
  kpiValue: {
    fontFamily: 'var(--font-display)',
    fontSize: 26,
    fontWeight: 600,
  },

  /* Quick Actions */
  quickAction: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '10px 14px',
    marginBottom: 6,
    borderRadius: 8,
    fontSize: 14,
    background: 'var(--bg2)',
    color: 'var(--text)',
    border: '1px solid var(--border)',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    transition: 'background 0.15s',
  },

  /* Pills */
  pillRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 20,
  },
  pill: {
    padding: '7px 18px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
    background: '#fff',
    border: '1px solid var(--border)',
    color: 'var(--text2)',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.15s',
  },
  pillActive: {
    background: 'var(--brand)',
    color: '#111',
    borderColor: 'var(--brand)',
  },

  /* Product Grid */
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
  },
  productCard: {
    background: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
  },
  productImg: {
    height: 180,
    width: '100%',
  },
  productInfo: {
    padding: '16px 16px 8px',
    flex: 1,
  },
  productName: {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 4,
  },
  productPrice: {
    color: 'var(--brand)',
    fontFamily: 'var(--font-mono)',
    fontSize: 14,
    fontWeight: 600,
  },
  addBtn: {
    margin: '8px 16px 16px',
    padding: '10px 0',
    borderRadius: 8,
    background: 'var(--brand)',
    color: '#111',
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'var(--font-body)',
    transition: 'opacity 0.15s',
  },

  /* Events */
  eventGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 20,
  },
  eventCard: {
    background: '#fff',
    borderRadius: 12,
    padding: 24,
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  eventDate: {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--brand)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  eventName: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    fontWeight: 600,
  },
  eventDesc: {
    fontSize: 14,
    color: 'var(--text2)',
    lineHeight: 1.5,
  },
  eventMeta: {
    fontSize: 13,
    color: 'var(--text2)',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  dot: { color: 'var(--muted)' },
  reserveBtn: {
    marginTop: 8,
    padding: '10px 0',
    borderRadius: 8,
    background: 'var(--brand)',
    color: '#111',
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'var(--font-body)',
  },

  /* Primary Button */
  primaryBtn: {
    padding: '10px 20px',
    borderRadius: 8,
    background: 'var(--brand)',
    color: '#111',
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'var(--font-body)',
  },

  /* Tables */
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '10px 12px',
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text2)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottom: '2px solid var(--border)',
  },
  td: {
    padding: '12px 12px',
    fontSize: 14,
    borderBottom: '1px solid var(--border)',
  },

  /* Donations */
  progressTrack: {
    height: 12,
    borderRadius: 6,
    background: 'var(--surface2)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
    background: 'linear-gradient(90deg, var(--brand), var(--brand-hover))',
    transition: 'width 0.6s var(--ease)',
  },

  /* POS */
  posLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
    gap: 24,
    alignItems: 'start',
  },
  posProducts: {
    background: '#fff',
    borderRadius: 12,
    padding: 20,
    border: '1px solid var(--border)',
  },
  posGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12,
  },
  posItem: {
    background: 'var(--bg2)',
    borderRadius: 10,
    padding: 12,
    border: '1px solid var(--border)',
    cursor: 'pointer',
    textAlign: 'center',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.15s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  posItemColor: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  posItemName: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  posItemPrice: {
    fontSize: 12,
    color: 'var(--brand)',
    fontFamily: 'var(--font-mono)',
    fontWeight: 600,
  },
  posCartPanel: {
    background: '#fff',
    borderRadius: 12,
    padding: 24,
    border: '1px solid var(--border)',
    position: 'sticky',
    top: 32,
  },
  posCartItems: {
    minHeight: 120,
    marginBottom: 16,
  },
  posCartRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid var(--border)',
  },
  posTotals: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  posTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
    color: 'var(--text2)',
  },
}
