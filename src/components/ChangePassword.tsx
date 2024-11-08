// src/components/ChangePassword.tsx
import React, { useState } from "react";
import { changePassword } from "../services/authService";

const ChangePassword: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    temporaryPassword: "",
    newPassword: ""
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await changePassword(form);
      setMessage(response.message);
    } catch (error) {
      setMessage("Error al cambiar la contraseña.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="temporaryPassword" placeholder="Contraseña Temporal" onChange={handleChange} />
      <input name="newPassword" placeholder="Nueva Contraseña" onChange={handleChange} />
      <button type="submit">Cambiar Contraseña</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ChangePassword;
 