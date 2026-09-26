# Lumina — Style Reference
> Friendly SaaS dashboard on a soft sky-blue canvas

**Theme:** light

Derived from the Lumina HTML mockup (`LuminaFigma.html` — the full-flow prototype built for Figma import). Tokens and components below are extracted directly from that file's stylesheet, not reinterpreted. Where the mockup used a static/non-interactive stand-in (fake `<select>`/`<input>` divs, initials-only avatars, prototype-only section banners), that is called out explicitly under **Implementation Notes** so it isn't ported literally into the real Next.js app.

Lumina keeps the mascot-led, single-saturated-green brand voice inherited from its earlier Duolingo-style reference, but rebuilds the UI chrome as a calmer, modern SaaS product: a pale blue page canvas, white elevated cards with soft shadows (no thick borders), Nunito as the one typeface at every weight from Black to SemiBold, and a strict two-color action system — **green for primary/positive actions and the currently-selected nav item**, **blue reserved for links, informational accents, and secondary UI** (dates, tags, icon tints). Status colors (yellow/purple/red/teal/pink) exist only as small, purposeful accents — never as chrome.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Ink Navy | `#1e2a4a` | `--ink` | Primary text color for all headings and body-adjacent UI; also the dark surface for the footer and the prototype's section dividers |
| Slate 600 | `#54607a` | `--gray-600` | Secondary UI text — sidebar nav labels, sort/filter pill text |
| Slate 500 | `#6b7a99` | `--gray-500` | Body copy and captions — the default "quiet" text color |
| Slate 400 | `#9aa8c2` | `--gray-400` | Placeholder text, muted calendar days, chevrons, disabled-adjacent icons |
| Hairline | `#e7ecf3` | `--border` | 1–1.5px borders on cards, inputs, and pills |
| Sky Canvas | `#eff5fc` | `--page-bg` | Page background — every screen sits on this pale blue, never pure white |
| Card White | `#ffffff` | `--card-bg` | Card, sidebar, and topbar surfaces |
| Action Green | `#58cc02` | `--green` | **Primary action color.** Fill for primary buttons, success actions, "verified/approved/confirmed" badges, and the active state of nav pills/sidebar items |
| Action Green Dark | `#46a300` | `--green-dark` | Hover state for green fills; text color on green-tinted active states |
| Action Green Light | `#d9f7b3` | `--green-light` | Background wash behind active nav items and green badges |
| Link Blue | `#2f6fee` | `--blue` | Links, informational icon tints, calendar "today"/confirmed accents, secondary data (dates, prices) — **never** the primary CTA fill |
| Link Blue Dark | `#1e56c9` | `--blue-dark` | Text on blue-tinted chips/badges |
| Blue Wash | `#eaf1ff` | `--blue-light` | Chip and icon-square background tint |
| Blue Wash (pale) | `#f5f9ff` | `--blue-lighter` | Lightest tint, used behind icon buttons and callout boxes |
| Warning Amber | `#f2a93b` / text `#b4780c` | `--yellow` / `--yellow-text` | "Pending" status only |
| Violet Accent | `#8b5cf6` | `--purple` | "Rescheduled" status and one rotating subject/step accent |
| Alert Red | `#ef4444` | `--red` | Destructive actions (reject), notification dot, error callouts |
| Rose Accent | `#f472b6` | `--pink` | Decorative avatar/subject accent only — never chrome |
| Teal Accent | `#14b8a6` | `--teal` | Decorative avatar/subject accent only — never chrome |

Each accent (yellow/purple/red/pink/teal) ships with a matching `-light` background tint (e.g. `--yellow-light`, `--purple-light`) at roughly 90% white for badge and icon-square fills — see the Quick Start block for exact values.

## Tokens — Typography

