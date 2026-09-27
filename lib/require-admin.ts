import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getSafeCallbackUrl } from "@/lib/callback-url";
import { getDashboardPath } from "@/lib/dashboard-path";

export async function requireAdmin(callbackUrl = "/admin/verificacion") {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    const safeCallbackUrl = getSafeCallbackUrl(callbackUrl) ?? "/admin/verificacion";
    redirect(`/admin/login?callbackUrl=${encodeURIComponent(safeCallbackUrl)}`);
  }
  if (session.user.role !== "admin") {
    redirect(getDashboardPath(session.user.role));
  }

  return session;
}
