import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

interface credentials {
    username: string;
    password: string;
}

export const userLogin = createAsyncThunk(
    'auth/login',
    async (credentials: credentials) => {
        const response = await axios.post('auth/login/', credentials);
        return response.data;
    }
);

export const isAuthenticated = createAsyncThunk(
    'auth/is_authenticated',
    async () => {
        const response = await axios.get('auth/is_authenticated/');
        return response.data;
    }
);

export const userLogout = createAsyncThunk('auth/logout', async () => {
    const response = await axios.post('auth/logout/');
    return response.data;
});
