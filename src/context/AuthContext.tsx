import React, { createContext, useContext, useState, ReactNode } from "react";
import { login, logout, saveTokens } from "../services/authService";
import { AuthResponse } from "../services/authInterfaces";

interface AuthContextProps {
  user: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Definir las propiedades que `AuthProvider` debe recibir, incluyendo `children`
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response: AuthResponse = await login({ email, password });
      saveTokens(response);
      setUser(response.name);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
