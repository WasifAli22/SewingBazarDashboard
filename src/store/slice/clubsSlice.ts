// src/store/clubsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Club } from '@/types'; // Adjust the import path based on your project structure



interface ClubState {
  list: Club[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: ClubState = {
  list: [],
  status: 'idle',
  error: null,
};

// Async thunk for adding a club
export const addClubAsync = createAsyncThunk<Club, Club, { rejectValue: string }>(
  'clubs/addClub',
  async (club, { rejectWithValue }) => {
    try {
      const response = await fetch('https://localhost:7218/clubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(club),
      });

      if (!response.ok) {
        // Assume the backend returns an error message in JSON format
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data: Club = await response.json();
      return data; // This will be the fulfilled action payload
    } catch (error: any) {
      return rejectWithValue(error.message ?? 'Something went wrong');
    }
  }
);

// Slice
export const clubsSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    // Reducer methods if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClubAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addClubAsync.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addClubAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Error message is passed here
      });
  },
});

export default clubsSlice.reducer;
