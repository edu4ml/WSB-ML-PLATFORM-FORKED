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
            query: (payload) => ({
                url: '/course-components/',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['course-component-list'],
        }),
        addFileToCourseComponent: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/course-components/${id}/file`,
                method: 'PUT',
                body: payload,
            }),
        }),
        updateCourseComponent: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/course-components/${id}`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['course-component-list'],
        }),
        deleteCourseComponent: builder.mutation({
            query: (id) => ({
                url: `/course-components/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['course-component-list'],
        }),
        deleteCourseComponentFileResource: builder.mutation({
            query: ({ id, resourceId }) => ({
                url: `/course-components/${id}/file-resources/${resourceId}`,
                method: 'DELETE',
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
        uploadSubmission: builder.mutation({
            query: ({ command }) => ({
                url: `/submission`,
                // url: `/course/${courseUUID}/step/${stepUUID}/user-progress/${progressTrackingUUID}/submission`,
                method: 'POST',
                body: command,
            }),
            invalidatesTags: ['course-list'],
        }),
    }),
});

export const {
    useUploadSubmissionMutation,
    useDeleteCourseComponentFileResourceMutation,
    useAddFileToCourseComponentMutation,
    useGetCourseCatalogQuery,
    useGetCourseQuery,
    useGetCourseComponentsQuery,
    useCreateCourseMutation,
    useIssueCourseCommandMutation,
    useCreateCourseComponentsMutation,
    useUpdateCourseComponentMutation,
    useDeleteCourseComponentMutation,
} = courseApi;
export default courseApi;
