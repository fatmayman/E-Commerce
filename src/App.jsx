import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Context Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Brands from './pages/Brands';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';

// Import i18n configuration
import './utils/i18n';
import './App.css';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set document direction based on language
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Public routes without layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Routes with layout */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/brands" element={<Layout><Brands /></Layout>} />
                <Route path="/categories" element={<Layout><Categories /></Layout>} />
                <Route path="/cart" element={<Layout><Cart /></Layout>} />
                <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
                <Route path="/search" element={<Layout><SearchPage /></Layout>} />
                
                {/* Protected routes */}
                <Route 
                  path="/profile" 
                  element={
                    <Layout>
                      <ProtectedRoute>
                        <div className="container mt-5">
                          <h1>Profile Page</h1>
                          <p>This is a protected route. Only authenticated users can see this.</p>
                        </div>
                      </ProtectedRoute>
                    </Layout>
                  } 
                />
                
                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

