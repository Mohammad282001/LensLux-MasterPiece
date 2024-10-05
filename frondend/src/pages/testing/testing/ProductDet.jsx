
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCartIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, EyeIcon, ZoomInIcon, HeartIcon } from 'lucide-react';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showDetails, setShowDetails] = useState(false);
    const [showSpecs, setShowSpecs] = useState(false);
    const [isWishlist, setIsWishlist] = useState(false);
    const topRef = useRef(null);

    useEffect(() => {

        const fetchProductData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/glasses/get/${productId}`);
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setLoading(false);
            }
        };
        fetchProductData();
        topRef.current?.scrollIntoView({ behavior: 'smooth' });

    }, [productId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen text-xl text-gray-600">
                Product not found. Please check the product ID and try again.
            </div>
        );
    }

    const images = product.images.map(img => img.image_url);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const DiscountLabel = ({ discount_price, discount_percentage }) => {
        if (discount_price || discount_percentage) {
            const discountText = discount_price ? `${parseFloat(discount_price).toFixed(2)} JOD OFF` : `${discount_percentage}% OFF`;
            return (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 z-10 rounded-sm"
                >
                    {discountText}
                </motion.div>
            );
        }
        return null;
    };

    const PriceDisplay = ({ price, discount_price, discount_percentage }) => {
        const originalPrice = parseFloat(price);
        const discountedPrice = discount_price ? parseFloat(discount_price) : (discount_percentage ? (originalPrice * (1 - parseFloat(discount_percentage) / 100)).toFixed(2) : null);

        return (
            <div className="text-2xl font-semibold mb-4">
                {discountedPrice ? (
                    <>
                        <span className="line-through text-gray-400 mr-2">{originalPrice.toFixed(2)} JOD</span>
                        <span className="text-black">{discountedPrice} JOD</span>
                    </>
                ) : (
                    <span className="text-black">{originalPrice.toFixed(2)} JOD</span>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white min-h-screen" ref={topRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link to={`/glasses/${product.type}`} className="inline-flex items-center px-4 py-2 border border-black text-sm font-medium text-black hover:bg-black hover:text-white transition-colors duration-300 mb-4">
                    <ChevronRightIcon size={16} className="mr-2 transform rotate-180" />
                    Back to Collection
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <motion.h1
                            className="text-4xl font-light tracking-tight mb-2"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            {product.brand.brand_name}
                        </motion.h1>
                        <motion.p
                            className="text-2xl text-gray-600 mb-6"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            {product.model}
                        </motion.p>

                        <PriceDisplay
                            price={product.price}
                            discount_price={product.discount_price}
                            discount_percentage={product.discount_percentage}
                        />

                        <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

                        <div className="flex items-center mb-6 space-x-4">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button onClick={decreaseQuantity} className="px-3 py-2 text-gray-600 hover:bg-gray-100">-</button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="w-12 text-center border-x border-gray-300"
                                />
                                <button onClick={increaseQuantity} className="px-3 py-2 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex-grow flex items-center justify-center px-6 py-3 text-white text-lg font-medium rounded-lg transition duration-300 ${product.stock_quantity > 0 ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}
                                disabled={product.stock_quantity === 0}
                            >
                                <ShoppingCartIcon size={20} className="mr-2" />
                                {product.stock_quantity > 0 ? 'Add To Bag' : 'Out of Stock'}
                            </motion.button>
                        </div>

                        <p className={`text-lg font-semibold mb-4 ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </p>

                        {product.has_virtual_try_on && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full mb-4 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 flex items-center justify-center"
                            >
                                <EyeIcon size={20} className="mr-2" />
                                Virtual Try On
                            </motion.button>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsWishlist(!isWishlist)}
                            className={`w-full px-6 py-3 rounded-lg transition duration-300 flex items-center justify-center ${isWishlist ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                        >
                            <HeartIcon size={20} className="mr-2" />
                            {isWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </motion.button>
                    </div>

                    <motion.div
                        className="relative"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <div className="relative w-full pb-[100%] overflow-hidden bg-gray-100 rounded-lg group">
                            <DiscountLabel
                                discount_price={product.discount_price}
                                discount_percentage={product.discount_percentage}
                            />
                            <img
                                src={images[currentImage]}
                                alt={product.model}
                                className="absolute w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="bg-white bg-opacity-75 p-2 rounded-full"
                                >
                                    <ZoomInIcon size={24} />
                                </motion.button>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-4 overflow-x-auto pb-2">
                            {images.map((img, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg ${currentImage === index ? 'border-black' : 'border-transparent'}`}
                                >
                                    <img src={img} alt={`${product.model} view ${index + 1}`} className="object-cover w-full h-full rounded-lg" />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="mt-12 space-y-6">
                    <div className="border-t border-gray-200 pt-6">
                        <button
                            onClick={() => setShowSpecs(!showSpecs)}
                            className="flex items-center justify-between w-full py-3 text-left text-lg font-semibold text-gray-900 hover:text-black"
                        >
                            <span>Specifications</span>
                            {showSpecs ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
                        </button>
                        <AnimatePresence>
                            {showSpecs && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="py-4 space-y-2 text-gray-600">
                                        <p><span className="font-semibold">Brand:</span> {product.brand.brand_name}</p>
                                        <p><span className="font-semibold">Model:</span> {product.model}</p>
                                        <p><span className="font-semibold">Category:</span> {product.category}</p>
                                        <p><span className="font-semibold">Type:</span> {product.type}</p>
                                        <p><span className="font-semibold">Sub Type:</span> {product.sub_type}</p>
                                        <p><span className="font-semibold">Frame Shape:</span> {product.frame_shape}</p>
                                        <p><span className="font-semibold">Face Shape Compatibility:</span> {product.face_frame_shape}</p>
                                        <p><span className="font-semibold">Color:</span> {product.color_name}</p>
                                        <div className="flex items-center">
                                            <span className="font-semibold mr-2">Color Sample:</span>
                                            <div
                                                className="w-6 h-6 rounded-full border border-gray-300"
                                                style={{ backgroundColor: product.color_hex }}
                                            ></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex items-center justify-between w-full py-3 text-left text-lg font-semibold text-gray-900 hover:text-black"
                        >
                            <span>Product Details</span>
                            {showDetails ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
                        </button>
                        <AnimatePresence>
                            {showDetails && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="py-4 space-y-2 text-gray-600">
                                        <p><span className="font-semibold">Lens Width:</span> {product.details[0].lens_width} mm</p>
                                        <p><span className="font-semibold">Bridge Width:</span> {product.details[0].bridge_width} mm</p>
                                        <p><span className="font-semibold">Temple Length:</span> {product.details[0].temple_length} mm</p>
                                        <p><span className="font-semibold">Lens Height:</span> {product.details[0].lens_height} mm</p>
                                        <p><span className="font-semibold">Total Width:</span> {product.details[0].total_width} mm</p>
                                        <p><span className="font-semibold">Weight:</span> {product.details[0].weight} g</p>
                                        <p><span className="font-semibold">Frame Material:</span> {product.details[0].frame_material}</p>
                                        <p><span className="font-semibold">Lens Type:</span> {product.details[0].lens_type}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* size guide  */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-8 p-4 bg-gray-100 rounded-lg cursor-pointer"
                        onClick={() => { }}
                    >
                        <h3 className="text-lg font-semibold mb-2">Size Guide</h3>
                        <p className="text-sm text-gray-600">Click to view our comprehensive size guide and find your perfect fit.</p>
                    </motion.div>

                    {/* Product Comparison Feature */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Compare with Similar Products</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Placeholder for similar products */}
                            {[1, 2, 3].map((item) => (
                                <motion.div
                                    key={item}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white p-4 rounded-lg shadow-md"
                                >
                                    <div className="w-full h-40 bg-gray-200 rounded-md mb-4"></div>
                                    <h4 className="font-semibold">Similar Product {item}</h4>
                                    <p className="text-sm text-gray-600">Short description...</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Reviews Section */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-semibold mb-6">Customer Reviews</h3>
                        <div className="space-y-6">
                            {/* Placeholder for customer reviews */}
                            {[1, 2, 3].map((review) => (
                                <div key={review} className="border-b border-gray-200 pb-6">
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                                        <div>
                                            <p className="font-semibold">Customer Name</p>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                            ))}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
                        >
                            Write a Review
                        </motion.button>
                    </div>

                    {/* Frequently Asked Questions */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {[
                                { q: "How do I know if these glasses will fit me?", a: "We provide detailed measurements in our size guide. You can also use our virtual try-on feature to see how they look on you." },
                                { q: "What's your return policy?", a: "We offer a 30-day return policy for all our products. If you're not satisfied, you can return the item for a full refund or exchange." },
                                { q: "Do you offer prescription lenses?", a: "Yes, we can fit prescription lenses to this frame. You can select this option during checkout." }
                            ].map((faq, index) => (
                                <div key={index} className="border-b border-gray-200 pb-4">
                                    <h4 className="font-semibold mb-2">{faq.q}</h4>
                                    <p className="text-gray-600">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
