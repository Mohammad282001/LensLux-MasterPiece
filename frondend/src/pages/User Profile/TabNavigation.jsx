import React from 'react';
import { User, ShoppingBag, Lock } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'changePassword', label: 'Change Password', icon: Lock },
    ];

    return (
        <div className="flex justify-center space-x-2 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${activeTab === tab.id
                            ? 'bg-black text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <tab.icon className="h-5 w-5 mr-2" />
                    <span className="font-medium">{tab.label}</span>
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;