import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { GlassesIcon, SunIcon, UserIcon, ChevronRightIcon, ShoppingCartIcon, XIcon } from 'lucide-react';


const FetchingData = () => {
    const { type, category } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category || '');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let url = `http://localhost:3000/api/glasses/filter?${type ? `type=${type}` : ''}${selectedCategory ? `&category=${selectedCategory}` : ''}`;
                const response = await fetch(url);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };



        fetchData();
    }, [type, selectedCategory]);

    useEffect(() => {
        setSelectedCategory(category || '');
    }, [category]);

    const handleNavigation = (subcategory) => {
        if (selectedCategory === subcategory) {
            setSelectedCategory('');
            navigate(`/glasses/${type}`);
        } else {
            setSelectedCategory(subcategory);
            navigate(`/glasses/${type}/${subcategory}`);
        }
    };

    const typeName = type ? type.charAt(0).toUpperCase() + type.slice(1) : '';
    const categoryName = selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : '';

    const heroText = selectedCategory ? `${typeName} - ${categoryName}` : typeName;
    const subText = type === 'eyeglasses'
        ? "Experience vision redefined with our curated optical collection."
        : "Elevate your style with our sophisticated sunglasses, where fashion meets function.";

    const DiscountLabel = ({ discount_price, discount_percentage, oldPrice }) => {
        if (discount_price || discount_percentage) {
            const discountText = discount_price ? `${oldPrice - discount_price}JOD OFF` : `${discount_percentage}% OFF`;
            return (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 z-10 rounded-sm"
                >
                    {discountText}
                </motion.div>
            );
        }
        return null;
    };

    const PriceDisplay = ({ price, discount_price, discount_percentage }) => {
        const discountedPrice = discount_price || (discount_percentage ? (parseFloat(price) * (1 - parseFloat(discount_percentage) / 100)).toFixed(2) : null);

        return (
            <div className="flex justify-between items-baseline mt-2">
                <div>
                    {discountedPrice ? (
                        <>
                            <span className="line-through text-gray-400 text-sm mr-2">{parseFloat(price).toFixed(2)}JOD</span>
                            <span className="text-black text-lg font-medium">{discountedPrice}JOD</span>
                        </>
                    ) : (
                        <span className="text-lg font-medium text-black">${parseFloat(price).toFixed(2)}</span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white min-h-screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative bg-gray-50 text-black"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-24 md:py-32 lg:py-40 flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <motion.h1
                                className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                {heroText}
                            </motion.h1>
                            <motion.p
                                className="text-xl text-gray-600 mb-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                {subText}
                            </motion.p>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                <Link to="/brands" className="inline-flex items-center px-6 py-3 border border-black text-base font-medium text-black hover:bg-black hover:text-white transition-colors duration-300">
                                    Explore Brands
                                    <ChevronRightIcon size={20} className="ml-2" />
                                </Link>
                            </motion.div>
                        </div>
                        <motion.div
                            className="md:w-1/2 relative"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <img
                                src="https://www.zennioptical.com/blog/wp-content/uploads/2024/03/Men2024_850x850-Antoney-Blog-Featured-Image.jpg"
                                alt="Featured Glasses"
                                className="w-full h-auto object-cover rounded-lg shadow-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <div className='px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                {type && (
                    <div className="mb-12 flex justify-center space-x-6">
                        {['men', 'women', 'unisex','kids'].map((subCategory) => (
                            <motion.button
                                key={subCategory}
                                onClick={() => handleNavigation(subCategory)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-8 py-3 border border-black rounded-md shadow-sm transition-all duration-300 flex items-center space-x-2
                                    ${selectedCategory === subCategory
                                        ? 'bg-black text-white'
                                        : 'bg-white text-black hover:bg-black hover:text-white'}`}
                            >
                                <UserIcon size={18} />
                                <span>{subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}'s {typeName}</span>
                            </motion.button>
                        ))}
                    </div>
                )}

                <AnimatePresence>
                    {isLoading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center items-center h-64"
                        >
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {products.length > 0 ? (
                                products.map(product => (
                                    <motion.div
                                        key={product.glasses_id}
                                        whileHover={{ y: -5 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Link to={`/product/${product.glasses_id}`} className="block">
                                            <div className="bg-white overflow-hidden transition-all duration-300 hover:shadow-lg rounded-lg">
                                                <div className="relative">
                                                    <DiscountLabel
                                                        discount_price={product.discount_price}
                                                        discount_percentage={product.discount_percentage}
                                                        oldPrice={product.price}
                                                    />
                                                    <div className="relative w-full pb-[100%] overflow-hidden bg-gray-100 rounded-t-lg">
                                                        <div className="absolute inset-0 flex items-center justify-center group">
                                                            {product.images && product.images.length > 0 && (
                                                                <>
                                                                    <img
                                                                        src={product.images[0].image_url}
                                                                        alt={product.model}
                                                                        className="absolute w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                                                                    />
                                                                    {product.images.length > 1 && (
                                                                        <img
                                                                            src={product.images[1].image_url}
                                                                            alt={product.model}
                                                                            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                                                        />
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <h2 className="text-lg font-medium mb-1 text-black">{product.brand.brand_name}</h2>
                                                    <p className="text-sm text-gray-500 mb-2">{product.model}</p>
                                                    <PriceDisplay
                                                        price={product.price}
                                                        discount_price={product.discount_price}
                                                        discount_percentage={product.discount_percentage}
                                                    />
                                                    <div className="mt-4 flex justify-between items-center">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            {type === 'eyeglasses' ? <GlassesIcon size={14} className="mr-1" /> : <SunIcon size={14} className="mr-1" />}
                                                            {type}
                                                        </span>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="text-black hover:text-gray-700 transition-colors duration-300"
                                                        >
                                                        </motion.button>
                                                        <button onClick={console.log("added to cart")}>
                                                            <ShoppingCartIcon size={20} />
                                                        </button>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                        </Link>
                                
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="col-span-full text-center text-gray-600 text-xl"
                                >
                                    No products found for this category.
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FetchingData;


