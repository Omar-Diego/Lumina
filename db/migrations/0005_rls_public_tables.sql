-- Estas tablas solo se leen/escriben vía el pool de pg en lib/db.ts, con el
-- rol dueño de las tablas (Postgres exime al dueño de RLS por default) —
-- nunca vía @supabase/supabase-js, que no se usa en el repo. Sin RLS,
-- PostgREST (que Supabase expone automáticamente para el schema public)
-- dejaría leer/escribir estas tablas a cualquiera con la anon key pública.
-- Habilitar RLS sin políticas cierra ese acceso sin afectar a la app.
alter table public.franja_horaria enable row level security;
alter table public.reserva enable row level security;
alter table public.resena enable row level security;
