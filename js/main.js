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

/* ───────────────────────────── Gallery & lightbox ───────────────────────────── */

function galleryAlt(index) {
  const custom = t('gallery.alts');
  return (Array.isArray(custom) && custom[index]) || t('gallery.alt', { n: index + 1 });
}

renderers.push(() => {
  const total = CONFIG.gallery.length;
  $('[data-gallery]').innerHTML = CONFIG.gallery
    .map(
      (file, index) => `
        <li class="reveal" style="--delay: ${(index % 4) * 0.08}s">
          <a class="photo gallery__item" href="assets/photos/${esc(file)}" data-photo="${esc(file)}" data-index="${index}"
             aria-label="${esc(t('gallery.open', { n: index + 1, total }))}">
            <img src="assets/photos/${esc(file)}" alt="${esc(galleryAlt(index))}" loading="lazy" decoding="async">
          </a>
        </li>`,
    )
    .join('');
});

setups.push(() => {
  const dialog = $('[data-lightbox]');
  const frame = $('[data-lightbox-photo]');
  const img = $('[data-lightbox-img]');
  const total = CONFIG.gallery.length;
  let current = 0;

  function show(index) {
    current = (index + total) % total;
    const file = CONFIG.gallery[current];
    frame.classList.remove('is-missing');
    frame.dataset.photo = file;
    img.alt = galleryAlt(current);
    img.src = `assets/photos/${file}`;
    $('[data-lightbox-count]').textContent = t('gallery.count', { n: current + 1, total });
  }

  $('[data-gallery]').addEventListener('click', (event) => {
    const item = event.target.closest('[data-index]');
    if (!item || typeof dialog.showModal !== 'function') return; // no <dialog>: the link opens the photo
    event.preventDefault();
    show(Number(item.dataset.index));
    dialog.showModal();
  });

  $('[data-lightbox-close]').addEventListener('click', () => dialog.close());
  $('[data-lightbox-prev]').addEventListener('click', () => show(current - 1));
  $('[data-lightbox-next]').addEventListener('click', () => show(current + 1));

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close(); // a click on the backdrop
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });

  let touchStartX = null;
  dialog.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  dialog.addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(dx) > 48) show(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
});

/* ───────────────────────────── Travel ───────────────────────────── */

function formatDrive(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const parts = [];
  if (h) parts.push(`${h} ${t('travel.hourShort')}`);
  if (m) parts.push(`${m} ${t('travel.minuteShort')}`);
  return t('travel.drive', { time: parts.join(' ') });
}

