import type { UserRole } from "@/lib/auth-roles";

/**
 * A dónde mandar a un usuario ya autenticado cuando "entra a la app"
 * (login, registro, completar perfil, o la landing si ya tiene sesión).
 *
 * Este es el único lugar que decide "a dónde va cada rol" — cambiarlo aquí
 * basta para redirigir a todos los flujos de entrada.
 */
export function getDashboardPath(role: UserRole): string {
  if (role === "admin") return "/admin/verificacion";
  return role === "estudiante" ? "/tutores" : "/mi-perfil";
}
