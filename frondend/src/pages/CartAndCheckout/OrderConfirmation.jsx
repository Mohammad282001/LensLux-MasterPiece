import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import animationData from './animation/confirrmationGlasses.json';
import { ChevronRightIcon } from 'lucide-react';

const OrderConfirmation = ({ deliveryInfo }) => {
    const { items, cartTotal } = useCart();

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Order Confirmation</h2>
            <div className="w-64 h-64 mx-auto">
                <Lottie options={defaultOptions} height={150} width={300} />
            </div>
            <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold mb-2">Order Details</h3>
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-2">
                        <span>{item.brand} {item.model} x {item.quantity}</span>
                        <span>{(item.price * item.quantity).toFixed(2)} JOD</span>
                    </div>
                ))}
                <div className="flex justify-between items-center font-bold mt-4">
                    <span>Total</span>
                    <span>{cartTotal.toFixed(2)} JOD</span>
                </div>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Delivery Information</h3>
                <p>{deliveryInfo.fullName}</p>
                <p>{deliveryInfo.address}</p>
                <p>{deliveryInfo.city}, {deliveryInfo.country} {deliveryInfo.postalCode}</p>
                <p>Phone: {deliveryInfo.phone}</p>
            </div>
            <div className="text-center">
                <p className="text-green-600 font-semibold mb-4">Your order has been placed successfully!</p>
            </div>
            <motion.div
                className="flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link to="/">
                    <button className="bg-black text-white py-3 px-6 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:bg-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center">
                        Back to Home Page
                        <ChevronRightIcon size={20} className="ml-2" />
                    </button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default OrderConfirmation;