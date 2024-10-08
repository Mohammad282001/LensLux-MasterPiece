import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CartItemDetails = ({ details }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    if (!details) return null;

    const detailsArray = details.split(', ').map(detail => {
        const [key, value] = detail.split(': ');
        return { key, value };
    });

    return (
        <div className="mt-2">
            <motion.button
                className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? (
                    <ChevronUp size={16} className="mr-1" />
                ) : (
                    <ChevronDown size={16} className="mr-1" />
                )}
                {isExpanded ? 'Hide Details' : 'Show Details'}
            </motion.button>
            <motion.div
                initial={false}
                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="mt-2 space-y-1">
                    {detailsArray.map((detail, index) => (
                        <div key={index} className="flex text-sm">
                            <span className="font-medium text-gray-700 mr-2">{detail.key}:</span>
                            <span className="text-gray-600">{detail.value}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default CartItemDetails;