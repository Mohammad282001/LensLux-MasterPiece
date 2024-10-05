import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const LensesProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [brands, setBrands] = useState([]);
    const [filters, setFilters] = useState({
        type: 'all',
        color: 'all',
        brand: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/lenses/get-lenses');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);




    useEffect(() => {
        const fetchBrands = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/brand/get-brands/contactLenses');
                const data = await response.json();
                setBrands(data);

                console.log("Brands >> ", brands)
            } catch (error) {
                console.error("Error fetching brands:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBrands();
    }, []);








    useEffect(() => {
        const filtered = products.filter(product =>
            product.model.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filters.type === 'all' || product.lens_type === filters.type) &&
            (filters.color === 'all' || product.color === filters.color) &&
            (filters.brand === 'all' || product.brand.brand_name === filters.brand)
        );
        setFilteredProducts(filtered);
    }, [searchTerm, filters, products]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
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
                        <span className="text-lg font-medium text-black">{parseFloat(price).toFixed(2)}JOD</span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-light mb-8">Contact Lens Products</h2>

                <div className="mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                </div>

                <div className="mb-8">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300"
                    >
                        <Filter size={20} className="mr-2" />
                        Filters
                        <ChevronDown size={20} className="ml-2" />
                    </button>

                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                            <select
                                value={filters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option value="all">All Types</option>
                                <option value="contact">Contact</option>
                                <option value="colored">Colored</option>
                            </select>
                            <select
                                value={filters.color}
                                onChange={(e) => handleFilterChange('color', e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option value="all">All Colors</option>
                                <option value="Clear">Clear</option>
                                <option value="Blue">Blue</option>
                                {/* Add more color options based on your data */}
                            </select>
                            <select
                                value={filters.brand}
                                onChange={(e) => handleFilterChange('brand', e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option value="all">All Brands</option>
                                {brands.map(brand => (
                                    <option key={brand.id} value={brand.brand_name}>
                                        {brand.brand_name}
                                    </option>
                                ))}
                            </select>
                        </motion.div>
                    )}
                </div>

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
                            {filteredProducts.map(product => (
                                <motion.div
                                    key={product.id}
                                    whileHover={{ y: -5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white overflow-hidden transition-all duration-300 hover:shadow-lg rounded-lg"
                                >
                                    <Link to={`/contact-lens/${product.id}`}>
                                        <div className="relative w-full pb-[100%] overflow-hidden bg-gray-100 rounded-t-lg">
                                            <img
                                                src={product.images && product.images.length > 0 ? product.images[0].image_url : product.brand.brand_image}
                                                alt={product.model}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                            {(product.discount_price || product.discount_percentage) && (
                                                <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-sm">
                                                    {product.discount_percentage ? `${product.discount_percentage}% OFF` : 'SALE'}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    <div className="p-4">
                                        <h3 className="text-lg font-medium mb-1 text-black">{product.brand.brand_name}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{product.model}</p>
                                        <p className="text-sm text-gray-500 mb-2">Color: {product.color}</p>
                                        <PriceDisplay
                                            price={product.price}
                                            discount_price={product.discount_price}
                                            discount_percentage={product.discount_percentage}
                                        />
                                        <div className="mt-4 flex justify-between items-center">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {product.lens_type}
                                            </span>
                                            <button className="text-black hover:text-gray-700 transition-colors duration-300">
                                                <ShoppingCart size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LensesProducts;