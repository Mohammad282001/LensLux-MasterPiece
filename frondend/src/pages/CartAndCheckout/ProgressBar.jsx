import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { ShoppingCart, Truck, CreditCard, Check } from 'lucide-react';
import animationData from './animation/coffee-animation.json';

const ProgressBar = ({ step }) => {
    const totalSteps = 4;
    const progressPercentage = (step / totalSteps) * 100;
    const animationSpeed = 1 + (step * 0.5);

    const steps = [
        { label: 'Cart', icon: ShoppingCart },
        { label: 'Delivery', icon: Truck },
        { label: 'Payment', icon: CreditCard },
        { label: 'Confirmation', icon: Check },
    ];

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="relative flex items-center justify-between mb-10 mt-10">
            {/* Progress bar background */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full"></div>

            {/* Animated progress bar */}
            <motion.div
                className="absolute top-1/2 left-0 h-1 bg-[#00262A] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            ></motion.div>

            {steps.map((stepItem, index) => (
                <div key={index} className="relative flex-1 text-center">
                    {/* Circle indicator for each step */}
                    <motion.div
                        className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full ${index < step ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                            }`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <stepItem.icon size={20} />
                    </motion.div>

                    {/* Step labels */}
                    <motion.span
                        className={`block text-sm mt-2 ${index < step ? 'text-black font-semibold' : 'text-gray-500'
                            }`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.1 }}
                    >
                        {stepItem.label}
                    </motion.span>
                </div>
            ))}

            {/* Lottie coffee icon animation */}
            <motion.div
                className="absolute -translate-y-[-0.4rem]"
                initial={{ left: 0 }}
                animate={{ left: `calc(${progressPercentage}% - 75px)` }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <Lottie
                    options={{ ...defaultOptions, animationSpeed }}
                    height={50}
                    width={90}
                />
            </motion.div>
        </div>
    );
};

export default ProgressBar;