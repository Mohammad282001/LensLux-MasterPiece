import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
    {
        id: 1,
        name: 'Giorgio Arrivals',
        description: '0AR8181 Phantos Sunglasses 587571 - Size 49',
        price: '99.50 JOD',
        image: 'https://eye-boutique.imgix.net/2024-03-10/FRPRD0014WV17O1O154000000-1.jpg?auto=format&ixlib=react-9.8.0&w=2619',
        category: 'New Arrivals'
    },
    {
        id: 2,
        name: 'Giorgio Products',
        description: '0AR8181 Phantos Sunglasses 587571 - Size 49',
        price: '99.50 JOD',
        image: 'https://eye-boutique.imgix.net/2024-03-10/FRPRD0014WV17O1O154000000-1.jpg?auto=format&ixlib=react-9.8.0&w=2619',
        category: 'Featured Products'
    },
    {
        id: 3,
        name: 'Giorgio Sellers',
        description: '0AR8181 Phantos Sunglasses 587571 - Size 49',
        price: '99.50 JOD',
        image: 'https://eye-boutique.imgix.net/2024-03-10/FRPRD0014WV17O1O154000000-1.jpg?auto=format&ixlib=react-9.8.0&w=2619',
        category: 'Best Sellers'
    },
    {
        id: 4,
        name: 'Sellers 2',
        description: '0AR8181 Phantos Sunglasses 587571 - Size 49',
        price: '99.50 JOD',
        image: 'https://eye-boutique.imgix.net/2024-03-10/FRPRD0014WV17O1O154000000-1.jpg?auto=format&ixlib=react-9.8.0&w=2619',
        category: 'Best Sellers'
    },
    {
        id: 5,
        name: 'Sellers 3',
        description: '0AR8181 Phantos Sunglasses 587571 - Size 49',
        price: '99.50 JOD',
        image: 'https://eye-boutique.imgix.net/2024-03-10/FRPRD0014WV17O1O154000000-1.jpg?auto=format&ixlib=react-9.8.0&w=2619',
        category: 'Best Sellers'
    },
    {
        id: 6,
        name: 'Ray-Ban',
        description: '0AR8181 Phantos Sunglasses 587571 - Size 49',
        price: '99.50 JOD',
        image: 'https://eye-boutique.imgix.net/2024-03-10/FRPRD0014WV17O1O154000000-1.jpg?auto=format&ixlib=react-9.8.0&w=2619',
        category: 'Best Sellers'
    },
    
];

const categories = ['Best Sellers', 'Featured Products', 'New Arrivals'];

const ProductSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timeoutRef = useRef(null);

    const filteredProducts = products.filter(product => product.category === selectedCategory);
    const extendedProducts = [...filteredProducts, ...filteredProducts.slice(0, 4)];

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [filteredProducts.length]);

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + extendedProducts.length) % extendedProducts.length);
    };

    useEffect(() => {
        if (currentIndex === filteredProducts.length) {
            timeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 500);
        } else {
            timeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
            }, 500);
        }

        return () => clearTimeout(timeoutRef.current);
    }, [currentIndex, filteredProducts.length]);

    return (
        <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 ">
            <div className="text-2xl font-bold mb-4 flex justify-center space-x-4">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => {
                            setSelectedCategory(category);
                            setCurrentIndex(0);
                        }}
                        className={`px-4 py-2 ${selectedCategory === category ? 'text-black' : 'text-gray-400'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${(currentIndex * 100) / 6}%)`,
                        transition: isTransitioning ? 'transform 0.5s ease' : 'none',
                    }}
                >
                    {extendedProducts.map((product, index) => (
                        <div key={index} className="w-1/5 p-2 flex-shrink-0">
                            <div className="border border-gray-200 p-4 h-full flex flex-col">
                                <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                                <p className="text-orange-500 font-bold mt-auto">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(filteredProducts.length / 5) }).map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full mx-1 ${index === Math.floor(currentIndex / 5) ? 'bg-orange-500' : 'bg-gray-300'}`}
                        onClick={() => setCurrentIndex(index * 5)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductSlider;
