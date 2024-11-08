// src/components/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveTokens } from "../services/authService";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(form);
      saveTokens(response); // Guarda el token en localStorage
      setMessage("Inicio de sesión exitoso");
      navigate("/home"); // Redirige al inicio de la app
    } catch (error) {
      setMessage("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Iniciar Sesión</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
