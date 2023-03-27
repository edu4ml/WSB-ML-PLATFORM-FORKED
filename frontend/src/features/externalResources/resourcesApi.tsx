import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const resourcesApi = createApi({
    reducerPath: 'resourceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        prepareHeaders(headers) {
            headers.set('X-CSRFToken', Cookies.get('csrftoken'));
        },
    }),
    tagTypes: ['resource-list'],
    endpoints: (builder) => ({
        getResourcesCatalog: builder.query({
            query: () => '/resource/',
            providesTags: ['resource-list'],
        }),
        deleteResource: builder.mutation({
            query: (id) => ({
                url: `/resource/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['resource-list'],
        }),
        createResource: builder.mutation({
            query: (command) => ({
                url: '/resource/',
                method: 'PUT',
                body: command,
            }),
            invalidatesTags: ['resource-list'],
        }),
    }),
});

export const {
    useGetResourcesCatalogQuery,
    useDeleteResourceMutation,
    useCreateResourceMutation,
} = resourcesApi;

export default resourcesApi;
