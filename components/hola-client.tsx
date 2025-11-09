"use client"

import { useState } from "react";

export default function HolaClient() {
  const [respuesta, setRespuesta] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const llamar = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hola");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      setRespuesta(text);
    } catch (err) {
      setRespuesta("Error: " + String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button onClick={llamar} className="btn">
        Llamar servicio Java con proxy 
      </button>
      {loading ? <p className="mt-2">Cargando...</p> : <pre className="mt-2">{respuesta}</pre>}
    </div>
  );
}
