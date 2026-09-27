import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/login-form";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Iniciar sesión · Lumina",
};

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

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </main>

      <SiteFooter />
    </>
  );
}
