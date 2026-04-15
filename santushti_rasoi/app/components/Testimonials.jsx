import FadeIn from './FadeIn';

const REVIEWS = [
  {
    stars: '★★★★★',
    text: '"The Kaju Katli melted the moment it touched my tongue. My mother-in-law, who has eaten sweets across Rajasthan, declared it the finest she\'d ever had."',
    initials: 'PD', name: 'Priya Dubey', city: 'Jamshedpur, Bihar',
  },
  {
    stars: '★★★★★',
    text: '"We ordered the Royal Hamper for Diwali gifting to our 50 employees. Every single box was perfect — beautifully packed, incredibly fresh. Will order every year."',
    initials: 'RS', name: 'Rajesh Sinha', city: 'Delhi, NCR',
  },
  {
    stars: '★★★★★',
    text: '"The Anjeer Barfi is something I\'ve never tasted anywhere else in my 40 years of eating mithai. It\'s complex, not overly sweet, and hauntingly good."',
    initials: 'AM', name: 'Anita Mishra', city: 'Varanasi, UP',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <FadeIn style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="section-label centered">What People Say</div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          Loved by <em>Families</em> Across India
        </h2>
      </FadeIn>

      <div className="reviews-grid">
        {REVIEWS.map((r, i) => (
          <FadeIn key={i} delay={i} className="review-card">
            <div className="review-stars">{r.stars}</div>
            <p className="review-text">{r.text}</p>
            <div className="reviewer">
              <div className="reviewer-avatar">{r.initials}</div>
              <div>
                <div className="reviewer-name">{r.name}</div>
                <div className="reviewer-city">{r.city}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
