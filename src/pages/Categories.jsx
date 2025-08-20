import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCategories } from '../services/api';

const Categories = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

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

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4">{t('nav.categories')}</h1>
        <p className="lead">{t('categories.subtitle')}</p>
      </div>

      <div className="row">
        {categories.map((category) => (
          <div key={category._id} className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={category.image}
                className="card-img-top"
                alt={category.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{category.name}</h5>
                <div className="mt-auto">
                  <button className="btn btn-primary w-100">
                    {t('categories.explore')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;


