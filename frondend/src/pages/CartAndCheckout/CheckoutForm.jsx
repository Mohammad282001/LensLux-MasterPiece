import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronRightIcon, AlertCircle } from 'lucide-react';

const CheckoutForm = ({ cartTotal, nextStep, orderId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    const handleCardPayment = async (event) => {
        event.preventDefault();
        setIsProcessing(true);
        setPaymentError(null);

        if (!stripe || !elements) {
            setPaymentError('Stripe has not loaded correctly. Please refresh the page and try again.');
            setIsProcessing(false);
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                throw new Error(error.message);
            }

            console.log('Payment method created:', paymentMethod.id);
            console.log('Order ID:', orderId);
            console.log('Cart Total:', cartTotal);

            // Process payment on the server
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/api/orders/process-payment', {
                order_id: orderId,
                payment_method_id: paymentMethod.id,
                amount: Math.round(cartTotal * 100), // Convert to cents and ensure it's an integer
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                console.log('Payment processed successfully');
                nextStep();
            } else {
                throw new Error(response.data.message || 'Payment processing failed. Please try again.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            setPaymentError(error.response?.data?.message || error.message || 'An unexpected error occurred. Please try again or contact support.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleCardPayment}
            className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
        >
            <h3 className="text-2xl font-bold mb-4">Payment Information</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Card Number</label>
                    <CardNumberElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Expiration Date</label>
                        <CardExpiryElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">CVC</label>
                        <CardCvcElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                </div>
            </div>
            {paymentError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{paymentError}</span>
                    <AlertCircle className="absolute top-0 right-0 mr-2 mt-2" size={20} />
                </div>
            )}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!stripe || isProcessing}
                className={`w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isProcessing ? 'Processing...' : 'Complete Purchase'}
                {!isProcessing && <ChevronRightIcon size={20} className="ml-2" />}
            </motion.button>
            <p className="text-sm text-gray-600 mt-4 text-center">
                Your payment information is securely processed by Stripe. We do not store your card details.
            </p>
        </motion.form>
    );
};

export default CheckoutForm;