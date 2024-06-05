import { createSlice } from '@reduxjs/toolkit';

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    checkboxFilters: {},
  },
  reducers: {
    setCheckboxFilters: (state, { payload }) => {
      state.checkboxFilters = payload;
    },
  },
});

export const { setCheckboxFilters } = catalogSlice.actions;
export default catalogSlice.reducer;
