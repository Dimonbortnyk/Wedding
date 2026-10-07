/**
 * Every visible string on the site, keyed per language.
 *
 * - English (`en`) is the reference: any key missing in another language falls back to it.
 * - Static markup is bound with `data-i18n="some.key"` (text) or
 *   `data-i18n-attr="aria-label:some.key"` (attributes) in index.html.
 * - `{name}`-style tokens are filled in by `t(key, { name: '…' })`.
 */
import { CONFIG } from './config.js';

const STORAGE_KEY = 'wedding.lang';

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', locale: 'en-GB' },
  { code: 'es', label: 'ES', name: 'Español', locale: 'es-ES' },
  { code: 'lt', label: 'LT', name: 'Lietuvių', locale: 'lt-LT' },
  { code: 'uk', label: 'UA', name: 'Українська', locale: 'uk-UA' },
];

/* ───────────────────────────── English ───────────────────────────── */

const en = {
  meta: {
    title: 'Ugne & Dimon — 7 August 2027',
    description:
      'Ugne and Dimon are getting married on 7 August 2027 at Babtyno dvaras, near Kaunas, Lithuania. The day, the menu, travel and RSVP.',
  },
  a11y: {
    skip: 'Skip to content',
    home: 'Ugne & Dimon — back to top',
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    photoPending: 'Photo coming soon',
  },
  nav: {
    story: 'Our Story',
    day: 'The Day',
    menu: 'Menu',
    travel: 'Travel',
    rsvp: 'RSVP',
    gifts: 'Gifts',
  },
  hero: {
    alt: 'Ugne and Dimon',
    eyebrow: 'Together with their families',
    and: 'and',
    day: 'Seventh of August',
    year: 'Two Thousand Twenty Seven',
    place: 'Babtyno dvaras • Kaunas, Lithuania',
    scroll: 'Scroll to our story',
  },
  story: {
    label: 'How it all began',
    title: 'Our Story',
    quote: 'We said “I love you” in every language we knew — and it meant the same in each one.',
    items: {
      barcelona: {
        place: 'Barcelona',
        title: 'A walk, a recipe, a kiss',
        text: 'Their love story began beneath the Arc de Triomf in Barcelona. They ended up getting lost through the streets of El Born, talking about their favourite recipes and food, until Dimon stole a kiss from Ugne — the start of a magical night full of spontaneity.',
        alt: 'Ugne and Dimon in Barcelona',
      },
      bologna: {
        place: 'Bologna, Italy',
        title: 'In every language',
        text: 'They travelled together to Bologna for two nights full of adventure, with a hint of love and romance already in the air. At the Torre dell’Orologio, with nobody else around, they said “I love you” in every language they could.',
        alt: 'Ugne and Dimon in Bologna',
      },
      trakai: {
        place: 'Trakai, Lithuania',
        title: 'The question by the lake',
        text: 'They travelled to Lithuania to celebrate the birthday of Ingrida, Ugne’s mother — a very special celebration, but there were other plans too, this time for Ugne. The weather in Trakai was beautiful; Dimon was very nervous, but beside a stunning lake he finally asked Ugne to marry him.',
        alt: 'Ugne and Dimon by the lake in Trakai',
      },
      forever: {
        place: 'Kaunas',
        title: 'Forever begins',
        text: 'Forever begins at Babtyno dvaras, surrounded by family and friends from every corner of Europe.',
        alt: 'Ugne and Dimon',
      },
    },
  },
  cultures: {
    label: 'Lithuania • Ukraine • Barcelona',
    title: 'Two Cultures, One Table',
    intro:
      'Lithuania and Ukraine greet newlyweds in the same way: with bread and salt, so that their home is never without either. Our day weaves the two traditions together — and raises a glass to Barcelona, where it all began.',
    lt: {
      title: 'Rye bread & straw gardens',
      text: 'Dark rye bread and salt at the door, offered by the parents. Above the table, the “sodas” — a garden woven from straw that brings harmony to a home, and the shape behind the ornaments on this site. For dessert, a towering šakotis.',
    },
    ua: {
      title: 'Rushnyk & korovai',
      text: 'A rushnyk — an embroidered cloth that carries a family’s blessing — and the korovai, a wedding bread crowned with dough birds and ears of wheat, shared with every guest for good fortune.',
    },
    bcn: {
      title: 'A toast of cava',
      text: 'A first walk through El Born became a first kiss. We toast it with cava from the hills outside the city — and the little flower from Barcelona’s pavements is hiding in our ornaments too.',
    },
  },
  countdown: {
    label: 'Counting down to',
    title: 'The Big Day',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    date: 'August 7, 2027 • Kaunas, Lithuania',
    today: 'Today is the day!',
    after: 'We said yes! Thank you for celebrating with us.',
  },
  programme: {
    label: 'The celebration',
    title: 'The Day',
    intro: 'From the first hello to the last dance — here is how the day will unfold.',
    tbc: 'Times to be confirmed',
    momentsTitle: 'The main moments',
    steps: {
      arrival: {
        title: 'Arrival & welcome',
        desc: 'Find your way to Babtyno dvaras, say your hellos and settle in with something cool to drink.',
        where: 'Manor courtyard',
      },
      ceremony: {
        title: 'The ceremony',
        desc: 'We say “yes”, surrounded by the people we love most.',
        where: 'Manor park',
        highlight: 'We say yes',
      },
      breadSalt: {
        title: 'Bread & salt',
        desc: 'The traditional welcome of the newlyweds — a custom Lithuania and Ukraine share.',
        where: 'Manor steps',
      },
      cava: {
        title: 'Cava toast, canapés & photos',
        desc: 'A glass of cava for Barcelona, something to nibble and plenty of photos in the gardens.',
        where: 'The gardens',
        highlight: 'A toast to Barcelona',
      },
      banquet: {
        title: 'The banquet',
        desc: 'Dinner from both our kitchens, with a few toasts along the way.',
        where: 'Banquet hall',
        highlight: 'Two cuisines, one table',
      },
      firstDance: {
        title: 'First dance',
        desc: 'We open the dance floor — then it is all yours.',
        where: 'Banquet hall',
      },
      party: {
        title: 'The party',
        desc: 'Dancing until late, with a midnight snack to keep you going.',
        where: 'Banquet hall',
        highlight: 'Dancing until late',
      },
    },
    notes: {
      dress: {
        label: 'Dress code',
        title: 'Elegant summer attire',
        text: 'Light fabrics and garden-friendly shoes — part of the day is out on the lawn.',
      },
      kids: {
        label: 'Children',
        title: 'To be confirmed',
        text: 'We are still working out the details and will share them here soon.',
      },
      plusOnes: {
        label: 'Plus-ones',
        title: 'To be confirmed',
        text: 'Your invitation will name everyone we are expecting. Not sure? Just ask us.',
      },
    },
  },
  menu: {
    label: 'To eat & drink',
    title: 'The Menu',
    intro: 'Two kitchens side by side — Lithuanian and Ukrainian, with a little of Barcelona in the glass.',
    sample: 'Sample menu — final version coming soon',
    note: 'Allergies or dietary needs? Tell us in the RSVP and the kitchen will look after you.',
    noteLink: 'Go to the RSVP',
    tags: { V: 'Vegetarian', VG: 'Vegan', GF: 'Gluten-free' },
    courses: {
      welcome: { title: 'Welcome', note: 'Cava & canapés in the gardens' },
      starters: { title: 'Starters' },
      soup: { title: 'Soup', note: 'Two beetroot soups, one table' },
      main: { title: 'Main course' },
      dessert: { title: 'Dessert' },
      lateNight: { title: 'Late-night snack' },
    },
    items: {
      cava: { name: 'Cava brut nature', desc: 'From the Penedès hills outside Barcelona' },
      ryeCanape: { name: 'Dark rye, curd cheese & garden herbs', desc: 'Lithuanian rye bread with fresh varškė' },
      paAmbTomaquet: { name: 'Pa amb tomàquet', desc: 'Toasted bread rubbed with tomato and olive oil' },
      herring: { name: 'Baltic herring on rye', desc: 'With pickled onion and dill' },
      varenyky: { name: 'Varenyky bites', desc: 'Ukrainian dumplings with potato and caramelised onion' },
      cepelinai: { name: 'Little cepelinai', desc: 'Lithuanian potato dumplings with curd cheese and a wild mushroom sauce' },
      gardenSalad: { name: 'Summer garden salad', desc: 'Cucumber, radish, dill and cold-pressed sunflower oil' },
      saltibarsciai: { name: 'Šaltibarščiai', desc: 'Lithuania’s chilled pink beetroot soup with kefir, cucumber and dill' },
      borscht: { name: 'Ukrainian borscht', desc: 'Slow-cooked beetroot soup with garlic pampushky' },
      duck: { name: 'Roast duck with baked apples', desc: 'Buckwheat and a lingonberry sauce' },
      pikePerch: { name: 'Baltic pike-perch', desc: 'New potatoes, dill butter and summer greens' },
      holubtsi: { name: 'Mushroom & buckwheat holubtsi', desc: 'Ukrainian stuffed cabbage rolls in a tomato sauce' },
      sakotis: { name: 'Šakotis', desc: 'The Lithuanian “tree cake”, baked on a spit over an open fire' },
      korovai: { name: 'Korovai', desc: 'The Ukrainian wedding bread, shared with every guest' },
      cremaCatalana: { name: 'Crema catalana', desc: 'With summer berries' },
      potatoPancakes: { name: 'Potato pancakes', desc: 'Bulviniai blynai in Lithuania, deruny in Ukraine — with sour cream' },
      keptaDuona: { name: 'Kepta duona', desc: 'Fried garlic rye bread with a warm cheese sauce' },
    },
  },
  gallery: {
    label: 'Moments',
    title: 'Gallery',
    // Used for every photo unless `alts` has a description at that position.
    alt: 'Ugne and Dimon — photo {n}',
    alts: [],
    open: 'Open photo {n} of {total}',
    count: '{n} / {total}',
    close: 'Close gallery',
    prev: 'Previous photo',
    next: 'Next photo',
  },
  travel: {
    label: 'Getting there',
    title: 'Travel & Stay',
    intro: 'Babtyno dvaras is a manor estate in Babtai, about 24 km north of Kaunas, in the heart of Lithuania.',
    approx: 'Drive times are approximate — please check before you travel.',
    drive: 'about {time} by car',
    hourShort: 'h',
    minuteShort: 'min',
    soon: 'Coming soon',
    tipsTitle: 'Good to know',
    venue: {
      label: 'The venue',
      country: 'Lithuania',
      mapLink: 'Open in Google Maps',
      mapTitle: 'Map of Babtyno dvaras',
      alt: 'Babtyno dvaras manor',
    },
    airports: {
      kun: {
        name: 'Kaunas Airport',
        text: 'The closest airport, with direct flights from a number of European cities.',
      },
      vno: {
        name: 'Vilnius Airport',
        text: 'The capital’s airport, with the widest choice of flights. Trains and coaches link Vilnius and Kaunas.',
      },
    },
    stay: {
      title: 'Where to stay',
      text: 'We are putting together a list of hotels and guesthouses in and around Kaunas, for every budget.',
    },
    shuttle: {
      title: 'Shuttle',
      text: 'We are looking into a shuttle between Kaunas and the venue. Tell us in the RSVP if you would use it.',
    },
    tips: {
      currency: { title: 'Currency', text: 'Lithuania uses the euro. Cards are accepted almost everywhere.' },
      weather: {
        title: 'August weather',
        text: 'Usually warm, with highs in the low twenties (°C), cooler evenings and the odd summer shower. Bring a light layer.',
      },
      language: {
        title: 'Language',
        text: 'Lithuanian is the local language, and English is widely spoken. “Ačiū” means thank you.',
      },
      timezone: {
        title: 'Time zone',
        text: 'Eastern European Summer Time (UTC+3): one hour ahead of Spain, the same as Ukraine.',
      },
    },
  },
  rsvp: {
    label: 'Kindly respond',
    title: 'RSVP',
    deadline: 'Please respond by {date}',
    quote: 'Can’t wait to celebrate with you!',
    photoAlt: 'Ugne and Dimon',
    optional: 'optional',
    name: { label: 'Full name', hint: 'as on the invitation' },
    email: { label: 'Email' },
    phone: { label: 'Phone' },
    attending: { legend: 'Will you attend?', yes: 'Joyfully accept', no: 'Regretfully decline' },
    guests: { label: 'Number of guests', hint: 'including you' },
    companion: { label: 'Guest {n} — full name' },
    country: {
      label: 'Travelling from',
      choose: 'Please choose',
      es: 'Spain',
      ua: 'Ukraine',
      lt: 'Lithuania',
      other: 'Another country',
    },
    dietary: {
      label: 'Dietary requirements or allergies',
      placeholder: 'Vegetarian, gluten-free, nut allergy…',
    },
    extras: {
      legend: 'Can we help with anything?',
      accommodation: 'I would like help finding accommodation',
      shuttle: 'I am interested in a shuttle',
    },
    song: { label: 'A song that will get you on the dance floor', placeholder: 'Artist — title' },
    note: { label: 'A note for the couple' },
    submit: 'Send response',
    sending: 'Sending…',
    errors: {
      name: 'Please tell us your name.',
      email: 'Please enter a valid email address.',
      attending: 'Please let us know whether you can come.',
      companion: 'Please add this guest’s name.',
      failed: 'Sorry — your response could not be sent. Please try again, or write to us at {email}.',
    },
    success: {
      acceptTitle: 'Thank you, {name}!',
      acceptText: 'We can’t wait to celebrate with you.',
      declineTitle: 'Thank you, {name}.',
      declineText: 'We are sorry you can’t make it. You will be missed — and we will raise a glass to you on the day.',
      again: 'Send another response',
    },
  },
  gifts: {
    label: 'With gratitude',
    title: 'Gifts & Contributions',
    intro:
      'Your presence is the greatest gift. If you’d like to contribute to our next chapter together, you can do so by bank transfer.',
    note: 'No payment is taken on this site — these are simply our details for a bank transfer.',
    fields: {
      accountHolder: 'Account holder',
      iban: 'IBAN',
      bic: 'BIC / SWIFT',
      bank: 'Bank',
      reference: 'Reference',
    },
    copy: 'Copy',
    copyLabel: 'Copy {field}',
    copied: '{field} copied',
    copyFailed: 'Could not copy — please select the text instead',
  },
  faq: {
    label: 'Questions & answers',
    title: 'Good to Know',
    items: {
      dress: {
        q: 'What should I wear?',
        a: 'Elegant summer attire. Part of the day is outdoors on grass, so block heels or wedges are kinder than stilettos, and a light layer is handy for the evening.',
      },
      plusOnes: {
        q: 'Can I bring a plus-one?',
        a: 'Your invitation will name everyone we are expecting. If you are not sure, just ask us.',
      },
      kids: {
        q: 'Are children welcome?',
        a: 'We are finalising the details and will update this page soon. If you are hoping to travel with little ones, mention it in your RSVP note.',
      },
      parking: {
        q: 'Is there parking at the venue?',
        a: 'We are confirming the parking arrangements with the venue and will post the details here.',
      },
      weather: {
        q: 'What if it rains?',
        a: 'August is usually warm and bright — but this is the Baltics. There is an indoor plan, so the celebration goes ahead whatever the sky decides.',
      },
      photos: {
        q: 'Can I take photos?',
        a: 'We would love an unplugged ceremony: phones and cameras away, so everyone is truly there with us. Our photographer will capture it all — and once the ceremony is over, snap away.',
      },
      language: {
        q: 'What language will the ceremony be in?',
        a: 'To be confirmed. With guests from Lithuania, Ukraine, Spain and beyond, we will make sure everyone can follow the moments that matter.',
      },
      contact: {
        q: 'Who can I contact with a question?',
        a: 'Write to us at {email} and one of us will get back to you.',
      },
    },
  },
  footer: {
    date: 'August 7, 2027',
    place: 'Kaunas, Lithuania',
    made: 'Made with love for our forever',
  },
  /* @@en */
};

