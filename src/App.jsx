import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Brands from './pages/Brands';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import './utils/i18n';
import './App.css';

const ThemedApp = () => {
  const { theme } = useContext(ThemeContext);
  const { i18n } = useTranslation();

  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    return () => {
      body.classList.remove('dark');
    };
  }, [theme]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/brands" element={<Layout><Brands /></Layout>} />
        <Route path="/brands/:id" element={<Layout><NotFound /></Layout>} />
        <Route path="/categories" element={<Layout><Categories /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
        
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
        
        <Route 
          path="/Home" 
          element={
            <Layout>
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            </Layout>
          } 
        />
        
        <Route path="*" element={<Layout><NotFound /></Layout>} />      </Routes>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ThemedApp />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;


