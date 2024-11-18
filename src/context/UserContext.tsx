// src/context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  email: string;
  setEmail: (email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState(""); // Estado para almacenar el email

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser utilizado dentro de un UserProvider");
  }
  return context;
};
