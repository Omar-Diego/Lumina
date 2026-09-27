const LOCAL_ORIGIN = "https://lumina.local";

export function getSafeCallbackUrl(value: string | null | undefined) {
  if (!value?.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return null;
  }

  const url = new URL(value, LOCAL_ORIGIN);
  return url.origin === LOCAL_ORIGIN
    ? `${url.pathname}${url.search}${url.hash}`
    : null;
}
