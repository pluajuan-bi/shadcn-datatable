"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

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
    <div className="flex justify-center pt-10 px-4">
      <Card className="w-full max-w-lg shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">
            Servicio Java
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Invoca la mini app Java a través del proxy <code>/api/hola</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button
              variant="default"
              onClick={llamar}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Llamando..." : "Llamar servicio Java"}
            </Button>

            <div className="rounded-md bg-gray-50 border border-gray-200 p-4 min-h-[4rem] text-sm">
              {respuesta ? (
                <pre className="whitespace-pre-wrap text-gray-800">
                  {respuesta}
                </pre>
              ) : (
                <span className="text-gray-400">Sin respuesta</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}