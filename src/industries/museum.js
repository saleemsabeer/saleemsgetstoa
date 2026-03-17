export default {
  id: 'museum',
  name: 'Desert Science Center',
  industry: 'Museum / Nonprofit',
  theme: {
    '--brand': '#D4AF37',
    '--brand-glow': 'rgba(212,175,55,0.25)',
    '--brand-hover': '#E5C76B',
    '--brand-dim': '#a08520',
    '--bg': '#04040c',
    '--bg2': '#0a0a1a',
    '--surface': '#0f0f1e',
    '--surface2': '#16162a',
    '--border': '#16162a',
    '--text': '#F0EDE6',
    '--text2': '#908D9A',
    '--muted': '#5C5870',
    '--font-display': "'Playfair Display', Georgia, serif",
    '--font-body': "'DM Sans', system-ui, sans-serif",
  },
  background: 'stars',

  sections: [
    {
      id: 'website',
      label: 'YOUR WEBSITE',
      icon: '◈',
      baseUrl: 'https://darksky-store.vercel.app',
      features: [
        { label: 'Home', path: '/', desc: 'Full-screen video hero with animated starfield canvas, scroll-reveal animations, and cinematic desert night sky footage. The entire page is live-editable with a built-in CMS.' },
        { label: 'Gift Shop', path: '/shop', desc: 'Online store with 67 products synced from Printify. Category filters, search, product detail pages with variants, shopping cart, and Stripe checkout.' },
        { label: 'Events', path: '/events', desc: 'Upcoming events with ticket booking, date/time details, capacity limits, and online reservations. Integrated with the admin event manager.' },
        { label: 'Membership', path: '/membership', desc: 'Three-tier membership plans with perks, pricing, and online sign-up. Members get discounts, priority booking, and exclusive access.' },
        { label: 'Donate', path: '/donate', desc: 'Donation page with preset tiers and custom amounts. Supports one-time and recurring gifts with Stripe processing.' },
        { label: 'Education', path: '/education', desc: 'Educational programs, field trip booking, and curriculum resources for schools and groups.' },
        { label: 'About', path: '/about', desc: 'Organization story, mission, team bios, and location information with embedded map.' },
      ]
    },
    {
      id: 'dashboard',
      label: 'YOUR DASHBOARD',
      icon: '▦',
      baseUrl: 'https://darksky-store.vercel.app',
      features: [
        { label: 'Dashboard', path: '/admin', desc: 'Command center with KPIs, revenue tracking, AI-generated summary, recent orders, and real-time alerts. Everything your team needs at a glance.' },
        { label: 'Inventory', path: '/admin/inventory', desc: 'Full inventory management synced with Printify. Stock levels, variants, categories, and automated low-stock alerts.' },
        { label: 'Orders', path: '/admin/orders', desc: 'Order management with status tracking, fulfillment workflow, customer details, and shipping integration.' },
        { label: 'POS', path: '/admin/pos', desc: 'Point of sale terminal for in-person transactions. Quick-add products, apply discounts, process payments, and print receipts.' },
        { label: 'Events', path: '/admin/events', desc: 'Create and manage events, set capacity limits, track RSVPs, and handle ticket sales from one place.' },
        { label: 'Design Studio', path: '/admin/design-studio', desc: 'AI-powered image generation for marketing materials, product mockups, social media graphics, and event flyers.' },
        { label: 'Social Media', path: '/admin/social-media', desc: 'Create branded social media posts with templates, schedule content, and manage your presence across platforms.' },
        { label: 'Emails', path: '/admin/emails', desc: 'Email campaign builder with templates, audience segmentation, scheduling, and open/click analytics.' },
        { label: 'Donations', path: '/admin/donations', desc: 'Track donations, manage donors, generate tax receipts, and view giving trends over time.' },
        { label: 'Reports', path: '/admin/reports', desc: 'Revenue reports, visitor analytics, product performance, and CSV exports for accounting.' },
        { label: 'Facility', path: '/admin/facility', desc: 'Facility booking and space management for private events, rentals, and internal scheduling.' },
        { label: 'Volunteers', path: '/admin/volunteers', desc: 'Volunteer management with shift scheduling, hour tracking, communication tools, and recognition.' },
      ]
    },
    {
      id: 'portal',
      label: 'YOUR PORTALS',
      icon: '◇',
      baseUrl: 'https://darksky-store.vercel.app',
      features: [
        { label: 'Volunteer Portal', path: '/volunteer-portal', desc: 'Volunteers can view upcoming shifts, log hours, see their impact stats, and communicate with coordinators.' },
        { label: 'Member Portal', path: '/member-portal', desc: 'Members view their benefits, track points, see event history, manage their membership tier, and access exclusive content.' },
        { label: 'School Portal', path: '/school-portal', desc: 'Schools can browse field trip options, submit booking requests, download curriculum materials, and manage group visits.' },
      ]
    },
  ],
}
