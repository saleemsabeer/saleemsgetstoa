import museumConfig from './museum'
import ecommerceConfig from './ecommerce'
import medflowConfig from './medflow'
import tacoboysConfig from './tacoboys'
import media4youConfig from './media4you'
import searConfig from './sear'
import csConfig from './createandsource'

/* ══════════════════════════════════════════════════════
   FEATURE DEFINITIONS — keys match what Storefront/Dashboard/Portal expect
   ══════════════════════════════════════════════════════ */
export const FEATURES = {
  // Storefront
  events:      { label: 'Events & Tickets', section: 'storefront' },
  services:    { label: 'Services', section: 'storefront' },
  products:    { label: 'Products / Catalog', section: 'storefront' },
  shop:        { label: 'Gift Shop', section: 'storefront' },
  memberships: { label: 'Memberships', section: 'storefront' },
  donations:   { label: 'Donations', section: 'storefront' },
  booking:     { label: 'Online Booking', section: 'storefront' },
  beforeAfter: { label: 'Before & After', section: 'storefront' },
  cart:        { label: 'Shopping Cart', section: 'storefront' },
  reviews:     { label: 'Reviews', section: 'storefront' },
  pipeline:    { label: 'Sales Pipeline', section: 'storefront' },
  territories: { label: 'Territory Map', section: 'storefront' },
  compliance:  { label: 'Compliance', section: 'storefront' },
  // Dashboard
  kpis:            { label: 'Dashboard & KPIs', section: 'dashboard' },
  inventory:       { label: 'Inventory', section: 'dashboard' },
  orders:          { label: 'Order Management', section: 'dashboard' },
  reports:         { label: 'Reports & Analytics', section: 'dashboard' },
  email:           { label: 'Email Campaigns', section: 'dashboard' },
  pos:             { label: 'Point of Sale', section: 'dashboard' },
  socialMedia:     { label: 'Social Media', section: 'dashboard' },
  aiDesign:        { label: 'AI Design Studio', section: 'dashboard' },
  appointments:    { label: 'Appointments', section: 'dashboard' },
  clientRecords:   { label: 'Client Records', section: 'dashboard' },
  staffMgmt:       { label: 'Staff Management', section: 'dashboard' },
  facilityBooking: { label: 'Facility Booking', section: 'dashboard' },
  commissions:     { label: 'Commission Tracking', section: 'dashboard' },
  aiCoaching:      { label: 'AI Sales Coach', section: 'dashboard' },
  leaderboard:     { label: 'Rep Leaderboard', section: 'dashboard' },
  routePlanner:    { label: 'Route Planner', section: 'dashboard' },
  softphone:       { label: 'Softphone / Dialer', section: 'dashboard' },
  // Portal
  treatments:  { label: 'Treatment History', section: 'portal' },
  loyalty:     { label: 'Loyalty Rewards', section: 'portal' },
  wishlist:    { label: 'Wishlist', section: 'portal' },
  orderHistory:{ label: 'Order History', section: 'portal' },
  samples:     { label: 'Sample Requests', section: 'portal' },
  volunteers:  { label: 'Volunteer Dashboard', section: 'portal' },
  doctorView:  { label: 'Doctor Portal', section: 'portal' },
}

/* ══════════════════════════════════════════════════════
   SECTION DATA — storefront / dashboard / portal content per industry
   ══════════════════════════════════════════════════════ */

