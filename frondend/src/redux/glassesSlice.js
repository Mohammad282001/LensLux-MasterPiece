import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all glasses
export const fetchGlasses = createAsyncThunk(
    'glasses/fetchGlasses',
    async () => {
        const response = await axios.get('http://localhost:3000/api/glasses/getAll');
        console.log(response.data)
        return response.data;
    }
);

const glassesSlice = createSlice({
    name: 'glasses',
    initialState: {
        glasses: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGlasses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGlasses.fulfilled, (state, action) => {
                state.loading = false;
                state.glasses = action.payload;
            })
            .addCase(fetchGlasses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default glassesSlice.reducer;