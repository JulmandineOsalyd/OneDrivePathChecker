# CLAUDE.md — OneDrive Path Checker Website

## Project Overview

This is the **marketing website** for **OneDrive Path Checker**, a Windows desktop tool that detects file paths exceeding SharePoint/OneDrive length limits before migration. The tool itself is distributed via the Microsoft Store; this repo contains only the product website.

- **Live URL:** https://onedrivepathchecker.com
- **Hosting:** GitHub Pages (custom domain via `CNAME`)
- **Author:** Julie BREDECHE — Osalyd Consulting
- **Language:** French throughout (UI copy, comments, commit messages)

---

## Repository Structure

```
OneDrivePathChecker/
├── index.html       # Main landing page (hero, features, FAQ preview, pricing)
├── FAQ.html         # Full FAQ page (categorized accordion)
├── contact.html     # Contact page
├── styles.css       # Single shared stylesheet for all pages
├── script.js        # Single shared JavaScript module for all pages
├── CNAME            # GitHub Pages custom domain: onedrivepathchecker.com
└── images/
    ├── favicon.png
    ├── Screenshot_Home.png   # Hero screenshot of the desktop app
    ├── DemoPathChecker.mp4   # Demo video played in modal
    ├── OneDrive255.png       # Screenshot: OneDrive 255-char error
    ├── OneDrive400.png       # Screenshot: OneDrive 400-char error
    └── JBR.png               # Author photo (Julie BREDECHE)
```

No build tools, no package manager, no framework — this is a **plain static site**.

---

## Architecture

### HTML Pages

Each page shares the same structure:
1. `<head>` with SEO meta tags, Schema.org JSON-LD, Google Fonts (Inter), Font Awesome 6, `styles.css`, and `script.js` (deferred)
2. Shared `<nav class="navbar">` with hamburger menu for mobile
3. Page-specific content sections
4. Shared `<footer>`

All three pages (`index.html`, `FAQ.html`, `contact.html`) load **both** `styles.css` and `script.js` — the JS initializes safely with null guards when elements aren't present on a given page.

### CSS (`styles.css`)

- **CSS custom properties** defined on `:root` — always use variables, never hardcode colors or spacing:
  ```css
  --primary: #0078D4       /* Microsoft blue */
  --grid: 8px              /* Base spacing unit — use multiples: calc(var(--grid) * N) */
  --text-primary: #1A1A1A
  --text-secondary: #6B7280
  --bg-primary: #FFFFFF
  --bg-secondary: #F7F9FC
  --border: #E5E7EB
  --success: #16A34A
  --error: #DC2626
  --warning: #EA580C       /* Orange for 255-char violations */
  ```
- **Layout utilities:** `.container` (1280px max), `.container-narrow` (860px max), `.grid-2`, `.grid-3` (auto-fit, 300px min)
- **Sections are organized with comment headers:** `/* ========== SECTION NAME ========== */`
- Responsive via media queries; `grid-3` uses `auto-fit` so it degrades naturally

### JavaScript (`script.js`)

Organized as **IIFE modules**, each with an `init()` method, all called from a single `DOMContentLoaded` listener:

| Module | Responsibility |
|---|---|
| `Navigation` | Hamburger menu toggle; closes on link click |
| `Animations` | `IntersectionObserver` scroll-in animations (`fade-in-up` class) |
| `Counter` | Animated number counter for hero stats (`data-target` attribute) |
| `Modal` | Video demo modal (open/close, plays `DemoPathChecker.mp4`) |
| `FAQ` | Accordion expand/collapse with smooth `max-height` animation |
| `CTAHandlers` | CTA button logic (download → Microsoft Store, purchase → placeholder, contact sales → mailto) |
| `LazyLoading` | `IntersectionObserver`-based lazy image loading |

Modules expose functions to `window` (e.g. `window.handleDownload`) for inline `onclick` attributes in HTML. This is intentional — do not refactor to event listeners without updating all HTML files.

---

## Key Business Context

The desktop tool enforces two Microsoft limits:

| Threshold | Consequence |
|---|---|
| > 255 characters | File syncs but cannot be opened from OneDrive folder (Windows limit) |
| > 400 characters | File blocked entirely; OneDrive stops responding |

The website has two primary conversion goals:
1. **Download** — Free 24-hour trial on Microsoft Store
2. **Purchase** — €29.99 Standard license (single workstation) or enterprise quote

Microsoft Store link: `https://apps.microsoft.com/detail/9ph9dtrrrx30?cid=DevShareMCLPCS&hl=fr-FR&gl=FR`

---

## Development Conventions

### HTML
- Section breaks are marked with `<!-- ========== SECTION NAME ========== -->`
- All pages use `lang="fr"` and UTF-8 charset
- Include Schema.org JSON-LD structured data in `<head>` where applicable (`Product` on index, `FAQPage` on FAQ)
- Keep `<script defer src="script.js">` and `<link rel="stylesheet" href="styles.css">` on every page

### CSS
- Use `calc(var(--grid) * N)` for all spacing — never raw `px` values for margins/padding
- Add new component styles in a new named section with the `/* ========== ... ========== */` header format
- Responsive breakpoints are defined in the lower portion of `styles.css` — check before adding media queries

### JavaScript
- New functionality should be wrapped in a new IIFE module following the existing pattern
- Always add null guards (`if (!element) return;`) — all modules run on all pages
- Register the new module's `init()` call in the `DOMContentLoaded` block at the bottom
- Functions used in HTML `onclick` attributes must be exposed via `window.functionName = functionName`

### Images / Media
- Place all assets in `images/`
- Use `loading="lazy"` on `<img>` tags; the `LazyLoading` module handles the rest
- The hero screenshot references `http://onedrivepathchecker.com/images/Screenshot_Home.png` (absolute URL) — this is intentional for cache/CDN reasons

---

## No Build Step

There is **no build process**. Changes to HTML/CSS/JS take effect immediately on push. To test locally, open any `.html` file directly in a browser or use a simple static server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## Deployment

Deployment is automatic via **GitHub Pages** on push to `master`. The `CNAME` file maps the GitHub Pages URL to `onedrivepathchecker.com`.

- Production branch: `master`
- Feature/AI work branch pattern: `claude/<session-id>`
- After completing work on a feature branch, open a PR targeting `master`

---

## Contact & Support

- General/support: support-pathchecker@osalydconsulting.com
- Sales (enterprise): julie.bredeche@osalydconsulting.com
- Author website: https://www.osalydconsulting.com/
