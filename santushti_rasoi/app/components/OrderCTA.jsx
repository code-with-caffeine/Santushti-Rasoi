'use client';

import { useState, useRef } from 'react';
import FadeIn from './FadeIn';
import { useCart } from '../context/CartContext';

export default function OrderCTA() {
  const { cart, total } = useCart();
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNum, setOrderNum]   = useState('');
  const [formError, setFormError] = useState('');

  const nameRef     = useRef();
  const phoneRef    = useRef();
  const emailRef    = useRef();
  const occasionRef = useRef();
  const detailsRef  = useRef();
  const cityRef     = useRef();
  const dateRef     = useRef();

  const handleSubmit = async () => {
    setFormError('');
    const name  = nameRef.current?.value?.trim();
    const phone = phoneRef.current?.value?.trim();

    if (!name)  { setFormError('Please enter your name.'); return; }
    if (!phone) { setFormError('Please enter your phone number.'); return; }

    const details = detailsRef.current?.value?.trim();
    if (cart.length === 0 && !details) {
      setFormError('Please describe your order, or add items to your cart first.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        customer: { name, phone, email: emailRef.current?.value?.trim() || '' },
        items: cart.map(i => ({ name: i.name, price: i.price, icon: i.icon, qty: i.qty })),
        orderDetails: details || '',
        occasion: occasionRef.current?.value || '',
        delivery: {
          city: cityRef.current?.value?.trim() || '',
          date: dateRef.current?.value || '',
        },
        source: cart.length > 0 ? 'cart' : 'website-form',
      };

      const res  = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormError(data.message || 'Something went wrong. Please try again.');
        return;
      }

      setOrderNum(data.data.orderNumber);
      setSubmitted(true);
    } catch {
      setFormError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="order-cta" id="order">
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🎉</div>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Order <em>Received!</em>
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.9, maxWidth: '48ch', margin: '0 auto 1.5rem' }}>
            Thank you! Your order request{' '}
            <strong style={{ color: 'var(--gold-dark)' }}>{orderNum}</strong>{' '}
            has been submitted. Our team will call you within 2 hours to confirm.
          </p>
          <button className="btn-primary" onClick={() => setSubmitted(false)}>
            Place Another Order →
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="order-cta" id="order">
      <FadeIn>
        <div className="section-label">Place an Order</div>
        <h2 className="section-title">Begin Your <em>Sweet</em> Journey</h2>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'var(--text-muted)', fontWeight: 300, marginTop: '1.5rem', maxWidth: '38ch' }}>
          We accept custom orders for weddings, festivals and corporate events.
          Delivery across India within 2–4 days.
        </p>

        <div style={{ marginTop: '2rem' }}>
          {[
            { icon: '📞', text: '+91 98350 12345' },
            { icon: '📧', text: 'orders@santushtirasoi.in' },
            { icon: '📍', text: 'Jamshedpur, Jharkhand' },
            { icon: '⏰', text: 'Mon–Sun: 8:00 AM – 9:30 PM' },
          ].map(item => (
            <div key={item.text} className="order-info-item">
              <span className="order-info-icon">{item.icon}</span>
              <span className="order-info-text">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="order-promise">
          <div className="order-promise-title">Our Quality Promise</div>
          <ul>
            <li>Fresh preparation guaranteed — made on the morning of dispatch</li>
            <li>100% replacement if quality does not meet your expectations</li>
            <li>Temperature-controlled packaging for all outstation deliveries</li>
            <li>Tracked delivery with real-time updates via WhatsApp</li>
          </ul>
        </div>
      </FadeIn>

      <FadeIn delay={1}>
        <div className="order-form">
          {cart.length > 0 && (
            <div style={{
              padding: '0.9rem 1rem', background: 'var(--cream-dark)',
              border: '0.5px solid var(--border)', marginBottom: '1rem',
              fontSize: '0.78rem', color: 'var(--text-muted)',
            }}>
              🛒 <strong style={{ color: 'var(--brown)' }}>
                {cart.length} item{cart.length > 1 ? 's' : ''}
              </strong>{' '}
              from your cart will be included — Total:{' '}
              <strong style={{ color: 'var(--gold-dark)' }}>
                ₹{total.toLocaleString('en-IN')}
              </strong>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input ref={nameRef} type="text" className="form-input" placeholder="Ramesh Kumar" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone *</label>
              <input ref={phoneRef} type="tel" className="form-input" placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input ref={emailRef} type="email" className="form-input" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label className="form-label">Occasion</label>
            <select ref={occasionRef} className="form-select">
              <option value="">Select occasion</option>
              <option>Wedding &amp; Shaadi</option>
              <option>Diwali Gifting</option>
              <option>Corporate Order</option>
              <option>Birthday Celebration</option>
              <option>Puja &amp; Religious</option>
              <option>Personal / Regular Order</option>
              <option>Bulk / Wholesale</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Order Details {cart.length === 0 ? '*' : '(Optional — supplement your cart)'}
            </label>
            <textarea
              ref={detailsRef}
              className="form-textarea"
              placeholder="e.g. 2kg Kaju Katli, 1kg Pista Roll, Royal Hamper ×5…"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Delivery City</label>
              <input ref={cityRef} type="text" className="form-input" placeholder="Jamshedpur / Delhi / Mumbai" />
            </div>
            <div className="form-group">
              <label className="form-label">Delivery Date</label>
              <input ref={dateRef} type="date" className="form-input" />
            </div>
          </div>

          {formError && (
            <div style={{
              padding: '0.75rem 1rem',
              background: '#FFF5F5', border: '0.5px solid rgba(139,26,47,0.3)',
              color: '#8B1A2F', fontSize: '0.78rem', marginBottom: '0.5rem',
            }}>
              ⚠️ {formError}
            </div>
          )}

          <button
            className="form-submit"
            onClick={handleSubmit}
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Submitting…' : 'Send Order Request →'}
          </button>
        </div>
      </FadeIn>
    </section>
  );
}