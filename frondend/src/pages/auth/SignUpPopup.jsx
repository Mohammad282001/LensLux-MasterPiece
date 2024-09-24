import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModals, setUser } from '../../redux/authSlice';
import PopupComponent from './PopupComponent';
import InputField from './InputField';

const SignUpPopup = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.auth.isSignUpOpen);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically call an API to register the user
        console.log('Sign up submitted', { name, email, password });
        dispatch(setUser({ name, email })); // Set user in Redux state
        dispatch(closeModals());
    };

    return (
        <PopupComponent isOpen={isOpen} onClose={() => dispatch(closeModals())}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Us</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300 shadow-lg"
                >
                    Sign Up
                </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
                Already have an account? <span className="text-purple-600 cursor-pointer hover:underline">Login</span>
            </p>
        </PopupComponent>
    );
};

export default SignUpPopup;