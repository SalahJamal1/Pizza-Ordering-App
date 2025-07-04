import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type cartState = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};
export type State = {
  cart: cartState[];
};
const initialState: State = {
  cart: [],
};
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    ADDCART(state: State, action: PayloadAction<cartState>) {
      state.cart.push(action.payload);
    },
    INCCART(state: State, action: PayloadAction<number>) {
      const temp = state.cart.find((el) => el.pizzaId === action.payload);
      if (!temp) return;
      temp!.quantity++;
      temp.totalPrice = temp.unitPrice * temp.quantity;
    },
    DECCART(state: State, action: PayloadAction<number>) {
      const temp = state.cart.find((el) => el.pizzaId === action.payload);
      if (!temp) return;
      temp!.quantity--;
      temp.totalPrice = temp.unitPrice * temp.quantity;
      if (temp.quantity === 0) cartSlice.caseReducers.DELETE(state, action);
    },
    DELETE(state: State, action: PayloadAction<number>) {
      state.cart = state.cart.filter((el) => el.pizzaId !== action.payload);
    },
    CLEAR(state: State) {
      if (window.confirm("Are you sure")) state.cart = [];
    },
  },
});

export const { ADDCART, INCCART, DECCART, DELETE, CLEAR } = cartSlice.actions;
export default cartSlice.reducer;
