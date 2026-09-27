// Evita caracteres ambiguos (I, l, 1, O, 0) para que se pueda leer/copiar a mano.
const CHARSET =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()-_=+";

export function generateSecurePassword(length = 16): string {
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, (v) => CHARSET[v % CHARSET.length]).join("");
}
