import { expect, test } from "vitest";

import { getSafeCallbackUrl } from "./callback-url.ts";

test("accepts local callbacks and rejects cross-origin redirects", () => {
  expect(getSafeCallbackUrl("/admin/verificacion?tab=pendientes")).toBe(
    "/admin/verificacion?tab=pendientes",
  );
  expect(getSafeCallbackUrl("https://evil.example/admin")).toBe(null);
  expect(getSafeCallbackUrl("//evil.example/admin")).toBe(null);
  expect(getSafeCallbackUrl("/\\evil.example/admin")).toBe(null);
});
