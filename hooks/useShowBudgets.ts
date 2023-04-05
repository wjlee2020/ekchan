import { useEffect } from "react"
import { listUserAndPartnerBudgets, listUserBudget } from "../api/keihi"
import { setBudgets } from "../redux/budgets/budgetSlice";
import { useEkchanDispatch, useEkchanSelector } from "../redux/hooks";

type ShowBudgets = {
  hasPartner: boolean;
  user: User;
  deps: string | string[]
}

export default function useShowBudgets({ hasPartner, user, deps }: ShowBudgets) {
  const { budgets } = useEkchanSelector((state) => state.budgets);
  const dispatch = useEkchanDispatch();

  useEffect(() => {
    if (deps !== "/keihi") return;
    if (!hasPartner) {
      listUserBudget(user.id)
        .then((data) => dispatch(setBudgets(data.budgets.filter((budget) => budgets.every((budg) => budg.id !== budget.id)))))
        .catch((e) => console.log(e));
    } else {
      listUserAndPartnerBudgets({ id: user.id, partnerId: user.partnerId })
        .then((data) => console.log({ partnerAndUser: data }))
        .catch((e) => console.log({ second: e }));
    }
  }, [deps]);
};
