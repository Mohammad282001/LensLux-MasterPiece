import React, { useState, useCallback, useMemo } from "react";
import TryOnBtn from "./TryOnBtn";
import { ShoppingCartIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";
import { useCart } from "react-use-cart";
import LensesSelectionPopup from "./PopupSelections/LensesSelectionPopup";


const DiscountLabel = ({ discountPrice, discountPercentage }) => {
    if (!discountPrice && !discountPercentage) return null;
    const discountText = discountPrice
        ? `${parseFloat(discountPrice).toFixed(2)} JOD OFF`
        : `${discountPercentage}% OFF`;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 z-10 rounded-sm"
        >
            {discountText}
        </motion.div>
    );
};

const PriceDisplay = ({ price, discountPrice, discountPercentage }) => {
    const originalPrice = parseFloat(price);
    const discountedPrice = useMemo(() => {
        if (discountPrice) {
            return parseFloat(discountPrice);
        } else if (discountPercentage) {
            return (originalPrice * (1 - parseFloat(discountPercentage) / 100)).toFixed(2);
        }
        return null;
    }, [originalPrice, discountPrice, discountPercentage]);

    return (
        <div className="text-2xl font-semibold mb-4">
            {discountedPrice ? (
                <>
                    <span className="line-through text-gray-400 mr-2">
                        {originalPrice.toFixed(2)} JOD
                    </span>
                    <span className="text-black">{discountedPrice} JOD</span>
                </>
            ) : (
                <span className="text-black">{originalPrice.toFixed(2)} JOD</span>
            )}
        </div>
    );
};

const ProductOverview = ({ product }) => {











    const [currentImage, setCurrentImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isLensPopupOpen, setIsLensPopupOpen] = useState(false);
    const images = product.images.map((img) => img.image_url);
    const increaseQuantity = useCallback(() => setQuantity(prev => prev < product.stock_quantity ? prev + 1 : prev), [product.stock_quantity]);
    const decreaseQuantity = useCallback(() => setQuantity(prev => prev > 1 ? prev - 1 : 1), []);
    const isInStock = product.stock_quantity > 0;
    const stockQuantity = product.stock_quantity;
    const { addItem, updateItemQuantity, getItem } = useCart();







    const discountedPrice = useMemo(() => {
        if (product.discount_price) {
            return parseFloat(product.discount_price);
        } else if (product.discount_percentage) {
            return (parseFloat(product.price) * (1 - parseFloat(product.discount_percentage) / 100)).toFixed(2);
        }
        return parseFloat(product.price);
    }, [product.price, product.discount_price, product.discount_percentage]);

    const handleAddToCart = () => {
        if (product.type === "eyeglasses") {
            setIsLensPopupOpen(true);
        } else {
            const itemToAdd = {
                id: product.glasses_id,
                brand: product.brand.brand_name,
                model: product.model,
                price: discountedPrice,
                quantity: quantity,
                images: product.images,
                description: product.description,
                details: ""
            };

            const existingItem = getItem(product.glasses_id);
            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                updateItemQuantity(product.glasses_id, newQuantity);
            } else {
                addItem(itemToAdd);
            }

            console.log("Added to cart:", itemToAdd);
            setQuantity(1); // Reset quantity to 1 after adding to cart
        }
    };



    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };




    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-7 pb-10">
            <div className="md:w-1/2 mb-10 md:mb-0">
                <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    {product.brand.brand_name}
                </motion.h1>
                <motion.p
                    className="text-xl text-gray-600 mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    {product.model}
                </motion.p>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <PriceDisplay
                        price={product.price}
                        discountPrice={product.discount_price}
                        discountPercentage={product.discount_percentage}
                    />
                    <p className="text-gray-600 leading-relaxed mb-6">
                        {product.description}
                    </p>
                    <div className="flex items-center mb-6 space-x-4">
                        {/* 



                        <div className="flex items-center border border-black">
                            <button
                                onClick={decreaseQuantity}
                                className="inline-flex items-center px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors duration-300"
                                aria-label="Decrease quantity"
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                className="w-12 text-center bg-inherit"
                                aria-label="Quantity"
                            />
                            <button
                                onClick={stockQuantity > quantity ? increaseQuantity : null}
                                className={`inline-flex items-center px-4 py-2 text-base font-medium text-black ${stockQuantity > quantity
                                    ? "hover:bg-black hover:text-white transition-colors duration-300"
                                    : "cursor-not-allowed"
                                    }`}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div> */}


                        <div className="flex items-center border border-black">
                            <button
                                onClick={decreaseQuantity}
                                className="inline-flex items-center px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors duration-300"
                                aria-label="Decrease quantity"
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                className="w-12 text-center bg-inherit"
                                aria-label="Quantity"
                            />
                            <button
                                onClick={increaseQuantity}
                                className={`inline-flex items-center px-4 py-2 text-base font-medium text-black ${quantity < stockQuantity
                                    ? "hover:bg-black hover:text-white transition-colors duration-300"
                                    : "cursor-not-allowed"
                                    }`}
                                aria-label="Increase quantity"
                                disabled={quantity >= stockQuantity}
                            >
                                +
                            </button>
                        </div>


                        <div className="flex space-x-4">
                            <motion.button
                                whileHover={{ scale: isInStock ? 1.05 : 1 }}
                                whileTap={{ scale: isInStock ? 0.95 : 1 }}
                                className={`inline-flex items-center px-6 py-2 border border-black text-base font-medium transition-colors duration-300 ${isInStock ? "text-black hover:bg-black hover:text-white" : "bg-gray-400 cursor-not-allowed text-gray-700"
                                    }`}
                                onClick={handleAddToCart}
                                disabled={!isInStock}
                            >
                                <ShoppingCartIcon size={20} className="mr-2" />
                                {isInStock ? "Add To Bag" : "Out of Stock"}
                            </motion.button>
                            {product.has_virtual_try_on && <TryOnBtn />}
                        </div>
                    </div>

                    <p className={`text-lg font-semibold mb-4 ${stockQuantity === 0 ? "text-red-500" : stockQuantity <= 5 ? "text-yellow-500" : "text-green-600"}`}>
                        {stockQuantity === 0 ? "Out of Stock" : `${stockQuantity} Left in Stock`}
                    </p>
                </motion.div>
            </div>
            <motion.div
                className="md:w-1/2 relative"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                <div className="relative w-full pb-[100%] overflow-hidden bg-gray-100 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <DiscountLabel
                        discountPrice={product.discount_price}
                        discountPercentage={product.discount_percentage}
                    />
                    <img
                        src={images[currentImage]}
                        alt={`${product.model} - View ${currentImage + 1}`}
                        className="absolute w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="flex justify-center items-center space-x-6 mt-4">
                    <button
                        onClick={prevImage}
                        className="bg-black text-white p-1  hover:bg-gray-800"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex space-x-4 justify-center">
                        {images.map((img, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition-all duration-200 ${currentImage === index
                                    ? "border-black"
                                    : "border-transparent hover:border-gray-300"
                                    }`}
                                aria-label={`View image ${index + 1}`}
                            >
                                <img
                                    src={img}
                                    alt={`${product.model} view ${index + 1}`}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </motion.button>
                        ))}
                    </div>
                    <button
                        onClick={nextImage}
                        className="bg-black text-white p-1  hover:bg-gray-800"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </motion.div>
            <LensesSelectionPopup
                isOpen={isLensPopupOpen}
                onClose={() => setIsLensPopupOpen(false)}
                product={product}
                productPrice={discountedPrice}
            />
        </div>
    );
};

export default ProductOverview;