const museumData = {
  availableFeatures: ['events','shop','memberships','donations','kpis','inventory','orders','pos','socialMedia','email','facilityBooking','reports','volunteers'],
  defaultEnabled: { events:true, shop:true, memberships:true, donations:true, kpis:true, inventory:true, orders:true, pos:true, socialMedia:true, email:true, facilityBooking:true, reports:true, volunteers:true },
  storefront: {
    heroVideo: 'https://ssdozdtdcrkaoayzhrsa.supabase.co/storage/v1/object/public/videos/desert-night-sky.mp4',
    heroTag: 'DESERT SCIENCE CENTER',
    heroTitle: 'Discover the\nNight Sky.',
    heroSub: 'Explore the wonders of dark sky astronomy. Events, exhibits, a gift shop, and educational programs under the stars of Fountain Hills, Arizona.',
    heroCta: 'Plan Your Visit',
    heroCta2: 'Become a Member',
    events: [
      { title: 'Full Moon Night Hike', date: 'Mar 22', time: '7:00 PM', price: '$25', spots: '18 spots left', tag: 'POPULAR' },
      { title: 'Telescope Workshop', date: 'Mar 28', time: '6:30 PM', price: '$40', spots: '8 spots left' },
      { title: 'Star Party — Deep Sky', date: 'Apr 5', time: '8:00 PM', price: 'Free for members', spots: '50 spots left', tag: 'FREE' },
    ],
    shopItems: [
      { name: 'Star Map Poster', price: '$28' },
      { name: 'Night Sky Hoodie', price: '$55' },
      { name: 'Telescope Starter Kit', price: '$120' },
      { name: 'Dark Sky Enamel Pin', price: '$12' },
      { name: 'Constellation Mug', price: '$18' },
      { name: 'Observatory Tote', price: '$22' },
    ],
    memberships: [
      { name: 'Explorer', price: '$50/yr', perks: ['Free admission for 2', '10% gift shop discount', 'Newsletter', 'Member events'] },
      { name: 'Stargazer', price: '$120/yr', perks: ['Free admission for 4', '20% gift shop discount', 'Priority event booking', 'Exclusive star parties', 'Facility rental discount'] },
      { name: 'Patron', price: '$500/yr', perks: ['Unlimited admission', '25% gift shop discount', 'Private telescope sessions', 'Name on donor wall', 'Annual gala invitation', 'Tax-deductible'] },
    ],
    donationTiers: [
      { name: 'Friend', amount: '$25', desc: 'Supports one student field trip experience.' },
      { name: 'Supporter', amount: '$100', desc: 'Funds telescope maintenance for a month.' },
      { name: 'Champion', amount: '$500', desc: 'Sponsors a community star party event.' },
      { name: 'Visionary', amount: '$1,000+', desc: 'Helps expand our observatory and education programs.' },
    ],
  },
  dashboard: {
    greeting: 'Good evening, Desert Science Center',
    kpis: [
      { label: 'Visitors (MTD)', value: '1,842', change: '+22%', up: true },
      { label: 'Revenue (MTD)', value: '$28,400', change: '+15%', up: true },
      { label: 'Active Members', value: '312', change: '+28 this month', up: true },
      { label: 'Gift Shop Sales', value: '$4,200', change: '+8%', up: true },
    ],
    aiSummary: 'Visitor traffic is up 22% — the Full Moon Night Hike sold out in 3 days. Gift shop hoodie restocks arrive Friday. 4 new Patron members this month. Consider promoting the Telescope Workshop on social.',
    recentOrders: [
      { id: '#DSC-892', customer: 'Maria G.', items: 'Night Sky Hoodie, Star Map', total: '$83', status: 'Shipped' },
      { id: '#DSC-891', customer: 'Tom W.', items: 'Telescope Starter Kit', total: '$120', status: 'Processing' },
      { id: '#DSC-890', customer: 'Lisa P.', items: 'Full Moon Hike (2 tickets)', total: '$50', status: 'Confirmed' },
      { id: '#DSC-889', customer: 'James K.', items: 'Patron Membership', total: '$500', status: 'Completed' },
    ],
    inventoryAlerts: [
      { item: 'Night Sky Hoodie (M)', stock: 2, status: 'Low Stock' },
      { item: 'Dark Sky Enamel Pin', stock: 0, status: 'Out of Stock' },
      { item: 'Star Map Poster', stock: 8, status: 'Low Stock' },
    ],
  },
  portal: {
    welcome: 'Welcome back, Maria',
    memberSince: 'Member since January 2025 · Stargazer Tier',
    tier: 'Stargazer',
    points: 840,
    nextReward: '160 more points for a free star party ticket',
    benefits: ['Free admission for 4 guests', '20% gift shop discount', 'Priority event booking', 'Exclusive star parties', 'Facility rental discount'],
    history: [
      { date: 'Mar 15', event: 'Full Moon Night Hike — 2 tickets', type: 'Event · $50' },
      { date: 'Mar 8', event: 'Gift Shop — Night Sky Hoodie', type: 'Purchase · $55' },
      { date: 'Feb 20', event: 'Star Party — Deep Sky (member event)', type: 'Event · Free' },
      { date: 'Jan 15', event: 'Membership renewed — Stargazer', type: 'Billing · $120' },
    ],
  },
}

