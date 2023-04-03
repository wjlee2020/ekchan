import { EKCHAN_SERVER } from "../config";

type createBudgetType = {
  uid: string;
  item: Item;
}

type CreateBudgetResponse = {
  budgets: {
    insert_keihi: Item;
  },
  list_budgets: Item[];
  status: string;
}

type BudgetResponse = {
  budgets: Item[];
  status: string;
}

type PartneredBudgetResponse = {
  budgets: {
    currentUser: Item[];
    partner: Item[];
  };
  status: number | string;
}

const headers = new Headers();
headers.append("Content-Type", "application/json");
// Todo: add token

export async function createBudget({ uid, item }: createBudgetType): Promise<CreateBudgetResponse> {
  const res = await fetch(`${EKCHAN_SERVER}/api/budget`, {
    method: "POST",
    headers,
    body: JSON.stringify({ uid, ...item}),
  });

  return res.json();
}

export async function listUserBudget(id: string): Promise<BudgetResponse> {
  const res = await fetch(`${EKCHAN_SERVER}/api/budget/${id}`, { headers });
  return res.json();
};

export async function listUserAndPartnerBudgets({ id, partnerId }: { id: string, partnerId: string }): Promise<PartneredBudgetResponse> {
  const res = await fetch(`${EKCHAN_SERVER}/api/budget?currentUser=${id}&parnter=${partnerId}`, { headers });
  return res.json();
}
