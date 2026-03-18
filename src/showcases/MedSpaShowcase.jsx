import { useState, useRef, useEffect } from 'react';

// ============================================================================
// MEDSPA SHOWCASE — Fully standalone, zero external dependencies
// Mirrors the real medspa demo: sidebar, dashboard, patients, schedule,
// inventory, DM inbox, email marketing — all with hardcoded data & inline styles
// ============================================================================

// ── Theme constants (matches theme.jsx) ──
const FONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const MONO = "'JetBrains Mono', 'SF Mono', monospace";
const ACCENT = '#111111';
const ACCENT_LIGHT = '#F5F5F5';
const ACCENT_TEXT = '#FFFFFF';
const BG = '#F5F3F0';
const TEXT = '#111111';
const TEXT2 = '#555555';
const TEXT3 = '#999999';
const SUCCESS = '#16A34A';
const WARNING = '#D97706';
const DANGER = '#DC2626';

const glass = {
  background: 'rgba(255,255,255,0.6)',
  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.65)',
  borderRadius: 18,
  boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
};

const cardStyle = {
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.6)',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
};

const tableWrap = {
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.6)',
  borderRadius: 16, overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
};

const pillAccent = {
  padding: '9px 20px', borderRadius: 100, border: 'none', cursor: 'pointer',
  font: `500 13px ${FONT}`, transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
  background: ACCENT, color: ACCENT_TEXT, boxShadow: `0 2px 12px ${ACCENT}33`,
};

const pillGhost = {
  padding: '9px 20px', borderRadius: 100, cursor: 'pointer',
  font: `500 13px ${FONT}`, transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
  background: 'rgba(255,255,255,0.4)', color: '#555', border: '1px solid rgba(0,0,0,0.06)',
  backdropFilter: 'blur(8px)',
};

const pillOutline = {
  padding: '9px 20px', borderRadius: 100, cursor: 'pointer',
  font: `500 13px ${FONT}`, transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
  background: 'rgba(255,255,255,0.5)', color: ACCENT, border: `1.5px solid ${ACCENT}40`,
  backdropFilter: 'blur(8px)',
};

const pill = {
  padding: '9px 20px', borderRadius: 100, border: 'none', cursor: 'pointer',
  font: `500 13px ${FONT}`, transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
};

const inputStyle = {
  width: '100%', padding: '12px 16px',
  background: 'rgba(255,255,255,0.7)',
  border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12,
  font: `400 14px ${FONT}`, color: '#111', outline: 'none',
  transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)', boxSizing: 'border-box',
  backdropFilter: 'blur(8px)',
};

const labelStyle = {
  display: 'block', fontFamily: `${MONO}`,
  fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5,
  color: '#999', marginBottom: 8, fontWeight: 500,
};

const fmt = (cents) => `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}`;

// ── Avatar gradient ──
const AVATAR_PALETTES = [
  ['#FF6B6B', '#EE5A24'], ['#A29BFE', '#6C5CE7'], ['#55E6C1', '#1ABC9C'],
  ['#FDA7DF', '#D980FA'], ['#74B9FF', '#0984E3'], ['#FDCB6E', '#F39C12'],
  ['#E17055', '#D63031'], ['#00CEC9', '#00B894'], ['#B2BEC3', '#636E72'],
  ['#FAB1A0', '#E17055'], ['#81ECEC', '#00CEC9'], ['#DFE6E9', '#B2BEC3'],
];
function getAvatarGradient(name) {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const idx = Math.abs(hash) % AVATAR_PALETTES.length;
  const [c1, c2] = AVATAR_PALETTES[idx];
  return `linear-gradient(135deg, ${c1}, ${c2})`;
}

// ── Hardcoded data ──
const PROVIDERS = [
  { id: 'PRV-1', name: 'Dr. Sarah Mitchell', title: 'Medical Director' },
  { id: 'PRV-2', name: 'Jessica Park, NP', title: 'Nurse Practitioner' },
  { id: 'PRV-3', name: 'Emily Chen, RN', title: 'Aesthetic Nurse' },
  { id: 'PRV-4', name: 'Dr. Marcus Webb', title: 'Cosmetic Surgeon' },
];

const SERVICES = [
  { id: 'SVC-1', name: 'Botox', category: 'Injectables', duration: 30, price: 1400 },
  { id: 'SVC-2', name: 'Juvederm Filler', category: 'Injectables', duration: 45, price: 75000 },
  { id: 'SVC-3', name: 'Sculptra', category: 'Injectables', duration: 60, price: 95000 },
  { id: 'SVC-5', name: 'RF Microneedling', category: 'Skin', duration: 60, price: 80000 },
  { id: 'SVC-6', name: 'IPL Photofacial', category: 'Skin', duration: 45, price: 45000 },
  { id: 'SVC-7', name: 'Chemical Peel', category: 'Skin', duration: 30, price: 25000 },
  { id: 'SVC-8', name: 'Laser Hair Removal', category: 'Laser', duration: 30, price: 30000 },
  { id: 'SVC-9', name: 'HydraFacial', category: 'Skin', duration: 45, price: 22000 },
  { id: 'SVC-10', name: 'IV Therapy', category: 'Wellness', duration: 45, price: 20000 },
  { id: 'SVC-11', name: 'Medical Weight Loss', category: 'Body', duration: 30, price: 50000 },
  { id: 'SVC-13', name: 'CoolSculpting', category: 'Body', duration: 60, price: 150000 },
  { id: 'SVC-28', name: 'Morpheus8', category: 'Skin', duration: 60, price: 120000 },
];

const today = new Date().toISOString().slice(0, 10);
const d = (offset) => { const dt = new Date(); dt.setDate(dt.getDate() + offset); return dt.toISOString().slice(0, 10); };

