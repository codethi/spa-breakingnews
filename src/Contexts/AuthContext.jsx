import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [jwt, setJwt] = useState("");

  return (
    <AuthContext.Provider value={{ jwt, setJwt }}>
      {children}
    </AuthContext.Provider>
  );
}