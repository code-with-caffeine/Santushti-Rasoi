'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = useCallback((msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  }, []);

  const addToCart = useCallback((name, price, icon) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === name);
      if (existing) return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name, price, icon, qty: 1 }];
    });
    setIsCartOpen(true);
    showToast(`${name} added to cart`);
  }, [showToast]);

  const removeFromCart = useCallback((name) => {
    setCart(prev => prev.filter(i => i.name !== name));
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isCartOpen, openCart, closeCart, total, count, toast }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
