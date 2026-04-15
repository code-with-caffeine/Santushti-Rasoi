'use client';

import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, total } = useCart();

  const handleCheckout = () => {
    closeCart();
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={closeCart} />
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-drawer-head">
          <div className="cart-drawer-title">Your Order</div>
          <button className="cart-close" onClick={closeCart}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Your cart is empty.<br />Add some sweets to begin.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.name} className="cart-item">
                <div className="cart-item-icon">{item.icon}</div>
                <div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-qty">Qty: {item.qty}</div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.name)}>
                    Remove
                  </button>
                </div>
                <div className="cart-item-price">
                  ₹{(item.price * item.qty).toLocaleString('en-IN')}
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Order Total</span>
              <span className="cart-total-val">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button className="cart-checkout-btn" onClick={handleCheckout}>
              Proceed to Order →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
