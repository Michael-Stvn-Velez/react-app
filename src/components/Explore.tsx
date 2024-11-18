// src/components/Explore.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cancha } from '../types/types';
import styles from '../styles/Explore.module.css';
import Navbar from './Navbar';

const Explore: React.FC = () => {
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const response = await axios.get(`/api/canchas/explore?page=${currentPage}&limit=5`);
        setCanchas(response.data.canchas);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error al obtener las canchas", error);
      }
    };

    fetchCanchas();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2>Explorar Canchas</h2>
        <ul className={styles.canchasList}>
          {canchas.map((cancha) => (
            <li key={cancha._id} className={styles.canchaItem}>
              <h3>{cancha.name}</h3>
              <p className={styles.p}><strong>Ubicación:</strong> {cancha.location}</p>
              <p className={styles.p}><strong>Tipo:</strong> {cancha.tipo}</p>
              <p className={styles.p}><strong>Capacidad:</strong> {cancha.capacidad}</p>
              <p className={styles.p}><strong>Contacto:</strong> {cancha.numeroContacto}</p>
              <div className={styles.containerFoto}>
                <a href={cancha.rutaGoogleMaps}>Como llegar</a>
                {cancha.foto && (
                  <img
                    src={`https://www.istockphoto.com/resources/images/PhotoFTLP/P1-regional-iStock-1985150440.jpg`}
                    alt={`Foto de ${cancha.name}`}
                    className={styles.image}
                  />
                )}
              </div>
              
            </li>
          ))}
        </ul>
        
        <div className={styles.pagination}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
