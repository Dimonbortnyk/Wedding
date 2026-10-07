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

/* ───────────────────────────── Scroll bus ───────────────────────────── */

// One passive scroll/resize listener for everything, throttled to animation frames.
const scrollTasks = [];
let scrollQueued = false;

function runScrollTasks() {
  scrollQueued = false;
  scrollTasks.forEach((fn) => fn(window.scrollY));
}

function queueScrollTasks() {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(runScrollTasks);
}

setups.push(() => {
  window.addEventListener('scroll', queueScrollTasks, { passive: true });
  window.addEventListener('resize', queueScrollTasks, { passive: true });
  runScrollTasks();
});

/* ───────────────────────────── Config bindings ───────────────────────────── */

// <span data-config="couple.first"> takes its text straight from config.js.
renderers.push(() => {
  $$('[data-config]').forEach((node) => {
    const value = node.dataset.config.split('.').reduce((obj, key) => obj?.[key], CONFIG);
    if (value != null) node.textContent = value;
  });
});

/* ───────────────────────────── Nav & language ───────────────────────────── */

renderers.push(() => {
  const host = $('[data-lang-switcher]');
  if (!host.children.length) {
    host.innerHTML = LANGUAGES.map(
      (l) =>
        `<button type="button" class="lang__btn" data-lang="${l.code}" lang="${l.code}">${l.label}<span class="sr-only"> — ${esc(l.name)}</span></button>`,
    ).join('');
  }
  $$('[data-lang]', host).forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === getLanguage()));
  });
});

const isNavOpen = () => document.body.classList.contains('nav-open');

function setNavOpen(open) {
  const toggle = $('[data-nav-toggle]');
  document.body.classList.toggle('nav-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', t(open ? 'a11y.closeMenu' : 'a11y.openMenu'));
}

renderers.push(() => setNavOpen(isNavOpen()));

setups.push(() => {
  $('[data-lang-switcher]').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-lang]');
    if (btn) setLanguage(btn.dataset.lang);
  });

  $('[data-nav-toggle]').addEventListener('click', () => setNavOpen(!isNavOpen()));
  $('#site-nav').addEventListener('click', (event) => {
    if (event.target.closest('a')) setNavOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isNavOpen()) {
      setNavOpen(false);
      $('[data-nav-toggle]').focus();
    }
  });
  // Leaving the mobile layout with the menu open would otherwise keep the page scroll-locked.
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (mq) => {
    if (mq.matches) setNavOpen(false);
  });

  const header = $('[data-header]');
  const heroMedia = $('[data-parallax]');
  scrollTasks.push((y) => {
    header.classList.toggle('is-scrolled', y > 24);
    if (heroMedia && !reducedMotion.matches && y <= window.innerHeight) {
      heroMedia.style.transform = `translate3d(0, ${(y * 0.22).toFixed(1)}px, 0)`;
    }
  });
});

/* ───────────────────────────── Our Story ───────────────────────────── */

renderers.push(() => {
  $('[data-story]').innerHTML = CONFIG.story
    .map((item, index) => {
      const base = `story.items.${item.id}`;
      const flip = index % 2 === 1;
      return `
        <li class="story__item${flip ? ' story__item--flip' : ''}">
          <div class="story__media reveal ${flip ? 'reveal--right' : 'reveal--left'}">
            ${photo(item.photo, t(`${base}.alt`), 'story__photo')}
            <span class="story__tag" aria-hidden="true">${item.date.slice(0, 4)}</span>
          </div>
          <div class="story__text reveal ${flip ? 'reveal--left' : 'reveal--right'}">
            <p class="label"><time datetime="${item.date}">${esc(formatDate(item.date))}</time> — ${esc(t(`${base}.place`))}</p>
            <h3 class="story__title">${esc(t(`${base}.title`))}</h3>
            <p>${esc(t(`${base}.text`))}</p>
          </div>
        </li>`;
    })
    .join('');
});

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
