import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModals, setUser } from '../../redux/authSlice';
import PopupComponent from './PopupComponent';
import InputField from './InputField';

const LoginPopup = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.auth.isLoginOpen);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically call an API to authenticate the user
        console.log('Login submitted', { email, password });
        dispatch(setUser({ email })); // Set user in Redux state
        dispatch(closeModals());
    };

    return (
        <PopupComponent isOpen={isOpen} onClose={() => dispatch(closeModals())}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back</h2>
            <form onSubmit={handleSubmit}>
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
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300 shadow-lg"
                >
                    Login
                </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
                Don't have an account? <span className="text-purple-600 cursor-pointer hover:underline">Sign up</span>
            </p>
        </PopupComponent>
    );
};

export default LoginPopup;