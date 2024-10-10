import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AuthHandler = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    await axios.get('http://localhost:3000/api/users/userProfile', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Auth check failed:', error);
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated && location.pathname !== '/some') {
        navigate('/some', { state: { returnTo: location.pathname } });
        return null;
    }

    return children;
};

export default AuthHandler;