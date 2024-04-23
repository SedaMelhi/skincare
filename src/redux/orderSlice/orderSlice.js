import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {
      phone: '',
      name: '',
      surname: '',
      secondName: '',
      email: '',
    },
    link: '',
  },
  reducers: {
    setOrder: (state, { payload }) => {
      state.order = payload;
    },
    setLink: (state, { payload }) => {
      state.link = payload;
    },
  },
});

export const { setOrder, setLink } = orderSlice.actions;
export default orderSlice.reducer;
