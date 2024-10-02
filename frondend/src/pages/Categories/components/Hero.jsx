// components/Hero.js
import React from 'react';

const Hero = ({ heroText, subText, backgroundImage }) => (
    <div className="relative bg-gray-900 text-white py-24 z-0">
        <img src={backgroundImage} alt="Hero background" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{heroText}</h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">{subText}</p>
        </div>
    </div>
);

export default Hero;