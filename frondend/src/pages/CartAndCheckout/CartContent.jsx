import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import OrderSummary from './OrderSummary';
import { ShoppingCartIcon } from 'lucide-react';
import CartItemDetails from './CartItemDetails';

const CartContent = ({ nextStep }) => {
    const { items, updateItemQuantity, removeItem, isEmpty } = useCart();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(false);
    const { cartTotal } = useCart();

    const applyDiscount = () => {
        if (promoCode.toLowerCase() === 'discount10') {
            setDiscount(cartTotal * 0.1);
            setDiscountApplied(true);
        } else {
            alert('Invalid promo code');
            setDiscount(0);
            setDiscountApplied(false);
        }
    };

    if (isEmpty) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center flex-grow p-8 bg-gray-100 rounded-lg shadow-md"
            >
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
                    <p className="text-gray-500">It looks like you haven't added anything to your cart yet.</p>
                    <Link to="/market"
                        className="mt-4 inline-block px-6 py-3 w-full bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300">
                        <ShoppingCartIcon size={20} className="inline-block mr-2" />
                        Browse Products
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col mb-4 pb-4 border-b"
                    >
                        <div className="flex items-center gap-4">
                            <img src={item.images[0].image_url} alt={item.name} className="w-24 h-24 object-contain rounded-lg" />
                            <div className="flex-grow">
                                <h4 className="font-bold">{item.brand}</h4>
                                <p className="text-sm text-gray-600">{item.model}</p>
                                <div className="mt-2">
                                    <button onClick={() => removeItem(item.id)} className="text-sm underline mr-2 text-red-600">Delete</button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <select
                                    value={item.quantity}
                                    onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))}
                                    className="mr-4 p-1 border rounded"
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <span className="font-bold">{(parseFloat(item.price) * item.quantity).toFixed(2)} JOD</span>
                            </div>
                        </div>
                        <CartItemDetails details={item.details} />
                    </motion.div>
                ))}
            </div>
            <OrderSummary
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                discount={discount}
                discountApplied={discountApplied}
                applyDiscount={applyDiscount}
                nextStep={nextStep}
            />
        </div>
    );
};

export default CartContent;