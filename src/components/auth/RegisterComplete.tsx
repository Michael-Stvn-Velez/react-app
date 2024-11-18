import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerComplete } from "../../services/authService";
import { useUser } from "../../context/UserContext";
import styles from "../../styles/RegisterComplete.module.css";

const RegisterComplete: React.FC = () => {
  const navigate = useNavigate();
  const { email } = useUser();
  const [form, setForm] = useState({
    email: "",
    secondSurname: "",
    dateofBirth: "",
    role: "player",
    numberIdentity: "",
    typeIdentity: "CC" 
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, email }));
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerComplete(form);
      setMessage(response.message);
      navigate("/home");
    } catch (error) {
      setMessage("Error al completar registro.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.h2} >Completar Registro</h2>
      <input
        name="email"
        value={form.email}
        readOnly
        className={`${styles.inputField} ${styles.readOnlyField}`}
      />
      <input
        name="secondSurname"
        placeholder="Segundo Apellido"
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        type="date"
        name="dateofBirth"
        placeholder="Fecha de Nacimiento"
        onChange={handleChange}
        className={styles.inputField}
      />
      <select
        name="typeIdentity"
        value={form.typeIdentity}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="CC">CC</option>
        <option value="TI">TI</option>
        <option value="TE">TE</option>
        <option value="RC">RC</option>
      </select>
      <input
        name="numberIdentity"
        placeholder="Número de Identidad"
        onChange={handleChange}
        className={styles.inputField}
      />
      <button type="submit" className={styles.button}>Completar Registro</button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default RegisterComplete;
