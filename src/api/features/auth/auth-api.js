import { loginSuccess, logout } from '../../../store/auth/auth-slice.js';
import { apiSlice } from '../../api-slice.js';

const LOGIN_URL = '/api/auth/login';
const LOGOUT_URL = '/api/auth/logout';
const CHECK_AUTH_URL = '/api/v1/me';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: () => CHECK_AUTH_URL,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(loginSuccess(data));
        } catch (_err) {
          // Error is handled by the component.
        }
      },
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: LOGIN_URL,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(loginSuccess(data));
        } catch (_error) {
          // Error is handled by the component.
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: LOGOUT_URL,
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useCheckAuthQuery } =
  authApiSlice;
