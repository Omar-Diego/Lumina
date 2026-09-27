"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { cn } from "@/lib/utils";
import type { Franja } from "@/lib/tutores";
import { Button } from "@/components/ui/button";

export function FranjaPicker({
  tutorId,
  franjasPorDia,
}: {
  tutorId: string;
  franjasPorDia: { dia: string; franjas: Franja[] }[];
}) {
  const router = useRouter();
  const [seleccionada, setSeleccionada] = useState<Franja | null>(null);

  return (
    <>
      <div className="flex flex-wrap gap-8">
        {franjasPorDia.map(({ dia, franjas }) => (
          <div key={dia}>
            <p className="mb-2.5 text-[13px] font-bold tracking-wide text-[var(--gray-500)] uppercase">
              {dia}
            </p>
            <div className="flex flex-wrap gap-2">
              {franjas.map((franja) => {
                const activa = seleccionada?.id === franja.id;
                return (
                  <button
                    key={franja.id}
                    type="button"
                    onClick={() => setSeleccionada(franja)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-pill border-[1.5px] px-4 py-2.5 text-[13.5px] font-bold",
                      activa
                        ? "border-[var(--blue)] bg-[var(--blue-light)] text-[var(--blue-dark)]"
                        : "border-[var(--border)] bg-card text-[var(--gray-600)] hover:border-[var(--blue)] hover:bg-[var(--blue-light)] hover:text-[var(--blue-dark)]",
                    )}
                  >
                    {format(new Date(franja.inicio), "HH:mm")} –{" "}
                    {format(new Date(franja.fin), "HH:mm")}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {seleccionada && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-lg)] bg-[var(--blue-lighter)] px-6 py-5">
          <p className="text-[14.5px] font-extrabold text-[var(--ink)]">
            Franja seleccionada:{" "}
            {capitalizar(format(new Date(seleccionada.inicio), "EEEE", { locale: es }))} ·{" "}
            {format(new Date(seleccionada.inicio), "HH:mm")} –{" "}
            {format(new Date(seleccionada.fin), "HH:mm")}
          </p>
          <Button
            onClick={() =>
              router.push(`/tutores/${tutorId}/reservar?franja=${seleccionada.id}`)
            }
            className="rounded-pill px-6 py-3"
          >
            Continuar con la reserva
          </Button>
        </div>
      )}
    </>
  );
}

function capitalizar(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
