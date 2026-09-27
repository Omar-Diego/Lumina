import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getMateriasResumen } from "@/lib/tutores";
import { MateriasGrid } from "@/components/materias-grid";

export const metadata = {
  title: "Materias · Lumina",
};

export default async function MateriasPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  // Explorar materias para encontrar tutor es un flujo de estudiante; un
  // tutor no tiene nada que buscar acá.
  if (session.user.role !== "estudiante") {
    redirect("/");
  }

  const materias = await getMateriasResumen();

  return (
    <>
      <h1 className="text-[28px] leading-[1.2] font-black tracking-[-0.01em] text-[var(--ink)] md:text-[34px]">
        Materias
      </h1>
      <p className="mt-1.5 text-base font-semibold text-[var(--gray-500)]">
        Explora las materias disponibles y encuentra apoyo académico
      </p>

      {materias.length === 0 ? (
        <p className="mt-6 text-[14.5px] font-bold text-[var(--gray-500)]">
          Aún no hay materias publicadas por tutores.
        </p>
      ) : (
        <MateriasGrid materias={materias} />
      )}
    </>
  );
}
