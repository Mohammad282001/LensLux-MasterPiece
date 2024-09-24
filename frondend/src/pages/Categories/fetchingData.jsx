import React, { useEffect, useState } from 'react';
import finalImage from '../../assets/images/glasses-bg3.png';
import { useParams, useNavigate, Link } from 'react-router-dom';

const FetchingData = () => {
    const { type, category } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/products.json');
                const data = await response.json();
                let filteredProducts = [];

                if (type && !category) {
                    filteredProducts = data[type] || [];
                } else if (type && category) {
                    filteredProducts = data[type]?.filter(
                        product => product.category === category || (category === 'unisex' && product.is_unisex)
                    ) || [];
                }

                if (category === 'men' || category === 'women') {
                    const unisexProducts = data[type]?.filter(product => product.is_unisex) || [];
                    filteredProducts = [...filteredProducts, ...unisexProducts];
                }

                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [type, category]);

    const handleNavigation = (subcategory) => {
        navigate(`/glasses/${type}/${subcategory}`);
    };

    const typeName = type ? type.charAt(0).toUpperCase() + type.slice(1) : '';
    const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

    let backgroundImage = '/path/to/your/background/image.jpg'; // Replace with your actual image path
    let subText = "Find your perfect pair of glasses from our extensive collection.";
    if (type === 'optical') {
        subText = "Explore our range of optical glasses crafted for both style and comfort.";
    } else if (type === 'sunglasses') {
        subText = "Discover our stylish sunglasses perfect for any occasion.";
    }

    const heroText = category ? `${typeName} - ${categoryName}` : typeName;

    const DiscountLabel = ({ discount_price, discount_percentage }) => {
        if (discount_price || discount_percentage) {
            const discountText = discount_price ? `$${discount_price} OFF` : `${discount_percentage}% OFF`;
            return (
                <div style={{ zIndex: 1 }} className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-[-5deg] transition-all duration-300 group-hover:scale-110 group-hover:rotate-0 discount-bounce">
                    <span className="block">{discountText}</span>
                </div>
            );
        }
        return null;
    };

    const PriceDisplay = ({ price, discount_price, discount_percentage }) => {
        const discountedPrice = discount_price || (discount_percentage ? (price * (1 - discount_percentage / 100)).toFixed(2) : null);

        return (
            <div className="text-center mt-2">
                {discountedPrice ? (
                    <>
                        <span className="line-through text-gray-400 text-sm">${price.toFixed(2)}</span>
                        <span className="text-green-600 text-xl ml-2 font-bold">${discountedPrice}</span>
                    </>
                ) : (
                    <span className="text-xl font-bold">${price.toFixed(2)}</span>
                )}
            </div>
        );
    };

    return (
        <>
            <div className="relative bg-gray-900 text-white py-24 z-0">
                <img src={finalImage} alt="Hero background" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{heroText}</h1>
                    <p className="mt-6 text-xl max-w-3xl mx-auto">{subText}</p>
                </div>
            </div>
            <div className='px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 md:px-24'>
                {!category && type && (
                    <div className="mb-8 flex justify-center space-x-4">
                        {['men', 'women', 'unisex'].map((subCategory) => (
                            <button
                                key={subCategory}
                                onClick={() => handleNavigation(subCategory)}
                                className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-300"
                            >
                                {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}'s {typeName}
                            </button>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.length > 0 ? (
                        products.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id} className="group">
                                <div className="bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                                    <DiscountLabel
                                        discount_price={product.price - product.discount_price}
                                        discount_percentage={product.discount_percentage}
                                    />
                                    <div className="relative w-full pb-[100%] overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <img
                                                src={product.image_url}
                                                alt={product.brand}
                                                className="absolute w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                                            />
                                            <img
                                                src={product.image_url2}
                                                alt={product.brand}
                                                className="absolute w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-1 text-gray-800">{product.brand}</h2>
                                        <p className="text-sm text-gray-600 mb-2">{product.model}</p>
                                        <PriceDisplay
                                            price={product.price}
                                            discount_price={product.discount_price}
                                            discount_percentage={product.discount_percentage}
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-600">No products found for this category.</div>
                    )}
                </div>
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

export default FetchingData;