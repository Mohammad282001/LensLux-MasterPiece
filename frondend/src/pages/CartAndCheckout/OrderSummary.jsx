import React from 'react';
import { useCart } from 'react-use-cart';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
import visaLogo from "../../assets/images/paymentMethodsLogo/visaLogo.png"
import mastercardLogo from "../../assets/images/paymentMethodsLogo/mastercardLogo.png"
import paypalLogo from "../../assets/images/paymentMethodsLogo/paypalLogo.png"
import applepayLogo from "../../assets/images/paymentMethodsLogo/applepayLogo.png"
import stripeLogo from "../../assets/images/paymentMethodsLogo/stripeLogo.png"

const OrderSummary = ({ promoCode, setPromoCode, discount, discountApplied, applyDiscount, nextStep }) => {
    const { totalItems, cartTotal } = useCart();
    const totalAfterDiscount = cartTotal - (discountApplied ? discount : 0);
    console.log("cartTotal from orderSummary >> ", cartTotal)

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/3"
        >
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                        <span>Products</span>
                        <span>{totalItems} Items</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total</span>
                        <span>{cartTotal.toFixed(2)} JOD</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span className={discountApplied ? "text-green-600" : ""}>
                            {discountApplied ? `- ${discount.toFixed(2)} JOD` : '0 JOD'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery</span>
                        <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-300">
                        <span>Total</span>
                        <span>{totalAfterDiscount.toFixed(2)} JOD</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex">
                <input
                    className="w-full border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder='Promo Code'
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                    className="bg-black text-white px-4 rounded-r-md hover:bg-gray-800 transition-colors duration-300"
                    onClick={applyDiscount}
                >
                    Apply
                </button>
            </div>
            <div className="mt-6">
                <h4 className="font-semibold mb-2">Accepted Payment Methods</h4>
                <div className="flex gap-2">
                    <img src={visaLogo} className="h-10" alt="Visa" />
                    <img src={mastercardLogo} className="h-10" alt="Mastercard" />
                    <img src={paypalLogo} className="h-10" alt="PayPal" />
                    <img src={applepayLogo} className="h-10" alt="Apple Pay" />
                    <img src={stripeLogo} className="h-10" alt="Stripe" />
                </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 mt-10 flex items-center justify-center"
            >
                Continue to Delivery
                <ChevronRightIcon size={20} className="ml-2" />
            </motion.button>
        </motion.div>
    );
};
export default OrderSummary;