### Nunito — the only typeface, carried across every weight from body copy to display numbers · `--font`
- **Family stack:** `'Nunito', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
- **Weights in use:** 900 (Black), 800 (ExtraBold), 700 (Bold), 600 (SemiBold)
- **Role:** 900 for hero/page headlines and big numerals (step numbers, date-chip day); 800 for section titles and card titles; 700 for buttons, nav labels, chips, badges, form labels; 600 (SemiBold) for every body/caption string. Regular 400 is loaded but not used — nothing in the system renders below SemiBold.

### Type Scale

| Role | Class | Weight | Size | Line Height | Letter Spacing | Color |
|------|-------|--------|------|-------------|-----------------|-------|
| hero headline | `.t-h1` | 900 | 44px | 1.15 | -0.02em | Ink Navy |
| page title | `.t-h1-sm` | 900 | 34px | 1.2 | -0.01em | Ink Navy |
| section title | `.t-h2` | 800 | 22px | — | — | Ink Navy |
| card / row title | `.t-h3` | 800 | 18px | — | — | Ink Navy |
| subtitle | `.t-sub` | 600 | 16px | — | — | Slate 500 |
| body | `.t-body` | 600 | 14.5px | 1.55 | — | Slate 500 |
| label / caption | `.t-label` | 700 | 13px | — | — | Slate 500 |
| eyebrow | `.t-eyebrow` | 800 | 12px | — | 0.06em, uppercase | Link Blue |

**Important divergence from the brand's earlier reference:** headline text is **Ink Navy, not Action Green.** Green is spent entirely on buttons, success/verified badges, and active nav state — it never colors large display text.

## Tokens — Spacing & Shapes

**Base unit:** 4px · **Density:** comfortable-to-spacious (cards default to 20–24px internal padding)

### Border Radius

| Element | Value | Token intent |
|---------|-------|---------------|
| Buttons, nav pills, chips, badges, filter pills, calendar-legend dots | `999px` (pill) | `--radius-pill` |
| Cards (`.card`), step cards, search bar | `16–20px` | `--radius-lg` |
| Block buttons, form fields, icon-squares, sidebar nav items | `12–14px` | `--radius-md` |
| Calendar day cells, small icon chips | `8–10px` | `--radius-sm` |

### Layout

- **Page container max-width:** 1440px, centered
- **Sidebar width (authenticated shell):** 264px fixed
- **Card elevation:** `box-shadow: 0 10px 30px rgba(30,42,74,.07), 0 2px 6px rgba(30,42,74,.04)` — soft and diffuse, paired with a 1px hairline border. **No thick 2px borders and no flat sticker fills** — this is the opposite treatment from the brand's earlier Duolingo-style reference.
- **Section rhythm:** generous vertical padding on marketing sections (48–72px); tight 16px row padding inside list/table components (sessions, admin queue)

## Components

### Primary Button
**Role:** The one filled action color in the system — "Encontrar tutor," "Confirmar reserva," "Aprobar," "Guardar cambios"

Fill `--green` (#58cc02), white text, Nunito 800 at 14.5px, fully pill-shaped (`border-radius:999px`), 13px/24px padding, no border. Hover darkens to `--green-dark`. A `.btn-block` variant swaps the pill for a 12px-radius full-width rectangle (used inside cards, e.g. "Ver perfil").

### Outline Button
**Role:** Secondary action paired with a primary button, or a low-emphasis action ("Iniciar sesión," "Ver perfil completo")

White fill, Ink Navy text, 1.5px solid `--border`, same pill/radius rules as Primary. Never carries color itself — it recedes so the green primary stands out.

### Danger Outline Button
**Role:** Destructive/negative action ("Rechazar")

White fill, `--red` text, border in `--red-light`. Same shape family as Outline; color is the only signal that it's destructive.

### Nav Pill (marketing topbar)
**Role:** Top navigation on public/pre-auth pages

Transparent, Slate 600 text, Nunito 700 at 14.5px, pill radius. Active state: `--green-light` fill + `--green-dark` text — the *only* place besides buttons where green appears as a fill.

### Sidebar Nav Item (authenticated app shell)
**Role:** Left-rail navigation once a student or tutor is signed in

Full-width row, 12px radius, icon + label, Slate 600 / Nunito 700 at 15px. Active state matches the nav pill: `--green-light` background, `--green-dark` text and icon.

### App Topbar (utility bar)
**Role:** Top-right identity strip on every authenticated screen — never on public/marketing pages

A notification bell (with a small red dot badge when unread) plus a user chip: circular avatar, name (800/14px), role label (600/12px, Slate 500), and a chevron. Present and identical in structure on **every** signed-in screen — student and tutor alike — so the chrome never looks like it belongs to a different app from page to page.

### Card
**Role:** The default content container everywhere — tutor cards, stat tiles, form sections, admin queue rows

White fill, 1px `--border`, 16–20px radius, the soft shadow above, 20–24px padding. `.card-flat` drops the shadow (border only) for dense dashboard tiles that sit close together (agenda stat row).

### Step Card
**Role:** Numbered "how it works" explainer card

Same card treatment plus a 5px colored top border that cycles green → blue → purple → yellow across a row, and a large (900/26px) muted step number above the title. Used once per numbered-flow explainer, never as a generic card variant.

### Chip
**Role:** Small inline tag — subject labels, "Ver todos" links styled as chips, filter values

Pill radius, `--blue-light` fill / `--blue-dark` text by default (subject taxonomy stays blue so it never competes visually with green action buttons). Context-specific chips (subject cards on the Materias catalog) recolor to match that subject's accent (purple for Física, pink for Química, teal for Inglés, amber for Programación, green for Biología) — the *only* place the decorative accent palette is allowed to tint UI chrome, and only inside a subject-taxonomy context.

### Badge
**Role:** Status pill — verification/approval/session state

`badge-green` (aprobado/confirmado/verificado), `badge-yellow` (pendiente), `badge-purple` (reprogramada), `badge-gray` (completada), `badge-red` (rechazado). Each pairs a `-light` tint background with its solid-color text — never a solid fill with white text, which is reserved for buttons.

### Avatar Placeholder
**Role:** Stand-in for a person's photo — students, tutors, admins

Solid-color circle with two-letter initials, Nunito 800, white text. **Implementation note:** no photography exists in the asset set; this placeholder is intentional and should be swapped for real uploaded photos in the built app, not kept as the final treatment.

### Fake Select / Fake Search / Field
**Role:** Static, pill- or box-shaped stand-ins for form controls in the mockup

**Implementation note:** the mockup renders every input, select, and textarea as a styled `<div>`/`<span>` (never a real form element) so that an HTML→Figma import captures placeholder copy as real, editable text layers. This is a mockup-only technique. The real Next.js app must implement these as genuine accessible `<select>`, `<input>`, and `<textarea>` elements styled to the same spec (1.5px `--border`, matching radius, `--gray-400` placeholder color, `--blue` focus ring) — never literally as non-interactive divs.

### Session Row / Date Chip
**Role:** List item for a booked session — reused identically in the student agenda, the tutor's session list, and admin's recent-activity views

Horizontal row: a `--blue-light` date chip (day number 900/16px + month label 700/10px uppercase) → avatar → subject chip + title/subtitle → status badge or action buttons. One component, reused verbatim across every "list of sessions" screen so they never drift in style from each other.

### Calendar
**Role:** Month view on the student agenda

7-column grid, muted out-of-month days, a filled `--blue` circle for "today," and small 5–8px colored dots (blue/yellow/green) as a status legend for confirmed/pending/completed sessions on a given date.

### Admin Shell
**Role:** The administrator's verification tool — a deliberately separate product surface

Dark navy (`#0f1730` background, `#161f3d` topbar) — a different, deeper dark than Ink Navy, so Admin visually reads as *another product*, not a dark-mode of the student/tutor app. Carries a small "domain chip" label (e.g. `admin.lumina.app`) in its topbar as a reminder that this tool is scoped to administrators only and must never be linked from the student/tutor navigation — only from a footer-level, clearly-labeled link.

