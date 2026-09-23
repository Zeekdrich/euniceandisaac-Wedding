# Isaac & Eunice — Wedding Invitation

An online wedding invitation for Isaac and Eunice, celebrating in Onicha Igo, Kogi State:

- **Traditional wedding** — Tuesday, 22 December 2026
- **Church wedding** — Wednesday, 23 December 2026, 11:00 AM (guests seated by 10:00 AM), with the reception
  immediately after

Guests read the invitation, watch the countdown to the ceremony, and reply online. Every reply is saved to a
Postgres database, and the couple can read the full guest list at `/rsvps`.

## Pages

| Route | What it is |
|-------|------------|
| `/` | The invitation: hero, live countdown, the two-day schedule, guest details and the RSVP form |
| `/rsvps` | Passcode-protected guest list with totals (replies, accepted, regrets, guests expected) |

## Technologies

- **TanStack Start** (React 19 + TanStack Router) with file-based routing
- **Tailwind CSS 4** for the ivory-and-gold theme, defined as tokens in `src/styles.css`
- **Netlify Database** (managed Postgres) with **Drizzle ORM** for RSVP storage
- **Netlify Image CDN** to serve the watercolour artwork as resized WebP
- **Netlify AI Gateway** (Gemini image model) generated the floral artwork in `public/img`
- **Vite 7** and TypeScript

## Running locally

```bash
npm install          # or pnpm install
netlify dev          # emulates Netlify features, including the database
```

Then open the URL that `netlify dev` prints. `npm run dev` also works for pure front-end work, but the RSVP form
needs `netlify dev` so the database connection is available.

## Editing the wedding details

All copy — names, dates, times, venue, dress code, the scripture verse — lives in
[`src/data/wedding.ts`](src/data/wedding.ts). Change it there and it updates everywhere on the page, including the
countdown and the page title.

Two things worth reviewing:

- The **traditional wedding time** is currently shown as "Time to be confirmed". Add it in `src/data/wedding.ts`
  when it is settled.
- The **RSVP deadline** (1 December 2026) appears in `src/routes/index.tsx` and `src/components/RsvpForm.tsx`.

## Guest list passcode

`/rsvps` asks for a passcode before showing any replies. Set it in the Netlify UI (or your local `.env`) as:

```
RSVP_ADMIN_PASSCODE=<something private>
```

Until that variable is set, the page falls back to the built-in passcode documented in
`src/server/rsvp.functions.ts` — set your own before sharing the invitation.

## Regenerating the artwork

The four watercolour assets in `public/img` were generated once through Netlify AI Gateway. To make new ones, edit
the prompts and run:

```bash
node scripts/generate-images.mjs
```
