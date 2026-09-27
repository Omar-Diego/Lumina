import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Términos y privacidad · Lumina",
};

export default function LegalPage() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-[var(--border)] bg-card px-6 py-4 md:px-12">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-lumina.png"
            alt="Lumina"
            width={303}
            height={101}
            className="h-9 w-auto"
            priority
          />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[14.5px] font-bold text-[var(--blue)]"
        >
          <ArrowLeft className="size-4" />
          Volver al inicio
        </Link>
      </header>

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 py-12 md:px-12 md:py-16">
        <h1 className="text-[28px] leading-[1.2] font-black tracking-[-0.01em] text-[var(--ink)] sm:text-[34px]">
          Términos y condiciones · Política de privacidad
        </h1>
        <p className="mt-2 text-base font-semibold text-[var(--gray-500)]">
          Última actualización: septiembre de 2026.
        </p>

        <Card className="mt-8 gap-0 border-none bg-[var(--yellow-light)]">
          <CardContent className="flex gap-4">
            <Image
              src="/lumina-docs.png"
              alt=""
              width={104}
              height={104}
              className="h-13 w-auto shrink-0"
            />
            <p className="text-[14.5px] leading-relaxed font-bold text-[var(--ink)]">
              Aviso importante: Lumina es un proyecto académico. Esta demo usa
              autenticación real (Better Auth con una base de datos Postgres)
              para que el flujo de registro e inicio de sesión funcione de
              punta a punta, pero no procesa pagos ni se usa para brindar
              tutorías reales. El resto de la información en la plataforma
              (tutores, horarios, reseñas) es de ejemplo.
            </p>
          </CardContent>
        </Card>

        <div className="mt-10 flex flex-col gap-8">
          <section>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              1. Naturaleza del proyecto
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed font-semibold text-[var(--gray-500)]">
              Lumina, tal como se presenta en esta aplicación, es un
              prototipo funcional elaborado con fines académicos y de
              portafolio. Salvo el registro y el inicio de sesión, ningún
              otro formulario o acción envía información a un servidor de
              producción; los datos que aparecen (nombres, horarios,
              calificaciones) son de ejemplo.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              2. Uso previsto del servicio (ilustrativo)
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed font-semibold text-[var(--gray-500)]">
              En una versión real, esta sección describiría las condiciones
              de uso para estudiantes, tutores y administradores:
              verificación de identidad de tutores, responsabilidad sobre la
              exactitud de los perfiles y reglas de cancelación de sesiones
              presenciales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              3. Privacidad y datos
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed font-semibold text-[var(--gray-500)]">
              Al crear una cuenta, guardamos tu nombre, correo y contraseña
              (cifrada) únicamente para que puedas iniciar sesión en esta
              demo. No compartimos esos datos con terceros ni los usamos con
              fines de análisis o publicidad. En una versión real de Lumina,
              esta sección detallaría además qué datos se recopilan sobre
              sesiones agendadas y con qué fin.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              4. Menores de edad
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed font-semibold text-[var(--gray-500)]">
              Como se indica en la documentación del proyecto, el uso por
              menores de edad requeriría definir un flujo de consentimiento
              familiar antes de cualquier lanzamiento real; ese flujo queda
              fuera del alcance de este MVP.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              5. Contacto
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed font-semibold text-[var(--gray-500)]">
              Este documento no corresponde a una entidad real y no debe
              usarse como referencia legal fuera del contexto académico de
              este proyecto.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
