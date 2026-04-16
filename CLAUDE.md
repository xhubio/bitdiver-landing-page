# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing/documentation site for **BitDiver** — an open-source TypeScript E2E test automation framework (`@xhubio/bitdiver-runner`, repo `github.com/xhubio/bitdiver-runner`). The site itself is plain HTML/CSS/JS with **no build system, no package.json, and no test suite** — files are served as-is.

- Deploys to `bitdiver.xhub.io` (see `CNAME`) via GitHub Pages.
- Preview locally by opening `index.html` directly, or run any static server from the repo root (e.g. `python3 -m http.server 8000`). Root-relative paths like `/css/brutalist.css` require serving from the repo root, not a subdirectory.

## Structure

- `index.html`, `about.html`, `imprint.html`, `privacyPolicy.html` — top-level pages.
- `docs/*.html` — product documentation pages; they share a sidebar nav that is **duplicated in each file** (no templating). When adding/renaming a docs page, update the sidebar `<nav class="toc">` block in every `docs/*.html` file.
- `css/brutalist.css` — full design system; `css/docs.css` — docs-page layout only.
- `js/theme.js`, `js/cookies.js` — vanilla JS, no modules/bundler.
- `img/` — assets including `logo.png`, `favicon.png`, feature icons (`fa-*.svg`), architecture diagram (`arch.svg`).

## Theming (important)

The design system ships **two themes** selected by a `data-theme` attribute on `<body>`:

- `data-theme="tactical"` — dark "Tactical Telemetry" mode (default on page load).
- `data-theme="swiss"` — light "Swiss Industrial Print" mode.

All styling is driven by CSS custom properties defined under `body[data-theme="tactical"]` and `body[data-theme="swiss"]` blocks at the top of `css/brutalist.css`. **Never hardcode colors or fonts** — add/modify tokens in both theme blocks so both modes stay consistent. Selectors throughout the stylesheet are scoped with `body[data-theme="tactical"]` / `body[data-theme="swiss"]`; follow that pattern for new rules.

`js/theme.js` persists the user's choice in `localStorage` under key `bitdiver-theme` and is loaded inline early so the theme applies before paint. The UI toggle calls `toggleTheme()`.

A global `* { border-radius: 0 !important }` rule is intentional — the brutalist aesthetic forbids rounded corners.

## Cookies & Analytics

`js/cookies.js` implements a cookie-consent banner that conditionally loads Google Analytics. The GA measurement ID is currently the placeholder `G-XXXXXXXXXX` in `loadGA()` / `removeGA()` — replace consistently in all three spots (script src, `gtag('config', …)`, and the two `_ga*` cookie-clear lines) when wiring real analytics. Consent state lives in `localStorage` key `bitdiver-cookies` as JSON `{ analytics: boolean }`; legacy string values (`"accepted"`) are migrated on load.

## SEO

`index.html` contains multiple JSON-LD blocks (SoftwareApplication, WebSite, HowTo, FAQPage) plus OpenGraph/Twitter meta. When updating product copy (features, FAQs, steps), keep the visible HTML and the corresponding JSON-LD in sync — search engines read both.
