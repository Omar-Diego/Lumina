type Role = "estudiante" | "tutor";

/**
 * A dónde mandar a un usuario ya autenticado cuando "entra a la app"
 * (login, registro, completar perfil, o la landing si ya tiene sesión).
 *
 * ponytail: todavía no existe un dashboard de tutor, así que su único
 * destino real hoy es completar-perfil (gestiona sus materias/bio). Cuando
 * se construya su panel, agregar esa ruta aquí — este es el único lugar
 * que decide "a dónde va cada rol".
 */
export function getDashboardPath(role: Role): string {
  return role === "estudiante" ? "/tutores" : "/completar-perfil";
}