const PATIENTS = [
  { id: 'PAT-1000', firstName: 'Emma', lastName: 'Johnson', email: 'emma.johnson@email.com', phone: '(480) 555-0100', membershipTier: 'Platinum', totalSpent: 1250000, visitCount: 18, lastVisit: d(-3), createdAt: d(-200) },
  { id: 'PAT-1001', firstName: 'Olivia', lastName: 'Williams', email: 'olivia.williams@email.com', phone: '(480) 555-0101', membershipTier: 'Gold', totalSpent: 870000, visitCount: 12, lastVisit: d(-7), createdAt: d(-150) },
  { id: 'PAT-1002', firstName: 'Sophia', lastName: 'Brown', email: 'sophia.brown@email.com', phone: '(480) 555-0102', membershipTier: 'Silver', totalSpent: 450000, visitCount: 8, lastVisit: d(-14), createdAt: d(-120) },
  { id: 'PAT-1003', firstName: 'Ava', lastName: 'Jones', email: 'ava.jones@email.com', phone: '(480) 555-0103', membershipTier: 'Gold', totalSpent: 680000, visitCount: 15, lastVisit: d(-2), createdAt: d(-180) },
  { id: 'PAT-1004', firstName: 'Isabella', lastName: 'Martinez', email: 'isabella.martinez@email.com', phone: '(480) 555-0104', membershipTier: 'None', totalSpent: 320000, visitCount: 5, lastVisit: d(-21), createdAt: d(-90) },
  { id: 'PAT-1005', firstName: 'Mia', lastName: 'Garcia', email: 'mia.garcia@email.com', phone: '(480) 555-0105', membershipTier: 'None', totalSpent: 150000, visitCount: 3, lastVisit: d(-45), createdAt: d(-60) },
  { id: 'PAT-1006', firstName: 'Charlotte', lastName: 'Davis', email: 'charlotte.davis@email.com', phone: '(480) 555-0106', membershipTier: 'Silver', totalSpent: 520000, visitCount: 10, lastVisit: d(-5), createdAt: d(-220) },
  { id: 'PAT-1007', firstName: 'Amelia', lastName: 'Thompson', email: 'amelia.thompson@email.com', phone: '(480) 555-0107', membershipTier: 'Platinum', totalSpent: 1800000, visitCount: 22, lastVisit: d(-1), createdAt: d(-365) },
  { id: 'PAT-1008', firstName: 'Evelyn', lastName: 'White', email: 'evelyn.white@email.com', phone: '(480) 555-0108', membershipTier: 'Gold', totalSpent: 960000, visitCount: 14, lastVisit: d(-10), createdAt: d(-280) },
  { id: 'PAT-1009', firstName: 'Harper', lastName: 'Lopez', email: 'harper.lopez@email.com', phone: '(480) 555-0109', membershipTier: 'None', totalSpent: 75000, visitCount: 2, lastVisit: d(-60), createdAt: d(-30) },
  { id: 'PAT-1010', firstName: 'Lily', lastName: 'Lee', email: 'lily.lee@email.com', phone: '(480) 555-0110', membershipTier: 'Silver', totalSpent: 380000, visitCount: 7, lastVisit: d(-8), createdAt: d(-160) },
  { id: 'PAT-1011', firstName: 'Abigail', lastName: 'Gonzalez', email: 'abigail.gonzalez@email.com', phone: '(480) 555-0111', membershipTier: 'None', totalSpent: 220000, visitCount: 4, lastVisit: d(-30), createdAt: d(-100) },
  { id: 'PAT-1012', firstName: 'Aubrey', lastName: 'Robinson', email: 'aubrey.robinson@email.com', phone: '(480) 555-0112', membershipTier: 'Gold', totalSpent: 720000, visitCount: 11, lastVisit: d(-4), createdAt: d(-240) },
  { id: 'PAT-1013', firstName: 'Ella', lastName: 'Clark', email: 'ella.clark@email.com', phone: '(480) 555-0113', membershipTier: 'None', totalSpent: 95000, visitCount: 2, lastVisit: d(-90), createdAt: d(-95) },
  { id: 'PAT-1014', firstName: 'Scarlett', lastName: 'Lewis', email: 'scarlett.lewis@email.com', phone: '(480) 555-0114', membershipTier: 'Platinum', totalSpent: 2100000, visitCount: 25, lastVisit: d(-2), createdAt: d(-400) },
];

const APPOINTMENTS = [
  { id: 'APT-2000', patientName: 'Emma Johnson', serviceId: 'SVC-1', providerId: 'PRV-1', date: today, time: '09:00', status: 'confirmed' },
  { id: 'APT-2001', patientName: 'Olivia Williams', serviceId: 'SVC-9', providerId: 'PRV-2', date: today, time: '09:30', status: 'confirmed' },
  { id: 'APT-2002', patientName: 'Ava Jones', serviceId: 'SVC-5', providerId: 'PRV-3', date: today, time: '10:00', status: 'pending' },
  { id: 'APT-2003', patientName: 'Charlotte Davis', serviceId: 'SVC-2', providerId: 'PRV-1', date: today, time: '10:30', status: 'confirmed' },
  { id: 'APT-2004', patientName: 'Amelia Thompson', serviceId: 'SVC-11', providerId: 'PRV-4', date: today, time: '11:00', status: 'completed' },
  { id: 'APT-2005', patientName: 'Evelyn White', serviceId: 'SVC-6', providerId: 'PRV-2', date: today, time: '11:30', status: 'confirmed' },
  { id: 'APT-2006', patientName: 'Lily Lee', serviceId: 'SVC-7', providerId: 'PRV-3', date: today, time: '13:00', status: 'pending' },
  { id: 'APT-2007', patientName: 'Aubrey Robinson', serviceId: 'SVC-8', providerId: 'PRV-2', date: today, time: '14:00', status: 'confirmed' },
  // Tomorrow
  { id: 'APT-2008', patientName: 'Sophia Brown', serviceId: 'SVC-28', providerId: 'PRV-3', date: d(1), time: '09:00', status: 'confirmed' },
  { id: 'APT-2009', patientName: 'Isabella Martinez', serviceId: 'SVC-3', providerId: 'PRV-1', date: d(1), time: '10:00', status: 'pending' },
  { id: 'APT-2010', patientName: 'Mia Garcia', serviceId: 'SVC-10', providerId: 'PRV-4', date: d(1), time: '11:00', status: 'confirmed' },
  { id: 'APT-2011', patientName: 'Harper Lopez', serviceId: 'SVC-9', providerId: 'PRV-2', date: d(1), time: '14:00', status: 'confirmed' },
  // Day after
  { id: 'APT-2012', patientName: 'Emma Johnson', serviceId: 'SVC-5', providerId: 'PRV-3', date: d(2), time: '09:30', status: 'confirmed' },
  { id: 'APT-2013', patientName: 'Scarlett Lewis', serviceId: 'SVC-2', providerId: 'PRV-1', date: d(2), time: '10:30', status: 'pending' },
  { id: 'APT-2014', patientName: 'Abigail Gonzalez', serviceId: 'SVC-13', providerId: 'PRV-4', date: d(2), time: '13:00', status: 'confirmed' },
  // Past completed
  { id: 'APT-2015', patientName: 'Olivia Williams', serviceId: 'SVC-1', providerId: 'PRV-1', date: d(-1), time: '09:00', status: 'completed' },
  { id: 'APT-2016', patientName: 'Ava Jones', serviceId: 'SVC-9', providerId: 'PRV-2', date: d(-1), time: '10:00', status: 'completed' },
  { id: 'APT-2017', patientName: 'Amelia Thompson', serviceId: 'SVC-6', providerId: 'PRV-3', date: d(-2), time: '11:00', status: 'completed' },
  { id: 'APT-2018', patientName: 'Emma Johnson', serviceId: 'SVC-2', providerId: 'PRV-1', date: d(-3), time: '14:00', status: 'completed' },
  { id: 'APT-2019', patientName: 'Charlotte Davis', serviceId: 'SVC-7', providerId: 'PRV-2', date: d(-4), time: '09:30', status: 'completed' },
  { id: 'APT-2020', patientName: 'Lily Lee', serviceId: 'SVC-8', providerId: 'PRV-3', date: d(-5), time: '10:00', status: 'completed' },
  { id: 'APT-2021', patientName: 'Scarlett Lewis', serviceId: 'SVC-28', providerId: 'PRV-1', date: d(-6), time: '13:00', status: 'completed' },
];

