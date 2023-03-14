import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const exerciseApi = createApi({
    reducerPath: 'exerciseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',
        prepareHeaders(headers) {
            headers.set('X-CSRFToken', Cookies.get('csrftoken'));
        },
    }),
    tagTypes: ['exercise-catalog'],
    endpoints: (builder) => ({
        getExercisesCatalog: builder.query({
            query: () => '/exercise/',
            providesTags: (result, error, id) => [
                { type: 'exercise-catalog', id: 'LIST' },
            ],
        }),
        getExercise: builder.query({
            query: (id) => `/exercise/${id}`,
            providesTags: (result, error, id) => [
                { type: 'exercise-catalog', id },
            ],
        }),
    }),
});

export const { useGetExercisesCatalogQuery, useGetExerciseQuery } = exerciseApi;

export default exerciseApi;
