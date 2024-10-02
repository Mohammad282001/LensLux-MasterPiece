// import React from 'react';
// import Navbar from '../../../layouts/navbar';
// import FetchingData from './fetchingData';
// import Footer from '../../../layouts/footer';
// // import HeroCover from './herosection';

// const CategoryPage = () => {
//     return (
//         <>
//             <Navbar />
//             <main>
//                 <FetchingData />
//             </main>
//             <Footer />
//         </>
//     );
// };

// export default CategoryPage;






import React from 'react';
import Navbar from '../../../layouts/navbar';
import Footer from '../../../layouts/footer';
import HeroSection from './HeroSection';
import CategoryFilter from './CategoryFilter';
import ProductGrid from './ProductGrid';
import { useProducts } from './useProducts';

const CategoryPage = () => {
    const { products, loading, error, category, targetAudience } = useProducts();

    const heroProps = {
        title: `${category} ${targetAudience ? `for ${targetAudience}` : ''}`,
        subtitle: `Discover our amazing collection of ${category} for ${targetAudience || 'everyone'}`
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <HeroSection {...heroProps} />
                <div className="container mx-auto px-4 py-8">
                    <CategoryFilter category={category} />
                    {loading && <p className="text-center">Loading...</p>}
                    {error && <p className="text-center text-red-500">Error: {error.message}</p>}
                    {!loading && !error && <ProductGrid products={products} />}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CategoryPage;