const ecommerceData = {
  availableFeatures: ['products','cart','reviews','memberships','kpis','inventory','orders','pos','reports','email','aiDesign','loyalty','wishlist','orderHistory'],
  defaultEnabled: { products:true, cart:true, reviews:true, kpis:true, inventory:true, orders:true, reports:true, email:true, aiDesign:true, loyalty:true, wishlist:true, orderHistory:true },
  storefront: {
    heroTag: 'WOOLSON AUDIO · PHOENIX, AZ',
    heroTitle: 'Vintage Sound.\nRestored.',
    heroSub: 'Curated vintage audio equipment — sourced, tested, and professionally restored. Marantz, Pioneer, JBL, Sansui, and more.',
    heroCta: 'Shop Collection',
    heroCta2: 'Visit Showroom',
    products: [
      { name: 'Marantz 2270', price: '$1,800', category: 'Receivers', tag: 'RESTORED' },
      { name: 'Pioneer SX-1250', price: '$2,200', category: 'Receivers' },
      { name: 'JBL L100 Classic', price: '$3,400', category: 'Speakers', tag: 'RARE' },
      { name: 'Sansui AU-717', price: '$950', category: 'Amplifiers' },
      { name: 'Technics SL-1200', price: '$800', category: 'Turntables' },
      { name: 'Nakamichi Dragon', price: '$4,500', category: 'Tape Decks', tag: 'COLLECTOR' },
    ],
    categories: ['All', 'Receivers', 'Speakers', 'Amplifiers', 'Turntables', 'Tape Decks'],
  },
  dashboard: {
    greeting: 'Good morning, Woolson Audio',
    kpis: [
      { label: 'Revenue (MTD)', value: '$18,600', change: '+24%', up: true },
      { label: 'Items Listed', value: '42', change: '6 new this week', up: true },
      { label: 'Avg Sale Price', value: '$1,840', change: '+$200', up: true },
      { label: 'Showroom Visits', value: '34', change: '+12%', up: true },
    ],
    aiSummary: 'Revenue up 24% — the JBL L100 listing drove 3x more traffic this week. Two Marantz units arriving Thursday. Consider featuring the Nakamichi Dragon on social — collector interest is high.',
    recentOrders: [
      { id: '#WA-418', customer: 'Dave M.', items: 'Marantz 2270 Receiver', total: '$1,800', status: 'Shipped' },
      { id: '#WA-417', customer: 'Chris L.', items: 'Technics SL-1200 MK2', total: '$800', status: 'Processing' },
      { id: '#WA-416', customer: 'Ryan T.', items: 'Sansui AU-717 Amp', total: '$950', status: 'Delivered' },
      { id: '#WA-415', customer: 'Steve P.', items: 'Pioneer SX-1250', total: '$2,200', status: 'Delivered' },
    ],
    inventoryAlerts: [
      { item: 'Replacement Stylus (Ortofon)', stock: 1, status: 'Low Stock' },
      { item: 'RCA Cables (Gold)', stock: 0, status: 'Out of Stock' },
    ],
  },
  portal: {
    welcome: 'Welcome back, Dave',
    memberSince: 'Customer since March 2025',
    tier: 'Gold Collector',
    points: 3600,
    nextReward: '400 more points for free shipping on your next order',
    benefits: ['Early access to new listings', 'Free shipping on orders over $500', '10% off accessories', 'Showroom VIP appointments', 'Collector newsletter'],
    history: [
      { date: 'Mar 10', event: 'Purchased Marantz 2270 Receiver', type: 'Order · $1,800' },
      { date: 'Feb 22', event: 'Showroom visit — listened to JBL L100s', type: 'Visit' },
      { date: 'Feb 5', event: 'Purchased Technics SL-1200 MK2', type: 'Order · $800' },
      { date: 'Jan 18', event: 'Purchased Sansui AU-717', type: 'Order · $950' },
    ],
  },
}

