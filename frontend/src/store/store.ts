import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { createRootReducer } from './reducers';
import { queryErrorHandler } from './middleware';

export const store = configureStore({
  reducer: createRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat(api.middleware)
      .concat(queryErrorHandler),
});
