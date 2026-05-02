import FadeIn from './FadeIn';

const FEATURES = [
  { icon: '🌿', title: 'No Preservatives', desc: 'Made fresh every morning with zero additives or artificial colours.' },
  { icon: '🥛', title: 'Pure Desi Ghee', desc: 'We use only A2 bilona ghee from our partner farms in Mathura.' },
  { icon: '🧵', title: 'Handcrafted', desc: 'Our karigars have 20+ years of experience in traditional mithai-making.' },
  { icon: '🪐', title: 'FSSAI Certified', desc: 'All preparations are certified, hygienically packed and quality tested.' },
];

export default function Heritage() {
  return (
    <section className="heritage" id="heritage">
      <FadeIn>
        <div className="section-label">Our Story</div>
        <h2 className="section-title light">A Legacy Born in <em>Jamshedpur</em></h2>
        <p className="heritage-text">
          In 2014, our founders set up a modest sweet shop in the heart of Jamshedpur. What began with a single copper
          kadhai and a handful of recipes has grown into Jharkhand&apos;s most trusted name
          in artisan sweets.
          <br /><br />
          Every mithai we craft carries the weight of that original promise — only the finest ingredients, no shortcuts,
          no compromises. We still use stone-ground flours, single-origin saffron from Kashmir, and A2 desi ghee. Three
          generations later, the kadhai still simmers at dawn.
        </p>
        <div className="heritage-features">
          {FEATURES.map(f => (
            <div key={f.title} className="heritage-feature">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" width="100%">
          <rect width="400" height="500" fill="#2A1F08"/>
          <rect x="20" y="20" width="360" height="460" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3"/>
          <rect x="30" y="30" width="340" height="440" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.15"/>
          <g fill="#C9A84C" opacity="0.5">
            <polygon points="20,20 36,20 20,36"/><polygon points="380,20 364,20 380,36"/>
            <polygon points="20,480 36,480 20,464"/><polygon points="380,480 364,480 380,464"/>
          </g>
          <circle cx="200" cy="220" r="120" fill="#3D2B0F"/>
          <circle cx="200" cy="220" r="110" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.4"/>
          <ellipse cx="200" cy="260" rx="55" ry="15" fill="#8B6914" opacity="0.6"/>
          <path d="M148 220 Q145 260 155 268 Q200 275 245 268 Q255 260 252 220" fill="#C9A84C" opacity="0.8"/>
          <ellipse cx="200" cy="220" rx="52" ry="16" fill="#E8C97E" opacity="0.9"/>
          <path d="M185 200 Q190 185 185 170" fill="none" stroke="rgba(250,247,240,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M200 195 Q205 178 200 162" fill="none" stroke="rgba(250,247,240,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M215 200 Q210 185 215 170" fill="none" stroke="rgba(250,247,240,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="100" cy="120" r="2" fill="#C9A84C" opacity="0.6"/>
          <circle cx="300" cy="140" r="1.5" fill="#C9A84C" opacity="0.4"/>
          <text x="200" y="380" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="13" fill="#C9A84C" letterSpacing="4">Since 2014</text>
          <text x="200" y="400" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="10" fill="rgba(250,247,240,0.4)" letterSpacing="2">Jamshedpur, Jharkhand</text>
          <text x="200" y="445" textAnchor="middle" fontSize="20">🌸</text>
        </svg>
      </FadeIn>
    </section>
  );
}
