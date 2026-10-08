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
    eyebrow: 'Together with their families',
    and: 'and',
    saveTheDate: 'Save the Date',
    // The date itself comes from config.js; this only sets the order and the separators.
    dateFormat: '{dd} · {mm} · {yyyy}',
    place: 'Babtyno dvaras • Kaunas, Lithuania',
    open: 'Open invitation',
    sealLabel: 'Open the envelope',
    sealHint: 'Tap the heart to open',
    boothLabel: 'Photo-booth strip of Ugne and Dimon. Hover or focus to pause it.',
    boothAlt: 'Ugne and Dimon — photo-booth picture {n}',
  },
  letter: {
    title: 'We’re getting married!',
    body: 'On the 7th of August 2027 we would love to share a very special day with you at Babtyno dvaras, Kaunas, Lithuania — where a love story between two cultures comes together as one, our own Pangea.',
    closing: 'We invite you to discover our love story.',
    signature: 'Ugne & Dimon',
    cta: 'Discover our story',
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
  countdown: {
    label: 'Counting down to',
    title: 'The Big Day',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    date: 'August 7, 2027 • Kaunas, Lithuania',
    today: 'Today is the day!',
    after: 'We said yes! Thank you for celebrating with us.',
  },
  programme: {
    label: 'The celebration',
    title: 'The Day',
    intro: 'From the first hello to the last dance — here is how the day will unfold.',
    tbc: 'Times to be confirmed',
    momentsTitle: 'The main moments',
    steps: {
      arrival: {
        title: 'Arrival & welcome',
        desc: 'Find your way to Babtyno dvaras, say your hellos and settle in with something cool to drink.',
        where: 'Manor courtyard',
      },
      ceremony: {
        title: 'The ceremony',
        desc: 'We say “yes”, surrounded by the people we love most.',
        where: 'Manor park',
        highlight: 'We say yes',
      },
      breadSalt: {
        title: 'Bread & salt',
        desc: 'The traditional welcome of the newlyweds — a custom Lithuania and Ukraine share.',
        where: 'Manor steps',
      },
      cava: {
        title: 'Cava toast, canapés & photos',
        desc: 'A glass of cava for Barcelona, something to nibble and plenty of photos in the gardens.',
        where: 'The gardens',
        highlight: 'A toast to Barcelona',
      },
      banquet: {
        title: 'The banquet',
        desc: 'Dinner from both our kitchens, with a few toasts along the way.',
        where: 'Banquet hall',
        highlight: 'Two cuisines, one table',
      },
      firstDance: {
        title: 'First dance',
        desc: 'We open the dance floor — then it is all yours.',
        where: 'Banquet hall',
      },
      party: {
        title: 'The party',
        desc: 'Dancing until late, with a midnight snack to keep you going.',
        where: 'Banquet hall',
        highlight: 'Dancing until late',
      },
    },
    notes: {
      dress: {
        label: 'Dress code',
        title: 'Elegant summer attire',
        text: 'Light fabrics and garden-friendly shoes — part of the day is out on the lawn.',
      },
      kids: {
        label: 'Children',
        title: 'To be confirmed',
        text: 'We are still working out the details and will share them here soon.',
      },
      plusOnes: {
        label: 'Plus-ones',
        title: 'To be confirmed',
        text: 'Your invitation will name everyone we are expecting. Not sure? Just ask us.',
      },
    },
  },
  menu: {
    label: 'To eat & drink',
    title: 'The Menu',
    intro: 'Two kitchens side by side — Lithuanian and Ukrainian, with a little of Barcelona in the glass.',
    sample: 'Sample menu — final version coming soon',
    note: 'Allergies or dietary needs? Tell us in the RSVP and the kitchen will look after you.',
    noteLink: 'Go to the RSVP',
    tags: { V: 'Vegetarian', VG: 'Vegan', GF: 'Gluten-free' },
    courses: {
      welcome: { title: 'Welcome', note: 'Cava & canapés in the gardens' },
      starters: { title: 'Starters' },
      soup: { title: 'Soup', note: 'Two beetroot soups, one table' },
      main: { title: 'Main course' },
      dessert: { title: 'Dessert' },
      lateNight: { title: 'Late-night snack' },
    },
    items: {
      cava: { name: 'Cava brut nature', desc: 'From the Penedès hills outside Barcelona' },
      ryeCanape: { name: 'Dark rye, curd cheese & garden herbs', desc: 'Lithuanian rye bread with fresh varškė' },
      paAmbTomaquet: { name: 'Pa amb tomàquet', desc: 'Toasted bread rubbed with tomato and olive oil' },
      herring: { name: 'Baltic herring on rye', desc: 'With pickled onion and dill' },
      varenyky: { name: 'Varenyky bites', desc: 'Ukrainian dumplings with potato and caramelised onion' },
      cepelinai: { name: 'Little cepelinai', desc: 'Lithuanian potato dumplings with curd cheese and a wild mushroom sauce' },
      gardenSalad: { name: 'Summer garden salad', desc: 'Cucumber, radish, dill and cold-pressed sunflower oil' },
      saltibarsciai: { name: 'Šaltibarščiai', desc: 'Lithuania’s chilled pink beetroot soup with kefir, cucumber and dill' },
      borscht: { name: 'Ukrainian borscht', desc: 'Slow-cooked beetroot soup with garlic pampushky' },
      duck: { name: 'Roast duck with baked apples', desc: 'Buckwheat and a lingonberry sauce' },
      pikePerch: { name: 'Baltic pike-perch', desc: 'New potatoes, dill butter and summer greens' },
      holubtsi: { name: 'Mushroom & buckwheat holubtsi', desc: 'Ukrainian stuffed cabbage rolls in a tomato sauce' },
      sakotis: { name: 'Šakotis', desc: 'The Lithuanian “tree cake”, baked on a spit over an open fire' },
      korovai: { name: 'Korovai', desc: 'The Ukrainian wedding bread, shared with every guest' },
      cremaCatalana: { name: 'Crema catalana', desc: 'With summer berries' },
      potatoPancakes: { name: 'Potato pancakes', desc: 'Bulviniai blynai in Lithuania, deruny in Ukraine — with sour cream' },
      keptaDuona: { name: 'Kepta duona', desc: 'Fried garlic rye bread with a warm cheese sauce' },
    },
  },
  gallery: {
    label: 'Moments',
    title: 'Gallery',
    // Used for every photo unless `alts` has a description at that position.
    alt: 'Ugne and Dimon — photo {n}',
    alts: [],
    open: 'Open photo {n} of {total}',
    count: '{n} / {total}',
    close: 'Close gallery',
    prev: 'Previous photo',
    next: 'Next photo',
  },
  travel: {
    label: 'Getting there',
    title: 'Travel & Stay',
    intro: 'Babtyno dvaras is a manor estate in Babtai, about 24 km north of Kaunas, in the heart of Lithuania.',
    approx: 'Drive times are approximate — please check before you travel.',
    drive: 'about {time} by car',
    hourShort: 'h',
    minuteShort: 'min',
    soon: 'Coming soon',
    tipsTitle: 'Good to know',
    venue: {
      label: 'The venue',
      country: 'Lithuania',
      mapLink: 'Open in Google Maps',
      mapTitle: 'Map of Babtyno dvaras',
      alt: 'Babtyno dvaras manor',
    },
    airports: {
      kun: {
        name: 'Kaunas Airport',
        text: 'The closest airport, with direct flights from a number of European cities.',
      },
      vno: {
        name: 'Vilnius Airport',
        text: 'The capital’s airport, with the widest choice of flights. Trains and coaches link Vilnius and Kaunas.',
      },
    },
    stay: {
      title: 'Where to stay',
      text: 'We are putting together a list of hotels and guesthouses in and around Kaunas, for every budget.',
    },
    shuttle: {
      title: 'Shuttle',
      text: 'We are looking into a shuttle between Kaunas and the venue. Tell us in the RSVP if you would use it.',
    },
    tips: {
      currency: { title: 'Currency', text: 'Lithuania uses the euro. Cards are accepted almost everywhere.' },
      weather: {
        title: 'August weather',
        text: 'Usually warm, with highs in the low twenties (°C), cooler evenings and the odd summer shower. Bring a light layer.',
      },
      language: {
        title: 'Language',
        text: 'Lithuanian is the local language, and English is widely spoken. “Ačiū” means thank you.',
      },
      timezone: {
        title: 'Time zone',
        text: 'Eastern European Summer Time (UTC+3): one hour ahead of Spain, the same as Ukraine.',
      },
    },
  },
  rsvp: {
    label: 'Kindly respond',
    title: 'RSVP',
    deadline: 'Please respond by {date}',
    quote: 'Can’t wait to celebrate with you!',
    photoAlt: 'Ugne and Dimon',
    optional: 'optional',
    name: { label: 'Full name', hint: 'as on the invitation' },
    email: { label: 'Email' },
    phone: { label: 'Phone' },
    attending: { legend: 'Will you attend?', yes: 'Joyfully accept', no: 'Regretfully decline' },
    guests: { label: 'Number of guests', hint: 'including you' },
    companion: { label: 'Guest {n} — full name' },
    country: {
      label: 'Travelling from',
      choose: 'Please choose',
      es: 'Spain',
      ua: 'Ukraine',
      lt: 'Lithuania',
      other: 'Another country',
    },
    dietary: {
      label: 'Dietary requirements or allergies',
      placeholder: 'Vegetarian, gluten-free, nut allergy…',
    },
    extras: {
      legend: 'Can we help with anything?',
      accommodation: 'I would like help finding accommodation',
      shuttle: 'I am interested in a shuttle',
    },
    song: { label: 'A song that will get you on the dance floor', placeholder: 'Artist — title' },
    note: { label: 'A note for the couple' },
    submit: 'Send response',
    sending: 'Sending…',
    errors: {
      name: 'Please tell us your name.',
      email: 'Please enter a valid email address.',
      attending: 'Please let us know whether you can come.',
      companion: 'Please add this guest’s name.',
      failed: 'Sorry — your response could not be sent. Please try again, or write to us at {email}.',
    },
    success: {
      acceptTitle: 'Thank you, {name}!',
      acceptText: 'We can’t wait to celebrate with you.',
      declineTitle: 'Thank you, {name}.',
      declineText: 'We are sorry you can’t make it. You will be missed — and we will raise a glass to you on the day.',
      again: 'Send another response',
    },
  },
  gifts: {
    label: 'With gratitude',
    title: 'Gifts & Contributions',
    intro:
      'Your presence is the greatest gift. If you’d like to contribute to our next chapter together, you can do so by bank transfer.',
    note: 'No payment is taken on this site — these are simply our details for a bank transfer.',
    fields: {
      accountHolder: 'Account holder',
      iban: 'IBAN',
      bic: 'BIC / SWIFT',
      bank: 'Bank',
      reference: 'Reference',
    },
    copy: 'Copy',
    copyLabel: 'Copy {field}',
    copied: '{field} copied',
    copyFailed: 'Could not copy — please select the text instead',
  },
  faq: {
    label: 'Questions & answers',
    title: 'Good to Know',
    items: {
      dress: {
        q: 'What should I wear?',
        a: 'Elegant summer attire. Part of the day is outdoors on grass, so block heels or wedges are kinder than stilettos, and a light layer is handy for the evening.',
      },
      plusOnes: {
        q: 'Can I bring a plus-one?',
        a: 'Your invitation will name everyone we are expecting. If you are not sure, just ask us.',
      },
      kids: {
        q: 'Are children welcome?',
        a: 'We are finalising the details and will update this page soon. If you are hoping to travel with little ones, mention it in your RSVP note.',
      },
      parking: {
        q: 'Is there parking at the venue?',
        a: 'We are confirming the parking arrangements with the venue and will post the details here.',
      },
      weather: {
        q: 'What if it rains?',
        a: 'August is usually warm and bright — but this is the Baltics. There is an indoor plan, so the celebration goes ahead whatever the sky decides.',
      },
      photos: {
        q: 'Can I take photos?',
        a: 'We would love an unplugged ceremony: phones and cameras away, so everyone is truly there with us. Our photographer will capture it all — and once the ceremony is over, snap away.',
      },
      language: {
        q: 'What language will the ceremony be in?',
        a: 'To be confirmed. With guests from Lithuania, Ukraine, Spain and beyond, we will make sure everyone can follow the moments that matter.',
      },
      contact: {
        q: 'Who can I contact with a question?',
        a: 'Write to us at {email} and one of us will get back to you.',
      },
    },
  },
  footer: {
    date: 'August 7, 2027',
    place: 'Kaunas, Lithuania',
    made: 'Made with love for our forever',
  },
};

