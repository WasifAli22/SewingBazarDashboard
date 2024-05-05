// store.js or store.ts
import { configureStore } from '@reduxjs/toolkit';
import teamReducer from '@/lib/features/team/TeamSlice'; // Adjust the path as needed

export const store = configureStore({
  reducer: {
    team: teamReducer,
  },
});
