import {
  createContext,
  useContext,
  useState,
} from "react";
import useProtectedRoutes from "../hooks/useProtectedRoutes";

interface AuthContextState {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  authError: boolean;
  setAuthError: React.Dispatch<React.SetStateAction<boolean>>;
  isUserLoading: boolean;
}

const AuthContext = createContext<AuthContextState>({
  currentUser: {
    id: "",
    token: "",
    email: "",
    name: "",
    partnerId: "",
  },
  setCurrentUser: () => {},
  authError: false,
  setAuthError: () => {},
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
    name: "",
    partnerId: "",
  });
  const [authError, setAuthError] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useProtectedRoutes({ currentUser, isUserLoading, setAuthError, setCurrentUser, setIsUserLoading });

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isUserLoading,
        setCurrentUser,
        authError,
        setAuthError,
      }}
    >
      {children}
  </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}
