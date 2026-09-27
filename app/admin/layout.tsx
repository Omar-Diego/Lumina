import type { ReactNode } from "react";

import { requireAdmin } from "@/lib/require-admin";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-[var(--admin-bg)] text-[var(--admin-text)]">
      {children}
    </div>
  );
}
