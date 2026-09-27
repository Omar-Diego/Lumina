import { pool } from "@/lib/db";

export class FranjaNoDisponibleError extends Error {
  constructor() {
    super("La franja ya no está disponible");
  }
}

export type FranjaParaReservar = {
  franjaId: string;
  inicio: string;
  fin: string;
  tutorId: string;
  tutorNombre: string;
};

export async function getFranjaParaReservar(
  franjaId: string,
): Promise<FranjaParaReservar | null> {
  const { rows } = await pool.query<FranjaParaReservar>(
    `select
       fh.id as "franjaId",
       fh.inicio,
       fh.fin,
       u.id as "tutorId",
       u.name as "tutorNombre"
     from public.franja_horaria fh
     join better_auth."user" u on u.id = fh.tutor_id
     where fh.id = $1 and fh.estado = 'libre' and fh.inicio > now()`,
    [franjaId],
  );
  return rows[0] ?? null;
}

// CU02 (parte-2-arquitectura.md): la franja se verifica y se marca ocupada
// dentro de la misma transacción con un lock de fila, así que si dos
// estudiantes confirman la misma franja casi al mismo tiempo, el segundo
// UPDATE ve 0 filas afectadas en vez de correr con la fila que el primero ya
// cambió — de ahí sale el 409 del flujo alterno A1.
export async function crearReserva(
  franjaId: string,
  estudianteId: string,
): Promise<string> {
  const client = await pool.connect();
  try {
    await client.query("begin");

    const { rows: libres } = await client.query(
      `select id from public.franja_horaria
       where id = $1 and estado = 'libre' and inicio > now()
       for update`,
      [franjaId],
    );
    if (libres.length === 0) {
      throw new FranjaNoDisponibleError();
    }

    const { rows: reservas } = await client.query<{ id: string }>(
      `insert into public.reserva (franja_id, estudiante_id)
       values ($1, $2)
       returning id`,
      [franjaId, estudianteId],
    );

    await client.query(
      `update public.franja_horaria set estado = 'ocupada' where id = $1`,
      [franjaId],
    );

    await client.query("commit");
    return reservas[0].id;
  } catch (err) {
    await client.query("rollback");
    throw err;
  } finally {
    client.release();
  }
}

export type ReservaConfirmada = {
  reservaId: string;
  inicio: string;
  fin: string;
  tutorId: string;
  tutorNombre: string;
};

export async function getReservaConfirmada(
  reservaId: string,
  estudianteId: string,
): Promise<ReservaConfirmada | null> {
  const { rows } = await pool.query<ReservaConfirmada>(
    `select
       r.id as "reservaId",
       fh.inicio,
       fh.fin,
       u.id as "tutorId",
       u.name as "tutorNombre"
     from public.reserva r
     join public.franja_horaria fh on fh.id = r.franja_id
     join better_auth."user" u on u.id = fh.tutor_id
     where r.id = $1 and r.estudiante_id = $2`,
    [reservaId, estudianteId],
  );
  return rows[0] ?? null;
}

export type SesionTutor = {
  reservaId: string;
  inicio: string;
  fin: string;
  estudianteId: string;
  estudianteNombre: string;
};

export async function getSesionesTutor(tutorId: string): Promise<SesionTutor[]> {
  const { rows } = await pool.query<SesionTutor>(
    `select
       r.id as "reservaId",
       fh.inicio,
       fh.fin,
       u.id as "estudianteId",
       u.name as "estudianteNombre"
     from public.reserva r
     join public.franja_horaria fh on fh.id = r.franja_id
     join better_auth."user" u on u.id = r.estudiante_id
     where fh.tutor_id = $1 and r.estado = 'confirmada'
     order by fh.inicio`,
    [tutorId],
  );
  return rows;
}
