// components/PriceDisplay.js
import React from 'react';

const PriceDisplay = ({ price, discount_price, discount_percentage }) => {
    const discountedPrice = discount_price || (discount_percentage ? (price * (1 - discount_percentage / 100)).toFixed(2) : null);

    return (
        <div className="text-center mt-2">
            {discountedPrice ? (
                <>
                    <span className="line-through text-gray-400 text-sm">${price.toFixed(2)}</span>
                    <span className="text-green-600 text-xl ml-2 font-bold">${discountedPrice}</span>
                </>
            ) : (
                <span className="text-xl font-bold">${price.toFixed(2)}</span>
            )}
        </div>
    );
};

export default PriceDisplay;