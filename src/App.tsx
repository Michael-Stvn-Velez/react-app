// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ConfirmAccount from "./components/auth/ConfirmAccount";
import RegisterComplete from "./components/auth/RegisterComplete";
import Home from "./components/Home";
import ForgotPassword from "./components/auth/ForgotPassword";
import ChangePassword from "./components/auth/ChangePassword";
import Profile from "./components/Profile";
import AddRole from "./components/AddRole";
import CreateCancha from "./components/canchas/CreateCancha";
import MyCanchas from "./components/canchas/MyCanchas";
import EditCancha from "./components/canchas/EditCancha"; // Importa el componente EditCancha
import Explore from "./components/Explore"; 

const App: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>; // Pantalla de carga mientras se obtienen los datos de usuario
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-account" element={<ConfirmAccount />} />
        <Route path="/register-complete" element={<RegisterComplete />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-role" element={isAuthenticated ? <AddRole /> : <Navigate to="/login" />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/explore" element={<Explore />} />

        {/* Ruta para crear una cancha */}
        <Route
          path="/create-cancha"
          element={isAuthenticated && user?.roles?.includes("owner") ? <CreateCancha /> : <Navigate to="/login" />}
        />

        {/* Ruta para ver las canchas del usuario autenticado */}
        <Route
          path="/my-canchas"
          element={isAuthenticated && user?.roles?.includes("owner") ? <MyCanchas /> : <Navigate to="/login" />}
        />

        {/* Ruta para editar una cancha específica */}
        <Route
          path="/edit-cancha/:canchaId"
          element={isAuthenticated && user?.roles?.includes("owner") ? <EditCancha /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
