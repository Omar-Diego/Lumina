import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { CompletarPerfilForm } from "@/components/completar-perfil-form";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Completa tu perfil · Lumina",
};

export default async function CompletarPerfilPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

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
      </header>

      <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center px-6 py-14 md:py-20">
        <h1 className="text-center text-[34px] leading-[1.2] font-black tracking-[-0.01em] text-[var(--ink)]">
          Completa tu perfil
        </h1>
        <p className="mt-2 mb-6 text-center text-base font-semibold text-[var(--gray-500)]">
          Nos faltan un par de datos para terminar de configurar tu cuenta,{" "}
          {user.name}.
        </p>

        <CompletarPerfilForm
          initialRole={user.role}
          initialEscuela={user.escuela ?? ""}
          initialSubjects={user.subjects ?? []}
          initialBio={user.bio ?? ""}
        />
      </main>

      <SiteFooter />
    </>
  );
}
