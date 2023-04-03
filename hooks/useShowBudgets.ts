import { useEffect } from "react"
import { listUserAndPartnerBudgets, listUserBudget } from "../api/keihi"
import { setBudgets } from "../redux/budgets/budgetSlice";
import { useEkchanDispatch } from "../redux/hooks";

type ShowBudgets = {
  hasPartner: boolean;
  user: User;
}

export default function useShowBudgets({ hasPartner, user }: ShowBudgets) {
  const dispatch = useEkchanDispatch();
  const fetcher = hasPartner ? listUserAndPartnerBudgets : listUserBudget;
};
