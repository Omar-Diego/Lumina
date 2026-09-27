import { describe, it, expect } from "vitest";
import { getDashboardPath } from "@/lib/dashboard-path";

describe("getDashboardPath", () => {
  it("manda al estudiante a / tutores", () => {
    expect(getDashboardPath("estudiante")).toBe("/tutores");
  });
  it("manda al tutor a /mi-perfil", () => {
    expect(getDashboardPath("tutor")).toBe("/mi-perfil");
  });
  it("manda al admin a /admin/verificacion", () => {
    expect(getDashboardPath("admin")).toBe("/admin/verificacion");
  });
});
