-- Reserva del diagrama de clases (parte-2-arquitectura.md): CU02 "Reservar una
-- franja". `unique (franja_id)` es la regla de negocio "FranjaHoraria 1 -- 0..1
-- Reserva" aplicada a nivel de base de datos, no solo en el código de la
-- transacción (RF06).
create table if not exists public.reserva (
  id uuid primary key default gen_random_uuid(),
  franja_id uuid not null unique references public.franja_horaria(id) on delete cascade,
  estudiante_id text not null references better_auth."user"(id) on delete cascade,
  estado text not null default 'confirmada' check (estado in ('confirmada', 'cancelada')),
  creada_en timestamptz not null default now()
);

create index if not exists reserva_estudiante_id_idx on public.reserva (estudiante_id);