const INVENTORY = [
  { id: 'INV-1', name: 'Botox (100u vial)', category: 'Injectables', sku: 'BTX-100', quantity: 24, reorderAt: 10, unitCost: 42000, location: 'Main', expirationDate: d(180) },
  { id: 'INV-2', name: 'Juvederm Ultra XC', category: 'Injectables', sku: 'JUV-UXC', quantity: 18, reorderAt: 8, unitCost: 28000, location: 'Main', expirationDate: d(365) },
  { id: 'INV-3', name: 'Juvederm Voluma XC', category: 'Injectables', sku: 'JUV-VXC', quantity: 12, reorderAt: 6, unitCost: 32000, location: 'Main', expirationDate: d(300) },
  { id: 'INV-4', name: 'Sculptra (2 vial kit)', category: 'Injectables', sku: 'SLP-2V', quantity: 8, reorderAt: 4, unitCost: 45000, location: 'Main', expirationDate: d(540) },
  { id: 'INV-5', name: 'PDO Threads - Smooth', category: 'Injectables', sku: 'PDO-SM20', quantity: 3, reorderAt: 3, unitCost: 18000, location: 'Main', expirationDate: d(365) },
  { id: 'INV-6', name: 'PDO Threads - Cog', category: 'Injectables', sku: 'PDO-CG10', quantity: 1, reorderAt: 2, unitCost: 35000, location: 'Main', expirationDate: d(365) },
  { id: 'INV-7', name: 'Semaglutide 2.4mg', category: 'Wellness', sku: 'SEM-24', quantity: 30, reorderAt: 10, unitCost: 25000, location: 'Main', expirationDate: d(90) },
  { id: 'INV-8', name: 'Tirzepatide 5mg', category: 'Wellness', sku: 'TRZ-5', quantity: 20, reorderAt: 8, unitCost: 30000, location: 'Main', expirationDate: d(90) },
  { id: 'INV-9', name: 'Lidocaine 2% (50ml)', category: 'Supplies', sku: 'LID-50', quantity: 40, reorderAt: 15, unitCost: 1500, location: 'Main', expirationDate: d(365) },
  { id: 'INV-10', name: 'SkinMedica TNS Serum', category: 'Retail', sku: 'SM-TNS', quantity: 15, reorderAt: 5, unitCost: 13000, location: 'Main', expirationDate: d(730) },
  { id: 'INV-11', name: 'EltaMD UV Clear SPF 46', category: 'Retail', sku: 'EM-UVC', quantity: 25, reorderAt: 10, unitCost: 2400, location: 'Main', expirationDate: d(730) },
  { id: 'INV-12', name: 'Latisse 5ml', category: 'Retail', sku: 'LAT-5', quantity: 12, reorderAt: 5, unitCost: 9000, location: 'Main', expirationDate: d(365) },
  { id: 'INV-13', name: 'Microneedling Tips (10pk)', category: 'Supplies', sku: 'MN-T10', quantity: 8, reorderAt: 4, unitCost: 12000, location: 'Main', expirationDate: d(730) },
  { id: 'INV-14', name: 'Botox (100u vial)', category: 'Injectables', sku: 'BTX-100-F', quantity: 16, reorderAt: 8, unitCost: 42000, location: 'Flagship', expirationDate: d(180) },
  { id: 'INV-15', name: 'Juvederm Ultra XC', category: 'Injectables', sku: 'JUV-UXC-F', quantity: 10, reorderAt: 5, unitCost: 28000, location: 'Flagship', expirationDate: d(365) },
];

const RETENTION_ALERTS = [
  { id: 'RET-0', patientName: 'Mia Garcia', lastService: 'HydraFacial', daysSince: 45, priority: 'high', status: 'pending' },
  { id: 'RET-1', patientName: 'Ella Clark', lastService: 'Botox', daysSince: 90, priority: 'high', status: 'pending' },
  { id: 'RET-2', patientName: 'Harper Lopez', lastService: 'IPL', daysSince: 60, priority: 'high', status: 'pending' },
];

const SENT_EMAILS = [
  { id: 'EM-1', subject: 'March Newsletter -- New Spring Treatments', audience: 'All Patients', recipientCount: 30, sentDate: d(-3), openRate: 42, clickRate: 12 },
  { id: 'EM-2', subject: 'Exclusive: 20% Off Botox This Week Only', audience: 'Members', recipientCount: 12, sentDate: d(-7), openRate: 58, clickRate: 18 },
  { id: 'EM-3', subject: 'Your Appointment is Tomorrow!', audience: 'Recent Visitors', recipientCount: 8, sentDate: d(-1), openRate: 72, clickRate: 8 },
  { id: 'EM-4', subject: 'We Miss You -- Come Back & Save', audience: 'Lapsed Patients', recipientCount: 15, sentDate: d(-14), openRate: 35, clickRate: 14 },
  { id: 'EM-5', subject: 'Welcome to the Family!', audience: 'Members', recipientCount: 3, sentDate: d(-21), openRate: 88, clickRate: 22 },
];

// ── DM Inbox data ──
const DM_CONVERSATIONS = [
  { id: 'dm-1', platform: 'instagram', name: 'Jessica M.', avatar: 'JM', lastMessage: 'Hi! How much is Botox? Do you have any specials this month?', time: '2m ago', unread: true, messages: [
    { from: 'them', text: 'Hi! How much is Botox? Do you have any specials this month?', time: '2m ago' },
  ]},
  { id: 'dm-2', platform: 'instagram', name: 'Ashley K.', avatar: 'AK', lastMessage: 'Loved my HydraFacial! Can I book another one for next Friday?', time: '18m ago', unread: true, messages: [
    { from: 'them', text: 'Loved my HydraFacial! Can I book another one for next Friday?', time: '18m ago' },
  ]},
  { id: 'dm-3', platform: 'facebook', name: 'Maria S.', avatar: 'MS', lastMessage: 'Do you offer payment plans for lip filler?', time: '1h ago', unread: false, messages: [
    { from: 'them', text: 'Do you offer payment plans for lip filler?', time: '1h ago' },
    { from: 'us', text: 'Hi Maria! Yes, we offer Cherry and PatientFi financing. Would you like to book a free consultation?', time: '45m ago' },
    { from: 'them', text: 'That would be great! What times are available?', time: '30m ago' },
  ]},
  { id: 'dm-4', platform: 'instagram', name: 'Taylor R.', avatar: 'TR', lastMessage: 'Sent you a before/after request -- is that ok to post?', time: '3h ago', unread: false, messages: [
    { from: 'them', text: 'Sent you a before/after request -- is that ok to post?', time: '3h ago' },
    { from: 'us', text: 'Yes! We would love to share your results. We will tag you!', time: '2h ago' },
  ]},
  { id: 'dm-5', platform: 'facebook', name: 'Nicole B.', avatar: 'NB', lastMessage: 'What is the downtime for Morpheus8?', time: '5h ago', unread: false, messages: [
    { from: 'them', text: 'What is the downtime for Morpheus8?', time: '5h ago' },
  ]},
  { id: 'dm-6', platform: 'instagram', name: 'Rachel P.', avatar: 'RP', lastMessage: 'Can my husband come in for a consultation too?', time: 'Yesterday', unread: false, messages: [
    { from: 'them', text: 'Can my husband come in for a consultation too?', time: 'Yesterday' },
    { from: 'us', text: 'Absolutely! We treat men and women. He can book a free virtual consultation anytime.', time: 'Yesterday' },
  ]},
];

// ── Sidebar Icons (inline SVGs) ──
const ICONS = {
  grid: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  calendar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  clipboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
  package: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12.89 1.45l8 4A2 2 0 0122 7.24v9.53a2 2 0 01-1.11 1.79l-8 4a2 2 0 01-1.79 0l-8-4A2 2 0 012 16.76V7.24a2 2 0 011.11-1.79l8-4a2 2 0 011.78 0z"/><polyline points="2.32 6.16 12 11 21.68 6.16"/><line x1="12" y1="22.76" x2="12" y2="11"/></svg>,
  heart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,7 12,13 2,7"/></svg>,
  message: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  share: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  'bar-chart': <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
};

