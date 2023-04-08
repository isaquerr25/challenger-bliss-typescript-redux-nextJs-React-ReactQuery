import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Box = {
  name: string;
  isLogged: boolean;
};

const initialState: Box = {
  name: 'pato',
  isLogged: false,
};

export const slice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    changeBox: (state, { payload }: PayloadAction<string>) => {
      return { ...state, isLogged: true, name: payload };
    },
    logout: (state) => {
      return { ...state, isLogged: false, name: '' };
    },
  },
});

export const { changeBox, logout } = slice.actions;

export default slice.reducer;
