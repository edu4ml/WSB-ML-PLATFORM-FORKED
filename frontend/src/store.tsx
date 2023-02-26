import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { useDispatch } from 'react-redux';
import authReducer from './slices/auth';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: true,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
