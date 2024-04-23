import { createSlice } from '@reduxjs/toolkit';

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    isAddressOpen: false,
    type: 'courier',
    mapData: [],
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
  },
});

export const { setIsAddressOpen, setType, setMapData, setAddress } = addressSlice.actions;
export default addressSlice.reducer;
