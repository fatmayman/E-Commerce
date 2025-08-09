import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { User, ShoppingCart, Moon, Sun, Globe, Search, X, Menu } from 'lucide-react';
import logoLight from '../assets/default-monochrome.svg';
import logoDark from '../assets/default-monochrome-white.svg';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const logoSrc = theme === 'dark' ? logoDark : logoLight;

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

 const handleSearchSubmit = (e) => {
  e.preventDefault();
  };

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    logout();
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    navigate('/');
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-top-bar">
        <div className="header-section left">
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <div className="desktop-icons" style={{ display: 'flex', gap: '17px' }}>
            <button onClick={toggleTheme} className="theme-toggle-btn" title={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}>
              {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <button onClick={handleLanguageToggle} className="btn btn-link p-0" title={t('common.language')}>
              <Globe size={22} />
            </button>
          </div>
        </div>

        <div className="header-section center-logo">
          <Link to="/" className="navbar-brand logo-container">
            <img src={logoSrc} alt="Illurea" className="logo-img" />
          </Link>
        </div>

        <div className="header-section right">
          <div className="user-actions-container">
            <div className="header-search-container">
              <form onSubmit={handleSearchSubmit} className={`search-form ${isSearchOpen ? 'open' : ''}`}>
                <input
                  type="text"
                  className="search-input"
                  placeholder={t('nav.search') + '...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="btn btn-link p-0" aria-label="Toggle search">
                {isSearchOpen ? <X size={22} /> : <Search size={22} />}
              </button>
            </div>
            <div className="dropdown">
              <button className="btn btn-link p-0" data-bs-toggle="dropdown" aria-expanded="false" aria-label="User menu">
                <User size={22} className="user-icon" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {user ? (
                  <>
                    <li><Link to="/profile" className="dropdown-item">{t('nav.profile')}</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button onClick={handleLogout} className="dropdown-item">{t('nav.logout')}</button></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login" className="dropdown-item">{t('nav.login')}</Link></li>
                    <li><Link to="/register" className="dropdown-item">{t('nav.register')}</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <Link to="/cart" className="btn btn-link p-0 cart-link" aria-label={`Cart with ${cartItemCount} items`}>
            <ShoppingCart size={22} className="cart-icon" />
            {cartItemCount > 0 && <span className="cart-count">({cartItemCount})</span>}
          </Link>
        </div>
      </div>

      <div className="header-bottom-nav">
        <nav className="navbar navbar-expand">
          <ul className="navbar-nav">
            <li className="nav-item"><Link to="/" className="nav-link">{t('nav.home')}</Link></li>
            <li className="nav-item"><Link to="/categories" className="nav-link">{t('nav.categories')}</Link></li>
            <li className="nav-item"><Link to="/brands" className="nav-link">{t('nav.brands')}</Link></li>
          </ul>
        </nav>
      </div>

      <div className="mobile-nav-container">
        <form onSubmit={handleSearchSubmit} className="header-search-container">
          <input
            type="text"
            className="search-input"
            placeholder={t('nav.search') + '...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-link p-0"><Search size={22} /></button>
        </form>

        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item"><Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</Link></li>
            <li className="nav-item"><Link to="/categories" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.categories')}</Link></li>
            <li className="nav-item"><Link to="/brands" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.brands')}</Link></li>
          </ul>
        </nav>

        <div className="user-actions-container">
          {user ? (
            <>
              <Link to="/profile" className="btn btn-outline-primary w-100" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.profile')}</Link>
              <button onClick={handleLogout} className="btn btn-outline-secondary w-100">{t('nav.logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary w-100" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.login')}</Link>
              <Link to="/register" className="btn btn-secondary w-100" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.register')}</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


