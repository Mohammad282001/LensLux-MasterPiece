import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';

const ProductSpecs = ({ product }) => {
    const [showSpecs, setShowSpecs] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="mt-12 space-y-6">
            <div className="border-t border-gray-200 pt-6">
                <button
                    onClick={() => setShowSpecs(!showSpecs)}
                    className="flex items-center justify-between w-full py-3 text-left text-lg font-semibold text-gray-900 hover:text-black"
                >
                    <span>Specifications</span>
                    {showSpecs ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
                </button>
                <AnimatePresence>
                    {showSpecs && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="py-4 space-y-2 text-gray-600">
                                <p><span className="font-semibold">Brand:</span> {product.brand.brand_name}</p>
                                <p><span className="font-semibold">Model:</span> {product.model}</p>
                                <p><span className="font-semibold">Category:</span> {product.category}</p>
                                <p><span className="font-semibold">Type:</span> {product.type}</p>
                                <p><span className="font-semibold">Sub Type:</span> {product.sub_type}</p>
                                <p><span className="font-semibold">Frame Shape:</span> {product.frame_shape}</p>
                                <p><span className="font-semibold">Face Shape Compatibility:</span> {product.face_frame_shape}</p>
                                <p><span className="font-semibold">Color:</span> {product.color_name}</p>
                                <div className="flex items-center">
                                    <span className="font-semibold mr-2">Color Sample:</span>
                                    <div
                                        className="w-6 h-6 rounded-full border border-gray-300"
                                        style={{ backgroundColor: product.color_hex }}
                                    ></div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center justify-between w-full py-3 text-left text-lg font-semibold text-gray-900 hover:text-black"
                >
                    <span>Product Details</span>
                    {showDetails ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
                </button>
                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="py-4 space-y-2 text-gray-600">
                                <p><span className="font-semibold">Lens Width:</span> {product.details[0].lens_width} mm</p>
                                <p><span className="font-semibold">Bridge Width:</span> {product.details[0].bridge_width} mm</p>
                                <p><span className="font-semibold">Temple Length:</span> {product.details[0].temple_length} mm</p>
                                <p><span className="font-semibold">Lens Height:</span> {product.details[0].lens_height} mm</p>
                                <p><span className="font-semibold">Total Width:</span> {product.details[0].total_width} mm</p>
                                <p><span className="font-semibold">Weight:</span> {product.details[0].weight} g</p>
                                <p><span className="font-semibold">Frame Material:</span> {product.details[0].frame_material}</p>
                                <p><span className="font-semibold">Lens Type:</span> {product.details[0].lens_type}</p>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="m-4 p-4 bg-gray-100 rounded-lg cursor-pointer"
                                onClick={() => { /* Size guide functionality */ }}
                            >
                                <h3 className="text-lg font-semibold mb-2">Size Guide</h3>
                                <p className="text-sm text-gray-600">Click to view our comprehensive size guide and find your perfect fit.</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProductSpecs;