import {
  createContext,
  useContext,
  useEffect,
  useState,
 } from "react";
import useProtectedRoutes from "../hooks/useProtectedRoutes";

const AuthContext = createContext({
  currentUser: {
    id: "",
    token: "",
    email: "",
  },
  setCurrentUser: (prevState: any) => prevState,
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
  });

  useProtectedRoutes(currentUser);

  return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
    {children}
  </AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}
