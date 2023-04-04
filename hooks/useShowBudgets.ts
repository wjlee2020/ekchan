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

  useEffect(() => {
    if (!hasPartner) {
      listUserBudget(user.id)
        .then((data) => dispatch(setBudgets(data.budgets)))
        .catch((e) => console.log(e));
    } else {
      listUserAndPartnerBudgets({ id: user.id, partnerId: user.partnerId })
        .then((data) => console.log({ partnerAndUser: data }))
        .catch((e) => console.log({ second: e }));
    }
  }, []);
};
