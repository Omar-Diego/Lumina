"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";

import { getMateriaColor } from "@/lib/utils";
import type { MateriaResumen } from "@/lib/tutores";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function MateriasGrid({ materias }: { materias: MateriaResumen[] }) {
  const [q, setQ] = useState("");
  const filtradas = materias.filter((m) =>
    m.materia.toLowerCase().includes(q.trim().toLowerCase()),
  );

  return (
    <>
      <div className="relative mt-6 mb-6">
        <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-[var(--gray-400)]" />
        <Input
          type="search"
          placeholder="¿Qué materia quieres explorar?"
          aria-label="Buscar materia"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="h-auto rounded-[var(--radius-lg)] border-[1.5px] border-[var(--border)] bg-card py-4 pr-5 pl-13 text-[15px] font-bold text-[var(--ink)] placeholder:font-semibold placeholder:text-[var(--gray-400)] focus-visible:border-[var(--blue)] focus-visible:ring-[var(--blue)]/20"
        />
      </div>

      <p className="mb-4 text-[15px] font-extrabold text-[var(--ink)]">
        {filtradas.length}{" "}
        {filtradas.length === 1 ? "materia disponible" : "materias disponibles"}
      </p>

      {filtradas.length === 0 ? (
        <p className="text-[14.5px] font-bold text-[var(--gray-500)]">
          No encontramos materias que coincidan con &quot;{q}&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((materia) => (
            <MateriaCard key={materia.materia} materia={materia} />
          ))}
        </div>
      )}
    </>
  );
}

function MateriaCard({ materia }: { materia: MateriaResumen }) {
  const color = getMateriaColor(materia.materia);
  return (
    <Card>
      <CardContent className="flex flex-col">
        <div
          className={`mb-3.5 flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] ${color.bg} ${color.text}`}
        >
          <BookOpen className="size-6" />
        </div>
        <h3 className="text-lg font-extrabold text-[var(--ink)]">{materia.materia}</h3>
        <p className="mt-1.5 mb-4 text-[13.5px] font-bold text-[var(--gray-500)]">
          {materia.tutorCount}{" "}
          {materia.tutorCount === 1 ? "tutor disponible" : "tutores disponibles"}
        </p>
        <Button
          render={<Link href={`/tutores?materia=${encodeURIComponent(materia.materia)}`} />}
          className="mt-auto w-full justify-center rounded-[var(--radius-md)] py-3"
        >
          Ver tutores
        </Button>
      </CardContent>
    </Card>
  );
}
