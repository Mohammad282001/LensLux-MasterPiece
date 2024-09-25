import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';

const InputField = ({ label, type, placeholder, value, onChange, name }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={name}>
                {label}
            </label>
            <div className="relative">
                <input
                    type={type === 'password' && showPassword ? 'text' : type}
                    id={name}
                    name={name} // Add name attribute for better form handling
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 border text-gray-950 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    required // Optional: adds basic HTML validation
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputField;
