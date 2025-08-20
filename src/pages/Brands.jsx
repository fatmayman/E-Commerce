import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchBrands } from '../services/api';
import BrandCard from '../components/BrandCard';
import { Loader2, AlertCircle } from 'lucide-react';
import './Brands.css';

const Brands = () => {
  const { t } = useTranslation();
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        setIsLoading(true);
        const response = await fetchBrands();
        setBrands(response || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching brands:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBrands();
  }, []);

  if (isLoading) {
    return (
      <div className="container brands-container">
        <div className="loading-container">
          <div>
            <Loader2 className="loading-spinner" />
            <p>{t('common.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container brands-container">
        <div className="error-container">
          <div>
            <AlertCircle className="error-icon" />
            <h2 className="error-message">{t('common.error')}</h2>
            <p className="error-text">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary try-again-btn"
            >
              {t('common.tryAgain')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container brands-container">
      <div className="brands-header">
        <h1>{t('brands.title')}</h1>
        <p>{t('brands.allBrands')}</p>
      </div>

      {brands.length === 0 ? (
        <div className="no-brands-message">
          <p>{t('brands.noBrands')}</p>
        </div>
      ) : (
        <div className="brands-grid">
          {brands.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Brands;


