// components/DiscountLabel.js
import React from 'react';

const DiscountLabel = ({ discount_price, discount_percentage }) => {
    if (discount_price || discount_percentage) {
        const discountText = discount_price ? `$${discount_price} OFF` : `${discount_percentage}% OFF`;
        return (
            <div style={{ zIndex: 1 }} className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-[-5deg] transition-all duration-300 group-hover:scale-110 group-hover:rotate-0 discount-bounce">
                <span className="block">{discountText}</span>
            </div>
        );
    }
    return null;
};

export default DiscountLabel;