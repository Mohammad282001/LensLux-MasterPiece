import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, setError } from '../../redux/authSlice';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error); // Get error from Redux state
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
                navigate("/");
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Join Us
                </h2>
                <p className="text-center text-orange-500 font-medium mb-4">
                    Discover your perfect vision
                </p>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message if it exists */}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="First Name"
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Last Name"
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Phone Number"
                        type="text"
                        placeholder="Phone Number"
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
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-orange-500 transition duration-300 shadow-md text-lg font-semibold"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <span
                        className="text-orange-500 cursor-pointer hover:underline"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
