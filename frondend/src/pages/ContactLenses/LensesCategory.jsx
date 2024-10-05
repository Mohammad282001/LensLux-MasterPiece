import React from "react";
import Navbar from '../../layouts/navbar/Navbar';
import Footer from '../../layouts/footer';
import LensesBrands from "./LensesBrands";
import LensesProducts from "./LensesProducts";



const LensesCategory = () => {

    return (
        <>
            <Navbar />
            <main>
                <LensesBrands></LensesBrands>
                <LensesProducts></LensesProducts>
            </main>
            <Footer />
        </>
    );
};

export default LensesCategory;