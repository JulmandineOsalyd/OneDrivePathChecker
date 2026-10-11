# CLAUDE.md — OneDrive Path Checker Website

## Project Overview

This is the **marketing website** for **OneDrive Path Checker**, a Windows desktop tool that detects file paths exceeding OneDrive length limits (v1.1.0.0: OneDrive scan only, no SharePoint migration mode). The tool is downloaded from this site (`download/*.msi`, one installer per language); this repo contains only the product website.

- **Live URL:** https://onedrivepathchecker.com
- **Hosting:** GitHub Pages (custom domain via `CNAME`)
- **Author:** Julie BREDECHE — Osalyd Consulting
- **Language:** French throughout (UI copy, comments, commit messages)

---

## Repository Structure

```
OneDrivePathChecker/
├── src/                 # MODÈLES HTML (à modifier) : index.html, FAQ.html, contact.html, err-sync.html, err-open.html
├── translations.js      # Tous les textes FR + EN (clés data-i18n / data-i18n-html)
├── tools/build.js       # Génère les pages FR (racine) et EN (en/) + sitemap : node tools/build.js
├── tools/make-fonts.py  # (rarement) régénère fonts/ si une NOUVELLE icône Font Awesome est ajoutée
├── _config.yml          # GitHub Pages : exclut src/, tools/, CLAUDE.md de la publication
├── fonts/               # Inter (latin) + sous-ensemble Font Awesome hébergés ici (aucun CDN)
├── index.html           # GÉNÉRÉ (FR) — ne pas modifier à la main
├── FAQ.html             # GÉNÉRÉ (FR)
├── contact.html         # GÉNÉRÉ (FR)
├── en/                  # GÉNÉRÉ (EN) : index.html, FAQ.html, contact.html, guides d'erreur
├── erreur-*.html, fichier-*.html  # GÉNÉRÉS (FR) : guides « une page par erreur OneDrive »
├── styles.css           # Single shared stylesheet for all pages
├── script.js            # Single shared JavaScript module for all pages
├── sitemap.xml          # GÉNÉRÉ par build.js (dates dans tools/lastmod.json)
├── robots.txt
├── CNAME                # GitHub Pages custom domain: onedrivepathchecker.com
├── download/            # Installateurs OneDrivePathChecker-<version>-fr.msi et -en.msi
└── images/              # logos, favicons (SVG + 48/96 px + apple-touch), images de partage 1200×630 (share-fr/en.jpg),
                         # captures FR/EN (.webp pour les pages, .png pour sitemap et données structurées), vidéos de démo
```

**Workflow :** modifier `src/*.html` et/ou `translations.js`, puis lancer `node tools/build.js` et committer les fichiers générés (GitHub Pages ne lance pas le script). Les pages EN vivent dans `/en/` ; le français est canonique à la racine (`/`).

**Cache :** `build.js` ajoute `?v=<empreinte>` aux liens `styles.css`, `script.js`, `translations.js` et `fonts/fonts.css` : après une modification de ces fichiers, relancer `node tools/build.js` pour que les navigateurs rechargent la nouvelle version.

**Langue :** les pages françaises contiennent un petit script (généré par `build.js`) qui envoie vers `/en/…` les visiteurs dont le navigateur n'est pas en français. Il ignore les robots, respecte le choix explicite (clic FR/EN mémorisé dans `localStorage` sous `opc-lang`) et `?lang=fr`. Les pages `/en/` ne redirigent jamais.

## Architecture

### HTML Pages

Each page shares the same structure:
1. `<head>` with SEO meta tags, Schema.org JSON-LD, self-hosted fonts (`fonts/fonts.css`), `styles.css`, and `script.js` (deferred)
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
| `Modal` | Fenêtre vidéo de l'accueil : la `<video>` est **créée au clic** (jamais dans le HTML de l'accueil). La vidéo indexable vit sur la page de lecture « Démonstration vidéo » (`src/demo.html`, avec `VideoObject` et entrée `<video:video>` du sitemap) |
| `FAQ` | Accordion expand/collapse with smooth `max-height` animation |
| `CTAHandlers` | CTA « Demandez un devis » (mailto). Les boutons « Essai gratuit » sont de simples liens vers le `.msi` ; « Acheter » n'a pas encore de lien |

Modules expose functions to `window` (e.g. `window.handleDownload`) for inline `onclick` attributes in HTML. This is intentional — do not refactor to event listeners without updating all HTML files.

---

## Key Business Context

The desktop tool enforces two Microsoft limits:

| Threshold | Consequence |
|---|---|
| > 255 characters | File syncs but cannot be opened from OneDrive folder (Windows limit) |
| > 400 characters | File blocked entirely; OneDrive stops responding |

The website has two primary conversion goals:
1. **Download** — Free 24-hour trial (`.msi` installer, FR/EN)
2. **Purchase** — Standard license (single workstation): **39,99 € on the French pages, $49 on the English pages** (`pricing_price_value` in `translations.js`; the structured data follows), or enterprise quote (the « Acheter » buttons have no link yet)

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

### Fonts / Icons
- Aucune ressource externe (pas de Google Fonts ni de CDN). Les icônes Font Awesome sont un **sous-ensemble** : pour utiliser une nouvelle icône (`fa-xxx`), relancer `tools/make-fonts.py` (voir son en-tête), sinon elle s'affichera comme un carré vide.

### Images / Media
- Place all assets in `images/` ; privilégier le WebP pour les captures. Les PNG maîtres des captures d'erreur OneDrive sont dans `src/masters/` (non publiés)
- Use `loading="lazy"` on `<img>` tags below the fold (never on the hero image); give every `<img>` its `width`/`height`
- The hero screenshot references `http://onedrivepathchecker.com/images/Screenshot_Home.png` (absolute URL) — this is intentional for cache/CDN reasons

---

## Build

Le site reste statique (pas de dépendance npm), mais les pages FR/EN sont générées par `node tools/build.js` (Node.js uniquement). Changes to CSS/JS take effect immediately on push. To test locally, use a simple static server (les liens de langue sont en chemins absolus `/en/...`) :

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
