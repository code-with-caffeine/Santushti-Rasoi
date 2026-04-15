const ITEMS = [
  'Premium Kaju Katli', 'Pure Desi Ghee', 'No Preservatives',
  'Saffron from Kashmir', 'Pan India Delivery', 'Corporate Gifting',
  'Festival Specials', 'Made Fresh Daily', 'FSSAI Certified', 'A2 Bilona Ghee',
];

export default function MarqueeBar() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-bar">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            {item} <span className="marquee-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}
