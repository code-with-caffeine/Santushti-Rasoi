'use client';

import { useState } from 'react';
import FadeIn from './FadeIn';

const FAQS = [
  {
    q: 'Do you deliver across India?',
    a: 'Yes, we deliver pan India via BlueDart and DTDC in temperature-controlled packaging. Delivery takes 1–2 days within Bihar and 2–4 days to other states. Orders placed before 11 AM are dispatched the same day.',
  },
  {
    q: 'What is the shelf life of your sweets?',
    a: 'Shelf life varies by product: Kaju Katli and dry sweets last 10–25 days. Fresh sweets like Rasgulla and Gulab Jamun should be consumed within 5 days. Halwas last 3–5 days. All products are clearly labelled with preparation and best-before dates.',
  },
  {
    q: 'Can you make sugar-free or diabetic-friendly sweets?',
    a: 'Yes, we have a dedicated sugar-free range sweetened with jaggery, stevia, or dates. Please mention your dietary requirements at the time of ordering and our team will curate options for you. We recommend consulting your physician before consuming these if you have a medical condition.',
  },
  {
    q: 'How far in advance should I place a wedding order?',
    a: 'For weddings, we recommend placing orders at least 4–6 weeks in advance. This allows time for custom packaging design, a tasting session, and seamless bulk preparation. During peak seasons (October–February), we advise booking even earlier.',
  },
  {
    q: 'Do you offer branded packaging for corporate orders?',
    a: 'Absolutely. For corporate orders of 25+ boxes, we offer fully custom packaging with your company\'s branding, personalised messages, and curated sweet selections aligned to your brand values. Minimum lead time is 10 working days for custom packaging.',
  },
  {
    q: 'Are your products vegetarian and free of artificial colour?',
    a: 'Every product we make is 100% vegetarian, FSSAI certified, and free of artificial colours and preservatives. We use only natural food-grade colours where colouring is required. Our ingredients list is available for every product on request.',
  },
  {
    q: 'What is your return or refund policy?',
    a: 'Due to the perishable nature of food, we do not accept returns. However, if your order arrives damaged or the quality does not meet our standards, please contact us within 24 hours of delivery with photos and we will arrange a full replacement or refund — no questions asked.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq" id="faq">
      <div className="faq-inner">
        <FadeIn>
          <div className="section-label">Questions</div>
          <h2 className="section-title">Everything<br />you need<br />to <em>know</em></h2>
          <div className="faq-contact">
            <div className="faq-contact-title">Still have questions?</div>
            <div className="faq-contact-text">
              Our team is available on WhatsApp, phone and email from 9 AM to 8 PM, seven days a week.
            </div>
            <a href="#order" className="btn-primary" style={{ fontSize: '0.68rem' }}>Contact Us →</a>
          </div>
        </FadeIn>

        <FadeIn delay={1} className="faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className={`faq-q ${openIndex === i ? 'open' : ''}`}
                onClick={() => toggle(i)}
              >
                {faq.q}
                <span className="faq-chevron">▾</span>
              </button>
              <div className={`faq-a ${openIndex === i ? 'open' : ''}`}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
