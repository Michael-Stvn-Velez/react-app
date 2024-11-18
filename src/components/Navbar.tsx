import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return(
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <Link to="/home" className={styles.navLink}>Inicio</Link>
        <Link to="/explore" className={styles.navLink}>Explorar</Link>
        <Link to="/add-role" className={styles.navLink}>Conviertete en propietario</Link>
      </div>

      <div className={styles.rightSection}>
        <img src="/path-to-logo/logo.png" alt="Logo" className={styles.logo} />
        {user && (
          <Link to="/profile" className={styles.userName}>
          Tu perfil&nbsp;{user.names}
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;