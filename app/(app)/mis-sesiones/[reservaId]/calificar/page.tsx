import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { auth } from "@/lib/auth";
import { getReservaParaCalificar } from "@/lib/reservas";
import { crearResena, ResenaExistenteError } from "@/lib/resenas";
import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { CalificarForm } from "@/components/calificar-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Calificar sesión · Lumina",
};

export default async function CalificarSesionPage({
  params,
}: {
  params: Promise<{ reservaId: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }
  if (session.user.role !== "estudiante") {
    redirect("/");
  }

  const { reservaId } = await params;
  const estudianteId = session.user.id;

  const reserva = await getReservaParaCalificar(reservaId, estudianteId);
  if (!reserva) {
    redirect("/mis-sesiones");
  }

  async function calificar(formData: FormData) {
    "use server";
    const calificacion = Number(formData.get("calificacion"));
    const comentario = ((formData.get("comentario") as string) || "").trim() || null;

    if (!Number.isInteger(calificacion) || calificacion < 1 || calificacion > 5) {
      redirect(`/mis-sesiones/${reservaId}/calificar`);
    }

    try {
      await crearResena(reservaId, estudianteId, calificacion, comentario);
    } catch (err) {
      if (err instanceof ResenaExistenteError) {
        redirect("/mis-sesiones");
      }
      throw err;
    }

    redirect("/mis-sesiones");
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-[460px] text-center">
        <CardContent>
          <Avatar className="mx-auto mb-3.5 size-16 text-xl">
            <AvatarFallback className={cn("font-extrabold text-white", getAvatarColor(reserva.tutorId))}>
              {getInitials(reserva.tutorNombre)}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-xl leading-tight font-black text-[var(--ink)]">
            ¿Cómo estuvo tu sesión con {reserva.tutorNombre}?
          </h1>
          <p className="mt-2 mb-6 text-[14.5px] font-semibold text-[var(--gray-500)]">
            {capitalizar(format(new Date(reserva.inicio), "EEEE d 'de' MMMM", { locale: es }))}
          </p>

          <CalificarForm action={calificar} />
        </CardContent>
      </Card>
    </div>
  );
}

function capitalizar(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
