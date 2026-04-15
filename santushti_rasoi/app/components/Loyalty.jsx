'use client';

import { useRef } from 'react';
import FadeIn from './FadeIn';
import { useCart } from '../context/CartContext';

const TIERS = [
  { cls: 'tier-silver', badge: '🥈', name: 'Silver Mithai', threshold: 'From first order', benefit: '5% off' },
  { cls: 'tier-gold', badge: '🏅', name: 'Gold Mithai', threshold: 'After ₹5,000 spend', benefit: '10% off + free delivery' },
  { cls: 'tier-platinum', badge: '💎', name: 'Platinum Mithai', threshold: 'After ₹15,000 spend', benefit: '15% off + priority + gifts' },
];

const PERKS = [
  { icon: '🎂', title: 'Birthday Surprise', desc: 'A complimentary box of your favourite sweets delivered on your birthday every year.' },
  { icon: '🚚', title: 'Free Express Delivery', desc: 'Gold & Platinum members get complimentary same-day delivery within Jamshedpur.' },
  { icon: '🔔', title: 'Early Access', desc: 'Pre-order seasonal specials and limited festival collections before they go public.' },
  { icon: '📞', title: 'Dedicated Line', desc: 'Platinum members get a dedicated WhatsApp number for instant custom orders.' },
  { icon: '🎁', title: 'Reward Points', desc: '1 point per ₹10 spent. Redeem points for discounts on future orders.' },
  { icon: '👨‍🍳', title: 'Karigar Experience', desc: 'Platinum members get invites to our exclusive mithai-making workshops in Jamshedpur.' },
];

export default function Loyalty() {
  const phoneRef = useRef(null);
  const { showToast: _showToast } = useCart();

  const joinLoyalty = () => {
    // You can replace this with actual toast if you expose showToast from context
    alert('Welcome to the Sweet Privileges Club! 🎉');
  };

  return (
    <section className="loyalty" id="loyalty">
      <div className="loyalty-inner">
        <FadeIn>
          <div className="section-label">Mithai Luxe Rewards</div>
          <h2 className="section-title">The <em>Sweet</em> Privileges Club</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.9, fontWeight: 300, marginTop: '1.5rem' }}>
            Earn points on every order. Unlock exclusive benefits, early access to seasonal collections, and complimentary gifts.
          </p>

          <div className="loyalty-tiers">
            {TIERS.map(tier => (
              <div key={tier.name} className={`loyalty-tier ${tier.cls}`}>
                <div className="tier-badge">{tier.badge}</div>
                <div>
                  <div className="tier-name">{tier.name}</div>
                  <div className="tier-threshold">{tier.threshold}</div>
                </div>
                <div className="tier-benefit">{tier.benefit}</div>
              </div>
            ))}
          </div>

          <div className="loyalty-join">
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '1rem' }}>
              Join the Club
            </div>
            <div style={{ display: 'flex', gap: 0 }}>
              <input
                ref={phoneRef}
                type="tel"
                className="loyalty-input"
                placeholder="Your mobile number"
                style={{ borderRight: 'none' }}
              />
              <button
                className="btn-primary"
                style={{ whiteSpace: 'nowrap', padding: '0.85rem 1.5rem' }}
                onClick={joinLoyalty}
              >
                Join Free →
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={1} className="loyalty-perks">
          {PERKS.map(perk => (
            <div key={perk.title} className="perk-card">
              <div className="perk-icon">{perk.icon}</div>
              <div className="perk-title">{perk.title}</div>
              <div className="perk-desc">{perk.desc}</div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
