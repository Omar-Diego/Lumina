"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import { getSafeCallbackUrl } from "@/lib/callback-url";

const FIELD_CLASS =
  "h-12 rounded-[var(--radius-md)] border-[var(--admin-control-border)] bg-[var(--admin-bg)] px-4 font-semibold text-[var(--admin-text)] placeholder:text-[var(--admin-subtle)] focus-visible:border-[var(--blue)] focus-visible:ring-[var(--blue)]/30";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: signInError } = await authClient.signIn.email({
        email,
        password,
      });

      if (signInError || !data) {
        setError(signInError?.message ?? "No se pudo iniciar sesión.");
        return;
      }

      if (data.user.role !== "admin") {
        await authClient.signOut();
        setError("Esta cuenta no tiene acceso al panel de administración.");
        return;
      }

      router.replace(callbackUrl ?? "/admin/verificacion");
      router.refresh();
    } catch {
      setError("No se pudo iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-[var(--admin-border)] bg-[var(--admin-card-bg)] py-6 text-left shadow-none">
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="admin-email" className="font-bold text-[var(--admin-text)]">
              Correo administrativo
            </Label>
            <Input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="admin@lumina.app"
              className={FIELD_CLASS}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password" className="font-bold text-[var(--admin-text)]">
              Contraseña
            </Label>
            <PasswordInput
              id="admin-password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={FIELD_CLASS}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="[&_[data-slot=alert]]:border-[var(--admin-control-border)] [&_[data-slot=alert]]:bg-[var(--admin-bg)] [&_[data-slot=alert]]:text-[var(--admin-danger)] [&_[data-slot=alert-description]]:!text-[var(--admin-danger)]"
          >
            {error ? (
              <FormError message={error} />
            ) : null}
          </div>

          <Button
            type="submit"
            className="w-full rounded-[var(--radius-md)] bg-[var(--admin-action-bg)] text-[var(--admin-action-fg)] hover:bg-[var(--green-dark)]"
            disabled={loading}
          >
            {loading ? "Entrando al panel..." : "Entrar al panel"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
