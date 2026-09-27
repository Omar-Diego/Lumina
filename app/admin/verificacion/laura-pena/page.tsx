import Link from "next/link";
import { ArrowLeft, BookOpen, Check, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminTutorDetailPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[1064px] flex-1 px-5 py-10 sm:px-8 sm:py-11">
        <Link
          href="/admin/verificacion"
          className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#9aa8c2] transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
        >
          <ArrowLeft className="size-4" />
          Volver a verificación de tutores
        </Link>

        <Card className="border-[var(--admin-border)] bg-[#1b2547] py-6 shadow-none">
          <CardContent className="flex flex-col gap-5 sm:flex-row sm:gap-[22px]">
            <Avatar className="size-[72px]">
              <AvatarFallback className="bg-[var(--yellow-text)] text-[22px] font-extrabold text-white">
                LP
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-[22px] font-extrabold text-white">Laura Peña</h1>
                <Badge className="bg-[var(--yellow-light)] text-[var(--yellow-text)]">
                  Pendiente de verificación
                </Badge>
              </div>
              <p className="my-2.5 text-[14.5px] leading-[1.55] font-semibold text-[#9aa8c2]">
                Enviado el 16 de mayo de 2024. Solicita impartir Química y Biología.
              </p>

              <dl className="my-[18px] grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[13px] font-bold text-[#7c8ab0]">Correo</dt>
                  <dd className="mt-1 text-sm font-extrabold text-white">
                    laura.pena@correo.com
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] font-bold text-[#7c8ab0]">
                    Escuela / institución
                  </dt>
                  <dd className="mt-1 text-sm font-extrabold text-white">
                    Facultad de Ciencias, UNAM
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] font-bold text-[#7c8ab0]">
                    Materias declaradas
                  </dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    <Badge className="bg-[var(--blue-light)] text-[var(--blue-dark)]">Química</Badge>
                    <Badge className="bg-[var(--blue-light)] text-[var(--blue-dark)]">Biología</Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] font-bold text-[#7c8ab0]">
                    Documento de identidad
                  </dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-sm font-extrabold text-white">
                    <BookOpen className="size-4 text-[var(--green)]" />
                    Adjunto verificado
                  </dd>
                </div>
              </dl>

              <p className="mb-1.5 text-[13px] font-bold text-[#7c8ab0]">
                Descripción enviada por la tutora
              </p>
              <blockquote className="mb-5 rounded-[12px] border border-[var(--admin-border)] bg-[var(--admin-bg)] px-4 py-3.5 text-[14.5px] leading-[1.55] font-semibold text-[#c8d2ea]">
                “Estudiante de Biología con experiencia dando clases particulares de
                química general y biología celular a nivel preparatoria.”
              </blockquote>

              <div className="space-y-2">
                <Label htmlFor="rejection-reason" className="font-bold text-white">
                  Motivo (obligatorio si rechazas)
                </Label>
                <Textarea
                  id="rejection-reason"
                  name="rejectionReason"
                  placeholder="Escribe el motivo del rechazo…"
                  className="min-h-24 rounded-[var(--radius-md)] border-[var(--admin-border)] bg-[var(--admin-bg)] px-4 py-3 font-semibold text-white placeholder:text-[#7c8ab0]"
                />
              </div>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <Button type="button" className="flex-1">
                  <Check /> Aprobar perfil
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-[#3a4570] bg-transparent text-[#f87171] hover:bg-white/5 hover:text-[#f87171]"
                >
                  <X /> Rechazar con motivo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <p className="mx-auto w-full max-w-[1064px] px-5 pb-14 text-[13px] leading-5 font-semibold text-[#7c8ab0] sm:px-8">
        La decisión y la fecha quedan registradas junto con el administrador
        responsable (RF03).
      </p>
    </>
  );
}
