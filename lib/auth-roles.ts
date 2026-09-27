import type { BetterAuthPlugin, StandardSchemaV1 } from "better-auth";

export const USER_ROLES = ["estudiante", "tutor", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

type SelfServiceRole = Exclude<UserRole, "admin">;

const selfServiceRoleValidator = {
  "~standard": {
    version: 1,
    vendor: "lumina",
    validate(value: unknown) {
      if (value === "estudiante" || value === "tutor") {
        return { value };
      }

      return {
        issues: [
          {
            message: "El rol solo puede ser estudiante o tutor.",
          },
        ],
      };
    },
  },
} satisfies StandardSchemaV1<unknown, SelfServiceRole>;

/**
 * The admin plugin intentionally makes `role` non-writable. Lumina needs the
 * two public profile roles during signup/profile completion, so this plugin is
 * placed after it and restores narrowly validated self-service input. `admin`
 * is an output/database value, but can never pass this input validator.
 */
export const selfServiceRoleField = {
  type: ["estudiante", "tutor", "admin"] as [
    "estudiante",
    "tutor",
    "admin",
  ],
  required: true,
  input: true,
  defaultValue: "estudiante" as const,
  validator: {
    input: selfServiceRoleValidator,
  },
};

export const selfServiceRolePlugin = {
  id: "self-service-role",
  schema: {
    user: {
      fields: {
        role: selfServiceRoleField,
      },
    },
  },
} satisfies BetterAuthPlugin;
