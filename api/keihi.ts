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

type listUserAndPartnerBudgets = {
  id: string;
  partnerId: string;
  currentUsername: string;
  partnerName: string;
}

export async function createBudget({ uid, item }: createBudgetType): Promise<CreateBudgetResponse> {
  const res = await fetch(`${EKCHAN_SERVER}/api/budget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Todo: add token;
    },
    body: JSON.stringify({ uid, ...item}),
  });

  return res.json();
}

export async function listUserBudget(uid: string): Promise<BudgetResponse> {
  const res = await fetch(`${EKCHAN_SERVER}/api/budget/${uid}`);
  return res.json();
};

export async function listUserAndPartnerBudgets({ currentUsername, id, partnerName, partnerId }: listUserAndPartnerBudgets) {
  const res = await fetch(`${EKCHAN_SERVER}/api/budget?${currentUsername}=${id}&${partnerName}=${partnerId}`);
  return res.json();
}
