import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface courseCatalog {}

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'api/',
        prepareHeaders(headers) {
            headers.set('X-CSRFToken', Cookies.get('csrftoken'));
        },
    }),

    endpoints: (builder) => ({
        getCourseCatalog: builder.query({
            query: () => '/course-catalog/',
        }),
    }),
});

export const { useGetCourseCatalogQuery } = courseApi;
export default courseApi;
