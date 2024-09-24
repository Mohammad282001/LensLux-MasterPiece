import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Glasses } from 'lucide-react';

const GlassesShopAuth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (!isLogin && !name) newErrors.name = 'Name is required';
        if (!isLogin && password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        // Simulate an API call
        setTimeout(() => {
            setLoading(false);
            alert(isLogin ? 'Login successful' : 'Sign Up successful');
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden relative">
            <div className="relative w-full max-w-md">
                <AnimatePresence>
                    {isLogin ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.5 }}
                            className="absolute inset-0  bg-white rounded-xl shadow-lg"
                        >
                            <div className="flex justify-center mb-8">
                                <Glasses className="w-16 h-16 text-blue-600" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
                                Login to Glasses Shop
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div className="mb-8">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="none" d="M4 12a8 8 0 1116 0A8 8 0 014 12z"></path>
                                        </svg>
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                            </form>
                            <p className="mt-6 text-center text-gray-700">
                                Don't have an account?
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className="ml-1 text-blue-600 hover:underline focus:outline-none"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="signup"
                            initial={{ opacity: 0, x: '-100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'tween', duration: 0.5 }}
                            className="absolute inset-0  bg-white rounded-xl shadow-lg"
                        >
                            <div className="flex justify-center mb-8">
                                <Glasses className="w-16 h-16 text-blue-600" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
                                Sign Up to Glasses Shop
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="none" d="M4 12a8 8 0 1116 0A8 8 0 014 12z"></path>
                                        </svg>
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>
                            </form>
                            <p className="mt-6 text-center text-gray-700">
                                Already have an account?
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className="ml-1 text-blue-600 hover:underline focus:outline-none"
                                >
                                    Login
                                </button>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GlassesShopAuth;
