// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X } from 'lucide-react';

// const OrderConfirmationModal = ({ isOpen, onClose, onConfirm, cartTotal }) => {
//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//                 >
//                     <motion.div
//                         initial={{ y: 50, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         exit={{ y: 50, opacity: 0 }}
//                         className="bg-white rounded-lg p-8 max-w-md w-full"
//                     >
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-2xl font-semibold">Confirm Your Order</h2>
//                             <button onClick={onClose} className="text-gray-500 hover:text-black">
//                                 <X size={24} />
//                             </button>
//                         </div>
//                         <p className="mb-4">Are you sure you want to place this order?</p>
//                         <p className="font-semibold mb-6">Total: {cartTotal.toFixed(2)} JOD</p>
//                         <div className="flex justify-end space-x-4">
//                             <button
//                                 onClick={onClose}
//                                 className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={onConfirm}
//                                 className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
//                             >
//                                 Confirm Order
//                             </button>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default OrderConfirmationModal;