// EditCancha.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Cancha } from '../../types/types';
import styles from '../../styles/EditCancha.module.css';
import NavbarCanchas from './NavbarCanchas';

const EditCancha: React.FC = () => {
  const { canchaId } = useParams<{ canchaId: string }>();
  const navigate = useNavigate();

  // Estados para los datos de la cancha
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');
  const [numeroContacto, setNumeroContacto] = useState<string>('');
  const [rutaGoogleMaps, setRutaGoogleMaps] = useState<string>('');
  const [capacidad, setCapacidad] = useState<string>('');
  const [foto, setFoto] = useState<File | null>(null);
  const [existingFoto, setExistingFoto] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para manejar la carga de datos

  useEffect(() => {
    const fetchCancha = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/canchas/${canchaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cancha = response.data;

        // Asigna los valores obtenidos a los estados correspondientes
        setName(cancha.name);
        setLocation(cancha.location);
        setTipo(cancha.tipo);
        setNumeroContacto(cancha.numeroContacto);
        setRutaGoogleMaps(cancha.rutaGoogleMaps);
        setCapacidad(cancha.capacidad);
        setExistingFoto(cancha.foto);
        setIsLoading(false); // Marcar la carga como completada
      } catch (error) {
        console.error('Error al cargar la cancha', error);
        setMessage('Error al cargar los detalles de la cancha.');
        setIsLoading(false); // Finaliza la carga incluso si hay error
      }
    };

    fetchCancha();
  }, [canchaId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();

      formData.append('name', name);
      formData.append('location', location);
      formData.append('tipo', tipo);
      formData.append('numeroContacto', numeroContacto);
      formData.append('rutaGoogleMaps', rutaGoogleMaps);
      formData.append('capacidad', capacidad);

      // Solo agregar la nueva foto si el usuario seleccionó una
      if (foto) {
        formData.append('foto', foto);
      }

      await axios.put(`/api/canchas/${canchaId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Cancha actualizada con éxito.');
      navigate('/my-canchas');
    } catch (error) {
      console.error('Error al actualizar la cancha', error);
      setMessage('Error al actualizar la cancha.');
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>; // Mensaje de carga mientras los datos se obtienen
  }

  return (
    <div>
      <NavbarCanchas />
      <div className={styles.container}>
        <h2 className={styles.title}>Editar Cancha</h2>
        {message && <p className={styles.message}>{message}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Nombre de la cancha"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Ubicación"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Número de contacto"
            value={numeroContacto}
            onChange={(e) => setNumeroContacto(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Ruta de Google Maps"
            value={rutaGoogleMaps}
            onChange={(e) => setRutaGoogleMaps(e.target.value)}
            className={styles.input}
          />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={styles.input}>
            <option value="">Tipo de cancha</option>
            <option value="cesped">Césped</option>
            <option value="cesped sintetico">Césped Sintético</option>
            <option value="arena">Arena</option>
          </select>
          <select value={capacidad} onChange={(e) => setCapacidad(e.target.value)} className={styles.input}>
            <option value="">Capacidad</option>
            <option value="futbol 5">Fútbol 5</option>
            <option value="futbol 6">Fútbol 6</option>
            <option value="futbol 7">Fútbol 7</option>
            <option value="futbol 8">Fútbol 8</option>
            <option value="futbol 9">Fútbol 9</option>
            <option value="futbol 10">Fútbol 10</option>
            <option value="futbol 11">Fútbol 11</option>
          </select>

          {existingFoto && (
            <div className={styles.imagePreview}>
              <p>Foto actual:</p>
              <img
                src={`http://localhost:5000${existingFoto}`}
                alt="Foto actual de la cancha"
                className={styles.image}
              />
            </div>
          )}
          
          <input type="file" onChange={handleFileChange} className={styles.input} />
          <button type="submit" className={styles.button}>Actualizar Cancha</button>
        </form>
      </div>
    </div>
    
  );
};

export default EditCancha;
