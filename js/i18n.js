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
