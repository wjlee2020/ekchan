import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PartneredBudgetResponse } from "../../types/Response";

type BudgetSlice = {
  budgets: Item[] | [];
  pairedBudgets: PartneredBudgetResponse | null;
};

const initialState: BudgetSlice = {
  budgets: [],
  pairedBudgets: null,
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudgets(state, action: PayloadAction<Item[]>) {
      state.budgets = action.payload;
    },
    setPairedBudgets(state, action: PayloadAction<PartneredBudgetResponse>) {
      state.pairedBudgets = action.payload;
    }
  },
});

export const {
  setBudgets,
  setPairedBudgets,
} = budgetSlice.actions;

export default budgetSlice.reducer;
