import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as faceapi from 'face-api.js';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassesIcon, SunIcon, UserIcon, ChevronRightIcon, ShoppingCartIcon } from 'lucide-react';

const FaceShapeFinderPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [faceShape, setFaceShape] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [facePosition, setFacePosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [isUsingCamera, setIsUsingCamera] = useState(true);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [compatibleGlasses, setCompatibleGlasses] = useState([]);

    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
                setIsLoading(false);
            } catch (err) {
                setError('Failed to load face detection models. Please refresh and try again.');
                setIsLoading(false);
            }
        };

        loadModels();
    }, []);

    useEffect(() => {
        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                setError('Unable to access camera. Please ensure you have given permission.');
            }
        };

        if (!isLoading && isUsingCamera) {
            startVideo();
        }
    }, [isLoading, isUsingCamera]);

    const analyzeFaceShape = useCallback((landmarks) => {
        const jaw = landmarks.getJawOutline();
        const leftEyebrow = landmarks.getLeftEyeBrow();
        const rightEyebrow = landmarks.getRightEyeBrow();

        const faceLength = jaw[8].y - (leftEyebrow[0].y + rightEyebrow[4].y) / 2;
        const jawWidth = Math.abs(jaw[16].x - jaw[0].x);
        const foreheadWidth = Math.abs(leftEyebrow[4].x - rightEyebrow[0].x);
        const chinWidth = Math.abs(jaw[10].x - jaw[6].x);
        const cheekboneWidth = Math.abs(jaw[14].x - jaw[2].x);

        const lengthWidthRatio = faceLength / jawWidth;
        const foreheadJawRatio = foreheadWidth / jawWidth;
        const chinJawRatio = chinWidth / jawWidth;
        const cheekboneJawRatio = cheekboneWidth / jawWidth;

        console.log("Face Measurements:", {
            faceLength, jawWidth, foreheadWidth, chinWidth, cheekboneWidth,
            lengthWidthRatio, foreheadJawRatio, chinJawRatio, cheekboneJawRatio
        });

        if (lengthWidthRatio > 1.75) return 'Oblong';
        if (cheekboneJawRatio > 1.1 && chinJawRatio < 0.9) return 'Diamond';
        if (foreheadJawRatio < 0.9 && chinJawRatio < 0.9) return 'Triangle';
        if (foreheadJawRatio > 1.1 && chinJawRatio < 0.9) return 'Heart';
        if (lengthWidthRatio < 1.2 && cheekboneJawRatio > 0.95) return 'Round';
        if (lengthWidthRatio > 1.2 && lengthWidthRatio < 1.4 && jawWidth / cheekboneWidth > 0.99) return 'Square';
        return 'Oval';
    }, []);

    const detectFace = useCallback(async () => {
        if ((!videoRef.current && !uploadedImage) || isLoading) return;

        setError(null);
        try {
            let inputElement = isUsingCamera ? videoRef.current : uploadedImage;

            if (inputElement.videoWidth === 0 || inputElement.videoHeight === 0) {
                throw new Error("Video or image dimensions are not available. Please try again.");
            }

            const detections = await faceapi.detectAllFaces(inputElement, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();

            if (detections && detections.length > 0) {
                const landmarks = detections[0].landmarks;
                const shape = analyzeFaceShape(landmarks);
                setFaceShape(shape);

                console.log("Detected face shape:", shape);

                const displaySize = {
                    width: inputElement.videoWidth || inputElement.width,
                    height: inputElement.videoHeight || inputElement.height
                };

                if (displaySize.width === 0 || displaySize.height === 0) {
                    throw new Error("Invalid display dimensions. Please try again.");
                }

                faceapi.matchDimensions(canvasRef.current, displaySize);
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

                fetchCompatibleGlasses(shape);
            } else {
                setError('No face detected. Please ensure your face is clearly visible.');
            }
        } catch (err) {
            console.error('Face detection error:', err);
            setError(`Face detection failed: ${err.message}`);
        }
    }, [isUsingCamera, uploadedImage, isLoading, analyzeFaceShape]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setUploadedImage(img);
                    setIsUsingCamera(false);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleInputMethod = () => {
        setIsUsingCamera(!isUsingCamera);
        setFaceShape(null);
        setError(null);
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    const fetchCompatibleGlasses = async (shape) => {
        try {
            const response = await fetch(`http://localhost:3000/api/glasses/filter?faceShape=${shape}`);
            const data = await response.json();
            setCompatibleGlasses(data);
        } catch (error) {
            console.error("Error fetching compatible glasses:", error);
            setError("Failed to fetch compatible glasses. Please try again.");
        }
    };

    const DiscountLabel = ({ discount_price, discount_percentage, oldPrice }) => {
        if (discount_price || discount_percentage) {
            const discountText = discount_price ? `${oldPrice - discount_price}JOD OFF` : `${discount_percentage}% OFF`;
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
        const discountedPrice = discount_price || (discount_percentage ? (parseFloat(price) * (1 - parseFloat(discount_percentage) / 100)).toFixed(2) : null);

        return (
            <div className="flex justify-between items-baseline mt-2">
                <div>
                    {discountedPrice ? (
                        <>
                            <span className="line-through text-gray-400 text-sm mr-2">{parseFloat(price).toFixed(2)}JOD</span>
                            <span className="text-black text-lg font-medium">{discountedPrice}JOD</span>
                        </>
                    ) : (
                        <span className="text-lg font-medium text-black">${parseFloat(price).toFixed(2)}</span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white min-h-screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative bg-gray-50 text-black"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-24 md:py-32 lg:py-40 flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <motion.h1
                                className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Find Your Perfect Fit
                            </motion.h1>
                            <motion.p
                                className="text-xl text-gray-600 mb-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                Discover your face shape and get personalized frame recommendations.
                            </motion.p>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                <button
                                    onClick={toggleInputMethod}
                                    className="inline-flex items-center px-6 py-3 border border-black text-base font-medium text-black hover:bg-black hover:text-white transition-colors duration-300"
                                >
                                    {isUsingCamera ? "Switch to Image Upload" : "Switch to Camera"}
                                    <ChevronRightIcon size={20} className="ml-2" />
                                </button>
                            </motion.div>
                        </div>
                        <motion.div
                            className="md:w-1/2 relative"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <div className="relative w-full pb-[100%] overflow-hidden bg-gray-100 rounded-lg">
                                {isUsingCamera ? (
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        muted
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                ) : (
                                    uploadedImage && (
                                        <img
                                            src={uploadedImage.src}
                                            alt="Uploaded"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    )
                                )}
                                <canvas
                                    ref={canvasRef}
                                    className="absolute inset-0 w-full h-full"
                                />
                            </div>
                            {!isUsingCamera && (
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept="image/*"
                                    className="mt-4"
                                />
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={detectFace}
                    className="mb-8 px-8 py-3 bg-black text-white rounded-md shadow-sm transition-all duration-300 flex items-center space-x-2"
                >
                    <UserIcon size={18} />
                    <span>Detect Face Shape</span>
                </motion.button>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 mb-4"
                    >
                        {error}
                    </motion.p>
                )}

                {faceShape && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-light mb-4">Your Face Shape: <span className="font-medium">{faceShape}</span></h2>
                        <p className="text-xl text-gray-600">Here are some frame styles that complement your face shape:</p>
                    </motion.div>
                )}

                <AnimatePresence>
                    {compatibleGlasses.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {compatibleGlasses.map(product => (
                                <motion.div
                                    key={product.glasses_id}
                                    whileHover={{ y: -5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="bg-white overflow-hidden transition-all duration-300 hover:shadow-lg rounded-lg">
                                        <div className="relative">
                                            <DiscountLabel
                                                discount_price={product.discount_price}
                                                discount_percentage={product.discount_percentage}
                                                oldPrice={product.price}
                                            />
                                            <div className="relative w-full pb-[100%] overflow-hidden bg-gray-100 rounded-t-lg">
                                                <div className="absolute inset-0 flex items-center justify-center group">
                                                    {product.images && product.images.length > 0 && (
                                                        <>
                                                            <img
                                                                src={product.images[0].image_url}
                                                                alt={product.model}
                                                                className="absolute w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                                                            />
                                                            {product.images.length > 1 && (
                                                                <img
                                                                    src={product.images[1].image_url}
                                                                    alt={product.model}
                                                                    className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h2 className="text-lg font-medium mb-1 text-black">{product.brand.brand_name}</h2>
                                            <p className="text-sm text-gray-500 mb-2">{product.model}</p>
                                            <PriceDisplay
                                                price={product.price}
                                                discount_price={product.discount_price}
                                                discount_percentage={product.discount_percentage}
                                            />
                                            <div className="mt-4 flex justify-between items-center">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    {product.type === 'eyeglasses' ? <GlassesIcon size={14} className="mr-1" /> : <SunIcon size={14} className="mr-1" />}
                                                    {product.type}
                                                </span>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="text-black hover:text-gray-700 transition-colors duration-300"
                                                    onClick={() => console.log("added to cart", product.glasses_id)}
                                                >
                                                    <ShoppingCartIcon size={20} />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {compatibleGlasses.length === 0 && faceShape && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl text-gray-600 text-center mt-8"
                    >
                        No compatible glasses found for your face shape. Try adjusting your face position or lighting and try again.
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default FaceShapeFinderPage;