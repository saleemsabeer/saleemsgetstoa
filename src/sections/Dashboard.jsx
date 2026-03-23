import Reveal from '../components/Reveal'

export default function Dashboard({ data, enabled }) {
  const d = data.dashboard

  return (
    <section style={s.wrap}>
      <Reveal>
        <div style={s.header}>
          <div style={s.sectionTag}>▦ {data.id === 'medflow' ? 'COMMAND CENTER' : 'ADMIN DASHBOARD'}</div>
          <div style={s.greeting}>{d.greeting}</div>
        </div>
      </Reveal>

      {/* ── KPIs ── */}
      {enabled.kpis && (
        <Reveal delay={100}>
          <div style={s.kpiGrid}>
            {d.kpis.map(k => (
              <div key={k.label} style={s.kpiCard}>
                <div style={s.kpiLabel}>{k.label}</div>
                <div style={s.kpiValue}>{k.value}</div>
                {k.change && (
                  <div style={{ ...s.kpiChange, color: k.up ? '#4ADE80' : '#EF4444' }}>
                    {k.up ? '↑' : '↓'} {k.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      )}

      <div style={s.twoCol}>
        {/* ── AI Summary ── */}
        {enabled.kpis && (
          <Reveal delay={200}>
            <div style={s.aiCard}>
              <div style={s.aiHeader}>
                <div style={s.aiIcon}>✦</div>
                <div style={s.aiTitle}>AI Summary</div>
              </div>
              <div style={s.aiText}>{d.aiSummary}</div>
            </div>
          </Reveal>
        )}

        {/* ── Recent Orders ── */}
        {enabled.kpis && (
          <Reveal delay={300}>
            <div style={s.tableCard}>
              <div style={s.tableTitle}>Recent Orders</div>
              <div style={s.tableScroll}>
                <div style={s.table}>
                  <div style={s.tableHeader}>
                    <span style={s.th}>Order</span>
                    <span style={{ ...s.th, flex: 2 }}>Customer</span>
                    <span style={s.th}>Total</span>
                    <span style={s.th}>Status</span>
                  </div>
                  {d.recentOrders.map(o => (
                    <div key={o.id} style={s.tableRow}>
                      <span style={s.tdId}>{o.id}</span>
                      <span style={{ ...s.tdCustomer, flex: 2 }}>
                        <div style={{ fontWeight: 500, color: 'var(--text)' }}>{o.customer}</div>
                        <div style={s.tdItems}>{o.items}</div>
                      </span>
                      <span style={s.tdTotal}>{o.total}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 600,
                        color: o.status === 'Delivered' || o.status === 'Completed' ? '#4ADE80' :
                               o.status === 'Shipped' || o.status === 'Scheduled' ? 'var(--brand)' : 'var(--text2)',
                      }}>{o.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* ── Inventory Alerts ── */}
      {enabled.inventory && d.inventoryAlerts && (
        <Reveal delay={400}>
          <div style={s.alertCard}>
            <div style={s.tableTitle}>Inventory Alerts</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {d.inventoryAlerts.map(a => (
                <div key={a.item} style={s.alertItem}>
                  <div style={s.alertName}>{a.item}</div>
                  <div style={s.alertMeta}>
                    <span style={{
                      ...s.alertBadge,
                      background: a.stock === 0 ? 'rgba(239,68,68,0.1)' : 'rgba(251,191,36,0.1)',
                      color: a.stock === 0 ? '#EF4444' : '#FBBF24',
                    }}>{a.status}</span>
                    <span style={s.alertStock}>{a.stock} units</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Order Management (ecommerce) ── */}
      {enabled.orders && (
        <Reveal delay={400}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>Order Management</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 16 }}>
              {[
                { label: 'Pending', count: 8, color: '#FBBF24' },
                { label: 'Processing', count: 12, color: 'var(--brand)' },
                { label: 'Shipped', count: 23, color: 'var(--brand)' },
                { label: 'Delivered', count: 156, color: '#4ADE80' },
              ].map(s2 => (
                <div key={s2.label} style={{ background: 'var(--surface2)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: s2.color }}>{s2.count}</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>{s2.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Reports ── */}
      {enabled.reports && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>Reports & Analytics</div>
            <div style={s.chartPlaceholder}>
              <div style={s.chartBars}>
                {[65, 80, 45, 90, 70, 85, 55].map((h, i) => (
                  <div key={i} style={{
                    flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%',
                  }}>
                    <div style={{
                      height: `${h}%`,
                      background: 'var(--brand)',
                      borderRadius: '4px 4px 0 0',
                      opacity: 0.3 + (h / 150),
                    }} />
                  </div>
                ))}
              </div>
              <div style={s.chartLabels}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(label => (
                  <span key={label} style={s.chartLabel}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Commissions (medflow) ── */}
      {enabled.commissions && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>Commission Tracking</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { rep: 'Clint M.', tier: 'Gold', rate: '12%', earned: '$18,400', quota: '102%' },
                { rep: 'Sarah K.', tier: 'Silver', rate: '10%', earned: '$14,200', quota: '89%' },
                { rep: 'James R.', tier: 'Bronze', rate: '8%', earned: '$7,800', quota: '74%' },
              ].map(c => (
                <div key={c.rep} style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{c.rep}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--brand)', background: 'var(--brand-glow)', padding: '2px 8px', borderRadius: 100 }}>{c.tier}</span>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{c.earned}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{c.rate} rate · {c.quota} to quota</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ── AI Design Studio (museum, ecommerce) ── */}
      {enabled.aiDesign && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>AI Design Studio</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              {[
                { title: 'Generate Product Image', desc: 'AI-powered product photography' },
                { title: 'Logo Variations', desc: 'Create logo alternatives instantly' },
                { title: 'Social Media Graphics', desc: 'Branded posts and stories' },
                { title: 'Marketing Materials', desc: 'Flyers, banners, and ads' },
              ].map(tool => (
                <div key={tool.title} style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16, cursor: 'pointer' }}>
                  <div style={{ fontSize: 20, opacity: 0.2, color: 'var(--brand)', marginBottom: 8 }}>✦</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{tool.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.5 }}>{tool.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ── AI Sales Coach (medflow) ── */}
      {enabled.aiCoaching && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 16, color: 'var(--brand)' }}>✦</span>
              <div style={s.tableTitle}>AI Sales Coach</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand)', marginBottom: 8 }}>CALL ANALYSIS</div>
                <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6 }}>
                  Your last call with Dr. Chen was 12 minutes — 30% longer than your average. Consider leading with the ROI data next time to close faster.
                </div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand)', marginBottom: 8 }}>SUGGESTED NEXT STEPS</div>
                <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6 }}>
                  • Follow up with Dr. Patel on OrthoFlex trial results<br />
                  • Schedule product demo for Valley Surgical Group<br />
                  • Submit Q1 compliance report by Friday
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Leaderboard (medflow) ── */}
      {enabled.leaderboard && (
        <Reveal delay={500}>
          <div style={s.tableCard}>
            <div style={s.tableTitle}>Rep Leaderboard</div>
            {[
              { name: 'Clint M.', value: '$1.8M', calls: 42, streak: '5 days' },
              { name: 'Sarah K.', value: '$1.4M', calls: 38, streak: '3 days' },
              { name: 'James R.', value: '$980K', calls: 29, streak: '1 day' },
            ].map((rep, i) => (
              <div key={rep.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  background: i === 0 ? 'var(--brand)' : 'var(--surface2)',
                  color: i === 0 ? 'var(--bg)' : 'var(--text2)',
                }}>
                  {i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{rep.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{rep.calls} calls · {rep.streak} streak</div>
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{rep.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* ── Route Planner (medflow) ── */}
      {enabled.routePlanner && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>Route Planner</div>
            <div style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Today's Route — Clint M.</span>
                <span style={{ fontSize: 11, color: 'var(--brand)', fontWeight: 600 }}>5 stops · 48 miles</span>
              </div>
              {[
                { time: '8:30 AM', stop: 'Valley Orthopedics', type: 'Follow-up', dist: '' },
                { time: '10:00 AM', stop: 'Heart Center of AZ', type: 'Product demo', dist: '12 mi' },
                { time: '11:30 AM', stop: 'Scottsdale Neuro Associates', type: 'Cold call', dist: '8 mi' },
                { time: '1:30 PM', stop: 'Desert Surgical Group', type: 'Sample drop-off', dist: '15 mi' },
                { time: '3:00 PM', stop: 'Mesa Medical Center', type: 'Training', dist: '13 mi' },
              ].map((stop, i) => (
                <div key={stop.stop} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--brand)', minWidth: 65, fontWeight: 600 }}>{stop.time}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{stop.stop}</div>
                    <div style={{ fontSize: 11, color: 'var(--text2)' }}>{stop.type}</div>
                  </div>
                  {stop.dist && <span style={{ fontSize: 11, color: 'var(--muted)' }}>{stop.dist}</span>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Softphone (medflow) ── */}
      {enabled.softphone && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>Softphone / Dialer</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>DIALER</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.1em', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
                  (480) 555-0142
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <button style={{ padding: '10px', borderRadius: 8, background: 'var(--brand)', color: 'var(--bg)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Call</button>
                  <button style={{ padding: '10px', borderRadius: 8, background: 'transparent', color: 'var(--text)', fontSize: 12, fontWeight: 600, border: '1px solid var(--border)', cursor: 'pointer' }}>SMS</button>
                </div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>RECENT CALLS</div>
                {[
                  { name: 'Dr. Patel', time: '2:30 PM', duration: '8 min', dir: 'outbound' },
                  { name: 'Dr. Chen', time: '11:15 AM', duration: '12 min', dir: 'outbound' },
                  { name: 'Valley Ortho (front desk)', time: '9:45 AM', duration: '3 min', dir: 'inbound' },
                ].map(call => (
                  <div key={call.name + call.time} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{call.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{call.time} · {call.duration}</div>
                    </div>
                    <span style={{ fontSize: 10, color: call.dir === 'outbound' ? 'var(--brand)' : 'var(--text2)' }}>
                      {call.dir === 'outbound' ? '↗' : '↙'} {call.dir}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Appointment Manager ── */}
      {enabled.appointments && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>Today's Appointments</div>
            {[
              { time: '10:00 AM', client: 'Jennifer L.', service: 'Botox (40 units)', provider: 'Dr. Smith', status: 'Checked In' },
              { time: '11:30 AM', client: 'Amanda R.', service: 'HydraFacial + LED', provider: 'Dr. Johnson', status: 'Confirmed' },
              { time: '1:00 PM', client: 'Michelle S.', service: 'Dermal Fillers', provider: 'Dr. Smith', status: 'Confirmed' },
              { time: '2:30 PM', client: 'Rachel K.', service: 'Body Contouring', provider: 'Dr. Johnson', status: 'Pending' },
            ].map(appt => (
              <div key={appt.time} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--brand)', minWidth: 70, fontWeight: 600 }}>{appt.time}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{appt.client}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{appt.service} · {appt.provider}</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 100,
                  background: appt.status === 'Checked In' ? 'rgba(74,222,128,0.1)' : appt.status === 'Confirmed' ? 'rgba(212,175,55,0.1)' : 'rgba(128,128,128,0.1)',
                  color: appt.status === 'Checked In' ? '#4ADE80' : appt.status === 'Confirmed' ? 'var(--brand)' : 'var(--muted)',
                }}>{appt.status}</span>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* ── Client Records ── */}
      {enabled.clientRecords && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>Client Records</div>
            <div style={s.tableScroll}>
              <div style={s.table}>
                <div style={s.tableHeader}>
                  <span style={{ ...s.th, flex: 2 }}>Client</span>
                  <span style={s.th}>Last Visit</span>
                  <span style={s.th}>Next Appt</span>
                  <span style={s.th}>Total Spent</span>
                </div>
                {[
                  { name: 'Jennifer L.', last: 'Mar 12', next: 'Apr 8', spent: '$3,480' },
                  { name: 'Amanda R.', last: 'Mar 10', next: 'Mar 28', spent: '$2,100' },
                  { name: 'Michelle S.', last: 'Mar 5', next: 'Apr 2', spent: '$4,750' },
                  { name: 'Rachel K.', last: 'Feb 28', next: 'Mar 20', spent: '$1,200' },
                ].map(client => (
                  <div key={client.name} style={s.tableRow}>
                    <span style={{ ...s.tdCustomer, flex: 2, fontWeight: 600, color: 'var(--text)' }}>{client.name}</span>
                    <span style={{ ...s.tdId, fontFamily: 'var(--font-mono)' }}>{client.last}</span>
                    <span style={{ ...s.tdId, fontFamily: 'var(--font-mono)', color: 'var(--brand)' }}>{client.next}</span>
                    <span style={s.tdTotal}>{client.spent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Social Media Creator (museum) ── */}
      {enabled.socialMedia && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>Social Media Creator</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
              {['Instagram Post', 'Story Template', 'Facebook Banner', 'Event Flyer'].map(t => (
                <div key={t} style={{ background: 'var(--surface2)', borderRadius: 10, padding: 20, textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ fontSize: 24, marginBottom: 8, opacity: 0.2, color: 'var(--brand)' }}>◈</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Staff Management ── */}
      {enabled.staffMgmt && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>Staff</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { name: 'Dr. Smith', role: 'Lead Injector', status: 'On Shift', appts: 6 },
                { name: 'Dr. Johnson', role: 'Aesthetician', status: 'On Shift', appts: 5 },
                { name: 'Maria R.', role: 'Front Desk', status: 'On Shift', appts: null },
              ].map(staff => (
                <div key={staff.name} style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{staff.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 8 }}>{staff.role}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#4ADE80' }}>{staff.status}</span>
                    {staff.appts && <span style={{ fontSize: 11, color: 'var(--muted)' }}>{staff.appts} appts today</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Email Campaigns ── */}
      {enabled.email && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>Email Campaigns</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
              {[
                { name: 'March Newsletter', status: 'Sent', opens: '42%', clicks: '12%', date: 'Mar 1' },
                { name: 'Spring Sale Promo', status: 'Draft', opens: '—', clicks: '—', date: 'Mar 18' },
                { name: 'Welcome Series', status: 'Active', opens: '68%', clicks: '24%', date: 'Automated' },
              ].map(campaign => (
                <div key={campaign.name} style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{campaign.name}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 100,
                      background: campaign.status === 'Sent' ? 'rgba(74,222,128,0.1)' : campaign.status === 'Active' ? 'rgba(74,222,128,0.1)' : 'rgba(128,128,128,0.1)',
                      color: campaign.status === 'Sent' || campaign.status === 'Active' ? '#4ADE80' : 'var(--muted)',
                    }}>{campaign.status}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>
                    Opens: {campaign.opens} · Clicks: {campaign.clicks}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{campaign.date}</div>
                </div>
              ))}
            </div>
            <button style={{ padding: '10px 24px', borderRadius: 100, background: 'var(--brand)', color: 'var(--bg)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
              Create Campaign
            </button>
          </div>
        </Reveal>
      )}

      {/* ── POS (museum/ecommerce) ── */}
      {enabled.pos && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>Point of Sale</div>
            <div style={s.posTerminal}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>TERMINAL 1</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#4ADE80' }}>ACTIVE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                <span style={{ fontSize: 14, color: 'var(--text2)' }}>Current Sale</span>
                <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)' }}>$0.00</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <button style={{ padding: '12px 16px', borderRadius: 8, background: 'var(--brand)', color: 'var(--bg)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>New Sale</button>
                <button style={{ padding: '12px 16px', borderRadius: 8, background: 'var(--surface2)', color: 'var(--text)', fontSize: 12, fontWeight: 600, border: '1px solid var(--border)', cursor: 'pointer' }}>Quick Add</button>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Facility Booking (museum) ── */}
      {enabled.facilityBooking && (
        <Reveal delay={500}>
          <div style={s.reportCard}>
            <div style={s.tableTitle}>Facility Booking</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
              {[
                { space: 'Main Observatory Hall', capacity: '200 guests', nextAvail: 'Mar 22', rate: '$500/hr' },
                { space: 'Planetarium Theater', capacity: '80 guests', nextAvail: 'Mar 19', rate: '$300/hr' },
                { space: 'Outdoor Star Deck', capacity: '100 guests', nextAvail: 'Mar 20', rate: '$250/hr' },
              ].map(space => (
                <div key={space.space} style={{ background: 'var(--surface2)', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{space.space}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 4 }}>{space.capacity} · {space.rate}</div>
                  <div style={{ fontSize: 11, color: 'var(--brand)', fontWeight: 600 }}>Next available: {space.nextAvail}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </section>
  )
}

const s = {
  wrap: { maxWidth: 1100, margin: '0 auto', padding: '60px 24px 80px' },
  header: { marginBottom: 32 },
  sectionTag: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--brand)', marginBottom: 8 },
  greeting: { fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 500, color: 'var(--text)' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 },
  kpiCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 },
  kpiLabel: { fontSize: 12, color: 'var(--text2)', marginBottom: 4, fontWeight: 500 },
  kpiValue: { fontSize: 28, fontWeight: 700, color: 'var(--text)', marginBottom: 2 },
  kpiChange: { fontSize: 12, fontWeight: 600 },
  twoCol: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, marginBottom: 24 },
  aiCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, height: '100%' },
  aiHeader: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 },
  aiIcon: { fontSize: 16, color: 'var(--brand)' },
  aiTitle: { fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 0 },
  aiText: { fontSize: 14, lineHeight: 1.7, color: 'var(--text2)' },
  tableCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, height: '100%', marginBottom: 24 },
  tableTitle: { fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 16 },
  tableScroll: { overflowX: 'auto' },
  table: { minWidth: 420 },
  tableHeader: { display: 'flex', gap: 8, padding: '8px 0', borderBottom: '1px solid var(--border)' },
  th: { fontSize: 10, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', flex: 1, minWidth: 70 },
  tableRow: { display: 'flex', gap: 8, padding: '12px 0', borderBottom: '1px solid var(--border)', alignItems: 'center' },
  tdId: { fontSize: 11, color: 'var(--text2)', fontFamily: 'var(--font-mono)', flex: 1, minWidth: 70 },
  tdCustomer: { fontSize: 13, flex: 1, minWidth: 70 },
  tdItems: { fontSize: 11, color: 'var(--muted)' },
  tdTotal: { fontSize: 13, color: 'var(--text)', fontWeight: 600, flex: 1, minWidth: 70 },
  alertCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 24 },
  alertItem: { flex: '1 1 200px', background: 'var(--surface2)', borderRadius: 10, padding: 16 },
  alertName: { fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 6 },
  alertMeta: { display: 'flex', alignItems: 'center', gap: 8 },
  alertBadge: { fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 100, letterSpacing: '0.05em' },
  alertStock: { fontSize: 12, color: 'var(--text2)' },
  reportCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 24 },
  chartPlaceholder: { height: 180 },
  chartBars: { display: 'flex', gap: 12, alignItems: 'flex-end', height: 150 },
  chartLabels: { display: 'flex', gap: 12, justifyContent: 'space-between', marginTop: 8 },
  chartLabel: { fontSize: 10, color: 'var(--muted)', textAlign: 'center', flex: 1 },
  card: { background: 'var(--surface2)', borderRadius: 12, padding: 20 },
  posTerminal: { background: 'var(--surface2)', borderRadius: 12, padding: 24 },
}
