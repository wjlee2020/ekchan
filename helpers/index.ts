/**
 *
 * @param budgets Item[]
 * @returns sorted budgets by their dates (Latest - Earliest)
 */
export function sortBudgetsByDate(budgets: Item[]) {
  return budgets
  .map(item => ({
    ...item,
    created_at: item.created_at || 'default_value',
  }))
  .sort((a, b) => {
    if (!a.created_at || !b.created_at) return 0;
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  })
};
