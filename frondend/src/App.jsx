import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/homePage';
import CategoryPage from './pages/Categories/categoryPage';
import ProductPage from './pages/GlassesDetails/productPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';

import LensesCategory from './pages/ContactLenses/LensesCategory';
import LensDetailsPage from './pages/LensesDetails/LensDetailsPage';
import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/glasses/:type" element={<CategoryPage />} />
        <Route path="/glasses/:type/:category" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/contact-lens" element={<LensesCategory />} />
        <Route path="/contact-lens/:productId" element={<LensDetailsPage />} />


      </Routes>
    </Router>
  );
}

export default App;
