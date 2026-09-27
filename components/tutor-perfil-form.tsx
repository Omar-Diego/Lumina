"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FIELD_CLASS =
  "h-auto rounded-[var(--radius-md)] border-[1.5px] border-[var(--border)] bg-[#f8fafd] px-4 py-3.5 text-[14.5px] font-bold text-[var(--ink)] placeholder:font-semibold placeholder:text-[var(--gray-400)] focus-visible:border-[var(--blue)] focus-visible:ring-[var(--blue)]/20";

export function TutorPerfilForm({
  name,
  initialEscuela,
  initialSubjects,
  initialBio,
}: {
  name: string;
  initialEscuela: string;
  initialSubjects: string[];
  initialBio: string;
}) {
  const router = useRouter();
  const [escuela, setEscuela] = useState(initialEscuela);
  const [materias, setMaterias] = useState(initialSubjects.join(", "));
  const [bio, setBio] = useState(initialBio);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setLoading(true);

    const { error: updateError } = await authClient.updateUser({
      escuela: escuela || undefined,
      subjects: materias
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      bio: bio || undefined,
    });

    setLoading(false);

    if (updateError) {
      setError(updateError.message ?? "No se pudo guardar tu perfil.");
      return;
    }

    setSaved(true);
    router.refresh();
  }

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-[13.5px] font-extrabold text-[var(--ink)]">
              Nombre
            </Label>
            <div className={FIELD_CLASS}>{name}</div>
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="escuela"
              className="text-[13.5px] font-extrabold text-[var(--ink)]"
            >
              Escuela
            </Label>
            <Input
              id="escuela"
              placeholder="Ej. Preparatoria 5"
              className={FIELD_CLASS}
              value={escuela}
              onChange={(e) => setEscuela(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="materias"
              className="text-[13.5px] font-extrabold text-[var(--ink)]"
            >
              Materias que imparto
            </Label>
            <Input
              id="materias"
              placeholder="Matemáticas, Física"
              className={FIELD_CLASS}
              value={materias}
              onChange={(e) => setMaterias(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="bio"
              className="text-[13.5px] font-extrabold text-[var(--ink)]"
            >
              Descripción
            </Label>
            <Textarea
              id="bio"
              placeholder="Breve descripción de tu experiencia como tutor"
              className="rounded-[var(--radius-md)] border-[1.5px] border-[var(--border)] bg-[#f8fafd] px-4 py-3.5 text-[14.5px] font-bold text-[var(--ink)] placeholder:font-semibold placeholder:text-[var(--gray-400)] focus-visible:border-[var(--blue)] focus-visible:ring-[var(--blue)]/20"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {error && <FormError message={error} />}
          {saved && !error && (
            <p className="text-[13.5px] font-bold text-[var(--green-dark)]">
              Cambios guardados.
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center rounded-[var(--radius-md)] py-3.5"
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
