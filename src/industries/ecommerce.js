export default {
  id: 'ecommerce',
  name: 'Woolson Audio',
  industry: 'Ecommerce / Retail',
  theme: {
    '--brand': '#c4956a',
    '--brand-glow': 'rgba(196,149,106,0.2)',
    '--brand-hover': '#d4a57a',
    '--brand-dim': '#a07850',
    '--bg': '#0a0a0a',
    '--bg2': '#0e0e0e',
    '--surface': '#131313',
    '--surface2': '#1a1a1a',
    '--border': '#2a2a2a',
    '--text': '#e8e4df',
    '--text2': '#908a84',
    '--muted': '#5a5550',
    '--font-display': "'Playfair Display', Georgia, serif",
    '--font-body': "'DM Sans', system-ui, sans-serif",
  },
  background: 'dark',

  sections: [
    {
      id: 'website',
      label: 'YOUR WEBSITE',
      icon: '◈',
      baseUrl: 'https://woolson-audio.vercel.app',
      features: [
        { label: 'Home', path: '/', desc: 'Cinematic single-page storefront for vintage audio. Video hero, brand marquee, featured products, gallery, newsletter signup, and trust badges. Dark luxury aesthetic.' },
        { label: 'Collections', path: '/#collections', desc: 'Browse by category — amplifiers, speakers, turntables, tuners, and tape decks. Each piece includes era, condition, and pricing.' },
        { label: 'Gallery', path: '/#gallery', desc: 'Visual showcase of restored equipment and the showroom. High-quality photography that sells the craftsmanship.' },
        { label: 'About', path: '/#about', desc: 'The Woolson Audio story — passion for vintage audio restoration, expertise, and the Phoenix showroom experience.' },
        { label: 'Contact', path: '/#contact', desc: 'Contact form, phone number, location, and hours. Everything a customer needs to reach out or visit.' },
      ]
    },
    {
      id: 'dashboard',
      label: 'YOUR DASHBOARD',
      icon: '▦',
      note: 'Dashboard and admin features are in development for this platform. The storefront above is a fully built frontend — backend integration coming soon.',
      features: []
    },
    {
      id: 'portal',
      label: 'YOUR PORTAL',
      icon: '◇',
      note: 'Customer portal features are in development for this platform.',
      features: []
    },
  ],
}
