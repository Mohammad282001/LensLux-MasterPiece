// components/ProductGrid.js
import React from 'react';
import { Link } from 'react-router-dom';
import DiscountLabel from './DiscountLabel';
import PriceDisplay from './PriceDisplay';

const ProductGrid = ({ products }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
            products.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="group">
                    <div className="bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                        <DiscountLabel
                            discount_price={product.price - product.discount_price}
                            discount_percentage={product.discount_percentage}
                        />
                        <div className="relative w-full pb-[100%] overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={product.image_url}
                                    alt={product.brand}
                                    className="absolute w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                                />
                                <img
                                    src={product.image_url2}
                                    alt={product.brand}
                                    className="absolute w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-1 text-gray-800">{product.brand}</h2>
                            <p className="text-sm text-gray-600 mb-2">{product.model}</p>
                            <PriceDisplay
                                price={product.price}
                                discount_price={product.discount_price}
                                discount_percentage={product.discount_percentage}
                            />
                        </div>
                    </div>
                </Link>
            ))
        ) : (
            <div className="col-span-full text-center text-gray-600">No products found for this target_audience.</div>
        )}
    </div>
);

export default ProductGrid;