'use client';

import { useRef, useState } from 'react';
import FadeIn from './FadeIn';

export default function Newsletter() {
  const nameRef  = useRef(null);
  const emailRef = useRef(null);
  const [status, setStatus]   = useState(null); // 'success' | 'error'
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const subscribe = async () => {
    const email = emailRef.current?.value?.trim();
    const name  = nameRef.current?.value?.trim();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      const res  = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();

      setStatus(data.success ? 'success' : 'error');
      setMessage(data.message || (data.success ? 'Subscribed!' : 'Something went wrong.'));

      if (data.success) {
        if (nameRef.current)  nameRef.current.value  = '';
        if (emailRef.current) emailRef.current.value = '';
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter" id="newsletter" style={{ padding: '5rem 6rem' }}>
      <div className="newsletter-inner">
        <FadeIn>
          <div className="newsletter-title">
            Sweet news,<br /><em>delivered</em> to you
          </div>
          <div className="newsletter-sub">
            Seasonal recipes, early access to festival collections, exclusive discounts and stories
            from our kitchen — straight to your inbox.
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
              <input ref={nameRef} type="text" className="nl-input" placeholder="Ramesh Kumar" />
            </div>

            <div className="nl-input-row">
              <input ref={emailRef} type="email" className="nl-input" placeholder="you@example.com" />
              <button className="nl-btn" onClick={subscribe} disabled={loading}>
                {loading ? '…' : 'Subscribe →'}
              </button>
            </div>

            {status && (
              <div style={{
                marginTop: '0.5rem',
                padding: '0.6rem 1rem',
                fontSize: '0.75rem',
                background: status === 'success' ? 'rgba(201,168,76,0.1)' : 'rgba(139,26,47,0.1)',
                border: `0.5px solid ${status === 'success' ? 'rgba(201,168,76,0.4)' : 'rgba(139,26,47,0.4)'}`,
                color: status === 'success' ? 'var(--gold-light)' : '#E88A9A',
              }}>
                {status === 'success' ? '✓ ' : '⚠ '}{message}
              </div>
            )}

            <div className="nl-note">
              By subscribing you agree to receive marketing emails. Your data is never shared with third parties.
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}