import { pool } from "@/lib/db";

export class ResenaExistenteError extends Error {
  constructor() {
    super("Ya calificaste esta sesión");
  }
}

// RF08: solo el estudiante dueño de la reserva puede calificarla, y solo una
// vez — el unique(reserva_id) de la tabla hace cumplir lo segundo, así que
// aquí basta con dejar que el 23505 (unique_violation) suba como el error
// de negocio en vez de un 500 genérico.
export async function crearResena(
  reservaId: string,
  estudianteId: string,
  calificacion: number,
  comentario: string | null,
): Promise<void> {
  const { rows } = await pool.query(
    `select 1 from public.reserva where id = $1 and estudiante_id = $2`,
    [reservaId, estudianteId],
  );
  if (rows.length === 0) {
    throw new Error("Reserva no encontrada");
  }

  try {
    await pool.query(
      `insert into public.resena (reserva_id, calificacion, comentario)
       values ($1, $2, $3)`,
      [reservaId, calificacion, comentario],
    );
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "23505") {
      throw new ResenaExistenteError();
    }
    throw err;
  }
}
