'use client';

import { useEffect, useRef } from 'react';

export default function FadeIn({ children, className = '', delay = 0, style = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay === 1 ? 'delay-1' : delay === 2 ? 'delay-2' : delay === 3 ? 'delay-3' : '';

  return (
    <div ref={ref} className={`fade-in ${delayClass} ${className}`} style={style}>
      {children}
    </div>
  );
}
