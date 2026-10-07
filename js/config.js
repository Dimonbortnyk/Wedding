/**
 * Site configuration — everything you are likely to change lives here.
 *
 * Facts (dates, times, bank details, which dishes are on the menu) are edited
 * in this file. Words (titles, descriptions, dish names) are edited in
 * js/i18n.js, once per language.
 */
export const CONFIG = {
  couple: {
    first: 'Ugne',
    second: 'Dimon',
    monogram: 'U & D',
  },

  wedding: {
    date: '2027-08-07',
    // Used by the countdown. Keep in sync with the "ceremony" step in `programme`.
    ceremonyTime: '15:30',
    timezone: 'Europe/Vilnius',
    // Lithuania is on EEST (UTC+3) in August.
    utcOffset: '+03:00',
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

  // The guest journey. Titles and descriptions: i18n.js → programme.steps.<id>.
  // `featured` steps also get a photo card; `photo` is a file in assets/photos/.
  programme: [
    { id: 'arrival', time: '15:00', icon: 'arrival' },
    { id: 'ceremony', time: '15:30', icon: 'rings', featured: true, photo: 'venue.jpg' },
    { id: 'breadSalt', time: '16:15', icon: 'bread' },
    { id: 'cava', time: '16:30', icon: 'glasses', featured: true, photo: 'gallery-03.jpg' },
    { id: 'banquet', time: '18:00', icon: 'banquet', featured: true, photo: 'gallery-05.jpg' },
    { id: 'firstDance', time: '21:00', icon: 'dance' },
    { id: 'party', time: '21:30', icon: 'party', featured: true, photo: 'gallery-07.jpg' },
  ],

  // Our Story. Texts: i18n.js → story.items.<id>.
  story: [
    { id: 'barcelona', date: '2024-01-14', photo: 'barcelona.jpg' },
    { id: 'bologna', date: '2024-02-09', photo: 'bologna.jpg' },
    { id: 'trakai', date: '2025-04-19', photo: 'trakai.jpg' },
    { id: 'forever', date: '2027-08-07', photo: 'forever.jpg' },
  ],

  // Sample menu. Dish names and descriptions: i18n.js → menu.items.<id>.
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

  // Approximate drive times to the venue, in minutes. Verify before sharing.
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
