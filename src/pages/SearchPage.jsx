import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchProducts, fetchBrands } from '../services/api';
import ProductCard from '../components/ProductCard';
import BrandCard from '../components/BrandCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchItems = async () => {
      if (!query) {
        navigate('/404');
        return;
      }

      try {
        setLoading(true);
        
        // Search in both products and brands
        const [productsResponse, brandsResponse] = await Promise.all([
        fetchProducts(),
        fetchBrands()
        ]);

        const allProducts = productsResponse.data || [];
        const allBrands = brandsResponse.data || [];
        
        // Exact search - case insensitive
        const filteredProducts = allProducts.filter(product =>
          product.title.toLowerCase() === query.toLowerCase()
        );

        const filteredBrands = allBrands.filter(brand =>
          brand.name.toLowerCase() === query.toLowerCase()
        );

        // If no exact matches found, redirect to 404
        if (filteredProducts.length === 0 && filteredBrands.length === 0) {
          navigate('/404');
          return;
        }

        setProducts(filteredProducts);
        setBrands(filteredBrands);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    searchItems();
  }, [query, navigate]);

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

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  const totalResults = products.length + brands.length;

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h1 className="h3">{t('search.results')} "{query}"</h1>
        <p className="text-muted">{totalResults} {t('search.resultsFound')}</p>
      </div>

      {/* Brands Results */}
      {brands.length > 0 && (
        <div className="mb-5">
          <h2 className="h4 mb-3">{t('search.brands')}</h2>
          <div className="row">
            {brands.map((brand) => (
              <div key={brand._id} className="col-md-6 col-lg-3 mb-4">
                <BrandCard brand={brand} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Results */}
      {products.length > 0 && (
        <div className="mb-5">
          <h2 className="h4 mb-3">{t('search.products')}</h2>
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-6 col-lg-3 mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

