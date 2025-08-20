import React from 'react';
import { Link } from 'react-router-dom';
import './BrandCard.css';

const BrandCard = ({ brand }) => {
  return (
    <Link
      to={`/brands/${brand._id}`}
      className="brand-card"
    >
      <div className="brand-card-image-container">
        <img
          src={brand.image || 'https://via.placeholder.com/200'}
          alt={brand.name}
          className="brand-card-image"
          loading="lazy"
        />
      </div>

      <div className="brand-card-body">
        <h3 className="brand-card-name">
          {brand.name}
        </h3>
        
        {brand.productCount && (
          <p className="brand-card-slug">
            {brand.productCount} products
          </p>
        )}
      </div>
    </Link>
  );
};

export default BrandCard;


