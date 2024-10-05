// src/pages/HomePage.js
import React from 'react';
import Navbar from '../../layouts/navbar/Navbar';
import Footer from '../../layouts/footer';
import ProductDetails from './components/ProductDetails';



const ProductPage = () => {
    return (
        <>
            <main className=''>
                <Navbar />
                <ProductDetails />
                <Footer />
            </main>
        </>
    );
};

export default ProductPage;
