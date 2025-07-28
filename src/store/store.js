import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api-slice.js';
import authReducer from './auth/auth-slice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
