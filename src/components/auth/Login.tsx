import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Importar el contexto de autenticación
import styles from "../../styles/Login.module.css";
import "../../styles/styles.css"

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa login del contexto
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.email, form.password); // Llama a login del contexto
      setMessage("Inicio de sesión exitoso");
      navigate("/home"); // Navega al home después de iniciar sesión
    } catch (error) {
      setMessage("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="fullscreen-background">
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.h2} >Iniciar Sesión</h2>
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
        <button type="submit" className={styles.button}>
          Iniciar Sesión
        </button>
        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.linksContainer}>
          <Link to="/register" className={styles.link}>
            ¿No tienes cuenta? Regístrate aquí
          </Link>
          <Link to="/forgot-password" className={styles.link}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
  