const medflowData = {
  availableFeatures: ['products','pipeline','territories','compliance','kpis','inventory','reports','commissions','aiCoaching','leaderboard','routePlanner','softphone','email','orderHistory','samples','doctorView'],
  defaultEnabled: { products:true, pipeline:true, territories:true, compliance:true, kpis:true, inventory:true, reports:true, commissions:true, aiCoaching:true, leaderboard:true, routePlanner:true, softphone:true, email:true, orderHistory:true, samples:true, doctorView:true },
  storefront: {
    heroTag: 'MEDFLOW · MEDICAL SALES PLATFORM',
    heroTitle: 'Sell Smarter.\nClose Faster.',
    heroSub: 'AI-powered CRM for medical device and pharmaceutical sales teams. Pipeline management, compliance tracking, and intelligent coaching.',
    heroCta: 'Start Free Trial',
    heroCta2: 'Book a Demo',
    products: [
      { name: 'OrthoFlex Knee System', price: '$8,400', category: 'Orthopedics', tag: 'TOP SELLER' },
      { name: 'CardioStent Pro', price: '$3,200', category: 'Cardiology' },
      { name: 'NeuroStim Device', price: '$12,800', category: 'Neurology', tag: 'NEW' },
      { name: 'SpineFusion Cage', price: '$6,200', category: 'Spine' },
    ],
    categories: ['All', 'Orthopedics', 'Cardiology', 'Neurology', 'Spine'],
    pipeline: [
      { stage: 'Prospecting', value: '$2.4M', count: 18 },
      { stage: 'Qualified', value: '$3.1M', count: 12 },
      { stage: 'Proposal', value: '$2.2M', count: 8 },
      { stage: 'Negotiation', value: '$1.2M', count: 4 },
    ],
  },
  dashboard: {
    greeting: 'Good morning, MedFlow HQ',
    kpis: [
      { label: 'Pipeline Value', value: '$8.9M', change: '+12%', up: true },
      { label: 'Close Rate', value: '34%', change: '+3%', up: true },
      { label: 'Active Reps', value: '4', change: 'All on target', up: true },
      { label: 'Deals This Month', value: '14', change: '+4 vs last month', up: true },
    ],
    aiSummary: 'Revenue is up 12% this quarter. 14 doctors are overdue for follow-up calls. Clint is on a 5-day call streak and leading the board. Consider routing Sarah to the Tucson territory — 3 new prospects there.',
    recentOrders: [
      { id: '#MF-3024', customer: 'Valley Orthopedics', items: 'OrthoFlex Knee System x2', total: '$16,800', status: 'Shipped' },
      { id: '#MF-3023', customer: 'Heart Center of AZ', items: 'CardioStent Pro x5', total: '$16,000', status: 'Processing' },
      { id: '#MF-3022', customer: 'Scottsdale Neuro', items: 'NeuroStim Device', total: '$12,800', status: 'Delivered' },
      { id: '#MF-3021', customer: 'Desert Surgical', items: 'SpineFusion Cage x3', total: '$18,600', status: 'Pending' },
    ],
    inventoryAlerts: [
      { item: 'OrthoFlex Knee System', stock: 3, status: 'Low Stock' },
      { item: 'NeuroStim Demo Unit', stock: 0, status: 'Out of Stock' },
    ],
  },
  portal: {
    welcome: 'Welcome, Dr. Patel',
    memberSince: 'Partner since June 2025 · Preferred Tier',
    tier: 'Preferred Partner',
    points: null,
    nextReward: null,
    benefits: ['Preferred tier pricing', 'Direct rep access (Clint M.)', 'Priority sample requests', '24/7 support line', 'Quarterly business reviews'],
    history: [
      { date: 'Mar 12', event: 'OrthoFlex Knee System x2 delivered', type: 'Order · $16,800' },
      { date: 'Mar 5', event: 'Product demo — NeuroStim Device', type: 'Meeting · Clint M.' },
      { date: 'Feb 20', event: 'CardioStent Pro x3 delivered', type: 'Order · $9,600' },
      { date: 'Feb 8', event: 'Quarterly business review', type: 'Meeting · Sales Team' },
    ],
  },
}

