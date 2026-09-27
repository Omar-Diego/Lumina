import Image from "next/image";

export function AdminTopbar() {
  return (
    <header className="border-b border-[var(--admin-border)] bg-[var(--admin-topbar-bg)] px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-base font-extrabold text-[var(--admin-text)]">
          <Image
            src="/lumina-docs.png"
            alt=""
            width={32}
            height={32}
            className="size-8 object-contain"
          />
          <span>Lumina Admin</span>
          <span className="hidden rounded-[8px] bg-[var(--admin-accent-bg)] px-2.5 py-1 text-xs font-bold text-[var(--admin-accent)] sm:inline-flex">
            admin.lumina.app
          </span>
        </div>

        <div className="inline-flex rounded-[var(--radius-pill)] border border-[var(--admin-control-border)] px-4 py-2.5 text-[13px] font-extrabold text-[var(--admin-text)]">
          Carlos Ibarra · Administrador
        </div>
      </div>
    </header>
  );
}
