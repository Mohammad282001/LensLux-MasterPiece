// components/CategoryButtons.js
import React from 'react';

const CategoryButtons = ({ type, handleNavigation }) => (
    <div className="mb-8 flex justify-center space-x-4">
        {['men', 'women', 'unisex'].map((subCategory) => (
            <button
                key={subCategory}
                onClick={() => handleNavigation(subCategory)}
                className="px-6 py-2 bg-gray-800 text-white mb-10 hover:bg-gray-700 transition-colors duration-300"
            >
                {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}'s {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
        ))}
    </div>
);

export default CategoryButtons;