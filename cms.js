(function () {
  const L = window.CMS_LANG || { lang:'mk', pick:(a) => a, t:(a) => a, date:(s) => { const d = new Date(s); return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear(); } };
  const A = L.a || ((mk, en) => L.pick(mk, en));
  const C = window.CMS_CONFIG;
  if (!C || !window.supabase || C.SUPABASE_URL.startsWith('YOUR')) return;
  const sb = window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY);

  // 1) Слики од админ панелот
  (async () => {
    try {
      const { data } = await sb.from('site_images').select('key,url');
      const map = Object.fromEntries((data || []).map(r => [r.key, r.url]));
      document.querySelectorAll('img[data-img]').forEach(img => {
        const url = map[img.dataset.img];
        if (url) img.src = url;
      });
    } catch (e) { console.warn('images', e); }
  })();

  // 2) Контакт форма -> табела messages
  const form = document.querySelector('.contact-form');
  if (form) {
    const trap = document.createElement('input');
    trap.type = 'text'; trap.name = 'website'; trap.tabIndex = -1; trap.autocomplete = 'off';
    trap.style.cssText = 'position:absolute;left:-9999px;opacity:0;height:0';
    form.appendChild(trap);

    const status = document.createElement('p');
    status.setAttribute('role', 'status');
    form.appendChild(status);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (trap.value) return; // бот
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      status.textContent = L.t('Се испраќа...', 'Sending...');
      const { error } = await sb.from('messages').insert({
        name: form.ime.value.trim(),
        phone: form.mobilen.value.trim() || null,
        email: form.email.value.trim(),
        message: form.poraka.value.trim()
      });
      btn.disabled = false;
      if (error) { status.textContent = L.t('Не успеа. Обиди се повторно или јави ни се по телефон.', 'Failed. Please try again or call us.'); return; }
      form.reset();
      status.textContent = L.t('Пораката е испратена. Ќе ти се јавиме наскоро.', 'Message sent. We will get back to you soon.');
    });
  }

  // 3) Блог (novosti.html): контејнер #blog-list
  const list = document.getElementById('blog-list');
  if (list) {
    const fmt = s => L.date(s);
    (async () => {
      const { data, error } = await sb.from('posts').select('*').order('created_at', { ascending: false });
      if (error || !data.length) return; // останува тоа што е во HTML
      list.innerHTML = '';
      data.forEach(p => {
        const art = document.createElement('article');
        art.className = 'novosti-post';
        if (p.image_url) {
          const wrap = document.createElement('div');
          wrap.className = 'novosti-post-img-wrap';
          const im = document.createElement('img');
          im.src = p.image_url; im.alt = ''; im.loading = 'lazy';
          wrap.appendChild(im); art.appendChild(wrap);
        } else {
          art.style.gridTemplateColumns = '1fr';
        }
        const body = document.createElement('div'); body.className = 'novosti-post-body';
        const date = document.createElement('span'); date.className = 'novosti-post-date'; date.textContent = fmt(p.created_at);
        const h = document.createElement('h2'); h.textContent = L.pick(p.title, p.title_en);
        const t = document.createElement('p'); t.textContent = L.pick(p.body, p.body_en); t.style.whiteSpace = 'pre-line';
        body.append(date, h, t); art.appendChild(body);
        list.appendChild(art);
      });
    })();
  }

  // 4) Мени: категории и производи од базата
  const base = document.body.dataset.base || '';
  const asset = u => !u ? '' : (/^(https?:|data:)/.test(u) ? u : base + u);
  const grid = document.querySelector('.product-grid');
  const isCat = document.body.dataset.menu === 'category';
  if (grid || isCat) {
    const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
    (async () => {
      const { data: cats, error } = await sb.from('categories').select('*').order('sort_order');
      if (error || !cats || !cats.length) {
        if (error) console.error('Мени:', error);
        if (isCat) document.getElementById('item-list').textContent = L.t('Менито не може да се вчита.', 'The menu could not be loaded.');
        return;
      }
      const cn = c => A(c.name, c.name_en);
      const link = c => (grid ? 'products/' : '') + 'kategorija.html?c=' + encodeURIComponent(c.slug);

      if (grid) {
        grid.innerHTML = '';
        cats.forEach(c => {
          const a = el('a', 'product-card'); a.href = link(c);
          const w = el('div', 'product-shape-wrapper');
          if (c.image_url) {
            const im = el('img', 'product-img' + (c.home_class ? ' ' + c.home_class : ''));
            im.src = asset(c.image_url); im.alt = cn(c); w.appendChild(im);
          }
          w.appendChild(el('div', 'product-shape'));
          a.append(w, el('span', null, cn(c)));
          grid.appendChild(a);
        });
      }

      if (isCat) {
        const slug = new URLSearchParams(location.search).get('c');
        const cat = cats.find(c => c.slug === slug) || cats[0];
        document.title = cn(cat) + ' — Crust & Bean';
        const nav = document.getElementById('cat-links');
        cats.forEach(c => { const a = el('a', 'cat-toolbar-link' + (c.id === cat.id ? ' active' : ''), cn(c)); a.href = link(c); nav.appendChild(a); });
        const icon = document.getElementById('cat-icon');
        if (cat.image_url) { icon.src = asset(cat.image_url); icon.alt = cn(cat); } else icon.style.display = 'none';
        icon.className = 'cat-hero-icon' + (cat.hero_class ? ' ' + cat.hero_class : '');
        document.getElementById('cat-name').textContent = cn(cat);
        document.getElementById('cat-sub').textContent = A(cat.subtitle || '', cat.subtitle_en);
        document.getElementById('cat-list-title').textContent = A(cat.list_title || '', cat.list_title_en);
        const box = document.getElementById('item-list');
        const { data: items, error: e2 } = await sb.from('items').select('*').eq('category_id', cat.id).order('sort_order');
        if (e2) { box.textContent = L.t('Производите не можат да се вчитаат.', 'The products could not be loaded.'); return; }
        if (!items.length) { box.textContent = L.t('Нема производи уште.', 'No products yet.'); return; }
        const board = el('div', 'menu-board');
        items.forEach(it => {
          const art = el('article', 'menu-item');
          const head = el('div', 'menu-item-head');
          const name = el('h3', 'menu-item-name', A(it.name, it.name_en));
          if (it.badge) name.appendChild(el('span', 'menu-badge menu-badge--' + it.badge, it.badge === 'hit' ? L.t('Хит', 'Hit') : L.t('Ново', 'New')));
          head.appendChild(name);
          if (it.price != null) {
            head.append(el('span', 'menu-item-dots'), el('span', 'menu-item-price', it.price + L.t(' ден.', ' MKD')));
          }
          art.appendChild(head);
          const tags = (L.lang === 'en' && it.tags_en && it.tags_en.length) ? it.tags_en : (it.tags || []).map(t => A(t));
          if (tags.length) art.appendChild(el('p', 'menu-item-desc', tags.join(' · ')));
          board.appendChild(art);
        });
        box.appendChild(board);
      }
    })();
  }

  // 5) За нас: наслов и блокови од базата
  const about = document.querySelector('.section-about');
  if (about) {
    (async () => {
      const [t, b] = await Promise.all([
        sb.from('site_texts').select('key,value').in('key', ['about-title', 'about-title.en']),
        sb.from('about_blocks').select('*').order('sort_order')
      ]);
      if (!t.error && t.data) { const m = Object.fromEntries(t.data.map(r => [r.key, r.value])); const v = L.pick(m['about-title'], m['about-title.en']); const h = about.querySelector('.about-hero-title'); if (h && v) h.textContent = v; }
      if (b.error) { console.error('За нас:', b.error); return; } // останува HTML-от
      const mk = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
      about.querySelectorAll('.about-block').forEach(n => n.remove());
      b.data.forEach((bl, i) => {
        const blk = mk('div', 'about-block');
        const tx = mk('div', 'about-block-text');
        const p = mk('p', null, L.pick(bl.body, bl.body_en)); p.style.whiteSpace = 'pre-line';
        tx.append(mk('span', 'about-block-label', L.pick(bl.label, bl.label_en)), p);
        let im = null;
        if (bl.image_url) {
          im = mk('div', 'about-block-img');
          const img = document.createElement('img'); img.src = asset(bl.image_url); img.alt = ''; img.loading = 'lazy';
          im.appendChild(img);
        }
        if (i % 2 === 0 || !im) blk.append(tx, ...(im ? [im] : [])); else blk.append(im, tx);
        about.appendChild(blk);
      });
    })();
  }
})();
