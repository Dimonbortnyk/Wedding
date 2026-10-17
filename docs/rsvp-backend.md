# RSVP backend

The RSVP form never talks to a backend directly. It calls one function,
`submitRsvp(data)` in [`js/rsvp.js`](../js/rsvp.js), which hands the response to
whichever backend is selected in [`js/config.js`](../js/config.js):

```js
rsvp: {
  backend: 'local',   // 'local' | 'formspree' | 'supabase'
  …
}
```

| Backend | Where responses go | Good for |
| --- | --- | --- |
| `local` (default) | The visitor's own browser (`localStorage`) and the console. **Nothing is sent to you.** | The mockup, demos |
| `formspree` | An email to you per response | Getting going in five minutes |
| `supabase` | A row in a Postgres table | A guest list you can sort, filter and export |

> **Before sharing the site with guests, switch away from `local`** — otherwise
> responses stay on each guest's device and you will never see them.

## The payload

Every backend receives the same object:

| Field | Type | Notes |
| --- | --- | --- |
| `full_name` | string | As on the invitation |
| `email` | string | |
| `phone` | string | `''` when not given |
| `attending` | boolean | |
| `guests_count` | number | Including the respondent; `0` when declining |
| `companions` | string[] | Names of the other guests |
| `dietary` | string | |
| `country` | string | `ES`, `UA`, `LT`, `OTHER` or `''` |
| `needs_accommodation` | boolean | |
| `wants_shuttle` | boolean | |
| `song` | string | |
| `note` | string | |
| `language` | string | Language the guest was reading in: `en`, `es`, `lt`, `uk` |

## Option A — `local` (default)

No setup. To see what was "sent", open the browser console on the site:

```js
JSON.parse(localStorage.getItem('wedding.rsvps'))
```

## Option B — Formspree

1. Create a free account at <https://formspree.io> and add a new form.
2. Copy the form endpoint (it looks like `https://formspree.io/f/abcdwxyz`).
3. In `js/config.js`:

   ```js
   rsvp: {
     backend: 'formspree',
     formspree: { endpoint: 'https://formspree.io/f/abcdwxyz' },
     …
   }
   ```

4. Send a test response and confirm the email arrives. In the Formspree dashboard,
   restrict the form to your site's domain and turn on spam filtering.

Check the free plan's monthly submission limit against your guest count.

## Option C — Supabase

### 1. Create the table

Create a project at <https://supabase.com>, open **SQL Editor** and run:

```sql
create table public.rsvps (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  full_name           text not null check (char_length(full_name) between 1 and 200),
  email               text not null check (char_length(email) between 3 and 200),
  phone               text check (char_length(phone) <= 40),
  attending           boolean not null,
  guests_count        smallint not null default 0 check (guests_count between 0 and 10),
  companions          text[] not null default '{}',
  dietary             text check (char_length(dietary) <= 1000),
  country             text check (country in ('', 'ES', 'UA', 'LT', 'OTHER')),
  needs_accommodation boolean not null default false,
  wants_shuttle       boolean not null default false,
  song                text check (char_length(song) <= 200),
  note                text check (char_length(note) <= 2000),
  language            text check (char_length(language) <= 5)
);

-- Row-level security: the public site may INSERT, and nothing else.
alter table public.rsvps enable row level security;

create policy "Guests can submit an RSVP"
  on public.rsvps
  for insert
  to anon
  with check (true);

-- There is deliberately no SELECT / UPDATE / DELETE policy for `anon`:
-- guests cannot read, change or remove anyone's response (including their own).
```

### 2. Point the site at it

In the Supabase dashboard, open **Project Settings → API** and copy the
**Project URL** and the **anon / public** key. Then in `js/config.js`:

```js
rsvp: {
  backend: 'supabase',
  supabase: {
    url: 'https://xxxxxxxx.supabase.co',
    anonKey: 'eyJ…',
    table: 'rsvps',
  },
  …
}
```

The anon key is designed to be public and is safe to commit, **provided row-level
security is enabled as above**. Never put the `service_role` key in this repo.

### 3. Test

Send a response from the site, then check **Table Editor → rsvps**. If the form
shows an error, the browser console has the HTTP status and message from Supabase
(a `401`/`403` usually means the policy or the key is wrong).

### Reading the responses

A guest who changes their mind simply submits again, which adds a second row.
This view keeps the latest response per email address:

```sql
create view public.rsvps_latest
with (security_invoker = true) as
select distinct on (lower(email)) *
from public.rsvps
order by lower(email), created_at desc;
```

Handy totals:

```sql
select
  count(*) filter (where attending)       as accepted,
  count(*) filter (where not attending)   as declined,
  coalesce(sum(guests_count), 0)          as guests_total,
  count(*) filter (where wants_shuttle)   as shuttle_requests,
  count(*) filter (where needs_accommodation) as accommodation_requests
from public.rsvps_latest;
```

Export to CSV from the Table Editor, or query the table from a spreadsheet.

## Adding another backend

Write an `async function submitSomething(data)` in `js/rsvp.js` that throws when
delivery fails, add it to the `BACKENDS` map, and set `rsvp.backend` to its key.
Nothing in the form needs to change.

## Spam and privacy

- The form has a hidden honeypot field; submissions that fill it are dropped.
- The site collects names, contact details and dietary information. Keep access to
  the inbox or database limited to the two of you, and delete the data after the
  wedding.
