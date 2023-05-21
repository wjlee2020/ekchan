import { EKCHAN_SERVER } from "../config";
import { BudgetResponse, CreateBudgetResponse, PartneredBudgetResponse } from "../types/Response";

type createBudgetType = {
  uid: string;
  item: Item;
}

const headers = new Headers();
headers.append("Content-Type", "application/json");
// Todo: add token

export async function createBudget({ uid, item }: createBudgetType): Promise<CreateBudgetResponse> {
  const res = await fetch(`${EKCHAN_SERVER}/api/budgets`, {
    method: "POST",
    headers,
    body: JSON.stringify({ uid, ...item}),
  });

  return res.json();
};

export async function editBudget({ uid, item }: createBudgetType) {
  const res = await fetch(`${EKCHAN_SERVER}/api/budgets/${item.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ uid, ...item })
  });

  return res.json();
};

export async function deleteBudget({ uid, bid }: { uid: string | number, bid: string | number }) {
  const res = await fetch(`${EKCHAN_SERVER}/api/budgets/${bid}`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ uid }),
  });

  return res.json();
};

export async function listUserBudget(id: string): Promise<BudgetResponse> {
  const res = await fetch(`${EKCHAN_SERVER}/api/budgets/${id}`, { headers });
  return res.json();
};

export async function listUserAndPartnerBudgets({ id, partnerId }: { id: string, partnerId: string }): Promise<PartneredBudgetResponse> {
  const res = await fetch(`${EKCHAN_SERVER}/api/budgets?currentUser=${id}&partner=${partnerId}`, { headers });
  return res.json();
};
