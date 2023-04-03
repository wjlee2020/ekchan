import { combineReducers } from "@reduxjs/toolkit";
import budgetSlice from "./budgets/budgetSlice";

const rootReducer = combineReducers({
  budget: budgetSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export { rootReducer };
