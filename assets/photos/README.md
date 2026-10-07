# Photos

Drop your photos in this folder using **exactly** these filenames (lowercase, `.jpg`).
Until a file exists, the site shows a beige placeholder frame with the filename, so
you can add them one at a time.

| File | Where it appears | Orientation | Recommended size |
| --- | --- | --- | --- |
| `hero.jpg` | Full-screen opening photo, behind the names (a dark overlay is added) | Landscape; keep faces away from the centre, where the names sit | 2400 × 1600 px |
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

## Tips

- Export as JPEG, quality around 80, sRGB. Aim for under ~400 KB per photo
  (under ~600 KB for `hero.jpg` and `countdown.jpg`) — many guests will be on mobile data.
- Everything except the hero is lazy-loaded, so a large gallery does not slow the first screen.
- Describe each gallery photo for screen readers in `js/i18n.js` → `gallery.alts`.
