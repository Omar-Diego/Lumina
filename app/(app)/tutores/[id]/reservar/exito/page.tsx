import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { auth } from "@/lib/auth";
import { getReservaConfirmada } from "@/lib/reservas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function ReservaExitoPage({
  searchParams,
}: {
  searchParams: Promise<{ reserva?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }
  if (session.user.role !== "estudiante") {
    redirect("/");
  }

  const { reserva: reservaId } = await searchParams;
  const reserva = reservaId
    ? await getReservaConfirmada(reservaId, session.user.id)
    : null;
  if (!reserva) {
    redirect("/tutores");
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[480px] text-center">
        <Image
          src="/lumina-exito.png"
          alt=""
          width={200}
          height={200}
          className="mx-auto mb-4 h-32 w-auto"
        />
        <h1 className="text-2xl leading-tight font-black text-[var(--ink)]">
          ¡Reserva confirmada!
        </h1>
        <p className="mt-2 mb-6 text-base font-semibold text-[var(--gray-500)]">
          Tu tutoría con {reserva.tutorNombre} quedó agendada.
        </p>

        <Card className="mb-6 text-left">
          <CardContent>
            <div className="mb-2.5 flex justify-between">
              <span className="text-[13px] font-bold text-[var(--gray-500)]">Tutor</span>
              <span className="text-[14.5px] font-extrabold text-[var(--ink)]">
                {reserva.tutorNombre}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[13px] font-bold text-[var(--gray-500)]">Cuándo</span>
              <span className="text-[14.5px] font-extrabold text-[var(--ink)]">
                {capitalizar(format(new Date(reserva.inicio), "EEEE d 'de' MMMM", { locale: es }))}{" "}
                · {format(new Date(reserva.inicio), "HH:mm")}
              </span>
            </div>
          </CardContent>
        </Card>

        <Button render={<Link href="/tutores" />} className="rounded-pill px-6 py-3">
          Volver a tutores
        </Button>
      </div>
    </div>
  );
}

function capitalizar(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
