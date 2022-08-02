import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'root',
  initialState: {
    allPokemons: [],
    currentPokemon: {},
  },
  reducers: {
    clearCurrentPokemon: (state) => {},
  },
});

export const rootReducer = slice.reducer;

export const { clearCurrentPokemon } = slice.actions;
