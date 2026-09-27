import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { format, isPast } from "date-fns";
import { es } from "date-fns/locale";

import { auth } from "@/lib/auth";
import { getSesionesTutor } from "@/lib/reservas";
import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Mis sesiones · Lumina",
};

export default async function MisSesionesPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  // La agenda de sesiones reservadas es exclusiva del tutor dueño de esas
  // franjas; un estudiante tiene su propia agenda en otra pantalla.
  if (session.user.role !== "tutor") {
    redirect("/");
  }

  const sesiones = await getSesionesTutor(session.user.id);

  return (
    <>
      <h1 className="text-[28px] leading-[1.2] font-black tracking-[-0.01em] text-[var(--ink)] md:text-[34px]">
        Mis sesiones
      </h1>
      <p className="mt-1.5 mb-6 text-base font-semibold text-[var(--gray-500)]">
        Sesiones que tus estudiantes han reservado.
      </p>

      {sesiones.length === 0 ? (
        <p className="text-[14.5px] font-bold text-[var(--gray-500)]">
          Aún no tienes sesiones reservadas.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {sesiones.map((sesion) => {
            const completada = isPast(new Date(sesion.fin));
            return (
              <Card key={sesion.reservaId}>
                <CardContent className="flex items-center gap-4">
                  <div className="flex w-14 shrink-0 flex-col items-center rounded-[var(--radius-md)] bg-[var(--blue-lighter)] py-2">
                    <span className="text-lg leading-none font-black text-[var(--ink)]">
                      {format(new Date(sesion.inicio), "d")}
                    </span>
                    <span className="text-[11px] font-bold tracking-wide text-[var(--gray-500)] uppercase">
                      {format(new Date(sesion.inicio), "MMM", { locale: es })}
                    </span>
                  </div>

                  <Avatar className="size-9 shrink-0">
                    <AvatarFallback
                      className={cn(
                        "font-extrabold text-white",
                        getAvatarColor(sesion.estudianteId),
                      )}
                    >
                      {getInitials(sesion.estudianteNombre)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-extrabold text-[var(--ink)]">
                      {sesion.estudianteNombre}
                    </p>
                    <p className="text-[13px] font-bold text-[var(--gray-500)]">
                      {format(new Date(sesion.inicio), "HH:mm")} –{" "}
                      {format(new Date(sesion.fin), "HH:mm")}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "shrink-0 rounded-pill px-3 py-1 text-xs font-extrabold",
                      completada
                        ? "bg-[var(--border)] text-[var(--gray-600)]"
                        : "bg-[var(--green-light)] text-[var(--green-dark)]",
                    )}
                  >
                    {completada ? "Completada" : "Confirmada"}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
