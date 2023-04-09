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
        issueCourseCommand: builder.mutation({
            query: ({ id, command }) => ({
                url: `/courses/${id}`,
                method: 'POST',
                body: command,
            }),
            invalidatesTags: ['course-list'],
        }),
        createCourse: builder.mutation({
            query: (command) => ({
                url: '/courses/',
                method: 'POST',
                body: command,
            }),
            invalidatesTags: ['course-list'],
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
        addFileToCourseComponent: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/components/${id}/file`,
                method: 'PUT',
                body: payload,
            }),
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
        deleteCourseComponentFileResource: builder.mutation({
            query: ({ id, resourceId }) => ({
                url: `/components/${id}/file-resources/${resourceId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['component-list'],
        }),
        uploadSubmission: builder.mutation({
            query: ({ command }) => ({
                url: `/submission`,
                method: 'POST',
                body: command,
            }),
            invalidatesTags: ['course-list'],
        }),
        issueSubmissionCommand: builder.mutation({
            query: ({ id, command }) => ({
                url: `/submission/${id}`,
                method: 'POST',
                body: command,
            }),
            invalidatesTags: ['course-list'],
        }),
        issueCourseStepProgressTrackingCommand: builder.mutation({
            query: ({ courseId, stepId, userId, command }) => ({
                url: `/course/${courseId}/step/${stepId}/user/${userId}`,
                method: 'POST',
                body: command,
            }),
            invalidatesTags: ['course-list'],
        }),
        issueCommand: builder.mutation({
            query: ({ command }) => ({
                url: '/commands',
                method: 'POST',
                body: command,
            }),
            invalidatesTags: ['course-list', 'component-list'],
        }),
    }),
});

export const {
    useIssueCommandMutation,
    useIssueCourseStepProgressTrackingCommandMutation,
    useIssueSubmissionCommandMutation,
    useUploadSubmissionMutation,
    useDeleteCourseComponentFileResourceMutation,
    useAddFileToCourseComponentMutation,
    useGetCourseListQuery,
    useGetCourseDetailQuery,
    useGetComponentListQuery,
    useGetComponentDetailsQuery,
    useCreateCourseMutation,
    useIssueCourseCommandMutation,
    useCreateCourseComponentsMutation,
    useUpdateCourseComponentMutation,
    useDeleteCourseComponentMutation,
} = courseApi;
export default courseApi;
