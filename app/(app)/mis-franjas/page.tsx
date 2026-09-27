import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { auth } from "@/lib/auth";
import {
  crearFranja,
  getFranjasTutor,
  FranjaSolapadaError,
  type FranjaTutor,
} from "@/lib/tutores";
import { FranjaForm } from "@/components/franja-form";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Mis franjas horarias · Lumina",
};

const ERROR_MESSAGES: Record<string, string> = {
  solapada: "Esa franja se solapa con un horario que ya publicaste.",
  horario: "La hora de fin debe ser posterior a la hora de inicio.",
};

export default async function MisFranjasPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  // Publicar franjas es una acción exclusiva del tutor; un estudiante no
  // tiene horarios propios que gestionar.
  if (session.user.role !== "tutor") {
    redirect("/");
  }

  const tutorId = session.user.id;
  const { error } = await searchParams;
  const franjas = await getFranjasTutor(tutorId);
  const franjasPorDia = agruparPorDia(franjas);

  async function publicarFranja(formData: FormData) {
    "use server";
    const fecha = formData.get("fecha") as string;
    const horaInicio = formData.get("horaInicio") as string;
    const horaFin = formData.get("horaFin") as string;

    const inicio = new Date(`${fecha}T${horaInicio}`);
    const fin = new Date(`${fecha}T${horaFin}`);

    if (!fecha || !horaInicio || !horaFin || fin <= inicio) {
      redirect("/mis-franjas?error=horario");
    }

    try {
      await crearFranja(tutorId, inicio, fin);
    } catch (err) {
      if (err instanceof FranjaSolapadaError) {
        redirect("/mis-franjas?error=solapada");
      }
      throw err;
    }

    redirect("/mis-franjas");
  }

  return (
    <>
      <h1 className="text-[28px] leading-[1.2] font-black tracking-[-0.01em] text-[var(--ink)] md:text-[34px]">
        Mis franjas horarias
      </h1>
      <p className="mt-1.5 mb-6 text-base font-semibold text-[var(--gray-500)]">
        Publica horarios futuros. El sistema evita franjas que se solapen con
        otras ya publicadas.
      </p>

      {error && ERROR_MESSAGES[error] && (
        <div className="mb-5 rounded-[var(--radius-md)] border-[1.5px] border-[var(--red-light)] bg-[var(--red-light)] px-4 py-3 text-[13.5px] font-bold text-[var(--red)]">
          {ERROR_MESSAGES[error]}
        </div>
      )}

      <Card className="mb-8">
        <CardContent>
          <FranjaForm action={publicarFranja} />
        </CardContent>
      </Card>

      <h2 className="mb-4 text-lg font-extrabold text-[var(--ink)]">
        Tus franjas publicadas
      </h2>

      {franjasPorDia.length === 0 ? (
        <p className="text-[14.5px] font-bold text-[var(--gray-500)]">
          Aún no has publicado horarios.
        </p>
      ) : (
        <div className="flex flex-wrap gap-8">
          {franjasPorDia.map(({ dia, franjas }) => (
            <div key={dia}>
              <p className="mb-2.5 text-[13px] font-bold tracking-wide text-[var(--gray-500)] uppercase">
                {dia}
              </p>
              <div className="flex flex-wrap gap-2">
                {franjas.map((franja) => (
                  <span
                    key={franja.id}
                    className="inline-flex items-center gap-2 rounded-pill border-[1.5px] border-[var(--border)] bg-card px-4 py-2.5 text-[13.5px] font-bold text-[var(--gray-600)]"
                  >
                    {format(new Date(franja.inicio), "HH:mm")} –{" "}
                    {format(new Date(franja.fin), "HH:mm")}
                    {franja.estado === "ocupada" && (
                      <span className="text-[var(--blue)]">· Reservada</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function agruparPorDia(franjas: FranjaTutor[]) {
  const grupos = new Map<string, FranjaTutor[]>();
  for (const franja of franjas) {
    const dia = format(new Date(franja.inicio), "EEEE d 'de' MMMM", { locale: es });
    const diaCapitalizado = dia.charAt(0).toUpperCase() + dia.slice(1);
    if (!grupos.has(diaCapitalizado)) grupos.set(diaCapitalizado, []);
    grupos.get(diaCapitalizado)!.push(franja);
  }
  return Array.from(grupos, ([dia, franjas]) => ({ dia, franjas }));
}
