// src/services/authInterfaces.ts

// Interfaz para los datos de login
export interface LoginData {
    email: string;
    password: string;
  }
  
  // Interfaz para los datos de registro
  export interface RegisterData {
    names: string;
    firstSurname: string;
    email: string;
    password: string;
  }
  
  // Interfaz para confirmar la cuenta
  export interface ConfirmAccountData {
    email: string;
    code: string;
  }
  
  // Interfaz para completar el registro
  export interface RegisterCompleteData {
    email: string;
    secondSurname?: string;
    dateofBirth?: string;
    role?: string;
    numberIdentity?: string;
    typeIdentity?: string;
  }
  
  // Interfaz para cambiar la contraseña
  export interface ChangePasswordData {
    email: string;
    temporaryPassword: string;
    newPassword: string;
  }
  
  // Interfaz para reenviar el código de confirmación
  export interface ResendConfirmationCodeData {
    email: string;
  }
  
  // Interfaz para la respuesta del login
  export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    name: string;
  }
