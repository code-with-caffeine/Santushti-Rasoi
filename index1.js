// ── CART STATE ──
let cart = [];
let currentDryPrice = 850;

function addToCart(name, price, icon) {
  const existing = cart.find(i => i.name === name);
  if (existing) { existing.qty++; }
  else { cart.push({ name, price, icon, qty: 1 }); }
  updateCartUI();
  openCart();
  showToast(name + ' added to cart');
}

function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s,i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  if (cart.length === 0) {
    itemsEl.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty.<br>Add some sweets to begin.</p></div>';
    footerEl.style.display = 'none';
  } else {
    footerEl.style.display = 'block';
    document.getElementById('cartTotal').textContent = '₹' + total.toLocaleString('en-IN');
    itemsEl.innerHTML = cart.map(i => `
      <div class="cart-item">
        <div class="cart-item-icon">${i.icon}</div>
        <div>
          <div class="cart-item-name">${i.name}</div>
          <div class="cart-item-qty">Qty: ${i.qty}</div>
          <button class="cart-item-remove" onclick="removeFromCart('${i.name}')">Remove</button>
        </div>
        <div class="cart-item-price">₹${(i.price * i.qty).toLocaleString('en-IN')}</div>
      </div>`).join('');
  }
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function checkout() {
  closeCart();
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
  showToast('Ready to place your order? Fill in the form below.');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── NAV ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

function toggleMenu() {
  const links = document.getElementById('navLinks');
  const isVisible = links.style.display === 'flex';
  links.style.cssText = isVisible ? '' :
    'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--cream);padding:1.5rem 2rem;border-bottom:0.5px solid var(--border);z-index:200;gap:1.25rem;';
}

// ── FADE IN ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── PRODUCTS FILTER ──
function filterProducts(cat, btn) {
  if (btn) {
    document.querySelectorAll('.products-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  document.querySelectorAll('#productsGrid .product-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
  if (cat !== 'all') document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ── SEASONAL TABS ──
const seasonData = {
  diwali: { bg: 'sf-bg-diwali', name: 'The Diwali Diyas Box', desc: '8 premium mithais crafted exclusively for Diwali — saffron kaju barfi, rose petal ladoo, and chocolate-coated dry fruits in a hand-painted box.', price: '₹1,850', badge: 'Diwali 2024', emoji: '🪔', cartPrice: 1850 },
  holi:   { bg: 'sf-bg-holi', name: 'Gulal Mithai Collection', desc: 'A burst of colour for Holi — rose barfi, thandai ladoo, and gulkand pinni in a vibrant hand-block-printed box.', price: '₹1,450', badge: 'Holi Special', emoji: '🌈', cartPrice: 1450 },
  eid:    { bg: 'sf-bg-eid', name: 'Eid Mubarak Hamper', desc: 'Dates, Sheer Khurma ingredients, dry fruit rolls and phirni — an abundant hamper for Eid celebrations.', price: '₹2,200', badge: 'Eid 2024', emoji: '🌙', cartPrice: 2200 },
  winter: { bg: 'sf-bg-winter', name: 'Winter Warmers Box', desc: 'Gajar halwa, til ladoo, gajak, and peanut chikki — four of North India\'s most beloved winter sweets.', price: '₹1,100', badge: 'Winter 2024', emoji: '❄️', cartPrice: 1100 }
};

function switchSeason(season, btn) {
  document.querySelectorAll('.season-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const d = seasonData[season];
  const feat = document.querySelector('.seasonal-featured');
  const bg = feat.querySelector('.seasonal-featured-bg');
  bg.className = 'seasonal-featured-bg ' + d.bg;
  bg.querySelector('.seasonal-badge').textContent = d.badge;
  bg.querySelector('.seasonal-featured-name').textContent = d.name;
  bg.querySelector('.seasonal-featured-desc').textContent = d.desc;
  const addBtn = bg.querySelector('.btn-outline');
  addBtn.textContent = 'Add to Order — ' + d.price;
  addBtn.onclick = e => { e.stopPropagation(); addToCart(d.name, d.cartPrice, d.emoji); };
  feat.onclick = () => addToCart(d.name, d.cartPrice, d.emoji);
}

// ── DRY SWEETS ──
function selectDry(btn, name, price, desc, icon, ingr, shelf, priceVal, numericPrice) {
  document.querySelectorAll('.dry-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('dryName').textContent = name;
  document.getElementById('dryDesc').textContent = desc;
  document.getElementById('dryIcon').textContent = icon;
  document.getElementById('dryIngr').textContent = ingr;
  document.getElementById('dryShelf').textContent = shelf;
  document.getElementById('dryPrice').textContent = priceVal + ' / 250g';
  currentDryPrice = numericPrice;
}

// ── STORE LOCATOR ──
const storeNames = ['Boring Road Flagship', 'Patna City Heritage Shop', 'Exhibition Road Outlet', 'Kankarbagh Premium'];
function selectStore(idx) {
  document.querySelectorAll('.store-card').forEach((c, i) => c.classList.toggle('active', i === idx));
  document.getElementById('storeDetailName').textContent = storeNames[idx];
}

// ── FAQ ──
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => { a.classList.remove('open'); a.previousElementSibling.classList.remove('open'); });
  if (!isOpen) { answer.classList.add('open'); btn.classList.add('open'); }
}

// ── LOYALTY ──
function joinLoyalty() {
  showToast('Welcome to the Sweet Privileges Club! 🎉');
}

// ── NEWSLETTER ──
function subscribeNewsletter() {
  const name = document.getElementById('nlName').value;
  if (name) { showToast('Welcome, ' + name.split(' ')[0] + '! Check your inbox for 10% off. 🎉'); }
  else { showToast('Thank you for subscribing! Check your inbox soon.'); }
}

// ── ORDER SUBMIT ──
function submitOrder() {
  showToast('Thank you! Our team will call you within 2 hours.');
}