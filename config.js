// Пополни ги овие две вредности од Supabase -> Project Settings -> API
window.CMS_CONFIG = {
  SUPABASE_URL: 'https://fknpgzxkbrxdktssyhhv.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_B3xOfsJ2xqPXTExNaS-RoA_0V7teQKu',
  BUCKET: 'site-images'
};

// Листа на слики што можат да се менуваат од админ панелот.
// key = data-img во HTML, def = оригиналната слика.
window.SITE_IMAGES = [
  {
    "key": "logo",
    "label": "Лого",
    "def": "svgs/Logo.svg"
  },
  {
    "key": "quality",
    "label": "Картичка: Квалитет",
    "def": "svgs/Quality.svg"
  },
  {
    "key": "tradition",
    "label": "Картичка: Традиција",
    "def": "svgs/Tradition.svg"
  },
  {
    "key": "prod-kroasani",
    "label": "Продукт: Кроасани",
    "def": "svgs/Products/Krosan.svg"
  },
  {
    "key": "prod-burek",
    "label": "Продукт: Бурек",
    "def": "svgs/Products/Burek.svg"
  },
  {
    "key": "prod-slatki",
    "label": "Продукт: Слатки",
    "def": "svgs/Products/Slatki.svg"
  },
  {
    "key": "prod-leb",
    "label": "Продукт: Леб",
    "def": "svgs/Products/Leb.svg"
  },
  {
    "key": "prod-kafe",
    "label": "Продукт: Кафе",
    "def": "svgs/Products/Kafe.svg"
  },
  {
    "key": "prod-pica",
    "label": "Продукт: Пица",
    "def": "svgs/Products/Pica.svg"
  },
  {
    "key": "prod-sendvici",
    "label": "Продукт: Сендвичи",
    "def": "svgs/Products/Sendvich.svg"
  },
  {
    "key": "prod-bageti",
    "label": "Продукт: Багети",
    "def": "svgs/Products/Bageti.svg"
  },
  {
    "key": "about-hero",
    "label": "За нас: голема слика",
    "def": "frames/All (1).webp"
  },
  {
    "key": "about-1",
    "label": "За нас: Со што се занимаваме",
    "def": "frames/All (25).webp"
  },
  {
    "key": "about-2",
    "label": "За нас: Кои сме ние",
    "def": "frames/All (50).webp"
  },
  {
    "key": "about-3",
    "label": "За нас: Нашата цел",
    "def": "frames/All (65).webp"
  },
  {
    "key": "novosti-bg",
    "label": "Новости: позадина",
    "def": "frames/All (38).webp"
  }
];
