import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice';
import glassesReducer from './redux/glassesSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        glasses: glassesReducer,
    },
});