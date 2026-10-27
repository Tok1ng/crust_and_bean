-- "За нас": наслов и блокови. Залепи во Supabase -> SQL Editor -> Run (по supabase.sql).
-- Може да се пушти повеќе пати без штета (не дуплира податоци).

create table if not exists public.site_texts (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.about_blocks (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  body text not null,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.site_texts enable row level security;
alter table public.about_blocks enable row level security;

drop policy if exists "texts read" on public.site_texts;
create policy "texts read" on public.site_texts for select using (true);
drop policy if exists "texts admin write" on public.site_texts;
create policy "texts admin write" on public.site_texts for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "about read" on public.about_blocks;
create policy "about read" on public.about_blocks for select using (true);
drop policy if exists "about admin write" on public.about_blocks;
create policy "about admin write" on public.about_blocks for all
  using (public.is_admin()) with check (public.is_admin());

insert into public.site_texts (key, value) values ('about-title', 'За Нас')
on conflict (key) do nothing;

insert into public.about_blocks (label, body, image_url, sort_order)
select * from (values
('Со што се занимаваме','Печеме секој ден — кроасани, бурек, леб, пица, сендвичи. Сè свежо, сè направено тука. Нема ланец, нема фабрика. Само пеќ, раце и рецепт кој работи.','frames/All (25).webp',1),
('Кои сме ние','Семејна пекара од 2006. Почнавме со еден фурун и две раце. Денес сме поголем тим — но истата екипа, ист принцип: влезеш гладен, излезеш задоволен.','frames/All (50).webp',2),
('Нашата цел','Да бидеме местото каде што луѓето доаѓаат секое утро — не затоа што мораат, туку затоа што сакаат. Добар производ, добра атмосфера, без излишности.','frames/All (65).webp',3)
) as v(label, body, image_url, sort_order)
where not exists (select 1 from public.about_blocks);
