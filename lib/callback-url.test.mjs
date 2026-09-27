import assert from "node:assert/strict";
import test from "node:test";

import { getSafeCallbackUrl } from "./callback-url.ts";

test("accepts local callbacks and rejects cross-origin redirects", () => {
  assert.equal(
    getSafeCallbackUrl("/admin/verificacion?tab=pendientes"),
    "/admin/verificacion?tab=pendientes",
  );
  assert.equal(getSafeCallbackUrl("https://evil.example/admin"), null);
  assert.equal(getSafeCallbackUrl("//evil.example/admin"), null);
  assert.equal(getSafeCallbackUrl("/\\evil.example/admin"), null);
});
