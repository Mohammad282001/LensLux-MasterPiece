// hooks/useProducts.js
import { useState, useEffect } from 'react';

const useProducts = (type, category) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/products.json');
                const data = await response.json();
                let filteredProducts = [];

                if (type && !category) {
                    filteredProducts = data[type] || [];
                } else if (type && category) {
                    filteredProducts = data[type]?.filter(
                        product => product.category === category || (category === 'unisex' && product.is_unisex)
                    ) || [];
                }

                if (category === 'men' || category === 'women') {
                    const unisexProducts = data[type]?.filter(product => product.is_unisex) || [];
                    filteredProducts = [...filteredProducts, ...unisexProducts];
                }

                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [type, category]);

    return products;
};

export default useProducts;