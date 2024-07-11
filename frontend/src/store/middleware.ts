import { MiddlewareAPI, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

export const queryErrorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.data && action.payload.data.status) {
      // Failed with response from API
      const { status, errors, message } = action.payload.data;
      console.warn(`Action rejected: Status: ${status}, Error: ${errors}, Message: ${message}`);
    } else if (action.meta.baseQueryMeta.response) {
      // Failed, no data in response available
      const { status, statusText } = action.meta.baseQueryMeta.response;
      console.warn(`Action rejected: Status: ${status}: ${statusText}`);
    } else {
      // No response
      console.warn(`Action rejected: ${action.payload.error}`);
    }
  }
  return next(action);
};
