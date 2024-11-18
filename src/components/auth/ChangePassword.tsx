// src/components/ChangePassword.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Importar UserContext
import styles from "../../styles/ChangePassword.module.css";
import axios from "axios";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const { email: storedEmail } = useUser(); // Obtener el email almacenado en ForgotPassword
  const [form, setForm] = useState({
    email: storedEmail, // Establecer el email del contexto como valor inicial
    temporaryPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage(null);
    setError(null);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que el email coincida con el que se guardó en ForgotPassword
    if (form.email !== storedEmail) {
      setError("El email debe coincidir con el ingresado anteriormente.");
      return;
    }

    if (!form.email || !form.temporaryPassword || !form.newPassword || !form.confirmNewPassword) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!validatePassword(form.newPassword)) {
      setError("La nueva contraseña debe tener mínimo 8 caracteres, una letra y un número.");
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/change-password", {
        email: form.email,
        temporaryPassword: form.temporaryPassword,
        newPassword: form.newPassword
      });
      setMessage(response.data.message); // Mensaje de éxito desde el backend
      setForm({ email: storedEmail, temporaryPassword: "", newPassword: "", confirmNewPassword: "" });

      // Redirigir al home después de cambiar la contraseña exitosamente
      setTimeout(() => navigate("/home"), 2000);
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
      <h2 className={styles.h2} >Cambiar Contraseña</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        type="password"
        name="temporaryPassword"
        placeholder="Contraseña Temporal"
        value={form.temporaryPassword}
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        type="password"
        name="newPassword"
        placeholder="Nueva Contraseña"
        value={form.newPassword}
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        type="password"
        name="confirmNewPassword"
        placeholder="Confirmar Nueva Contraseña"
        value={form.confirmNewPassword}
        onChange={handleChange}
        className={styles.inputField}
      />
      <button type="submit" className={styles.button}>Actualizar Contraseña</button>
        
      {message && <p className={styles.successMessage}>{message}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  );
};

export default ChangePassword;
