import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',
        prepareHeaders(headers) {
            headers.set('X-CSRFToken', Cookies.get('csrftoken'));
        },
    }),
    tagTypes: ['course-catalog'],
    endpoints: (builder) => ({
        getCourseCatalog: builder.query({
            query: () => '/course-catalog/',
            providesTags: (result, error, id) => [
                { type: 'course-catalog', id: 'LIST' },
            ],
        }),
        getCourse: builder.query({
            query: (id) => `/course-catalog/${id}`,
            providesTags: (result, error, id) => [
                { type: 'course-catalog', id },
            ],
        }),
        enrollForCourse: builder.mutation({
            query: (body) => ({
                url: '/enroll-course/',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'course-catalog', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetCourseCatalogQuery,
    useEnrollForCourseMutation,
    useGetCourseQuery,
} = courseApi;
export default courseApi;
