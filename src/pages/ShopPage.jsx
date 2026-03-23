import { useState } from 'react'

const PRODUCTS = [
  { id: 1, name: 'Classic Logo Tee', price: 34.99, cat: 'Apparel', img: '👕', badge: 'Best Seller' },
  { id: 2, name: 'Premium Hoodie', price: 68.00, cat: 'Apparel', img: '🧥', badge: null },
  { id: 3, name: 'Canvas Tote', price: 24.99, cat: 'Accessories', img: '👜', badge: 'Staff Pick' },
  { id: 4, name: 'Ceramic Mug', price: 18.99, cat: 'Home', img: '☕', badge: null },
  { id: 5, name: 'Sticker Pack', price: 9.99, cat: 'Accessories', img: '✦', badge: null },
  { id: 6, name: 'Enamel Pin Set', price: 14.99, cat: 'Accessories', img: '📌', badge: 'New' },
  { id: 7, name: 'Scented Candle', price: 28.00, cat: 'Home', img: '🕯️', badge: null },
  { id: 8, name: 'Baseball Cap', price: 32.00, cat: 'Apparel', img: '🧢', badge: 'Staff Pick' },
]

const CATS = ['All', 'Apparel', 'Accessories', 'Home']

export default function ShopPage() {
  const [cat, setCat] = useState('All')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const filtered = cat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat)

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id)
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...p, qty: 1 }]
    })
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div style={styles.wrap}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroTag} data-editable="shop-tag">SHOP</div>
        <h1 style={styles.heroTitle} data-editable="shop-title">The Collection</h1>
        <p style={styles.heroSub} data-editable="shop-sub">Curated products for your brand. Every item customizable.</p>
      </div>

      {/* Filter bar */}
      <div style={styles.filterBar}>
        <div style={styles.cats}>
          {CATS.map(c => (
            <button
              key={c}
              style={{ ...styles.catBtn, color: cat === c ? '#D4AF37' : '#666', borderBottom: cat === c ? '2px solid #D4AF37' : '2px solid transparent' }}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <button style={styles.cartToggle} onClick={() => setCartOpen(!cartOpen)}>
          🛒 {count > 0 && <span style={styles.cartCount}>{count}</span>}
        </button>
      </div>

      {/* Products */}
      <div style={styles.grid}>
        {filtered.map(p => (
          <div key={p.id} style={styles.card}>
            <div style={styles.imgWrap}>
              <span style={styles.emoji}>{p.img}</span>
              {p.badge && <span style={styles.badge}>{p.badge}</span>}
            </div>
            <div style={styles.cardBody}>
              <div style={styles.cardCat}>{p.cat}</div>
              <div style={styles.cardName} data-editable={`product-${p.id}`}>{p.name}</div>
              <div style={styles.cardBottom}>
                <span style={styles.cardPrice}>${p.price.toFixed(2)}</span>
                <button style={styles.addBtn} onClick={() => addToCart(p)}>Add +</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust section */}
      <div style={styles.trust}>
        {['Free Shipping $50+', 'Easy Returns', 'Secure Checkout', 'Custom Branding'].map(t => (
          <div key={t} style={styles.trustItem}>
            <div style={styles.trustText}>{t}</div>
          </div>
        ))}
      </div>

      {/* Cart drawer */}
      {cartOpen && (
        <>
          <div style={styles.cartOverlay} onClick={() => setCartOpen(false)} role="presentation" />
          <div style={styles.cartDrawer}>
            <div style={styles.cartHeader}>
              <span style={styles.cartTitle}>Cart ({count})</span>
              <button style={styles.cartClose} onClick={() => setCartOpen(false)} aria-label="Close cart">✕</button>
            </div>
            {cart.length === 0 ? (
              <div style={styles.cartEmpty}>Your cart is empty</div>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} style={styles.cartItem}>
                    <div>
                      <div style={styles.cartItemName}>{item.name}</div>
                      <div style={styles.cartItemQty}>Qty: {item.qty}</div>
                    </div>
                    <div style={styles.cartItemPrice}>${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                ))}
                <div style={styles.cartTotal}>
                  <span>Total</span>
                  <span style={styles.cartTotalVal}>${total.toFixed(2)}</span>
                </div>
                <button style={styles.checkoutBtn}>Checkout →</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  wrap: { paddingBottom: 40 },
  hero: {
    padding: '48px 24px 32px',
    textAlign: 'center',
    background: 'linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 100%)',
  },
  heroTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10, letterSpacing: '0.3em', color: '#D4AF37', marginBottom: 8, outline: 'none',
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 32, fontWeight: 500, color: '#F0EDE6', margin: '0 0 8px', outline: 'none',
  },
  heroSub: { fontSize: 14, color: '#908D9A', margin: 0, outline: 'none' },
  filterBar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0 16px', borderBottom: '1px solid #1a1a1a',
    position: 'sticky', top: 52, background: 'rgba(0,0,0,0.95)', zIndex: 10,
    backdropFilter: 'blur(10px)',
  },
  cats: { display: 'flex', gap: 0 },
  catBtn: {
    padding: '12px 14px', fontSize: 13, fontWeight: 500, transition: 'all 0.2s',
  },
  cartToggle: { fontSize: 18, position: 'relative', padding: 8 },
  cartCount: {
    position: 'absolute', top: 2, right: 2, background: '#D4AF37', color: '#000',
    fontSize: 10, fontWeight: 700, width: 16, height: 16, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, padding: '16px',
  },
  card: {
    background: '#0a0a0a', borderRadius: 14, overflow: 'hidden', border: '1px solid #1a1a1a',
  },
  imgWrap: {
    height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#080808', position: 'relative',
  },
  emoji: { fontSize: 40 },
  badge: {
    position: 'absolute', top: 8, left: 8,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '0.1em',
    padding: '3px 6px', borderRadius: 4, background: '#D4AF37', color: '#000', fontWeight: 700,
  },
  cardBody: { padding: 12 },
  cardCat: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '0.15em',
    color: '#D4AF37', textTransform: 'uppercase', marginBottom: 4,
  },
  cardName: { fontSize: 14, fontWeight: 500, color: '#F0EDE6', marginBottom: 8, outline: 'none' },
  cardBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 15, fontWeight: 700, color: '#D4AF37' },
  addBtn: {
    padding: '6px 12px', borderRadius: 100, background: '#1a1a1a', color: '#D4AF37',
    fontSize: 11, fontWeight: 600, border: '1px solid #D4AF3720',
  },
  trust: {
    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, padding: '24px 16px',
  },
  trustItem: {
    padding: '12px', background: '#0a0a0a', borderRadius: 10, border: '1px solid #1a1a1a', textAlign: 'center',
  },
  trustText: { fontSize: 11, color: '#888', fontWeight: 500 },
  cartOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50 },
  cartDrawer: {
    position: 'fixed', top: 0, right: 0, bottom: 0, width: '85%', maxWidth: 340,
    background: '#0a0a0a', borderLeft: '1px solid #1a1a1a', padding: 20,
    zIndex: 51, display: 'flex', flexDirection: 'column', gap: 12,
    animation: 'slideIn 0.3s ease',
  },
  cartHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cartTitle: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: '#F0EDE6' },
  cartClose: { fontSize: 18, color: '#666', padding: 4 },
  cartEmpty: { fontSize: 14, color: '#555', textAlign: 'center', padding: '60px 0' },
  cartItem: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 0', borderBottom: '1px solid #1a1a1a',
  },
  cartItemName: { fontSize: 14, color: '#F0EDE6', fontWeight: 500 },
  cartItemQty: { fontSize: 12, color: '#666', marginTop: 2 },
  cartItemPrice: { fontSize: 14, fontWeight: 600, color: '#D4AF37' },
  cartTotal: {
    display: 'flex', justifyContent: 'space-between', fontSize: 16, color: '#F0EDE6',
    padding: '12px 0', marginTop: 'auto',
  },
  cartTotalVal: { fontWeight: 700, color: '#D4AF37' },
  checkoutBtn: {
    padding: '14px 0', borderRadius: 100, background: '#D4AF37', color: '#000',
    fontSize: 15, fontWeight: 600, textAlign: 'center', border: 'none',
  },
}
