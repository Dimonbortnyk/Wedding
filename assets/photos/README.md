# Photos

Drop your photos in this folder using **exactly** these filenames (lowercase, `.jpg`).
Until a file exists, the site shows a beige placeholder frame with the filename, so
you can add them one at a time.

| File | Where it appears | Orientation | Recommended size |
| --- | --- | --- | --- |
| `booth-01.jpg` … `booth-04.jpg` | Opening screen — the photo-booth strip scrolling inside the frame, top to bottom | Landscape (4:3); keep faces centred, as the edges are cropped to 4:3 and the strip is tilted | 1000 × 750 px |
| `barcelona.jpg` | Our Story — 14 January 2024, Barcelona | Portrait (4:5) | 1200 × 1500 px |
| `bologna.jpg` | Our Story — 9 February 2024, Bologna | Portrait (4:5) | 1200 × 1500 px |
| `trakai.jpg` | Our Story — 19 April 2025, Trakai (the proposal) | Portrait (4:5) | 1200 × 1500 px |
| `forever.jpg` | Our Story — 7 August 2027, Kaunas | Portrait (4:5) | 1200 × 1500 px |
| `countdown.jpg` | Background of the countdown (a dark overlay is added) | Landscape, calm and not too busy | 2400 × 1350 px |
| `venue.jpg` | The Day — "The ceremony" card, and the Travel section | Landscape (3:2) | 1600 × 1067 px |
| `rsvp.jpg` | Framed photo beside the RSVP form | Portrait (3:4) | 1200 × 1600 px |
| `gallery-01.jpg` … `gallery-08.jpg` | Gallery (masonry grid + lightbox) | Any — a mix of portrait and landscape looks best | Long edge 1600 px |

Three gallery photos are also reused on the event cards in **The Day**:

| File | Event card |
| --- | --- |
| `gallery-03.jpg` | Cava toast, canapés & photos |
| `gallery-05.jpg` | The banquet |
| `gallery-07.jpg` | The party |

To use different photos for those cards, change the `photo` values under `programme`
in `js/config.js`. To add or remove gallery photos, edit the `gallery` list there.

## The photo-booth strip

- Upload the four booth photos **in colour, as they are**. The site turns them black and
  white with a CSS filter; switch to sepia or to the original colours with
  `hero.boothFilter` (`'bw'`, `'sepia'` or `'none'`) in `js/config.js`.
- Close-ups work best — the frames are small, especially on a phone. Think real photo
  booth: two faces filling the frame, a different expression in each.
- To change the order or the filenames, edit `hero.booth` in `js/config.js`.

## Tips

- **Filenames are case-sensitive once the site is on GitHub Pages.** `Barcelona.jpg` or
  `forever.jpeg` will work on a Windows or Mac laptop and then break online; use
  lowercase names ending in `.jpg`, exactly as listed above.
- Export as JPEG, quality around 80, sRGB. Aim for under ~400 KB per photo
  (under ~150 KB for each booth photo, under ~600 KB for `countdown.jpg`) — many guests
  will be on mobile data.
- Everything except the first booth photo is lazy-loaded, so a large gallery does not
  slow the first screen.
- Describe each gallery photo for screen readers in `js/i18n.js` → `gallery.alts`.
