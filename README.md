# LakshTech Solutions

A six-page marketing site for a fictional software studio, built with React, Vite and Tailwind CSS.

## Stack

- React 19 with React Router 7
- Vite 7
- Tailwind CSS 4 (CSS-first theme in `src/styles.css`)
- No icon packs, UI kits or state libraries

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/
npm run preview    # serve the production bundle on http://localhost:4173
```

Node 20 or newer is recommended. Install with `npm ci` if `package-lock.json` is present.

## Routes

| Route            | Purpose                                                          |
| ---------------- | ---------------------------------------------------------------- |
| `/`              | Hero, capability summary, featured work, stats, testimonials     |
| `/about`         | Story, mission and vision, values, timeline, team                |
| `/services`      | Six services with filter tabs, process, inclusions, FAQ          |
| `/portfolio`     | Search, category filter, sort, saved shortlist, project modals   |
| `/contact`       | Validated enquiry form with draft autosave, contact details, FAQ |
| anything else    | Styled 404 with recovery links                                   |

## Features

- Sticky header with a keyboard accessible Services disclosure, mobile drawer and shortlist counter.
- Portfolio search across title, summary, category and stack; category filters with live counts;
  sort by newest, oldest or title; shortlist-only view; clear-filters action.
- Mocked project request (420 ms) that renders loading skeletons, an empty state, an error state and
  a retry path. Add `?simulate=error` to `/portfolio` to replay the failure.
- Project detail modal with focus trap, Escape to close, scroll lock and focus return.
- Saved projects persisted in `localStorage` under `lakshtech:savedProjects`, shared by header,
  portfolio and home page.
- Contact form validated on submit and on blur (name, email, 10 digit phone, subject, 20 character
  minimum message). Errors are announced, the first invalid field is focused and a draft is saved
  under `lakshtech:contactDraft`. The form never transmits anything.
- `?subject=` prefill on the contact page, for links from other pages.
- Scroll reveals and stat counters that respect `prefers-reduced-motion`.
- Skip link, single `h1` per page, labelled controls, `aria-live` status text and visible focus.
- Per-route document titles and descriptions.
- Footer privacy dialog covering local storage, cookies, analytics and external font requests.

## Content and limitations

- This is a demonstration build. Company details, statistics, testimonials, team profiles and
  project case studies are sample content.
- There is no backend. The portfolio fetch is simulated and the contact form validates and clears
  locally without sending data.
- `localStorage` is the only persistence layer, so drafts and the shortlist are per browser. The
  footer privacy dialog explains exactly what is kept and how to remove it.
- Client-side routing assumes a host that rewrites unknown paths to `index.html`. Vite preview does
  this automatically and `vercel.json` configures the same rewrite for Vercel.

## Structure

```
src/
  components/        layout, shared UI and page components
  context/           saved projects provider
  data/site.js       all page content and the eight sample projects
  lib/               storage, mock API, class helper, page metadata hook
  pages/             Home, About, Services, Portfolio, Contact, NotFound
  styles.css         Tailwind import, theme tokens, base and component styles
public/assets/       logos, project screens, studio and team images
```

## Checks run

- Production build completes with no warnings.
- 84 functional checks across navigation, tabs, accordion, modals, filters, form validation,
  storage and responsive overflow from 320 px to 1440 px.
- Link and asset audit: every internal route and hash target resolves, all images load with alt text.
- Accessibility pass: skip link, tab arrow keys, modal and drawer focus handling, reduced motion.