// ── Sidebar nav structure ──
const NAV_SECTIONS = [
  { section: 'Overview', items: [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { id: 'checkin', label: 'Check-In', icon: 'clipboard' },
  ]},
  { section: 'Patients', items: [
    { id: 'patients', label: 'Patients', icon: 'users' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar' },
    { id: 'treatments', label: 'Treatment Plans', icon: 'clipboard' },
    { id: 'charts', label: 'Clinical Charts', icon: 'clipboard' },
    { id: 'photos', label: 'Before & After', icon: 'heart' },
    { id: 'waivers', label: 'Consent & Waivers', icon: 'clipboard' },
    { id: 'aftercare', label: 'Aftercare', icon: 'heart' },
  ]},
  { section: 'Billing', items: [
    { id: 'memberships', label: 'Memberships', icon: 'users' },
    { id: 'wallet', label: 'Patient Wallet', icon: 'package' },
    { id: 'referrals', label: 'Referrals', icon: 'share' },
  ]},
  { section: 'Operations', items: [
    { id: 'inventory', label: 'Inventory', icon: 'package' },
    { id: 'retention', label: 'Retention', icon: 'heart' },
    { id: 'waitlist', label: 'Waitlist', icon: 'calendar' },
    { id: 'reviews', label: 'Reviews', icon: 'heart' },
  ]},
  { section: 'Marketing', items: [
    { id: 'inbox', label: 'DM Inbox', icon: 'message' },
    { id: 'email', label: 'Email', icon: 'mail' },
    { id: 'texts', label: 'Text Messages', icon: 'message' },
    { id: 'social', label: 'Social Media', icon: 'share' },
  ]},
  { section: 'Reporting', items: [
    { id: 'reports', label: 'Reports', icon: 'bar-chart' },
  ]},
];

// Pages that have full content
const BUILT_PAGES = ['dashboard', 'patients', 'schedule', 'inventory', 'inbox', 'email'];

// ── KPI icon components ──
function CalendarIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
}
function DollarIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
}
function UsersIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
function BellIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
}
function BoxIcon({ color }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>;
}

// ── Sparkline ──
function MiniSparkline({ data }) {
  const points = data || [42, 58, 35, 72, 65, 88, 76];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 180, h = 52, padY = 6;
  const coords = points.map((v, i) => ({
    x: (i / (points.length - 1)) * w,
    y: padY + ((max - v) / range) * (h - padY * 2),
  }));
  const pathD = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x},${c.y}`).join(' ');
  const areaD = `${pathD} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="scSparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.15" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#scSparkGrad)" />
      <path d={pathD} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={i === coords.length - 1 ? 3.5 : 2.5}
          fill={i === coords.length - 1 ? ACCENT : '#fff'} stroke={ACCENT} strokeWidth="1.5" />
      ))}
    </svg>
  );
}

// ============================================================================
// PAGE COMPONENTS
// ============================================================================

