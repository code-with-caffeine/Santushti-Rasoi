'use client';

import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openCart, count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Santushti <span>Rasoi</span>
      </div>

      <ul className="nav-links" style={menuOpen ? {
        display: 'flex', flexDirection: 'column', position: 'absolute',
        top: '100%', left: 0, right: 0, background: 'var(--cream)',
        padding: '1.5rem 2rem', borderBottom: '0.5px solid var(--border)',
        zIndex: 200, gap: '1.25rem'
      } : {}}>
        {[
          ['categories', 'Collections'],
          ['process', 'Craft'],
          ['seasonal', 'Seasonal'],
          ['dry-sweets', 'Dry Sweets'],
          ['gifting', 'Gifting'],
          ['order', 'Order'],
        ].map(([id, label]) => (
          <li key={id}>
            <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <div className="cart-pill" onClick={openCart}>
          <span>Cart</span>
          <div className="cart-count">{count}</div>
        </div>
        <a href="#order" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollTo('order'); }}>
          Order Now
        </a>
        <div className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>
      </div>
    </nav>
  );
}