/* ───────────────────────────── Español ─────────────────────────────
   Translated in full. TODO: have a native speaker read it through before sharing. */

const es = {
  meta: {
    title: 'Ugne & Dimon — 7 de agosto de 2027',
    description:
      'Ugne y Dimon se casan el 7 de agosto de 2027 en Babtyno dvaras, cerca de Kaunas (Lituania). El día, el menú, cómo llegar y confirmación de asistencia.',
  },
  a11y: {
    skip: 'Saltar al contenido',
    home: 'Ugne & Dimon — volver arriba',
    language: 'Idioma',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    mainNav: 'Navegación principal',
  },
  nav: {
    story: 'Nuestra historia',
    day: 'El día',
    menu: 'Menú',
    travel: 'Viaje',
    rsvp: 'Confirmar',
    gifts: 'Regalos',
  },
  hero: {
    eyebrow: 'Junto a sus familias',
    and: 'y',
    saveTheDate: 'Reserva la fecha',
    dateFormat: '{dd} · {mm} · {yyyy}',
    place: 'Babtyno dvaras • Kaunas, Lituania',
    open: 'Abrir invitación',
    sealLabel: 'Abrir el sobre',
    sealHint: 'Toca el corazón para abrir',
    boothLabel: 'Tira de fotomatón de Ugne y Dimon. Pasa el cursor o pon el foco para pausarla.',
    boothAlt: 'Ugne y Dimon — foto de fotomatón {n}',
  },
  letter: {
    title: '¡Nos casamos!',
    body: 'El próximo 7 de agosto de 2027 nos encantaría compartir contigo un día muy especial en Babtyno dvaras, Kaunas, Lituania, donde una historia de amor entre dos culturas se une para formar una sola: nuestra propia Pangea.',
    closing: 'Te invitamos a descubrir nuestra historia de amor.',
    signature: 'Ugne & Dimon',
    cta: 'Descubre nuestra historia',
  },
  story: {
    label: 'Cómo empezó todo',
    title: 'Nuestra historia',
    quote: 'Nos dijimos «te quiero» en todos los idiomas que sabíamos, y en todos significaba lo mismo.',
    items: {
      barcelona: {
        place: 'Barcelona',
        title: 'Un paseo, una receta, un beso',
        text: 'Su historia de amor empezó bajo el Arc de Triomf de Barcelona. Acabaron perdiéndose por las calles del Born, hablando de sus recetas y comidas favoritas, hasta que Dimon le robó un beso a Ugne: el comienzo de una noche mágica y llena de espontaneidad.',
        alt: 'Ugne y Dimon en Barcelona',
      },
      bologna: {
        place: 'Bolonia, Italia',
        title: 'En todos los idiomas',
        text: 'Viajaron juntos a Bolonia para pasar dos noches llenas de aventura, con un toque de amor y romanticismo ya en el aire. En la Torre dell’Orologio, sin nadie más alrededor, se dijeron «te quiero» en todos los idiomas que pudieron.',
        alt: 'Ugne y Dimon en Bolonia',
      },
      trakai: {
        place: 'Trakai, Lituania',
        title: 'La pregunta junto al lago',
        text: 'Viajaron a Lituania para celebrar el cumpleaños de Ingrida, la madre de Ugne: una celebración muy especial, aunque también había otros planes, esta vez para Ugne. En Trakai hacía un tiempo precioso; Dimon estaba muy nervioso, pero junto a un lago impresionante por fin le pidió a Ugne que se casara con él.',
        alt: 'Ugne y Dimon junto al lago en Trakai',
      },
      forever: {
        place: 'Kaunas',
        title: 'Empieza el para siempre',
        text: 'El para siempre empieza en Babtyno dvaras, rodeados de familia y amigos llegados de todos los rincones de Europa.',
        alt: 'Ugne y Dimon',
      },
    },
  },
  cultures: {
    label: 'Lituania • Ucrania • Barcelona',
    title: 'Dos culturas, una mesa',
    intro:
      'Lituania y Ucrania reciben a los recién casados de la misma manera: con pan y sal, para que en su hogar nunca falten. Nuestro día entrelaza las dos tradiciones y brinda por Barcelona, donde empezó todo.',
    lt: {
      title: 'Pan de centeno y jardines de paja',
      text: 'Pan negro de centeno y sal en la puerta, ofrecidos por los padres. Sobre la mesa, el «sodas»: un jardín tejido con paja que trae armonía al hogar y que inspira los ornamentos de esta web. De postre, un šakotis bien alto.',
    },
    ua: {
      title: 'Rushnyk y korovai',
      text: 'Un rushnyk —un paño bordado que lleva la bendición de la familia— y el korovai, un pan de boda coronado con pájaros de masa y espigas de trigo, que se comparte con todos los invitados para atraer la buena suerte.',
    },
    bcn: {
      title: 'Un brindis con cava',
      text: 'Un primer paseo por el Born acabó en un primer beso. Lo celebramos con cava de las colinas cercanas a la ciudad, y la florecita de las aceras de Barcelona también se esconde entre nuestros ornamentos.',
    },
  },
  countdown: {
    label: 'Cuenta atrás para',
    title: 'El gran día',
    days: 'Días',
    hours: 'Horas',
    minutes: 'Minutos',
    seconds: 'Segundos',
    date: '7 de agosto de 2027 • Kaunas, Lituania',
    today: '¡Hoy es el día!',
    after: '¡Nos dimos el «sí»! Gracias por celebrarlo con nosotros.',
  },
  programme: {
    label: 'La celebración',
    title: 'El día',
    intro: 'Del primer saludo al último baile: así será el día.',
    tbc: 'Horarios por confirmar',
    momentsTitle: 'Los grandes momentos',
    steps: {
      arrival: {
        title: 'Llegada y bienvenida',
        desc: 'Llega a Babtyno dvaras, saluda a todo el mundo y ponte cómodo con algo fresco para beber.',
        where: 'Patio de la mansión',
      },
      ceremony: {
        title: 'La ceremonia',
        desc: 'Nos damos el «sí» rodeados de las personas que más queremos.',
        where: 'Parque de la mansión',
        highlight: 'Nos damos el sí',
      },
      breadSalt: {
        title: 'Pan y sal',
        desc: 'La bienvenida tradicional a los recién casados, una costumbre que Lituania y Ucrania comparten.',
        where: 'Escalinata de la mansión',
      },
      cava: {
        title: 'Brindis con cava, canapés y fotos',
        desc: 'Una copa de cava por Barcelona, algo para picar y muchas fotos en los jardines.',
        where: 'Los jardines',
        highlight: 'Un brindis por Barcelona',
      },
      banquet: {
        title: 'El banquete',
        desc: 'Una cena con lo mejor de nuestras dos cocinas y algún que otro brindis.',
        where: 'Salón de banquetes',
        highlight: 'Dos cocinas, una mesa',
      },
      firstDance: {
        title: 'Primer baile',
        desc: 'Abrimos la pista de baile… y después, todos a bailar.',
        where: 'Salón de banquetes',
      },
      party: {
        title: 'La fiesta',
        desc: 'A bailar hasta tarde, con un tentempié de medianoche para reponer fuerzas.',
        where: 'Salón de banquetes',
        highlight: 'A bailar hasta tarde',
      },
    },
    notes: {
      dress: {
        label: 'Código de vestimenta',
        title: 'Elegante de verano',
        text: 'Tejidos ligeros y zapatos aptos para el jardín: parte del día transcurre sobre el césped.',
      },
      kids: {
        label: 'Niños',
        title: 'Por confirmar',
        text: 'Todavía estamos cerrando los detalles; los publicaremos aquí pronto.',
      },
      plusOnes: {
        label: 'Acompañantes',
        title: 'Por confirmar',
        text: 'En tu invitación figurarán todas las personas que esperamos. ¿Tienes dudas? Pregúntanos.',
      },
    },
  },
  menu: {
    label: 'Para comer y beber',
    title: 'El menú',
    intro: 'Dos cocinas, una al lado de la otra —la lituana y la ucraniana—, con un poco de Barcelona en la copa.',
    sample: 'Menú de muestra — versión definitiva próximamente',
    note: '¿Alergias o necesidades alimentarias? Cuéntanoslo al confirmar y la cocina se ocupará de ti.',
    noteLink: 'Ir a la confirmación',
    tags: { V: 'Vegetariano', VG: 'Vegano', GF: 'Sin gluten' },
    courses: {
      welcome: { title: 'Bienvenida', note: 'Cava y canapés en los jardines' },
      starters: { title: 'Entrantes' },
      soup: { title: 'Sopa', note: 'Dos sopas de remolacha, una mesa' },
      main: { title: 'Plato principal' },
      dessert: { title: 'Postre' },
      lateNight: { title: 'Resopón' },
    },
    items: {
      cava: { name: 'Cava brut nature', desc: 'De las colinas del Penedès, a las afueras de Barcelona' },
      ryeCanape: { name: 'Pan negro de centeno, requesón y hierbas del huerto', desc: 'Pan de centeno lituano con varškė fresco' },
      paAmbTomaquet: { name: 'Pa amb tomàquet', desc: 'Pan tostado con tomate y aceite de oliva' },
      herring: { name: 'Arenque del Báltico sobre pan de centeno', desc: 'Con cebolla encurtida y eneldo' },
      varenyky: { name: 'Bocaditos de varenyky', desc: 'Empanadillas ucranianas de patata y cebolla caramelizada' },
      cepelinai: { name: 'Pequeños cepelinai', desc: 'Bolas de patata lituanas rellenas de requesón, con salsa de setas silvestres' },
      gardenSalad: { name: 'Ensalada de verano del huerto', desc: 'Pepino, rabanitos, eneldo y aceite de girasol prensado en frío' },
      saltibarsciai: { name: 'Šaltibarščiai', desc: 'La sopa fría y rosa de remolacha de Lituania, con kéfir, pepino y eneldo' },
      borscht: { name: 'Borscht ucraniano', desc: 'Sopa de remolacha a fuego lento con pampushky de ajo' },
      duck: { name: 'Pato asado con manzanas al horno', desc: 'Trigo sarraceno y salsa de arándanos rojos' },
      pikePerch: { name: 'Lucioperca del Báltico', desc: 'Patatas nuevas, mantequilla de eneldo y verduras de verano' },
      holubtsi: { name: 'Holubtsi de setas y trigo sarraceno', desc: 'Rollitos de col rellenos al estilo ucraniano, en salsa de tomate' },
      sakotis: { name: 'Šakotis', desc: 'El «pastel árbol» lituano, horneado en un espetón sobre fuego abierto' },
      korovai: { name: 'Korovai', desc: 'El pan de boda ucraniano, compartido con todos los invitados' },
      cremaCatalana: { name: 'Crema catalana', desc: 'Con frutos rojos de verano' },
      potatoPancakes: { name: 'Tortitas de patata', desc: 'Bulviniai blynai en Lituania, deruny en Ucrania; con crema agria' },
      keptaDuona: { name: 'Kepta duona', desc: 'Pan de centeno frito con ajo y salsa caliente de queso' },
    },
  },
  gallery: {
    label: 'Momentos',
    title: 'Galería',
    alt: 'Ugne y Dimon — foto {n}',
    alts: [],
    open: 'Abrir la foto {n} de {total}',
    count: '{n} / {total}',
    close: 'Cerrar la galería',
    prev: 'Foto anterior',
    next: 'Foto siguiente',
  },
  travel: {
    label: 'Cómo llegar',
    title: 'Viaje y alojamiento',
    intro: 'Babtyno dvaras es una mansión señorial en Babtai, a unos 24 km al norte de Kaunas, en el corazón de Lituania.',
    approx: 'Los tiempos en coche son aproximados; compruébalos antes de viajar.',
    drive: 'unos {time} en coche',
    hourShort: 'h',
    minuteShort: 'min',
    soon: 'Próximamente',
    tipsTitle: 'Conviene saber',
    venue: {
      label: 'El lugar',
      country: 'Lituania',
      mapLink: 'Abrir en Google Maps',
      mapTitle: 'Mapa de Babtyno dvaras',
      alt: 'La mansión Babtyno dvaras',
    },
    airports: {
      kun: {
        name: 'Aeropuerto de Kaunas',
        text: 'El aeropuerto más cercano, con vuelos directos desde varias ciudades europeas.',
      },
      vno: {
        name: 'Aeropuerto de Vilna',
        text: 'El aeropuerto de la capital, con la mayor oferta de vuelos. Hay trenes y autobuses entre Vilna y Kaunas.',
      },
    },
    stay: {
      title: 'Dónde alojarse',
      text: 'Estamos preparando una lista de hoteles y casas de huéspedes en Kaunas y alrededores, para todos los presupuestos.',
    },
    shuttle: {
      title: 'Traslado',
      text: 'Estamos estudiando un servicio de traslado entre Kaunas y el lugar de la boda. Dinos al confirmar si lo usarías.',
    },
    tips: {
      currency: { title: 'Moneda', text: 'En Lituania se usa el euro. Se puede pagar con tarjeta en casi todas partes.' },
      weather: {
        title: 'El tiempo en agosto',
        text: 'Suele hacer un calor suave, con máximas de poco más de 20 °C, noches más frescas y algún chaparrón de verano. Trae una chaqueta ligera.',
      },
      language: {
        title: 'Idioma',
        text: 'El idioma local es el lituano y mucha gente habla inglés. «Ačiū» significa gracias.',
      },
      timezone: {
        title: 'Zona horaria',
        text: 'Hora de verano de Europa del Este (UTC+3): una hora más que en España y la misma que en Ucrania.',
      },
    },
  },
  rsvp: {
    label: 'Se ruega confirmación',
    title: 'Confirma tu asistencia',
    deadline: 'Por favor, responde antes del {date}',
    quote: '¡Qué ganas de celebrarlo contigo!',
    photoAlt: 'Ugne y Dimon',
    optional: 'opcional',
    name: { label: 'Nombre completo', hint: 'como en la invitación' },
    email: { label: 'Correo electrónico' },
    phone: { label: 'Teléfono' },
    attending: { legend: '¿Asistirás?', yes: 'Acepto con alegría', no: 'Lo siento, no podré ir' },
    guests: { label: 'Número de invitados', hint: 'contándote a ti' },
    companion: { label: 'Invitado {n} — nombre completo' },
    country: {
      label: 'Viajas desde',
      choose: 'Elige una opción',
      es: 'España',
      ua: 'Ucrania',
      lt: 'Lituania',
      other: 'Otro país',
    },
    dietary: {
      label: 'Necesidades alimentarias o alergias',
      placeholder: 'Vegetariano, sin gluten, alergia a los frutos secos…',
    },
    extras: {
      legend: '¿Podemos ayudarte con algo?',
      accommodation: 'Me gustaría ayuda para encontrar alojamiento',
      shuttle: 'Me interesa el servicio de traslado',
    },
    song: { label: 'Una canción que te saque a la pista de baile', placeholder: 'Artista — título' },
    note: { label: 'Unas palabras para los novios' },
    submit: 'Enviar respuesta',
    sending: 'Enviando…',
    errors: {
      name: 'Dinos tu nombre, por favor.',
      email: 'Introduce un correo electrónico válido.',
      attending: 'Dinos si podrás venir.',
      companion: 'Añade el nombre de este invitado.',
      failed: 'Lo sentimos, no se ha podido enviar tu respuesta. Inténtalo de nuevo o escríbenos a {email}.',
    },
    success: {
      acceptTitle: '¡Gracias, {name}!',
      acceptText: '¡Qué ganas de celebrarlo contigo!',
      declineTitle: 'Gracias, {name}.',
      declineText: 'Sentimos que no puedas venir. Te echaremos de menos y brindaremos por ti ese día.',
      again: 'Enviar otra respuesta',
    },
  },
  gifts: {
    label: 'Con gratitud',
    title: 'Regalos y aportaciones',
    intro:
      'Tu presencia es el mejor regalo. Si quieres contribuir a nuestro próximo capítulo juntos, puedes hacerlo por transferencia bancaria.',
    note: 'En esta web no se realiza ningún pago: son solo nuestros datos para una transferencia.',
    fields: {
      accountHolder: 'Titular de la cuenta',
      iban: 'IBAN',
      bic: 'BIC / SWIFT',
      bank: 'Banco',
      reference: 'Concepto',
    },
    copy: 'Copiar',
    copyLabel: 'Copiar: {field}',
    copied: 'Copiado: {field}',
    copyFailed: 'No se ha podido copiar; selecciona el texto',
  },
  faq: {
    label: 'Preguntas y respuestas',
    title: 'Preguntas frecuentes',
    items: {
      dress: {
        q: '¿Qué me pongo?',
        a: 'Elegante de verano. Parte del día es al aire libre, sobre césped, así que mejor tacón ancho o cuñas que tacón de aguja, y una chaqueta ligera para la noche.',
      },
      plusOnes: {
        q: '¿Puedo llevar acompañante?',
        a: 'En tu invitación figurarán todas las personas que esperamos. Si tienes dudas, pregúntanos.',
      },
      kids: {
        q: '¿Pueden venir niños?',
        a: 'Estamos cerrando los detalles y actualizaremos esta página pronto. Si piensas viajar con peques, coméntalo en la nota de tu confirmación.',
      },
      parking: {
        q: '¿Hay aparcamiento?',
        a: 'Estamos confirmando el aparcamiento con el lugar de la boda y publicaremos aquí los detalles.',
      },
      weather: {
        q: '¿Y si llueve?',
        a: 'Agosto suele ser cálido y luminoso, pero esto es el Báltico. Hay un plan a cubierto, así que la celebración sigue adelante decida lo que decida el cielo.',
      },
      photos: {
        q: '¿Puedo hacer fotos?',
        a: 'Nos encantaría una ceremonia sin móviles ni cámaras, para que todos estemos de verdad presentes. Nuestro fotógrafo lo captará todo y, en cuanto termine la ceremonia, ¡a hacer fotos!',
      },
      language: {
        q: '¿En qué idioma será la ceremonia?',
        a: 'Por confirmar. Con invitados de Lituania, Ucrania, España y más allá, nos aseguraremos de que todos puedan seguir los momentos importantes.',
      },
      contact: {
        q: '¿A quién escribo si tengo dudas?',
        a: 'Escríbenos a {email} y te responderemos en cuanto podamos.',
      },
    },
  },
  footer: {
    date: '7 de agosto de 2027',
    place: 'Kaunas, Lituania',
    made: 'Hecho con amor para nuestro para siempre',
  },
};

