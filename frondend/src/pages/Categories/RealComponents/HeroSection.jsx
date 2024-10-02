import React from 'react';

const HeroSection = ({ title, subtitle }) => (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                {title}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                {subtitle}
            </p>
        </div>
    </div>
);

export default HeroSection;