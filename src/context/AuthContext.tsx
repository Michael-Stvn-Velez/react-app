// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { login, logout, saveTokens } from "../services/authService";
import { AuthResponse } from "../services/authInterfaces";

interface User {
  names: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
  roles: string[];
  dateofBirth: string;
  typeIdentity: string;
  numberIdentity: string;
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Indicador de carga
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("accessToken"));
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carga inicial

  // Función para obtener el perfil del usuario
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No se encontró el token de acceso");
      }

      const response = await axios.get("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Perfil del usuario:", response.data); // Verificación en consola
      setUser({
        names: response.data.names,
        firstSurname: response.data.firstSurname,
        secondSurname: response.data.secondSurname,
        email: response.data.email,
        roles: response.data.roles,
        dateofBirth: response.data.dateofBirth.split("T")[0],
        typeIdentity: response.data.typeIdentity,
        numberIdentity: response.data.numberIdentity,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error al obtener el perfil del usuario", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false); // Finaliza la carga al obtener el perfil
    }
  };

  // Función de inicio de sesión
  const handleLogin = async (email: string, password: string) => {
    try {
      const response: AuthResponse = await login({ email, password });
      saveTokens(response);
      setIsAuthenticated(true);
      await fetchUserProfile();
    } catch (error: any) {
      console.error("Error en el inicio de sesión:", error);
      throw new Error("Error en la contraseña o email del usuario");
    }
  };

  // Función de cierre de sesión
  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false); // Asegura que isLoading sea falso después de cerrar sesión
  };

  // Llamar a fetchUserProfile al cargar el contexto si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    } else {
      setIsLoading(false); // Finaliza la carga si no está autenticado
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login: handleLogin, logout: handleLogout }}>
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
