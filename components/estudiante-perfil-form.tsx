"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { FormError } from "@/components/form-error";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FIELD_CLASS =
  "h-auto rounded-[var(--radius-md)] border-[1.5px] border-[var(--border)] bg-[#f8fafd] px-4 py-3.5 text-[14.5px] font-bold text-[var(--ink)] placeholder:font-semibold placeholder:text-[var(--gray-400)] focus-visible:border-[var(--blue)] focus-visible:ring-[var(--blue)]/20";

export function EstudiantePerfilForm({
  userId,
  initialName,
  initialImage,
  email,
  initialEscuela,
}: {
  userId: string;
  initialName: string;
  initialImage?: string | null;
  email: string;
  initialEscuela: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [escuela, setEscuela] = useState(initialEscuela);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setLoading(true);

    const { error: updateError } = await authClient.updateUser({
      name,
      escuela: escuela || undefined,
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
          <Avatar className="size-19 text-2xl">
            {initialImage ? <AvatarImage src={initialImage} alt={initialName} /> : null}
            <AvatarFallback className={cn("font-extrabold text-white", getAvatarColor(userId))}>
              {getInitials(name || initialName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-[13.5px] font-extrabold text-[var(--ink)]">
              Nombre completo
            </Label>
            <Input
              id="name"
              className={FIELD_CLASS}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[13.5px] font-extrabold text-[var(--ink)]">
              Correo electrónico
            </Label>
            <div className={cn(FIELD_CLASS, "text-[var(--gray-500)]")}>{email}</div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="escuela" className="text-[13.5px] font-extrabold text-[var(--ink)]">
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

          {error && <FormError message={error} />}
          {saved && !error && (
            <p className="text-[13.5px] font-bold text-[var(--green-dark)]">Cambios guardados.</p>
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
