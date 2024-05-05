// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import clubsReducer from './slice/clubsSlice'; // Adjust the import path according to your file structure

export const store = configureStore({
  reducer: {
    clubs: clubsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
