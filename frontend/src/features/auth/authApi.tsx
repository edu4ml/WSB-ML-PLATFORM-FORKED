import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { setCredentials, logout, setIsAuthenticated } from './authSlice';

interface loginUserResponse {
    user: object;
    access_token: string;
    refresh_token: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'auth/',
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
            async onQueryStarted(creds, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(setCredentials(data?.user));
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout/',
                method: 'POST',
            }),
            async onQueryStarted(args, { dispatch }) {
                dispatch(logout());
            },
        }),
        getUserProfile: builder.query({
            query: () => '/user/',
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await queryFulfilled
                    .then((data) => {
                        dispatch(setCredentials(data.data));
                    })
                    .catch((err) => {
                        if (err.error.status == 401) {
                            dispatch(setIsAuthenticated(false));
                        }
                    });
            },
        }),
        isAuthenticated: builder.query({
            query: () => '/is_authenticated/',
        }),
    }),
});

export const {
    useLoginMutation,
    useGetUserProfileQuery,
    useLogoutMutation,
    useIsAuthenticatedQuery,
} = authApi;
export default authApi;
