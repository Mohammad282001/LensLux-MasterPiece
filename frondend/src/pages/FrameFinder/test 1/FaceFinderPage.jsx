import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, ChevronRight } from 'lucide-react';
import * as faceapi from 'face-api.js';
import { FaceDetection, FileUpload, Instructions } from './FaceDetection';

const FaceFinderPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUsingCamera, setIsUsingCamera] = useState(true);
    const [faceShape, setFaceShape] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);

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

    const toggleInputMethod = () => {
        setIsUsingCamera(!isUsingCamera);
        setFaceShape(null);
        setError(null);
        setUploadedImage(null);
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
                                Face Shape Finder
                            </motion.h1>
                            <motion.p
                                className="text-xl text-gray-600 mb-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                Discover your face shape to find the perfect glasses for you.
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
                                    {isUsingCamera ? (
                                        <>
                                            <Upload className="mr-2" size={20} />
                                            Switch to Image Upload
                                        </>
                                    ) : (
                                        <>
                                            <Camera className="mr-2" size={20} />
                                            Switch to Camera
                                        </>
                                    )}
                                    <ChevronRight size={20} className="ml-2" />
                                </button>
                            </motion.div>
                        </div>
                        <motion.div
                            className="md:w-1/2 relative"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <img
                                src="https://www.zennioptical.com/blog/wp-content/uploads/2024/03/Men2024_850x850-Antoney-Blog-Featured-Image.jpg"
                                alt="Featured Face Shape"
                                className="w-full h-auto object-cover rounded-lg shadow-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <div className='px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <AnimatePresence>
                    {isLoading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center items-center h-64"
                        >
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                {isUsingCamera ? (
                                    <FaceDetection
                                        setFaceShape={setFaceShape}
                                        setError={setError}
                                    />
                                ) : (
                                    <FileUpload
                                        setUploadedImage={setUploadedImage}
                                        setFaceShape={setFaceShape}
                                        setError={setError}
                                    />
                                )}
                                {error && (
                                    <p className="mt-4 text-red-600">{error}</p>
                                )}
                                {faceShape && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 text-xl font-semibold"
                                    >
                                        Your face shape appears to be: {faceShape}
                                    </motion.p>
                                )}
                            </div>
                            <Instructions />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FaceFinderPage;