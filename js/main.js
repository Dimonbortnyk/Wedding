import { CONFIG } from './config.js';
import {
  LANGUAGES,
  applyTranslations,
  formatDate,
  getLanguage,
  getLocale,
  initI18n,
  onLanguageChange,
  setLanguage,
  t,
} from './i18n.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ───────────────────────────── Helpers ───────────────────────────── */

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPES[ch]);

const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;

/** A framed photo. If the file is missing, CSS shows a beige frame with the filename. */
const photo = (file, alt, cls = '') =>
  `<figure class="photo ${cls}" data-photo="${esc(file)}"><img src="assets/photos/${esc(file)}" alt="${esc(alt)}" loading="lazy" decoding="async"></figure>`;

// Sections whose markup is built from config + i18n; re-run on every language change.
const renderers = [];
// One-off behaviour (listeners, observers); run once after the first render.
const setups = [];

/* ───────────────────────────── Photos ───────────────────────────── */

function markMissing(img) {
  img.closest('.photo')?.classList.add('is-missing');
}

setups.push(() => {
  // `error` does not bubble, so listen in the capture phase to catch images added later too.
  document.addEventListener(
    'error',
    (event) => {
      if (event.target instanceof HTMLImageElement) markMissing(event.target);
    },
    true,
  );
  $$('.photo img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) markMissing(img);
  });
});

/* ───────────────────────────── Reveal on scroll ───────────────────────────── */

const revealObserver =
  'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )
    : null;

function observeReveals(root = document) {
  $$('.reveal:not(.is-visible)', root).forEach((node) => {
    if (revealObserver) revealObserver.observe(node);
    else node.classList.add('is-visible');
  });
}

/* @@features */

/* ───────────────────────────── Boot ───────────────────────────── */

function render() {
  document.title = t('meta.title');
  $('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  applyTranslations();
  renderers.forEach((fn) => fn());
  observeReveals();
}

function boot() {
  // Scroll animations only hide content once we know the script is running.
  document.documentElement.classList.add('js');
  initI18n();
  render();
  setups.forEach((fn) => fn());
  onLanguageChange(render);
}

boot();
