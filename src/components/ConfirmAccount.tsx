// src/components/ConfirmAccount.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAccount, resendConfirmationCode } from "../services/authService";

const ConfirmAccount: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", code: "" });
  const [message, setMessage] = useState<string | null>(null);

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
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="code" placeholder="Código de Confirmación" onChange={handleChange} />
      <button type="submit">Confirmar Cuenta</button>
      <button type="button" onClick={handleResendCode}>
        Reenviar Código de Confirmación
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ConfirmAccount;
