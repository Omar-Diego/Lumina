import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Iniciar sesión · Lumina",
};

const FIELD_CLASS =
  "h-auto rounded-[var(--radius-md)] border-[1.5px] border-[var(--border)] bg-[#f8fafd] px-4 py-3.5 text-[14.5px] font-bold text-[var(--ink)] placeholder:font-semibold placeholder:text-[var(--gray-400)] focus-visible:border-[var(--blue)] focus-visible:ring-[var(--blue)]/20";

export default function LoginPage() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-[var(--border)] bg-card px-6 py-4 md:px-12">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-lumina.png"
            alt="Lumina"
            width={303}
            height={101}
            className="h-9 w-auto"
            priority
          />
        </Link>
        <p className="text-[14.5px] font-semibold text-[var(--gray-500)]">
          ¿No tienes cuenta?{" "}
          <Link
            href="/registro"
            className="font-extrabold text-[var(--blue)]"
          >
            Regístrate
          </Link>
        </p>
      </header>

      <main className="mx-auto flex w-full max-w-[480px] flex-1 flex-col items-center px-6 py-16 md:py-24">
        <Image
          src="/lumina-saluda.png"
          alt=""
          width={1216}
          height={1293}
          className="mb-3 h-24 w-auto"
          priority
        />
        <h1 className="text-center text-[34px] leading-[1.2] font-black tracking-[-0.01em] text-[var(--ink)]">
          Bienvenido de nuevo
        </h1>
        <p className="mt-2 mb-7 text-center text-base font-semibold text-[var(--gray-500)]">
          Inicia sesión para buscar tutores o gestionar tus sesiones.
        </p>

        <Card className="w-full">
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
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="text-[13.5px] font-extrabold text-[var(--ink)]"
              >
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={FIELD_CLASS}
              />
            </div>

            <Link
              href="#"
              className="-mt-2 self-end text-[13px] font-bold text-[var(--blue)]"
            >
              ¿Olvidaste tu contraseña?
            </Link>

            <Button className="w-full justify-center rounded-[var(--radius-md)] py-3.5">
              Iniciar sesión
            </Button>

            <div className="flex items-center gap-2.5">
              <span className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-[13px] font-bold text-[var(--gray-500)]">
                o
              </span>
              <span className="h-px flex-1 bg-[var(--border)]" />
            </div>

            <Button
              variant="outline"
              className="w-full justify-center rounded-[var(--radius-md)] py-3.5"
            >
              Acceder como tutor
            </Button>
          </CardContent>
        </Card>
      </main>

      <SiteFooter />
    </>
  );
}
