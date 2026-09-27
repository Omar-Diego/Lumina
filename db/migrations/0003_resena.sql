-- Reseña del diagrama de clases (parte-2-arquitectura.md): RF08/CU04 "el
-- estudiante califica una sesión completada". `unique (reserva_id)` es la
-- regla de negocio "una reseña por reserva" a nivel de base de datos, igual
-- que 0002 hizo con franja_id.
create table if not exists public.resena (
  id uuid primary key default gen_random_uuid(),
  reserva_id uuid not null unique references public.reserva(id) on delete cascade,
  calificacion smallint not null check (calificacion between 1 and 5),
  comentario text,
  creada_en timestamptz not null default now()
);
