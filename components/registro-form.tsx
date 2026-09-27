"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Wand2 } from "lucide-react";

import { generateSecurePassword } from "@/lib/generate-password";
import { authClient } from "@/lib/auth-client";
import { FormError } from "@/components/form-error";
import { SocialAuthButtons } from "@/components/social-auth-buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Textarea } from "@/components/ui/textarea";

const FIELD_CLASS =
  "h-auto rounded-[var(--radius-md)] border-[1.5px] border-[var(--border)] bg-[#f8fafd] px-4 py-3.5 text-[14.5px] font-bold text-[var(--ink)] placeholder:font-semibold placeholder:text-[var(--gray-400)] focus-visible:border-[var(--blue)] focus-visible:ring-[var(--blue)]/20";

type Role = "estudiante" | "tutor";

export function RegistroForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("estudiante");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [escuela, setEscuela] = useState("");
  const [materias, setMaterias] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signUpError } = await authClient.signUp.email({
      email,
      password,
      name: `${nombre} ${apellido}`.trim(),
      role,
      escuela: escuela || undefined,
      ...(role === "tutor"
        ? {
            subjects: materias
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
            bio: bio || undefined,
          }
        : {}),
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message ?? "No se pudo crear la cuenta.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <>
      <div className="mb-6 flex gap-1.5 rounded-pill border-[1.5px] border-[var(--border)] bg-card p-[5px]">
        <Button
          type="button"
          size="sm"
          variant={role === "estudiante" ? "default" : "ghost"}
          className={
            role === "estudiante"
              ? "rounded-pill px-5 font-extrabold"
              : "rounded-pill px-5 font-extrabold text-[var(--gray-500)]"
          }
          aria-pressed={role === "estudiante"}
          onClick={() => setRole("estudiante")}
        >
          Soy estudiante
        </Button>
        <Button
          type="button"
          size="sm"
          variant={role === "tutor" ? "default" : "ghost"}
          className={
            role === "tutor"
              ? "rounded-pill px-5 font-extrabold"
              : "rounded-pill px-5 font-extrabold text-[var(--gray-500)]"
          }
          aria-pressed={role === "tutor"}
          onClick={() => setRole("tutor")}
        >
          Soy tutor
        </Button>
      </div>

      <Card className="w-full">
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <Label
                  htmlFor="nombre"
                  className="text-[13.5px] font-extrabold text-[var(--ink)]"
                >
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  placeholder="Ana"
                  className={FIELD_CLASS}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <Label
                  htmlFor="apellido"
                  className="text-[13.5px] font-extrabold text-[var(--ink)]"
                >
                  Apellido
                </Label>
                <Input
                  id="apellido"
                  placeholder="García"
                  className={FIELD_CLASS}
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-[13.5px] font-extrabold text-[var(--ink)]"
              >
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@correo.com"
                className={FIELD_CLASS}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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

            {role === "tutor" && (
              <>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="materias"
                    className="text-[13.5px] font-extrabold text-[var(--ink)]"
                  >
                    Materias que enseñas
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
                    Cuéntanos sobre ti
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Breve descripción de tu experiencia como tutor"
                    className="rounded-[var(--radius-md)] border-[1.5px] border-[var(--border)] bg-[#f8fafd] px-4 py-3.5 text-[14.5px] font-bold text-[var(--ink)] placeholder:font-semibold placeholder:text-[var(--gray-400)] focus-visible:border-[var(--blue)] focus-visible:ring-[var(--blue)]/20"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-[13.5px] font-extrabold text-[var(--ink)]"
                >
                  Contraseña
                </Label>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-[12.5px] font-extrabold text-[var(--blue)]"
                  onClick={() => {
                    setPassword(generateSecurePassword());
                    setPasswordVisible(true);
                  }}
                >
                  <Wand2 className="size-3.5" />
                  Generar contraseña segura
                </Button>
              </div>
              <PasswordInput
                id="password"
                placeholder="Mínimo 12 caracteres"
                className={FIELD_CLASS}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                visible={passwordVisible}
                onVisibleChange={setPasswordVisible}
                minLength={12}
                required
              />
            </div>

            {error && <FormError message={error} />}

            <Button
              type="submit"
              disabled={loading}
              className="w-full justify-center rounded-[var(--radius-md)] py-3.5"
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>

            <p className="text-center text-[13px] font-bold text-[var(--gray-500)]">
              Al registrarte aceptas los{" "}
              <Link href="/legal" className="text-[var(--blue-dark)]">
                términos y el aviso de privacidad
              </Link>
              .
            </p>

            <div className="flex items-center gap-2.5">
              <span className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-[13px] font-bold text-[var(--gray-500)]">
                o
              </span>
              <span className="h-px flex-1 bg-[var(--border)]" />
            </div>

            <SocialAuthButtons />
          </CardContent>
        </form>
      </Card>
    </>
  );
}
