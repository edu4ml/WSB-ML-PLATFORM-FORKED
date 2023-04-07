import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface loginUserResponse {
    user: object;
    access_token: string;
    refresh_token: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/auth/',
        prepareHeaders(headers) {
            headers.set('X-CSRFToken', Cookies.get('csrftoken'));
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<loginUserResponse, string>({
            query: (creds) => ({
                url: '/login/',
                method: 'POST',
                body: creds,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout/',
                method: 'POST',
            }),
        }),
        userProgile: builder.query({
            query: () => '/user/',
        }),
    }),
});

export const { useLoginMutation, useUserProgileQuery, useLogoutMutation } =
    authApi;
export default authApi;
