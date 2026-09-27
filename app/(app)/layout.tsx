import type { CSSProperties, ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const role = session.user.role;

  if (role === "admin") {
    redirect("/admin");
  }

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "264px" } as CSSProperties}
    >
      <AppSidebar role={role} />
      <SidebarInset className="bg-[var(--page-bg)]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 py-8 md:px-11">
          <AppTopbar user={{ ...session.user, role }} />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
