import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/homePage';
import CategoryPage from './pages/Categories/categoryPage';
import ProductPage from './pages/Product/productPage';
import CategoryListPage from './pages/Categories/categoryListPage';
import GlassesShopAuth from './pages/auth/test';
import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategoryListPage />} />
        <Route path="/glasses/:type" element={<CategoryPage />} />
        <Route path="/glasses/:type/:category" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/auth" element={<GlassesShopAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
