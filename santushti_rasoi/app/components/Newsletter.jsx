'use client';

import { useRef } from 'react';
import FadeIn from './FadeIn';

export default function Newsletter() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const subscribe = () => {
    const name = nameRef.current?.value?.trim();
    const msg = name
      ? `Welcome, ${name.split(' ')[0]}! Check your inbox for 10% off. 🎉`
      : 'Thank you for subscribing! Check your inbox soon.';
    alert(msg); // Replace with your toast/notification system
  };

  return (
    <section className="newsletter" id="newsletter" style={{ padding: '5rem 6rem' }}>
      <div className="newsletter-inner">
        <FadeIn>
          <div className="newsletter-title">
            Sweet news,<br /><em>delivered</em> to you
          </div>
          <div className="newsletter-sub">
            Seasonal recipes, early access to festival collections, exclusive discounts and stories from our kitchen — straight to your inbox.
          </div>
          <div className="nl-perks">
            <div className="nl-perk"><span className="nl-perk-dot" /> No spam, ever</div>
            <div className="nl-perk"><span className="nl-perk-dot" /> Unsubscribe anytime</div>
            <div className="nl-perk"><span className="nl-perk-dot" /> 10% off your first order</div>
          </div>
        </FadeIn>

        <FadeIn delay={1}>
          <div className="newsletter-form">
            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,247,240,0.4)' }}>
                Your Name
              </label>
              <input
                ref={nameRef}
                type="text"
                className="nl-input"
                placeholder="Ramesh Kumar"
              />
            </div>
            <div className="nl-input-row">
              <input
                ref={emailRef}
                type="email"
                className="nl-input"
                placeholder="you@example.com"
              />
              <button className="nl-btn" onClick={subscribe}>Subscribe →</button>
            </div>
            <div className="nl-note">
              By subscribing you agree to receive marketing emails. Your data is never shared with third parties.
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
