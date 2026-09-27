export { cn } from "cn";

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function hashString(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash;
}

// Avatares sin foto (ver DESIGN.md): color decorativo pero estable por
// persona, no aleatorio en cada render.
const AVATAR_COLORS = [
  "bg-[var(--pink)]",
  "bg-[var(--blue)]",
  "bg-[var(--teal)]",
  "bg-[var(--purple)]",
  "bg-[var(--yellow)]",
];

export function getAvatarColor(seed: string) {
  return AVATAR_COLORS[hashString(seed) % AVATAR_COLORS.length];
}

// Mismo truco que getAvatarColor pero con el par claro/oscuro que usan los
// icon-square de materias (ver DESIGN.md) en vez de un color sólido.
const MATERIA_COLORS = [
  { bg: "bg-[var(--blue-light)]", text: "text-[var(--blue-dark)]" },
  { bg: "bg-[var(--purple-light)]", text: "text-[var(--purple)]" },
  { bg: "bg-[var(--pink-light)]", text: "text-[var(--pink)]" },
  { bg: "bg-[var(--teal-light)]", text: "text-[var(--teal)]" },
  { bg: "bg-[var(--yellow-light)]", text: "text-[var(--yellow-text)]" },
  { bg: "bg-[var(--green-light)]", text: "text-[var(--green)]" },
];

export function getMateriaColor(seed: string) {
  return MATERIA_COLORS[hashString(seed) % MATERIA_COLORS.length];
}
