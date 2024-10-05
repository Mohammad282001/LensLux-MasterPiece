import React from "react";
import Navbar from '../../layouts/navbar/Navbar';
import Footer from '../../layouts/footer';
import ContactLensProductDetails from "./ContactLensProductDetails";





const LensDetailsPage = () => {

    return (
        <>
            <Navbar />
            <main>
                <ContactLensProductDetails></ContactLensProductDetails>
            </main>
            <Footer />
        </>
    );
};

export default LensDetailsPage;