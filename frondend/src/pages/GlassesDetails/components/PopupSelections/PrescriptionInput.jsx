import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PrescriptionInput = ({ onSubmit }) => {
    const [method, setMethod] = useState(null);
    const [manualPrescription, setManualPrescription] = useState({
        sphere: { left: '', right: '' },
        cylinder: { left: '', right: '' },
        axis: { left: '', right: '' },
    });

    const handleManualInput = (eye, field, value) => {
        setManualPrescription(prev => ({
            ...prev,
            [field]: { ...prev[field], [eye]: value }
        }));
    };

    const handleManualSubmit = () => {
        onSubmit({ type: 'manual', data: manualPrescription });
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Enter your prescription</h3>
            <div className="space-y-4">
                <motion.button
                    onClick={() => setMethod('upload')}
                    className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Upload prescription image
                </motion.button>
                <motion.button
                    onClick={() => setMethod('manual')}
                    className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Enter prescription manually
                </motion.button>
                <motion.button
                    onClick={() => onSubmit({ type: 'appointment' })}
                    className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Schedule an eye exam appointment
                </motion.button>
            </div>
            {method === 'upload' && (
                <div className="mt-4">
                    <input
                        type="file"
                        onChange={(e) => onSubmit({ type: 'upload', file: e.target.files[0] })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            )}
            {method === 'manual' && (
                <div className="mt-4 space-y-4">
                    {['sphere', 'cylinder', 'axis'].map(field => (
                        <div key={field} className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)} (Left)</label>
                                <input
                                    type="text"
                                    value={manualPrescription[field].left}
                                    onChange={(e) => handleManualInput('left', field, e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)} (Right)</label>
                                <input
                                    type="text"
                                    value={manualPrescription[field].right}
                                    onChange={(e) => handleManualInput('right', field, e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={handleManualSubmit}
                        className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                    >
                        Submit Prescription
                    </button>
                </div>
            )}
        </div>
    );
};

export default PrescriptionInput;