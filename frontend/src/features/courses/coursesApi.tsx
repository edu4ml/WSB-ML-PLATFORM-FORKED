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
    tagTypes: ['course-list', 'component-list'],
    endpoints: (builder) => ({
        getCourseList: builder.query({
            query: () => '/courses/',
            providesTags: ['course-list'],
        }),
        getCourseDetail: builder.query({
            query: (id) => `/courses/${id}`,
            providesTags: (result, error, id) => [{ type: 'course-list', id }],
        }),
        getComponentList: builder.query({
            query: () => '/components/',
            providesTags: ['component-list'],
        }),
        getComponentDetails: builder.query({
            query: (id) => `/components/${id}`,
            providesTags: (result, error, id) => [
                { type: 'component-list', id },
            ],
        }),
        createCourseComponents: builder.mutation({
            query: (command) => ({
                url: '/components/',
                method: 'POST',
                body: command,
            }),
            invalidatesTags: ['component-list'],
        }),
        updateCourseComponent: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/components/${id}`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['component-list'],
        }),
        deleteCourseComponent: builder.mutation({
            query: (id) => ({
                url: `/components/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['component-list'],
        }),
        issueCommand: builder.mutation({
            query: ({ command }) => ({
                url: '/commands/',
                method: 'POST',
                body: command,
            }),
            invalidatesTags: ['course-list', 'component-list'],
        }),
    }),
});

export const {
    useIssueCommandMutation,
    useGetCourseListQuery,
    useGetCourseDetailQuery,
    useGetComponentListQuery,
    useGetComponentDetailsQuery,
    useCreateCourseComponentsMutation,
    useUpdateCourseComponentMutation,
    useDeleteCourseComponentMutation,
} = courseApi;
export default courseApi;
