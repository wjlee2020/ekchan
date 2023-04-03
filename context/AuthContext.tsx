import {
  createContext,
  useContext,
  useState,
} from "react";
import useProtectedRoutes from "../hooks/useProtectedRoutes";

interface AuthContextState {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  authErrorMsg: string;
  setAuthErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  isUserLoading: boolean;
}

const AuthContext = createContext<AuthContextState>({
  currentUser: {
    id: "",
    token: "",
    email: "",
    partner_id: "",
  },
  setCurrentUser: () => {},
  authErrorMsg: "",
  setAuthErrorMsg: () => {},
  isUserLoading: false,
});

type AuthContextProps = {
  children: React.ReactNode | React.ReactNode[] | null;
  value?: {
    currentUser: User
  } | null;
}

export default function AuthContextProvider({ children }: AuthContextProps) {
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    token: "",
    email: "",
    partner_id: "",
  });
  const [authErrorMsg, setAuthErrorMsg] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(false);

  useProtectedRoutes({ currentUser, isUserLoading, setAuthErrorMsg, setCurrentUser, setIsUserLoading });

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isUserLoading,
        setCurrentUser,
        authErrorMsg,
        setAuthErrorMsg,
      }}
    >
      {children}
  </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}
