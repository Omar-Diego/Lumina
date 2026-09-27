"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { getSafeCallbackUrl } from "@/lib/callback-url";
import { getDashboardPath } from "@/lib/dashboard-path";
import { FormError } from "@/components/form-error";
import { SocialAuthButtons } from "@/components/social-auth-buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

const FIELD_CLASS =
  "h-auto rounded-[var(--radius-md)] border-[1.5px] border-[var(--border)] bg-[#f8fafd] px-4 py-3.5 text-[14.5px] font-bold text-[var(--ink)] placeholder:font-semibold placeholder:text-[var(--gray-400)] focus-visible:border-[var(--blue)] focus-visible:ring-[var(--blue)]/20";

const SOCIAL_ERROR_MESSAGES: Record<string, string> = {
  account_not_linked:
    "Ya existe una cuenta con este correo. Inicia sesión con tu contraseña para continuar.",
  access_denied: "Cancelaste el inicio de sesión con ese proveedor.",
};
const SOCIAL_ERROR_FALLBACK = "No se pudo completar el inicio de sesión.";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(() => {
    const code = searchParams.get("error");
    if (!code) return null;
    // Nunca mostramos error_description: viene tal cual del proveedor/librería,
    // casi siempre en inglés. Solo mapeamos códigos conocidos a español.
    return SOCIAL_ERROR_MESSAGES[code] ?? SOCIAL_ERROR_FALLBACK;
  });
  const [loading, setLoading] = useState(false);
  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message ?? "No se pudo iniciar sesión.");
      return;
    }

    router.push(callbackUrl ?? getDashboardPath(data.user.role));
    router.refresh();
  }

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-5">
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
              htmlFor="password"
              className="text-[13.5px] font-extrabold text-[var(--ink)]"
            >
              Contraseña
            </Label>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              className={FIELD_CLASS}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <FormError message={error} />}

          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center rounded-[var(--radius-md)] py-3.5"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>

          <div className="flex items-center gap-2.5">
            <span className="h-px flex-1 bg-[var(--border)]" />
            <span className="text-[13px] font-bold text-[var(--gray-500)]">
              o
            </span>
            <span className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <SocialAuthButtons callbackUrl={callbackUrl} />
        </CardContent>
      </form>
    </Card>
  );
}
