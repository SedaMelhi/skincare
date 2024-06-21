import { createSlice } from "@reduxjs/toolkit";

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    checkboxFilters: {},
    min_price: 0,
    max_price: 50000,
    discountFilter: "null",
  },
  reducers: {
    setCheckboxFilters: (state, { payload }) => {
      state.checkboxFilters = payload;
    },
    setDiscountFilter: (state, { payload }) => {
      state.discountFilter = payload;
    },
  },
});

export const { setCheckboxFilters, setDiscountFilter } = catalogSlice.actions;
export default catalogSlice.reducer;
