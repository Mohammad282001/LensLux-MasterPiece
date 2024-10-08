import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import ProductOverview from "./ProductOverview";
import { useCart } from 'react-use-cart';


const ContactLensProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem, updateItemQuantity, getItem } = useCart();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/lenses/get-lenses/${productId}`
                );
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setLoading(false);
            }
        };
        fetchProductData();
    }, [productId]);

    useEffect(() => {
        window.scrollTo(0, 150);
    }, [productId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen text-xl text-gray-600">
                Product not found. Please check the product ID and try again.
            </div>
        );
    }

    const brandName = product.brand?.brand_name || "Unknown Brand";
    const modelName = product.model || "Unknown Model";

    return (
        <div className="bg-white min-h-screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative bg-gray-50 text-black"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        to="/contact-lens"
                        className="inline-flex items-center px-6 py-3 border border-black text-base font-medium text-black hover:bg-black hover:text-white transition-colors duration-300 mt-10"
                    >
                        <ChevronLeft size={16} className="mr-2" />
                        Back to Lenses
                    </Link>
                    <ProductOverview
                        product={product}
                        addItem={addItem}
                        updateItemQuantity={updateItemQuantity}
                        getItem={getItem}
                    />
                </div>
            </motion.div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="bg-white shadow-lg rounded-lg p-8 mb-16"
                >
                    <h2 className="text-3xl font-light mb-6">Product Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-medium mb-4">Lens Details</h3>
                            <ul className="space-y-2">
                                <li><span className="font-medium">Type:</span> {product.lens_type || "N/A"}</li>
                                <li><span className="font-medium">Color:</span> {product.color || "N/A"}</li>
                                <li><span className="font-medium">Brand:</span> {brandName}</li>
                                <li><span className="font-medium">Model:</span> {modelName}</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium mb-4">Additional Information</h3>
                            <p className="text-gray-600 leading-relaxed">{product.description || "No description available."}</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="bg-white shadow-lg rounded-lg p-8"
                >
                    <h2 className="text-3xl font-light mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-medium mb-2">How often should I replace my contact lenses?</h3>
                            <p className="text-gray-600">The replacement schedule depends on the type of lenses. Daily disposables should be discarded after each use, while bi-weekly or monthly lenses can be worn for their designated period with proper cleaning and care.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium mb-2">Can I sleep with these contact lenses?</h3>
                            <p className="text-gray-600">It's not recommended to sleep with contact lenses unless they are specifically designed for extended wear. Always follow the instructions provided by your eye care professional.</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-medium">{brandName} {modelName}</h3>
                        <p className="text-2xl font-bold">{parseFloat(product.price || 0).toFixed(2)} JOD</p>
                    </div>
                    <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors duration-300">
                        <ShoppingCart size={20} className="mr-2" />
                        Add to Cart
                    </button>
                </div>
            </motion.div> */}
        </div>
    );
};

export default ContactLensProductDetails;