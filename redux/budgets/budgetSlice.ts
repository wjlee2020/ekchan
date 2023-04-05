import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type BudgetSlice = {
  budgets: Item[] | [];
}

const initialState: BudgetSlice = {
  budgets: [],
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudgets(state, action: PayloadAction<Item[]>) {
      state.budgets = action.payload;
    },
  },
});

export const {
  setBudgets,
} = budgetSlice.actions;

export default budgetSlice.reducer;
