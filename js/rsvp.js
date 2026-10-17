/**
 * RSVP submission — one function, several interchangeable backends.
 *
 * The form (js/main.js) calls `submitRsvp(data)` and only cares whether the promise
 * resolves or rejects. Which backend receives the data is chosen in js/config.js:
 *
 *   rsvp: { backend: 'local' | 'formspree' | 'supabase', … }
 *
 * Setup steps for each backend are in docs/rsvp-backend.md.
 *
 * `data` has this shape (the keys match the Supabase table columns):
 *
 *   {
 *     full_name: string,             // as on the invitation
 *     email: string,
 *     phone: string,                 // '' when not given
 *     attending: boolean,
 *     guests_count: number,          // including the respondent; 0 when declining
 *     companions: string[],          // names of the other guests
 *     dietary: string,
 *     country: '' | 'ES' | 'UA' | 'LT' | 'OTHER',
 *     needs_accommodation: boolean,
 *     wants_shuttle: boolean,
 *     song: string,
 *     note: string,
 *     language: 'en' | 'es' | 'lt' | 'uk',   // language the guest was reading in
 *   }
 */
import { CONFIG } from './config.js';

const LOCAL_STORAGE_KEY = 'wedding.rsvps';

/**
 * 'local' — for the mockup. Nothing leaves the browser: the response is appended to
 * localStorage and logged. Inspect with:  JSON.parse(localStorage.getItem('wedding.rsvps'))
 */
async function submitLocal(data) {
  const entry = { ...data, saved_at: new Date().toISOString() };
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...saved, entry]));
  } catch {
    /* storage unavailable (private mode) — logging below is still useful */
  }
  console.info('[RSVP] local backend — nothing was sent anywhere. Payload:', entry);
  await new Promise((resolve) => setTimeout(resolve, 400)); // let the "Sending…" state be seen
}

/**
 * 'formspree' — emails each response to you; no database needed.
 * Requires CONFIG.rsvp.formspree.endpoint.
 */
async function submitFormspree(data) {
  const { endpoint } = CONFIG.rsvp.formspree;
  if (!endpoint) throw new Error('RSVP: set rsvp.formspree.endpoint in js/config.js');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...data,
      companions: data.companions.join(', '),
      _subject: `Wedding RSVP — ${data.full_name} (${data.attending ? 'accepts' : 'declines'})`,
    }),
  });
  if (!response.ok) throw new Error(`RSVP: Formspree responded ${response.status}`);
}

/**
 * 'supabase' — inserts a row into the `rsvps` table through Supabase's REST API,
 * so no SDK or build step is needed. Requires CONFIG.rsvp.supabase.url and .anonKey,
 * and the table + row-level-security policy from docs/rsvp-backend.md.
 */
async function submitSupabase(data) {
  const { url, anonKey, table } = CONFIG.rsvp.supabase;
  if (!url || !anonKey) throw new Error('RSVP: set rsvp.supabase.url and .anonKey in js/config.js');

  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
      // Guests may insert but not read, so do not ask for the new row back.
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`RSVP: Supabase responded ${response.status} ${await response.text()}`);
}

const BACKENDS = {
  local: submitLocal,
  formspree: submitFormspree,
  supabase: submitSupabase,
};

/** Send one RSVP to the configured backend. Rejects if it could not be delivered. */
export async function submitRsvp(data) {
  const backend = BACKENDS[CONFIG.rsvp.backend];
  if (!backend) throw new Error(`RSVP: unknown backend "${CONFIG.rsvp.backend}" in js/config.js`);
  return backend(data);
}
