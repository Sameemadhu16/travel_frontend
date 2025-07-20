import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        //for user registration
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },

        resetAuth: () => {
            return initialState; 
        },

        clearError: (state) => {
            state.error = null;
        },
        setUserData: (state, action) => {
            if (state.user) {
                state.user.data = action.payload;
            }
        },
    }
});

export const {
    registerStart,
    registerSuccess,
    registerFailure,
    setUserData,
    resetAuth,
} = authSlice.actions;

export default authSlice.reducer;