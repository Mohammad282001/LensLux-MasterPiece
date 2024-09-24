// src/pages/HomePage.js
import React from 'react';

import Navbar from '../../layouts/navbar';
import HeroSlider from "./heroSlider"
import ImageCard from './categorySection';
import ProductSlider from "../../components/Cards/productsSlider"
import BenefitsSection from './benefitsSection';
import Footer from '../../layouts/footer';
import './home.css';

const Home = () => {
    return (
        <>
            <main className=''>
                <Navbar />
                <HeroSlider />
                <ImageCard />
                <ProductSlider />
                <BenefitsSection />
                <Footer />
            </main>
        </>
    );
};

export default Home;