/* ───────────────────────────── Lietuvių ─────────────────────────────
   Translated in full. TODO: have a native speaker read it through before sharing
   (in particular how the two names are declined). */

const lt = {
  meta: {
    title: 'Ugnė & Dimon — 2027 m. rugpjūčio 7 d.',
    description:
      'Ugnė ir Dimon tuokiasi 2027 m. rugpjūčio 7 d. Babtyno dvare, netoli Kauno. Šventės programa, meniu, kelionė ir dalyvavimo patvirtinimas.',
  },
  a11y: {
    skip: 'Pereiti prie turinio',
    home: 'Ugnė & Dimon — į pradžią',
    language: 'Kalba',
    openMenu: 'Atidaryti meniu',
    closeMenu: 'Uždaryti meniu',
    mainNav: 'Pagrindinė navigacija',
  },
  nav: {
    story: 'Mūsų istorija',
    day: 'Šventės diena',
    menu: 'Meniu',
    travel: 'Kelionė',
    rsvp: 'Dalyvavimas',
    gifts: 'Dovanos',
  },
  hero: {
    eyebrow: 'Kartu su savo šeimomis',
    and: 'ir',
    saveTheDate: 'Išsaugokite datą',
    dateFormat: '{dd} · {mm} · {yyyy}',
    place: 'Babtyno dvaras • Kaunas, Lietuva',
    open: 'Atverti kvietimą',
    sealLabel: 'Atverti voką',
    sealHint: 'Palieskite širdelę, kad atvertumėte',
    boothLabel: 'Ugnės ir Dimon nuotraukų juostelė iš foto būdelės. Užveskite pelę arba sufokusuokite, kad ją sustabdytumėte.',
    boothAlt: 'Ugnė ir Dimon — foto būdelės nuotrauka {n}',
  },
  letter: {
    title: 'Mes tuokiamės!',
    body: '2027 m. rugpjūčio 7 d. labai norėtume kartu su jumis praleisti ypatingą dieną Babtyno dvare, Kauno rajone, Lietuvoje — ten, kur dviejų kultūrų meilės istorija susilieja į vieną: mūsų pačių Pangėją.',
    closing: 'Kviečiame atrasti mūsų meilės istoriją.',
    signature: 'Ugnė & Dimon',
    cta: 'Atraskite mūsų istoriją',
  },
  story: {
    label: 'Kaip viskas prasidėjo',
    title: 'Mūsų istorija',
    quote: '„Myliu tave“ ištarėme visomis kalbomis, kurias mokėjome, — ir visomis tai reiškė tą patį.',
    items: {
      barcelona: {
        place: 'Barselona',
        title: 'Pasivaikščiojimas, receptas, bučinys',
        text: 'Jų meilės istorija prasidėjo Barselonoje, po Triumfo arka. Jie pasiklydo El Born gatvelėse, kalbėdamiesi apie mėgstamiausius receptus ir maistą, kol Dimon pavogė Ugnės bučinį — taip prasidėjo stebuklinga, spontaniškumo kupina naktis.',
        alt: 'Ugnė ir Dimon Barselonoje',
      },
      bologna: {
        place: 'Bolonija, Italija',
        title: 'Visomis kalbomis',
        text: 'Jie kartu išvyko į Boloniją dviem nuotykių kupinoms naktims — ore jau tvyrojo meilė ir romantika. Prie Torre dell’Orologio, kai aplink nebuvo nė gyvos dvasios, jie pasakė „myliu tave“ visomis kalbomis, kuriomis tik mokėjo.',
        alt: 'Ugnė ir Dimon Bolonijoje',
      },
      trakai: {
        place: 'Trakai, Lietuva',
        title: 'Klausimas prie ežero',
        text: 'Jie atvyko į Lietuvą švęsti Ugnės mamos Ingridos gimtadienio — labai ypatingos šventės, tačiau buvo ir kitų planų, šįkart skirtų Ugnei. Trakuose oras buvo nuostabus; Dimon labai jaudinosi, bet prie įspūdingo ežero pagaliau paprašė Ugnės tekėti už jo.',
        alt: 'Ugnė ir Dimon prie ežero Trakuose',
      },
      forever: {
        place: 'Kaunas',
        title: 'Prasideda amžinybė',
        text: 'Amžinybė prasideda Babtyno dvare, apsuptyje šeimos ir draugų iš visų Europos kampelių.',
        alt: 'Ugnė ir Dimon',
      },
    },
  },
  cultures: {
    label: 'Lietuva • Ukraina • Barselona',
    title: 'Dvi kultūros, vienas stalas',
    intro:
      'Lietuva ir Ukraina jaunavedžius pasitinka taip pat — su duona ir druska, kad jų namuose niekada nieko netrūktų. Mūsų šventėje abi tradicijos susipina, o taurę keliame už Barseloną, kur viskas prasidėjo.',
    lt: {
      title: 'Ruginė duona ir šiaudiniai sodai',
      text: 'Prie durų — tėvų pasiūlyta juoda ruginė duona ir druska. Virš stalo — sodas, iš šiaudų suvertas ornamentas, nešantis namams darną; jo formos įkvėpė ir šios svetainės ornamentus. O desertui — aukštas šakotis.',
    },
    ua: {
      title: 'Rušnykas ir karavajus',
      text: 'Rušnykas — siuvinėtas rankšluostis, saugantis šeimos palaiminimą, — ir karavajus, tešlos paukšteliais bei kviečių varpomis puoštas vestuvių pyragas, kuriuo dalijamasi su visais svečiais, kad lydėtų sėkmė.',
    },
    bcn: {
      title: 'Tostas su „cava“',
      text: 'Pirmasis pasivaikščiojimas po El Born virto pirmuoju bučiniu. Už tai keliame putojančio vyno „cava“ iš kalvų šalia miesto taurę — o mūsų ornamentuose slepiasi ir gėlytė nuo Barselonos šaligatvių.',
    },
  },
  countdown: {
    label: 'Skaičiuojame laiką iki',
    title: 'Didžiosios dienos',
    days: 'Dienos',
    hours: 'Valandos',
    minutes: 'Minutės',
    seconds: 'Sekundės',
    date: '2027 m. rugpjūčio 7 d. • Kaunas, Lietuva',
    today: 'Šiandien — ta diena!',
    after: 'Mes pasakėme „taip“! Ačiū, kad šventėte kartu.',
  },
  programme: {
    label: 'Šventė',
    title: 'Šventės diena',
    intro: 'Nuo pirmojo pasisveikinimo iki paskutinio šokio — štai kaip atrodys diena.',
    tbc: 'Laikas bus patikslintas',
    momentsTitle: 'Svarbiausios akimirkos',
    steps: {
      arrival: {
        title: 'Atvykimas ir sutikimas',
        desc: 'Atvykite į Babtyno dvarą, pasisveikinkite ir įsitaisykite su gaiviu gėrimu.',
        where: 'Dvaro kiemas',
      },
      ceremony: {
        title: 'Ceremonija',
        desc: 'Sakome „taip“ apsupti brangiausių žmonių.',
        where: 'Dvaro parkas',
        highlight: 'Sakome „taip“',
      },
      breadSalt: {
        title: 'Duona ir druska',
        desc: 'Tradicinis jaunavedžių sutikimas — paprotys, bendras Lietuvai ir Ukrainai.',
        where: 'Dvaro laiptai',
      },
      cava: {
        title: '„Cava“ tostas, užkandžiai ir nuotraukos',
        desc: 'Taurė „cava“ už Barseloną, lengvi užkandžiai ir daug nuotraukų sode.',
        where: 'Sodas',
        highlight: 'Tostas už Barseloną',
      },
      banquet: {
        title: 'Vakarienė',
        desc: 'Vakarienė, kurioje susitinka abi mūsų virtuvės, ir keli tostai.',
        where: 'Pokylių salė',
        highlight: 'Dvi virtuvės, vienas stalas',
      },
      firstDance: {
        title: 'Pirmasis šokis',
        desc: 'Atidarome šokių aikštelę — o tada ji jūsų.',
        where: 'Pokylių salė',
      },
      party: {
        title: 'Vakarėlis',
        desc: 'Šokiai iki vėlumos ir vidurnakčio užkandis jėgoms atgauti.',
        where: 'Pokylių salė',
        highlight: 'Šokiai iki vėlumos',
      },
    },
    notes: {
      dress: {
        label: 'Aprangos kodas',
        title: 'Elegantiška vasariška apranga',
        text: 'Lengvi audiniai ir žolei tinkama avalynė — dalis šventės vyks pievoje.',
      },
      kids: {
        label: 'Vaikai',
        title: 'Bus patikslinta',
        text: 'Dar deriname detales ir netrukus jomis pasidalinsime čia.',
      },
      plusOnes: {
        label: 'Palydovai',
        title: 'Bus patikslinta',
        text: 'Kvietime bus įrašyti visi, kurių laukiame. Abejojate? Tiesiog paklauskite mūsų.',
      },
    },
  },
  menu: {
    label: 'Valgiai ir gėrimai',
    title: 'Meniu',
    intro: 'Dvi virtuvės greta — lietuviška ir ukrainietiška, o taurėje — truputis Barselonos.',
    sample: 'Pavyzdinis meniu — galutinė versija jau netrukus',
    note: 'Alergijos ar mitybos poreikiai? Parašykite patvirtindami dalyvavimą — virtuvė jumis pasirūpins.',
    noteLink: 'Patvirtinti dalyvavimą',
    tags: { V: 'Vegetariška', VG: 'Veganiška', GF: 'Be glitimo' },
    courses: {
      welcome: { title: 'Sutikimas', note: '„Cava“ ir užkandžiai sode' },
      starters: { title: 'Užkandžiai' },
      soup: { title: 'Sriuba', note: 'Dvi burokėlių sriubos, vienas stalas' },
      main: { title: 'Pagrindinis patiekalas' },
      dessert: { title: 'Desertas' },
      lateNight: { title: 'Vidurnakčio užkandis' },
    },
    items: {
      cava: { name: 'Cava brut nature', desc: 'Iš Penedeso kalvų šalia Barselonos' },
      ryeCanape: { name: 'Juoda ruginė duona su varške ir žolelėmis', desc: 'Lietuviška ruginė duona su šviežia varške' },
      paAmbTomaquet: { name: 'Pa amb tomàquet', desc: 'Skrudinta duona su pomidorais ir alyvuogių aliejumi' },
      herring: { name: 'Baltijos silkė ant ruginės duonos', desc: 'Su marinuotais svogūnais ir krapais' },
      varenyky: { name: 'Varenykai', desc: 'Ukrainietiški virtiniai su bulvėmis ir karamelizuotais svogūnais' },
      cepelinai: { name: 'Mažieji cepelinai', desc: 'Su varške ir miško grybų padažu' },
      gardenSalad: { name: 'Vasaros daržo salotos', desc: 'Agurkai, ridikėliai, krapai ir šalto spaudimo saulėgrąžų aliejus' },
      saltibarsciai: { name: 'Šaltibarščiai', desc: 'Su kefyru, agurkais ir krapais' },
      borscht: { name: 'Ukrainietiški barščiai', desc: 'Ilgai troškinta burokėlių sriuba su česnakinėmis pampuškomis' },
      duck: { name: 'Kepta antis su keptais obuoliais', desc: 'Grikiai ir bruknių padažas' },
      pikePerch: { name: 'Baltijos sterkas', desc: 'Šviežios bulvės, krapų sviestas ir vasaros daržovės' },
      holubtsi: { name: 'Balandėliai su grybais ir grikiais', desc: 'Ukrainietiški „holubci“ pomidorų padaže' },
      sakotis: { name: 'Šakotis', desc: 'Keptas ant iešmo prie atviros ugnies' },
      korovai: { name: 'Karavajus', desc: 'Ukrainietiškas vestuvių pyragas, kuriuo dalijamasi su visais svečiais' },
      cremaCatalana: { name: 'Crema catalana', desc: 'Su vasaros uogomis' },
      potatoPancakes: { name: 'Bulviniai blynai', desc: 'Ukrainoje jie vadinami „deruny“ — su grietine' },
      keptaDuona: { name: 'Kepta duona', desc: 'Su česnaku ir šiltu sūrio padažu' },
    },
  },
  gallery: {
    label: 'Akimirkos',
    title: 'Galerija',
    alt: 'Ugnė ir Dimon — {n} nuotrauka',
    alts: [],
    open: 'Atidaryti {n} nuotrauką iš {total}',
    count: '{n} / {total}',
    close: 'Uždaryti galeriją',
    prev: 'Ankstesnė nuotrauka',
    next: 'Kita nuotrauka',
  },
  travel: {
    label: 'Kaip atvykti',
    title: 'Kelionė ir nakvynė',
    intro: 'Babtyno dvaras — dvaro sodyba Babtuose, apie 24 km į šiaurę nuo Kauno, pačioje Lietuvos širdyje.',
    approx: 'Kelionės laikas apytikslis — prieš kelionę pasitikrinkite.',
    drive: 'apie {time} automobiliu',
    hourShort: 'val.',
    minuteShort: 'min.',
    soon: 'Jau netrukus',
    tipsTitle: 'Naudinga žinoti',
    venue: {
      label: 'Šventės vieta',
      country: 'Lietuva',
      mapLink: 'Atidaryti „Google Maps“',
      mapTitle: 'Babtyno dvaro žemėlapis',
      alt: 'Babtyno dvaras',
    },
    airports: {
      kun: {
        name: 'Kauno oro uostas',
        text: 'Artimiausias oro uostas, į kurį tiesiogiai skrendama iš daugelio Europos miestų.',
      },
      vno: {
        name: 'Vilniaus oro uostas',
        text: 'Sostinės oro uostas, siūlantis daugiausia skrydžių. Tarp Vilniaus ir Kauno kursuoja traukiniai ir autobusai.',
      },
    },
    stay: {
      title: 'Kur apsistoti',
      text: 'Rengiame viešbučių ir svečių namų Kaune bei jo apylinkėse sąrašą — įvairiam biudžetui.',
    },
    shuttle: {
      title: 'Autobusas',
      text: 'Svarstome organizuoti autobusą tarp Kauno ir dvaro. Patvirtindami dalyvavimą parašykite, ar juo naudotumėtės.',
    },
    tips: {
      currency: { title: 'Valiuta', text: 'Lietuvoje atsiskaitoma eurais. Kortelės priimamos beveik visur.' },
      weather: {
        title: 'Oras rugpjūtį',
        text: 'Paprastai šilta — dieną kiek daugiau nei 20 °C, vakarai vėsesni, pasitaiko vasariško lietaus. Pasiimkite lengvą švarkelį.',
      },
      language: {
        title: 'Kalba',
        text: 'Vietinė kalba — lietuvių, daugelis kalba ir angliškai. Svečiams iš toliau: „ačiū“ pravers visur.',
      },
      timezone: {
        title: 'Laiko juosta',
        text: 'Rytų Europos vasaros laikas (UTC+3): viena valanda daugiau nei Ispanijoje, tiek pat kaip Ukrainoje.',
      },
    },
  },
  rsvp: {
    label: 'Maloniai prašome atsakyti',
    title: 'Dalyvavimas',
    deadline: 'Prašome atsakyti iki {date}',
    quote: 'Nekantraujame švęsti kartu su jumis!',
    photoAlt: 'Ugnė ir Dimon',
    optional: 'neprivaloma',
    name: { label: 'Vardas ir pavardė', hint: 'kaip kvietime' },
    email: { label: 'El. paštas' },
    phone: { label: 'Telefonas' },
    attending: { legend: 'Ar dalyvausite?', yes: 'Su džiaugsmu dalyvausiu', no: 'Deja, negalėsiu' },
    guests: { label: 'Svečių skaičius', hint: 'įskaitant jus' },
    companion: { label: '{n} svečias — vardas ir pavardė' },
    country: {
      label: 'Iš kur atvykstate',
      choose: 'Pasirinkite',
      es: 'Ispanija',
      ua: 'Ukraina',
      lt: 'Lietuva',
      other: 'Kita šalis',
    },
    dietary: {
      label: 'Mitybos poreikiai ar alergijos',
      placeholder: 'Vegetariška, be glitimo, alergija riešutams…',
    },
    extras: {
      legend: 'Ar galime kuo nors padėti?',
      accommodation: 'Norėčiau pagalbos ieškant nakvynės',
      shuttle: 'Domina autobusas',
    },
    song: { label: 'Daina, kuri jus išves į šokių aikštelę', placeholder: 'Atlikėjas — pavadinimas' },
    note: { label: 'Žinutė jaunavedžiams' },
    submit: 'Siųsti atsakymą',
    sending: 'Siunčiama…',
    errors: {
      name: 'Įrašykite savo vardą ir pavardę.',
      email: 'Įveskite galiojantį el. pašto adresą.',
      attending: 'Pažymėkite, ar galėsite dalyvauti.',
      companion: 'Įrašykite šio svečio vardą ir pavardę.',
      failed: 'Atsiprašome — atsakymo išsiųsti nepavyko. Pabandykite dar kartą arba parašykite mums adresu {email}.',
    },
    success: {
      acceptTitle: 'Ačiū, {name}!',
      acceptText: 'Nekantraujame švęsti kartu su jumis.',
      declineTitle: 'Ačiū, {name}.',
      declineText: 'Gaila, kad negalėsite atvykti. Jūsų trūks — tą dieną pakelsime taurę ir už jus.',
      again: 'Siųsti kitą atsakymą',
    },
  },
  gifts: {
    label: 'Su dėkingumu',
    title: 'Dovanos',
    intro:
      'Jūsų buvimas kartu — didžiausia dovana. Jei norėtumėte prisidėti prie kito mūsų bendro gyvenimo skyriaus, tai galite padaryti banko pavedimu.',
    note: 'Šioje svetainėje mokėjimai nevykdomi — tai tik mūsų rekvizitai banko pavedimui.',
    fields: {
      accountHolder: 'Sąskaitos savininkas',
      iban: 'IBAN',
      bic: 'BIC / SWIFT',
      bank: 'Bankas',
      reference: 'Mokėjimo paskirtis',
    },
    copy: 'Kopijuoti',
    copyLabel: 'Kopijuoti: {field}',
    copied: 'Nukopijuota: {field}',
    copyFailed: 'Nukopijuoti nepavyko — pažymėkite tekstą',
  },
  faq: {
    label: 'Klausimai ir atsakymai',
    title: 'Dažni klausimai',
    items: {
      dress: {
        q: 'Kuo apsirengti?',
        a: 'Elegantiška vasariška apranga. Dalis šventės vyks lauke, ant žolės, tad platesnis kulnas ar platforma patogiau nei smailūs kulniukai, o vakarui pravers lengvas švarkelis.',
      },
      plusOnes: {
        q: 'Ar galiu atsivesti palydovą?',
        a: 'Kvietime bus įrašyti visi, kurių laukiame. Jei abejojate — tiesiog paklauskite mūsų.',
      },
      kids: {
        q: 'Ar galima atvykti su vaikais?',
        a: 'Dar deriname detales ir netrukus atnaujinsime šį puslapį. Jei planuojate keliauti su mažaisiais, paminėkite tai atsakymo žinutėje.',
      },
      parking: {
        q: 'Ar prie dvaro yra automobilių stovėjimo aikštelė?',
        a: 'Su dvaru dar deriname stovėjimo vietas — informaciją paskelbsime čia.',
      },
      weather: {
        q: 'O jeigu lis?',
        a: 'Rugpjūtis paprastai šiltas ir saulėtas — bet čia Baltija. Turime planą po stogu, tad šventė vyks, kad ir ką nuspręstų dangus.',
      },
      photos: {
        q: 'Ar galiu fotografuoti?',
        a: 'Norėtume, kad ceremonija vyktų be telefonų ir fotoaparatų — kad visi iš tikrųjų būtume kartu. Mūsų fotografas viską įamžins, o po ceremonijos fotografuokite kiek širdis geidžia.',
      },
      language: {
        q: 'Kokia kalba vyks ceremonija?',
        a: 'Bus patikslinta. Svečiai atvyks iš Lietuvos, Ukrainos, Ispanijos ir kitur, tad pasirūpinsime, kad svarbiausias akimirkas suprastų visi.',
      },
      contact: {
        q: 'Į ką kreiptis, jei turiu klausimų?',
        a: 'Parašykite mums adresu {email} — atsakysime, kai tik galėsime.',
      },
    },
  },
  footer: {
    date: '2027 m. rugpjūčio 7 d.',
    place: 'Kaunas, Lietuva',
    made: 'Sukurta su meile mūsų amžinybei',
  },
};

