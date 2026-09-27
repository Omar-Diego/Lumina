export { cn } from "cn";

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
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
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}
