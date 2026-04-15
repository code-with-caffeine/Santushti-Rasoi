'use client';

import { useState } from 'react';
import FadeIn from './FadeIn';
import { useCart } from '../context/CartContext';

const SEASON_DATA = {
  diwali: {
    bg: 'sf-bg-diwali', badge: 'Diwali 2024', emoji: '🪔', cartPrice: 1850,
    name: 'The Diwali Diyas Box',
    desc: '8 premium mithais crafted exclusively for Diwali — including our famous saffron kaju barfi, rose petal ladoo, and chocolate-coated dry fruits in a hand-painted box.',
    price: '₹1,850',
  },
  holi: {
    bg: 'sf-bg-holi', badge: 'Holi Special', emoji: '🌈', cartPrice: 1450,
    name: 'Gulal Mithai Collection',
    desc: 'A burst of colour for Holi — rose barfi, thandai ladoo, and gulkand pinni in a vibrant hand-block-printed box.',
    price: '₹1,450',
  },
  eid: {
    bg: 'sf-bg-eid', badge: 'Eid 2024', emoji: '🌙', cartPrice: 2200,
    name: 'Eid Mubarak Hamper',
    desc: 'Dates, Sheer Khurma ingredients, dry fruit rolls and phirni — an abundant hamper for Eid celebrations.',
    price: '₹2,200',
  },
  winter: {
    bg: 'sf-bg-winter', badge: 'Winter 2024', emoji: '❄️', cartPrice: 1100,
    name: 'Winter Warmers Box',
    desc: "Gajar halwa, til ladoo, gajak, and peanut chikki — four of North India's most beloved winter sweets.",
    price: '₹1,100',
  },
};

const SEASONAL_CARDS = [
  { name: 'Kaju Pista Barfi', icon: '🥮', price: '₹680', cartPrice: 680, desc: 'Double-layered barfi — cashew white layer over pistachio green, silver varq finish.' },
  { name: 'Saffron Rasgulla', icon: '🔶', price: '₹420 / 500g', cartPrice: 420, desc: 'Soft Bengal rasgulla soaked in kesar syrup with cardamom and rose water.' },
  { name: 'Mewa Ladoo', icon: '⭐', price: '₹560 / 250g', cartPrice: 560, desc: 'Seven dry fruits bound in jaggery and honey. Our festival signature since 1975.' },
  { name: 'Chocolate Burfi', icon: '🍫', price: '₹490 / 250g', cartPrice: 490, desc: 'Belgian dark chocolate blended into classic burfi base. East meets West.' },
];

export default function Seasonal() {
  const [activeSeason, setActiveSeason] = useState('diwali');
  const { addToCart } = useCart();
  const d = SEASON_DATA[activeSeason];

  return (
    <section className="seasonal" id="seasonal">
      <div className="seasonal-header">
        <FadeIn>
          <div className="section-label">Festival Calendar</div>
          <h2 className="section-title">Seasonal <em>Specials</em></h2>
        </FadeIn>
        <button className="btn-ghost">Full Calendar →</button>
      </div>

      <FadeIn className="season-tabs">
        {Object.keys(SEASON_DATA).map(s => (
          <button
            key={s}
            className={`season-tab ${activeSeason === s ? 'active' : ''}`}
            onClick={() => setActiveSeason(s)}
          >
            ✦ {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </FadeIn>

      <div className="seasonal-grid">
        <div className="seasonal-featured" onClick={() => addToCart(d.name, d.cartPrice, d.emoji)}>
          <div className={`seasonal-featured-bg ${d.bg}`}>
            <span className="seasonal-badge">{d.badge}</span>
            <div className="seasonal-featured-name">{d.name}</div>
            <div className="seasonal-featured-desc">{d.desc}</div>
            <button
              className="btn-outline"
              style={{ borderColor: 'var(--gold-light)', color: 'var(--gold-light)' }}
              onClick={(e) => { e.stopPropagation(); addToCart(d.name, d.cartPrice, d.emoji); }}
            >
              Add to Order — {d.price}
            </button>
          </div>
        </div>

        {SEASONAL_CARDS.map((card, i) => (
          <FadeIn key={card.name} delay={i % 2} className="seasonal-card">
            <div className="seasonal-card" onClick={() => addToCart(card.name, card.cartPrice, card.icon)} style={{ cursor: 'pointer' }}>
              <div className="seasonal-card-icon">{card.icon}</div>
              <div className="seasonal-card-name">{card.name}</div>
              <div className="seasonal-card-desc">{card.desc}</div>
              <div className="seasonal-card-price">{card.price}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
