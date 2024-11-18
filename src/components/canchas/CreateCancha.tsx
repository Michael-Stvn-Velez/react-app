import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/CreateCancha.module.css';
import NavbarCanchas from './NavbarCanchas';

const CreateCancha: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [numeroContacto, setNumeroContacto] = useState('');
  const [rutaGoogleMaps, setRutaGoogleMaps] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [tipo, setTipo] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.roles.includes('owner')) {
      setMessage('No tienes permisos para crear una cancha.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');

      // Crear un objeto FormData
      const formData = new FormData();
      formData.append('name', name);
      formData.append('location', location);
      formData.append('numeroContacto', numeroContacto);
      formData.append('rutaGoogleMaps', rutaGoogleMaps);
      if (foto) formData.append('foto', foto); // Añadir la imagen solo si está presente
      formData.append('tipo', tipo);
      formData.append('capacidad', capacidad);

      const response = await axios.post('/api/canchas', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setName('');
      setLocation('');
      setNumeroContacto('');
      setRutaGoogleMaps('');
      setFoto(null);
      setTipo('');
      setCapacidad('');
    } catch (error) {
      setMessage('Error al crear la cancha. Inténtalo nuevamente.');
    }
  };

  return (
    <div>
      <NavbarCanchas />
      <div className={styles.container}>
        <h2>Crear Nueva Cancha</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" placeholder="Nombre de la cancha" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
          <input type="text" placeholder="Ubicación de la cancha" value={location} onChange={(e) => setLocation(e.target.value)} className={styles.input} />
          <input type="text" placeholder="Número de contacto" value={numeroContacto} onChange={(e) => setNumeroContacto(e.target.value)} className={styles.input} />
          <input type="text" placeholder="Ruta de Google Maps" value={rutaGoogleMaps} onChange={(e) => setRutaGoogleMaps(e.target.value)} className={styles.input} />
          <input type="file" onChange={handleFileChange} className={styles.input} /> {/* Campo de selección de archivo */}
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={styles.input}>
            <option value="">Tipo de cancha</option>
            <option value="cesped">Césped</option>
            <option value="cesped sintetico">Césped Sintético</option>
            <option value="arena">Arena</option>
          </select>
          <select value={capacidad} onChange={(e) => setCapacidad(e.target.value)} className={styles.input}>
            <option value="">Capacidad de personas</option>
            <option value="futbol 5">Fútbol 5</option>
            <option value="futbol 6">Fútbol 6</option>
            <option value="futbol 7">Fútbol 7</option>
            <option value="futbol 8">Fútbol 8</option>
            <option value="futbol 9">Fútbol 9</option>
            <option value="futbol 10">Fútbol 10</option>
            <option value="futbol 11">Fútbol 11</option>
          </select>
          <button type="submit" className={styles.button}>Crear Cancha</button>
          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
    
  );
};

export default CreateCancha;
