import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// افترض أن هذه الخدمات موجودة وتعمل بشكل صحيح
// import { fetchProducts, fetchBrands } from '../services/api'; 
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
        setLoading(false);
        setProducts([]);
        setBrands([]);
        return;
      }

      // --- هذا هو الجزء الذي تم إصلاحه ---
      try {
        setLoading(true);
        
        // ملاحظة: بما أنك لا تملكين API حقيقية، سأقوم بمحاكاة البيانات هنا
        // في مشروعك الحقيقي، ستستخدمين fetchProducts() و fetchBrands()
        // const [productsResponse, brandsResponse] = await Promise.all([
        //   fetchProducts(),
        //   fetchBrands()
        // ]);
        // const allProducts = productsResponse.data || [];
        // const allBrands = brandsResponse.data || [];

        // --- بيانات وهمية للمحاكاة ---
        const allProducts = [
          { _id: 1, title: 'Laptop Pro', price: 1200, imageCover: 'https://via.placeholder.com/250' },
          { _id: 2, title: 'Gaming Mouse', price: 75, imageCover: 'https://via.placeholder.com/250' },
          { _id: 3, title: 'Mechanical Keyboard', price: 150, imageCover: 'https://via.placeholder.com/250' }
        ];
        const allBrands = [
          { _id: 1, name: 'Apple', image: 'https://via.placeholder.com/250' },
          { _id: 2, name: 'Logitech', image: 'https://via.placeholder.com/250' }
        ];
        // --- نهاية البيانات الوهمية ---
        
        const filteredProducts = allProducts.filter(product =>
          product.title.toLowerCase( ).includes(query.toLowerCase())
        );

        const filteredBrands = allBrands.filter(brand =>
          brand.name.toLowerCase().includes(query.toLowerCase())
        );

        setProducts(filteredProducts);
        setBrands(filteredBrands);

      } catch (err) { // <-- كتلة catch التي كانت مفقودة
        setError(err.message);
      } finally { // <-- كتلة finally التي كانت مفقودة
        setLoading(false);
      }
      // --- نهاية الجزء الذي تم إصلاحه ---
    };

    searchItems();
  }, [query]); // تم حذف navigate من هنا لأنها لا تتغير

  if (loading) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 pt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  const totalResults = products.length + brands.length;

  return (
    <div className="container mt-5 pt-5">
      <div className="mb-4">
        {query ? (
          <>
            <h1 className="h3">{t('search.results')} "{query}"</h1>
            <p className="text-muted">{totalResults} {t('search.productsFound', { count: totalResults })}</p>
          </>
        ) : (
          <h1 className="h3">{t('nav.search')}</h1>
        )}
      </div>

      {query && totalResults === 0 && !loading && (
        <div className="alert alert-warning">
          No products or brands found matching your search.
        </div>
      )}

      {/* Brands Results */}
      {brands.length > 0 && (
        <div className="mb-5">
          <h2 className="h4 mb-3">{t('brands.title')}</h2>
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
          <h2 className="h4 mb-3">{t('products.title')}</h2>
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
