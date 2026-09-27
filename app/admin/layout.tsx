import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-[var(--admin-bg)] text-white">
      {children}
    </div>
  );
}
