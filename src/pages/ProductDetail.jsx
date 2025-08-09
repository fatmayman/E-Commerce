import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { fetchProductById } from '../services/api';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }ش
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(rating) ? 'text-warning' : 'text-muted'}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error || t('product.notFound')}
        </div>
      </div>
    );
  }

  const images = [product.imageCover, product.imageCover, product.imageCover];

  return (
    <div className="container mt-5">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline-secondary mb-4"
      >
        <ArrowLeft size={16} className="me-2" />
        {t('common.back')}
      </button>

      <div className="row">
        <div className="col-md-6">
          <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators custom-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide-to={index}
                  className={index === selectedImageIndex ? 'active' : ''}
                  aria-current={index === selectedImageIndex ? 'true' : 'false'}
                  onClick={() => setSelectedImageIndex(index)}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {images.map((image, index) => (
                <div key={index} className={`carousel-item ${index === selectedImageIndex ? 'active' : ''}`}>
                  <img
                    src={image}
                    className="d-block w-100"
                    alt={`${product.title} - Image ${index + 1}`}
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev custom-carousel-control" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon custom-carousel-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next custom-carousel-control" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon custom-carousel-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <div className="product-details">
            <h1 className="h2 mb-3">{product.title}</h1>
            
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex me-2">
                {renderStars(product.ratingsAverage)}
              </div>
              <span className="text">
                ({product.ratingsQuantity} {t('product.reviews')})
              </span>
            </div>

            <div className="mb-3">
              <span className="badge bg-secondary me-2">{product.brand?.name}</span>
              <span className="badge bg-info">{product.category?.name}</span>
            </div>

            <p className="lead mb-4">{product.description}</p>

            <div className="mb-4">
              <h3 className="h4 text-primary">EGP {product.price}</h3>
            </div>

            <div className="d-grid gap-2">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg"
              >
                <ShoppingCart size={20} className="me-2" />
                {t('product.addToCart')}
              </button>
            </div>

            <div className="mt-4">
              <h5>{t('product.specifications')}</h5>
              <ul className="list-unstyled">
                <li><strong>{t('product.brand')}:</strong> {product.brand?.name}</li>
                <li><strong>{t('product.category')}:</strong> {product.category?.name}</li>
                <li><strong>{t('product.subcategory')}:</strong> {product.subcategory?.[0]?.name}</li>
                <li><strong>{t('product.quantity')}:</strong> {product.quantity}</li>
                <li><strong>{t('product.sold')}:</strong> {product.sold}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


