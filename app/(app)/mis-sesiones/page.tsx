import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { addDays, format, isPast } from "date-fns";
import { es } from "date-fns/locale";
import { Star } from "lucide-react";

import { auth } from "@/lib/auth";
import { getSesionesEstudiante, getSesionesTutor, type SesionEstudiante } from "@/lib/reservas";
import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { SesionesCalendar } from "@/components/sesiones-calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Mis sesiones · Lumina",
};

export default async function MisSesionesPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  if (session.user.role === "estudiante") {
    return <AgendaEstudiante estudianteId={session.user.id} />;
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

async function AgendaEstudiante({ estudianteId }: { estudianteId: string }) {
  const sesiones = await getSesionesEstudiante(estudianteId);
  const ahora = new Date();

  const proximas = sesiones.filter((s) => new Date(s.fin) >= ahora);
  const completadas = [...sesiones.filter((s) => new Date(s.fin) < ahora)].reverse();
  const proximaSesion = proximas[0] ?? null;
  const limiteSemana = addDays(ahora, 7);
  const estaSemana = proximas.filter((s) => new Date(s.inicio) <= limiteSemana);

  return (
    <>
      <h1 className="text-[28px] leading-[1.2] font-black tracking-[-0.01em] text-[var(--ink)] md:text-[34px]">
        Agenda
      </h1>
      <p className="mt-1.5 mb-6 text-base font-semibold text-[var(--gray-500)]">
        Organiza tus próximas tutorías y revisa tu calendario
      </p>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Próxima sesión"
          value={
            proximaSesion
              ? capitalizar(format(new Date(proximaSesion.inicio), "EEE d 'de' MMM · HH:mm", { locale: es }))
              : "Sin sesiones agendadas"
          }
        />
        <StatCard label="Sesiones esta semana" value={`${estaSemana.length}`} />
        <StatCard label="Completadas" value={`${completadas.length}`} />
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="flex-[1.3] flex flex-col gap-5">
          <Card>
            <CardContent>
              <SesionesCalendar
                confirmadas={proximas.map((s) => s.inicio)}
                completadas={completadas.map((s) => s.inicio)}
              />
              <div className="mt-3 flex flex-wrap gap-4 border-t border-[var(--border)] pt-4">
                <Leyenda color="bg-[var(--blue)]" label="Sesión confirmada" />
                <Leyenda color="bg-[var(--green)]" label="Sesión completada" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="mb-3.5 text-lg font-extrabold text-[var(--ink)]">
                Sesiones recientes
              </h3>
              {completadas.length === 0 ? (
                <p className="text-[14.5px] font-bold text-[var(--gray-500)]">
                  Aún no has completado ninguna sesión.
                </p>
              ) : (
                <div className="flex flex-col">
                  {completadas.map((sesion) => (
                    <SesionRecienteRow key={sesion.reservaId} sesion={sesion} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <Card>
            <CardContent>
              <h3 className="mb-3.5 text-lg font-extrabold text-[var(--ink)]">
                Próximas sesiones
              </h3>
              {proximas.length === 0 ? (
                <p className="text-[14.5px] font-bold text-[var(--gray-500)]">
                  Aún no tienes sesiones agendadas.{" "}
                  <Link href="/tutores" className="text-[var(--blue)]">
                    Busca un tutor
                  </Link>
                  .
                </p>
              ) : (
                <div className="flex flex-col">
                  {proximas.map((sesion) => (
                    <ProximaSesionRow key={sesion.reservaId} sesion={sesion} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="mb-3.5 text-lg font-extrabold text-[var(--ink)]">
                Recordatorios
              </h3>
              <div className="flex flex-col gap-4">
                <Recordatorio
                  titulo="Lleva tu material"
                  descripcion="Cuaderno, apuntes y calculadora si es necesario."
                />
                <Recordatorio
                  titulo="Llega 10 minutos antes"
                  descripcion="Para registrarte en el campus y aprovechar la sesión."
                />
                <Recordatorio
                  titulo="Revisa la ubicación"
                  descripcion="Confirma el campus y el salón de tu tutoría."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-card p-4">
      <p className="text-[13px] font-bold text-[var(--gray-500)]">{label}</p>
      <p className="mt-1 text-[15px] font-extrabold text-[var(--ink)]">{value}</p>
    </div>
  );
}

function Leyenda({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[12.5px] font-bold text-[var(--gray-500)]">
      <span className={cn("size-2 rounded-full", color)} />
      {label}
    </span>
  );
}

function Recordatorio({ titulo, descripcion }: { titulo: string; descripcion: string }) {
  return (
    <div>
      <p className="text-[13.5px] font-extrabold text-[var(--ink)]">{titulo}</p>
      <p className="text-[13px] font-semibold text-[var(--gray-500)]">{descripcion}</p>
    </div>
  );
}

function ProximaSesionRow({ sesion }: { sesion: SesionEstudiante }) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--border)] py-3 last:border-b-0 last:pb-0">
      <div className="flex w-12 shrink-0 flex-col items-center rounded-[var(--radius-md)] bg-[var(--blue-lighter)] py-1.5">
        <span className="text-base leading-none font-black text-[var(--ink)]">
          {format(new Date(sesion.inicio), "d")}
        </span>
        <span className="text-[10px] font-bold tracking-wide text-[var(--gray-500)] uppercase">
          {format(new Date(sesion.inicio), "MMM", { locale: es })}
        </span>
      </div>
      <Avatar className="size-9 shrink-0">
        <AvatarFallback className={cn("font-extrabold text-white", getAvatarColor(sesion.tutorId))}>
          {getInitials(sesion.tutorNombre)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-extrabold text-[var(--ink)]">{sesion.tutorNombre}</p>
        <p className="text-[12.5px] font-bold text-[var(--gray-500)]">
          {format(new Date(sesion.inicio), "HH:mm")} – {format(new Date(sesion.fin), "HH:mm")}
        </p>
      </div>
      <span className="shrink-0 rounded-pill bg-[var(--green-light)] px-3 py-1 text-xs font-extrabold text-[var(--green-dark)]">
        Confirmada
      </span>
    </div>
  );
}

function SesionRecienteRow({ sesion }: { sesion: SesionEstudiante }) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--border)] py-3 last:border-b-0 last:pb-0">
      <div className="flex w-12 shrink-0 flex-col items-center rounded-[var(--radius-md)] bg-[var(--blue-lighter)] py-1.5">
        <span className="text-base leading-none font-black text-[var(--ink)]">
          {format(new Date(sesion.inicio), "d")}
        </span>
        <span className="text-[10px] font-bold tracking-wide text-[var(--gray-500)] uppercase">
          {format(new Date(sesion.inicio), "MMM", { locale: es })}
        </span>
      </div>
      <Avatar className="size-9 shrink-0">
        <AvatarFallback className={cn("font-extrabold text-white", getAvatarColor(sesion.tutorId))}>
          {getInitials(sesion.tutorNombre)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-extrabold text-[var(--ink)]">{sesion.tutorNombre}</p>
        <p className="text-[12.5px] font-bold text-[var(--gray-500)]">
          {format(new Date(sesion.inicio), "HH:mm")} – {format(new Date(sesion.fin), "HH:mm")}
        </p>
      </div>
      {sesion.calificacion ? (
        <span className="flex shrink-0 items-center gap-1 text-[13.5px] font-extrabold text-[var(--ink)]">
          <Star className="size-4 fill-[var(--yellow)] text-[var(--yellow)]" />
          {sesion.calificacion}
        </span>
      ) : (
        <Button
          render={<Link href={`/mis-sesiones/${sesion.reservaId}/calificar`} />}
          variant="outline"
          size="sm"
          className="shrink-0"
        >
          Calificar
        </Button>
      )}
    </div>
  );
}

function capitalizar(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
