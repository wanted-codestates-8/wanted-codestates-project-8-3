import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "./store";

export interface FormState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: FormState = {
  value: 0,
  status: "idle",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = formSlice.actions;
export const selectForm = (state: AppState) => state.form;
export default formSlice.reducer;
