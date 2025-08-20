import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import logoLight from '../assets/default-monochrome.svg';
import logoDark from '../assets/default-monochrome-white.svg';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState({ name: '', email: '', message: '' });
  const logoSrc = theme === 'dark' ? logoDark : logoLight;

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (newRating.name && newRating.email && newRating.message) {
      setRatings([...ratings, newRating]);
      setNewRating({ name: '', email: '' , message: '' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        {ratings.length > 0 && (
          <div className="rating-display mb-4">
            <h3>{t('footer.ratings')}</h3>
            {ratings.map((rating, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">{rating.name}</h5>
                  <p className="card-text">{rating.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="row">
          <div className="col-md-6 mb-3">
            <h4>{t('footer.rateUs')}</h4>
            <form onSubmit={handleRatingSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t('footer.name')}
                  value={newRating.name}
                  onChange={(e) => setNewRating({ ...newRating, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder={t('footer.email')}
                  value={newRating.email}
                  onChange={(e) => setNewRating({ ...newRating, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder={t('footer.message')}
                  value={newRating.message}
                  onChange={(e) => setNewRating({ ...newRating, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">{t('footer.send')}</button>
            </form>
          </div>
          <div className=" social-links col-md-6 d-flex flex-column justify-content-center align-items-center">
            <img src={logoSrc} alt="Illurea Logo" className="logo-footer" />
            <p>&copy; {new Date().getFullYear()} Illurea {t('footer.rightsReserved')}</p>
            <div>
              <a href="https://www.linkedin.com/in/fatmayman/" target="_blank" rel="noopener noreferrer" className="me-3">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/fatmayman" target="_blank" rel="noopener noreferrer" className="me-3">
                <Github size={24} />
              </a>
              <a href="mailto:1fatymayman@gmail.com"  className="me-3">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
   );
};

export default Footer;


