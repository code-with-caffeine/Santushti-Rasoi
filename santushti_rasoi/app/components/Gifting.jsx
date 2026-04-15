'use client';

import FadeIn from './FadeIn';
import { useCart } from '../context/CartContext';

const GIFT_BOXES = [
  { name: 'Classic Gift Box', icon: '🎁', pieces: '8 Varieties · 500g', price: '₹1,200', cartPrice: 1200, popular: false },
  { name: 'Royal Hamper', icon: '👑', pieces: '16 Varieties · 1.5kg', price: '₹3,500', cartPrice: 3500, popular: true },
  { name: 'Heritage Trunk', icon: '🏺', pieces: 'Custom · 3kg+', price: '₹7,000+', cartPrice: 7000, popular: false },
];

export default function Gifting() {
  const { addToCart } = useCart();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="gifting" id="gifting">
      <div className="section-label centered">Luxury Gifting</div>
      <h2 className="section-title light" style={{ maxWidth: '20ch', margin: '0.5rem auto 0' }}>
        Gift the <em>Extraordinary</em>
      </h2>
      <p className="gifting-desc">
        Our handcrafted gift boxes are designed for life&apos;s most precious moments — weddings, Diwali, corporate tokens, and celebrations of love.
      </p>

      <FadeIn className="gifting-boxes">
        {GIFT_BOXES.map(box => (
          <div
            key={box.name}
            className={`gift-box ${box.popular ? 'popular' : ''}`}
            onClick={() => addToCart(box.name, box.cartPrice, box.icon)}
          >
            {box.popular && <div className="gift-badge">Most Popular</div>}
            <div className="gift-icon">{box.icon}</div>
            <div className="gift-name">{box.name}</div>
            <div className="gift-pieces">{box.pieces}</div>
            <div className="gift-price">{box.price}</div>
          </div>
        ))}
      </FadeIn>

      <FadeIn className="gifting-custom">
        <div className="section-label centered" style={{ marginBottom: '0.5rem' }}>
          Corporate & Wedding Orders
        </div>
        <p>
          Planning a wedding, corporate gifting campaign, or bulk festival order? We create fully customised gift boxes with
          branded packaging, personalised notes, and tailored sweet selections. Minimum 25 boxes. Contact us for pricing.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <a
            href="#order"
            className="btn-outline"
            style={{ borderColor: 'rgba(201,168,76,0.4)', color: 'var(--gold-light)' }}
            onClick={(e) => { e.preventDefault(); scrollTo('order'); }}
          >
            Enquire Now
          </a>
          <a href="tel:+919835012345" className="btn-ghost" style={{ color: 'rgba(250,247,240,0.5)' }}>
            Call +91 98350 12345 →
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
