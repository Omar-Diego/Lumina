"use client";

import { useState } from "react";
import { CalendarDays, ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Franjas en bloques de 30 min, 06:00–21:30 — suficiente para cualquier
// horario de tutoría sin volver el selector interminable.
const HORAS = Array.from({ length: 32 }, (_, i) => {
  const totalMin = 6 * 60 + i * 30;
  const h = String(Math.floor(totalMin / 60)).padStart(2, "0");
  const m = String(totalMin % 60).padStart(2, "0");
  return `${h}:${m}`;
});

export function FranjaForm({
  action,
}: {
  action: (formData: FormData) => void;
}) {
  const [fecha, setFecha] = useState<Date>();
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [open, setOpen] = useState(false);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <input type="hidden" name="fecha" value={fecha ? format(fecha, "yyyy-MM-dd") : ""} />
      <input type="hidden" name="horaInicio" value={horaInicio} />
      <input type="hidden" name="horaFin" value={horaFin} />

      <div className="flex flex-col gap-2">
        <Label className="text-[13px] font-extrabold text-[var(--ink)]">Día</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            className={cn(
              "flex h-auto min-w-[160px] items-center gap-2 rounded-[var(--radius-md)] border-[1.5px] border-[var(--border)] bg-[#f8fafd] px-4 py-3.5 text-left outline-none transition-colors hover:border-[var(--blue)] focus-visible:border-[var(--blue)] focus-visible:ring-3 focus-visible:ring-[var(--blue)]/30",
            )}
          >
            <CalendarDays className="size-4 shrink-0 text-[var(--gray-400)]" />
            <span
              className={cn(
                "flex-1 text-[14.5px]",
                fecha ? "font-bold text-[var(--ink)]" : "font-semibold text-[var(--gray-400)]",
              )}
            >
              {fecha ? format(fecha, "d MMM", { locale: es }) : "Selecciona"}
            </span>
            <ChevronDownIcon className="size-4 shrink-0 text-[var(--gray-400)]" />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={fecha}
              onSelect={(d) => {
                setFecha(d);
                setOpen(false);
              }}
              disabled={{ before: hoy }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-[13px] font-extrabold text-[var(--ink)]">Hora inicio</Label>
        <Select value={horaInicio} onValueChange={(value) => setHoraInicio(value ?? "")}>
          <SelectTrigger className="h-auto w-[110px] rounded-[var(--radius-md)] border-[1.5px] border-[var(--border)] bg-[#f8fafd] px-4 py-3.5 text-[14.5px] font-bold text-[var(--ink)]">
            <SelectValue placeholder="--:--" />
          </SelectTrigger>
          <SelectContent>
            {HORAS.map((h) => (
              <SelectItem key={h} value={h}>
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-[13px] font-extrabold text-[var(--ink)]">Hora fin</Label>
        <Select value={horaFin} onValueChange={(value) => setHoraFin(value ?? "")}>
          <SelectTrigger className="h-auto w-[110px] rounded-[var(--radius-md)] border-[1.5px] border-[var(--border)] bg-[#f8fafd] px-4 py-3.5 text-[14.5px] font-bold text-[var(--ink)]">
            <SelectValue placeholder="--:--" />
          </SelectTrigger>
          <SelectContent>
            {HORAS.map((h) => (
              <SelectItem key={h} value={h}>
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={!fecha || !horaInicio || !horaFin}
        className="rounded-[var(--radius-md)] px-5 py-3.5"
      >
        + Publicar franja
      </Button>
    </form>
  );
}
