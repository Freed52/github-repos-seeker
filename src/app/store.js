import { configureStore } from '@reduxjs/toolkit';
import inputReducer from '../features/input/inputSlice';
import reposReducer from '../features/repos/reposSlice';

export const store = configureStore({
  reducer: {
    input: inputReducer,
    repos: reposReducer
  },
});
