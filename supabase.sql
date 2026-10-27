-- Залепи го целиот фајл во Supabase -> SQL Editor -> Run
-- ПРВО замени YOUR_ADMIN_EMAIL (веќе заменето) со емаилот на админот.

create or replace function public.is_admin()
returns boolean language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'admin@crustandbean.com'
$$;

-- Слики на сајтот (замени на оригиналните)
create table if not exists public.site_images (
  key text primary key,
  url text not null,
  updated_at timestamptz not null default now()
);

-- Блог објави
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  image_url text,
  created_at timestamptz not null default now()
);

-- Пораки од контакт формата (никогаш не се бришат автоматски)
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 200),
  phone text check (char_length(phone) <= 50),
  email text not null check (char_length(email) <= 200),
  message text not null check (char_length(message) <= 5000),
  created_at timestamptz not null default now()
);

alter table public.site_images enable row level security;
alter table public.posts enable row level security;
alter table public.messages enable row level security;

-- site_images: сите читаат, само админот менува
create policy "images read" on public.site_images for select using (true);
create policy "images admin write" on public.site_images for all
  using (public.is_admin()) with check (public.is_admin());

-- posts: сите читаат, само админот менува
create policy "posts read" on public.posts for select using (true);
create policy "posts admin write" on public.posts for all
  using (public.is_admin()) with check (public.is_admin());

-- messages: посетителите можат само да ИСПРАТАТ; само админот чита и брише
create policy "messages insert" on public.messages for insert
  to anon, authenticated with check (true);
create policy "messages admin read" on public.messages for select
  using (public.is_admin());
create policy "messages admin delete" on public.messages for delete
  using (public.is_admin());

-- Складиште за слики
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

create policy "storage read" on storage.objects for select
  using (bucket_id = 'site-images');
create policy "storage admin insert" on storage.objects for insert
  with check (bucket_id = 'site-images' and public.is_admin());
create policy "storage admin update" on storage.objects for update
  using (bucket_id = 'site-images' and public.is_admin());
create policy "storage admin delete" on storage.objects for delete
  using (bucket_id = 'site-images' and public.is_admin());
