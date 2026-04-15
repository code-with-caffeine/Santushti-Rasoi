'use client';

import { useState } from 'react';
import { CartProvider } from './context/CartContext';

import Navbar      from './components/Navbar';
import CartDrawer  from './components/CartDrawer';
import Toast       from './components/Toast';
import Hero        from './components/Hero';
import MarqueeBar  from './components/MarqueeBar';
import Categories  from './components/Categories';
import Products    from './components/Products';
import Process     from './components/Process';
import Heritage    from './components/Heritage';
import Seasonal    from './components/Seasonal';
import Karigars    from './components/Karigars';
import DrySweets   from './components/DrySweets';
import Gifting     from './components/Gifting';
import Loyalty     from './components/Loyalty';
import FAQ         from './components/FAQ';
import Blog        from './components/Blog';
import Newsletter  from './components/Newsletter';
import Testimonials from './components/Testimonials';
import OrderCTA    from './components/OrderCTA';
import Footer      from './components/Footer';

function PageContent() {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilter = (cat) => {
    setActiveFilter(cat);
    // Map category IDs from Categories section to Products tab IDs
    const map = { traditional: 'traditional', halwa: 'halwa', dry: 'dry', gifting: 'all' };
    setActiveFilter(map[cat] || cat);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <Toast />

      <main>
        <Hero />
        <MarqueeBar />
        <Categories onFilter={handleFilter} />
        <Products activeFilter={activeFilter} onFilter={setActiveFilter} />
        <Process />
        <Heritage />
        <Seasonal />
        <Karigars />
        <DrySweets />
        <Gifting />
        <Loyalty />
        <FAQ />
        <Blog />
        <Newsletter />
        <Testimonials />
        <OrderCTA />
        <Footer />
      </main>
    </>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <PageContent />
    </CartProvider>
  );
}
