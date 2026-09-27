import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { auth } from "@/lib/auth";
import { crearReserva, getFranjaParaReservar, FranjaNoDisponibleError } from "@/lib/reservas";
import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function ConfirmarReservaPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ franja?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }
  if (session.user.role !== "estudiante") {
    redirect("/");
  }

  const { id: tutorId } = await params;
  const { franja: franjaId } = await searchParams;
  if (!franjaId) {
    redirect(`/tutores/${tutorId}`);
  }

  const franja = await getFranjaParaReservar(franjaId);
  if (!franja || franja.tutorId !== tutorId) {
    redirect(`/tutores/${tutorId}?franjaTomada=1`);
  }

  const estudianteId = session.user.id;

  async function confirmarReserva() {
    "use server";
    try {
      const reservaId = await crearReserva(franjaId!, estudianteId);
      redirect(`/tutores/${tutorId}/reservar/exito?reserva=${reservaId}`);
    } catch (err) {
      if (err instanceof FranjaNoDisponibleError) {
        redirect(`/tutores/${tutorId}?franjaTomada=1`);
      }
      throw err;
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[480px]">
        <Image
          src="/lumina-confirma.png"
          alt=""
          width={200}
          height={200}
          className="mx-auto mb-4 h-24 w-auto"
        />
        <h1 className="text-center text-2xl leading-tight font-black text-[var(--ink)]">
          Confirma tu reserva
        </h1>
        <p className="mt-2 mb-6 text-center text-base font-semibold text-[var(--gray-500)]">
          Revisa los datos antes de confirmar la sesión.
        </p>

        <Card>
          <CardContent>
            <div className="mb-4 flex items-center gap-4 border-b border-[var(--border)] pb-4">
              <Avatar className="size-14 shrink-0">
                <AvatarFallback
                  className={cn(
                    "font-extrabold text-white",
                    getAvatarColor(franja.tutorId),
                  )}
                >
                  {getInitials(franja.tutorNombre)}
                </AvatarFallback>
              </Avatar>
              <p className="text-lg font-extrabold text-[var(--ink)]">
                {franja.tutorNombre}
              </p>
            </div>

            <div className="mb-3 flex justify-between">
              <span className="text-[13px] font-bold text-[var(--gray-500)]">Día</span>
              <span className="text-[14.5px] font-extrabold text-[var(--ink)]">
                {capitalizar(format(new Date(franja.inicio), "EEEE d 'de' MMMM", { locale: es }))}
              </span>
            </div>
            <div className="mb-5 flex justify-between">
              <span className="text-[13px] font-bold text-[var(--gray-500)]">Hora</span>
              <span className="text-[14.5px] font-extrabold text-[var(--ink)]">
                {format(new Date(franja.inicio), "HH:mm")} – {format(new Date(franja.fin), "HH:mm")}
              </span>
            </div>

            <form action={confirmarReserva}>
              <Button type="submit" className="w-full justify-center rounded-[var(--radius-md)] py-3.5">
                Confirmar reserva
              </Button>
            </form>
            <Button
              render={<Link href={`/tutores/${tutorId}`} />}
              nativeButton={false}
              variant="outline"
              className="mt-3 w-full justify-center rounded-[var(--radius-md)] py-3.5"
            >
              Cancelar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function capitalizar(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
