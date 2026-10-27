(function () {
  var KEY = 'cb-lang', lang = 'mk';
  try { lang = localStorage.getItem(KEY) === 'en' ? 'en' : 'mk'; } catch (e) {}
  var DICT = {
 "Почетна": "Home",
 "Мени": "Menu",
 "За нас": "About us",
 "Контакт": "Contact",
 "зголемено": "increased",
 "уживање": "enjoyment",
 "Нови": "New",
 "Вкусови": "Flavors",
 "Квалитет": "Quality",
 "Користиме само состојки од највисок квалитет, внимателно одбрани за секој производ. Секој залак е гаранција за вкус без компромис.": "We use only top-quality ingredients, carefully selected for every product. Every bite is a guarantee of flavor without compromise.",
 "Традиција": "Tradition",
 "Нашите рецепти се пренесуваат низ генерации, со почит кон традицијата. Секој производ носи во себе приказна стара колку и самиот вкус.": "Our recipes are passed down through generations, with respect for tradition. Every product carries a story as old as the flavor itself.",
 "Продукти": "Products",
 "Кроасани": "Croissants",
 "Бурек": "Burek",
 "Слатки": "Sweets",
 "Леб": "Bread",
 "Кафе": "Coffee",
 "Пица": "Pizza",
 "Сендвичи": "Sandwiches",
 "Багети": "Baguettes",
 "За Нас": "About Us",
 "Со што се занимаваме": "What we do",
 "Печеме секој ден — кроасани, бурек, леб, пица, сендвичи. Сè свежо, сè направено тука. Нема ланец, нема фабрика. Само пеќ, раце и рецепт кој работи.": "We bake every day — croissants, burek, bread, pizza, sandwiches. Everything fresh, everything made here. No chain, no factory. Just an oven, hands and a recipe that works.",
 "Кои сме ние": "Who we are",
 "Семејна пекара од 2006. Почнавме со еден фурун и две раце. Денес сме поголем тим — но истата екипа, ист принцип: влезеш гладен, излезеш задоволен.": "A family bakery since 2006. We started with one oven and two hands. Today we are a bigger team — but the same crew, the same principle: you walk in hungry, you leave satisfied.",
 "Нашата цел": "Our goal",
 "Да бидеме местото каде што луѓето доаѓаат секое утро — не затоа што мораат, туку затоа што сакаат. Добар производ, добра атмосфера, без излишности.": "To be the place people come to every morning — not because they have to, but because they want to. Good product, good atmosphere, nothing unnecessary.",
 "Блог": "Blog",
 "Новости": "News",
 "Име": "Name",
 "Телефонски број": "Phone number",
 "(опционално)": "(optional)",
 "Емаил": "Email",
 "Порака": "Message",
 "Испрати": "Send",
 "Свежо печено. Секој ден.": "Freshly baked. Every day.",
 "Работно Време": "Opening hours",
 "Понеделник — Петок": "Monday — Friday",
 "Сабота": "Saturday",
 "Недела": "Sunday",
 "Следи нè": "Follow us",
 "© 2026 Crust & Bean | Сите права задржани": "© 2026 Crust & Bean | All rights reserved",
 "Новости — Crust & Bean": "News — Crust & Bean",
 "Приказни, рецепти и вести од пекарата": "Stories, recipes and news from the bakery",
 "24 август 2026": "24 August 2026",
 "Зошто нашиот кроасан се прави 3 дена?": "Why does our croissant take 3 days to make?",
 "Путер тестото бара време. Не може да се забрза, не може да се прескокне. Еве зошто вредат секоја минута.": "Butter dough takes time. It can't be rushed, it can't be skipped. Here's why every minute is worth it.",
 "Прочитај →": "Read →",
 "12 август 2026": "12 August 2026",
 "Новото летно мени е тука": "The new summer menu is here",
 "Iced latte, лесни сендвичи и сезонска тарта со малини. Сè за жешките денови.": "Iced latte, light sandwiches and a seasonal raspberry tart. Everything for the hot days.",
 "3 јули 2026": "3 July 2026",
 "Кафето што го пиеме — и зошто е важно": "The coffee we drink — and why it matters",
 "Зрната доаѓаат од Етиопија. Пржено локално. Секоја шолја е различна — и тоа е поентата.": "The beans come from Ethiopia. Roasted locally. Every cup is different — and that's the point.",
 "18 јуни 2026": "18 June 2026",
 "20 години пекара — еден ден изнутра": "20 years of bakery — a day on the inside",
 "Почнавме во 2006 со еден фурун. Денес пристигнуваме во 4 наутро, секој ден. Еве како изгледа.": "We started in 2006 with one oven. Today we arrive at 4 in the morning, every day. Here's what it looks like.",
 "© 2026 Crust & Bean. Сите права задржани.": "© 2026 Crust & Bean. All rights reserved.",
 "Мени — Crust & Bean": "Menu — Crust & Bean",
 "назад": "back",
 "Назад кон Продукти": "Back to Products"
};
  var norm = function (s) { return String(s).replace(/\s+/g, ' ').trim(); };
  var AUTO = {"Путер Кроасан": "Butter Croissant", "Путер тесто": "Butter dough", "Чоколаден Кроасан": "Chocolate Croissant", "Чоколадна пралина": "Chocolate praline", "Слатко": "Sweet", "Бадем Кроасан": "Almond Croissant", "Крем од бадем": "Almond cream", "Специјалитет": "Specialty", "Шунка и Сирење": "Ham & Cheese", "Солено": "Savory", "Топено сирење": "Melted cheese", "Јагода и Крем": "Strawberry & Cream", "Крем сирење": "Cream cheese", "Спанаќ и Фета": "Spinach & Feta", "Вегетаријански": "Vegetarian", "Фета сирење": "Feta cheese", "Јајце и Авокадо": "Egg & Avocado", "Богат со протеини": "High in protein", "Лимон Крем": "Lemon Cream", "Лимон курд": "Lemon curd", "Освежувачки": "Refreshing", "Бурек со Месо": "Meat Burek", "Говедско": "Beef", "Бурек со Сирење": "Cheese Burek", "Свежо сирење": "Fresh cheese", "Класичен": "Classic", "Бурек со Спанаќ": "Spinach Burek", "Здрав": "Healthy", "Бурек со Компири": "Potato Burek", "Традиционален": "Traditional", "Домашен": "Homemade", "Бурек со Печурки": "Mushroom Burek", "Диви печурки": "Wild mushrooms", "Лута Пита со Кисело Зеље": "Spicy Pie with Sauerkraut", "Пикантно": "Spicy", "Кисело зеље": "Sauerkraut", "Бурек со Праз": "Leek Burek", "Карамелизиран праз": "Caramelized leek", "Нежен": "Tender", "Мешан Бурек": "Mixed Burek", "Мешани состојки": "Mixed fillings", "Еклер": "Éclair", "Ванила крем": "Vanilla cream", "Тирамису": "Tiramisu", "Маскарпоне": "Mascarpone", "Италијански": "Italian", "Профитроли": "Profiteroles", "Шлаг крем": "Whipped cream", "Чоколада": "Chocolate", "Наполеон Крем": "Napoleon Cream Cake", "Лиснато тесто": "Puff pastry", "Чоколадна Топка": "Chocolate Ball", "Ганаш": "Ganache", "Интензивен": "Intense", "Портокал Тарта": "Orange Tart", "Цитрус": "Citrus", "Свеж": "Fresh", "Боровинки Чизкејк": "Blueberry Cheesecake", "Сезонски": "Seasonal", "Баклава": "Baklava", "Орев и мед": "Walnut & honey", "Традиционална": "Traditional", "Бел Леб": "White Bread", "Интегрален Леб": "Whole Grain Bread", "Полнозрнест": "Whole grain", "Ржан Леб": "Rye Bread", "Темен": "Dark", "Карактеристичен": "Distinctive", "Фокача со Маслинки": "Olive Focaccia", "Маслиново масло": "Olive oil", "Леб со Семки": "Seeded Bread", "Мешани семки": "Mixed seeds", "Хранлив": "Nutritious", "Лук Лепче": "Garlic Bun", "Путер и лук": "Butter & garlic", "Ароматичен": "Aromatic", "Симит": "Simit", "Сусам": "Sesame", "Мала Погача": "Small Pogača", "Маст и јогурт": "Lard & yogurt", "Македонски": "Macedonian", "Еспресо": "Espresso", "Основа": "Base", "Капучино": "Cappuccino", "Пенесто млеко": "Frothed milk", "Кафе Лате": "Café Latte", "Пареа млеко": "Steamed milk", "Американо": "Americano", "Разреден": "Diluted", "Благ": "Mild", "Матча Лате": "Matcha Latte", "Јапонски": "Japanese", "Флат Вајт": "Flat White", "Двоен еспресо": "Double espresso", "Концентриран": "Concentrated", "Iced Latte": "Iced Latte", "Студено": "Cold", "Мока": "Mocha", "Чоколаден сироп": "Chocolate syrup", "Маргарита": "Margherita", "Моцарела": "Mozzarella", "Класика": "Classic", "Пепероне": "Pepperoni", "Пикантна": "Spicy", "Капричоза": "Capricciosa", "Шунка и печурки": "Ham & mushrooms", "Класична": "Classic", "Четири Сирења": "Four Cheese", "Горгонзола": "Gorgonzola", "Интензивна": "Intense", "Вегетаријанска": "Vegetarian", "Сезонски зеленчук": "Seasonal vegetables", "Пица со Пилешко": "Chicken Pizza", "Бел сос": "White sauce", "Сочна": "Juicy", "Бекон Специјал": "Bacon Special", "Карамелизиран кромид": "Caramelized onion", "Специјал": "Special", "Труфла и Рукола": "Truffle & Arugula", "Луксузна": "Luxurious", "Труфла сос": "Truffle sauce", "Клуб Сендвич": "Club Sandwich", "Три слоеви": "Three layers", "Пилешки Сендвич": "Chicken Sandwich", "Авокадо": "Avocado", "Хумус": "Hummus", "Тост со Шунка и Сирење": "Ham & Cheese Toast", "Топол": "Hot", "Говедски Сендвич": "Beef Sandwich", "Богат": "Hearty", "Јајце Сендвич": "Egg Sandwich", "Мешани јајца": "Scrambled eggs", "Брз": "Quick", "Туна Мелт": "Tuna Melt", "Туна и сирење": "Tuna & cheese", "Вегански Рап": "Vegan Wrap", "100% Растителен": "100% plant-based", "Тахини": "Tahini", "Класичен Багет": "Classic Baguette", "Француски": "French", "Интегрален Багет": "Whole Grain Baguette", "Багет со Рузмарин": "Rosemary Baguette", "Со Маслинки": "With Olives", "Сушени домати": "Sun-dried tomatoes", "Со Сусам и Семки": "With Sesame & Seeds", "Хрскав": "Crispy", "Лук Багет": "Garlic Baguette", "Свеж лук": "Fresh garlic", "Паризиен Сендвич": "Parisian Sandwich", "Кростини Сет": "Crostini Set", "Аперитив": "Appetizer", "Домати": "Tomatoes", "Кроасани": "Croissants", "Свежи, маслени и пресни секое утро — печени со вистинска страст": "Fresh, buttery and baked new every morning — made with real passion", "Нашите Кроасани": "Our Croissants", "Бурек": "Burek", "Традиционален бурек со хрскава кора, направен по старата рецептура": "Traditional burek with a crispy crust, made using the old recipe", "Нашите Бурек": "Our Burek", "Слатки": "Sweets", "Рачно изработени слатки и колачи — за секоја посебна прилика": "Handmade sweets and cakes — for every special occasion", "Нашите Слатки": "Our Sweets", "Леб": "Bread", "Печен секое утро во нашата пекара — со природни состојки и без конзерванси": "Baked every morning in our bakery — with natural ingredients and no preservatives", "Нашите Лебови": "Our Breads", "Кафе": "Coffee", "Специјалитет кафе од одбрани зрна — приготвено со прецизност и страст": "Specialty coffee from selected beans — prepared with precision and passion", "Нашите Кафиња": "Our Coffees", "Пица": "Pizza", "Тенко тесто, домашен доматен сос и свежи состојки — пица на вистински начин": "Thin dough, homemade tomato sauce and fresh ingredients — pizza done right", "Нашите Пици": "Our Pizzas", "Сендвичи": "Sandwiches", "Свежо направени, секој ден — со квалитетни состојки и домашен леб": "Freshly made every day — with quality ingredients and homemade bread", "Нашите Сендвичи": "Our Sandwiches", "Багети": "Baguettes", "Француска традиција на ваша трпеза — хрскава кора и мека средина": "French tradition on your table — crispy crust and soft inside", "Нашите Багети": "Our Baguettes"};
  var autoT = function (s) {
    var k = norm(s || ''), m = k.match(/^(\d+)\s*(г|мл)$/);
    if (m) return m[1] + (m[2] === 'г' ? 'g' : 'ml');
    return AUTO[k] || '';
  };
  var MONTHS = {
    mk: ['јануари','февруари','март','април','мај','јуни','јули','август','септември','октомври','ноември','декември'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December']
  };
  window.CMS_LANG = {
    lang: lang,
    pick: function (mk, en) { return lang === 'en' && en ? en : mk; },
    t: function (mk, en) { return lang === 'en' ? en : mk; },
    a: function (mk, en) { if (lang !== 'en') return mk; return en || autoT(mk) || mk; },
    date: function (s) { var d = new Date(s); return d.getDate() + ' ' + MONTHS[lang][d.getMonth()] + ' ' + d.getFullYear(); }
  };
  document.documentElement.lang = lang === 'en' ? 'en' : 'mk';


  function translateStatic() {
    if (lang !== 'en') return;
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        return (p === 'SCRIPT' || p === 'STYLE') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(function (n) {
      var k = norm(n.nodeValue);
      if (k && DICT[k]) {
        var lead = n.nodeValue.match(/^\s*/)[0], trail = n.nodeValue.match(/\s*$/)[0];
        n.nodeValue = lead + DICT[k] + trail;
      }
    });
    document.querySelectorAll('[alt],[title],[placeholder],[aria-label]').forEach(function (el) {
      ['alt', 'title', 'placeholder', 'aria-label'].forEach(function (a) {
        var v = el.getAttribute(a);
        if (v && DICT[norm(v)]) el.setAttribute(a, DICT[norm(v)]);
      });
    });
    var t = norm(document.title);
    if (DICT[t]) document.title = DICT[t];
  }

  function addToggle() {
    var ul = document.querySelector('header nav ul');
    if (!ul) return;
    var css = document.createElement('style');
    css.textContent = '.lang-li{display:flex;align-items:center}' +
      '.lang-toggle{font:inherit;color:inherit;background:transparent;border:1.5px solid currentColor;border-radius:20px;padding:.15rem .75rem;cursor:pointer;line-height:1.4}' +
      '.lang-toggle:hover{opacity:.7}';
    document.head.appendChild(css);
    var li = document.createElement('li'); li.className = 'lang-li';
    var b = document.createElement('button'); b.type = 'button'; b.className = 'lang-toggle';
    b.textContent = lang === 'en' ? 'МК' : 'EN';
    b.setAttribute('aria-label', lang === 'en' ? 'Префрли на македонски' : 'Switch to English');
    b.onclick = function () {
      try { localStorage.setItem(KEY, lang === 'en' ? 'mk' : 'en'); } catch (e) {}
      location.reload();
    };
    li.appendChild(b); ul.appendChild(li);
  }

  function init() { translateStatic(); addToggle(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
