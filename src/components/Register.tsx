// src/components/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ names: "", firstSurname: "", email: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(form);
      setMessage(response.message);
      navigate("/confirm-account"); // Redirige a la confirmación de cuenta
    } catch (error) {
      setMessage("Error al registrar. Inténtalo nuevamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="names" placeholder="Nombres" onChange={handleChange} />
      <input name="firstSurname" placeholder="Apellido" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Registrarse</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;
