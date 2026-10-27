-- Менито: категории и производи. Залепи во Supabase -> SQL Editor -> Run (по supabase.sql).
-- Може да се пушти повеќе пати без штета (не дуплира податоци).
-- Ги внесува сегашните 8 категории и 64 производи од твоите HTML страници.

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  subtitle text,
  list_title text,
  image_url text,
  home_class text,
  hero_class text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  emoji text,
  image_url text,
  price int,
  tags text[] not null default '{}',
  badge text check (badge in ('hit','new')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists items_category_idx on public.items(category_id, sort_order);

alter table public.categories enable row level security;
alter table public.items enable row level security;

drop policy if exists "categories read" on public.categories;
create policy "categories read" on public.categories for select using (true);
drop policy if exists "categories admin write" on public.categories;
create policy "categories admin write" on public.categories for all
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "items read" on public.items;
create policy "items read" on public.items for select using (true);
drop policy if exists "items admin write" on public.items;
create policy "items admin write" on public.items for all
  using (public.is_admin()) with check (public.is_admin());

insert into public.categories (slug,name,subtitle,list_title,image_url,home_class,hero_class,sort_order) values
('kroasani','Кроасани','Свежи, маслени и пресни секое утро — печени со вистинска страст','Нашите Кроасани','svgs/Products/Krosan.svg',null,null,1),
('burek','Бурек','Традиционален бурек со хрскава кора, направен по старата рецептура','Нашите Бурек','svgs/Products/Burek.svg',null,null,2),
('slatki','Слатки','Рачно изработени слатки и колачи — за секоја посебна прилика','Нашите Слатки','svgs/Products/Slatki.svg',null,null,3),
('leb','Леб','Печен секое утро во нашата пекара — со природни состојки и без конзерванси','Нашите Лебови','svgs/Products/Leb.svg',null,null,4),
('kafe','Кафе','Специјалитет кафе од одбрани зрна — приготвено со прецизност и страст','Нашите Кафиња','svgs/Products/Kafe.svg','product-img--kafe',null,5),
('pica','Пица','Тенко тесто, домашен доматен сос и свежи состојки — пица на вистински начин','Нашите Пици','svgs/Products/Pica.svg','product-img--sm','cat-hero-icon--pica',6),
('sendvici','Сендвичи','Свежо направени, секој ден — со квалитетни состојки и домашен леб','Нашите Сендвичи','svgs/Products/Sendvich.svg',null,null,7),
('bageti','Багети','Француска традиција на ваша трпеза — хрскава кора и мека средина','Нашите Багети','svgs/Products/Bageti.svg',null,null,8)
on conflict (slug) do nothing;

insert into public.items (category_id,name,emoji,price,tags,badge,sort_order)
select * from (values
((select id from public.categories where slug='kroasani'),'Путер Кроасан','🥐',80,ARRAY['120г','Путер тесто']::text[],'hit',1),
((select id from public.categories where slug='kroasani'),'Чоколаден Кроасан','🍫',100,ARRAY['130г','Чоколадна пралина','Слатко']::text[],null,2),
((select id from public.categories where slug='kroasani'),'Бадем Кроасан','🌸',120,ARRAY['140г','Крем од бадем','Специјалитет']::text[],null,3),
((select id from public.categories where slug='kroasani'),'Шунка и Сирење','🧀',130,ARRAY['150г','Солено','Топено сирење']::text[],null,4),
((select id from public.categories where slug='kroasani'),'Јагода и Крем','🍓',110,ARRAY['125г','Крем сирење']::text[],'new',5),
((select id from public.categories where slug='kroasani'),'Спанаќ и Фета','🌿',115,ARRAY['145г','Вегетаријански','Фета сирење']::text[],null,6),
((select id from public.categories where slug='kroasani'),'Јајце и Авокадо','🥚',150,ARRAY['160г','Богат со протеини','Солено']::text[],null,7),
((select id from public.categories where slug='kroasani'),'Лимон Крем','🍋',105,ARRAY['120г','Лимон курд','Освежувачки']::text[],null,8),
((select id from public.categories where slug='burek'),'Бурек со Месо','🥩',90,ARRAY['250г','Говедско']::text[],'hit',1),
((select id from public.categories where slug='burek'),'Бурек со Сирење','🧀',80,ARRAY['220г','Свежо сирење','Класичен']::text[],null,2),
((select id from public.categories where slug='burek'),'Бурек со Спанаќ','🌿',85,ARRAY['230г','Вегетаријански','Здрав']::text[],null,3),
((select id from public.categories where slug='burek'),'Бурек со Компири','🥔',75,ARRAY['240г','Традиционален','Домашен']::text[],null,4),
((select id from public.categories where slug='burek'),'Бурек со Печурки','🍄',95,ARRAY['225г','Диви печурки']::text[],'new',5),
((select id from public.categories where slug='burek'),'Лута Пита со Кисело Зеље','🌶️',85,ARRAY['235г','Пикантно','Кисело зеље']::text[],null,6),
((select id from public.categories where slug='burek'),'Бурек со Праз','🧅',80,ARRAY['220г','Карамелизиран праз','Нежен']::text[],null,7),
((select id from public.categories where slug='burek'),'Мешан Бурек','🥗',100,ARRAY['260г','Мешани состојки']::text[],'hit',8),
((select id from public.categories where slug='slatki'),'Еклер','🍮',120,ARRAY['90г','Ванила крем']::text[],'hit',1),
((select id from public.categories where slug='slatki'),'Тирамису','🍰',180,ARRAY['150г','Маскарпоне','Италијански']::text[],null,2),
((select id from public.categories where slug='slatki'),'Профитроли','🧁',150,ARRAY['120г','Шлаг крем','Чоколада']::text[],null,3),
((select id from public.categories where slug='slatki'),'Наполеон Крем','🎂',160,ARRAY['160г','Лиснато тесто']::text[],'new',4),
((select id from public.categories where slug='slatki'),'Чоколадна Топка','🍫',130,ARRAY['100г','Ганаш','Интензивен']::text[],null,5),
((select id from public.categories where slug='slatki'),'Портокал Тарта','🍊',145,ARRAY['130г','Цитрус','Свеж']::text[],null,6),
((select id from public.categories where slug='slatki'),'Боровинки Чизкејк','🫐',190,ARRAY['180г','Маскарпоне','Сезонски']::text[],null,7),
((select id from public.categories where slug='slatki'),'Баклава','🌰',100,ARRAY['80г','Орев и мед','Традиционална']::text[],null,8),
((select id from public.categories where slug='leb'),'Бел Леб','🍞',60,ARRAY['500г','Класичен','Свеж']::text[],null,1),
((select id from public.categories where slug='leb'),'Интегрален Леб','🌾',75,ARRAY['500г','Полнозрнест','Здрав']::text[],null,2),
((select id from public.categories where slug='leb'),'Ржан Леб','🌑',80,ARRAY['450г','Темен','Карактеристичен']::text[],null,3),
((select id from public.categories where slug='leb'),'Фокача со Маслинки','🫒',120,ARRAY['350г','Маслиново масло']::text[],'new',4),
((select id from public.categories where slug='leb'),'Леб со Семки','🌱',90,ARRAY['480г','Мешани семки','Хранлив']::text[],null,5),
((select id from public.categories where slug='leb'),'Лук Лепче','🧄',55,ARRAY['120г','Путер и лук','Ароматичен']::text[],null,6),
((select id from public.categories where slug='leb'),'Симит','🌙',50,ARRAY['180г','Сусам','Традиционален']::text[],null,7),
((select id from public.categories where slug='leb'),'Мала Погача','🫓',70,ARRAY['300г','Маст и јогурт','Македонски']::text[],null,8),
((select id from public.categories where slug='kafe'),'Еспресо','☕',60,ARRAY['30мл','Интензивен','Основа']::text[],null,1),
((select id from public.categories where slug='kafe'),'Капучино','🥛',100,ARRAY['180мл','Пенесто млеко']::text[],'hit',2),
((select id from public.categories where slug='kafe'),'Кафе Лате','🍵',110,ARRAY['250мл','Пареа млеко','Нежен']::text[],null,3),
((select id from public.categories where slug='kafe'),'Американо','🫖',80,ARRAY['200мл','Разреден','Благ']::text[],null,4),
((select id from public.categories where slug='kafe'),'Матча Лате','🌿',130,ARRAY['250мл','Јапонски']::text[],'new',5),
((select id from public.categories where slug='kafe'),'Флат Вајт','🍦',110,ARRAY['160мл','Двоен еспресо','Концентриран']::text[],null,6),
((select id from public.categories where slug='kafe'),'Iced Latte','🧊',120,ARRAY['350мл','Студено','Освежувачки']::text[],null,7),
((select id from public.categories where slug='kafe'),'Мока','🍫',125,ARRAY['250мл','Чоколаден сироп','Слатко']::text[],null,8),
((select id from public.categories where slug='pica'),'Маргарита','🍕',280,ARRAY['400г','Моцарела','Класика']::text[],null,1),
((select id from public.categories where slug='pica'),'Пепероне','🌶️',320,ARRAY['430г','Пикантна']::text[],'hit',2),
((select id from public.categories where slug='pica'),'Капричоза','🍄',310,ARRAY['450г','Шунка и печурки','Класична']::text[],null,3),
((select id from public.categories where slug='pica'),'Четири Сирења','🧀',350,ARRAY['440г','Горгонзола','Интензивна']::text[],null,4),
((select id from public.categories where slug='pica'),'Вегетаријанска','🥦',290,ARRAY['420г','Сезонски зеленчук']::text[],'new',5),
((select id from public.categories where slug='pica'),'Пица со Пилешко','🐔',330,ARRAY['460г','Бел сос','Сочна']::text[],null,6),
((select id from public.categories where slug='pica'),'Бекон Специјал','🥓',340,ARRAY['450г','Карамелизиран кромид','Специјал']::text[],null,7),
((select id from public.categories where slug='pica'),'Труфла и Рукола','🌿',400,ARRAY['430г','Луксузна','Труфла сос']::text[],null,8),
((select id from public.categories where slug='sendvici'),'Клуб Сендвич','🥪',220,ARRAY['280г','Три слоеви']::text[],'hit',1),
((select id from public.categories where slug='sendvici'),'Пилешки Сендвич','🐔',200,ARRAY['260г','Авокадо','Свеж']::text[],null,2),
((select id from public.categories where slug='sendvici'),'Вегетаријански','🥗',175,ARRAY['240г','Хумус','Здрав']::text[],null,3),
((select id from public.categories where slug='sendvici'),'Тост со Шунка и Сирење','🧀',160,ARRAY['220г','Топол']::text[],'new',4),
((select id from public.categories where slug='sendvici'),'Говедски Сендвич','🥩',250,ARRAY['300г','Говедско','Богат']::text[],null,5),
((select id from public.categories where slug='sendvici'),'Јајце Сендвич','🥚',150,ARRAY['210г','Мешани јајца','Брз']::text[],null,6),
((select id from public.categories where slug='sendvici'),'Туна Мелт','🐟',185,ARRAY['250г','Туна и сирење','Топол']::text[],null,7),
((select id from public.categories where slug='sendvici'),'Вегански Рап','🌯',165,ARRAY['230г','100% Растителен','Тахини']::text[],null,8),
((select id from public.categories where slug='bageti'),'Класичен Багет','🥖',80,ARRAY['300г','Француски','Класика']::text[],null,1),
((select id from public.categories where slug='bageti'),'Интегрален Багет','🌑',90,ARRAY['300г','Полнозрнест','Здрав']::text[],null,2),
((select id from public.categories where slug='bageti'),'Багет со Рузмарин','🌿',95,ARRAY['310г','Маслиново масло','Ароматичен']::text[],null,3),
((select id from public.categories where slug='bageti'),'Со Маслинки','⬛',105,ARRAY['320г','Сушени домати']::text[],'hit',4),
((select id from public.categories where slug='bageti'),'Со Сусам и Семки','🌱',88,ARRAY['305г','Мешани семки','Хрскав']::text[],null,5),
((select id from public.categories where slug='bageti'),'Лук Багет','🧄',100,ARRAY['320г','Свеж лук']::text[],'new',6),
((select id from public.categories where slug='bageti'),'Паризиен Сендвич','🧀',160,ARRAY['280г','Свежо сирење','Класичен']::text[],null,7),
((select id from public.categories where slug='bageti'),'Кростини Сет','🍷',150,ARRAY['200г','Аперитив','Домати']::text[],null,8)
) as v(category_id,name,emoji,price,tags,badge,sort_order)
where not exists (select 1 from public.items);
