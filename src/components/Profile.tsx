// src/components/Profile.tsx
import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Profile.module.css";

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div>
      <Navbar /> {/* Agrega el componente Navbar aquí */}
      <div className={styles.profileContainer}>
        <h2 className={styles.h2}>Perfil de Usuario</h2>
        <div className={styles.infoTable}>
          <div className={styles.row}>
            <div className={styles.cellLabel}>Nombre:</div>
            <div className={styles.cellValue}>{user.names}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.cellLabel}>Primer Apellido:</div>
            <div className={styles.cellValue}>{user.firstSurname}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.cellLabel}>Segundo Apellido:</div>
            <div className={styles.cellValue}>{user.secondSurname}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.cellLabel}>Email:</div>
            <div className={styles.cellValue}>{user.email}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.cellLabel}>Rol:</div>
            <div className={styles.cellValue}>
              {Array.isArray(user.roles) ? user.roles.join(", ") : user.roles}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.cellLabel}>Fecha de Nacimiento:</div>
            <div className={styles.cellValue}>{user.dateofBirth}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.cellLabel}>Tipo de Identidad:</div>
            <div className={styles.cellValue}>{user.typeIdentity}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.cellLabel}>Número de Identidad:</div>
            <div className={styles.cellValue}>{user.numberIdentity}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
