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

/* ───────────────────────────── Countdown ───────────────────────────── */

const { date: weddingDate, ceremonyTime, utcOffset } = CONFIG.wedding;
const ceremonyAt = new Date(`${weddingDate}T${ceremonyTime}:00${utcOffset}`);
const DAY_OF_LENGTH_MS = 12 * 60 * 60 * 1000;

function tickCountdown() {
  const grid = $('[data-countdown]');
  const done = $('[data-countdown-done]');
  const remaining = ceremonyAt - Date.now();

  if (remaining <= 0) {
    grid.hidden = true;
    done.hidden = false;
    done.textContent = t(-remaining < DAY_OF_LENGTH_MS ? 'countdown.today' : 'countdown.after');
    return false;
  }

  const total = Math.floor(remaining / 1000);
  const values = {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
  Object.entries(values).forEach(([unit, value]) => {
    const text = unit === 'days' ? String(value) : String(value).padStart(2, '0');
    const node = $(`[data-unit="${unit}"]`, grid);
    if (node.textContent !== text) node.textContent = text;
  });
  return true;
}

renderers.push(tickCountdown);

setups.push(() => {
  const timer = setInterval(() => {
    if (!document.hidden && !tickCountdown()) clearInterval(timer);
  }, 1000);
});

/* ───────────────────────────── The Day ───────────────────────────── */

renderers.push(() => {
  $('[data-times-notice]').hidden = CONFIG.timesConfirmed;

  $('[data-journey-steps]').innerHTML = CONFIG.programme
    .map((step) => {
      const base = `programme.steps.${step.id}`;
      const where = t(`${base}.where`);
      return `
        <li class="journey__step reveal" data-step>
          <span class="journey__icon">${icon(step.icon)}</span>
          <time class="journey__time" datetime="${step.time}">${step.time}</time>
          <div class="journey__body">
            <h3 class="journey__title">${esc(t(`${base}.title`))}</h3>
            <p>${esc(t(`${base}.desc`))}</p>
            ${where === `${base}.where` ? '' : `<p class="journey__where">${icon('pin')}${esc(where)}</p>`}
          </div>
        </li>`;
    })
    .join('');

  $('[data-events]').innerHTML = CONFIG.programme
    .filter((step) => step.featured)
    .map((step, index) => {
      const base = `programme.steps.${step.id}`;
      return `
        <li class="card card--lift event reveal" style="--delay: ${index * 0.1}s">
          <div class="event__media">
            ${photo(step.photo, '', 'event__photo')}
            <time class="event__badge" datetime="${step.time}">${step.time}</time>
          </div>
          <div class="event__body">
            <h4 class="event__title">${esc(t(`${base}.title`))}</h4>
            <p class="event__highlight">${esc(t(`${base}.highlight`))}</p>
          </div>
        </li>`;
    })
    .join('');

  updateJourney();
});

// Draw the timeline as it is scrolled, lighting each step when the line reaches it.
function updateJourney() {
  const journey = $('[data-journey]');
  const steps = $$('[data-step]', journey);
  if (!steps.length) return;

  const rect = journey.getBoundingClientRect();
  const drawn = reducedMotion.matches
    ? rect.height
    : Math.min(Math.max(window.innerHeight * 0.62 - rect.top, 0), rect.height);
  $('[data-journey-fill]').style.transform = `scaleY(${(drawn / rect.height).toFixed(4)})`;

  steps.forEach((step) => {
    const iconRect = $('.journey__icon', step).getBoundingClientRect();
    step.classList.toggle('is-reached', iconRect.top + iconRect.height / 2 - rect.top <= drawn + 1);
  });
}

setups.push(() => scrollTasks.push(updateJourney));

/* ───────────────────────────── Menu ───────────────────────────── */

const dietTag = (tag) =>
  `<span class="tag" title="${esc(t(`menu.tags.${tag}`))}"><span aria-hidden="true">${tag}</span><span class="sr-only">${esc(t(`menu.tags.${tag}`))}</span></span>`;

renderers.push(() => {
  $('[data-menu-sample]').hidden = !CONFIG.menu.isSample;

  $('[data-menu]').innerHTML = CONFIG.menu.courses
    .map((course) => {
      const note = t(`menu.courses.${course.id}.note`);
      const dishes = course.items
        .map((item) => {
          const base = `menu.items.${item.id}`;
          const desc = t(`${base}.desc`);
          return `
            <li class="dish">
              <p class="dish__name">${esc(t(`${base}.name`))}${item.tags.length ? ` <span class="dish__tags">${item.tags.map(dietTag).join('')}</span>` : ''}</p>
              ${desc === `${base}.desc` ? '' : `<p class="dish__desc">${esc(desc)}</p>`}
            </li>`;
        })
        .join('');
      return `
        <section class="menu-course">
          <h3 class="menu-course__title">${esc(t(`menu.courses.${course.id}.title`))}</h3>
          ${note === `menu.courses.${course.id}.note` ? '' : `<p class="menu-course__note">${esc(note)}</p>`}
          <ul class="menu-course__dishes">${dishes}</ul>
        </section>`;
    })
    .join('');

  $('[data-menu-legend]').innerHTML = ['V', 'VG', 'GF']
    .map((tag) => `<li><span class="tag" aria-hidden="true">${tag}</span>${esc(t(`menu.tags.${tag}`))}</li>`)
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
