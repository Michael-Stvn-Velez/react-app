// src/components/RegisterComplete.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerComplete } from "../services/authService";

const RegisterComplete: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    secondSurname: "",
    dateofBirth: "",
    role: "",
    numberIdentity: "",
    typeIdentity: ""
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerComplete(form);
      setMessage(response.message);
      navigate("/home"); // Redirige al inicio de la aplicación
    } catch (error) {
      setMessage("Error al completar registro.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="secondSurname" placeholder="Segundo Apellido" onChange={handleChange} />
      <input name="dateofBirth" placeholder="Fecha de Nacimiento" onChange={handleChange} />
      <input name="role" placeholder="Rol" onChange={handleChange} />
      <input name="numberIdentity" placeholder="Número de Identidad" onChange={handleChange} />
      <input name="typeIdentity" placeholder="Tipo de Identidad" onChange={handleChange} />
      <button type="submit">Completar Registro</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterComplete;
