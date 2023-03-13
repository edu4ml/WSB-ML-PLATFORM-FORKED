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
            query: () => '/course/',
            providesTags: (result, error, id) => [
                { type: 'course-catalog', id: 'LIST' },
            ],
        }),
        getCourse: builder.query({
            query: (id) => `/course/${id}`,
            providesTags: (result, error, id) => [
                { type: 'course-catalog', id },
            ],
        }),
        enrollForCourse: builder.mutation({
            query: (body) => ({
                url: '/course/',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'course-catalog', id: 'LIST' },
            ],
        }),
        issueCourseCommand: builder.mutation({
            query: ({ id, command }) => ({
                url: `/course/${id}/command`,
                method: 'PUT',
                body: command,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'course-catalog', id },
            ],
        }),
    }),
});

export const {
    useGetCourseCatalogQuery,
    useEnrollForCourseMutation,
    useGetCourseQuery,
    useIssueCourseCommandMutation,
} = courseApi;
export default courseApi;
