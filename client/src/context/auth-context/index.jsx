import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  return <AuthContext.Provider value={{}}> {children} </AuthContext.Provider>;
}
