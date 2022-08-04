import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const slice = createSlice({
  name: 'initializeAppReducer',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const inializeReducer = slice.reducer;

export const { setIsLoggedIn } = slice.actions;

export const isInitialized = (state: RootState) => state.initializeAppReducer.isLoggedIn;
