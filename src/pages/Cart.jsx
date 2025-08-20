import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const { t } = useTranslation();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container cart-container">
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <ShoppingBag size={80} />
          </div>
          <h2 className="empty-cart-title">{t('cart.empty')}</h2>
          <p className="empty-cart-description">
            Start shopping to add items to your cart
          </p>
          <Link to="/" className="continue-shopping-btn">
            <ArrowLeft size={18} className="me-2" />
            {t('cart.continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-container">
      <div className="cart-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="cart-title">{t('cart.title')}</h1>
          <p className="cart-subtitle">{cartItems.length} items in your cart</p>
        </div>
        <Link to="/" className="btn btn-outline-primary">
          {t('cart.continueShopping')}
        </Link>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="d-flex align-items-center">
                <img
                  src={item.imageCover || item.image}
                  alt={item.title}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="text-muted mb-1">
                    {t('products.brand')}: {item.brand?.name || 'N/A'}
                  </p>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      className="quantity-input"
                      min="1"
                    />
                    
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                    title={t('cart.remove')}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span className="text-success">Free</span>
            </div>
            
            <div className="summary-total summary-row">
              <span>{t('cart.total')}</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>

            <button className="checkout-btn">
              {t('cart.checkout')}
            </button>

            <p className="text-center text-muted mt-3" style={{ fontSize: '0.75rem' }}>
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


