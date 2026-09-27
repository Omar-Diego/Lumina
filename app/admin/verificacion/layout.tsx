import type { ReactNode } from "react";

import { AdminTopbar } from "@/components/admin-topbar";

export default function VerificationLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#admin-main"
        className="sr-only z-50 rounded-[var(--radius-sm)] bg-[var(--admin-text)] px-4 py-2 font-bold text-[var(--admin-bg)] focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <AdminTopbar />
      {children}
    </>
  );
}
