import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModals, loginUser } from '../../redux/authSlice';
import PopupComponent from './PopupComponent';
import InputField from './InputField';

const LoginPopup = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.auth.isLoginOpen);
    const { user, error, loading } = useSelector((state) => state.auth); // Accessing user, error, loading states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    // Close the popup when login is successful (user is defined)
    useEffect(() => {
        console.log("User in useEffect:", localStorage.getItem('token')); // Log user data
        if (localStorage.getItem('token')) {
            console.log("Login successful, closing modal");
            dispatch(closeModals());
        }
    }, [user, dispatch]);
    return (
        <PopupComponent isOpen={isOpen} onClose={() => dispatch(closeModals())}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back</h2>

            {/* Display error if login fails */}
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <form onSubmit={handleLogin}>
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
                    className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300 shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
                Don't have an account?{' '}
                <span className="text-orange-600 cursor-pointer hover:underline">
                    Sign up
                </span>
            </p>
        </PopupComponent>
    );
};

export default LoginPopup;
