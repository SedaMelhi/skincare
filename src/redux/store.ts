import { configureStore } from "@reduxjs/toolkit";
import basket from "./basketSlice/basketSlice";
import footer from "./footerSlice/footerSlice";
import menu from "./menuSlice/menuSlice";
import hits from "./hitsSlice/hitsSlice";
import auth from "./authSlice/authSlice";
import address from "./addressSlice/addressSlice";
import order from "./orderSlice/orderSlice";
import catalog from "./catalogSlice/catalogSlice";

export const store = configureStore({
  reducer: {
    basket,
    footer,
    menu,
    hits,
    auth,
    address,
    order,
    catalog,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
