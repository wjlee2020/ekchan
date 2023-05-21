import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PartneredBudgetResponse } from "../../types/Response";

type BudgetSlice = {
  budgets: Item[] | [];
  paired_budgets: PartneredBudgetResponse | null;
}

const initialState: BudgetSlice = {
  budgets: [],
  paired_budgets: null,
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudgets(state, action: PayloadAction<Item[]>) {
      state.budgets = action.payload;
    },
    setPairedBudgets(state, action: PayloadAction<PartneredBudgetResponse>) {
      state.paired_budgets = action.payload;
    }
  },
});

export const {
  setBudgets,
  setPairedBudgets,
} = budgetSlice.actions;

export default budgetSlice.reducer;
