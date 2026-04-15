'use client';

import { useState } from 'react';
import FadeIn from './FadeIn';
import { useCart } from '../context/CartContext';

const DRY_ITEMS = [
  {
    name: 'Kaju Katli', icon: '🥮', sub: 'Cashew · Silver varq · Saffron', price: 850,
    desc: 'The crown jewel of Indian dry sweets. Pure cashew paste with silver varq and Kashmiri saffron. Made fresh every morning to ensure that melt-in-mouth softness that sets it apart.',
    ingr: 'Cashew, Sugar, Saffron, Silver Varq', shelf: '15 days',
  },
  {
    name: 'Anjeer Barfi', icon: '🫐', sub: 'Turkish Figs · Almond · Cardamom', price: 980,
    desc: 'Premium Turkish figs slow-cooked with A2 ghee, almonds and cardamom. A sophisticated dry sweet for discerning palates — dense, nutty, not overly sweet.',
    ingr: 'Turkish Figs, Almonds, Cardamom, Ghee', shelf: '20 days',
  },
  {
    name: 'Pista Roll', icon: '🟢', sub: 'Iranian Pistachio · Rose Water', price: 1200,
    desc: 'Iranian pistachios rolled into elegant cylinders with khoya, saffron and rose water. Topped with edible rose petals and gold leaf.',
    ingr: 'Pistachio, Khoya, Rose Water, Saffron', shelf: '12 days',
  },
  {
    name: 'Badam Pak', icon: '🌰', sub: 'Almonds · Ghee · Saffron Milk', price: 760,
    desc: 'Stone-ground almonds cooked in pure ghee with saffron milk. A nutrient-rich confection beloved across generations — dense, aromatic, and deeply satisfying.',
    ingr: 'Almonds, Ghee, Saffron Milk, Cardamom', shelf: '25 days',
  },
  {
    name: 'Khajur Mithai', icon: '🌴', sub: 'Medjool Dates · Walnuts · Jaggery', price: 650,
    desc: 'Medjool dates stuffed with walnuts and coated in dark jaggery. A refined, naturally sweetened confection with no added sugar — perfect for health-conscious gifting.',
    ingr: 'Medjool Dates, Walnuts, Jaggery', shelf: '30 days',
  },
  {
    name: 'Kaaju Peda', icon: '🟡', sub: 'Cashew · Milk Solids · Cardamom', price: 720,
    desc: 'Classic peda reimagined with pure cashew base. Each disc is hand-shaped, cardamom-spiced and finished with a single saffron strand pressed into the centre.',
    ingr: 'Cashew, Milk Solids, Cardamom, Saffron', shelf: '10 days',
  },
];

export default function DrySweets() {
  const [selected, setSelected] = useState(DRY_ITEMS[0]);
  const { addToCart } = useCart();

  return (
    <section className="dry-sweets" id="dry-sweets">
      <FadeIn>
        <div className="section-label">Dry Sweet Collection</div>
        <h2 className="section-title">The Art of <em>Dry Mithai</em></h2>
      </FadeIn>

      <div className="dry-grid">
        <FadeIn className="dry-list">
          {DRY_ITEMS.map(item => (
            <button
              key={item.name}
              className={`dry-item ${selected.name === item.name ? 'active' : ''}`}
              onClick={() => setSelected(item)}
            >
              <div className="dry-icon">{item.icon}</div>
              <div className="dry-info">
                <div className="dry-name">{item.name}</div>
                <div className="dry-sub">{item.sub}</div>
              </div>
              <div className="dry-price">₹{item.price.toLocaleString('en-IN')}</div>
            </button>
          ))}
        </FadeIn>

        <FadeIn delay={1} className="dry-detail">
          <div className="dry-detail-visual">{selected.icon}</div>
          <div>
            <div className="dry-detail-name">{selected.name}</div>
            <div className="dry-detail-desc">{selected.desc}</div>
          </div>
          <div className="dry-detail-meta">
            <div className="meta-item">
              <span className="meta-label">Ingredients</span>
              <span className="meta-value">{selected.ingr}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Shelf Life</span>
              <span className="meta-value">{selected.shelf}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Price</span>
              <span className="meta-value" style={{ color: 'var(--gold-dark)' }}>
                ₹{selected.price.toLocaleString('en-IN')} / 250g
              </span>
            </div>
          </div>
          <button
            className="btn-primary"
            onClick={() => addToCart(selected.name, selected.price, selected.icon)}
          >
            Add to Order
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
