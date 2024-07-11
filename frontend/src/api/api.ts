import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
// import { getUser } from '../keycloak'; // Это для примера

export const getKCHeaders = () => {
  // const keycloakUser = getUser();
  const keycloakUser = {};

  const headers: Record<string, string> = {};
  if (keycloakUser && keycloakUser.profile) {
    const { access_token: token, token_type: tokenType, profile } = keycloakUser;
    const { tenantId } = profile;

    token && (headers.Authorization = `${tokenType} ${token}`);
    tenantId && (headers['X-TENANT-ID'] = `${tenantId}`);
  }
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers) => {
    Object.entries(getKCHeaders()).forEach((header) => {
      headers.set(header[0], header[1]);
    });
    return headers;
  },
});

const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions: { skipTokenUpdate?: boolean },
) => baseQuery(args, api, extraOptions);

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
