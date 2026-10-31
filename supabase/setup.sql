-- Run this once in Supabase: SQL Editor > New query > paste > Run.
-- IMPORTANT: change the email below if your admin login email is different.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  sort integer not null default 0,
  published boolean not null default false,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.projects enable row level security;

-- Only this signed-in email can change anything
create or replace function public.is_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'mosesoluwa2005@gmail.com'
$$;

drop policy if exists "Anyone can read published projects" on public.projects;
create policy "Anyone can read published projects" on public.projects
  for select to anon, authenticated using (published = true);

drop policy if exists "Admin manages projects" on public.projects;
create policy "Admin manages projects" on public.projects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Public file bucket for images, videos and the CV (40 MB max per file)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 41943040,
  array['image/png','image/jpeg','image/webp','image/gif','video/mp4','video/webm','application/pdf'])
on conflict (id) do update set public = true,
  file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admin reads media" on storage.objects;
create policy "Admin reads media" on storage.objects
  for select to authenticated using (bucket_id = 'media' and public.is_admin());
drop policy if exists "Admin uploads media" on storage.objects;
create policy "Admin uploads media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "Admin updates media" on storage.objects;
create policy "Admin updates media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin()) with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "Admin deletes media" on storage.objects;
create policy "Admin deletes media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());
