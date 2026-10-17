# Wedding — Ugne & Dimon

Wedding website for **Saturday, 7 August 2027** at the Church of St. George in Vilkija, followed by the celebration at Babtyno dvaras, near Kaunas (Lithuania).

A static, single-page site: no framework, no build step, no dependencies. It tells
guests the story, walks them through the day, shows the menu and the travel details,
collects RSVPs and shares the bank details for gifts — in English, Spanish,
Lithuanian and Ukrainian.

```
index.html            the page (markup + icon sprite)
css/styles.css        design tokens, components, sections
js/config.js          facts: dates, times, menu, bank details, RSVP backend   ← edit this
js/i18n.js            words: every visible string, in four languages         ← and this
js/main.js            behaviour: rendering, countdown, timeline, gallery, form
js/rsvp.js            submitRsvp() and its backends (local / Formspree / Supabase)
js/petals.js          the petal burst when the invitation letter is closed
assets/photos/        your photos (see assets/photos/README.md)
assets/icons/         favicon and a standalone copy of the ornament
docs/rsvp-backend.md  how to receive RSVPs for real
```

## Run it locally

The scripts are ES modules, which browsers refuse to load from `file://`. Double-clicking
`index.html` therefore shows the page **without** the programme, menu, countdown or form.
Serve the folder instead — any static server will do:

```bash
# Python (already on most machines)
python -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>. There is nothing to install or compile; refresh to
see changes.

## Add your photos

Drop JPEGs into `assets/photos/` using the filenames listed in
[`assets/photos/README.md`](assets/photos/README.md) (`booth-01.jpg`, `barcelona.jpg`, …,
`gallery-08.jpg`). That file says where each one appears and what size to export.

Until a photo exists the site shows a beige frame with the filename, so you can add them
one at a time. The browser console will log a `404` for each photo that is still missing —
that is expected and goes away as you add them.

## Edit the content

**Facts live in [`js/config.js`](js/config.js)** — one object, commented throughout:

| To change… | Edit |
| --- | --- |
| Date, ceremony time, time zone (drives the countdown) | `wedding` |
| Photo-booth strip on the opening screen: which photos, and black-and-white / sepia / colour | `hero` |
| The church (ceremony) and the manor (celebration): name, **street address**, map link or embedded map | `church`, `venue` |
| Programme times and order; hide the "Times to be confirmed" badge | `programme`, `timesConfirmed` |
| Show or hide the Menu section (off for now) | `sections.menu` |
| Which dishes are on the menu and their V / VG / GF tags; hide the "Sample menu" badge | `menu` |
| Gallery photos | `gallery` |
| Airport drive times | `travel` |
| RSVP deadline, maximum party size, where responses are sent | `rsvp` |
| Account holder, IBAN, BIC, bank, transfer reference | `gifts` |
| Contact email | `contact` |

**Words live in [`js/i18n.js`](js/i18n.js)** — one dictionary per language (`en`, `es`,
`lt`, `uk`) with identical keys. English is the reference; a key missing from another
language falls back to English, so nothing ever shows up blank.

- To reword something, find the English text in `en` and change it, then update the
  same key in the other three.
- To add a dish: add `{ id: 'myDish', tags: ['V'] }` to a course in `config.js`, then
  add `myDish: { name: '…', desc: '…' }` under `menu.items` in each language.
- To add a programme step: add it to `programme` in `config.js` (icons available:
  `church`, `car`, `arrival`, `rings`, `bread`, `glasses`, `banquet`, `dance`, `party`), then add its
  `title` / `desc` / `where` under `programme.steps` in each language.
- To add an FAQ entry: add a `{ q, a }` pair under `faq.items` in each language.
- A few date phrases are written out by hand and are **not** derived from `config.js`:
  `countdown.date`, `footer.date` and `meta.title`. (The `07 · 08 · 2027` on the opening
  screen does follow `config.js`; `hero.dateFormat` only sets its order and separators.)

The Spanish, Lithuanian and Ukrainian texts are complete but machine-written; have a
native speaker read them before sharing (each block is marked `TODO` in the file).

Colours, fonts and spacing are CSS custom properties at the top of
[`css/styles.css`](css/styles.css).

## Receive RSVPs

Out of the box the form runs in **`local` mode: responses are saved only in the visitor's
own browser and nothing is sent to you.** That is right for a mockup and wrong for a live
site. Before sharing the link, pick a real backend in `js/config.js`:

```js
rsvp: {
  backend: 'supabase',   // 'local' | 'formspree' | 'supabase'
  …
}
```

[`docs/rsvp-backend.md`](docs/rsvp-backend.md) has the setup steps for Formspree
(responses by email) and Supabase (a table you can sort and export), including the SQL
schema and row-level-security policy.

## Deploy to GitHub Pages

The repository is deployable as it is — every path is relative.

1. Push the repository to GitHub.
2. **Settings → Pages → Build and deployment**: Source **Deploy from a branch**,
   Branch **`main`**, folder **`/ (root)`**. Save.
3. A minute later the site is live at `https://<user>.github.io/<repo>/`.

For a custom domain, add it under **Settings → Pages → Custom domain** and create the DNS
record GitHub asks for.

Two things to know before going live:

- **Anything committed to a public repository is public**, including the IBAN in
  `js/config.js` and every photo. If that matters, keep the repository private (GitHub
  Pages on private repositories needs a paid plan) or host it somewhere that supports
  password protection.
- The page carries `<meta name="robots" content="noindex, nofollow">` so search engines
  do not list it. Remove that line from `index.html` if you want it to be findable.

## Before going live — checklist

- [ ] Photos added (`assets/photos/`)
- [ ] Venue street address (`venue.address`)
- [ ] Church → manor transport confirmed (programme `transfer` step, Travel note, FAQ)
- [ ] Programme times confirmed, then `timesConfirmed: true`
- [ ] Final menu, then `menu.isSample: false` and `sections.menu: true`
- [ ] RSVP deadline confirmed and a real `rsvp.backend` configured and tested
- [ ] Bank details (`gifts`) and contact email (`contact.email`)
- [ ] Placeholder texts replaced: plus-ones, parking, ceremony language,
      accommodation, shuttle, locations within the estate (all in `js/i18n.js`)
- [ ] Translations read by a native speaker

## Browser support and accessibility

Current versions of Chrome, Edge, Firefox and Safari, desktop and mobile. The page is
keyboard-navigable (skip link, visible focus, native `<dialog>` lightbox and `<details>`
FAQ), text colours were chosen to meet WCAG AA contrast, and animation is switched off for visitors who ask
for reduced motion.
