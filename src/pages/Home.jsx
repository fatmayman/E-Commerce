import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';

const Home = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center" role="alert">
          <h4 className="alert-heading">{t('common.error')}</h4>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            {t('common.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection />

      <div id="products-section" className="container my-5">
        <div className="text-center mb-5">
          <h2 className="display-5">{t('products.title')}</h2>
          <p className="lead">{t('products.subtitle')}</p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">{t('products.noProducts')}</p>
          </div>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-6 col-lg-3 mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


