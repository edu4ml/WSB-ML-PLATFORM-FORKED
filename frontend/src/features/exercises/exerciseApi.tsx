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
    tagTypes: ['exercises-catalog'],
    endpoints: (builder) => ({
        getExercisesCatalog: builder.query({
            query: () => '/exercise/',
            providesTags: (result, error, id) => [
                { type: 'exercises-catalog', id: 'LIST' },
            ],
        }),
    }),
});

export const { useGetExercisesCatalogQuery } = exerciseApi;

export default exerciseApi;
