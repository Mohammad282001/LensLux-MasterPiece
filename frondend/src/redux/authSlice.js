import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoginOpen: false,
    isSignUpOpen: false,
    user: null,
};

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
    },
});

export const { openLogin, openSignUp, closeModals, setUser } = authSlice.actions;
export default authSlice.reducer;