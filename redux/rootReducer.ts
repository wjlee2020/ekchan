import { combineReducers } from "@reduxjs/toolkit";
import budgetSlice from "./budgets/budgetSlice";

const rootReducer = combineReducers({
  budgets: budgetSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export { rootReducer };
