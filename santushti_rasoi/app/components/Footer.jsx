const COLLECTIONS = [
  { href: '#categories', label: 'Traditional Mithai' },
  { href: '#dry-sweets', label: 'Dry Sweets' },
  { href: '#products', label: 'Halwa & Burfi' },
  { href: '#seasonal', label: 'Seasonal Specials' },
  { href: '#products', label: 'Sugar Free Range' },
];

const SERVICES = [
  { href: '#gifting', label: 'Corporate Gifting' },
  { href: '#gifting', label: 'Wedding Orders' },
  { href: '#gifting', label: 'Custom Packaging' },
  { href: '#order', label: 'Pan India Delivery' },
  { href: '#order', label: 'Bulk Orders' },
];

const COMPANY = [
  { href: '#heritage', label: 'Our Story' },
  { href: '#karigars', label: 'Our Karigars' },
  { href: '#process', label: 'Quality Promise' },
  { href: '#faq', label: 'FAQ' },
  { href: '#blog', label: 'Stories & Recipes' },
  { href: '#loyalty', label: 'Rewards Club' },
];

export default function Footer() {
  return (
    <>
      <div className="gold-line" />
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-brand">Santushti <span>Rasoi</span></div>
            <p className="footer-tagline">
              Artisan Indian sweets and premium dry sweets from the heart of Jamshedpur, Jharkhand. Crafted with love since 2014.
            </p>
            <div className="footer-social">
              {['ig', 'fb', 'wa', 'yt'].map(s => (
                <a key={s} href="#" className="social-btn">{s}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Collections</div>
            <ul className="footer-links">
              {COLLECTIONS.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              {SERVICES.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              {COMPANY.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2024 Santushti Rasoi. All rights reserved. FSSAI Lic. 10019022007790</span>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
            <a href="#">Shipping Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
}