const dictionaries = { en };

/* ───────────────────────────── Engine ───────────────────────────── */

let current = CONFIG.i18n.defaultLanguage;
const listeners = new Set();

const isSupported = (code) => LANGUAGES.some((l) => l.code === code);

function lookup(dict, key) {
  return key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dict);
}

/** Translate a key. Returns the key itself when nothing is found, so gaps are easy to spot. */
export function t(key, vars) {
  let value = lookup(dictionaries[current], key);
  if (value === undefined) value = lookup(dictionaries.en, key);
  if (value === undefined) return key;
  if (typeof value === 'string' && vars) {
    return value.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? vars[name] : match));
  }
  return value;
}

export const getLanguage = () => current;
export const getLocale = () => LANGUAGES.find((l) => l.code === current).locale;

/** Format an ISO date ('2027-08-07') in the current language. */
export function formatDate(iso, options = { day: 'numeric', month: 'long', year: 'numeric' }) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(getLocale(), { ...options, timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}

/** Apply translations to every `data-i18n` / `data-i18n-attr` element under `root`. */
export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-attr]').forEach((node) => {
    node.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (attr && key) node.setAttribute(attr, t(key));
    });
  });
}

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function initI18n() {
  const stored = readStored();
  const browser = (navigator.language || '').slice(0, 2).toLowerCase();
  if (isSupported(stored)) current = stored;
  else if (CONFIG.i18n.detectBrowserLanguage && isSupported(browser)) current = browser;
  document.documentElement.lang = current;
  return current;
}

export function setLanguage(code) {
  if (!isSupported(code) || code === current) return;
  current = code;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* private mode — the choice simply won't persist */
  }
  document.documentElement.lang = code;
  listeners.forEach((fn) => fn(code));
}

export function onLanguageChange(fn) {
  listeners.add(fn);
}