const tacoboysData = {
  availableFeatures: ['services','booking','memberships','kpis','inventory','orders','pos','email','reports','loyalty','orderHistory'],
  defaultEnabled: { services:true, booking:true, memberships:true, kpis:true, inventory:true, orders:true, pos:true, email:true, reports:true, loyalty:true, orderHistory:true },
  storefront: {
    heroTag: 'SONORAN STYLE SINCE 2019',
    heroTitle: "Welcome to\nTaco Boy's.",
    heroSub: 'Authentic Sonoran-style tacos, burritos, and more. Order online, earn rewards, and skip the line with our member portal.',
    heroCta: 'Order Now',
    heroCta2: 'View Menu',
    services: [
      { title: 'Birria Tacos (3pc)', price: '$14', duration: 'Prep: 8 min', desc: 'Slow-braised beef birria with consommé for dipping. Served on handmade corn tortillas with cilantro and onion.', tag: 'BEST SELLER' },
      { title: 'Carne Asada Burrito', price: '$12', duration: 'Prep: 6 min', desc: 'Grilled carne asada with rice, beans, guac, pico, and crema in a flour tortilla.' },
      { title: 'Street Corn Elote', price: '$6', duration: 'Prep: 4 min', desc: 'Grilled corn on the cob with mayo, cotija cheese, chili powder, and lime.' },
      { title: 'Horchata (Large)', price: '$5', duration: 'Prep: 2 min', desc: 'House-made rice milk with cinnamon and vanilla. The perfect complement to any meal.', tag: 'FAN FAVORITE' },
    ],
    memberships: [
      { name: 'Amigo', price: 'Free', perks: ['Earn 1 point per $1', 'Birthday free taco', 'Early access to specials'] },
      { name: 'Compadre', price: '$5/mo', perks: ['2x points on every order', 'Free drink with every meal', 'Skip-the-line ordering', 'Monthly exclusive item'] },
      { name: 'Familia', price: '$12/mo', perks: ['3x points on every order', 'Free side with every meal', 'Skip-the-line + priority pickup', 'Catering discount 15%', 'Secret menu access'] },
    ],
  },
  dashboard: {
    greeting: "Good morning, Taco Boy's",
    kpis: [
      { label: 'Orders Today', value: '87', change: '+14%', up: true },
      { label: 'Revenue (Today)', value: '$1,240', change: '+$180', up: true },
      { label: 'Avg Order', value: '$14.25', change: '+$0.80', up: true },
      { label: 'Active Members', value: '423', change: '+18 this week', up: true },
    ],
    aiSummary: "Birria tacos are up 30% this week — consider running them as a special. Tortilla stock is getting low for the weekend rush. 18 new loyalty members joined this week. Lunch rush peaks at 12:15 PM.",
    recentOrders: [
      { id: '#TB-2847', customer: 'Mike R.', items: 'Birria Tacos x3, Horchata', total: '$19', status: 'Ready' },
      { id: '#TB-2846', customer: 'Sarah K.', items: 'Carne Asada Burrito, Elote', total: '$18', status: 'Preparing' },
      { id: '#TB-2845', customer: 'Online Order', items: 'Family Pack (12 tacos)', total: '$42', status: 'Preparing' },
      { id: '#TB-2844', customer: 'Jessica M.', items: 'Birria Tacos x2', total: '$10', status: 'Completed' },
    ],
    inventoryAlerts: [
      { item: 'Corn Tortillas (packs)', stock: 4, status: 'Low Stock' },
      { item: 'Birria Consommé', stock: 2, status: 'Low Stock' },
      { item: 'Cotija Cheese', stock: 0, status: 'Out of Stock' },
    ],
  },
  portal: {
    welcome: 'Welcome back, Mike',
    memberSince: 'Member since November 2025 · Compadre',
    tier: 'Compadre',
    points: 380,
    nextReward: '120 more points for a free burrito',
    benefits: ['2x points on every order', 'Free drink with every meal', 'Skip-the-line ordering', 'Monthly exclusive item'],
    history: [
      { date: 'Mar 17', event: 'Birria Tacos x3, Horchata', type: 'Order · $19 · +38 pts' },
      { date: 'Mar 14', event: 'Carne Asada Burrito, Elote', type: 'Order · $18 · +36 pts' },
      { date: 'Mar 10', event: 'Redeemed: Free Drink', type: 'Reward · -100 pts' },
      { date: 'Mar 8', event: 'Family Pack (12 tacos)', type: 'Order · $42 · +84 pts' },
    ],
  },
}

