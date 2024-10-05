import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon, SearchIcon } from 'lucide-react';

const LensesBrands = () => {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBrands = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/brand/get-brands/contactLenses');
                const data = await response.json();
                setBrands(data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBrands();
    }, []);

    const filteredBrands = brands.filter(brand =>
        brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12 md:py-20 lg:py-24">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Explore Contact Lens Brands
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Discover our wide selection of premium contact lens brands, designed for comfort and clarity.
                    </motion.p>



                    {isLoading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center items-center h-64"
                        >
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 "
                        >
                            {filteredBrands.map((brand) => (
                                    <motion.div
                                        key={brand.id}
                                        whileHover={{ y: -5 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-white overflow-hidden transition-all duration-300 hover:shadow-md rounded-lg items-center"
                                    >
                                        <div className="relative w-full pb-[100%] overflow-hidden bg-gray-100 rounded-t-lg">
                                            <img
                                                src={brand.brand_image}
                                                alt={brand.brand_name}
                                                className="absolute inset-0 w-full h-full object-contain p-1"
                                            />
                                        </div>
                                        <div className="p-3 text-center">
                                            <h2 className="text-sm font-medium mb-2 text-black">{brand.brand_name}</h2>
                                        </div>
                                    </motion.div>

                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LensesBrands;