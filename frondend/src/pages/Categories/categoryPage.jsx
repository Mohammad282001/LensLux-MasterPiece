import React from 'react';
import Navbar from '../../layouts/navbar';
import FetchingData from './fetchingData';
import Footer from '../../layouts/footer';
import HeroCover from './herosection';

const CategoryPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <FetchingData />
            </main>
            <Footer />
        </>
    );
};

export default CategoryPage;
