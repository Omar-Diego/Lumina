import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Crear cuenta · Lumina",
};

const FIELD_CLASS =
  "h-auto rounded-[var(--radius-md)] border-[1.5px] border-[var(--border)] bg-[#f8fafd] px-4 py-3.5 text-[14.5px] font-bold text-[var(--ink)] placeholder:font-semibold placeholder:text-[var(--gray-400)] focus-visible:border-[var(--blue)] focus-visible:ring-[var(--blue)]/20";

export default function RegistroPage() {
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
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-extrabold text-[var(--blue)]">
            Inicia sesión
          </Link>
        </p>
      </header>

      <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center px-6 py-14 md:py-20">
        <h1 className="text-center text-[34px] leading-[1.2] font-black tracking-[-0.01em] text-[var(--ink)]">
          Crea tu cuenta en Lumina
        </h1>
        <p className="mt-2 mb-6 text-center text-base font-semibold text-[var(--gray-500)]">
          Elige cómo quieres usar la plataforma.
        </p>

        <div className="mb-6 flex gap-1.5 rounded-pill border-[1.5px] border-[var(--border)] bg-card p-[5px]">
          <Button
            size="sm"
            className="rounded-pill px-5"
            aria-pressed="true"
          >
            Soy estudiante
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-pill px-5 font-extrabold text-[var(--gray-500)] hover:bg-transparent"
            aria-pressed="false"
          >
            Soy tutor
          </Button>
        </div>

        <Card className="w-full">
          <CardContent className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <Label
                  htmlFor="nombre"
                  className="text-[13.5px] font-extrabold text-[var(--ink)]"
                >
                  Nombre
                </Label>
                <Input id="nombre" placeholder="Ana" className={FIELD_CLASS} />
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
                placeholder="Mínimo 8 caracteres"
                className={FIELD_CLASS}
              />
            </div>

            <Button className="w-full justify-center rounded-[var(--radius-md)] py-3.5">
              Crear cuenta
            </Button>

            <p className="text-center text-[13px] font-bold text-[var(--gray-500)]">
              Al registrarte aceptas los{" "}
              <Link href="/legal" className="text-[var(--blue-dark)]">
                términos y el aviso de privacidad
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </main>

      <SiteFooter />
    </>
  );
}
