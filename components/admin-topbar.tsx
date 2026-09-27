import Image from "next/image";

import { Button } from "@/components/ui/button";

export function AdminTopbar() {
  return (
    <header className="border-b border-[var(--admin-border)] bg-[var(--admin-topbar-bg)] px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-base font-extrabold text-white">
          <Image
            src="/lumina-docs.png"
            alt=""
            width={32}
            height={32}
            className="size-8 object-contain"
          />
          <span>Lumina Admin</span>
          <span className="hidden rounded-[8px] bg-[var(--blue-light)]/10 px-2.5 py-1 text-xs font-bold text-[#9bb1e8] sm:inline-flex">
            admin.lumina.app
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-[#3a4570] bg-transparent text-white hover:bg-white/5 hover:text-white"
        >
          Carlos Ibarra · Administrador
        </Button>
      </div>
    </header>
  );
}
