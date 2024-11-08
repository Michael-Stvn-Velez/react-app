// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ConfirmAccount from "./components/ConfirmAccount";
import RegisterComplete from "./components/RegisterComplete";
import Home from "./components/Home"; // Inicio de la app

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-account" element={<ConfirmAccount />} />
        <Route path="/register-complete" element={<RegisterComplete />} />
        
        {/* Ruta protegida: solo accesible si el usuario está autenticado */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        
        {/* Redirecciona a login por defecto si no está autenticado, o a home si lo está */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
