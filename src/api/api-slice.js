import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { loginSuccess, logout } from '../store/auth/auth-slice.js';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REFRESH_URL = '/api/auth/refresh';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: REFRESH_URL, method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      api.dispatch(loginSuccess(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['assessment', 'password', 'auth', 'assessment_module'],
  endpoints: () => ({}),
});
