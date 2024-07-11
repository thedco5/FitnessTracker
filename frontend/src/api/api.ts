import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

// Fetch the accessToken from localStorage
const accessToken = localStorage.getItem('accessToken');

// Create a baseQuery with fetchBaseQuery and prepareHeaders to include the accessToken
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/',
  prepareHeaders: (headers) => {
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

// Custom fetchBase to include extraOptions if needed
const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => baseQuery(args, api, extraOptions);

// Create the API with the custom baseQuery
export const api = createApi({
  reducerPath: 'api',
  tagTypes: [
    'Exercises',
    'Workouts',
    'Workout',
  ],
  baseQuery: customFetchBase,
  endpoints: () => ({}),
});
