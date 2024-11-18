import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/authService";
import { useUser } from "../../context/UserContext";
import styles from "../../styles/Register.module.css";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setEmail } = useUser();
  const [form, setForm] = useState({ names: "", firstSurname: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  // Validaciones
  const isFormComplete = () => {
    return form.names && form.firstSurname && form.email && form.password && confirmPassword;
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones de campos
    if (!isFormComplete()) {
      setMessage("Todos los campos son obligatorios.");
      return;
    }

    if (!isEmailValid(form.email)) {
      setMessage("Email no válido.");
      return;
    }

    if (!isPasswordValid(form.password)) {
      setMessage("La contraseña debe tener mínimo 8 caracteres, una letra y un número.");
      return;
    }

    if (form.password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await register(form);
      setMessage(response.message);
      setEmail(form.email);
      navigate("/confirm-account");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message.toLowerCase().includes("email ya registrado")) {
          setMessage("Email ya registrado.");
        } else {
          setMessage(error.response.data.message);
        }
      } else {
        setMessage("Error al registrar. Inténtalo nuevamente.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.h2} >Regístrate</h2>
      <input
        name="names"
        placeholder="Nombres"
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        name="firstSurname"
        placeholder="Apellido"
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        className={styles.inputField}
      />
      <button type="submit" className={styles.button}>Registrarse</button>
      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.linkContainer}>
        <Link to="/login" className={styles.link}>
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </div>
    </form>
  );
};

export default Register;
