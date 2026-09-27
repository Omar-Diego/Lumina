import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";
import { Pool } from "pg";
import fs from "fs";
import path from "path";

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
  },
  plugins: [
    dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
    }),
  ],
});
