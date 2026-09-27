import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getDashboardPath } from "@/lib/dashboard-path";

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "admin") {
    redirect(getDashboardPath(session.user.role));
  }

  return session;
}
