import FadeIn from './FadeIn';

const KARIGARS = [
  { name: 'Sheela Kumari', role: 'Head Karigar', spec: 'Kaju Katli & Barfi Specialist', exp: '32 years', cls: 'ka-1', icon: '👩‍🍳' },
  { name: 'Indu Devi', role: 'Halwa Specialist', spec: 'Gajar & Moong Halwa Expert', exp: '36 years', cls: 'ka-2', icon: '👩‍🍳' },
  { name: 'Mahesh Yadav', role: 'Ladoo Master', spec: 'Motichoor & Besan Ladoo', exp: '19 years', cls: 'ka-3', icon: '👨‍🍳' },
  { name: 'Suresh Kumar', role: 'Dry Sweets Artisan', spec: 'Anjeer Barfi & Dry Fruit Rolls', exp: '15 years', cls: 'ka-4', icon: '👨‍🍳' },
];

export default function Karigars() {
  return (
    <section className="karigars" id="karigars">
      <FadeIn className="karigars-header">
        <div className="section-label centered">The Hands Behind Every Sweet</div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Meet Our <em>Karigars</em></h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '55ch', margin: '1rem auto 0', textAlign: 'center', fontWeight: 300, lineHeight: 1.8 }}>
          Our master sweet-makers carry traditions that span generations. Each karigar specialises in their chosen craft — a lifetime of dedication poured into every preparation.
        </p>
      </FadeIn>

      <div className="karigars-grid">
        {KARIGARS.map((k, i) => (
          <FadeIn key={k.name} delay={i} className="karigar-card">
            <div className="karigar-avatar">
              <div className={`karigar-portrait ${k.cls}`}>{k.icon}</div>
              <span className="karigar-exp">{k.exp}</span>
            </div>
            <div className="karigar-name">{k.name}</div>
            <div className="karigar-role">{k.role}</div>
            <div className="karigar-spec">{k.spec}</div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
