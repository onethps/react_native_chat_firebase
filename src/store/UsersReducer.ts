import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UserType } from '../types/types';

const slice = createSlice({
  name: 'users',
  initialState: {
    users: [] as UserType[],
    myProfile: {} as UserType,
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
    setMyProfile: (state, action) => {
      state.myProfile = action.payload;
    },
  },
});

export const usersReducer = slice.reducer;

export const { setAllUsers, setMyProfile } = slice.actions;

export const myProfileSelector = (state: RootState) => state.users.myProfile;
export const allUsersSelector = (state: RootState) => state.users.users;
