import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { format, isToday, isTomorrow } from "date-fns";
import { es } from "date-fns/locale";
import { Heart, Star } from "lucide-react";

import { auth } from "@/lib/auth";
import { getMateriasDisponibles, getTutores, type TutorListado } from "@/lib/tutores";
import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import {
  TutorEmptyState,
  TutorMateriaFilter,
  TutorSearchBar,
  TutorSort,
} from "@/components/tutor-filters";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Tutores · Lumina",
};

export default async function TutoresPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; materia?: string; sort?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  // Este listado es una herramienta de búsqueda para estudiantes; un tutor
  // no tiene tutores que buscar, así que no debe poder verla.
  if (session.user.role !== "estudiante") {
    redirect("/");
  }

  const params = await searchParams;
  const sort = params.sort === "recientes" ? "recientes" : "nombre";

  const [tutores, materias] = await Promise.all([
    getTutores({ q: params.q, materia: params.materia, sort }),
    getMateriasDisponibles(),
  ]);

  return (
    <>
      <h1 className="text-[28px] leading-[1.2] font-black tracking-[-0.01em] text-[var(--ink)] md:text-[34px]">
        Tutores
      </h1>
      <p className="mt-1.5 text-base font-semibold text-[var(--gray-500)]">
        Encuentra el tutor ideal para ti
      </p>

      <TutorSearchBar />
      <TutorMateriaFilter materias={materias} />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[15px] font-extrabold text-[var(--ink)]">
          {tutores.length} {tutores.length === 1 ? "tutor encontrado" : "tutores encontrados"}
        </span>
        <TutorSort />
      </div>

      {tutores.length === 0 ? (
        <TutorEmptyState
          materia={params.materia}
          otrasMaterias={materias.filter((m) => m !== params.materia).slice(0, 3)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {tutores.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </>
  );
}

function formatFranja(inicio: string) {
  const d = new Date(inicio);
  if (isToday(d)) return `Hoy ${format(d, "HH:mm")}`;
  if (isTomorrow(d)) return `Mañana ${format(d, "HH:mm")}`;
  return format(d, "d MMM, HH:mm", { locale: es });
}

function TutorCard({ tutor }: { tutor: TutorListado }) {
  return (
    <Card>
      <CardContent className="flex gap-4">
        <Avatar className="size-16 shrink-0">
          <AvatarFallback
            className={cn(
              "text-xl font-extrabold text-white",
              getAvatarColor(tutor.id),
            )}
          >
            {getInitials(tutor.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-lg font-extrabold text-[var(--ink)]">
              {tutor.name}
            </h3>
            <Heart className="size-4 shrink-0 text-[var(--gray-400)]" />
          </div>

          <span className="my-1.5 flex w-fit items-center gap-1.5 text-[13px] font-bold text-[var(--gray-500)]">
            <Star className="size-4 text-[var(--gray-400)]" />
            Aún sin reseñas
          </span>

          {tutor.escuela && (
            <p className="mb-1.5 text-[13px] font-bold text-[var(--gray-500)]">
              {tutor.escuela}
            </p>
          )}

          {tutor.bio && (
            <p className="mb-2.5 line-clamp-2 text-[13.5px] leading-relaxed font-semibold text-[var(--gray-500)]">
              {tutor.bio}
            </p>
          )}

          <div className="mb-2.5 flex flex-wrap gap-1.5">
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

          <div className="mt-auto flex flex-wrap items-center gap-1.5">
            {tutor.proximasFranjas.length > 0 ? (
              tutor.proximasFranjas.map((franja) => (
                <span
                  key={franja.inicio}
                  className="rounded-pill border-[1.5px] border-[var(--border)] px-3 py-1.5 text-xs font-bold text-[var(--gray-600)]"
                >
                  {formatFranja(franja.inicio)}
                </span>
              ))
            ) : (
              <span className="text-[13px] font-bold text-[var(--gray-500)]">
                Aún sin horarios publicados
              </span>
            )}
          </div>

          <Button className="mt-3 w-full justify-center rounded-[var(--radius-md)] px-4 py-3">
            Ver perfil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
