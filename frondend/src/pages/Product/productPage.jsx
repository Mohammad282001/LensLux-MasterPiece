// src/pages/HomePage.js
import React from 'react';
import Navbar from '../../layouts/navbar';
import Footer from '../../layouts/footer';
import ProductDetails from './productDetails';



const Home = () => {
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

export default Home;
