'use client';

import FadeIn from './FadeIn';

const categories = [
  { id: 'traditional', cls: 'cat-1', name: 'Traditional Mithais', count: '42 varieties' },
  { id: 'halwa',       cls: 'cat-2', name: 'Halwa & Burfi',       count: '28 varieties' },
  { id: 'dry',         cls: 'cat-3', name: 'Dry Sweets',          count: '35 varieties' },
  { id: 'gifting',     cls: 'cat-4', name: 'Gift Hampers',        count: '16 curations' },
];

export default function Categories({ onFilter }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="categories" style={{ background: 'var(--cream)' }}>
      <div className="categories-header">
        <FadeIn>
          <div className="section-label">Our Collections</div>
          <h2 className="section-title">
            Crafted with <em>centuries</em><br />of wisdom
          </h2>
        </FadeIn>
        <button className="btn-ghost" onClick={() => scrollTo('products')}>View All →</button>
      </div>

      <div className="categories-grid">
        {categories.map((cat, i) => (
          <FadeIn key={cat.id} delay={i} className={`category-card ${cat.cls}`}>
            <div
              className="category-card"
              style={{ cursor: 'pointer' }}
              onClick={() => onFilter(cat.id)}
            >
              <div className="category-visual">
                <div className="category-bg" />
                <div className="category-overlay">
                  <span className="category-cta">Explore →</span>
                </div>
              </div>
              <div className="category-name">{cat.name}</div>
              <div className="category-count">{cat.count}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
