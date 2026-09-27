-- FranjaHoraria del diagrama de clases (parte-2-arquitectura.md): horarios que
-- un tutor publica (RF05). Vive en public porque better_auth es solo para las
-- tablas de Better Auth. Hoy no hay pantalla para que el tutor publique
-- franjas (eso es RF05, feature aparte) — esta tabla existe para que el
-- listado de tutores pueda consultarla de verdad (hoy siempre vacía) en vez
-- de inventar horarios.
create table if not exists public.franja_horaria (
  id uuid primary key default gen_random_uuid(),
  tutor_id text not null references better_auth."user"(id) on delete cascade,
  inicio timestamptz not null,
  fin timestamptz not null,
  estado text not null default 'libre' check (estado in ('libre', 'ocupada')),
  created_at timestamptz not null default now(),
  check (fin > inicio)
);

create index if not exists franja_horaria_tutor_id_idx on public.franja_horaria (tutor_id);
create index if not exists franja_horaria_inicio_idx on public.franja_horaria (inicio);
