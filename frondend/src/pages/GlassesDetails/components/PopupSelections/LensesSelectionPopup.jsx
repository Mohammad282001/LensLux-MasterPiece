import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import VisionNeedSelector from './VisionNeedSelector';
import LensThicknessSelector from './LensThicknessSelector';
import PrescriptionInput from './PrescriptionInput';
import LensTypeSelector from './LensTypeSelector';
import LensPerformanceSelector from './LensPerformanceSelector';
import OrderOverview from './OrderOverview';
import { useCart } from "react-use-cart";


const LensesSelectionPopup = ({ isOpen, onClose, product, productPrice }) => {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        visionNeed: '',
        visionNeedPrice: 0,
        lensThickness: '',
        lensThicknessPrice: 0,
        prescription: null,
        lensType: '',
        lensTypePrice: 0,
        lensPerformance: '',
        lensPerformancePrice: 0,
    });
    const [error, setError] = useState('');
    const { addItem } = useCart();
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setSelections({
                visionNeed: '',
                visionNeedPrice: 0,
                lensThickness: '',
                lensThicknessPrice: 0,
                prescription: null,
                lensType: '',
                lensTypePrice: 0,
                lensPerformance: '',
                lensPerformancePrice: 0,
            });
            setError('');
        }
    }, [isOpen]);

    const handleSelection = (key, value, price = 0) => {
        setSelections(prev => ({ ...prev, [key]: value, [`${key}Price`]: price }));
        setError('');
    };

    const handleNext = () => {
        if (isSelectionValid()) {
            if (step === 1 && selections.visionNeed === 'frame-only') {
                setStep(6); // Skip to OrderOverview for frame-only
            } else {
                setStep(prev => prev + 1);
            }
            setError('');
        } else {
            setError('Please make a selection before proceeding.');
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
            setError('');
        }
    };

    const isSelectionValid = () => {
        switch (step) {
            case 1:
                return selections.visionNeed !== '';
            case 2:
                return selections.lensThickness !== '';
            case 3:
                return selections.visionNeed === 'non-prescription' || selections.prescription !== null;
            case 4:
                return selections.lensType !== '';
            case 5:
                return selections.lensPerformance !== '';
            default:
                return true;
        }
    };

    const calculateTotalPrice = () => {
        return (
            parseFloat(productPrice) +
            selections.visionNeedPrice +
            selections.lensThicknessPrice +
            selections.lensTypePrice +
            selections.lensPerformancePrice
        );
    };

    // const handleAddToCart = () => {
    //     if (isSelectionValid()) {
    //         const totalPrice = calculateTotalPrice();
    //         console.log('Adding to cart:', { ...selections, product, totalPrice });
    //         onClose();
    //     } else {
    //         setError('Please complete all selections before adding to cart.');
    //     }
    // };
    const generateDetailsString = () => {
        let details = [];
        if (selections.visionNeed) details.push(`Vision Need: ${selections.visionNeed}`);
        if (selections.lensThickness) details.push(`Lens Thickness: ${selections.lensThickness}`);
        if (selections.prescription) {
            if (selections.prescription.type === 'upload') {
                details.push('Prescription: Uploaded');
            } else if (selections.prescription.type === 'appointment') {
                details.push('Prescription: Appointment Scheduled');
            } else if (selections.prescription.type === 'manual') {
                details.push('Prescription: Manually Entered');
            }
        }
        if (selections.lensType) details.push(`Lens Type: ${selections.lensType}`);
        if (selections.lensPerformance) details.push(`Lens Performance: ${selections.lensPerformance}`);

        return details.join(', ');
    };


    const handleAddToCart = () => {
        if (isSelectionValid()) {
            const totalPrice = calculateTotalPrice();
            const detailsString = generateDetailsString();

            const itemToAdd = {
                id: product.glasses_id,
                brand: product.brand.brand_name,
                model: product.model,
                price: totalPrice,
                quantity: 1,
                images: product.images,
                description: product.description,
                details: detailsString
            };

            addItem(itemToAdd);
            console.log('Added to cart:', itemToAdd);
            onClose();
        } else {
            setError('Please complete all selections before adding to cart.');
        }
    };

    const getStepComponent = () => {
        switch (step) {
            case 1:
                return <VisionNeedSelector onSelect={(value, price) => handleSelection('visionNeed', value, price)} selected={selections.visionNeed} />;
            case 2:
                return <LensThicknessSelector onSelect={(value, price) => handleSelection('lensThickness', value, price)} selected={selections.lensThickness} />;
            case 3:
                return selections.visionNeed !== 'non-prescription' && selections.visionNeed !== 'frame-only' ? (
                    <PrescriptionInput onSubmit={(value) => handleSelection('prescription', value)} />
                ) : (
                    <LensTypeSelector onSelect={(value, price) => handleSelection('lensType', value, price)} selected={selections.lensType} />
                );
            case 4:
                return <LensTypeSelector onSelect={(value, price) => handleSelection('lensType', value, price)} selected={selections.lensType} />;
            case 5:
                return <LensPerformanceSelector onSelect={(value, price) => handleSelection('lensPerformance', value, price)} selected={selections.lensPerformance} />;
            case 6:
                return (
                    <OrderOverview
                        selections={selections}
                        product={product}
                        productPrice={productPrice}
                        onAddToCart={handleAddToCart}
                        totalPrice={calculateTotalPrice()}

                    />
                );
            default:
                return null;
        }
    };

    const isLastStep = step === 6 || (selections.visionNeed === 'frame-only' && step > 1);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">Customize Your Lenses</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-black">
                                <X size={24} />
                            </button>
                        </div>

                        {getStepComponent()}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-2 bg-red-100 text-red-700 rounded-md flex items-center"
                            >
                                <AlertCircle size={20} className="mr-2" />
                                {error}
                            </motion.div>
                        )}

                        <div className="mt-8 flex justify-between">
                            {step > 1 && !isLastStep && (
                                <button
                                    onClick={handleBack}
                                    className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
                                >
                                    Back
                                </button>
                            )}
                            {!isLastStep && (
                                <button
                                    onClick={handleNext}
                                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors ml-auto"
                                >
                                    Next
                                </button>
                            )}
                        </div>

                        {!isLastStep && (
                            <div className="mt-4 text-right">
                                <p className="text-sm text-gray-600">
                                    Current Total: {calculateTotalPrice().toFixed(2)} JOD
                                    {productPrice !== parseFloat(product.price) && (
                                        <span className="ml-2 text-green-600">
                                            (Includes discount)
                                        </span>
                                    )}
                                </p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LensesSelectionPopup;