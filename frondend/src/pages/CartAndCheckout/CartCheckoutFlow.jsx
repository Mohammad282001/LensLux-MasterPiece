import React, { useState, useEffect, useCallback } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from 'react-use-cart';
import axios from 'axios';
import CartContent from './CartContent';
import DeliveryForm from './DeliveryForm';
import CheckoutForm from './CheckoutForm';
import OrderConfirmation from './OrderConfirmation';
import ProgressBar from './ProgressBar';
import Navbar from '../../layouts/navbar/Navbar';
import Footer from '../../layouts/footer';
import { ChevronLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const stripePromise = loadStripe('pk_test_51PeAmLGFMsHudRVCgSW72go7mjfilxpPFDqgl4N6RfOhbqYWnjyIL5cXJqkYfxSbjwY7YYtmBk8Zgb5qW70Fl9xZ00HSRj1lea');


const CartCheckoutFlow = () => {
    const [step, setStep] = useState(1);
    const [deliveryInfo, setDeliveryInfo] = useState({});
    const [orderId, setOrderId] = useState(null);
    const { cartTotal, emptyCart, items } = useCart();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await axios.get('http://localhost:3000/api/users/userProfile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
        } else {
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        const createOrder = async () => {
            if (items.length > 0 && isAuthenticated && !orderId) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.post('http://localhost:3000/api/orders/cart', {}, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setOrderId(response.data.id);
                } catch (error) {
                    console.error('Failed to create order:', error);
                }
            }
        };

        createOrder();
    }, [items, isAuthenticated, orderId]);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleOrderCompletion = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/orders/checkout', {
                order_id: orderId,
                shipping_address: deliveryInfo,
                total_amount: cartTotal,
                items: items.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price_per_item: item.price,
                    details: item.details
                }))
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            emptyCart();
            nextStep();
        } catch (error) {
            console.error('Failed to complete order:', error);
        }
    };

    const renderBackButton = () => {
        if (step > 1 && step < 4) {
            return (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    className="mb-4 inline-flex items-center px-4 py-2 border border-black text-base font-medium text-black hover:bg-black hover:text-white transition-colors duration-300"
                >
                    <ChevronLeftIcon size={20} className="mr-2" />
                    Back
                </motion.button>
            );
        }
        return null;
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <CartContent nextStep={nextStep} />;
            case 2:
                if (isLoading) {
                    return <div>Loading...</div>;
                }
                if (!isAuthenticated) {
                    navigate('/login', { state: { returnTo: '/cart' } });
                    return null;
                }
                return <DeliveryForm nextStep={nextStep} setDeliveryInfo={setDeliveryInfo} />;
            case 3:
                return <CheckoutForm cartTotal={cartTotal} nextStep={handleOrderCompletion} orderId={orderId} />;
            case 4:
                return <OrderConfirmation deliveryInfo={deliveryInfo} />;
            default:
                return null;
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Elements stripe={stripePromise}>
            <Navbar />
            <div className="bg-white min-h-screen">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative bg-gray-50 text-black"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
                                {step === 4 ? 'Order Confirmed' : 'Your Cart'}
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                {step === 4 ? 'Thank you for your purchase!' : 'Complete your purchase and enjoy your new eyewear.'}
                            </p>
                        </motion.div>
                        <ProgressBar step={step} />
                        {renderBackButton()}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderStepContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </Elements>
    );
};

export default CartCheckoutFlow;