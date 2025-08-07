import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ArrowLeft } from 'lucide-react';
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
        
        <h1 className="not-found-title">
          {t('errors.404')}
        </h1>
        
        <p className="not-found-description">
        {t('errors.404Description')}
        </p>

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


