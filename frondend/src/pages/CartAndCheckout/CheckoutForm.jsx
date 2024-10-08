import React, { useState, useEffect } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';

const CheckoutForm = ({ cartTotal, nextStep }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [paymentRequest, setPaymentRequest] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Total',
                    amount: Math.round(cartTotal * 100),
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            pr.canMakePayment().then(result => {
                if (result) {
                    setPaymentRequest(pr);
                }
            });
        }
    }, [stripe, cartTotal]);

    const handleCardPayment = async (event) => {
        event.preventDefault();
        setIsProcessing(true);
        setPaymentError(null);

        if (!stripe || !elements) {
            setPaymentError('Stripe has not loaded correctly.');
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
                setPaymentError(error.message);
                setIsProcessing(false);
                return;
            }

            // Here you would typically send the paymentMethod.id to your server
            // and create a PaymentIntent. For this example, we'll simulate a successful payment.
            setTimeout(() => {
                setIsProcessing(false);
                nextStep();
            }, 2000);

        } catch (error) {
            setPaymentError('An unexpected error occurred. Please try again.');
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

            <div className="flex justify-between mb-4">
                <label className={`flex items-center border p-2 rounded-md cursor-pointer ${paymentMethod === 'creditCard' ? 'border-black shadow-lg' : 'border-gray-300'}`}>
                    <input
                        className="sr-only"
                        type="radio"
                        value="creditCard"
                        checked={paymentMethod === 'creditCard'}
                        onChange={() => setPaymentMethod('creditCard')}
                    />
                    <span className="ml-2">Credit Card</span>
                </label>

                <label className={`flex items-center border p-2 rounded-md cursor-pointer ${paymentMethod === 'apple' ? 'border-black shadow-lg' : 'border-gray-300'}`}>
                    <input
                        className="sr-only"
                        type="radio"
                        value="apple"
                        checked={paymentMethod === 'apple'}
                        onChange={() => setPaymentMethod('apple')}
                    />
                    <span className="ml-2">Apple Pay</span>
                </label>
            </div>

            {paymentMethod === 'apple' && paymentRequest && (
                <PaymentRequestButtonElement options={{ paymentRequest }} />
            )}

            {paymentMethod === 'creditCard' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Card Number</label>
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
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">Expiration Date</label>
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
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">CVC</label>
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
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </div>
                </div>
            )}

            {paymentError && (
                <div className="text-red-500 text-sm mt-2">
                    {paymentError}
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
        </motion.form>
    );
};

export default CheckoutForm;