const media4youData = {
  availableFeatures: ['services','kpis','reports','socialMedia','email','aiDesign','orders','inventory'],
  defaultEnabled: { services:true, kpis:true, reports:true, socialMedia:true, email:true, aiDesign:true, orders:true },
  storefront: {
    heroTag: 'MEDIA4YOU · SOCIAL MEDIA AGENCY',
    heroTitle: 'Your Brand.\nAmplified.',
    heroSub: 'Full-service social media management for growing brands. Campaign strategy, content creation, analytics, and multi-platform management.',
    heroCta: 'Get a Quote',
    heroCta2: 'See Our Work',
    services: [
      { title: 'Social Media Management', price: '$2,500/mo', duration: 'All platforms', desc: 'Full management of your Instagram, Facebook, and TikTok — content creation, scheduling, and community management.', tag: 'POPULAR' },
      { title: 'Campaign Strategy', price: '$1,500', duration: 'One-time', desc: 'Comprehensive brand audit, competitor analysis, and 90-day content strategy with KPI targets.' },
      { title: 'Content Production', price: '$800/mo', duration: 'Monthly package', desc: '20 branded posts, 8 stories, 4 reels per month. Professional photography and copywriting included.' },
      { title: 'Analytics & Reporting', price: '$500/mo', duration: 'Monthly', desc: 'Weekly performance reports, audience insights, campaign ROI analysis, and growth recommendations.' },
    ],
  },
  dashboard: {
    greeting: 'Good morning, Media4You HQ',
    kpis: [
      { label: 'Total Reach', value: '142K', change: '+28%', up: true },
      { label: 'Engagement Rate', value: '8.2%', change: '+1.4%', up: true },
      { label: 'Active Campaigns', value: '24', change: '6 launching this week', up: true },
      { label: 'Client Accounts', value: '12', change: '+2 this month', up: true },
    ],
    aiSummary: 'Overall engagement is up 28% — TikTok reels are driving most growth. The Desert Brew campaign is outperforming targets by 40%. Consider proposing a video-first strategy to the Bloom Beauty account.',
    recentOrders: [
      { id: '#M4U-128', customer: 'Desert Brew Co.', items: 'Social Management + Content', total: '$3,300/mo', status: 'Active' },
      { id: '#M4U-127', customer: 'Bloom Beauty', items: 'Campaign Strategy', total: '$1,500', status: 'In Progress' },
      { id: '#M4U-126', customer: 'Zen Yoga Studio', items: 'Social Management', total: '$2,500/mo', status: 'Active' },
      { id: '#M4U-125', customer: 'Fork & Flame', items: 'Content Production', total: '$800/mo', status: 'Active' },
    ],
  },
  portal: {
    welcome: 'Welcome back, Desert Brew Co.',
    memberSince: 'Client since August 2025 · Full Service Plan',
    tier: 'Full Service',
    points: null,
    nextReward: null,
    benefits: ['Dedicated account manager', 'Weekly performance reports', '24/7 content calendar access', 'Priority support', 'Quarterly strategy reviews'],
    history: [
      { date: 'Mar 15', event: 'March Report: 42K reach, 9.1% engagement', type: 'Report · Delivered' },
      { date: 'Mar 10', event: '8 Instagram posts published', type: 'Content · Scheduled' },
      { date: 'Mar 3', event: 'TikTok campaign launched — "Brew Stories"', type: 'Campaign · Active' },
      { date: 'Feb 28', event: 'February Report: 38K reach, 7.8% engagement', type: 'Report · Delivered' },
    ],
  },
}

