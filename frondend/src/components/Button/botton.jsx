import React from 'react';

const ButtonComp = ({ label, onClick, type = 'button', color = 'bg-blue-500', textColor = 'text-white', size = 'px-4 py-2' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`rounded ${color} ${textColor} ${size} font-semibold hover:${color} hover:opacity-80 transition duration-300`}
        >
            {label}
        </button>
    );
};

export default ButtonComp;
