import { useEffect } from "react"
import { listUserAndPartnerBudgets, listUserBudget } from "../api/keihi"
import { setBudgets, setPairedBudgets } from "../redux/budgets/budgetSlice";
import { useEkchanDispatch } from "../redux/hooks";

type ShowBudgets = {
  hasPartner: boolean;
  user: User;
  deps: string | string[]
}

export default function useShowBudgets({ hasPartner, user, deps }: ShowBudgets) {
  const dispatch = useEkchanDispatch();

  useEffect(() => {
    if (deps !== "/keihi") return;
    if (!hasPartner) {
      listUserBudget(user.id)
        .then((data) => {
          dispatch(setBudgets(data.budgets));
        })
        .catch((e) => console.log(e));
    } else {
      listUserAndPartnerBudgets({ id: user.id, partnerId: user.partnerId })
        .then((data) => {
          dispatch(setPairedBudgets(data));
        })
        .catch((e) => console.log({ second: e }));
    }
  }, [deps]);
};
