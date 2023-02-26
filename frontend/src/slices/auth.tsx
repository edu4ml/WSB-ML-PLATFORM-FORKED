import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../services/auth';

interface loginCredentials {
    login: string;
    password: string;
    remember: boolean;
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: loginCredentials, thunkAPI) => {
        thunkAPI.dispatch(loginStart());
        try {
            await AuthService.login(credentials);
            thunkAPI.dispatch(loginSuccess());
        } catch (error) {
            thunkAPI.dispatch(loginFailure(error));
        }
    }
);

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading, (state.error = null);
        },
        loginSuccess: (state) => {
            state.isLoading = false;
            state.isAuthenticated = true;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
    authSlice.actions;

export default authSlice.reducer;
