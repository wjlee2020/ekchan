import { useEffect } from "react"
import { listUserAndPartnerBudgets, listUserBudget } from "../api/keihi"
import { ekchanLog } from "../api/logger";
import createLoggerObject from "../constants/Logger";
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
        .catch((e) => {
          const logBody = createLoggerObject({ name: `Failed to get ${user.id} budgets (single).`, type: "SINGLE_USER_BUDGETS" });
          ekchanLog(logBody);
        });
    } else {
      listUserAndPartnerBudgets({ id: user.id, partnerId: user.partnerId })
        .then((data) => {
          const budgets = [...data.budgets.currentUser, ...data.budgets.partner];
          dispatch(setPairedBudgets(data));
          dispatch(setBudgets(budgets));
        })
        .catch((e) => {
          const logBody = createLoggerObject({ name: `Failed to get ${user.id} budgets (paired).`, type: "PAIRED_USER_BUDGETS" });
          ekchanLog(logBody);
        })
    }
  }, [deps]);
};
