# Illurea E-commerce Website

A modern, responsive e-commerce website built with React, featuring bilingual support (English/Arabic), dark/light mode, and comprehensive shopping functionality.

## 🌟 Features

### ✨ Core Features
- **Bilingual Support**: English and Arabic with RTL support
- **Dark/Light Mode**: Custom theme toggle with moon/sun icon
- **Responsive Design**: Works on all devices
- **Product Catalog**: Browse products with detailed views
- **Shopping Cart**: Add, remove, and manage cart items
- **Brand Showcase**: Dedicated brands page
- **Categories**: Product categories with carousel
- **Search Functionality**: Exact search with 404 handling
- **User Authentication**: Login and register pages

### 🎨 Design Features
- **Hero Section**: Carousel with categories
- **Product Cards**: Compact, responsive design
- **Animated UI**: Smooth transitions and hover effects
- **Creative Auth Pages**: Colorful login/register forms
- **Custom 404 Page**: Animated not-found page
- **Rating System**: Star ratings for products
- **Social Links**: LinkedIn, GitHub, Email integration

### 🛠 Technical Features
- **React 18**: Modern React with hooks
- **Context API**: State management for auth, cart, theme
- **React Router**: Client-side routing with protected routes
- **React i18next**: Internationalization
- **Bootstrap**: Responsive CSS framework
- **Custom CSS**: Component-specific styling
- **API Integration**: Products, brands, categories APIs

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx & Header.css
│   ├── Footer.jsx & Footer.css
│   ├── Layout.jsx & Layout.css
│   ├── ProductCard.jsx & ProductCard.css
│   ├── BrandCard.jsx & BrandCard.css
│   ├── HeroSection.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Brands.jsx & Brands.css
│   ├── Categories.jsx
│   ├── Cart.jsx & Cart.css
│   ├── ProductDetail.jsx
│   ├── SearchPage.jsx
│   └── NotFound.jsx & NotFound.css
├── contexts/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── ThemeContext.jsx
├── services/
│   └── api.js
├── locales/
│   ├── en.json
│   └── ar.json
├── assets/
│   └── default-monochrome.png
├── utils/
│   └── i18n.js
├── App.jsx
├── App.css
└── main.jsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. **Extract the project**
   ```bash
   unzip illurea-ecommerce-enhanced.zip
   cd illurea-ecommerce
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔧 Configuration

### API Endpoints
The application uses the following APIs:
- Products: `https://ecommerce.routemisr.com/api/v1/products`
- Brands: `https://ecommerce.routemisr.com/api/v1/brands`
- Categories: `https://ecommerce.routemisr.com/api/v1/categories`

### Social Links
Update the social media links in `Footer.jsx`:
- LinkedIn: https://www.linkedin.com/in/fatmayman/
- GitHub: https://github.com/fatmayman
- Email: 1fatymayman@gmail.com

### Logo
Replace the logo in `src/assets/default-monochrome.png` with your custom logo.

## 🎯 Key Features Implementation

### Theme Toggle
- Custom moon/sun icon toggle
- Persisted in localStorage
- Applied to body class for global theming

### Language Switching
- React i18next integration
- RTL support for Arabic
- Dynamic content translation

### Shopping Cart
- Context-based state management
- Persistent cart items
- Quantity management
- Price calculations

### Search Functionality
- Exact match search
- Searches both products and brands
- 404 redirect for no results

### Authentication
- Mock authentication system
- Protected routes
- User context management

## 🐛 Known Issues & Fixes Needed

### 🔴 Issues to Fix:
1. **Login/Register Errors**: Authentication functions need proper error handling
2. **Dark/Light Mode**: Theme toggle not applying correctly to body
3. **Brands Page**: Cards not displaying properly
4. **Search Function**: Not connected to products/brands properly

### 🟡 Recommended Improvements:
1. Add form validation feedback
2. Implement loading states
3. Add error boundaries
4. Optimize API calls
5. Add product filtering
6. Implement wishlist functionality

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is created for educational purposes as part of an ITI graduation project.

## 👥 Contact

- **Developer**: Fatma Yman
- **LinkedIn**: https://www.linkedin.com/in/fatmayman/
- **GitHub**: https://github.com/fatmayman
- **Email**: 1fatymayman@gmail.com

---

**Note**: This project was built with CSS and Bootstrap only (no Tailwind) as requested, with individual CSS files for each component to maintain clean code structure.

