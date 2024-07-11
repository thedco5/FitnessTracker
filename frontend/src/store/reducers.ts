import { combineReducers } from '@reduxjs/toolkit';
// import { authSliceReducer } from '../api/authSlice'; - эта строка для примера, если еще аутентификацию настраивать
import { api } from '../api/api';

export const createRootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  // auth: authSliceReducer, - тоже для примера
});
