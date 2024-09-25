import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login submitted', { email, password });
        dispatch(loginUser({ email, password }));
        navigate('/'); // Redirect after login (customize this as needed)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm bg-gray-100 rounded-lg shadow-xl p-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Welcome Back
                </h2>
                <p className="text-center text-orange-500 font-medium mb-4">
                    Your vision, our passion.
                </p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-orange-500 transition duration-300 shadow-md text-lg font-semibold"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <span className="text-orange-500 cursor-pointer hover:underline"
                        onClick={() => navigate('/signup')}
                    >
                        Sign up
                    </span>
                </p>
                <div className="mt-6 text-center text-gray-500">
                    <p>© {new Date().getFullYear()} Your Glasses Shop</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
