export default {
  id: 'tacoboys',
  name: "Taco Boy's",
  industry: 'Restaurant',
  theme: {
    '--brand': '#D4A017',
    '--brand-glow': 'rgba(212,160,23,0.2)',
    '--brand-hover': '#E5B42A',
    '--brand-dim': '#A07B10',
    '--bg': '#1a1108',
    '--bg2': '#231a0e',
    '--surface': '#2d1f0e',
    '--surface2': '#382814',
    '--border': '#4a3620',
    '--text': '#f5ebe0',
    '--text2': '#a89880',
    '--muted': '#6b5d4a',
    '--font-display': "'Playfair Display', Georgia, serif",
    '--font-body': "'DM Sans', system-ui, sans-serif",
  },
  background: 'dark',

  sections: [
    {
      id: 'website',
      label: 'YOUR WEBSITE',
      icon: '◈',
      note: 'Full restaurant platform with online menu, ordering, and rewards. Live demo coming soon.',
      features: []
    },
    {
      id: 'dashboard',
      label: 'YOUR DASHBOARD',
      icon: '▦',
      note: 'Admin dashboard for managing orders, menu items, inventory, and daily operations.',
      features: []
    },
    {
      id: 'portal',
      label: 'YOUR PORTAL',
      icon: '◇',
      note: 'Member portal with loyalty rewards, order history, and favorite items.',
      features: []
    },
  ],
}
