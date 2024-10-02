import React from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoryFilter = ({ category }) => {
    const { targetAudience } = useParams();
    const audiences = ['men', 'women', 'unisex'];

    return (
        <div className="flex justify-center space-x-4 mb-8">
            {audiences.map((audience) => (
                <Link
                    key={audience}
                    to={`/category/${category}/${audience}`}
                    className={`px-4 py-2 rounded-full ${targetAudience === audience
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    {audience.charAt(0).toUpperCase() + audience.slice(1)}
                </Link>
            ))}
        </div>
    );
};

export default CategoryFilter;