const searData = {
  availableFeatures: ['events','shop','products','kpis','inventory','orders','pos','email','reports','orderHistory'],
  defaultEnabled: { events:true, shop:true, products:true, kpis:true, inventory:true, orders:true, pos:true, email:true, reports:true, orderHistory:true },
  storefront: {
    heroTag: 'SALT · SMOKE · SAVAGERY',
    heroTitle: 'A Primal Feast\nExperience.',
    heroSub: 'San Diego · July 18-19, 2026. Fire-driven cuisine from 20 chefs, live music, craft cocktails, and an unforgettable night under the stars.',
    heroCta: 'Get Tickets',
    heroCta2: 'Meet the Chefs',
    events: [
      { title: 'SEAR Main Event — Day 1', date: 'Jul 18', time: '4:00 PM', price: '$150', spots: '220 tickets left', tag: 'HEADLINER' },
      { title: 'SEAR Main Event — Day 2', date: 'Jul 19', time: '4:00 PM', price: '$150', spots: '185 tickets left' },
      { title: 'VIP Chef\'s Table', date: 'Jul 18', time: '6:00 PM', price: '$350', spots: '12 spots left', tag: 'VIP' },
      { title: 'Pitmaster Workshop', date: 'Jul 19', time: '11:00 AM', price: '$75', spots: '30 spots left' },
    ],
    shopItems: [
      { name: 'SEAR Festival Tee', price: '$35' },
      { name: 'Pitmaster Apron', price: '$45' },
      { name: 'SEAR Snapback Hat', price: '$30' },
      { name: 'Hot Sauce 3-Pack', price: '$28' },
      { name: 'SEAR Pint Glass Set', price: '$22' },
      { name: 'Fire Starter Kit', price: '$55' },
    ],
  },
  dashboard: {
    greeting: 'SEAR Festival — Command Center',
    kpis: [
      { label: 'Tickets Sold', value: '1,240', change: '+180 this week', up: true },
      { label: 'Revenue', value: '$186K', change: '+$28K', up: true },
      { label: 'Merch Sales', value: '$8,400', change: '+32%', up: true },
      { label: 'VIP Remaining', value: '12', change: 'Selling fast', up: false },
    ],
    aiSummary: 'Ticket sales are ahead of projections by 15%. VIP tables are 85% sold — consider closing VIP sales early or adding 2 more tables. Merch pre-orders spiked after the chef lineup announcement. Email blast to waitlist recommended.',
    recentOrders: [
      { id: '#SEAR-892', customer: 'Alex T.', items: 'Day 1 + Day 2 Combo', total: '$280', status: 'Confirmed' },
      { id: '#SEAR-891', customer: 'Jordan P.', items: 'VIP Chef\'s Table (2)', total: '$700', status: 'Confirmed' },
      { id: '#SEAR-890', customer: 'Sam R.', items: 'Day 1 + Merch Bundle', total: '$195', status: 'Processing' },
      { id: '#SEAR-889', customer: 'Online', items: 'Pitmaster Workshop (4)', total: '$300', status: 'Confirmed' },
    ],
    inventoryAlerts: [
      { item: 'Festival Tee (L)', stock: 8, status: 'Low Stock' },
      { item: 'Hot Sauce 3-Pack', stock: 3, status: 'Low Stock' },
      { item: 'Pitmaster Apron', stock: 0, status: 'Out of Stock' },
    ],
  },
  portal: {
    welcome: 'Welcome back, Alex',
    memberSince: 'Ticket holder · July 18-19, 2026',
    tier: 'Weekend Pass',
    points: null,
    nextReward: null,
    benefits: ['Entry both days (Jul 18-19)', 'Access to all chef stations', 'Live music areas', 'Craft cocktail bars', 'SEAR welcome kit at check-in'],
    history: [
      { date: 'Mar 12', event: 'Purchased Day 1 + Day 2 Combo', type: 'Tickets · $280' },
      { date: 'Mar 12', event: 'Added Pitmaster Apron to order', type: 'Merch · $45' },
      { date: 'Mar 5', event: 'Joined waitlist for VIP upgrade', type: 'Waitlist' },
    ],
  },
}

