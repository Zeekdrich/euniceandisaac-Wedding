# AGENTS.md

Context for developers and AI agents working on the Isaac & Eunice wedding invitation.

## What this project is

A single-page wedding invitation with online RSVPs, plus a passcode-protected guest list for the couple. It is
feature-complete: the invitation, the countdown, the RSVP form, the database persistence and the guest list are all
built. There is no roadmap file because nothing was deferred.

## Architecture

```
db/
├── schema.ts          # Drizzle schema — the single `rsvps` table
└── index.ts           # Drizzle client over Netlify Database (no connection string needed)
netlify/database/migrations/
└── 20260923183147_create_rsvps/   # Generated migration; Netlify applies it at deploy time
src/
├── data/wedding.ts    # ALL invitation copy: names, dates, times, venue, details, scripture
├── server/
│   └── rsvp.functions.ts  # submitRsvp (insert) and getRsvps (passcode-gated read)
├── components/
│   ├── Hero.tsx       # Floral arch, names, date line, countdown, RSVP call to action
│   ├── Countdown.tsx  # Live countdown; renders "––" until mounted to avoid hydration mismatch
│   ├── Schedule.tsx   # The three celebrations from wedding.events
│   ├── Details.tsx    # Scripture verse, dress code, arrival and questions
│   ├── RsvpForm.tsx   # Controlled attendance toggle + server function submit
│   ├── Footer.tsx     # Monogram, hashtag, discreet link to /rsvps
│   └── Reveal.tsx     # IntersectionObserver fade-up wrapper
├── routes/
│   ├── __root.tsx     # HTML shell, metadata, Google Fonts, paper-texture wash
│   ├── index.tsx      # The invitation page
│   └── rsvps.tsx      # Guest list behind a passcode
└── styles.css         # Tailwind 4 @theme tokens, keyframes, .eyebrow and .rule helpers
scripts/generate-images.mjs   # One-off artwork generation via Netlify AI Gateway
public/img/             # Generated watercolour assets (hero arch, corner spray, divider, paper)
```

## Conventions and non-obvious decisions

- **Copy lives in `src/data/wedding.ts`.** Never hard-code a name, date or venue in a component. The one exception
  is the RSVP deadline, which appears in `index.tsx` and `RsvpForm.tsx`.
- **Design tokens over ad-hoc colours.** Use the `@theme` colours (`ivory`, `paper`, `parchment`, `gold`,
  `gold-soft`, `ink`, `ink-soft`, `sage`, `rose`) and fonts (`font-serif` Cormorant Garamond, `font-script` Great
  Vibes, `font-sans` Jost). `.eyebrow` is the letterspaced small-caps label style; `.rule` is the gold hairline.
- **The artwork has an opaque ivory background**, so every decorative image is composited with
  `mix-blend-multiply` against the ivory page. Dropping that class makes visible rectangles appear.
- **Images are always requested through the Netlify Image CDN** (`/.netlify/images?url=/img/<file>&w=…&fm=webp`),
  never the raw PNG — the originals are ~1.5 MB each.
- **Database access only through server functions.** `src/server/rsvp.functions.ts` is the boundary; components
  call `submitRsvp` / `getRsvps` directly and TanStack Start turns them into RPC calls. Inputs are sanitised and
  clamped in `.inputValidator(...)` (`.validator(...)` does not exist in TanStack Start).
- **Schema changes need a migration.** Edit `db/schema.ts`, then run
  `npx drizzle-kit generate --name <snake_case_name>`. Never apply migrations by hand — Netlify applies them
  during the deploy.
- **Guest list auth is a shared passcode** read from `RSVP_ADMIN_PASSCODE`, with a documented fallback in
  `rsvp.functions.ts`. It is deliberately lightweight; if the project ever needs per-user accounts, use Netlify
  Identity instead of extending the passcode.

## Commands

```bash
netlify dev    # dev server with database emulation (preferred)
npm run dev    # front-end only
npm run build  # production build
```
