import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {
      phone: "",
      name: "",
      surname: "",
      secondName: "",
      email: "",
    },
    link: "",
    pricing: {
      price: null,
      discount: null,
    },
  },
  reducers: {
    setOrder: (state, { payload }) => {
      state.order = payload;
    },
    setLink: (state, { payload }) => {
      state.link = payload;
    },
    setPricing: (state, { payload }) => {
      if (payload.discount !== null) { 
        state.pricing = {
          price: Math.round(payload.price), 
          discount: Math.round(payload.discount),
        };
      }
    },
  },
});

export const { setOrder, setLink, setPricing } = orderSlice.actions;
export default orderSlice.reducer;
