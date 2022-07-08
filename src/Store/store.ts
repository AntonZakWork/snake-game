import { configureStore } from '@reduxjs/toolkit';
import snakeReducer from './snakeSlice';

export const store = configureStore({
  reducer: {
    snake: snakeReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch