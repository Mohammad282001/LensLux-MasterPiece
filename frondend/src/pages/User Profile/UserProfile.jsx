import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import TabNavigation from './TabNavigation';
import ProfileTab from './ProfileTab';
import OrdersTab from './OrdersTab';
import ChangePasswordTab from './ChangePasswordTab';
import Navbar from '../../layouts/navbar/Navbar';
import Footer from '../../layouts/footer';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [editingFields, setEditingFields] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchUserData();
        fetchOrders();
    }, []);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No authentication token found. Please log in.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://localhost:3000/api/users/userProfile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data.data.user);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch user data. Please try again.');
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        // Implement this function to fetch user's orders
        // For now, we'll use dummy data
        setOrders([
            { id: 1, date: '2024-10-05', status: 'Delivered', total: 250 },
            { id: 2, date: '2024-10-07', status: 'Shipped', total: 180 },
            { id: 3, date: '2024-10-08', status: 'Processing', total: 300 },
        ]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const toggleEditing = (field) => {
        setEditingFields(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No authentication token found. Please log in.');
            return;
        }

        try {
            const response = await axios.put('http://localhost:3000/api/users/updateUser', user, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data.data.user);
            setEditingFields({});
            alert('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile. Please try again.');
        }
    };

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }

    if (!user) {
        return <div className="text-center mt-8">No user data found.</div>;
    }

    const tabContent = {
        profile: <ProfileTab
            user={user}
            editingFields={editingFields}
            toggleEditing={toggleEditing}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
        />,
        orders: <OrdersTab orders={orders} />,
        changePassword: <ChangePasswordTab />,
    };

    return (
        <>
            <header>
                <Navbar></Navbar>
            </header>
            <main>
                <div className=" min-h-screen">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="mb-8"
                        >
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Account</h1>
                            <p className="text-xl text-gray-600">
                                Manage your personal information, orders, and preferences.
                            </p>
                        </motion.div>

                        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                        <motion.div
                            className="bg-white shadow-lg rounded-lg overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <div className="p-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {tabContent[activeTab]}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </>
    );
};

export default UserProfile;