function DashboardPage() {
  const todayAppts = APPOINTMENTS.filter(a => a.date === today);
  const confirmedToday = todayAppts.filter(a => a.status === 'confirmed').length;
  const pendingToday = todayAppts.filter(a => a.status === 'pending').length;
  const completedAppts = APPOINTMENTS.filter(a => a.status === 'completed');
  const monthRevenue = completedAppts.reduce((sum, a) => {
    const svc = SERVICES.find(sv => sv.id === a.serviceId);
    return sum + (svc?.price || 0);
  }, 0);
  const lowStock = INVENTORY.filter(i => i.quantity <= i.reorderAt);
  const upcoming = APPOINTMENTS.filter(a => a.date >= today && a.status !== 'completed')
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)).slice(0, 8);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const kpiIcons = [<CalendarIcon />, <DollarIcon />, <UsersIcon />, <BellIcon />];
  const kpis = [
    { label: "Today's Appointments", value: todayAppts.length, sub: `${confirmedToday} confirmed, ${pendingToday} pending` },
    { label: 'Monthly Revenue', value: fmt(monthRevenue), sub: `${completedAppts.length} completed treatments` },
    { label: 'Active Patients', value: PATIENTS.length, sub: `3 new this month` },
    { label: 'Retention Alerts', value: RETENTION_ALERTS.length, sub: `${RETENTION_ALERTS.filter(a => a.priority === 'high').length} high priority` },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ ...glass, padding: '28px 32px', marginBottom: 28, background: `linear-gradient(135deg, rgba(255,255,255,0.75) 0%, ${ACCENT_LIGHT} 100%)`, borderLeft: `3px solid ${ACCENT}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ font: `600 26px ${FONT}`, color: TEXT, marginBottom: 4, letterSpacing: '-0.3px' }}>{greeting}, team</h1>
            <p style={{ font: `400 13px ${FONT}`, color: TEXT2, margin: 0 }}>{dateStr}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ font: `500 10px ${MONO}`, textTransform: 'uppercase', letterSpacing: 1.5, color: TEXT3, marginBottom: 2 }}>Today's Revenue</div>
            <div style={{ font: `600 20px ${FONT}`, color: ACCENT }}>{fmt(todayAppts.filter(a => a.status === 'completed').reduce((sum, a) => { const svc = SERVICES.find(sv => sv.id === a.serviceId); return sum + (svc?.price || 0); }, 0))}</div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
        {kpis.map((k, idx) => (
          <div key={k.label} style={{ ...glass, padding: '24px 22px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: ACCENT_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{kpiIcons[idx]}</div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEXT3} strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
            <div style={{ font: `500 10px ${MONO}`, textTransform: 'uppercase', letterSpacing: 1.5, color: TEXT3, marginBottom: 8 }}>{k.label}</div>
            <div style={{ font: `600 32px ${FONT}`, color: TEXT, marginBottom: 6, letterSpacing: '-0.5px' }}>{k.value}</div>
            <div style={{ font: `400 13px ${FONT}`, color: TEXT2 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 20 }}>
        {/* Upcoming Appointments */}
        <div style={{ ...glass, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ font: `600 15px ${FONT}`, color: TEXT }}>Upcoming Appointments</span>
            <span style={{ ...pillGhost, padding: '5px 14px', fontSize: 11 }}>View All</span>
          </div>
          <div>
            {upcoming.map((a) => {
              const svc = SERVICES.find(sv => sv.id === a.serviceId);
              const prov = PROVIDERS.find(p => p.id === a.providerId);
              const isToday = a.date === today;
              const statusColor = a.status === 'confirmed' ? SUCCESS : a.status === 'pending' ? WARNING : TEXT3;
              return (
                <div key={a.id} style={{
                  margin: '6px 10px', padding: '14px 16px', borderRadius: 14,
                  background: isToday ? ACCENT_LIGHT : 'rgba(255,255,255,0.4)',
                  border: isToday ? `1px solid ${ACCENT}20` : '1px solid rgba(0,0,0,0.02)',
                  display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: isToday ? ACCENT : 'rgba(255,255,255,0.8)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    boxShadow: isToday ? `0 4px 12px ${ACCENT}30` : '0 2px 8px rgba(0,0,0,0.04)',
                  }}>
                    <div style={{ font: `600 14px ${FONT}`, color: isToday ? ACCENT_TEXT : TEXT, lineHeight: 1 }}>
                      {new Date(a.date + 'T12:00:00').getDate()}
                    </div>
                    <div style={{ font: `500 9px ${MONO}`, color: isToday ? `${ACCENT_TEXT}BB` : TEXT3, textTransform: 'uppercase' }}>
                      {new Date(a.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ font: `500 14px ${FONT}`, color: TEXT }}>{a.patientName}</div>
                    <div style={{ font: `400 12px ${FONT}`, color: TEXT2 }}>{svc?.name || 'Service'} -- {prov?.name || 'Provider'}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ font: `500 12px ${MONO}`, color: TEXT, marginBottom: 2 }}>{a.time}</div>
                    <span style={{
                      display: 'inline-block', padding: '2px 8px', borderRadius: 100,
                      font: `500 9px ${FONT}`, textTransform: 'uppercase', letterSpacing: 0.5,
                      background: a.status === 'confirmed' ? '#F0FDF4' : a.status === 'pending' ? '#FFFBEB' : 'rgba(0,0,0,0.04)',
                      color: statusColor,
                    }}>{a.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Revenue Sparkline */}
          <div style={{ ...glass, padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <div style={{ font: `500 10px ${MONO}`, textTransform: 'uppercase', letterSpacing: 1.5, color: TEXT3, marginBottom: 4 }}>7-Day Revenue Trend</div>
                <div style={{ font: `600 22px ${FONT}`, color: TEXT, letterSpacing: '-0.3px' }}>{fmt(monthRevenue)}</div>
              </div>
              <div style={{ padding: '4px 10px', borderRadius: 100, background: '#F0FDF4', font: `500 11px ${FONT}`, color: SUCCESS }}>+12%</div>
            </div>
            <MiniSparkline />
          </div>

          {/* Low Stock */}
          <div style={{ ...glass, overflow: 'hidden' }}>
            <div style={{ padding: '16px 22px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BoxIcon color={lowStock.length > 0 ? WARNING : TEXT3} />
                <span style={{ font: `600 14px ${FONT}`, color: TEXT }}>Low Stock</span>
                {lowStock.length > 0 && (
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: WARNING, color: '#fff', font: `600 10px ${FONT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{lowStock.length}</span>
                )}
              </div>
              <span style={{ ...pillGhost, padding: '5px 12px', fontSize: 11 }}>Inventory</span>
            </div>
            {lowStock.slice(0, 4).map((item) => (
              <div key={item.id} style={{ padding: '12px 22px', borderBottom: '1px solid rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ font: `500 13px ${FONT}`, color: TEXT }}>{item.name}</div>
                  <div style={{ font: `400 11px ${FONT}`, color: TEXT3 }}>{item.category}</div>
                </div>
                <span style={{
                  padding: '3px 10px', borderRadius: 100, font: `600 11px ${MONO}`,
                  background: item.quantity <= item.reorderAt / 2 ? '#FEF2F2' : '#FFFBEB',
                  color: item.quantity <= item.reorderAt / 2 ? DANGER : WARNING,
                }}>{item.quantity} left</span>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{ ...glass, padding: '20px 22px' }}>
            <div style={{ font: `600 14px ${FONT}`, color: TEXT, marginBottom: 14 }}>Quick Actions</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'New Patient', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg> },
                { label: 'Book Appointment', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
                { label: 'Send Email', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
                { label: 'Text Blast', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
              ].map(a => (
                <div key={a.label} style={{
                  padding: '14px 16px', background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: 12, cursor: 'pointer', textAlign: 'left', font: `500 13px ${FONT}`, color: TEXT,
                  display: 'flex', alignItems: 'center', gap: 10, backdropFilter: 'blur(8px)',
                }}>
                  <span style={{ opacity: 0.6 }}>{a.icon}</span>{a.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = PATIENTS.filter(p => {
    const q = search.toLowerCase();
    const nameMatch = !q || `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) || p.email?.toLowerCase().includes(q);
    if (!nameMatch) return false;
    if (filter === 'members') return p.membershipTier && p.membershipTier !== 'None';
    if (filter === 'platinum') return p.membershipTier === 'Platinum';
    if (filter === 'gold') return p.membershipTier === 'Gold';
    if (filter === 'silver') return p.membershipTier === 'Silver';
    return true;
  });

  const totalRevenue = PATIENTS.reduce((sum, p) => sum + (p.totalSpent || 0), 0);
  const memberCount = PATIENTS.filter(p => p.membershipTier && p.membershipTier !== 'None').length;

  const tierColor = (tier) => {
    if (tier === 'Platinum') return { bg: '#F3F0FF', color: '#7C3AED' };
    if (tier === 'Gold') return { bg: '#FEF9E7', color: '#B8960C' };
    if (tier === 'Silver') return { bg: '#F1F5F9', color: '#64748B' };
    return { bg: 'transparent', color: 'transparent' };
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ font: `600 26px ${FONT}`, color: TEXT, marginBottom: 4 }}>Patients</h1>
          <p style={{ font: `400 14px ${FONT}`, color: TEXT2, margin: 0 }}>Full client directory -- search, filter, and manage patient profiles</p>
        </div>
        <div style={{ ...pillAccent, padding: '10px 20px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          New Patient
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Patients', value: PATIENTS.length },
          { label: 'Active Members', value: memberCount },
          { label: 'New This Month', value: 3 },
          { label: 'Visited (30 Days)', value: 9 },
          { label: 'Lifetime Revenue', value: fmt(totalRevenue) },
        ].map(k => (
          <div key={k.label} style={{ ...cardStyle, padding: '16px 20px' }}>
            <div style={{ font: `400 10px ${MONO}`, textTransform: 'uppercase', letterSpacing: 1, color: TEXT3, marginBottom: 6 }}>{k.label}</div>
            <div style={{ font: `600 24px ${FONT}`, color: TEXT }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, or phone..." style={{ ...inputStyle, maxWidth: 300 }} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[['all', 'All'], ['members', 'Members'], ['platinum', 'Platinum'], ['gold', 'Gold'], ['silver', 'Silver']].map(([id, label]) => (
            <button key={id} onClick={() => setFilter(id)} style={{
              ...pill, padding: '7px 14px', fontSize: 12,
              background: filter === id ? ACCENT : 'transparent',
              color: filter === id ? ACCENT_TEXT : TEXT2,
              border: filter === id ? `1px solid ${ACCENT}` : '1px solid #E5E5E5',
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={tableWrap}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              {['Patient', 'Contact', 'Membership', 'Visits', 'Last Visit', 'Total Spent'].map(h => (
                <th key={h} style={{ padding: '14px 18px', textAlign: 'left', font: `500 10px ${MONO}`, textTransform: 'uppercase', letterSpacing: 1.5, color: TEXT3 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const tc = tierColor(p.membershipTier);
              return (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)', cursor: 'pointer' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, background: getAvatarGradient(`${p.firstName} ${p.lastName}`), display: 'flex', alignItems: 'center', justifyContent: 'center', font: `500 13px ${FONT}`, color: '#fff' }}>
                        {p.firstName?.[0]}{p.lastName?.[0]}
                      </div>
                      <div>
                        <div style={{ font: `500 14px ${FONT}`, color: TEXT }}>{p.firstName} {p.lastName}</div>
                        <div style={{ font: `400 11px ${FONT}`, color: TEXT3 }}>ID: {p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ font: `400 13px ${FONT}`, color: TEXT2 }}>{p.email}</div>
                    <div style={{ font: `400 12px ${FONT}`, color: TEXT3 }}>{p.phone}</div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    {p.membershipTier && p.membershipTier !== 'None' ? (
                      <span style={{ padding: '3px 10px', borderRadius: 100, font: `500 10px ${FONT}`, textTransform: 'uppercase', letterSpacing: 0.5, background: tc.bg, color: tc.color }}>{p.membershipTier}</span>
                    ) : <span style={{ font: `400 12px ${FONT}`, color: TEXT3 }}>--</span>}
                  </td>
                  <td style={{ padding: '14px 18px', font: `500 14px ${FONT}`, color: TEXT }}>{p.visitCount || 0}</td>
                  <td style={{ padding: '14px 18px', font: `400 13px ${FONT}`, color: TEXT2 }}>
                    {p.lastVisit ? new Date(p.lastVisit + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '--'}
                  </td>
                  <td style={{ padding: '14px 18px', font: `500 14px ${MONO}`, color: TEXT }}>{fmt(p.totalSpent || 0)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SchedulePage() {
  const [view, setView] = useState('day');
  const [currentDate, setCurrentDate] = useState(today);

  const dayAppts = APPOINTMENTS.filter(a => a.date === currentDate).sort((a, b) => a.time.localeCompare(b.time));
  const hours = Array.from({ length: 12 }, (_, i) => i + 8);

  const navigate = (dir) => {
    const dt = new Date(currentDate + 'T12:00:00');
    dt.setDate(dt.getDate() + (view === 'week' ? dir * 7 : dir));
    setCurrentDate(dt.toISOString().slice(0, 10));
  };

  const weekStart = new Date(currentDate + 'T12:00:00');
  const dayOfWeek = weekStart.getDay();
  weekStart.setDate(weekStart.getDate() - dayOfWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const dd = new Date(weekStart);
    dd.setDate(dd.getDate() + i);
    return dd.toISOString().slice(0, 10);
  });

  const statusColor = (status) => {
    if (status === 'completed') return SUCCESS;
    if (status === 'confirmed') return ACCENT;
    if (status === 'pending') return WARNING;
    if (status === 'cancelled') return DANGER;
    return TEXT3;
  };

  const ApptBlock = ({ appt, compact }) => {
    const svc = SERVICES.find(sv => sv.id === appt.serviceId);
    const prov = PROVIDERS.find(p => p.id === appt.providerId);
    return (
      <div style={{
        padding: compact ? '6px 8px' : '10px 14px', borderRadius: 8, cursor: 'pointer',
        background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', borderLeft: `3px solid ${statusColor(appt.status)}`,
        marginBottom: 4,
      }}>
        <div style={{ font: `500 ${compact ? 11 : 13}px ${FONT}`, color: TEXT }}>{appt.patientName}</div>
        <div style={{ font: `400 ${compact ? 10 : 12}px ${FONT}`, color: TEXT2 }}>
          {appt.time} -- {svc?.name || 'Service'}{!compact && prov ? ` \u00B7 ${prov.name.split(',')[0]}` : ''}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ font: `600 26px ${FONT}`, color: TEXT, marginBottom: 4 }}>Schedule</h1>
          <p style={{ font: `400 14px ${FONT}`, color: TEXT2 }}>{dayAppts.length} appointments {view === 'day' ? 'today' : 'this week'}</p>
        </div>
        <div style={pillAccent}>+ Book Appointment</div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ ...pillGhost, padding: '6px 12px' }}>&larr;</button>
          <span style={{ font: `500 15px ${FONT}`, color: TEXT, minWidth: 180, textAlign: 'center' }}>
            {new Date(currentDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
          <button onClick={() => navigate(1)} style={{ ...pillGhost, padding: '6px 12px' }}>&rarr;</button>
          <button onClick={() => setCurrentDate(today)} style={{ ...pillGhost, padding: '6px 12px', fontSize: 11 }}>Today</button>
        </div>
        <div style={{ display: 'flex', gap: 0, background: 'rgba(0,0,0,0.04)', borderRadius: 8, overflow: 'hidden' }}>
          {['day', 'week', 'list'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '7px 16px', background: view === v ? '#fff' : 'transparent', border: 'none',
              font: `500 12px ${FONT}`, color: view === v ? TEXT : TEXT3, cursor: 'pointer',
              borderRadius: view === v ? 8 : 0, textTransform: 'capitalize',
            }}>{v}</button>
          ))}
        </div>
      </div>

      {/* Day View */}
      {view === 'day' && (
        <div style={tableWrap}>
          {hours.map(h => {
            const hourAppts = dayAppts.filter(a => parseInt(a.time.split(':')[0]) === h);
            return (
              <div key={h} style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.03)', minHeight: 72 }}>
                <div style={{ width: 80, padding: '12px 16px', font: `400 12px ${MONO}`, color: TEXT3, borderRight: '1px solid rgba(0,0,0,0.03)', flexShrink: 0 }}>
                  {h > 12 ? h - 12 : h}:00 {h >= 12 ? 'PM' : 'AM'}
                </div>
                <div style={{ flex: 1, padding: '8px 12px' }}>
                  {hourAppts.map(a => <ApptBlock key={a.id} appt={a} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Week View */}
      {view === 'week' && (
        <div style={{ ...tableWrap, overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', minWidth: 800 }}>
            {weekDays.map(day => {
              const isToday2 = day === today;
              const dayA = APPOINTMENTS.filter(a => a.date === day).sort((a, b) => a.time.localeCompare(b.time));
              return (
                <div key={day} style={{ borderRight: '1px solid rgba(0,0,0,0.04)', minHeight: 300 }}>
                  <div style={{ padding: '12px 10px', borderBottom: '1px solid rgba(0,0,0,0.04)', textAlign: 'center', background: isToday2 ? ACCENT_LIGHT : 'transparent' }}>
                    <div style={{ font: `400 10px ${MONO}`, color: TEXT3, textTransform: 'uppercase' }}>
                      {new Date(day + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div style={{ font: `600 18px ${FONT}`, color: isToday2 ? ACCENT : TEXT }}>
                      {new Date(day + 'T12:00:00').getDate()}
                    </div>
                  </div>
                  <div style={{ padding: 6 }}>
                    {dayA.map(a => <ApptBlock key={a.id} appt={a} compact />)}
                    {dayA.length === 0 && <div style={{ padding: 12, textAlign: 'center', font: `400 11px ${FONT}`, color: TEXT3 }}>+</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div style={tableWrap}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E5E5E5' }}>
                {['Time', 'Patient', 'Service', 'Provider', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', font: `500 11px ${MONO}`, textTransform: 'uppercase', letterSpacing: 1, color: TEXT3, textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dayAppts.map(a => {
                const svc = SERVICES.find(sv => sv.id === a.serviceId);
                const prov = PROVIDERS.find(p => p.id === a.providerId);
                return (
                  <tr key={a.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                    <td style={{ padding: '14px 16px', font: `500 13px ${MONO}`, color: TEXT }}>{a.time}</td>
                    <td style={{ padding: '14px 16px', font: `500 13px ${FONT}`, color: TEXT }}>{a.patientName}</td>
                    <td style={{ padding: '14px 16px', font: `400 13px ${FONT}`, color: TEXT2 }}>{svc?.name || '--'}</td>
                    <td style={{ padding: '14px 16px', font: `400 13px ${FONT}`, color: TEXT2 }}>{prov?.name?.split(',')[0] || '--'}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 100, font: `500 10px ${FONT}`, textTransform: 'uppercase',
                        background: a.status === 'confirmed' ? '#F0FDF4' : a.status === 'pending' ? '#FFFBEB' : a.status === 'completed' ? '#F0F9FF' : '#F5F5F5',
                        color: statusColor(a.status),
                      }}>{a.status}</span>
                    </td>
                  </tr>
                );
              })}
              {dayAppts.length === 0 && (
                <tr><td colSpan="5" style={{ padding: 40, textAlign: 'center', font: `400 13px ${FONT}`, color: TEXT3 }}>No appointments for this day</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function InventoryPage() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');

  const categories = [...new Set(INVENTORY.map(i => i.category))];
  const filtered = INVENTORY.filter(i => {
    if (search && !i.name.toLowerCase().includes(search.toLowerCase()) && !i.sku?.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter !== 'All' && i.category !== catFilter) return false;
    return true;
  });

  const totalValue = filtered.reduce((sum, i) => sum + (i.quantity * (i.unitCost || 0)), 0);
  const lowStockCount = INVENTORY.filter(i => i.quantity <= i.reorderAt).length;

  const stockLevel = (item) => {
    if (item.quantity === 0) return { label: 'Out', color: DANGER, bg: '#FEF2F2' };
    if (item.quantity <= item.reorderAt / 2) return { label: 'Critical', color: DANGER, bg: '#FEF2F2' };
    if (item.quantity <= item.reorderAt) return { label: 'Low', color: WARNING, bg: '#FFFBEB' };
    return { label: 'Good', color: SUCCESS, bg: '#F0FDF4' };
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ font: `600 26px ${FONT}`, color: TEXT, marginBottom: 4 }}>Inventory</h1>
          <p style={{ font: `400 14px ${FONT}`, color: TEXT2 }}>{INVENTORY.length} items -- Track injectables, products, and supplies</p>
        </div>
        <div style={pillAccent}>+ Add Item</div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
        <div style={{ ...cardStyle, padding: '16px 20px' }}>
          <div style={{ font: `400 10px ${MONO}`, textTransform: 'uppercase', letterSpacing: 1, color: TEXT3, marginBottom: 6 }}>Total Value</div>
          <div style={{ font: `600 22px ${FONT}`, color: TEXT }}>{fmt(totalValue)}</div>
        </div>
        <div style={{ ...cardStyle, padding: '16px 20px' }}>
          <div style={{ font: `400 10px ${MONO}`, textTransform: 'uppercase', letterSpacing: 1, color: TEXT3, marginBottom: 6 }}>Low Stock</div>
          <div style={{ font: `600 22px ${FONT}`, color: lowStockCount > 0 ? WARNING : SUCCESS }}>{lowStockCount} items</div>
        </div>
        <div style={{ ...cardStyle, padding: '16px 20px' }}>
          <div style={{ font: `400 10px ${MONO}`, textTransform: 'uppercase', letterSpacing: 1, color: TEXT3, marginBottom: 6 }}>Expiring Soon</div>
          <div style={{ font: `600 22px ${FONT}`, color: SUCCESS }}>0 items</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or SKU..." style={{ ...inputStyle, maxWidth: 280 }} />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ ...inputStyle, width: 'auto', cursor: 'pointer' }}>
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={tableWrap}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E5E5E5' }}>
                {['Item', 'SKU', 'Category', 'Stock', 'Status', 'Unit Cost', 'Value'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', font: `500 11px ${MONO}`, textTransform: 'uppercase', letterSpacing: 1, color: TEXT3, textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const sl = stockLevel(item);
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #F5F5F5' }}>
                    <td style={{ padding: '14px', font: `500 13px ${FONT}`, color: TEXT }}>
                      {item.name}
                      <div style={{ font: `400 11px ${FONT}`, color: TEXT3 }}>{item.location}</div>
                    </td>
                    <td style={{ padding: '14px', font: `400 12px ${MONO}`, color: TEXT3 }}>{item.sku || '--'}</td>
                    <td style={{ padding: '14px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 100, font: `500 11px ${FONT}`, background: '#F5F5F5', color: TEXT2 }}>{item.category}</span>
                    </td>
                    <td style={{ padding: '14px', font: `600 14px ${MONO}`, color: TEXT }}>{item.quantity}</td>
                    <td style={{ padding: '14px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 100, font: `500 10px ${FONT}`, textTransform: 'uppercase', background: sl.bg, color: sl.color }}>{sl.label}</span>
                    </td>
                    <td style={{ padding: '14px', font: `400 13px ${MONO}`, color: TEXT2 }}>{fmt(item.unitCost)}</td>
                    <td style={{ padding: '14px', font: `500 13px ${MONO}`, color: TEXT }}>{fmt(item.quantity * item.unitCost)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InboxPage() {
  const [selected, setSelected] = useState(DM_CONVERSATIONS[0]);
  const [platformFilter, setPlatformFilter] = useState('all');

  const conversations = DM_CONVERSATIONS.filter(c => platformFilter === 'all' || c.platform === platformFilter);

  const platformIcon = (platform) => {
    if (platform === 'instagram') return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="#E1306C" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="#E1306C"/></svg>;
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>;
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ font: `600 26px ${FONT}`, color: TEXT, marginBottom: 4 }}>DM Inbox</h1>
        <p style={{ font: `400 14px ${FONT}`, color: TEXT2 }}>Unified social media inbox -- Instagram & Facebook DMs</p>
      </div>

      {/* Platform revenue cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { name: 'Instagram', color: '#E1306C', revenue: 47200, conversations: 142, booked: 38 },
          { name: 'Facebook', color: '#1877F2', revenue: 18600, conversations: 67, booked: 12 },
        ].map(p => (
          <div key={p.name} style={{ ...cardStyle, padding: '18px 20px', borderLeft: `3px solid ${p.color}` }}>
            <div style={{ font: `600 14px ${FONT}`, color: TEXT, marginBottom: 8 }}>{p.name}</div>
            <div style={{ font: `600 20px ${FONT}`, color: p.color, marginBottom: 4 }}>${p.revenue.toLocaleString()}</div>
            <div style={{ font: `400 12px ${FONT}`, color: TEXT3 }}>{p.conversations} conversations &middot; {p.booked} booked from DMs</div>
          </div>
        ))}
      </div>

      {/* Inbox */}
      <div style={{ ...cardStyle, overflow: 'hidden', display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: 500 }}>
        {/* Conversation list */}
        <div style={{ borderRight: '1px solid rgba(0,0,0,0.06)', overflowY: 'auto' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', gap: 6 }}>
            {['all', 'instagram', 'facebook'].map(f => (
              <button key={f} onClick={() => setPlatformFilter(f)} style={{
                ...pill, padding: '5px 12px', fontSize: 11,
                background: platformFilter === f ? ACCENT : 'transparent',
                color: platformFilter === f ? ACCENT_TEXT : TEXT3,
                border: platformFilter === f ? 'none' : '1px solid #E5E5E5',
              }}>{f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}</button>
            ))}
          </div>
          {conversations.map(c => (
            <div key={c.id} onClick={() => setSelected(c)} style={{
              padding: '14px 16px', borderBottom: '1px solid rgba(0,0,0,0.03)', cursor: 'pointer',
              background: selected?.id === c.id ? ACCENT_LIGHT : 'transparent',
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: getAvatarGradient(c.name), display: 'flex', alignItems: 'center', justifyContent: 'center', font: `500 13px ${FONT}`, color: '#fff', flexShrink: 0 }}>
                {c.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ font: `${c.unread ? '600' : '400'} 13px ${FONT}`, color: TEXT }}>{c.name}</span>
                    {platformIcon(c.platform)}
                  </div>
                  <span style={{ font: `400 10px ${FONT}`, color: TEXT3 }}>{c.time}</span>
                </div>
                <div style={{ font: `400 12px ${FONT}`, color: c.unread ? TEXT : TEXT3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.lastMessage}</div>
              </div>
              {c.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E1306C', flexShrink: 0, marginTop: 6 }} />}
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {selected ? (
            <>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: getAvatarGradient(selected.name), display: 'flex', alignItems: 'center', justifyContent: 'center', font: `500 12px ${FONT}`, color: '#fff' }}>{selected.avatar}</div>
                <div>
                  <div style={{ font: `600 14px ${FONT}`, color: TEXT }}>{selected.name}</div>
                  <div style={{ font: `400 11px ${FONT}`, color: TEXT3 }}>{selected.platform}</div>
                </div>
              </div>
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                {selected.messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.from === 'us' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
                    <div style={{
                      maxWidth: '70%', padding: '10px 14px', borderRadius: 14,
                      background: m.from === 'us' ? ACCENT : '#F0F0F0',
                      color: m.from === 'us' ? ACCENT_TEXT : TEXT,
                      font: `400 13px ${FONT}`,
                    }}>
                      {m.text}
                      <div style={{ font: `400 10px ${FONT}`, color: m.from === 'us' ? `${ACCENT_TEXT}99` : TEXT3, marginTop: 4 }}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(0,0,0,0.04)', display: 'flex', gap: 8 }}>
                <input placeholder="Type a message..." style={{ ...inputStyle, flex: 1 }} />
                <div style={{ ...pillAccent, padding: '10px 20px' }}>Send</div>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `400 14px ${FONT}`, color: TEXT3 }}>Select a conversation</div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmailPage() {
  const [tab, setTab] = useState('sent');

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ font: `600 26px ${FONT}`, color: TEXT, marginBottom: 4 }}>Email</h1>
        <p style={{ font: `400 14px ${FONT}`, color: TEXT2 }}>Compose and send branded emails to your patients</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 28, background: '#F0F0F0', borderRadius: 8, overflow: 'hidden', width: 'fit-content' }}>
        {[['compose', 'Compose'], ['sent', `Sent (${SENT_EMAILS.length})`]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding: '9px 20px', background: tab === k ? '#fff' : 'transparent', border: 'none',
            font: `500 13px ${FONT}`, color: tab === k ? TEXT : TEXT3, cursor: 'pointer',
            borderRadius: tab === k ? 8 : 0,
          }}>{l}</button>
        ))}
      </div>

      {tab === 'compose' && (
        <div style={{ maxWidth: 720 }}>
          <h2 style={{ font: `600 20px ${FONT}`, color: TEXT, marginBottom: 20 }}>Who is this for?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {[
              { name: 'All Patients', desc: 'Everyone in your system', count: PATIENTS.length },
              { name: 'Members', desc: 'Patients with membership', count: PATIENTS.filter(p => p.membershipTier !== 'None').length },
              { name: 'Recent Visitors', desc: 'Visited in last 30 days', count: 9 },
              { name: 'Lapsed Patients', desc: 'No visit in 90+ days', count: 3 },
              { name: 'VIP / High Spend', desc: 'Top spending patients', count: 5 },
            ].map(a => (
              <div key={a.name} style={{ ...cardStyle, padding: '18px 16px', cursor: 'pointer' }}>
                <div style={{ font: `600 14px ${FONT}`, color: TEXT, marginBottom: 4 }}>{a.name}</div>
                <div style={{ font: `400 12px ${FONT}`, color: TEXT3, marginBottom: 6 }}>{a.desc}</div>
                <div style={{ font: `600 12px ${MONO}`, color: ACCENT }}>{a.count} patients</div>
              </div>
            ))}
          </div>
          <div style={{ ...pillAccent, marginTop: 20, display: 'inline-block' }}>Next -- Choose Template</div>
        </div>
      )}

      {tab === 'sent' && (
        <div style={tableWrap}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E5E5E5' }}>
                {['Subject', 'Audience', 'Recipients', 'Sent', 'Open Rate', 'Click Rate'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', font: `500 11px ${MONO}`, textTransform: 'uppercase', letterSpacing: 1, color: TEXT3, textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SENT_EMAILS.map(em => (
                <tr key={em.id} style={{ borderBottom: '1px solid #F5F5F5' }}>
                  <td style={{ padding: '14px 16px', font: `500 13px ${FONT}`, color: TEXT, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{em.subject}</td>
                  <td style={{ padding: '14px 16px' }}><span style={{ padding: '3px 10px', borderRadius: 100, font: `500 11px ${FONT}`, background: '#F5F5F5', color: TEXT2 }}>{em.audience}</span></td>
                  <td style={{ padding: '14px 16px', font: `500 13px ${MONO}`, color: TEXT }}>{em.recipientCount}</td>
                  <td style={{ padding: '14px 16px', font: `400 13px ${FONT}`, color: TEXT2 }}>{new Date(em.sentDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 48, height: 4, background: '#F0F0F0', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ width: `${em.openRate}%`, height: '100%', background: em.openRate > 40 ? SUCCESS : ACCENT, borderRadius: 2 }} />
                      </div>
                      <span style={{ font: `500 12px ${MONO}`, color: em.openRate > 40 ? SUCCESS : ACCENT }}>{em.openRate}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', font: `500 12px ${MONO}`, color: TEXT2 }}>{em.clickRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ComingSoonPage({ label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: ACCENT_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      </div>
      <h2 style={{ font: `600 22px ${FONT}`, color: TEXT, marginBottom: 8 }}>{label}</h2>
      <p style={{ font: `400 14px ${FONT}`, color: TEXT3, maxWidth: 360, textAlign: 'center' }}>This module is part of the full MedSpa platform. Full functionality available in the live demo.</p>
    </div>
  );
}

// ============================================================================
// MAIN SHOWCASE COMPONENT
// ============================================================================
export default function MedSpaShowcase() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarWidth = sidebarCollapsed ? 68 : 240;
  const sidebarBg = '#111111';
  const sidebarMuted = '#888888';
  const sidebarBorder = '#222222';

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage />;
      case 'patients': return <PatientsPage />;
      case 'schedule': return <SchedulePage />;
      case 'inventory': return <InventoryPage />;
      case 'inbox': return <InboxPage />;
      case 'email': return <EmailPage />;
      default: {
        const section = NAV_SECTIONS.find(s => s.items.some(i => i.id === activePage));
        const item = section?.items.find(i => i.id === activePage);
        return <ComingSoonPage label={item?.label || activePage} />;
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: BG, position: 'relative', fontFamily: FONT }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarWidth, height: '100%', position: 'absolute', left: 0, top: 0, bottom: 0,
        background: sidebarBg, display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{
          padding: sidebarCollapsed ? '20px 10px' : '20px 20px', borderBottom: `1px solid ${sidebarBorder}`,
          display: 'flex', alignItems: 'center', gap: 12, minHeight: 68,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, background: ACCENT === '#111111' ? '#fff' : ACCENT,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: ACCENT === '#111111' ? '#111' : ACCENT_TEXT, font: `700 14px ${FONT}`, flexShrink: 0,
          }}>G</div>
          {!sidebarCollapsed && (
            <div>
              <div style={{ font: `600 14px ${FONT}`, color: '#FFFFFF', lineHeight: 1.2 }}>Glow Aesthetics</div>
              <div style={{ font: `400 11px ${FONT}`, color: sidebarMuted }}>Premium Aesthetic Treatments</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 12px' }}>
          {NAV_SECTIONS.map(section => (
            <div key={section.section} style={{ marginBottom: 16 }}>
              {!sidebarCollapsed && (
                <div style={{
                  font: `500 10px ${MONO}`, textTransform: 'uppercase',
                  letterSpacing: 1.2, color: sidebarMuted, padding: '0 16px 6px',
                }}>
                  {section.section}
                </div>
              )}
              {section.items.map(item => {
                const isActive = activePage === item.id;
                return (
                  <div key={item.id} onClick={() => setActivePage(item.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: sidebarCollapsed ? '10px 0' : '10px 16px',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s',
                      font: `${isActive ? '500' : '400'} 13px ${FONT}`,
                      color: isActive ? ACCENT : '#AAAAAA',
                      background: isActive ? `${ACCENT}30` : 'transparent',
                      textDecoration: 'none',
                    }}>
                    <span style={{ flexShrink: 0, display: 'flex' }}>{ICONS[item.icon]}</span>
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '12px', borderTop: `1px solid ${sidebarBorder}` }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            padding: sidebarCollapsed ? '10px 0' : '10px 16px', justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            font: `400 13px ${FONT}`, color: sidebarMuted,
          }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
            {!sidebarCollapsed && 'Brand Color'}
          </div>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',
            padding: '8px', background: 'transparent', border: 'none', borderRadius: 8,
            cursor: 'pointer', color: sidebarMuted, marginTop: 4,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginLeft: sidebarWidth, minHeight: '100vh', transition: 'margin-left 0.25s cubic-bezier(0.16,1,0.3,1)' }}>
        {/* Topbar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(245,243,240,0.6)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
          padding: '0 32px', height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 12px 6px 10px', borderRadius: 100,
              border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.5)',
              font: `400 12px ${FONT}`, color: '#AAA',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span style={{ font: `400 11px ${MONO}`, color: '#CCC' }}>{'\u2318'}K</span>
            </div>
            <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.08)' }} />
            <span style={{ font: `400 12px ${MONO}`, color: '#AAA', letterSpacing: 0.5 }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: '32px 36px', maxWidth: 1400 }}>
          {renderPage()}
        </div>
      </div>

      <style>{`
        @keyframes dashFadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
