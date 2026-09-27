import { betterAuth } from "better-auth";
import { admin as adminPlugin } from "better-auth/plugins";
import { dash } from "@better-auth/infra";
import { i18n, locales } from "@better-auth/i18n";
import { Pool } from "pg";
import fs from "fs";
import path from "path";

import {
  selfServiceRoleField,
  selfServiceRolePlugin,
} from "@/lib/auth-roles";

const connectionString = new URL(process.env.POSTGRES_URL_NON_POOLING!);
connectionString.searchParams.delete("sslmode");
connectionString.searchParams.set("options", "-c search_path=better_auth");

export const auth = betterAuth({
  database: new Pool({
    connectionString: connectionString.toString(),
    ssl: {
      ca: fs.readFileSync(path.join(process.cwd(), "certs/supabase-ca.crt"), "utf8"),
    },
  }),
  trustedOrigins: [
    process.env.BETTER_AUTH_URL!,
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],
  emailAndPassword: {
    enabled: true,
    // NIST 800-63B: sin MFA ni verificación de contraseñas filtradas, 8 (el
    // default) se queda corto. 12 + generador propio empuja a algo más fuerte
    // sin imponer reglas de composición (mayúscula/símbolo), que NIST ya no
    // recomienda.
    minPasswordLength: 12,
  },
  // Por defecto el rate limiting de Better Auth guarda los contadores en
  // memoria del proceso. En serverless (Vercel) cada instancia tiene su
  // propia memoria, así que el límite real es mucho más débil de lo que
  // parece — lo movemos a la misma Postgres que ya tenemos.
  rateLimit: {
    storage: "database",
  },
  account: {
    accountLinking: {
      // No verificamos correos (sin proveedor de email de terceros), así que
      // NUNCA hay que fusionar (link) un login social con una cuenta local
      // existente solo porque coincide el correo: quien creó esa cuenta por
      // email/password pudo no ser su dueño real, y seguiría teniendo la
      // contraseña de una cuenta que ahora también usa el dueño legítimo por
      // Google/GitHub/etc. Con esto, un correo duplicado se rechaza
      // (account_not_linked) en vez de fusionarse a ciegas.
      disableImplicitLinking: true,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      // Kept here as well as in the post-admin plugin so the client can infer
      // the field; plugin schema wins at runtime in declaration order.
      role: selfServiceRoleField,
      escuela: {
        type: "string",
        required: false,
        input: true,
      },
      subjects: {
        type: "string[]",
        required: false,
        input: true,
      },
      bio: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  plugins: [
    adminPlugin({
      // Los registros normales siguen entrando como estudiantes. El plugin
      // `selfServiceRolePlugin` permite escoger estudiante/tutor, pero rechaza
      // explícitamente `admin` en cualquier entrada pública.
      defaultRole: "estudiante",
    }),
    selfServiceRolePlugin,
    dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
    }),
    // La app es solo en español: solo cargamos "es" para que nunca se
    // resuelva a otro idioma por el Accept-Language del navegador.
    i18n({
      translations: { es: locales.es },
      defaultLocale: "es",
    }),
  ],
});
