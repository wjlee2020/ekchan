import { EKCHAN_SERVER } from "../config";

type createBudgetType = {
  uid: string;
  item: Item;
}

type CreateBudgetResponse = {
  budget: {
    insert_keihi: Item;
  },
  list_budgets: Item[];
  status: number;
}

type BudgetResponse = {
  budgets: Item[];
  status: number;
}

type PartneredBudgetResponse = {
  budgets: {
    currentUser: Item[];
    partner: Item[];
  };
  status: number;
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
};

export async function editBudget({ uid, item }: createBudgetType) {
  const res = await fetch(`${EKCHAN_SERVER}/api/budget/${item.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ uid, ...item })
  });

  return res.json();
};

export async function deleteBudget({ uid, bid }: { uid: string | number, bid: string | number }) {
  const res = await fetch(`${EKCHAN_SERVER}/api/budget/${bid}`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ uid }),
  });

  return res.json();
};

export async function listUserBudget(id: string): Promise<BudgetResponse> {
  const res = await fetch(`${EKCHAN_SERVER}/api/budget/${id}`, { headers });
  return res.json();
};

export async function listUserAndPartnerBudgets({ id, partnerId }: { id: string, partnerId: string }): Promise<PartneredBudgetResponse> {
  const res = await fetch(`${EKCHAN_SERVER}/api/budget?currentUser=${id}&parnter=${partnerId}`, { headers });
  return res.json();
};
