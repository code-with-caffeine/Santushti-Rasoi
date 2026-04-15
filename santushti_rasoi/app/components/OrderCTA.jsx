'use client';

import FadeIn from './FadeIn';

export default function OrderCTA() {
  const handleSubmit = () => {
    alert('Thank you! Our team will call you within 2 hours.');
  };

  return (
    <section className="order-cta" id="order">
      <FadeIn>
        <div className="section-label">Place an Order</div>
        <h2 className="section-title">Begin Your <em>Sweet</em> Journey</h2>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'var(--text-muted)', fontWeight: 300, marginTop: '1.5rem', maxWidth: '38ch' }}>
          We accept custom orders for weddings, festivals and corporate events. Minimum order quantity applies for bulk and custom packaging. Delivery across India within 2–4 days.
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
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input type="text" className="form-input" placeholder="Ramesh Kumar" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="tel" className="form-input" placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Occasion</label>
            <select className="form-select">
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
            <label className="form-label">Your Order Details</label>
            <textarea
              className="form-textarea"
              placeholder="e.g. 2kg Kaju Katli, 1kg Pista Roll, Royal Hamper x5..."
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Delivery City</label>
              <input type="text" className="form-input" placeholder="Jamshedpur / Delhi / Mumbai" />
            </div>
            <div className="form-group">
              <label className="form-label">Delivery Date</label>
              <input type="date" className="form-input" />
            </div>
          </div>
          <button className="form-submit" onClick={handleSubmit}>
            Send Order Request →
          </button>
        </div>
      </FadeIn>
    </section>
  );
}