/* ───────────────────────────── Українська ─────────────────────────────
   Translated in full. TODO: have a native speaker read it through before sharing
   (in particular how the two names are declined). */

const uk = {
  meta: {
    title: 'Угне та Дімон — 7 серпня 2027',
    description:
      'Угне та Дімон одружуються 7 серпня 2027 року в маєтку Babtyno dvaras поблизу Каунаса, Литва. Програма дня, меню, дорога та підтвердження присутності.',
  },
  a11y: {
    skip: 'Перейти до вмісту',
    home: 'Угне та Дімон — на початок',
    language: 'Мова',
    openMenu: 'Відкрити меню',
    closeMenu: 'Закрити меню',
    mainNav: 'Головна навігація',
  },
  nav: {
    story: 'Наша історія',
    day: 'Програма',
    menu: 'Меню',
    travel: 'Дорога',
    rsvp: 'Відповідь',
    gifts: 'Подарунки',
  },
  hero: {
    eyebrow: 'Разом зі своїми родинами',
    and: 'та',
    saveTheDate: 'Збережіть дату',
    dateFormat: '{dd} · {mm} · {yyyy}',
    place: 'Babtyno dvaras • Каунас, Литва',
    open: 'Відкрити запрошення',
    sealLabel: 'Відкрити конверт',
    sealHint: 'Торкніться серця, щоб відкрити',
    boothLabel: 'Стрічка знімків Угне та Дімона з фотобудки. Наведіть курсор або сфокусуйтеся, щоб її зупинити.',
    boothAlt: 'Угне та Дімон — знімок із фотобудки {n}',
  },
  letter: {
    title: 'Ми одружуємося!',
    body: '7 серпня 2027 року ми будемо раді розділити з вами дуже особливий день у маєтку Babtyno dvaras, Каунас, Литва, — там, де історія кохання двох культур зливається в одну: нашу власну Пангею.',
    closing: 'Запрошуємо вас відкрити нашу історію кохання.',
    signature: 'Угне & Дімон',
    cta: 'Відкрийте нашу історію',
  },
  story: {
    label: 'Як усе почалося',
    title: 'Наша історія',
    quote: 'Ми сказали «я тебе кохаю» всіма мовами, які знали, — і кожною це означало те саме.',
    items: {
      barcelona: {
        place: 'Барселона',
        title: 'Прогулянка, рецепт, поцілунок',
        text: 'Їхня історія кохання почалася під Тріумфальною аркою в Барселоні. Вони загубилися у вуличках Ель-Борна, розмовляючи про улюблені рецепти та їжу, аж поки Дімон не вкрав в Угне поцілунок — так почалася чарівна ніч, сповнена спонтанності.',
        alt: 'Угне та Дімон у Барселоні',
      },
      bologna: {
        place: 'Болонья, Італія',
        title: 'Усіма мовами',
        text: 'Вони разом поїхали до Болоньї на дві ночі, сповнені пригод, — у повітрі вже відчувалися кохання й романтика. Біля Торре-дель-Оролоджо, коли навколо не було нікого, вони сказали «я тебе кохаю» всіма мовами, якими тільки могли.',
        alt: 'Угне та Дімон у Болоньї',
      },
      trakai: {
        place: 'Тракай, Литва',
        title: 'Запитання біля озера',
        text: 'Вони приїхали до Литви відсвяткувати день народження Інгріди, мами Угне, — дуже особливе свято, але були й інші плани, цього разу для Угне. Погода в Тракаї була чудова; Дімон дуже хвилювався, але біля мальовничого озера нарешті попросив Угне вийти за нього заміж.',
        alt: 'Угне та Дімон біля озера в Тракаї',
      },
      forever: {
        place: 'Каунас',
        title: '«Назавжди» починається',
        text: '«Назавжди» починається в Babtyno dvaras, в оточенні рідних і друзів з усіх куточків Європи.',
        alt: 'Угне та Дімон',
      },
    },
  },
  cultures: {
    label: 'Литва • Україна • Барселона',
    title: 'Дві культури, один стіл',
    intro:
      'Литва й Україна зустрічають молодят однаково — хлібом і сіллю, щоб у їхньому домі ніколи не бракувало ні того, ні іншого. Наш день поєднує обидві традиції — і піднімає келих за Барселону, де все почалося.',
    lt: {
      title: 'Житній хліб і солом’яні сади',
      text: 'Темний житній хліб і сіль на порозі — від батьків. Над столом — «содас», сад, сплетений із соломи, що приносить у дім злагоду; саме його форми надихнули орнаменти цього сайту. А на десерт — високий шакотіс.',
    },
    ua: {
      title: 'Рушник і коровай',
      text: 'Рушник — вишите полотно, що береже родинне благословення, — і коровай, весільний хліб, прикрашений пташками з тіста й колосками пшениці, яким частують кожного гостя на щастя.',
    },
    bcn: {
      title: 'Тост із cava',
      text: 'Перша прогулянка Ель-Борном стала першим поцілунком. Ми святкуємо це ігристим вином cava з пагорбів поблизу міста — а квіточка з барселонської бруківки теж ховається в наших орнаментах.',
    },
  },
  countdown: {
    label: 'Відлік до',
    title: 'Великого дня',
    days: 'Днів',
    hours: 'Годин',
    minutes: 'Хвилин',
    seconds: 'Секунд',
    date: '7 серпня 2027 • Каунас, Литва',
    today: 'Сьогодні той самий день!',
    after: 'Ми сказали «так»! Дякуємо, що святкували з нами.',
  },
  programme: {
    label: 'Святкування',
    title: 'Програма дня',
    intro: 'Від першого привітання до останнього танцю — ось як мине цей день.',
    tbc: 'Час уточнюється',
    momentsTitle: 'Головні моменти',
    steps: {
      arrival: {
        title: 'Прибуття та зустріч гостей',
        desc: 'Приїжджайте до Babtyno dvaras, вітайтеся й влаштовуйтеся з прохолодним напоєм.',
        where: 'Подвір’я маєтку',
      },
      ceremony: {
        title: 'Церемонія',
        desc: 'Ми кажемо «так» в оточенні найдорожчих людей.',
        where: 'Парк маєтку',
        highlight: 'Ми кажемо «так»',
      },
      breadSalt: {
        title: 'Хліб і сіль',
        desc: 'Традиційна зустріч молодят — звичай, спільний для Литви та України.',
        where: 'Сходи маєтку',
      },
      cava: {
        title: 'Тост із cava, канапе та фото',
        desc: 'Келих cava за Барселону, легкі закуски та багато фотографій у саду.',
        where: 'Сад',
        highlight: 'Тост за Барселону',
      },
      banquet: {
        title: 'Банкет',
        desc: 'Вечеря з найкращим із наших двох кухонь і кілька тостів.',
        where: 'Банкетна зала',
        highlight: 'Дві кухні, один стіл',
      },
      firstDance: {
        title: 'Перший танець',
        desc: 'Ми відкриваємо танцмайданчик — а далі він ваш.',
        where: 'Банкетна зала',
      },
      party: {
        title: 'Вечірка',
        desc: 'Танці допізна й опівнічний перекус, щоб вистачило сил.',
        where: 'Банкетна зала',
        highlight: 'Танці допізна',
      },
    },
    notes: {
      dress: {
        label: 'Дрес-код',
        title: 'Елегантне літнє вбрання',
        text: 'Легкі тканини та взуття, зручне для саду: частина дня мине на галявині.',
      },
      kids: {
        label: 'Діти',
        title: 'Уточнюється',
        text: 'Ми ще узгоджуємо деталі й невдовзі поділимося ними тут.',
      },
      plusOnes: {
        label: 'Супутники',
        title: 'Уточнюється',
        text: 'У запрошенні будуть зазначені всі, на кого ми чекаємо. Маєте сумніви? Просто запитайте нас.',
      },
    },
  },
  menu: {
    label: 'Їжа та напої',
    title: 'Меню',
    intro: 'Дві кухні пліч-о-пліч — литовська й українська, а в келиху — трохи Барселони.',
    sample: 'Орієнтовне меню — остаточна версія незабаром',
    note: 'Алергії чи особливості харчування? Напишіть про це у відповіді — кухня про вас подбає.',
    noteLink: 'Перейти до відповіді',
    tags: { V: 'Вегетаріанське', VG: 'Веганське', GF: 'Без глютену' },
    courses: {
      welcome: { title: 'Зустріч гостей', note: 'Cava та канапе в саду' },
      starters: { title: 'Закуски' },
      soup: { title: 'Суп', note: 'Два бурякові супи, один стіл' },
      main: { title: 'Основна страва' },
      dessert: { title: 'Десерт' },
      lateNight: { title: 'Нічний перекус' },
    },
    items: {
      cava: { name: 'Cava brut nature', desc: 'З пагорбів Пенедесу поблизу Барселони' },
      ryeCanape: { name: 'Темний житній хліб, сир і зелень із саду', desc: 'Литовський житній хліб зі свіжим домашнім сиром' },
      paAmbTomaquet: { name: 'Pa amb tomàquet', desc: 'Підсмажений хліб із томатом та оливковою олією' },
      herring: { name: 'Балтійський оселедець на житньому хлібі', desc: 'З маринованою цибулею та кропом' },
      varenyky: { name: 'Вареники', desc: 'З картоплею та карамелізованою цибулею' },
      cepelinai: { name: 'Маленькі цепеліни', desc: 'Литовські картопляні галушки із сиром і соусом із лісових грибів' },
      gardenSalad: { name: 'Літній салат із городу', desc: 'Огірок, редиска, кріп і соняшникова олія холодного віджиму' },
      saltibarsciai: { name: 'Шалтібарщай', desc: 'Литовський рожевий холодник із буряка з кефіром, огірком і кропом' },
      borscht: { name: 'Український борщ', desc: 'З часниковими пампушками' },
      duck: { name: 'Запечена качка з яблуками', desc: 'Гречка та брусничний соус' },
      pikePerch: { name: 'Балтійський судак', desc: 'Молода картопля, масло з кропом і літня зелень' },
      holubtsi: { name: 'Голубці з грибами та гречкою', desc: 'У томатному соусі' },
      sakotis: { name: 'Шакотіс', desc: 'Литовський «торт-дерево», випечений на рожні над відкритим вогнем' },
      korovai: { name: 'Коровай', desc: 'Весільний хліб, яким частують кожного гостя' },
      cremaCatalana: { name: 'Crema catalana', desc: 'З літніми ягодами' },
      potatoPancakes: { name: 'Деруни', desc: 'У Литві їх називають bulviniai blynai — зі сметаною' },
      keptaDuona: { name: 'Kepta duona', desc: 'Смажений житній хліб із часником і теплим сирним соусом' },
    },
  },
  gallery: {
    label: 'Миті',
    title: 'Галерея',
    alt: 'Угне та Дімон — фото {n}',
    alts: [],
    open: 'Відкрити фото {n} з {total}',
    count: '{n} / {total}',
    close: 'Закрити галерею',
    prev: 'Попереднє фото',
    next: 'Наступне фото',
  },
  travel: {
    label: 'Як дістатися',
    title: 'Дорога та проживання',
    intro: 'Babtyno dvaras — маєток у Бабтаї, приблизно за 24 км на північ від Каунаса, у самому серці Литви.',
    approx: 'Час у дорозі приблизний — перевірте його перед поїздкою.',
    drive: 'близько {time} автомобілем',
    hourShort: 'год',
    minuteShort: 'хв',
    soon: 'Незабаром',
    tipsTitle: 'Корисно знати',
    venue: {
      label: 'Місце святкування',
      country: 'Литва',
      mapLink: 'Відкрити в Google Maps',
      mapTitle: 'Мапа Babtyno dvaras',
      alt: 'Маєток Babtyno dvaras',
    },
    airports: {
      kun: {
        name: 'Аеропорт Каунаса',
        text: 'Найближчий аеропорт із прямими рейсами з низки європейських міст.',
      },
      vno: {
        name: 'Аеропорт Вільнюса',
        text: 'Столичний аеропорт із найбільшим вибором рейсів. Між Вільнюсом і Каунасом курсують потяги та автобуси.',
      },
    },
    stay: {
      title: 'Де зупинитися',
      text: 'Ми готуємо список готелів і гостьових будинків у Каунасі та околицях — на будь-який бюджет.',
    },
    shuttle: {
      title: 'Трансфер',
      text: 'Ми розглядаємо можливість трансферу між Каунасом і маєтком. Напишіть у відповіді, чи скористалися б ви ним.',
    },
    tips: {
      currency: { title: 'Валюта', text: 'У Литві розраховуються в євро. Картки приймають майже всюди.' },
      weather: {
        title: 'Погода в серпні',
        text: 'Зазвичай тепло — вдень трохи більше ніж 20 °C, вечори прохолодніші, інколи буває літній дощ. Візьміть легку накидку.',
      },
      language: {
        title: 'Мова',
        text: 'Місцева мова — литовська, багато хто розмовляє англійською. «Ačiū» («ачю») означає «дякую».',
      },
      timezone: {
        title: 'Часовий пояс',
        text: 'Східноєвропейський літній час (UTC+3): на годину більше, ніж в Іспанії, і так само, як в Україні.',
      },
    },
  },
  rsvp: {
    label: 'Просимо відповісти',
    title: 'Підтвердження присутності',
    deadline: 'Будь ласка, дайте відповідь до {date}',
    quote: 'Не можемо дочекатися, щоб відсвяткувати разом із вами!',
    photoAlt: 'Угне та Дімон',
    optional: 'необов’язково',
    name: { label: 'Ім’я та прізвище', hint: 'як у запрошенні' },
    email: { label: 'Електронна пошта' },
    phone: { label: 'Телефон' },
    attending: { legend: 'Чи будете ви присутні?', yes: 'З радістю приймаю', no: 'На жаль, не зможу' },
    guests: { label: 'Кількість гостей', hint: 'разом із вами' },
    companion: { label: 'Гість {n} — ім’я та прізвище' },
    country: {
      label: 'Звідки ви їдете',
      choose: 'Оберіть',
      es: 'Іспанія',
      ua: 'Україна',
      lt: 'Литва',
      other: 'Інша країна',
    },
    dietary: {
      label: 'Особливості харчування чи алергії',
      placeholder: 'Вегетаріанське, без глютену, алергія на горіхи…',
    },
    extras: {
      legend: 'Чи можемо ми чимось допомогти?',
      accommodation: 'Потрібна допомога з пошуком житла',
      shuttle: 'Цікавить трансфер',
    },
    song: { label: 'Пісня, яка виведе вас на танцмайданчик', placeholder: 'Виконавець — назва' },
    note: { label: 'Кілька слів для молодят' },
    submit: 'Надіслати відповідь',
    sending: 'Надсилаємо…',
    errors: {
      name: 'Будь ласка, вкажіть своє ім’я.',
      email: 'Введіть дійсну адресу електронної пошти.',
      attending: 'Повідомте, чи зможете ви прийти.',
      companion: 'Вкажіть ім’я цього гостя.',
      failed: 'Перепрошуємо — не вдалося надіслати відповідь. Спробуйте ще раз або напишіть нам на {email}.',
    },
    success: {
      acceptTitle: 'Дякуємо, {name}!',
      acceptText: 'Не можемо дочекатися, щоб відсвяткувати разом із вами.',
      declineTitle: 'Дякуємо, {name}.',
      declineText: 'Шкода, що ви не зможете приїхати. Нам вас бракуватиме — і того дня ми піднімемо келих за вас.',
      again: 'Надіслати ще одну відповідь',
    },
  },
  gifts: {
    label: 'З вдячністю',
    title: 'Подарунки',
    intro:
      'Ваша присутність — найкращий подарунок. Якщо ви хочете долучитися до нашого наступного спільного розділу, це можна зробити банківським переказом.',
    note: 'На цьому сайті платежі не приймаються — це лише наші реквізити для банківського переказу.',
    fields: {
      accountHolder: 'Власник рахунку',
      iban: 'IBAN',
      bic: 'BIC / SWIFT',
      bank: 'Банк',
      reference: 'Призначення платежу',
    },
    copy: 'Копіювати',
    copyLabel: 'Копіювати: {field}',
    copied: 'Скопійовано: {field}',
    copyFailed: 'Не вдалося скопіювати — виділіть текст вручну',
  },
  faq: {
    label: 'Запитання та відповіді',
    title: 'Часті запитання',
    items: {
      dress: {
        q: 'Що одягнути?',
        a: 'Елегантне літнє вбрання. Частина дня мине надворі, на траві, тож стійкий підбор чи танкетка зручніші за шпильки, а на вечір знадобиться легка накидка.',
      },
      plusOnes: {
        q: 'Чи можна прийти з парою?',
        a: 'У запрошенні будуть зазначені всі, на кого ми чекаємо. Якщо маєте сумніви — просто запитайте нас.',
      },
      kids: {
        q: 'Чи можна з дітьми?',
        a: 'Ми ще узгоджуємо деталі й невдовзі оновимо цю сторінку. Якщо плануєте їхати з малечею, згадайте про це в примітці до відповіді.',
      },
      parking: {
        q: 'Чи є паркування біля маєтку?',
        a: 'Ми уточнюємо в маєтку питання паркування й опублікуємо деталі тут.',
      },
      weather: {
        q: 'А якщо піде дощ?',
        a: 'Серпень зазвичай теплий і сонячний — але це Балтія. У нас є план під дахом, тож свято відбудеться, хоч би що вирішило небо.',
      },
      photos: {
        q: 'Чи можна фотографувати?',
        a: 'Ми хотіли б церемонію без телефонів і камер — щоб усі були по-справжньому поруч. Наш фотограф зніме все, а після церемонії фотографуйте скільки заманеться.',
      },
      language: {
        q: 'Якою мовою буде церемонія?',
        a: 'Уточнюється. Гості приїдуть із Литви, України, Іспанії та інших країн, тож ми подбаємо, щоб найважливіші моменти були зрозумілі всім.',
      },
      contact: {
        q: 'До кого звернутися із запитаннями?',
        a: 'Напишіть нам на {email} — ми відповімо, щойно зможемо.',
      },
    },
  },
  footer: {
    date: '7 серпня 2027',
    place: 'Каунас, Литва',
    made: 'Створено з любов’ю для нашого «назавжди»',
  },
};

const dictionaries = { en, es, lt, uk };

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
