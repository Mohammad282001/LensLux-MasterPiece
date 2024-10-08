import React from 'react';

const OrdersTab = ({ orders }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
            {orders.map(order => (
                <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Order #{order.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">Date: {order.date}</p>
                    <p className="text-sm font-medium mt-2">Total: ${order.total}</p>
                    <button className="mt-2 text-sm text-blue-600 hover:underline">View Details</button>
                </div>
            ))}
        </div>
    );
};

export default OrdersTab;