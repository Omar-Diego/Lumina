import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getSafeCallbackUrl } from "@/lib/callback-url";
import { getDashboardPath } from "@/lib/dashboard-path";

/**
 * Único destino de "callbackURL" para los login sociales (Google/GitHub):
 * el rol del usuario solo se conoce del lado del servidor una vez que el
 * proveedor ya redirigió de vuelta y la sesión quedó creada, así que esta
 * página se limita a leerla y mandar a cada quien a su dashboard.
 */
export default async function PostLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const callbackValue = (await searchParams).callbackUrl;
  const callbackUrl = getSafeCallbackUrl(
    typeof callbackValue === "string" ? callbackValue : null,
  );
  redirect(
    session ? (callbackUrl ?? getDashboardPath(session.user.role)) : "/login",
  );
}