const createandsourceData = {
  availableFeatures: ['products','kpis','inventory','orders','reports','email','orderHistory'],
  defaultEnabled: { products:true, kpis:true, inventory:true, orders:true, reports:true, email:true, orderHistory:true },
  storefront: {
    heroTag: 'CREATE & SOURCE',
    heroTitle: 'Your Merch.\nSourced.',
    heroSub: 'Custom merchandise sourcing for brands and businesses. Submit your product ideas, get quotes from vetted suppliers, and track every order from concept to delivery.',
    heroCta: 'Start a Project',
    heroCta2: 'See How It Works',
    products: [
      { name: 'Custom Logo Tees (500)', price: '$4,250', category: 'Apparel', tag: 'POPULAR' },
      { name: 'Embroidered Caps (250)', price: '$2,100', category: 'Headwear' },
      { name: 'Kraft Tote Bags (1000)', price: '$3,800', category: 'Bags' },
      { name: 'Enamel Pin Sets (500)', price: '$1,450', category: 'Accessories' },
      { name: 'Sticker Packs (2000)', price: '$1,200', category: 'Print' },
      { name: 'Canvas Posters (100)', price: '$890', category: 'Print' },
    ],
    categories: ['All', 'Apparel', 'Headwear', 'Bags', 'Accessories', 'Print'],
  },
  dashboard: {
    greeting: 'Good morning, Create & Source Ops',
    kpis: [
      { label: 'Active Orders', value: '12', change: '+3 this week', up: true },
      { label: 'Pending Quotes', value: '4', change: '2 due today', up: false },
      { label: 'On-Time Rate', value: '89%', change: '+4%', up: true },
      { label: 'Revenue (MTD)', value: '$34,200', change: '+22%', up: true },
    ],
    aiSummary: 'New quote request from Bloom Beauty for 500 tees — similar to last order, recommend same supplier. Shipment #4821 arrives Thursday. Two supplier invoices overdue for payment. On-time rate improved after switching to express for West Coast orders.',
    recentOrders: [
      { id: '#CS-5028', customer: 'Bloom Beauty', items: 'Custom Logo Tees x500', total: '$4,250', status: 'Quoting' },
      { id: '#CS-5027', customer: 'Desert Brew Co.', items: 'Kraft Tote Bags x1000', total: '$3,800', status: 'In Production' },
      { id: '#CS-5026', customer: 'SEAR Festival', items: 'Festival Tees x800, Aprons x200', total: '$7,400', status: 'Shipped' },
      { id: '#CS-5025', customer: 'Zen Yoga', items: 'Embroidered Caps x250', total: '$2,100', status: 'Delivered' },
    ],
    inventoryAlerts: [
      { item: 'Blank Gildan Tees (White, M)', stock: 120, status: 'Low Stock' },
      { item: 'Kraft Tote Blanks', stock: 0, status: 'Out of Stock' },
    ],
  },
  portal: {
    welcome: 'Welcome back, Bloom Beauty',
    memberSince: 'Client since September 2025',
    tier: 'Growth Plan',
    points: null,
    nextReward: null,
    benefits: ['Dedicated sourcing specialist', 'Priority quoting (24hr)', 'Volume pricing (10%+ off at 1000+ units)', 'Real-time order tracking', 'Quality guarantee on all products'],
    history: [
      { date: 'Mar 15', event: 'Submitted quote request — Custom Logo Tees x500', type: 'Quote · Pending' },
      { date: 'Mar 2', event: 'Sticker Packs x2000 delivered', type: 'Order · $1,200' },
      { date: 'Feb 18', event: 'Enamel Pin Sets x500 delivered', type: 'Order · $1,450' },
      { date: 'Feb 3', event: 'Embroidered Caps x250 delivered', type: 'Order · $2,100' },
    ],
  },
}

/* ══════════════════════════════════════════════════════
   COMBINED INDUSTRY EXPORT — theme config + section data
   ══════════════════════════════════════════════════════ */
export const industries = [
  { ...museumConfig, icon: '✦', ...museumData },
  { ...ecommerceConfig, icon: '▦', ...ecommerceData },
  { ...medflowConfig, icon: '◇', ...medflowData },
  { ...tacoboysConfig, icon: '🌮', ...tacoboysData },
  { ...media4youConfig, icon: '◎', ...media4youData },
  { ...searConfig, icon: '🔥', ...searData },
  { ...csConfig, icon: '◆', ...createandsourceData },
]

export function getIndustry(id) {
  return industries.find(i => i.id === id)
}

export function getFeatures(industryId) {
  const ind = getIndustry(industryId)
  if (!ind) return {}
  const result = {}
  ind.availableFeatures.forEach(key => {
    if (FEATURES[key]) result[key] = FEATURES[key]
  })
  return result
}
