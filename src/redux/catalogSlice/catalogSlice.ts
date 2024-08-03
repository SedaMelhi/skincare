import { createSlice } from "@reduxjs/toolkit";

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    catalogProducts: [],
    checkboxFilters: {},
    price: null,
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
  },
});

export const { setCheckboxFilters, setDiscountFilter, setSort, setPrice, setCatalogProducts } = catalogSlice.actions;
export default catalogSlice.reducer;
