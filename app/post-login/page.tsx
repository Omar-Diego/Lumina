import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getDashboardPath } from "@/lib/dashboard-path";

/**
 * Único destino de "callbackURL" para los login sociales (Google/GitHub):
 * el rol del usuario solo se conoce del lado del servidor una vez que el
 * proveedor ya redirigió de vuelta y la sesión quedó creada, así que esta
 * página se limita a leerla y mandar a cada quien a su dashboard.
 */
export default async function PostLoginPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  redirect(session ? getDashboardPath(session.user.role) : "/login");
}
