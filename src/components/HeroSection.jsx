import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCategories } from '../services/api';
import './HeroSection.css';

const HeroSection = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.slice(0, 8));
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    if (!loading) {
      const carouselElement = document.querySelector('#heroCarousel');
      if (carouselElement) {
        const carouselInstance = window.bootstrap.Carousel.getOrCreateInstance(carouselElement);
        carouselInstance.cycle();
      }
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="hero-section bg-light py-5">
        <div className="container text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-section">
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-pause="false">
        <div className="carousel-indicators custom-indicators">
          {categories.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {categories.map((category, index) => (
            <div key={category._id}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              data-bs-interval="3000">
              <div
                className="hero-slide d-flex align-items-center justify-content-center"
                style={{
                  height: '100vh',
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                <div className="container text-center text-white">
                  <h1 className="display-4 fw-bold mb-3">{t('hero.welcome')}</h1>
                  <h2 className="h3 mb-4">{category.name}</h2>
                  <p className="lead mb-4">{t('hero.subtitle')}</p>
                  <button
                    className="btn btn-light btn-lg"
                    onClick={scrollToProducts}
                  >
                    {t("hero.shopNow")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;


