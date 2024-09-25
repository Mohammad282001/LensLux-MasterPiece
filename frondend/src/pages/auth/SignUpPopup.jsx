import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, closeModals, setError } from '../../redux/authSlice';
import PopupComponent from './PopupComponent';
import InputField from './InputField';

const SignUpPopup = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.auth.isSignUpOpen);
    const error = useSelector((state) => state.auth.error);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
        role: 'user',
        date_of_birth: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Sign up submitted', formData);
        try {
            const resultAction = await dispatch(signupUser(formData));
            if (signupUser.fulfilled.match(resultAction)) {
                console.log('User successfully signed up', resultAction.payload);
                dispatch(closeModals());
            } else if (signupUser.rejected.match(resultAction)) {
                console.error('Signup failed', resultAction.payload);
                dispatch(setError(resultAction.payload || 'An unknown error occurred.'));
            }
        } catch (error) {
            console.error('Unexpected error', error);
            dispatch(setError('An unexpected error occurred.'));
        }
    };

    return (
        <PopupComponent isOpen={isOpen} onClose={() => dispatch(closeModals())}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Us</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="First Name"
                    type="text"
                    placeholder="Enter Your First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                <InputField
                    label="Last Name"
                    type="text"
                    placeholder="Enter Your Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <InputField
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <InputField
                    label="Phone Number"
                    type="text"
                    placeholder="Enter your phone number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                />
                <InputField
                    label="Date of Birth"
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                />
                {error && <p className="text-red-500">{error}</p>} {/* Display error message if it exists */}
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
