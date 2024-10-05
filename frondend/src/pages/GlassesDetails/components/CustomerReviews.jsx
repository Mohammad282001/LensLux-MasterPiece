import React from "react";
import { motion } from "framer-motion";

const CustomerReviews = () => {
    return (
        <div className="mt-20">
            <h3 className="text-2xl font-semibold mb-6">Customer Reviews</h3>
            <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                            <div>
                                <p className="font-semibold">Customer Name</p>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                ))}
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
            >
                Write a Review
            </motion.button>
        </div>
    );
};

export default CustomerReviews;