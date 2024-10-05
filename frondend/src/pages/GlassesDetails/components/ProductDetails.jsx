import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRightIcon } from 'lucide-react';
import ProductOverview from "./ProductOverview";
import ProductSpecs from "./ProductSpecs";
import SimilarProducts from "./SimilarProducts";
import CustomerReviews from "./CustomerReviews";
import FAQ from "./FAQ";

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/glasses/get/${productId}`
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
                        to={`/glasses/${product.type}`}
                        className="inline-flex items-center px-6 py-3 border border-black text-base font-medium text-black hover:bg-black hover:text-white transition-colors duration-300 mt-10"
                    >
                        <ChevronRightIcon size={16} className="mr-2 transform rotate-180" />
                        Back to Collection
                    </Link>
                    <ProductOverview product={product} />
                </div>
            </motion.div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <ProductSpecs product={product} />
                <SimilarProducts />
                <CustomerReviews />
                <FAQ />
            </div>
        </div>
    );
};

export default ProductDetails;