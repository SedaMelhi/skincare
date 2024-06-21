import { createSlice } from '@reduxjs/toolkit';

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    isAddressOpen: false,
    type: 'courier',
    mapData: [],
    cities: [],
    selectedCityCode: 441,
    cdekToken: null,
    address: {
      city: { id: false, name: '' },
      street: { id: false, name: '' },
      apartment: '',
      intercom: '',
      entrance: '',
      floor: '',
    },
  },
  reducers: {
    setIsAddressOpen: (state, { payload }) => {
      state.isAddressOpen = payload;
    },
    setType: (state, { payload }) => {
      state.type = payload;
    },
    setMapData: (state, { payload }) => {
      state.mapData = payload;
    },
    setAddress: (state, { payload }) => {
      state.address = payload;
    },
    setCities: (state, { payload }) => {
      state.cities = payload;
    },
    setSelectedCityCode: (state, { payload }) => {
      state.selectedCityCode = payload;
    },
    setCdekToken: (state, { payload }) => {
      state.cdekToken = payload;
    },
  },
});

export const {
  setIsAddressOpen,
  setType,
  setMapData,
  setAddress,
  setCities,
  setSelectedCityCode,
  setCdekToken,
} = addressSlice.actions;
export default addressSlice.reducer;
