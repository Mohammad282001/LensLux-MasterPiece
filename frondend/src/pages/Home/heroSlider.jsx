import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
    {
        image: "https://seeandbeseeneyecare.com/wp-content/uploads/2021/09/seeandbeseen-midtown-galllery-img18.jpg",
        title: "Stylish Frames",
        description: "Discover our collection of trendy eyewear",
        ctaText: "Shop Frames",
        link: "/glasses/optical"
    },
    {
        image: "https://healthcare.utah.edu/sites/g/files/zrelqx136/files/media/images/2023/Eye%20Exam-AdobeStock_572571508.jpeg",
        title: "Book An Eye Exam",
        description: "Schedule your eye exam today to ensure your vision stays sharp and your prescription is up-to-date",
        ctaText: "Book Now",
        link: "/eyeExam"
    },
    {
        video: "https://www.youtube.com/embed/qFLCx8naQqE?autoplay=1&loop=1&playlist=qFLCx8naQqE&mute=1",
        title: "Frame Finder",
        description: "Find your perfect frame upon your face shape",
        ctaText: "Find A Frame",
        link: "/framefinder"
    }
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(1);

    const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    const slideVariants = {
        hidden: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
            },
        },
        exit: (direction) => ({
            x: direction > 0 ? '-100%' : '100%',
            opacity: 0,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 5.0 },
            },
        }),
    };

    return (
        <div className="relative w-full h-[600px] overflow-hidden bg-gray-100">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-0 left-0 w-full h-full"
                >
                    {slides[currentSlide].image ? (
                        <img
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            className="w-full h-full object-cover blur-sm"
                        />
                    ) : (
                        <iframe
                            src={slides[currentSlide].video}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                            style={{ border: 'none' }}
                        ></iframe>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white max-w-2xl mx-auto px-4">
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-5xl font-bold mb-4"
                            >
                                {slides[currentSlide].title}
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-xl mb-8"
                            >
                                {slides[currentSlide].description}
                            </motion.p>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                <Link to={slides[currentSlide].link} className="inline-block">
                                    <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-colors">
                                        {slides[currentSlide].ctaText}
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
                <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-red-500' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
