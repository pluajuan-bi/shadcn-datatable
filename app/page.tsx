'use client';
import { Button } from "@/components/ui/button";
import { UsersDataTable } from "@/components/users-data-table"
import { Users } from "lucide-react"
import { use, useState } from "react";
export default function Home() {
const [respuesta, setRespuesta] = useState<string>("");
 const llamarJava = async () => {
    try {
      const res = await fetch("https://service-shadcn-data-table-clone.pluaj-dev-dev.svc.cluster.local:8082/");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      setRespuesta(text);
    } catch (err) {
      setRespuesta("Error: " + String(err));
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
         <div>
        <Button onClick={llamarJava} className="btn">Llamar servicio  Java</Button>
        <pre>{respuesta}</pre>
      </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-balance">Gestión de Usuarios</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Administra tu base de datos de usuarios de forma simple y eficiente
          </p>
        </div>
        <div className="rounded-xl border bg-card shadow-sm">
          <UsersDataTable />
        </div>
      </div>
    </main>
  )
}
