import React from 'react';
import Navbar from '../../layouts/navbar/Navbar';
import FetchingData from './fetchingData';
import Footer from '../../layouts/footer';

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
