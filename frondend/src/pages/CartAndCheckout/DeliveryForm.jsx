import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeliveryForm = ({ nextStep, setDeliveryInfo }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        phone: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to proceed.');
                setIsLoading(false);
                return;
            }
            try {
                const response = await axios.get('http://localhost:3000/api/users/userProfile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const userData = response.data.data.user;
                setFormData(prevData => ({
                    ...prevData,
                    fullName: `${userData.first_name} ${userData.last_name}`,
                    phone: userData.phone_number || ''
                }));
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError('Failed to load user data. Please try again.');
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDeliveryInfo(formData);
        nextStep();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => navigate('/login', { state: { returnTo: '/cart' } })}
                    className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
        >
            <h3 className="text-2xl font-bold mb-4">Delivery Information</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>
                </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
            >
                Continue to Payment
                <ChevronRightIcon size={20} className="ml-2" />
            </motion.button>
        </motion.form>
    );
};

export default DeliveryForm;