'use client';

import { useState } from 'react';
import FadeIn from './FadeIn';
import { useCart } from '../context/CartContext';

const ALL_PRODUCTS = [
  {
    id: 1, cat: 'traditional', name: 'Kesar Kaju Katli', price: 850, icon: '',
    rating: '★★★★★ (248)', unit: '250g', badge: 'Bestseller', bgClass: 'prod-bg-1',
    desc: 'Pure cashew paste with Kashmiri saffron, silver varq, and a whisper of cardamom. Our most beloved creation for over six decades.',
  },
  {
    id: 2, cat: 'traditional', name: 'Motichoor Ladoo', price: 480, icon: '',
    rating: '★★★★★ (182)', unit: '500g', bgClass: 'prod-bg-2',
    desc: 'Tiny gram flour pearls in pure ghee, shaped into perfect spheres. A festive classic.',
  },
  {
    id: 3, cat: 'dry', name: 'Pistachio Barfi', price: 720, icon: '🟩',
    rating: '★★★★☆ (67)', unit: '250g', badge: 'New', badgeCls: 'ruby', bgClass: 'prod-bg-3',
    desc: 'Iranian pistachios ground with condensed milk and rose water, topped with edible rose petals.',
  },
  {
    id: 4, cat: 'halwa', name: 'Gajar Ka Halwa', price: 350, icon: '🟧',
    rating: '★★★★★ (310)', unit: '500g', bgClass: 'prod-bg-4',
    desc: 'Winter carrots slow-cooked in desi ghee with full-cream milk and crowned with dry fruits.',
  },
  {
    id: 5, cat: 'traditional', name: 'Besan Ladoo', price: 380, icon: '🟡',
    rating: '★★★★★ (204)', unit: '500g', bgClass: 'prod-bg-5',
    desc: 'Roasted gram flour bound with clarified butter and powdered sugar, rolled in silver leaf.',
  },
  {
    id: 6, cat: 'sugar-free', name: 'Sugar Free Khajur Roll', price: 520, icon: '🌴',
    rating: '★★★★☆ (89)', unit: '250g', badge: 'Sugar Free', bgClass: 'prod-bg-6',
    desc: 'Medjool dates and figs stuffed with almonds and walnuts. Naturally sweetened, no added sugar.',
  },
];

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'halwa', label: 'Halwa & Burfi' },
  { id: 'dry', label: 'Dry Sweets' },
  { id: 'sugar-free', label: 'Sugar Free' },
];

export default function Products({ activeFilter, onFilter }) {
  const { addToCart } = useCart();
  const currentFilter = activeFilter || 'all';

  const visible = ALL_PRODUCTS.filter(p => currentFilter === 'all' || p.cat === currentFilter);

  return (
    <section className="products" id="products">
      <FadeIn className="products-header">
        <div className="section-label centered">Bestsellers</div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          Our Finest <em>Creations</em>
        </h2>
      </FadeIn>

      <FadeIn className="products-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`products-tab ${currentFilter === tab.id ? 'active' : ''}`}
            onClick={() => onFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </FadeIn>

      <div className="products-grid">
        {visible.map((p, i) => (
          <FadeIn key={p.id} delay={i % 3} className="product-card" style={{}}>
            <div
              className="product-card"
              onClick={() => addToCart(p.name, p.price, p.icon)}
            >
              <div className={`product-image ${p.bgClass}`}>
                {p.badge && (
                  <span className={`product-badge ${p.badgeCls || ''}`}>{p.badge}</span>
                )}
                {!p.bgClass.includes('prod-bg-1') && <span>{p.icon}</span>}
              </div>
              <div className="product-info">
                <div className="product-rating">{p.rating}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-desc">{p.desc}</div>
                <div className="product-footer">
                  <div className="product-price">
                    ₹{p.price.toLocaleString('en-IN')} <span>/ {p.unit}</span>
                  </div>
                  <button
                    className="add-btn"
                    onClick={(e) => { e.stopPropagation(); addToCart(p.name, p.price, p.icon); }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
