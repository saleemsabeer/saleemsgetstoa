export default {
  id: 'medspa',
  name: 'Haus of Confidence',
  industry: 'MedSpa / Wellness',
  theme: {
    '--brand': '#b08d6e',
    '--brand-glow': 'rgba(176,141,110,0.2)',
    '--brand-hover': '#c9a580',
    '--brand-dim': '#8b6f4e',
    '--bg': '#faf5ef',
    '--bg2': '#f3ece2',
    '--surface': '#fff',
    '--surface2': '#f8f0e8',
    '--border': '#e8ddd0',
    '--text': '#3d2e1e',
    '--text2': '#7a6b5a',
    '--muted': '#b0a090',
    '--font-display': "'Playfair Display', Georgia, serif",
    '--font-body': "'DM Sans', system-ui, sans-serif",
  },
  background: 'gradient',

  sections: [
    {
      id: 'website',
      label: 'YOUR WEBSITE',
      icon: '◈',
      baseUrl: 'https://medspa-platform-two.vercel.app',
      features: [
        { label: 'Home', path: '/', desc: 'Luxury med spa landing page with service highlights, provider bios, testimonials, and online booking call-to-action. Warm, premium aesthetic.' },
        { label: 'Book Online', path: '/book', desc: 'Full appointment booking flow — pick a service, choose a provider, select date and time, and confirm. Integrated with the admin schedule.' },
        { label: 'Pricing', path: '/pricing', desc: 'Transparent pricing for all treatments and services. Membership tiers with monthly benefits and savings breakdowns.' },
        { label: 'Client Portal', path: '/portal', desc: 'Clients can view upcoming appointments, treatment history, loyalty points, and manage their membership.' },
      ]
    },
    {
      id: 'dashboard',
      label: 'YOUR DASHBOARD',
      icon: '▦',
      baseUrl: 'https://medspa-platform-two.vercel.app',
      features: [
        { label: 'Dashboard', path: '/admin', desc: 'Admin command center with today\'s appointments, revenue KPIs, client retention metrics, and AI-generated daily summary.' },
        { label: 'Schedule', path: '/admin/schedule', desc: 'Visual calendar view of all appointments by provider. Drag-and-drop rescheduling, availability management, and gap detection.' },
        { label: 'Patients', path: '/admin/patients', desc: 'Complete client records — contact info, treatment history, consent forms, photos, notes, and spending totals.' },
        { label: 'Treatments', path: '/admin/treatments', desc: 'Service catalog management. Add treatments, set pricing, configure durations, and manage treatment protocols.' },
        { label: 'Before & After', path: '/admin/photos', desc: 'Photo gallery management for treatment results. Upload, tag by treatment type, and showcase on the website.' },
        { label: 'Check In', path: '/admin/checkin', desc: 'Front desk check-in flow. Verify client info, process consent forms, collect payments, and update visit status.' },
        { label: 'Memberships', path: '/admin/memberships', desc: 'Manage membership tiers, track active members, process renewals, and analyze membership revenue.' },
        { label: 'Inventory', path: '/admin/inventory', desc: 'Track injectables, skincare products, and supplies. Lot numbers, expiration dates, and reorder alerts.' },
        { label: 'Reviews', path: '/admin/reviews', desc: 'Monitor and respond to client reviews. Track satisfaction scores and identify trends.' },
        { label: 'Email', path: '/admin/email', desc: 'Email marketing with templates for promotions, appointment reminders, and post-treatment follow-ups.' },
        { label: 'Reports', path: '/admin/reports', desc: 'Revenue by provider, treatment popularity, client retention rates, and financial exports.' },
      ]
    },
    {
      id: 'portal',
      label: 'YOUR PORTAL',
      icon: '◇',
      baseUrl: 'https://medspa-platform-two.vercel.app',
      features: [
        { label: 'Client Portal', path: '/portal', desc: 'Clients see upcoming appointments, past treatments, loyalty points, and can rebook favorite services. Beautiful, branded experience.' },
      ]
    },
  ],
}
