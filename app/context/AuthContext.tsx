import { createContext, useContext } from "react";

const AuthContext = createContext(null);

interface AuthContextProps {
  children: React.ReactNode | React.ReactNode[] | null;
  value: any | null;
}

export default function AuthContextProvider({ children }: AuthContextProps) {
  return <AuthContext.Provider value={null}>
    {children}
  </AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}
