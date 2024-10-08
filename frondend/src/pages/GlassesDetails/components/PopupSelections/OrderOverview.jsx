import React from 'react';

const OrderOverview = ({ selections, product, onAddToCart, totalPrice, productPrice }) => {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Order Overview</h3>
            <div className="space-y-2 mb-4">
                <p><strong>Frame:</strong> {product.brand.brand_name} - {product.model}</p>
                <p><strong>Frame Price:</strong> {productPrice} JOD</p>
                <p><strong>Vision Need:</strong> {selections.visionNeed} (+ {selections.visionNeedPrice} JOD)</p>
                {selections.lensThickness && (
                    <p><strong>Lens Thickness:</strong> {selections.lensThickness} (+ {selections.lensThicknessPrice} JOD)</p>
                )}
                {selections.prescription && (
                    <p><strong>Prescription:</strong> {selections.prescription.type === 'upload' ? 'Uploaded' : 'Appointment Scheduled'}</p>
                )}
                {selections.lensType && (
                    <p><strong>Lens Type:</strong> {selections.lensType} (+ {selections.lensTypePrice} JOD)</p>
                )}
                {selections.lensPerformance && (
                    <p><strong>Lens Performance:</strong> {selections.lensPerformance} (+ {selections.lensPerformancePrice} JOD)</p>
                )}
                <p className="font-bold mt-4">Total Price: {totalPrice} JOD</p>
            </div>
            <button
                onClick={onAddToCart}
                className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default OrderOverview;