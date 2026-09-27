-- Campos requeridos por el plugin `admin` de Better Auth 1.7.6. Todos los
-- cambios son aditivos; `role` ya existe en instalaciones actuales de Lumina.
alter table better_auth."user"
  add column if not exists role text not null default 'estudiante',
  add column if not exists banned boolean default false,
  add column if not exists "banReason" text,
  add column if not exists "banExpires" timestamptz;

alter table better_auth."session"
  add column if not exists "impersonatedBy" text;
