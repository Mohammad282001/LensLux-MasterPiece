import React from 'react';
import { motion } from 'framer-motion';

const LensTypeSelector = ({ onSelect, selected }) => {
    const options = [
        { value: 'clear', label: 'Clear', description: 'Standard lenses without any additional features', price: 0 },
        { value: 'blue-cut', label: 'Blue Cut', description: 'Protects eyes from harmful blue light', price: 15 },
        { value: 'transitions', label: 'Transitions', description: 'Automatically adapt to changing light', price: 30 },
    ];

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Select lens type</h3>
            <div className="space-y-4">
                {options.map((option) => (
                    <motion.button
                        key={option.value}
                        onClick={() => onSelect(option.value, option.price)}
                        className={`w-full p-4 border rounded-lg transition-colors text-left ${selected === option.value
                                ? 'border-black border-2'
                                : 'border-gray-300'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex flex-col">
                            <h4 className="font-semibold mb-2">{option.label}</h4>
                            <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                            <p className="text-sm font-medium text-green-600">
                                {option.price === 0 ? 'No additional cost' : `+ ${option.price} JOD`}
                            </p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default LensTypeSelector;