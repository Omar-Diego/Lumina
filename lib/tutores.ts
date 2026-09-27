import { pool } from "@/lib/db";

export type TutorListado = {
  id: string;
  name: string;
  escuela: string | null;
  subjects: string[];
  bio: string | null;
  proximasFranjas: { inicio: string; fin: string }[];
};

export type TutorSort = "nombre" | "recientes";

export async function getMateriasDisponibles(): Promise<string[]> {
  const { rows } = await pool.query<{ materia: string }>(
    `select distinct jsonb_array_elements_text(subjects) as materia
     from better_auth."user"
     where role = 'tutor' and subjects is not null
     order by 1`,
  );
  return rows.map((r) => r.materia);
}

export async function getTutores(params: {
  q?: string;
  materia?: string;
  sort?: TutorSort;
}): Promise<TutorListado[]> {
  const { q, materia, sort = "nombre" } = params;
  const conditions = ["u.role = 'tutor'"];
  const values: unknown[] = [];

  if (materia) {
    values.push(JSON.stringify([materia]));
    conditions.push(`u.subjects @> $${values.length}::jsonb`);
  }

  if (q) {
    values.push(`%${q}%`);
    conditions.push(`u.name ilike $${values.length}`);
  }

  // ponytail: RF10 solo pide orden determinista, no un motor de relevancia —
  // nombre o más-reciente-primero cumplen sin inventar un score de "mejor
  // coincidencia".
  const orderBy = sort === "recientes" ? `u."createdAt" desc` : `u.name asc`;

  const { rows } = await pool.query(
    `select
       u.id,
       u.name,
       u.escuela,
       coalesce(u.subjects, '[]'::jsonb) as subjects,
       u.bio,
       coalesce(f.proximas_franjas, '[]'::json) as "proximasFranjas"
     from better_auth."user" u
     left join lateral (
       select json_agg(
                json_build_object('inicio', fh.inicio, 'fin', fh.fin)
                order by fh.inicio
              ) as proximas_franjas
       from (
         select inicio, fin
         from public.franja_horaria
         where tutor_id = u.id and estado = 'libre' and inicio > now()
         order by inicio
         limit 2
       ) fh
     ) f on true
     where ${conditions.join(" and ")}
     order by ${orderBy}`,
    values,
  );

  return rows;
}
