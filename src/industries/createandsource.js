export default {
  id: 'createandsource',
  name: 'Create & Source',
  industry: 'Sourcing / Operations',
  theme: {
    '--brand': '#8B6914',
    '--brand-glow': 'rgba(139,105,20,0.2)',
    '--brand-hover': '#A07B1A',
    '--brand-dim': '#6B5010',
    '--bg': '#faf8f5',
    '--bg2': '#f5f0ea',
    '--surface': '#fff',
    '--surface2': '#f0ebe2',
    '--border': '#e0d8cc',
    '--text': '#1a1a1a',
    '--text2': '#6b6560',
    '--muted': '#9a9490',
    '--font-display': "'Plus Jakarta Sans', system-ui, sans-serif",
    '--font-body': "'DM Sans', system-ui, sans-serif",
  },
  background: 'light',

  sections: [
    {
      id: 'website',
      label: 'YOUR WEBSITE',
      icon: '◈',
      baseUrl: 'https://createandsource-website.vercel.app',
      features: [
        { label: 'Home', path: '/', desc: 'Company landing page with services overview, client testimonials, and brand story.' },
      ]
    },
    {
      id: 'dashboard',
      label: 'YOUR DASHBOARD',
      icon: '▦',
      note: 'Internal ops dashboard for managing sourcing, suppliers, quotes, and fulfillment. Two-app architecture with AWS Lambda backend.',
      features: []
    },
    {
      id: 'portal',
      label: 'YOUR PORTAL',
      icon: '◇',
      note: 'Client portal where brands submit product requests, track orders, and manage their account.',
      features: []
    },
  ],
}
