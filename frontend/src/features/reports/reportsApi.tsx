import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const reportsApi = createApi({
    reducerPath: 'reportsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        prepareHeaders(headers) {
            headers.set('X-CSRFToken', Cookies.get('csrftoken'));
        },
    }),
    tagTypes: ['report'],
    endpoints: (builder) => ({
        getTeacherReport: builder.query({
            query: () => '/report/teacher/',
            providesTags: ['report'],
        }),
    }),
});

export const { useGetTeacherReportQuery } = reportsApi;

export default reportsApi;
