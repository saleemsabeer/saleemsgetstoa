import Reveal from '../components/Reveal'

export default function Portal({ data, enabled }) {
  const p = data.portal

  return (
    <section style={s.wrap}>
      <Reveal>
        <div style={s.header}>
          <div style={s.sectionTag}>◇ {data.id === 'medflow' ? 'DOCTOR PORTAL' : data.id === 'ecommerce' ? 'CUSTOMER PORTAL' : 'MEMBER PORTAL'}</div>
          <div style={s.welcome}>{p.welcome}</div>
          <div style={s.memberSince}>{p.memberSince}</div>
        </div>
      </Reveal>

      <div style={s.topGrid}>
        {/* ── Membership / Account Card ── */}
        <Reveal delay={100}>
          <div style={s.memberCard}>
            <div style={s.memberCardInner}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={s.tierLabel}>{data.id === 'medflow' ? 'PARTNER STATUS' : 'MEMBERSHIP TIER'}</div>
                  <div style={s.tierName}>{p.tier}</div>
                </div>
                <div style={s.tierBadge}>
                  <span style={{ fontSize: 20 }}>✦</span>
                </div>
              </div>
              {p.points !== null && (
                <div style={s.pointsWrap}>
                  <div style={s.pointsBar}>
                    <div style={{
                      ...s.pointsFill,
                      width: `${Math.min((p.points / (p.points + 300)) * 100, 95)}%`,
                    }} />
                  </div>
                  <div style={s.pointsLabel}>{p.points?.toLocaleString()} pts</div>
                  {p.nextReward && <div style={s.nextReward}>{p.nextReward}</div>}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* ── Benefits ── */}
        <Reveal delay={200}>
          <div style={s.benefitsCard}>
            <div style={s.cardTitle}>Your Benefits</div>
            <ul style={s.benefitsList}>
              {p.benefits.map(b => (
                <li key={b} style={s.benefitItem}>
                  <span style={s.checkmark}>✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* ── Activity History ── */}
      <Reveal delay={300}>
        <div style={s.historyCard}>
          <div style={s.cardTitle}>Recent Activity</div>
          {p.history.map((h, i) => (
            <div key={i} style={{
              ...s.historyRow,
              borderBottom: i < p.history.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={s.historyDate}>{h.date}</div>
              <div style={s.historyDot} />
              <div style={s.historyContent}>
                <div style={s.historyEvent}>{h.event}</div>
                <div style={s.historyType}>{h.type}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── Treatment History (medspa) ── */}
      {enabled.treatments && (
        <Reveal delay={350}>
          <div style={s.historyCard}>
            <div style={s.cardTitle}>Treatment History</div>
            {[
              { date: 'Mar 12, 2026', treatment: 'Botox — Forehead & Crow\'s Feet', units: '40 units', provider: 'Dr. Smith', notes: 'Good response, minimal bruising. Follow-up in 3 months.' },
              { date: 'Feb 28, 2026', treatment: 'HydraFacial + LED Add-On', units: '', provider: 'Dr. Johnson', notes: 'Skin texture improved. Recommended monthly maintenance.' },
              { date: 'Jan 15, 2026', treatment: 'Dermal Fillers — Nasolabial Folds', units: '1 syringe', provider: 'Dr. Smith', notes: 'Natural results achieved. Patient very satisfied.' },
            ].map(tx => (
              <div key={tx.date} style={{ padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{tx.treatment}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{tx.date}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 4 }}>
                  {tx.provider}{tx.units ? ` · ${tx.units}` : ''}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>{tx.notes}</div>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* ── Loyalty Program (medspa, ecommerce) ── */}
      {enabled.loyalty && (
        <Reveal delay={350}>
          <div style={s.historyCard}>
            <div style={s.cardTitle}>Loyalty Rewards</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
              <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--brand)' }}>{p.points?.toLocaleString() || 0}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>Current Points</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)' }}>3</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>Rewards Redeemed</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#4ADE80' }}>$45</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>Total Saved</div>
              </div>
            </div>
            {p.nextReward && (
              <div style={{ padding: 14, borderRadius: 10, background: 'var(--brand-glow)', border: '1px solid var(--brand)', fontSize: 13, color: 'var(--text)' }}>
                <span style={{ color: 'var(--brand)', fontWeight: 700, marginRight: 6 }}>✦</span>
                {p.nextReward}
              </div>
            )}
          </div>
        </Reveal>
      )}

      {/* ── Wishlist (ecommerce) ── */}
      {enabled.wishlist && (
        <Reveal delay={350}>
          <div style={s.historyCard}>
            <div style={s.cardTitle}>Your Wishlist</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              {[
                { name: 'Embroidered Cap', price: '$22' },
                { name: 'Canvas Poster 18x24', price: '$32' },
                { name: 'Enamel Pin Set', price: '$15' },
              ].map(item => (
                <div key={item.name} style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, opacity: 0.15, color: 'var(--brand)', marginBottom: 8 }}>◈</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--brand)' }}>{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Order History (ecommerce, medflow) ── */}
      {enabled.orderHistory && (
        <Reveal delay={350}>
          <div style={s.historyCard}>
            <div style={s.cardTitle}>{data.id === 'medflow' ? 'Order History' : 'Full Order History'}</div>
            {(data.id === 'medflow' ? [
              { id: '#MF-3021', date: 'Mar 8', items: 'OrthoFlex Knee System x2', total: '$16,800', status: 'Delivered' },
              { id: '#MF-3018', date: 'Feb 15', items: 'CardioStent Pro x3', total: '$9,600', status: 'Delivered' },
              { id: '#MF-3012', date: 'Jan 20', items: 'NeuroStim Device', total: '$12,800', status: 'Delivered' },
            ] : [
              { id: '#CS-5023', date: 'Mar 14', items: 'Custom Logo Tee x3, Tote Bag', total: '$90', status: 'Processing' },
              { id: '#CS-5018', date: 'Mar 2', items: 'Sticker Pack x2', total: '$24', status: 'Delivered' },
              { id: '#CS-5012', date: 'Feb 18', items: 'Canvas Poster 18x24', total: '$32', status: 'Delivered' },
              { id: '#CS-5005', date: 'Feb 3', items: 'Embroidered Cap, Enamel Pins', total: '$37', status: 'Delivered' },
            ]).map(order => (
              <div key={order.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', minWidth: 75 }}>{order.id}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{order.items}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{order.date}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', minWidth: 65, textAlign: 'right' }}>{order.total}</span>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 100, minWidth: 70, textAlign: 'center',
                  background: order.status === 'Delivered' ? 'rgba(74,222,128,0.1)' : 'rgba(128,128,128,0.1)',
                  color: order.status === 'Delivered' ? '#4ADE80' : 'var(--muted)',
                }}>{order.status}</span>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* ── Sample Requests (medflow) ── */}
      {enabled.samples && (
        <Reveal delay={350}>
          <div style={s.historyCard}>
            <div style={s.cardTitle}>Sample Requests</div>
            {[
              { product: 'NeuroStim Demo Unit', status: 'Shipped', date: 'Mar 12' },
              { product: 'OrthoFlex Knee Model', status: 'Approved', date: 'Mar 8' },
              { product: 'CardioStent Training Kit', status: 'Pending', date: 'Mar 15' },
            ].map(sr => (
              <div key={sr.product} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{sr.product}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{sr.date}</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 100,
                  background: sr.status === 'Shipped' ? 'rgba(74,222,128,0.1)' : sr.status === 'Approved' ? 'rgba(212,175,55,0.1)' : 'rgba(128,128,128,0.1)',
                  color: sr.status === 'Shipped' ? '#4ADE80' : sr.status === 'Approved' ? 'var(--brand)' : 'var(--muted)',
                }}>{sr.status}</span>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* ── Volunteer Portal (museum) ── */}
      {enabled.volunteers && (
        <Reveal delay={350}>
          <div style={s.historyCard}>
            <div style={s.cardTitle}>Volunteer Dashboard</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
              <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--brand)' }}>24</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>Hours This Month</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)' }}>148</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>Total Hours</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#4ADE80' }}>Gold</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>Volunteer Tier</div>
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Upcoming Shifts</div>
            {[
              { date: 'Mar 20', shift: 'Gift Shop — 10 AM to 2 PM' },
              { date: 'Mar 22', shift: 'Full Moon Night Hike — Event Staff' },
              { date: 'Mar 28', shift: 'Telescope Workshop — Setup & Guide' },
            ].map(v => (
              <div key={v.date} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--brand)', minWidth: 55, fontWeight: 600 }}>{v.date}</span>
                <span style={{ fontSize: 13, color: 'var(--text)' }}>{v.shift}</span>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* ── Doctor Portal (medflow) ── */}
      {enabled.doctorView && (
        <Reveal delay={350}>
          <div style={s.historyCard}>
            <div style={s.cardTitle}>Doctor Portal Settings</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
              <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand)', marginBottom: 8 }}>YOUR REP</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Clint M.</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>clint@medflow.com · (480) 555-0142</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand)', marginBottom: 8 }}>COMPLIANCE</div>
                <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>All disclosures up to date</div>
                <div style={{ fontSize: 12, color: '#4ADE80', fontWeight: 600 }}>Sunshine Act: Compliant</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand)', marginBottom: 8 }}>PRICING</div>
                <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>Preferred Tier Pricing Active</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>Next review: April 2026</div>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Quick Actions ── */}
      <Reveal delay={400}>
        <div style={s.actionsGrid}>
          {getQuickActions(data.id, enabled).map(a => (
            <button key={a.label} style={s.actionCard}>
              <span style={s.actionIcon}>{a.icon}</span>
              <span style={s.actionLabel}>{a.label}</span>
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function getQuickActions(industryId, enabled) {
  const base = [
    { icon: '◈', label: 'Edit Profile' },
    { icon: '✉', label: 'Messages' },
  ]
  if (industryId === 'museum') {
    base.push({ icon: '✦', label: 'Upcoming Events' })
    if (enabled.donations) base.push({ icon: '♡', label: 'Donation History' })
  }
  if (industryId === 'medspa') {
    base.push({ icon: '◈', label: 'Book Appointment' })
    base.push({ icon: '✦', label: 'Treatment Plan' })
  }
  if (industryId === 'ecommerce') {
    base.push({ icon: '▦', label: 'Track Orders' })
    if (enabled.wishlist) base.push({ icon: '♡', label: 'Wishlist' })
  }
  if (industryId === 'medflow') {
    base.push({ icon: '◇', label: 'Request Samples' })
    base.push({ icon: '▦', label: 'Order History' })
  }
  return base
}

const s = {
  wrap: { maxWidth: 1100, margin: '0 auto', padding: '60px 24px 80px' },
  header: { marginBottom: 32 },
  sectionTag: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--brand)', marginBottom: 8 },
  welcome: { fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 500, color: 'var(--text)', marginBottom: 4 },
  memberSince: { fontSize: 14, color: 'var(--text2)' },
  topGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 24 },
  memberCard: {
    background: 'linear-gradient(135deg, var(--brand), var(--brand-hover, var(--brand)))',
    borderRadius: 16, padding: 2, height: '100%',
  },
  memberCardInner: {
    background: 'var(--surface)',
    borderRadius: 14, padding: 24, height: '100%',
  },
  tierLabel: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: 4 },
  tierName: { fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, color: 'var(--text)' },
  tierBadge: { width: 44, height: 44, borderRadius: 12, background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)' },
  pointsWrap: { marginTop: 20 },
  pointsBar: { height: 6, borderRadius: 3, background: 'var(--surface2)', overflow: 'hidden', marginBottom: 8 },
  pointsFill: { height: '100%', borderRadius: 3, background: 'var(--brand)', transition: 'width 1s ease' },
  pointsLabel: { fontSize: 14, fontWeight: 700, color: 'var(--text)' },
  nextReward: { fontSize: 12, color: 'var(--text2)', marginTop: 4 },
  benefitsCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, height: '100%' },
  cardTitle: { fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 16 },
  benefitsList: { listStyle: 'none', padding: 0, margin: 0 },
  benefitItem: { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', fontSize: 14, color: 'var(--text2)' },
  checkmark: { color: 'var(--brand)', fontWeight: 700, fontSize: 14, flexShrink: 0 },
  historyCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 24 },
  historyRow: { display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0' },
  historyDate: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', minWidth: 60 },
  historyDot: { width: 8, height: 8, borderRadius: '50%', background: 'var(--brand)', marginTop: 5, flexShrink: 0 },
  historyContent: { flex: 1 },
  historyEvent: { fontSize: 14, color: 'var(--text)', fontWeight: 500 },
  historyType: { fontSize: 11, color: 'var(--text2)', marginTop: 2 },
  actionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 },
  actionCard: {
    background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14,
    padding: 20, textAlign: 'center', cursor: 'pointer',
    transition: 'border-color 0.3s ease', fontFamily: 'var(--font-body)',
  },
  actionIcon: { display: 'block', fontSize: 22, color: 'var(--brand)', marginBottom: 8 },
  actionLabel: { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)' },
}
