import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authApi from './features/auth/authApi';
import courseApi from './features/courses/coursesApi';
import exerciseApi from './features/exercises/exerciseApi';
import reportsApi from './features/reports/reportsApi';
import resourcesApi from './features/externalResources/resourcesApi';

export const store = configureStore({
    reducer: {
        // auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [exerciseApi.reducerPath]: exerciseApi.reducer,
        [reportsApi.reducerPath]: reportsApi.reducer,
        [resourcesApi.reducerPath]: resourcesApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(courseApi.middleware)
            .concat(exerciseApi.middleware)
            .concat(reportsApi.middleware)
            .concat(resourcesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