## Do's and Don'ts

### Do
- Reserve `--green` (#58cc02) for exactly two things: filled primary/success actions, and the active state of navigation. Nothing else is ever green.
- Keep all headline and body text in Ink Navy or the Slate scale — color is a signal for interactivity/state, not decoration.
- Use `--blue` for every link, informational tag, and secondary accent (dates, prices, subject chips by default) — it is the "informational" color, distinct from the "action" green.
- Give every card the same soft-shadow + hairline-border treatment; never mix a bordered-only card and a shadow-only card on the same screen tier.
- Reuse the Session Row / Card / Badge components verbatim across screens — a status pill or list row should look identical whether it's on the student agenda, the tutor's sessions, or the admin queue.
- Keep the authenticated app topbar (bell + user chip) present and in the same position on every signed-in screen.
- Keep the Admin surface visually distinct (dark, separate topbar, domain chip) — never let it share chrome with the student/tutor sidebar shell.

### Don't
- Don't color display headlines green — that was the previous brand reference's rule; this system moves headline color to Ink Navy and spends green on action/state only.
- Don't add drop shadows *and* thick 2px borders to the same element — cards get a soft shadow with a 1px hairline, never a heavy sticker-style border.
- Don't apply the decorative accent palette (pink, teal, purple, amber) to buttons, nav, or any action chrome — those colors live only inside subject-taxonomy chips/icons and status badges.
- Don't ship the mockup's static fake `<select>`/`<input>` divs as real product code — they exist only for the Figma-export prototype (see Implementation Notes on each component).
- Don't put the admin "Panel de administración" or any authenticated-only content (agenda, "Mi ...") on a public/pre-login page — if a nav item or link is shown, its destination must exist and must be scoped correctly to signed-in vs. public.
- Don't invent a new sidebar layout per page — every authenticated screen for a given role (student or tutor) shares one identical nav item list; only the active item changes.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Sky Canvas | `#eff5fc` | Page background behind every screen — nothing sits directly on pure white |
| 1 | Card White | `#ffffff` | Cards, sidebar, topbars — elevated via soft shadow, not color |
| 2 | Action Green | `#58cc02` | Primary button fills and active-nav washes |
| 3 | Ink Navy | `#1e2a4a` | Body/heading text color; also the footer and section-divider dark band |
| 4 | Deep Night (Admin only) | `#0f1730` / `#161f3d` | The administrator tool's dedicated dark surface — intentionally distinct from Ink Navy |

## Imagery

The Lumina mascot (a smiling sun/citrus character with a green leaf) appears contextually per screen — waving on auth/landing screens, reading on academic screens, holding a checkmark on confirmation/agenda screens, worried on error/rejected states — placed inside a circular flat-color "spotlight" wash (a solid tint circle behind the PNG, no gradients) rather than floating bare on the canvas. People are represented as solid-color initial avatars, never photography, pending real uploaded photos in the built product. Iconography is a single consistent outline set (24px viewBox, 2px stroke, rounded caps/joins) — no mixed icon styles.

## Layout

Three distinct shells, used deliberately by context:

1. **Public/marketing shell** — full-width topbar (logo, in-page anchor nav, "Iniciar sesión"/"Encontrar tutor"), single-column vertical sections inside a 1440px-max container (hero → step-by-step explainer → subject teaser → footer). Used only pre-authentication (Inicio, Login, Registro, legal page).
2. **Authenticated app shell** — fixed 264px white sidebar (role-specific nav list, green active state) + fluid main column with the bell/user-chip topbar. Identical structure for the student and tutor roles; only the nav items and the signed-in identity differ.
3. **Admin shell** — dark, topbar-only (no sidebar), domain-chip labeled, reachable only via an explicit "this is a separate tool" link — never part of shells 1 or 2.

## Agent Prompt Guide

Quick Color Reference:
- text (all headings/body): `#1e2a4a` (Ink Navy) / `#6b7a99` (Slate, body)
- background (page): `#eff5fc`
- background (cards/chrome): `#ffffff`
- primary action / success / active-nav: `#58cc02`
- links / secondary accents / info: `#2f6fee`
- destructive action: `#ef4444`
- pending status: `#f2a93b`
- admin-only dark surface: `#0f1730`

Example Component Prompts:
1. Primary Button: Nunito 800 at 14.5px, white text, `#58cc02` fill, fully pill-shaped, no border, darkens to `#46a300` on hover.
2. Card: white fill, 1px `#e7ecf3` border, 16–20px radius, soft diffuse shadow (`0 10px 30px rgba(30,42,74,.07)`), 20–24px padding — never a thick colored border.
3. Status Badge: pill, `-light` tint background with solid-color text of the same hue (green/yellow/purple/gray/red) — never solid fill with white text.

## Similar Brands

- **Calendly** — Pale-blue canvas, white card-based booking flow, single blue/green action color against a calm neutral scale — the closest structural cousin to Lumina's booking flow
- **Linear** — Soft-shadow card system, colored status pills, consistent single-accent action color across a dense product UI
- **Notion** — The fixed left-sidebar + fluid main-content app shell pattern, identical nav structure across every authenticated page
- **Airbnb** — Card-grid marketplace listings pairing avatar + rating + price + tag chips, the same anatomy as Lumina's tutor cards
- **Duolingo** *(heritage, not visual reference)* — The mascot-led brand voice and the choice of Action Green as the signature color are carried over from Lumina's earlier style reference, even though the UI chrome itself has moved away from Duolingo's flat sticker-and-thick-border treatment

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Typography */
  --font: 'Nunito', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  /* Text & neutrals */
  --ink: #1e2a4a;
  --gray-600: #54607a;
  --gray-500: #6b7a99;
  --gray-400: #9aa8c2;
  --border: #e7ecf3;
  --page-bg: #eff5fc;
  --card-bg: #ffffff;

  /* Action green (primary / success / active-nav) */
  --green: #58cc02;
  --green-dark: #46a300;
  --green-light: #d9f7b3;

  /* Link / informational blue */
  --blue: #2f6fee;
  --blue-dark: #1e56c9;
  --blue-light: #eaf1ff;
  --blue-lighter: #f5f9ff;

  /* Status accents */
  --yellow: #f2a93b;
  --yellow-light: #fef2de;
  --yellow-text: #b4780c;
  --purple: #8b5cf6;
  --purple-light: #f1ebfe;
  --red: #ef4444;
  --red-light: #fde8e8;
  --pink: #f472b6;
  --pink-light: #feecf5;
  --teal: #14b8a6;
  --teal-light: #e1f7f3;

  /* Elevation */
  --shadow-card: 0 10px 30px rgba(30, 42, 74, 0.07), 0 2px 6px rgba(30, 42, 74, 0.04);

  /* Radii */
  --radius-pill: 999px;
  --radius-lg: 20px;
  --radius-md: 14px;
  --radius-sm: 10px;

  /* Layout */
  --page-max-width: 1440px;
  --sidebar-width: 264px;

  /* Admin-only dark surface */
  --admin-bg: #0f1730;
  --admin-topbar-bg: #161f3d;
  --admin-border: #2a3560;
}
```

### Tailwind v4

```css
@theme {
  --font-sans: 'Nunito', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  --color-ink: #1e2a4a;
  --color-gray-600: #54607a;
  --color-gray-500: #6b7a99;
  --color-gray-400: #9aa8c2;
  --color-border: #e7ecf3;
  --color-page-bg: #eff5fc;

  --color-green: #58cc02;
  --color-green-dark: #46a300;
  --color-green-light: #d9f7b3;

  --color-blue: #2f6fee;
  --color-blue-dark: #1e56c9;
  --color-blue-light: #eaf1ff;

  --color-yellow: #f2a93b;
  --color-yellow-light: #fef2de;
  --color-purple: #8b5cf6;
  --color-purple-light: #f1ebfe;
  --color-red: #ef4444;
  --color-red-light: #fde8e8;
  --color-pink: #f472b6;
  --color-teal: #14b8a6;

  --color-admin-bg: #0f1730;
  --color-admin-topbar: #161f3d;

  --radius-pill: 999px;
  --radius-lg: 20px;
  --radius-md: 14px;
  --radius-sm: 10px;

  --shadow-card: 0 10px 30px rgb(30 42 74 / 0.07), 0 2px 6px rgb(30 42 74 / 0.04);
}
```
