/**
 * Site configuration — everything you are likely to change lives here.
 *
 * Facts (dates, times, bank details, which dishes are on the menu) are edited
 * in this file. Words (titles, descriptions, dish names) are edited in
 * js/i18n.js, once per language.
 */

/** A Google Maps search link for a place, built from its name and address. */
const mapsSearch = (...parts) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(parts.filter(Boolean).join(', '))}`;

export const CONFIG = {
  couple: {
    first: 'Ugne',
    second: 'Dimon',
    monogram: 'U & D',
  },

  wedding: {
    date: '2027-08-07',
    // Used by the countdown: the church ceremony. Keep in sync with the "ceremony" step in `programme`.
    ceremonyTime: '13:00',
    timezone: 'Europe/Vilnius',
    // Lithuania is on EEST (UTC+3) in August.
    utcOffset: '+03:00',
  },

  // The opening screen: a photo-booth strip that scrolls inside a shadow-box frame.
  hero: {
    // Files in assets/photos/, top to bottom. Landscape 4:3.
    booth: ['booth-01.jpg', 'booth-02.jpg', 'booth-03.jpg', 'booth-04.jpg'],
    // How the strip is toned: 'bw' | 'sepia' | 'none'. Upload colour photos as they are.
    boothFilter: 'bw',
  },

  // The day has two places: the church ceremony first, then the celebration at the manor.
  // Names shown on the site are translated in i18n.js → travel.church / travel.venue.
  church: {
    name: 'Church of St. George',
    // The name on the sign and in Google Maps.
    localName: 'Šv. Jurgio bažnyčia',
    address: 'Bažnyčios g. 19',
    town: 'Vilkija, 54227 Kauno r. sav.',
    country: 'Lithuania',
    mapUrl: mapsSearch('Šv. Jurgio bažnyčia', 'Bažnyčios g. 19', 'Vilkija', '54227 Kauno r. sav.', 'Lithuania'),
    // Optional: paste a Google Maps "embed" URL here to show a live map instead of the photo.
    mapEmbedUrl: '',
  },

  venue: {
    name: 'Babtyno dvaras',
    // PLACEHOLDER — replace with the exact street address.
    address: 'TBC — street address to be confirmed',
    town: 'Babtai, Kaunas District',
    country: 'Lithuania',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Babtyno+dvaras+Babtai+Lithuania',
    // Optional: paste a Google Maps "embed" URL here to show a live map instead of the placeholder.
    mapEmbedUrl: '',
  },

  // While false, the programme shows a "Times to be confirmed" notice.
  timesConfirmed: false,

  // The guest journey. Titles, descriptions and places: i18n.js → programme.steps.<id>.
  // `featured` steps also get a photo card; `photo` is a file in assets/photos/.
  // The day starts at the church in Vilkija and moves on to Babtyno dvaras.
  programme: [
    { id: 'arrival', time: '12:30', icon: 'church' },
    { id: 'ceremony', time: '13:00', icon: 'church', featured: true, photo: 'church.jpg' },
    { id: 'transfer', time: '14:00', icon: 'car' },
    { id: 'breadSalt', time: '14:45', icon: 'bread' },
    { id: 'cava', time: '15:00', icon: 'glasses', featured: true, photo: 'venue.jpg' },
    { id: 'banquet', time: '17:00', icon: 'banquet', featured: true, photo: 'gallery-05.jpg' },
    { id: 'firstDance', time: '20:00', icon: 'dance' },
    { id: 'party', time: '20:30', icon: 'party', featured: true, photo: 'gallery-07.jpg' },
  ],

  // Our Story. Texts: i18n.js → story.items.<id>.
  story: [
    { id: 'barcelona', date: '2024-01-14', photo: 'barcelona.jpg' },
    { id: 'bologna', date: '2024-02-09', photo: 'bologna.jpg' },
    { id: 'trakai', date: '2025-04-19', photo: 'trakai.jpg' },
    { id: 'forever', date: '2027-08-07', photo: 'forever.jpg' },
  ],

  // Optional sections. Switch one back on with `true`; its content below stays in place.
  sections: {
    menu: false,
  },

  // Sample menu (shown only while `sections.menu` is true). Dish names and descriptions: i18n.js → menu.items.<id>.
  // Tags: 'V' vegetarian, 'VG' vegan, 'GF' gluten-free.
  menu: {
    isSample: true,
    courses: [
      {
        id: 'welcome',
        items: [
          { id: 'cava', tags: ['VG', 'GF'] },
          { id: 'ryeCanape', tags: ['V'] },
          { id: 'paAmbTomaquet', tags: ['VG'] },
          { id: 'herring', tags: [] },
        ],
      },
      {
        id: 'starters',
        items: [
          { id: 'varenyky', tags: ['V'] },
          { id: 'cepelinai', tags: ['V'] },
          { id: 'gardenSalad', tags: ['VG', 'GF'] },
        ],
      },
      {
        id: 'soup',
        items: [
          { id: 'saltibarsciai', tags: ['V', 'GF'] },
          { id: 'borscht', tags: ['V'] },
        ],
      },
      {
        id: 'main',
        items: [
          { id: 'duck', tags: ['GF'] },
          { id: 'pikePerch', tags: ['GF'] },
          { id: 'holubtsi', tags: ['VG', 'GF'] },
        ],
      },
      {
        id: 'dessert',
        items: [
          { id: 'sakotis', tags: ['V'] },
          { id: 'korovai', tags: ['V'] },
          { id: 'cremaCatalana', tags: ['V', 'GF'] },
        ],
      },
      {
        id: 'lateNight',
        items: [
          { id: 'potatoPancakes', tags: ['V'] },
          { id: 'keptaDuona', tags: ['V'] },
        ],
      },
    ],
  },

  // Files in assets/photos/ shown in the gallery, in order.
  gallery: [
    'gallery-01.jpg',
    'gallery-02.jpg',
    'gallery-03.jpg',
    'gallery-04.jpg',
    'gallery-05.jpg',
    'gallery-06.jpg',
    'gallery-07.jpg',
    'gallery-08.jpg',
  ],

  // Approximate drive times to Babtyno dvaras, in minutes. Verify before sharing.
  travel: {
    airports: [
      { id: 'kun', code: 'KUN', driveMinutes: 30 },
      { id: 'vno', code: 'VNO', driveMinutes: 80 },
    ],
  },

  rsvp: {
    // PLACEHOLDER — confirm the deadline.
    deadline: '2027-05-01',
    maxGuests: 6,
    // Where responses go: 'local' | 'formspree' | 'supabase'. See docs/rsvp-backend.md.
    backend: 'local',
    formspree: {
      endpoint: '', // e.g. 'https://formspree.io/f/abcdwxyz'
    },
    supabase: {
      url: '', // e.g. 'https://xxxxxxxx.supabase.co'
      anonKey: '', // the public "anon" key — never the service_role key
      table: 'rsvps',
    },
  },

  // PLACEHOLDERS — replace with the real bank details.
  gifts: {
    accountHolder: 'Ugne Balaseviciute & Dimon Bortnyk',
    iban: 'LT00 0000 0000 0000 0000',
    bic: 'XXXXLT00',
    bank: 'Bank name TBC',
    reference: 'Wedding U&D + your name',
  },

  contact: {
    // PLACEHOLDER — replace with the address guests should write to.
    email: 'hello@example.com',
  },

  i18n: {
    defaultLanguage: 'en',
    // Set to true to open the site in the visitor's browser language when it is one of ours.
    detectBrowserLanguage: false,
  },
};
