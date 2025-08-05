import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { Search, User, ShoppingCart, Moon, Sun, Globe } from 'lucide-react';
import logo from '../assets/default-monochrome.png';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar navbar-expand-lg">
          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Navigation Links */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">{t('nav.home')}</Link>
              </li>
              <li className="nav-item">
                <Link to="/brands" className="nav-link">{t('nav.brands')}</Link>
              </li>
              <li className="nav-item">
                <Link to="/categories" className="nav-link">{t('nav.categories')}</Link>
              </li>
            </ul>

              <div className="container">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Illurea" className="logo-img" />
          </Link>

            {/* Search Form */}
            <form className="d-flex me-3 custom-search-form " onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t('nav.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-outline-secondary">
                  <Search size={16} className="search-icon" />
                </button>
              </div>
            </form>

            {/* Right Side Icons */}
            <div className="d-flex align-items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={handleLanguageToggle}
                className="btn btn-link p-0"
                title={t('common.language')}
              >
                <Globe size={20} />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                title={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Cart */}
              <Link to="/cart" className="btn btn-link p-0 position-relative">
                <ShoppingCart size={20} className="cart-icon" />
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </Link>

              {/* User Menu */}
              <div className="dropdown">
                <button
                  className="btn btn-link p-0"
                  data-bs-toggle="dropdown"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <User size={20} className="user-icon" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {user ? (
                    <>
                      <li>
                        <Link to="/profile" className="dropdown-item">
                          {t('nav.profile')}
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button onClick={handleLogout} className="dropdown-item">
                          {t('nav.logout')}
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/login" className="dropdown-item">
                          {t('nav.login')}
                        </Link>
                      </li>
                      <li>
                        <Link to="/register" className="dropdown-item">
                          {t('nav.register')}
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

