import axios from 'axios';
import {
  LoginData,
  RegisterData,
  ConfirmAccountData,
  RegisterCompleteData,
  ChangePasswordData,
  ResendConfirmationCodeData,
  AuthResponse
} from "./authInterfaces";

// Configurar la URL de la API
const API_URL = "http://localhost:5000/api/auth";

// Función para iniciar sesión
export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al iniciar sesión");
  }
};

// Función para registrar un nuevo usuario
export const register = async (data: RegisterData) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

// Función para confirmar la cuenta de un usuario
export const confirmAccount = async (data: ConfirmAccountData) => {
  const response = await axios.post(`${API_URL}/confirm-account`, data);
  return response.data;
};

// Función para completar el perfil de usuario
export const registerComplete = async (data: RegisterCompleteData) => {
  const response = await axios.post(`${API_URL}/register-complete`, data);
  return response.data;
};

// Función para cambiar la contraseña con una temporal
export const changePassword = async (data: ChangePasswordData) => {
  const response = await axios.post(`${API_URL}/change-password`, data);
  return response.data;
};

// Función para reenviar el código de confirmación
export const resendConfirmationCode = async (data: ResendConfirmationCodeData) => {
  const response = await axios.post(`${API_URL}/resend-confirmation-code`, data);
  return response.data;
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Función para guardar los tokens en localStorage
export const saveTokens = (tokens: AuthResponse) => {
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);
};
