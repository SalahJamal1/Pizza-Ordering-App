import { configureStore } from "@reduxjs/toolkit";
import carts from "../components/cart/cartSlice";
import users from "../components/user/userSlice";
export const store = configureStore({
  reducer: {
    carts,
    users,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
