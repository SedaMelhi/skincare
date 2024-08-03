import { createSlice } from "@reduxjs/toolkit";

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    catalogProducts: [],
    checkboxFilters: {},
    price: null,
    reset: false,
    discountFilter: "null",
    sort: 'popular',
  },
  reducers: {
    setCatalogProducts: (state, { payload }) => {
      state.catalogProducts = payload;
    },
    setCheckboxFilters: (state, { payload }) => {
      state.checkboxFilters = payload;
    },
    setDiscountFilter: (state, { payload }) => {
      state.discountFilter = payload;
    },
    setSort: (state, { payload }) => {
      state.sort = payload;
    },
    setPrice: (state, { payload }) => {
      state.price = payload;
    },
    setReset: (state, { payload }) => {
      state.reset = payload;
    },
  },
});

export const { setCheckboxFilters, setDiscountFilter, setSort, setPrice, setCatalogProducts, setReset } = catalogSlice.actions;
export default catalogSlice.reducer;
