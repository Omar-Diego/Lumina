import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CircleCheck } from "lucide-react";

import { auth } from "@/lib/auth";
import { TutorPerfilForm } from "@/components/tutor-perfil-form";
import { EstudiantePerfilForm } from "@/components/estudiante-perfil-form";

export const metadata = {
  title: "Mi perfil · Lumina",
};

export default async function MiPerfilPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  if (user.role === "estudiante") {
    return (
      <>
        <h1 className="text-[28px] leading-[1.2] font-black tracking-[-0.01em] text-[var(--ink)] md:text-[34px]">
          Mi perfil
        </h1>
        <p className="mt-1.5 mb-6 text-base font-semibold text-[var(--gray-500)]">
          Mantén tus datos actualizados.
        </p>

        <EstudiantePerfilForm
          userId={user.id}
          initialName={user.name}
          initialImage={user.image}
          email={user.email}
          initialEscuela={user.escuela ?? ""}
        />
      </>
    );
  }

  return (
    <>
      <h1 className="text-[28px] leading-[1.2] font-black tracking-[-0.01em] text-[var(--ink)] md:text-[34px]">
        Mi perfil de tutor
      </h1>
      <span className="mt-3 mb-6 inline-flex w-fit items-center gap-1.5 rounded-pill bg-[var(--green-light)] px-3 py-1.5 text-[13px] font-extrabold text-[var(--green-dark)]">
        <CircleCheck className="size-4" />
        Visible en la búsqueda de tutores
      </span>

      <TutorPerfilForm
        userId={user.id}
        name={user.name}
        image={user.image}
        initialEscuela={user.escuela ?? ""}
        initialSubjects={user.subjects ?? []}
        initialBio={user.bio ?? ""}
      />
    </>
  );
}
