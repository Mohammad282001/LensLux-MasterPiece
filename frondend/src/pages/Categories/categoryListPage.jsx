import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const categories = {
    men: [
        { name: 'Optical Glasses', path: '/category/men/optical' },
        { name: 'Sunglasses', path: '/category/men/sunglasses' }
    ],
    women: [
        { name: 'Optical Glasses', path: '/category/women/optical' },
        { name: 'Sunglasses', path: '/category/women/sunglasses' }
    ]
    // Add more categories and subcategories as needed
};

const CategoryListPage = () => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/products.json');
                const data = await response.json();

                // Combine all products into a single array
                const combinedProducts = Object.values(data).flat();
                setAllProducts(combinedProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Categories</h1>
            {Object.keys(categories).map((category) => (
                <div key={category}>
                    <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                    <ul>
                        {categories[category].map((subcategory, index) => (
                            <li key={index}>
                                <Link to={subcategory.path}>{subcategory.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <h1>All Glasses</h1>
            <ul>
                {allProducts.map(product => (
                    <li key={product.id}>
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryListPage;
