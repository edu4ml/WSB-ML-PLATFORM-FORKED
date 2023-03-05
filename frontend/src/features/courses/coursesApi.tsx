import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'api/',
        prepareHeaders(headers) {
            headers.set('X-CSRFToken', Cookies.get('csrftoken'));
        },
    }),
    tagTypes: ['course-catalog'],
    endpoints: (builder) => ({
        getCourseCatalog: builder.query({
            query: () => '/course-catalog/',
            providesTags: ['course-catalog'],
        }),
        enrollForCourse: builder.mutation({
            query: (body) => ({
                url: '/enroll-course/',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['course-catalog'],
        }),
    }),
});

export const { useGetCourseCatalogQuery, useEnrollForCourseMutation } =
    courseApi;
export default courseApi;
