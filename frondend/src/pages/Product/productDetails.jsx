import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch('/data/products.json');
                const data = await response.json();
                const productsArray = Array.isArray(data) ? data : Object.values(data).flat();
                const foundProduct = productsArray.find(item => item.id === parseInt(productId));
                if (foundProduct) {
                    setProduct(foundProduct);
                    setSelectedColor(foundProduct.colors_available[0]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setLoading(false);
            }
        };
        fetchProductData();
    }, [productId]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!product) return <div className="flex justify-center items-center h-screen">Product not found. Please check the product ID and try again.</div>;

    const images = [product.image_url, product.image_url2].filter(Boolean);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const DiscountLabel = ({ discount_price, discount_percentage }) => {
        if (discount_price || discount_percentage) {
            const discountText = discount_price ? `${discount_price.toFixed(2)} JOD OFF` : `${discount_percentage}% OFF`;
            return (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    <span className="block">{discountText}</span>
                </div>
            );
        }
        return null;
    };

    const PriceDisplay = ({ price, discount_price, discount_percentage }) => {
        const discountedPrice = discount_price || (discount_percentage ? (price * (1 - discount_percentage / 100)).toFixed(2) : null);

        return (
            <div className="text-2xl font-semibold mb-4">
                {discountedPrice ? (
                    <>
                        <span className="line-through text-gray-500 mr-2">{price.toFixed(2)} JOD</span>
                        <span className="text-orange-500">{discountedPrice} JOD</span>
                    </>
                ) : (
                    <span className="text-orange-500">{price.toFixed(2)} JOD</span>
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start">
                <div className="lg:w-1/2 mb-8 lg:mb-0 flex flex-col items-center">
                    <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                        <DiscountLabel
                            discount_price={product.price - product.discount_price}
                            discount_percentage={product.discount_percentage}
                        />
                        <img
                            src={images[currentImage]}
                            alt={product.model}
                            className="object-contain w-full h-full"
                        />
                    </div>
                    <div className="flex space-x-4 mt-4">
                        {images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`w-20 h-20 border-2 rounded-lg ${currentImage === index ? 'border-orange-500' : 'border-transparent'}`}
                            >
                                <img src={img} alt={`${product.model} view ${index + 1}`} className="object-contain w-full h-full" />
                            </button>
                        ))}
                    </div>
                    {product.try_on_available && (
                        <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300">
                            Try It Now
                        </button>
                    )}
                </div>
                <div className="lg:w-1/2 lg:pl-12 flex flex-col">
                    <h1 className="text-4xl font-bold mb-2">{product.brand}</h1>
                    <h2 className="text-xl font-semibold text-gray-600 mb-4">{product.model}</h2>

                    <PriceDisplay
                        price={product.price}
                        discount_price={product.discount_price}
                        discount_percentage={product.discount_percentage}
                    />

                    <div className="flex items-center mb-6 space-x-4">
                        {product.colors_available.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-orange-500' : 'border-gray-300'}`}
                                style={{ backgroundColor: color.toLowerCase() }}
                                title={color}
                            />
                        ))}
                    </div>

                    <div className="flex items-center mb-6 space-x-4">
                        <div className="flex items-center">
                            <button onClick={decreaseQuantity} className="px-2 py-1 bg-gray-200 text-gray-800 rounded-lg">-</button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                className="mx-2 w-12 text-center border border-gray-300 rounded-lg"
                            />
                            <button onClick={increaseQuantity} className="px-2 py-1 bg-gray-200 text-gray-800 rounded-lg">+</button>
                        </div>
                        <button
                            className={`px-6 py-2 text-white text-lg font-semibold rounded-lg transition duration-300 ${product.in_stock
                                ? 'bg-orange-500 hover:bg-orange-600'
                                : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            disabled={!product.in_stock}
                        >
                            {product.in_stock ? 'Add To Bag' : 'Out of Stock'}
                        </button>
                    </div>

                    <p className={`text-lg font-semibold mb-4 ${product.in_stock ? 'text-green-600' : 'text-red-500'}`}>
                        {product.in_stock ? 'Availability: In Stock' : 'Availability: Out of Stock'}
                    </p>

                    <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

                    <div className="text-lg space-y-2">
                        <p><span className="font-semibold">Frame Material:</span> {product.frame_material}</p>
                        <p><span className="font-semibold">Frame Shape:</span> {product.frame_shape}</p>
                        <p><span className="font-semibold">Face Shape Compatibility:</span> {product.face_frame_shape}</p>
                        <p><span className="font-semibold">Weight:</span> {product.weight}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
