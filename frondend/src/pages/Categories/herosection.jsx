import React from 'react';

const HeroCover = ({ backgroundImage, text, subText }) => {
    return (
        <div
            className="bg-cover bg-center flex flex-col items-center justify-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                width: '100%',
                height: '100%',
                minHeight: '25.6rem'
            }}
        >
            <h1 className="text-white text-4xl font-bold text-center leading-loose">
                {text}
            </h1>
            
            <h3 className="text-white text-xl text-center w-6/12">
                {subText}
            </h3>
        </div>
    );
};

export default HeroCover;
