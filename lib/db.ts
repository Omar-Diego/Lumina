import { Pool } from "pg";
import fs from "fs";
import path from "path";

// ponytail: pool aparte del que usa Better Auth (lib/auth.ts) para no tocar
// su configuración (search_path fijo a better_auth). Mismo Postgres, mismas
// credenciales; las queries de acá siempre califican el schema a mano
// (public.foo / better_auth."user") así que no dependen de search_path.
const connectionString = new URL(process.env.POSTGRES_URL_NON_POOLING!);
connectionString.searchParams.delete("sslmode");

export const pool = new Pool({
  connectionString: connectionString.toString(),
  ssl: {
    ca: fs.readFileSync(path.join(process.cwd(), "certs/supabase-ca.crt"), "utf8"),
  },
});
