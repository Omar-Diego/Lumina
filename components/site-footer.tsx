import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--ink)] px-6 pt-11 pb-7 md:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-10">
        <div className="max-w-[260px]">
          <span className="text-2xl font-black text-white">Lumina</span>
          <p className="mt-2.5 text-[14.5px] font-semibold text-[#9AA8C2]">
            Encuentra tutores verificados y agenda tutorías presenciales con
            total claridad.
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          <div>
            <p className="mb-2.5 text-[13px] font-bold tracking-wide text-[#7C8AB0] uppercase">
              Estudiantes
            </p>
            <Link
              href="/registro"
              className="mb-2 block text-sm font-bold text-[#C8D2EA]"
            >
              Crear cuenta
            </Link>
            <Link
              href="/#tutores-destacados"
              className="block text-sm font-bold text-[#C8D2EA]"
            >
              Buscar tutores
            </Link>
          </div>
          <div>
            <p className="mb-2.5 text-[13px] font-bold tracking-wide text-[#7C8AB0] uppercase">
              Tutores
            </p>
            <Link
              href="/registro"
              className="block text-sm font-bold text-[#C8D2EA]"
            >
              Ofrecer tutorías
            </Link>
          </div>
          <div>
            <p className="mb-2.5 text-[13px] font-bold tracking-wide text-[#7C8AB0] uppercase">
              Legal
            </p>
            <Link
              href="/legal"
              className="block text-sm font-bold text-[#C8D2EA]"
            >
              Términos y privacidad
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-7 max-w-[1440px] border-t border-[#263259] pt-5">
        <p className="text-[13px] font-bold text-[#7C8AB0]">
          © {new Date().getFullYear()} Lumina. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
