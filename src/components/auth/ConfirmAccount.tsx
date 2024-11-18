// src/components/ConfirmAccount.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAccount, resendConfirmationCode } from "../../services/authService";
import styles from "../../styles/ConfirmAccount.module.css"; // Importar estilos
import { useUser } from "../../context/UserContext"; // Importa el contexto

const ConfirmAccount: React.FC = () => {
  const navigate = useNavigate();
  const { email } = useUser(); // Obtiene el email del contexto
  const [form, setForm] = useState({ email: "", code: "" });
  const [message, setMessage] = useState<string | null>(null);

  // Asegura que el email esté establecido en el estado cuando el componente se monte
  useEffect(() => {
    if (!email) {
      setMessage("El email no está configurado. Redirigiendo al registro...");
      setTimeout(() => navigate("/register"), 2000); // Redirige después de 2 segundos
    } else {
      setForm((prevForm) => ({ ...prevForm, email })); // Configura el email en el formulario
    }
  }, [email, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await confirmAccount(form);
      setMessage(response.message);
      navigate("/register-complete"); // Redirige a completar registro
    } catch (error) {
      setMessage("Error al confirmar cuenta.");
    }
  };

  const handleResendCode = async () => {
    try {
      await resendConfirmationCode({ email: form.email });
      setMessage("Código de confirmación reenviado. Revisa tu correo.");
    } catch (error) {
      setMessage("Error al reenviar el código de confirmación.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.h2} >Confirmar Cuenta</h2>
      <input
        type="text"
        name="email"
        value={form.email}
        readOnly
        className={`${styles.inputField} ${styles.readOnlyField}`}
      />
      <input
        type="text"
        name="code"
        placeholder="Código de Confirmación"
        onChange={handleChange}
        className={styles.inputField}
      />
      <button type="submit" className={styles.button}>Confirmar Cuenta</button>
      <button type="button" onClick={handleResendCode} className={styles.button}>
        Reenviar Código de Confirmación
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default ConfirmAccount;
