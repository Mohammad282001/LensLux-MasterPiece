import React from "react";
import { motion } from "framer-motion";

const SimilarProducts = () => {
    return (
        <div className="mt-20">
            <h3 className="text-lg font-semibold mb-4">Compare with Similar Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                    <motion.div
                        key={item}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white p-4 rounded-lg shadow-md"
                    >
                        <div className="w-full h-40 bg-gray-200 rounded-md mb-4"></div>
                        <h4 className="font-semibold">Similar Product {item}</h4>
                        <p className="text-sm text-gray-600">Short description...</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SimilarProducts;