renderers.push(() => {
  const { venue, travel } = CONFIG;

  $('[data-venue-map]').href = venue.mapUrl;
  $('[data-venue-media]').innerHTML = venue.mapEmbedUrl
    ? `<iframe class="venue__map" src="${esc(venue.mapEmbedUrl)}" title="${esc(t('travel.venue.mapTitle'))}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
    : photo('venue.jpg', t('travel.venue.alt'), 'venue__photo');

  const airports = travel.airports.map(
    (airport) => `
      <li class="card card--lift travel-card reveal">
        ${icon('plane', 'icon travel-card__icon')}
        <p class="travel-card__code">${esc(airport.code)}</p>
        <h3 class="travel-card__title">${esc(t(`travel.airports.${airport.id}.name`))}</h3>
        <p class="travel-card__meta">${esc(formatDrive(airport.driveMinutes))}</p>
        <p class="travel-card__text">${esc(t(`travel.airports.${airport.id}.text`))}</p>
      </li>`,
  );
  const placeholders = [
    ['stay', 'bed'],
    ['shuttle', 'bus'],
  ].map(
    ([id, iconName]) => `
      <li class="card card--lift travel-card reveal">
        ${icon(iconName, 'icon travel-card__icon')}
        <h3 class="travel-card__title">${esc(t(`travel.${id}.title`))}</h3>
        <p class="travel-card__meta">${esc(t('travel.soon'))}</p>
        <p class="travel-card__text">${esc(t(`travel.${id}.text`))}</p>
      </li>`,
  );
  $('[data-travel-cards]').innerHTML = [...airports, ...placeholders].join('');

  $('[data-tips]').innerHTML = ['currency', 'weather', 'language', 'timezone']
    .map(
      (id, index) => `
        <li class="tip reveal" style="--delay: ${index * 0.08}s">
          <h4 class="tip__title">${esc(t(`travel.tips.${id}.title`))}</h4>
          <p class="tip__text">${esc(t(`travel.tips.${id}.text`))}</p>
        </li>`,
    )
    .join('');
});

/* ───────────────────────────── RSVP ───────────────────────────── */

const rsvpForm = () => $('[data-rsvp-form]');
const isDeclined = () => rsvpForm().elements.attending.value === 'no';

// One name field per companion; existing values survive a change of guest count or language.
function syncCompanions() {
  const form = rsvpForm();
  const host = $('[data-companions]');
  const count = Number(form.elements.guests_count.value) || 1;
  const previous = $$('input', host).map((input) => input.value);

  host.innerHTML = Array.from({ length: count - 1 }, (_, i) => {
    const n = i + 2;
    return `
      <div class="field">
        <label class="field__label" for="rsvp-companion-${n}">${esc(t('rsvp.companion.label', { n }))}</label>
        <input class="field__input" id="rsvp-companion-${n}" name="companion_${n}" type="text" maxlength="200"
               value="${esc(previous[i] ?? '')}" aria-describedby="rsvp-companion-${n}-error">
        <p class="field__error" id="rsvp-companion-${n}-error" data-error-for="companion_${n}"></p>
      </div>`;
  }).join('');
}

function syncAttendance() {
  $$('[data-attending-only]').forEach((node) => {
    node.hidden = isDeclined();
  });
}

function setFieldError(name, message) {
  const form = rsvpForm();
  const control = form.elements[name];
  const controls = control instanceof RadioNodeList ? [...control] : [control];
  controls.forEach((node) => node.toggleAttribute('aria-invalid', Boolean(message)));
  $(`[data-error-for="${name}"]`, form).textContent = message || '';
}

function validateRsvp() {
  const form = rsvpForm();
  const errors = {};
  const value = (name) => form.elements[name].value.trim();

  if (!value('full_name')) errors.full_name = t('rsvp.errors.name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value('email'))) errors.email = t('rsvp.errors.email');
  if (!form.elements.attending.value) errors.attending = t('rsvp.errors.attending');
  if (!isDeclined()) {
    $$('[data-companions] input', form).forEach((input) => {
      if (!input.value.trim()) errors[input.name] = t('rsvp.errors.companion');
    });
  }
  return errors;
}

function readRsvp() {
  const form = rsvpForm();
  const value = (name) => form.elements[name].value.trim();
  const attending = !isDeclined();
  return {
    full_name: value('full_name'),
    email: value('email'),
    phone: value('phone'),
    attending,
    guests_count: attending ? Number(form.elements.guests_count.value) : 0,
    companions: attending ? $$('[data-companions] input', form).map((input) => input.value.trim()) : [],
    dietary: attending ? value('dietary') : '',
    country: attending ? form.elements.country.value : '',
    needs_accommodation: attending && form.elements.needs_accommodation.checked,
    wants_shuttle: attending && form.elements.wants_shuttle.checked,
    song: attending ? value('song') : '',
    note: value('note'),
    language: getLanguage(),
  };
}

renderers.push(() => {
  $('[data-rsvp-deadline]').textContent = t('rsvp.deadline', { date: formatDate(CONFIG.rsvp.deadline) });

  const guests = $('[data-guests]');
  if (!guests.options.length) {
    guests.innerHTML = Array.from({ length: CONFIG.rsvp.maxGuests }, (_, i) => `<option>${i + 1}</option>`).join('');
  }
  syncCompanions();
});

setups.push(() => {
  const form = rsvpForm();
  const submit = $('[data-rsvp-submit]');
  const alert = $('[data-rsvp-alert]');
  const success = $('[data-rsvp-success]');

  form.addEventListener('change', (event) => {
    if (event.target.name === 'attending') syncAttendance();
    if (event.target.name === 'guests_count') syncCompanions();
  });

  // Clear a field's error as soon as the guest starts fixing it.
  const clearError = (event) => {
    if (event.target.name && $(`[data-error-for="${event.target.name}"]`, form)) setFieldError(event.target.name, '');
  };
  form.addEventListener('input', clearError);
  form.addEventListener('change', clearError);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    alert.textContent = '';

    $$('[data-error-for]', form).forEach((node) => setFieldError(node.dataset.errorFor, ''));
    const errors = validateRsvp();
    Object.entries(errors).forEach(([name, message]) => setFieldError(name, message));
    const firstInvalid = $('[aria-invalid]', form);
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    if (form.elements.website.value) return; // honeypot filled: quietly drop the bot

    const data = readRsvp();
    submit.disabled = true;
    submit.textContent = t('rsvp.sending');
    try {
      const { submitRsvp } = await import('./rsvp.js');
      await submitRsvp(data);
    } catch (error) {
      console.error('[RSVP] submission failed', error);
      alert.textContent = t('rsvp.errors.failed', { email: CONFIG.contact.email });
      return;
    } finally {
      submit.disabled = false;
      submit.textContent = t('rsvp.submit');
    }

    const name = data.full_name.split(/\s+/)[0];
    const kind = data.attending ? 'accept' : 'decline';
    $('[data-rsvp-success-title]').textContent = t(`rsvp.success.${kind}Title`, { name });
    $('[data-rsvp-success-text]').textContent = t(`rsvp.success.${kind}Text`);
    form.hidden = true;
    success.hidden = false;
    $('[data-rsvp-success-title]').focus({ preventScroll: true });
    success.scrollIntoView({ block: 'center', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  });

  $('[data-rsvp-again]').addEventListener('click', () => {
    form.reset();
    syncAttendance();
    syncCompanions();
    success.hidden = true;
    form.hidden = false;
    form.elements.full_name.focus();
  });
});

/* ───────────────────────────── Gifts ───────────────────────────── */

let toastTimer;

function showToast(message) {
  const toast = $('[data-toast]');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API is unavailable on plain http and file:// — fall back to a hidden field.
    const field = Object.assign(document.createElement('textarea'), { value: text, readOnly: true });
    field.style.cssText = 'position:fixed;opacity:0';
    document.body.append(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
  }
}

renderers.push(() => {
  $('[data-gifts]').innerHTML = ['accountHolder', 'iban', 'bic', 'bank', 'reference']
    .map((key) => {
      const field = t(`gifts.fields.${key}`);
      return `
        <div class="gift-row">
          <dt class="gift-row__label">${esc(field)}</dt>
          <dd class="gift-row__value">${esc(CONFIG.gifts[key])}</dd>
          <dd class="gift-row__action">
            <button class="gift-row__copy" type="button" data-copy="${key}" aria-label="${esc(t('gifts.copyLabel', { field }))}">
              ${icon('copy')}<span aria-hidden="true">${esc(t('gifts.copy'))}</span>
            </button>
          </dd>
        </div>`;
    })
    .join('');
});

setups.push(() => {
  $('[data-gifts]').addEventListener('click', async (event) => {
    const btn = event.target.closest('[data-copy]');
    if (!btn) return;
    const key = btn.dataset.copy;
    // Banks expect the IBAN without the spaces that make it readable on screen.
    const value = key === 'iban' ? CONFIG.gifts.iban.replace(/\s+/g, '') : CONFIG.gifts[key];
    const ok = await copyText(value);
    showToast(ok ? t('gifts.copied', { field: t(`gifts.fields.${key}`) }) : t('gifts.copyFailed'));
  });
});

/* ───────────────────────────── FAQ & footer ───────────────────────────── */

renderers.push(() => {
  const { email } = CONFIG.contact;
  const mailto = `<a class="text-link" href="mailto:${esc(email)}">${esc(email)}</a>`;

  $('[data-faq]').innerHTML = Object.keys(t('faq.items'))
    .map(
      (id) => `
        <details class="faq__item">
          <summary class="faq__q">${esc(t(`faq.items.${id}.q`))}${icon('chevron', 'icon faq__chevron')}</summary>
          <p class="faq__a">${esc(t(`faq.items.${id}.a`)).replace('{email}', mailto)}</p>
        </details>`,
    )
    .join('');

  $$('[data-initial]').forEach((node) => {
    node.textContent = CONFIG.couple[node.dataset.initial].charAt(0);
  });
});

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
