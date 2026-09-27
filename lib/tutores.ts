import { pool } from "@/lib/db";

export type TutorListado = {
  id: string;
  name: string;
  escuela: string | null;
  subjects: string[];
  bio: string | null;
  proximasFranjas: { inicio: string; fin: string }[];
  ratingPromedio: number | null;
  ratingCount: number;
};

export type TutorPerfil = {
  id: string;
  name: string;
  escuela: string | null;
  subjects: string[];
  bio: string | null;
  ratingPromedio: number | null;
  ratingCount: number;
};

export type Franja = { id: string; inicio: string; fin: string };

export type TutorSort = "nombre" | "recientes";

export const TUTORES_PAGE_SIZE = 20;

export async function getMateriasDisponibles(): Promise<string[]> {
  const { rows } = await pool.query<{ materia: string }>(
    `select distinct jsonb_array_elements_text(subjects) as materia
     from better_auth."user"
     where role = 'tutor' and subjects is not null
     order by 1`,
  );
  return rows.map((r) => r.materia);
}

export type MateriaResumen = { materia: string; tutorCount: number };

// RF04: catálogo de materias para que el estudiante explore por tema en vez
// de solo buscar tutores por nombre. El conteo sale de las materias que los
// tutores ya declararon en su perfil (no hay una tabla de materias aparte).
export async function getMateriasResumen(): Promise<MateriaResumen[]> {
  const { rows } = await pool.query<{ materia: string; tutorCount: string }>(
    `select materia, count(*) as "tutorCount"
     from (
       select distinct u.id, jsonb_array_elements_text(u.subjects) as materia
       from better_auth."user" u
       where u.role = 'tutor' and u.subjects is not null
     ) t
     group by materia
     order by "tutorCount" desc, materia asc`,
  );
  return rows.map((r) => ({ materia: r.materia, tutorCount: Number(r.tutorCount) }));
}

export async function getTutores(params: {
  q?: string;
  materia?: string;
  sort?: TutorSort;
  page?: number;
}): Promise<{ tutores: TutorListado[]; total: number }> {
  const { q, materia, sort = "nombre", page = 1 } = params;
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

  const offset = (Math.max(1, page) - 1) * TUTORES_PAGE_SIZE;
  values.push(TUTORES_PAGE_SIZE, offset);

  const { rows } = await pool.query(
    `select
       u.id,
       u.name,
       u.escuela,
       coalesce(u.subjects, '[]'::jsonb) as subjects,
       u.bio,
       coalesce(f.proximas_franjas, '[]'::json) as "proximasFranjas",
       rt.promedio as "ratingPromedio",
       coalesce(rt.total, 0) as "ratingCount",
       count(*) over() as "totalCount"
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
     left join lateral (
       select round(avg(res.calificacion)::numeric, 1) as promedio, count(*) as total
       from public.resena res
       join public.reserva r on r.id = res.reserva_id
       join public.franja_horaria fh2 on fh2.id = r.franja_id
       where fh2.tutor_id = u.id
     ) rt on true
     where ${conditions.join(" and ")}
     order by ${orderBy}
     limit $${values.length - 1} offset $${values.length}`,
    values,
  );

  // pg devuelve numeric/bigint como string; los convertimos acá para que el
  // resto de la app trabaje con TutorListado tal como lo declara el tipo.
  return {
    tutores: rows.map((r) => ({
      ...r,
      ratingPromedio: r.ratingPromedio === null ? null : Number(r.ratingPromedio),
      ratingCount: Number(r.ratingCount),
    })),
    total: rows.length > 0 ? Number(rows[0].totalCount) : 0,
  };
}

export async function getTutorPerfil(id: string): Promise<TutorPerfil | null> {
  const { rows } = await pool.query(
    `select
       u.id,
       u.name,
       u.escuela,
       coalesce(u.subjects, '[]'::jsonb) as subjects,
       u.bio,
       rt.promedio as "ratingPromedio",
       coalesce(rt.total, 0) as "ratingCount"
     from better_auth."user" u
     left join lateral (
       select round(avg(res.calificacion)::numeric, 1) as promedio, count(*) as total
       from public.resena res
       join public.reserva r on r.id = res.reserva_id
       join public.franja_horaria fh on fh.id = r.franja_id
       where fh.tutor_id = u.id
     ) rt on true
     where u.id = $1 and u.role = 'tutor'`,
    [id],
  );
  const row = rows[0];
  if (!row) return null;
  return {
    ...row,
    ratingPromedio: row.ratingPromedio === null ? null : Number(row.ratingPromedio),
    ratingCount: Number(row.ratingCount),
  };
}

export async function getFranjasDisponibles(tutorId: string): Promise<Franja[]> {
  const { rows } = await pool.query<Franja>(
    `select id, inicio, fin
     from public.franja_horaria
     where tutor_id = $1 and estado = 'libre' and inicio > now()
     order by inicio`,
    [tutorId],
  );
  return rows;
}

export type FranjaTutor = { id: string; inicio: string; fin: string; estado: "libre" | "ocupada" };

export class FranjaSolapadaError extends Error {
  constructor() {
    super("Esa franja se solapa con un horario que ya publicaste");
  }
}

export async function getFranjasTutor(tutorId: string): Promise<FranjaTutor[]> {
  const { rows } = await pool.query<FranjaTutor>(
    `select id, inicio, fin, estado
     from public.franja_horaria
     where tutor_id = $1 and inicio > now()
     order by inicio`,
    [tutorId],
  );
  return rows;
}

// RF05: "el sistema evita franjas que se solapen con otras ya publicadas".
// Solo el propio tutor crea sus franjas (a diferencia de crearReserva, no hay
// dos actores compitiendo por la misma fila), así que un select-luego-insert
// simple basta sin el lock de transacción que sí necesita la reserva.
export async function crearFranja(tutorId: string, inicio: Date, fin: Date): Promise<void> {
  const { rows: solapadas } = await pool.query(
    `select id from public.franja_horaria
     where tutor_id = $1 and inicio < $3 and fin > $2`,
    [tutorId, inicio.toISOString(), fin.toISOString()],
  );
  if (solapadas.length > 0) {
    throw new FranjaSolapadaError();
  }

  await pool.query(
    `insert into public.franja_horaria (tutor_id, inicio, fin) values ($1, $2, $3)`,
    [tutorId, inicio.toISOString(), fin.toISOString()],
  );
}
