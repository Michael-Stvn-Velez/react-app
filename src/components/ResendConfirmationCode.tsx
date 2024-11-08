// src/components/ResendConfirmationCode.tsx
import React, { useState } from "react";
import { resendConfirmationCode } from "../services/authService";

const ResendConfirmationCode: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await resendConfirmationCode({ email });
      setMessage(response.message);
    } catch (error) {
      setMessage("Error al reenviar el código de confirmación.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Reenviar Código de Confirmación</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ResendConfirmationCode;
