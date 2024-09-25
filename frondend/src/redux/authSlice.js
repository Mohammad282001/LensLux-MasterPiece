import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
    isLoginOpen: false,
    isSignUpOpen: false,
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:3000/login", userData, { withCredentials: true });
            localStorage.setItem('token', response.data.token);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed. Please try again.');
        }
    }
);

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:3000/signup', userData, { withCredentials: true });
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.error || 'Signup failed. Please try again.'
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        openLogin: (state) => {
            state.isLoginOpen = true;
            state.isSignUpOpen = false;
        },
        openSignUp: (state) => {
            state.isSignUpOpen = true;
            state.isLoginOpen = false;
        },
        closeModals: (state) => {
            state.isLoginOpen = false;
            state.isSignUpOpen = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { openLogin, openSignUp, closeModals, logout, setError, clearError } = authSlice.actions;
export default authSlice.reducer;