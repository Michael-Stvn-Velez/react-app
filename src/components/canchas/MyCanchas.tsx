// MyCanchas.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cancha } from '../../types/types';
import styles from '../../styles/MyCanchas.module.css'
import NavbarCanchas from './NavbarCanchas';

const MyCanchas: React.FC = () => {
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/api/canchas/my-canchas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCanchas(response.data);
      } catch (error) {
        console.error("Error al obtener las canchas", error);
        setMessage("Error al obtener las canchas.");
      }
    };

    fetchCanchas();
  }, []);

  // Maneja la eliminación de una cancha
  const handleDelete = async (canchaId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`/api/canchas/${canchaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCanchas(canchas.filter(cancha => cancha._id !== canchaId));
      setMessage("Cancha eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar la cancha", error);
      setMessage("Error al eliminar la cancha.");
    }
  };

  // Maneja la redirección a la página de edición
  const handleEdit = (canchaId: string) => {
    // Redirecciona a la página de edición con el ID de la cancha
    window.location.href = `/edit-cancha/${canchaId}`;
  };

  return (
    <div>
      <NavbarCanchas />
      <div className={styles.container}>
        <h2 className={styles.title}>Mis Canchas</h2>
        {message && <p className={styles.message}>{message}</p>}
        
        <ul className={styles.list}>
          {canchas.map((cancha) => (
            <li key={cancha._id} className={styles.card}>
              <h3 className={styles.name}>{cancha.name}</h3>
              <p className={styles.info}><strong>Ubicación:</strong> {cancha.location}</p>
              <p className={styles.info}><strong>Tipo:</strong> {cancha.tipo}</p>
              <p className={styles.info}><strong>Contacto:</strong> {cancha.numeroContacto}</p>
              <div className={styles.buttonContainer}>
                <button onClick={() => handleEdit(cancha._id)} className={styles.editButton}>Editar</button>
                <button onClick={() => handleDelete(cancha._id)} className={styles.deleteButton}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  );
};

export default MyCanchas;
