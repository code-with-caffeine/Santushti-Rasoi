'use client';

import { useCart } from '../context/CartContext';

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" style={{ paddingTop: '5rem' }}>
      <div className="hero-left">
        <div className="hero-eyebrow">Est. 2014 · Jamshedpur, Jharkhand</div>
        <h1>
          Where <em>Tradition</em><br />Meets <em>Luxury</em>
        </h1>
        <p className="hero-desc">
          Handcrafted Indian sweets and premium dry sweets, made with century-old recipes passed down through generations.
          Every mithai tells a story of love, devotion, and artisanal excellence.
        </p>
        <div className="hero-actions">
          <a href="#categories" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollTo('categories'); }}>
            Explore Collections
          </a>
          <button className="btn-ghost" onClick={() => scrollTo('heritage')}>
            Our Heritage →
          </button>
        </div>
      </div>

      <div className="hero-right">
        {/* <img src="../assets/sr_design.png" alt="" width={480} height={480} />  */}
        <div className="hero-right-image"></div>
      </div>

      <div className="hero-stats">
        <div className="stat">
          <span className="stat-num">12+</span>
          <span className="stat-label">Years of Craft</span>
        </div>
        <div className="stat">
          <span className="stat-num">120+</span>
          <span className="stat-label">Varieties</span>
        </div>
        <div className="stat">
          <span className="stat-num">2L+</span>
          <span className="stat-label">Happy Families</span>
        </div>
      </div>
    </section>
  );
}
