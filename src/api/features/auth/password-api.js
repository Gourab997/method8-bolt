import { apiSlice } from '../../api-slice.js';

const FORGOT_PASSWORD_URL = '/api/auth/forget_password';
const RESET_PASSWORD_URL = '/api/auth/reset_password';

export const passwordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: FORGOT_PASSWORD_URL,
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: RESET_PASSWORD_URL,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } =
  passwordApiSlice;
