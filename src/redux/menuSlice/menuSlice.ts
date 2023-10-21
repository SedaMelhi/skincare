import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menu: [],
  },
  reducers: {
    setMenu: (state, { payload }) => {
      state.menu = payload;
    },
  },
});

export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;
