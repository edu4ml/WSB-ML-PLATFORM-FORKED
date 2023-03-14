import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authApi from './features/auth/authApi';
import courseApi from './features/courses/coursesApi';
import authReducer from './features/auth/authSlice';
import exerciseApi from './features/exercises/exerciseApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [exerciseApi.reducerPath]: exerciseApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(courseApi.middleware)
            .concat(exerciseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
