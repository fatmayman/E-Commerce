import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ArrowLeft, Search } from 'lucide-react';
import './NotFound.css';
import errorImg from '../assets/error.png';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
<img src={errorImg} alt="404 ERROR" />
        </div>
        
        {/* 404 Number */}
        {/* <div className="not-found-number">
          404
        </div> */}
        
        {/* Error Message */}
        <h1 className="not-found-title">
          {t('errors.404')}
        </h1>
        
        <p className="not-found-description">
        The page you're looking for can’t be found.
        It might have been removed, had its name changed, or is temporarily unavailable.
        Please check the URL for mistakes and try again.
        Or return to the homepage to continue browsing.
        </p>

        {/* Actions */}
        <div className="not-found-buttons">
          <Link
            to="/"
            className="not-found-btn not-found-btn-primary"
          >
            <Home size={18} className="me-2" />
            {t('errors.goHome')}
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="not-found-btn not-found-btn-secondary"
          >
            <ArrowLeft size={18} className="me-2" />
            {t('common.back')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

