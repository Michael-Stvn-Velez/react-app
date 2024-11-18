// src/components/AddRole.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import styles from "../styles/AddRole.module.css";
import Navbar from "./Navbar";

const AddRole: React.FC = () => {
  const [role, setRole] = useState("owner");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    setMessage(null); 
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        "/api/auth/add-role",
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(response.data.message);
      setRole("owner");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Ocurrió un error. Inténtalo nuevamente.");
      }
    }
  };

  // Función para redirigir a "Mis Canchas"
  const handleGoToMyCanchas = () => {
    navigate("/my-canchas"); // Navega a la ruta deseada
  };

  return (
    <div>
      <Navbar />
      <div className={styles.addRoleContainer}>
        <h2>Agregar Nuevo Rol</h2>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <label htmlFor="role" className={styles.label}>Selecciona un rol:</label>
          <select id="role" value={role} onChange={handleChange} className={styles.selectField}>
            <option value="owner">Propietario</option>
          </select>
          <button type="submit" className={styles.button}>Agregar Rol</button>
        </form>
        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
      
      {/* Botón para ir a "Mis Canchas" */}
      <button className={styles.buttonCanchas} onClick={handleGoToMyCanchas}>Puedes ir a tus canchas si ya eres propietario</button>
    </div>
  );
};

export default AddRole;
