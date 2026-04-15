import FadeIn from './FadeIn';

const POSTS = [
  {
    cls: 'blog-b1', icon: '🧑‍🍳', cat: 'Heritage · 8 min read', featured: true,
    title: 'The Copper Kadhai: Why We Still Cook the Old Way',
    excerpt: 'In a world of automated sweet factories, we still stir our halwas by hand in copper kadhai over a slow flame. Here\'s why this 60-year-old practice is non-negotiable at Santushti Rasoi.',
    author: 'Rameshwar Prasad III', date: '12 Nov 2024',
  },
  {
    cls: 'blog-b2', icon: '🌸', cat: 'Recipes · 5 min read',
    title: 'Making Kaju Katli at Home: Our Family\'s Recipe',
    excerpt: 'For the first time, we share the method behind Bihar\'s most sought-after cashew diamond.',
    author: 'Sunita Devi', date: '5 Nov 2024',
  },
  {
    cls: 'blog-b3', icon: '🌾', cat: 'Sourcing · 4 min read',
    title: 'Why We Travel to Pampore for Our Saffron',
    excerpt: 'Every gram of kesar in our sweets is hand-harvested in Kashmir\'s Pampore valley. We visit every year.',
    author: 'Mahesh Yadav', date: '28 Oct 2024',
  },
];

export default function Blog() {
  return (
    <section className="blog" id="blog">
      <div className="blog-header">
        <FadeIn>
          <div className="section-label">From Our Kitchen</div>
          <h2 className="section-title">Stories & <em>Recipes</em></h2>
        </FadeIn>
        <button className="btn-ghost">All Stories →</button>
      </div>

      <div className="blog-grid">
        {POSTS.map((post, i) => (
          <FadeIn key={i} delay={i} className={`blog-card ${post.featured ? 'featured' : ''}`}>
            <div className="blog-img-wrap">
              <div className={`blog-image ${post.cls}`}>{post.icon}</div>
            </div>
            <div className="blog-category">{post.cat}</div>
            <div className="blog-title">{post.title}</div>
            <div className="blog-excerpt">{post.excerpt}</div>
            <div className="blog-meta">
              <span>{post.author}</span>
              <span>·</span>
              <span>{post.date}</span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
