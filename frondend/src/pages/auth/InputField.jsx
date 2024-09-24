import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';

const InputField = ({ label, type, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={label}>
                {label}
            </label>
            <div className="relative">
                <input
                    type={type === 'password' && showPassword ? 'text' : type}
                    id={label}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
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
