import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        prepareHeaders(headers) {
            headers.set('X-CSRFToken', Cookies.get('csrftoken'));
        },
    }),
    tagTypes: ['course-list', 'course-component-list'],
    endpoints: (builder) => ({
        getCourseCatalog: builder.query({
            query: () => '/course/',
            providesTags: ['course-list'],
        }),
        getCourse: builder.query({
            query: (id) => `/course/${id}`,
            providesTags: (result, error, id) => [{ type: 'course-list', id }],
        }),
        getCourseComponents: builder.query({
            query: () => '/course-components/',
            providesTags: ['course-component-list'],
        }),
        createCourse: builder.mutation({
            query: (command) => ({
                url: '/course/',
                method: 'PUT',
                body: command,
            }),
            invalidatesTags: ['course-list'],
        }),
        createCourseComponents: builder.mutation({
            query: (command) => ({
                url: '/course-components/',
                method: 'POST',
                body: command,
            }),
            invalidatesTags: ['course-component-list'],
        }),
        issueCourseCommand: builder.mutation({
            query: ({ id, command }) => ({
                url: `/course/${id}/command`,
                method: 'PUT',
                body: command,
            }),
            invalidatesTags: ['course-list'],
        }),
    }),
});

export const {
    useGetCourseCatalogQuery,
    useGetCourseQuery,
    useGetCourseComponentsQuery,
    useCreateCourseMutation,
    useIssueCourseCommandMutation,
    useCreateCourseComponentsMutation,
} = courseApi;
export default courseApi;
