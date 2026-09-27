import Link from "next/link";
import { ArrowLeft, BookOpen, Check, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminTutorDetailPage() {
  return (
    <>
      <main id="admin-main" tabIndex={-1} className="mx-auto w-full max-w-[1064px] flex-1 px-5 py-10 sm:px-8 sm:py-11">
        <Link
          href="/admin/verificacion"
          className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--admin-muted)] transition-colors hover:text-[var(--admin-text)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
        >
          <ArrowLeft className="size-4" />
          Volver a verificación de tutores
        </Link>

        <Card className="border-[var(--admin-border)] bg-[var(--admin-card-bg)] py-6 shadow-none">
          <CardContent className="flex flex-col gap-5 sm:flex-row sm:gap-[22px]">
            <Avatar className="size-[72px]">
              <AvatarFallback className="bg-[var(--yellow)] text-[22px] font-extrabold text-[var(--admin-avatar-fg)]">
                LP
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-[22px] font-extrabold text-[var(--admin-text)]">Laura Peña</h1>
                <Badge className="bg-[var(--admin-pending-bg)] text-[var(--admin-pending-fg)]">
                  Pendiente de verificación
                </Badge>
              </div>
              <p className="my-2.5 text-[14.5px] leading-[1.55] font-semibold text-[var(--admin-muted)]">
                Enviado el 16 de mayo de 2024. Solicita impartir Química y Biología.
              </p>

              <dl className="my-[18px] grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[13px] font-bold text-[var(--admin-subtle)]">Correo</dt>
                  <dd className="mt-1 text-sm font-extrabold text-[var(--admin-text)]">
                    laura.pena@correo.com
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] font-bold text-[var(--admin-subtle)]">
                    Escuela / institución
                  </dt>
                  <dd className="mt-1 text-sm font-extrabold text-[var(--admin-text)]">
                    Facultad de Ciencias, UNAM
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] font-bold text-[var(--admin-subtle)]">
                    Materias declaradas
                  </dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    <Badge className="bg-[var(--blue-light)] text-[var(--blue-dark)]">Química</Badge>
                    <Badge className="bg-[var(--blue-light)] text-[var(--blue-dark)]">Biología</Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] font-bold text-[var(--admin-subtle)]">
                    Documento de identidad
                  </dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-sm font-extrabold text-[var(--admin-text)]">
                    <BookOpen className="size-4 text-[var(--green)]" />
                    Adjunto verificado
                  </dd>
                </div>
              </dl>

              <p className="mb-1.5 text-[13px] font-bold text-[var(--admin-subtle)]">
                Descripción enviada por la tutora
              </p>
              <blockquote className="mb-5 rounded-[12px] border border-[var(--admin-border)] bg-[var(--admin-bg)] px-4 py-3.5 text-[14.5px] leading-[1.55] font-semibold text-[var(--admin-copy)]">
                “Estudiante de Biología con experiencia dando clases particulares de
                química general y biología celular a nivel preparatoria.”
              </blockquote>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <Button type="button" disabled className="flex-1 bg-[var(--admin-action-bg)] text-[var(--admin-action-fg)]">
                  <Check /> Aprobar perfil
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled
                  className="flex-1 border-[var(--admin-control-border)] bg-transparent text-[var(--admin-danger)]"
                >
                  <X /> Rechazar con motivo
                </Button>
              </div>
              <p className="mt-2 text-xs font-bold text-[var(--admin-subtle)]">
                Aprobación y rechazo: Próximamente.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <p className="mx-auto w-full max-w-[1064px] px-5 pb-14 text-[13px] leading-5 font-semibold text-[var(--admin-subtle)] sm:px-8">
        El registro de decisiones estará disponible próximamente.
      </p>
    </>
  );
}
