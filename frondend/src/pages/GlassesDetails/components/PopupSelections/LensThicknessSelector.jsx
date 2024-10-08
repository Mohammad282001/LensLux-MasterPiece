import React, { useState } from "react";
import { motion } from "framer-motion";

const LensThicknessSelector = ({ onSelect, selected, basePrice }) => {
    const options = [
        {
            value: "enhanced-slim",
            label: "Enhanced - Slim",
            description: "Our standard lens thickness is suitable for light prescriptions. Lightweight plastic material. Index 1.50. Enhanced comfort and look. Prescriptions between +2 and -2.",
            price: 0,
        },
        {
            value: "premium-thin",
            label: "Premium - Thin",
            description: "A thinner, more durable lens that is suitable for medium prescriptions. Lightweight & impact-resistant. Index 1.59. Most recommended for ages 18 and under. Prescriptions between +4 and -4.",
            price: 20,
        },
        {
            value: "superior-extra-thin",
            label: "Superior - Extra thin",
            description: "A much thinner lens that is suitable for medium or strong prescriptions. Thinner than Premium Thin lenses. Index 1.67. Discreet and lightweight. Prescriptions above +4 and below -4.",
            price: 30,
        },
        {
            value: "ultimate-thinnest",
            label: "Ultimate - Thinnest",
            description: "Ultra thin and lightweight lenses for strong prescriptions and everyday wear. Thinnest lens in our selection. Index 1.74. Anti-reflective. Prescriptions above +6 and below -6.",
            price: 50,
        },
    ];

    const [hoveredOption, setHoveredOption] = useState(null);

    return (
        <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Choose your lens thickness</h3>
            <div className="space-y-4">
                {options.map((option) => (
                    <motion.button
                        key={option.value}
                        onClick={() => onSelect(option.value, option.price)}
                        className={`w-full p-4 border rounded-lg transition-colors text-left ${selected === option.value
                                ? "border-black border-2"
                                : "border-gray-300"
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setHoveredOption(option.value)}
                        onMouseLeave={() => setHoveredOption(null)}
                    >
                        <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
                            <div className="flex flex-col">
                                <h3 className="text-lg font-semibold mb-2">{option.label}</h3>
                                <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                                <p className="text-sm font-medium text-green-600 mt-auto">
                                    {option.price === 0 ? "Price included" : `+ ${option.price} JOD`}
                                </p>
                            </div>
                            {selected === option.value && (
                                <div className="text-green-600 self-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default LensThicknessSelector;