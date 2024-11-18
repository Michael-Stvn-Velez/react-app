import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  const { user } = useAuth();

  console.log("user en Home:", user);

  return (
    <div>
      <Navbar />
      <div className={styles.pageContainer}>
        <h2 className={styles.h2}>Bienvenido a SportConnect</h2>
        <p>Aquí encontrarás las mejores canchas de todo Ibagué</p>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.alwaysVisible}>
              <p className={styles.title}>Explora nuestro catálogo</p>
            </div>
            <div className={styles.hoverContent}>
              <p className={styles.title}>Aquí encontrarás nuestros mejores establecimientos deportivos</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.alwaysVisible}>
              <p className={styles.title}>Conviértete en propietario</p>
            </div>
            <div className={styles.hoverContent}>
              <p className={styles.title}>Si eres propietario, podrás publicar tus establecimientos deportivos</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.alwaysVisible}>
              <p className={styles.title}>Conoce más sobre nosotros</p>
            </div>
            <div className={styles.hoverContent}>
              <p className={styles.title}>Quiénes somos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
