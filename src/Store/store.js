import { configureStore } from '@reduxjs/toolkit';
import snakeReducer from './snakeSlice';

export const store = configureStore({
  reducer: {
    snake: snakeReducer,
  },
});
