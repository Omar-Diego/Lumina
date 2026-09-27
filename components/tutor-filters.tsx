"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function useFilterParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return { searchParams, setParam, pathname, router };
}

export function TutorSearchBar() {
  const { searchParams, setParam } = useFilterParam();
  const q = searchParams.get("q") ?? "";

  return (
    <div className="relative mt-6 mb-4">
      <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-[var(--gray-400)]" />
      <Input
        type="search"
        placeholder="Busca un tutor por nombre"
        aria-label="Buscar tutor por nombre"
        defaultValue={q}
        key={q}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setParam("q", (e.target as HTMLInputElement).value || null);
          }
        }}
        onBlur={(e) => setParam("q", e.target.value || null)}
        className="h-auto rounded-[var(--radius-lg)] border-[1.5px] border-[var(--border)] bg-card py-4 pr-5 pl-13 text-[15px] font-bold text-[var(--ink)] placeholder:font-semibold placeholder:text-[var(--gray-400)] focus-visible:border-[var(--blue)] focus-visible:ring-[var(--blue)]/20"
      />
    </div>
  );
}

export function TutorMateriaFilter({ materias }: { materias: string[] }) {
  const { searchParams, setParam, pathname, router } = useFilterParam();
  const materia = searchParams.get("materia") ?? "";
  const hasFilters = Boolean(
    searchParams.get("q") || searchParams.get("materia") || searchParams.get("sort"),
  );

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2.5">
      <Select
        value={materia || undefined}
        onValueChange={(value) => setParam("materia", value)}
      >
        <SelectTrigger className="h-auto w-fit gap-2 rounded-pill border-[1.5px] border-[var(--border)] bg-card px-4 py-2.5 text-[13.5px] font-bold text-[var(--gray-600)] hover:border-[var(--blue)]">
          <SelectValue placeholder="Todas las materias" />
        </SelectTrigger>
        <SelectContent>
          {materias.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="ml-1 flex items-center gap-1.5 text-[13px] font-bold text-[var(--blue)]"
        >
          <SlidersHorizontal className="size-4" />
          Limpiar filtros
        </button>
      )}
    </div>
  );
}

const SORT_OPTIONS = [
  { value: "nombre", label: "Nombre (A–Z)" },
  { value: "recientes", label: "Más recientes primero" },
] as const;

export function TutorSort() {
  const { searchParams, setParam } = useFilterParam();
  const sort = searchParams.get("sort") ?? "nombre";
  const current = SORT_OPTIONS.find((o) => o.value === sort) ?? SORT_OPTIONS[0];

  return (
    <Select value={sort} onValueChange={(value) => setParam("sort", value)}>
      <SelectTrigger className="h-auto w-fit gap-2 rounded-pill border-[1.5px] border-[var(--border)] bg-card px-4 py-2.5 text-[13.5px] font-bold text-[var(--gray-600)]">
        <span>Ordenar por:</span>
        <SelectValue className="font-extrabold text-[var(--ink)]">
          {current.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function TutorEmptyState({
  materia,
  otrasMaterias,
}: {
  materia?: string;
  otrasMaterias: string[];
}) {
  const { setParam } = useFilterParam();
  const [avisado, setAvisado] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-card px-6 py-16 text-center">
      <Image
        src="/lumina-ayuda.png"
        alt=""
        width={1133}
        height={1327}
        className="mb-1 h-28 w-auto"
      />
      <h2 className="text-lg font-extrabold text-[var(--ink)]">
        {materia ? `Aún no hay tutores para "${materia}"` : "Aún no hay tutores con esos filtros"}
      </h2>
      <p className="max-w-sm text-[14.5px] font-semibold text-[var(--gray-500)]">
        {materia
          ? "No encontramos tutores aprobados para esta materia todavía. Avísanos y te contactamos cuando haya disponibilidad."
          : "Prueba con otra materia o quita el texto de búsqueda."}
        {materia && otrasMaterias.length > 0 && " También puedes probar con una materia relacionada:"}
      </p>

      {materia && otrasMaterias.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {otrasMaterias.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setParam("materia", m)}
              className="rounded-pill bg-[var(--blue-light)] px-3.5 py-1.5 text-[13px] font-bold text-[var(--blue-dark)] transition-colors hover:bg-[var(--blue)] hover:text-white"
            >
              {m}
            </button>
          ))}
        </div>
      )}

      <Button
        type="button"
        disabled={avisado}
        onClick={() => setAvisado(true)}
        className="mt-2 w-fit rounded-pill px-6 py-3"
      >
        {avisado ? "¡Te avisaremos!" : "Notificarme cuando haya tutores"}
      </Button>
    </div>
  );
}
