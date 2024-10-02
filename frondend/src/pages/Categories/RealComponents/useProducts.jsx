import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { category, target_audience } = useParams(); // useParams might not work for query params, use useLocation for query params if needed

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                console.log(category, " ", target_audience)
                // const response = await axios.get(`http://localhost:3000/api/glasses/filter?category=${category}&target_audience=${target_audience}`, {
                const response = await axios.get(`http://localhost:3000/api/glasses/filter?category=eyeglasses&targetAudience=men`, {
                }); 
                
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, target_audience]);

    return { products, loading, error, category, target_audience };
};
