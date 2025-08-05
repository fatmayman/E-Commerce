import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={12}
        className={index < Math.floor(rating) ? 'star-filled' : 'star-empty'}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <div className="product-card">
      <div className="position-relative">
        <img
          src={product.imageCover}
          className="product-card-image"
          alt={product.title}
        />
        {product.priceAfterDiscount && (
          <span className="position-absolute top-0 start-0 badge bg-danger m-2">
            SALE
          </span>
        )}
      </div>
      
      <div className="product-card-body">
        <div className="product-card-brand">
          {product.brand?.name}
        </div>
        
        <h6 className="product-card-title">
          {product.title.length > 50 ? `${product.title.substring(0, 50)}...` : product.title}
        </h6>
        
        <div className="product-card-rating">
          <div className="product-card-stars">
            {renderStars(product.ratingsAverage)}
          </div>
          <span className="product-card-rating-text">({product.ratingsQuantity})</span>
        </div>
        
        <div className="product-card-price">
          {product.priceAfterDiscount ? (
            <>
              <span>${product.priceAfterDiscount}</span>
              <small className="text-muted text-decoration-line-through ms-2">
                ${product.price}
              </small>
            </>
          ) : (
            <span>${product.price}</span>
          )}
        </div>
        
        <div className="product-card-actions">
          <Link
            to={`/product/${product._id}`}
            className="product-card-btn product-card-btn-secondary"
          >
            <Eye size={14} className="me-1" />
            {t('product.viewDetails')}
          </Link>
          
          <button
            onClick={handleAddToCart}
            className="product-card-btn product-card-btn-primary"
          >
            <ShoppingCart size={14} className="me-1" />
            {t('product.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

