import type { ReactNode } from "react";

import { AdminTopbar } from "@/components/admin-topbar";

export default function VerificationLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminTopbar />
      {children}
    </>
  );
}
