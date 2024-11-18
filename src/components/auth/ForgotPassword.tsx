// src/components/ForgotPassword.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Importar UserContext
import styles from "../../styles/ForgotPassword.module.css";
import axios from "axios";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { setEmail } = useUser(); // Usa setEmail de UserContext
  const [email, setEmailState] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(e.target.value);
    setMessage(null);
    setError(null);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Por favor, introduce un email válido.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", { email });
      setMessage(response.data.message);
      setEmail(email); // Guarda el email en el contexto
      setEmailState(""); 

      setTimeout(() => navigate("/change-password"), 2000); // Redirige a ChangePassword después de 2 segundos
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Ocurrió un error. Inténtalo nuevamente.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.h2} >Recuperar Contraseña</h2>
      <input
        type="email"
        name="email"
        placeholder="Introduce tu email"
        value={email}
        onChange={handleEmailChange}
        className={styles.inputField}
      />
      <button type="submit" className={styles.button}>Enviar</button>
      
      {message && <p className={styles.successMessage}>{message}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  );
};

export default ForgotPassword;
