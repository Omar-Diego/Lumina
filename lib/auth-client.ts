import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { dashClient } from "@better-auth/infra/client";

import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
  plugins: [dashClient(), inferAdditionalFields<typeof auth>()],
});
