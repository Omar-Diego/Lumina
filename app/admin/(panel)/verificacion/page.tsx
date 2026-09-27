import Link from "next/link";
import { Check, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const pendingTutors = [
  {
    name: "Laura Peña",
    initials: "LP",
    subjects: ["Química", "Biología"],
    description: "Perfil enviado con descripción y materias completas.",
    avatarClass: "bg-[var(--yellow)]",
    href: "/admin/verificacion/laura-pena",
  },
  {
    name: "Héctor Núñez",
    initials: "HN",
    subjects: ["Historia"],
    description: "Perfil enviado sin descripción — información incompleta.",
    avatarClass: "bg-[var(--green)]",
    href: null,
  },
];

export default function AdminVerificationPage() {
  return (
    <>
      <main id="admin-main" tabIndex={-1} className="mx-auto w-full max-w-[1064px] flex-1 px-5 py-10 sm:px-8 sm:py-11">
        <h1 className="text-[34px] leading-[1.2] font-black tracking-[-0.01em] text-[var(--admin-text)]">
          Verificación de tutores
        </h1>
        <p className="mt-2 text-base font-semibold text-[var(--admin-muted)]">
          Revisa los perfiles pendientes y decide si quedan visibles en la
          búsqueda pública.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {pendingTutors.map((tutor) => (
            <Card
              key={tutor.name}
              className="border-[var(--admin-border)] bg-[var(--admin-card-bg)] py-6 shadow-none"
            >
              <CardContent className="flex flex-col gap-4 sm:flex-row sm:gap-[18px]">
                <Avatar className="size-14">
                  <AvatarFallback className={`${tutor.avatarClass} text-base font-extrabold text-[var(--admin-avatar-fg)]`}>
                    {tutor.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-lg font-extrabold text-[var(--admin-text)]">{tutor.name}</h2>
                    <Badge className="bg-[var(--admin-pending-bg)] text-[var(--admin-pending-fg)]">
                      Pendiente
                    </Badge>
                  </div>
                  <div className="my-2 flex flex-wrap gap-1.5">
                    {tutor.subjects.map((subject) => (
                      <Badge key={subject} className="bg-[var(--blue-light)] text-[var(--blue-dark)]">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-[14.5px] leading-[1.55] font-semibold text-[var(--admin-muted)]">
                    {tutor.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <Button type="button" size="sm" disabled className="bg-[var(--admin-action-bg)] text-[var(--admin-action-fg)]">
                      <Check /> Aprobar
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-[var(--admin-control-border)] bg-transparent text-[var(--admin-danger)]"
                    >
                      <X /> Rechazar
                    </Button>
                    {tutor.href ? (
                      <Button
                        variant="outline"
                        size="sm"
                        render={<Link href={tutor.href} />}
                        nativeButton={false}
                        className="border-[var(--admin-control-border)] bg-transparent text-[var(--admin-muted)] hover:bg-[var(--admin-hover-bg)] hover:text-[var(--admin-text)]"
                      >
                        Ver perfil completo
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled
                        className="border-[var(--admin-control-border)] bg-transparent text-[var(--admin-muted)]"
                      >
                        Perfil: Próximamente
                      </Button>
                    )}
                  </div>
                  <p className="mt-2 text-xs font-bold text-[var(--admin-subtle)]">
                    Aprobación y rechazo: Próximamente.
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-[var(--admin-border)] bg-[var(--admin-card-bg)] py-6 shadow-none">
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:gap-[18px]">
              <Avatar className="size-14">
                <AvatarFallback className="bg-[var(--gray-400)] text-base font-extrabold text-[var(--admin-avatar-fg)]">
                  RS
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-lg font-extrabold text-[var(--admin-text)]">Rodrigo Sáenz</h2>
                  <Badge className="bg-[var(--admin-danger-bg)] text-[var(--admin-danger-fg)]">Rechazado</Badge>
                </div>
                <div className="my-2">
                  <Badge className="bg-[var(--blue-light)] text-[var(--blue-dark)]">
                    Programación
                  </Badge>
                </div>
                <div className="rounded-[var(--radius-sm)] border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3.5 py-2.5">
                  <p className="text-[13px] leading-5 font-bold text-[var(--admin-muted)]">
                    Motivo: no especificó nivel ni materias con suficiente detalle.
                    Notificado para reenviar.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <p className="mx-auto w-full max-w-[1064px] px-5 pb-14 text-[13px] leading-5 font-semibold text-[var(--admin-subtle)] sm:px-8">
        Acceso restringido al equipo administrador. Esta herramienta vive en un
        subdominio independiente (admin.lumina.app), separado del sitio público de
        estudiantes y tutores.
      </p>
    </>
  );
}
