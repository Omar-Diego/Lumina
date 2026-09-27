import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, Star } from "lucide-react";

import { auth } from "@/lib/auth";
import { getFranjasDisponibles, getTutorPerfil, type Franja } from "@/lib/tutores";
import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { FranjaPicker } from "@/components/franja-picker";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function FichaTutorPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ franjaTomada?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }
  if (session.user.role !== "estudiante") {
    redirect("/");
  }

  const { id } = await params;
  const { franjaTomada } = await searchParams;

  const tutor = await getTutorPerfil(id);
  if (!tutor) {
    notFound();
  }

  const franjas = await getFranjasDisponibles(id);
  const franjasPorDia = agruparPorDia(franjas);

  return (
    <>
      <Link
        href="/tutores"
        className="mb-4 flex w-fit items-center gap-1.5 text-[13px] font-bold text-[var(--blue)]"
      >
        <ArrowLeft className="size-4" />
        Volver a resultados
      </Link>

      <Card className="mb-6">
        <CardContent className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <Avatar className="size-20 shrink-0 text-2xl sm:size-23">
            <AvatarFallback
              className={cn(
                "text-2xl font-extrabold text-white",
                getAvatarColor(tutor.id),
              )}
            >
              {getInitials(tutor.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl leading-tight font-black text-[var(--ink)]">
              {tutor.name}
            </h1>

            <span className="my-2 flex w-fit items-center gap-1.5 text-[13px] font-bold text-[var(--gray-500)]">
              <Star className="size-4 text-[var(--gray-400)]" />
              Aún sin reseñas
            </span>

            {tutor.escuela && (
              <p className="mb-2 text-[13px] font-bold text-[var(--gray-500)]">
                {tutor.escuela}
              </p>
            )}

            <div className="mb-3 flex flex-wrap gap-1.5">
              {tutor.subjects.map((subject) => (
                <Badge
                  key={subject}
                  variant="secondary"
                  className="h-auto rounded-pill px-3 py-1 text-[12.5px] font-bold"
                >
                  {subject}
                </Badge>
              ))}
            </div>

            {tutor.bio && (
              <p className="text-[14.5px] leading-relaxed font-semibold text-[var(--gray-500)]">
                {tutor.bio}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {franjaTomada === "1" && (
        <div className="mb-5 rounded-[var(--radius-md)] border-[1.5px] border-[var(--red-light)] bg-[var(--red-light)] px-4 py-3 text-[13.5px] font-bold text-[var(--red)]">
          Esa franja ya fue reservada por otro estudiante. Elige otro horario
          disponible.
        </div>
      )}

      <h2 className="mb-4 text-lg font-extrabold text-[var(--ink)]">
        Franjas horarias disponibles
      </h2>

      {franjasPorDia.length === 0 ? (
        <p className="text-[14.5px] font-bold text-[var(--gray-500)]">
          Este tutor aún no tiene horarios publicados.
        </p>
      ) : (
        <FranjaPicker tutorId={id} franjasPorDia={franjasPorDia} />
      )}
    </>
  );
}

function agruparPorDia(franjas: Franja[]) {
  const grupos = new Map<string, Franja[]>();
  for (const franja of franjas) {
    const dia = format(new Date(franja.inicio), "EEEE d 'de' MMMM", { locale: es });
    const diaCapitalizado = dia.charAt(0).toUpperCase() + dia.slice(1);
    if (!grupos.has(diaCapitalizado)) grupos.set(diaCapitalizado, []);
    grupos.get(diaCapitalizado)!.push(franja);
  }
  return Array.from(grupos, ([dia, franjas]) => ({ dia, franjas }));
}
