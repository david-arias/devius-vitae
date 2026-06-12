-- ═══════════════════════════════════════════════════════════
-- devius-vitae — Schema inicial
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════

-- ─── Proyectos ───────────────────────────────────────────
create table if not exists projects (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  description      text,
  full_description text,
  tags             text[] default '{}',
  image_url        text,
  gallery_images   text[] default '{}',
  live_url         text,
  github_url       text,
  featured         boolean default false,
  order_index      integer default 0,
  year             text,
  role             text,
  duration         text,
  challenge        text,
  solution         text,
  results          text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ─── Habilidades ─────────────────────────────────────────
create table if not exists skills (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  percentage  integer not null check (percentage between 0 and 100),
  icon_url    text,
  order_index integer default 0,
  created_at  timestamptz default now()
);

-- ─── Experiencia ─────────────────────────────────────────
create table if not exists experience (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  company     text not null,
  period      text not null,
  current     boolean default false,
  description text,
  order_index integer default 0,
  created_at  timestamptz default now()
);

-- ─── Educación ───────────────────────────────────────────
create table if not exists education (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  institution text not null,
  type        text not null,
  description text,
  order_index integer default 0,
  created_at  timestamptz default now()
);

-- ─── Servicios ───────────────────────────────────────────
create table if not exists services (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  icon        text not null,
  tags        text[] default '{}',
  featured    boolean default false,
  order_index integer default 0,
  created_at  timestamptz default now()
);

-- ─── Mensajes de contacto ────────────────────────────────
create table if not exists contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text not null,
  description text not null,
  read        boolean default false,
  created_at  timestamptz default now()
);

-- ─── RLS ─────────────────────────────────────────────────
alter table projects          enable row level security;
alter table skills            enable row level security;
alter table experience        enable row level security;
alter table education         enable row level security;
alter table services          enable row level security;
alter table contact_messages  enable row level security;

-- Lectura pública
create policy "Public read projects"    on projects    for select using (true);
create policy "Public read skills"      on skills      for select using (true);
create policy "Public read experience"  on experience  for select using (true);
create policy "Public read education"   on education   for select using (true);
create policy "Public read services"    on services    for select using (true);

-- Escritura solo autenticados
create policy "Auth write projects"    on projects    for all using (auth.role() = 'authenticated');
create policy "Auth write skills"      on skills      for all using (auth.role() = 'authenticated');
create policy "Auth write experience"  on experience  for all using (auth.role() = 'authenticated');
create policy "Auth write education"   on education   for all using (auth.role() = 'authenticated');
create policy "Auth write services"    on services    for all using (auth.role() = 'authenticated');

-- Contacto: inserción pública, lectura admin
create policy "Public insert contact"  on contact_messages for insert with check (true);
create policy "Auth read contact"      on contact_messages for select  using (auth.role() = 'authenticated');
create policy "Auth delete contact"    on contact_messages for delete  using (auth.role() = 'authenticated');
create policy "Auth update contact"    on contact_messages for update  using (auth.role() = 'authenticated');

-- ─── Trigger updated_at en projects ──────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();
