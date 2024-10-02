import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import finalImage from '../../../assets/images/glasses-bg3.png';
import useProducts from './useProducts';
import Hero from './Hero';
import CategoryButtons from './CategoryButtons';
import ProductGrid from './ProductGrid';

// category >> men, women,kids, unisex
//type >> sunglasses, eyeglasses
const FetchingData = () => {
    const { type, category } = useParams();
    const navigate = useNavigate();
    const products = useProducts(type, category);


    const handleNavigation = (subcategory) => {
        navigate(`/glasses/${type}/${subcategory}`);
    };

    // for the hero section 
    const typeName = type ? type.charAt(0).toUpperCase() + type.slice(1) : '';
    const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
    const heroText = category ? `${typeName} - ${categoryName}` : typeName;
    const subText = getSubText(type);

    return (
        <>
            <Hero heroText={heroText} subText={subText} backgroundImage={finalImage} />


            <div className='px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 md:px-24'>
                {!category && type && (
                    <CategoryButtons type={type} handleNavigation={handleNavigation} />
                )}
                <ProductGrid products={products} />
            </div>

            <style jsx>{`
                @keyframes customBounce {
                    0%, 100% { transform: translateY(-10%) rotate(-5deg); }
                    50% { transform: translateY(0) rotate(-5deg); }
                }
                .discount-bounce:hover {
                    animation: customBounce 0.5s ease-in-out infinite;
                }
            `}</style>
        </>
    );
};

const getSubText = (type) => {
    if (type === 'eyeglasses') {
        return "Explore our range of eyeglasses glasses crafted for both style and comfort.";
    } else if (type === 'sunglasses') {
        return "Discover our stylish sunglasses perfect for any occasion.";
    }
    return "Find your perfect pair of glasses from our extensive collection.";
};

export default FetchingData;