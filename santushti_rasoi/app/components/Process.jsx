import FadeIn from './FadeIn';

const STEPS = [
  { num: '01', icon: '🌾', title: 'Source', desc: 'Single-origin ingredients. Cashews from Goa, saffron from Pampore, A2 ghee from Mathura.' },
  { num: '02', icon: '🪨', title: 'Stone Grind', desc: 'Nuts are stone-ground at dawn, preserving oils and natural flavour compounds.' },
  { num: '03', icon: '🔥', title: 'Slow Cook', desc: 'Copper kadhai, low flame, constant stirring. No shortcuts. Some halwas take 6+ hours.' },
  { num: '04', icon: '🤲', title: 'Hand Shape', desc: 'Every piece is shaped by hand by karigars with 20+ years of experience. No moulds.' },
  { num: '05', icon: '✨', title: 'Finish', desc: 'Silver varq applied by hand, rose petals placed individually, each box inspected before dispatch.' },
];

const HIGHLIGHTS = [
  { num: '6hrs', label: 'Average cook time for premium Mithais' },
  { num: 'Zero', label: 'Preservatives or artificial colours ever used' },
  { num: '100%', label: 'A2 desi ghee in every preparation' },
];

export default function Process() {
  return (
    <section className="process" id="process">
      <FadeIn className="process-header">
        <div className="section-label centered">The Santushti Rasoi Method</div>
        <h2 className="section-title light" style={{ textAlign: 'center' }}>
          Five steps to <em>perfection</em>
        </h2>
      </FadeIn>

      <div className="process-steps">
        {STEPS.map((step, i) => (
          <FadeIn key={step.num} delay={i} className="process-step">
            <div className="step-num">{step.num}</div>
            <div className="step-icon">{step.icon}</div>
            <div className="step-title">{step.title}</div>
            <div className="step-desc">{step.desc}</div>
          </FadeIn>
        ))}
      </div>

      <div className="process-highlight">
        {HIGHLIGHTS.map((h, i) => (
          <FadeIn key={i} className="process-highlight-card">
            <div className="highlight-num">{h.num}</div>
            <div className="highlight-label">{h.label}</div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
