export type PartneredBudgetResponse = {
  budgets: {
    currentUser: Item[];
    partner: Item[];
  };
  status: number;
};

export type BudgetResponse = {
  budgets: Item[];
  status: number;
}

export type CreateBudgetResponse = {
  budget: {
    insert_keihi: Item;
  },
  list_budgets: Item[];
  status: number;
}
