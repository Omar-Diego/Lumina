"use client";

import type { ComponentProps } from "react";
import { es } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";

export function SesionesCalendar({
  confirmadas,
  completadas,
}: {
  confirmadas: string[];
  completadas: string[];
}) {
  const fechasConfirmadas = confirmadas.map((fecha) => new Date(fecha));

  return (
    <Calendar
      locale={es}
      defaultMonth={fechasConfirmadas[0]}
      className="w-full"
      classNames={{ months: "w-full", month: "w-full" }}
      onDayClick={() => {}}
      modifiers={{
        confirmada: fechasConfirmadas,
        completada: completadas.map((fecha) => new Date(fecha)),
      }}
      components={{ DayButton: DayButtonConPunto }}
    />
  );
}

function DayButtonConPunto(props: ComponentProps<typeof CalendarDayButton>) {
  const { modifiers } = props;
  const estadoClassName = modifiers.completada
    ? "bg-[var(--green-light)] font-extrabold text-[var(--green-dark)] hover:bg-[var(--green-light)] after:absolute after:bottom-1 after:left-1/2 after:z-20 after:size-1.5 after:-translate-x-1/2 after:rounded-full after:bg-[var(--green)] after:content-['']"
    : modifiers.confirmada
      ? "bg-[var(--blue-light)] font-extrabold text-[var(--blue-dark)] hover:bg-[var(--blue-light)] after:absolute after:bottom-1 after:left-1/2 after:z-20 after:size-1.5 after:-translate-x-1/2 after:rounded-full after:bg-[var(--blue)] after:content-['']"
      : null;
  const estado = modifiers.completada
    ? "Sesión completada"
    : modifiers.confirmada
      ? "Próxima sesión confirmada"
      : null;
  const ariaLabel = [props["aria-label"], estado].filter(Boolean).join(", ");

  return (
    <CalendarDayButton
      {...props}
      aria-label={ariaLabel || undefined}
      className={cn(props.className, estadoClassName)}
    />
  );
}
