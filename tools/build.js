/**
 * OneDrive Path Checker - Génération des pages FR et EN et du sitemap
 *
 * Usage :  node tools/build.js
 *
 * Lit les modèles de src/*.html et les textes de translations.js, puis écrit :
 *   - les pages françaises à la racine  (index.html, FAQ.html, contact.html, guides...)
 *   - les pages anglaises dans en/      (index.html, FAQ.html, contact.html, guides...)
 *   - sitemap.xml
 *
 * Les pages générées contiennent tout le texte en dur (aucun JavaScript requis
 * pour afficher le contenu). Ne modifiez PAS les fichiers générés : modifiez
 * src/*.html ou translations.js, puis relancez ce script.
 *
 * Les dates <lastmod> du sitemap sont mémorisées dans tools/lastmod.json : une
 * date ne change que si le contenu de la page a changé.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://onedrivepathchecker.com';
const TODAY = new Date().toISOString().slice(0, 10);

// Google Analytics 4 : ID de mesure. Mettre une chaîne vide ('') pour ne plus injecter le code.
const GA_ID = 'G-6BKEQDWP6E';
const GA_SNIPPET = GA_ID ? `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_ID}');
</script>` : '';

// ---------- Textes ----------
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'translations.js'), 'utf8'), sandbox);
const TRANSLATIONS = sandbox.window.TRANSLATIONS;

// ---------- Pages ----------
// key : identifiant (clé du SEO) ; type : home | faq | contact | article
// out / urlPath : nom du fichier et chemin d'URL, par langue (les guides ont un nom différent en FR et EN)
const same = name => ({ fr: name, en: name });
const PAGES = [
    { key: 'index', type: 'home', src: 'index.html', out: same('index.html'), urlPath: same(''), priority: ['1.0', '0.9'], freq: 'monthly' },
    { key: 'faq', type: 'faq', src: 'FAQ.html', out: same('FAQ.html'), urlPath: same('FAQ.html'), priority: ['0.8', '0.7'], freq: 'monthly' },
    {
        key: 'demo', type: 'video', prefix: 'demo', src: 'demo.html', priority: ['0.7', '0.6'], freq: 'monthly',
        out: { fr: 'demonstration-onedrive-path-checker.html', en: 'onedrive-path-checker-demo.html' },
        urlPath: { fr: 'demonstration-onedrive-path-checker.html', en: 'onedrive-path-checker-demo.html' }
    },
    {
        key: 'limits', type: 'article', prefix: 'limits', src: 'err-limit.html', priority: ['0.8', '0.7'], freq: 'monthly',
        out: { fr: 'limite-longueur-chemin-onedrive.html', en: 'onedrive-path-length-limit.html' },
        urlPath: { fr: 'limite-longueur-chemin-onedrive.html', en: 'onedrive-path-length-limit.html' }
    },
    {
        key: 'errsync', type: 'article', prefix: 'errsync', src: 'err-sync.html', priority: ['0.7', '0.6'], freq: 'monthly',
        out: { fr: 'erreur-chemin-acces-trop-long-onedrive.html', en: 'onedrive-path-too-long-error.html' },
        urlPath: { fr: 'erreur-chemin-acces-trop-long-onedrive.html', en: 'onedrive-path-too-long-error.html' }
    },
    {
        key: 'erropen', type: 'article', prefix: 'erropen', src: 'err-open.html', priority: ['0.7', '0.6'], freq: 'monthly',
        out: { fr: 'fichier-onedrive-impossible-a-ouvrir.html', en: 'onedrive-file-wont-open.html' },
        urlPath: { fr: 'fichier-onedrive-impossible-a-ouvrir.html', en: 'onedrive-file-wont-open.html' }
    },
    {
        key: 'cgv', type: 'legal', prefix: 'cgv', src: 'legal-cgv.html', priority: ['0.3', '0.2'], freq: 'yearly',
        out: { fr: 'conditions-generales-de-vente.html', en: 'terms-of-sale.html' },
        urlPath: { fr: 'conditions-generales-de-vente.html', en: 'terms-of-sale.html' }
    },
    {
        key: 'refund', type: 'legal', prefix: 'refund', src: 'legal-refund.html', priority: ['0.3', '0.2'], freq: 'yearly',
        out: { fr: 'politique-de-remboursement.html', en: 'refund-policy.html' },
        urlPath: { fr: 'politique-de-remboursement.html', en: 'refund-policy.html' }
    },
    {
        key: 'legal', type: 'legal', prefix: 'legal', src: 'legal-notice.html', priority: ['0.3', '0.2'], freq: 'yearly',
        out: { fr: 'mentions-legales.html', en: 'legal-notice.html' },
        urlPath: { fr: 'mentions-legales.html', en: 'legal-notice.html' }
    },
    { key: 'contact', type: 'contact', src: 'contact.html', out: same('contact.html'), urlPath: same('contact.html'), priority: ['0.5', '0.4'], freq: 'yearly' }
];

const LANGS = {
    fr: { dir: '', urlDir: '/', ogLocale: 'fr_FR' },
    en: { dir: 'en/', urlDir: '/en/', ogLocale: 'en_US' }
};

const SEO = {
    fr: {
        index: {
            title: 'Chemin trop long OneDrive : détecter et corriger',
            description: 'Chemin trop long sur OneDrive ? Détectez les fichiers au-delà de 255 et 400 caractères, renommez-les et exportez un rapport PDF. Exécution 100 % locale.'
        },
        faq: {
            title: 'FAQ chemins trop longs OneDrive | OneDrive Path Checker',
            description: 'Toutes vos questions sur l\'outil de détection de chemins de fichiers trop longs pour OneDrive : fonctionnement, sécurité, exports, licence.'
        },
        errsync: {
            title: 'Erreur OneDrive « chemin d\'accès trop long » : solution',
            description: 'OneDrive affiche « Nous ne pouvons pas synchroniser cet élément, car le chemin d\'accès est trop long » ? Comprenez l\'erreur (400 caractères) et corrigez-la.'
        },
        erropen: {
            title: 'Fichier OneDrive impossible à ouvrir : chemin trop long',
            description: 'Un fichier OneDrive se synchronise mais ne s\'ouvre pas depuis l\'Explorateur Windows ? La cause est souvent un chemin de plus de 255 caractères. Solutions.'
        },
        contact: {
            title: 'Contact – OneDrive Path Checker | Support & Questions',
            description: 'Contactez l\'équipe OneDrive Path Checker pour toute question sur l\'outil de détection de chemins trop longs. Support technique et demandes commerciales.'
        },
        limits: {
            title: 'Limite de longueur de chemin OneDrive : 255 et 400 caractères',
            description: 'Longueur maximale d\'un chemin OneDrive : la limite de 400 caractères de OneDrive et SharePoint et celle de 255 caractères de Windows, expliquées.'
        },
        demo: {
            title: 'Démonstration vidéo : chemins trop longs OneDrive',
            description: 'Vidéo : voyez comment OneDrive Path Checker repère les fichiers dont le chemin dépasse les limites OneDrive (255 et 400 caractères).'
        },
        cgv: {
            title: 'Conditions générales de vente | OneDrive Path Checker',
            description: 'Conditions générales de vente et d\'utilisation du logiciel OneDrive Path Checker : licence perpétuelle pour un poste, paiement, support.'
        },
        refund: {
            title: 'Politique de remboursement | OneDrive Path Checker',
            description: 'Politique de remboursement des licences OneDrive Path Checker : ventes définitives, essai gratuit de 24 heures avant l\'achat.'
        },
        legal: {
            title: 'Mentions légales | OneDrive Path Checker',
            description: 'Mentions légales du site OneDrive Path Checker : éditeur OSALYD CONSULTING, hébergeur et contact.'
        },
        schemaDescription: 'Repérez et corrigez les fichiers dont le chemin est trop long pour OneDrive, avec un score de conformité et un rapport PDF.'
    },
    en: {
        index: {
            title: 'OneDrive Path Too Long? Path Length Checker & Fixer',
            description: 'Fix the OneDrive path too long error. Scan your OneDrive for paths over the 255 and 400 character limits, rename files and share a PDF report. 100% local.'
        },
        faq: {
            title: 'FAQ OneDrive Path Too Long | OneDrive Path Checker',
            description: 'All your questions about OneDrive path too long errors and the path length limit: how the checker works, security, exports, licensing, and support.'
        },
        errsync: {
            title: 'OneDrive Path Too Long Error: How to Fix It',
            description: 'OneDrive says "We can\'t sync this item because the file path is too long"? Understand the 400-character path limit and fix the error step by step.'
        },
        erropen: {
            title: 'OneDrive File Won\'t Open: Path Too Long (255 Limit)',
            description: 'A OneDrive file syncs but won\'t open from File Explorer? The cause is often a path over 255 characters. Find out why and how to fix it.'
        },
        contact: {
            title: 'Contact – OneDrive Path Checker | Support & Questions',
            description: 'Contact the OneDrive Path Checker team for any question about the long file path detection tool. Technical support and sales inquiries.'
        },
        limits: {
            title: 'OneDrive Path Length Limit: 255 & 400 Characters',
            description: 'What is the OneDrive max path length? The 400-character OneDrive limit and the 255-character Windows limit explained, and how to check your files.'
        },
        demo: {
            title: 'Video Demo: Find OneDrive Paths That Are Too Long',
            description: 'Video: see how OneDrive Path Checker spots files whose path exceeds the OneDrive limits (255 and 400 characters) and exports a report.'
        },
        cgv: {
            title: 'Terms of Sale | OneDrive Path Checker',
            description: 'Terms of sale and use of the OneDrive Path Checker software: perpetual single-workstation license, payment, support.'
        },
        refund: {
            title: 'Refund Policy | OneDrive Path Checker',
            description: 'Refund policy for OneDrive Path Checker licenses: sales are final, free 24-hour trial available before purchase.'
        },
        legal: {
            title: 'Legal Notice | OneDrive Path Checker',
            description: 'Legal notice of the OneDrive Path Checker website: publisher OSALYD CONSULTING, host and contact.'
        },
        schemaDescription: 'Spot and fix files whose path is too long for OneDrive, with a compliance score and a PDF report.'
    }
};

// Vidéos de démonstration (sitemap vidéo de l'accueil)
const VIDEOS = {
    fr: {
        thumb: 'Screenshot_Home_FR.png', file: 'DemoPathChecker_FR.mp4',
        title: 'Démonstration OneDrive Path Checker : détecter les chemins trop longs sur OneDrive',
        description: 'Voyez comment OneDrive Path Checker repère les fichiers dont le chemin dépasse les limites OneDrive (255 et 400 caractères), les corrige et exporte un rapport PDF ou CSV.',
        duration: 23, isoDuration: 'PT23S', uploadDate: '2026-10-08', width: 1920, height: 1080
    },
    en: {
        thumb: 'Screenshot_Home_EN.png', file: 'DemoPathChecker_EN.mp4',
        title: 'OneDrive Path Checker demo: find OneDrive paths that are too long',
        description: 'See how OneDrive Path Checker spots files whose path exceeds OneDrive limits (255 and 400 characters), helps you fix them and exports a PDF or CSV report.',
        duration: 23, isoDuration: 'PT23S', uploadDate: '2026-10-08', width: 1920, height: 1080
    }
};

// ---------- Utilitaires HTML ----------
const escapeHtml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeAttr = s => escapeHtml(s).replace(/"/g, '&quot;');

const decodeEntities = s => s
    .replace(/&nbsp;/g, ' ')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&copy;/g, '©')
    .replace(/&amp;/g, '&');

const stripTags = html => decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

/** Trouve la fin de l'élément ouvert à `from` (juste après le '>' de la balise ouvrante). */
function findClose(html, tag, from) {
    const re = new RegExp('<(/?)' + tag + '\\b[^>]*>', 'gi');
    re.lastIndex = from;
    let depth = 1;
    let m;
    while ((m = re.exec(html))) {
        depth += m[1] ? -1 : 1;
        if (depth === 0) return m.index;
    }
    throw new Error('Balise </' + tag + '> introuvable');
}

/** Remplace le contenu des éléments data-i18n / data-i18n-html. */
function fillText(html, t, ctx) {
    const openRe = /<([a-zA-Z0-9]+)\b[^>]*?\sdata-i18n(-html)?="([^"]+)"[^>]*>/g;
    let out = '';
    let last = 0;
    let m;
    while ((m = openRe.exec(html))) {
        const [openTag, tag, isHtml, key] = m;
        const value = t[key];
        if (value === undefined) {
            console.warn(`  ! clé manquante (${ctx}) : ${key}`);
            continue;
        }
        const innerStart = m.index + openTag.length;
        const innerEnd = findClose(html, tag, innerStart);
        out += html.slice(last, innerStart) + (isHtml ? value : escapeHtml(value));
        last = innerEnd;
        openRe.lastIndex = innerEnd;
    }
    return out + html.slice(last);
}

/** data-i18n-alt="clé" -> alt="texte" */
function fillAlt(html, t, ctx) {
    return html.replace(/<img\b[^>]*?\sdata-i18n-alt="([^"]+)"[^>]*>/g, (tagStr, key) => {
        if (t[key] === undefined) {
            console.warn(`  ! clé manquante (${ctx}) : ${key}`);
            return tagStr;
        }
        let s = tagStr.replace(/\sdata-i18n-alt="[^"]+"/, '');
        const alt = ' alt="' + escapeAttr(t[key]) + '"';
        return /\salt="[^"]*"/.test(s) ? s.replace(/\salt="[^"]*"/, alt) : s.replace(/<img\b/, '<img' + alt);
    });
}

/** data-i18n-aria="clé" -> aria-label="texte" */
function fillAria(html, t, ctx) {
    return html.replace(/<[a-zA-Z0-9]+\b[^>]*?\sdata-i18n-aria="([^"]+)"[^>]*>/g, (tagStr, key) => {
        if (t[key] === undefined) {
            console.warn(`  ! clé manquante (${ctx}) : ${key}`);
            return tagStr;
        }
        const s = tagStr.replace(/\sdata-i18n-aria="[^"]+"/, '');
        return s.replace(/\saria-label="[^"]*"/, ' aria-label="' + escapeAttr(t[key]) + '"');
    });
}

/** data-src-fr / data-src-en -> src de la langue courante. */
function fillSrc(html, lang) {
    return html.replace(/<(img|video)\b[^>]*?\sdata-src-fr="[^"]*"[^>]*>/g, tagStr => {
        const fr = tagStr.match(/\sdata-src-fr="([^"]*)"/)[1];
        const en = (tagStr.match(/\sdata-src-en="([^"]*)"/) || [])[1] || fr;
        const s = tagStr.replace(/\sdata-src-(fr|en)="[^"]*"/g, '');
        return s.replace(/\ssrc="[^"]*"/, ' src="' + (lang === 'fr' ? fr : en) + '"');
    });
}

/** data-poster-fr / data-poster-en -> poster de la langue courante. */
function fillPoster(html, lang) {
    return html.replace(/<video\b[^>]*?\sdata-poster-fr="[^"]*"[^>]*>/g, tagStr => {
        const fr = tagStr.match(/\sdata-poster-fr="([^"]*)"/)[1];
        const en = (tagStr.match(/\sdata-poster-en="([^"]*)"/) || [])[1] || fr;
        const s = tagStr.replace(/\sdata-poster-(fr|en)="[^"]*"/g, '');
        return s.replace(/\sposter="[^"]*"/, ' poster="' + (lang === 'fr' ? fr : en) + '"');
    });
}

/** data-video-fr / data-video-en -> data-video (chemin absolu de la vidéo à injecter au clic). */
function fillVideoData(html, lang) {
    return html.replace(/\sdata-video-fr="([^"]*)"\s+data-video-en="([^"]*)"/g, (m, fr, en) => ' data-video="' + (lang === 'fr' ? fr : en) + '"');
}

/** data-href-fr / data-href-en -> href de la langue courante. */
function fillHref(html, lang) {
    return html.replace(/<a\b[^>]*?\sdata-href-fr="[^"]*"[^>]*>/g, tagStr => {
        const fr = tagStr.match(/\sdata-href-fr="([^"]*)"/)[1];
        const en = (tagStr.match(/\sdata-href-en="([^"]*)"/) || [])[1] || fr;
        const s = tagStr.replace(/\sdata-href-(fr|en)="[^"]*"/g, '');
        return s.replace(/\shref="[^"]*"/, ' href="' + (lang === 'fr' ? fr : en) + '"');
    });
}

// Versionnage des ressources (anti-cache) : styles.css?v=<empreinte>. Un navigateur qui a gardé une
// ancienne feuille de style en cache la recharge dès que son contenu change.
function fileVersion(rel) {
    const p = path.join(ROOT, rel);
    return fs.existsSync(p) ? crypto.createHash('sha1').update(fs.readFileSync(p)).digest('hex').slice(0, 8) : '0';
}
const ASSET_VERSIONS = {
    'styles.css': fileVersion('styles.css'),
    'script.js': fileVersion('script.js'),
    'translations.js': fileVersion('translations.js'),
    'fonts/fonts.css': fileVersion('fonts/fonts.css')
};
function versionAssets(html) {
    return html.replace(/(\s(?:src|href)=")(styles\.css|script\.js|translations\.js|fonts\/fonts\.css)(")/g,
        (m, a, file, c) => a + file + '?v=' + ASSET_VERSIONS[file] + c);
}

/** Les pages anglaises sont dans /en/ : les ressources locales remontent d'un niveau. */
function fixAssetPaths(html) {
    return html.replace(/(\s(?:src|href|poster)=")((?:images\/|download\/|fonts\/|styles\.css|script\.js|translations\.js)[^"]*")/g, '$1../$2');
}

function pageUrl(lang, page) {
    return SITE + LANGS[lang].urlDir + page.urlPath[lang];
}

function setHead(html, lang, page, t) {
    const seo = SEO[lang][page.key];
    const urlFr = pageUrl('fr', page);
    const urlEn = pageUrl('en', page);
    const own = pageUrl(lang, page);

    html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
    html = html.replace(/<meta name="description"\s+content="[^"]*">/, `<meta name="description" content="${escapeAttr(seo.description)}">`);
    html = html.replace(/<meta property="og:title"\s+content="[^"]*">/, `<meta property="og:title" content="${escapeAttr(seo.title)}">`);
    html = html.replace(/<meta property="og:description"\s+content="[^"]*">/, `<meta property="og:description" content="${escapeAttr(seo.description)}">`);
    html = html.replace(/<meta property="og:url"\s+content="[^"]*">/, `<meta property="og:url" content="${own}">`);
    html = html.replace(/<meta property="og:locale"\s+content="[^"]*">/, `<meta property="og:locale" content="${LANGS[lang].ogLocale}">`);

    // Image de partage (LinkedIn, Teams, Slack, X...) et cartes Twitter
    const image = `${SITE}/images/share-${lang}.jpg`;
    const imageAlt = escapeAttr(t.hero_alt || seo.title);
    const social = [
        `<meta property="og:site_name" content="OneDrive Path Checker">`,
        `<meta property="og:image" content="${image}">`,
        `<meta property="og:image:width" content="1200">`,
        `<meta property="og:image:height" content="630">`,
        `<meta property="og:image:alt" content="${imageAlt}">`,
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${escapeAttr(seo.title)}">`,
        `<meta name="twitter:description" content="${escapeAttr(seo.description)}">`,
        `<meta name="twitter:image" content="${image}">`,
        `<meta name="twitter:image:alt" content="${imageAlt}">`
    ].map(l => '    ' + l).join('\n');
    html = html.replace(/(<meta property="og:locale"[^>]*>)/, '$1\n' + social);

    const links = [
        `<link rel="canonical" href="${own}">`,
        `<link rel="alternate" hreflang="fr" href="${urlFr}">`,
        `<link rel="alternate" hreflang="en" href="${urlEn}">`,
        `<link rel="alternate" hreflang="x-default" href="${urlFr}">`
    ].map(l => '    ' + l).join('\n');
    html = html.replace(/<link rel="canonical"[^>]*>\s*<link rel="alternate"[^>]*>\s*<link rel="alternate"[^>]*>\s*<link rel="alternate"[^>]*>/,
        links.trim());

    return html;
}

/**
 * Détection automatique de la langue (pages françaises uniquement) :
 * un visiteur dont le navigateur n'est pas en français est envoyé vers la version anglaise.
 * Garde-fous : jamais pour les robots (indexation du français préservée), le choix explicite du
 * visiteur (clic sur FR/EN, mémorisé) est toujours respecté, et ?lang=fr force le français.
 */
function langRedirectScript(enPath) {
    return `<script>
    (function () {
        try {
            var p = localStorage.getItem('opc-lang');
            if (p) { if (p === 'en') location.replace('${enPath}' + location.hash); return; }
            if (/[?&]lang=fr/.test(location.search)) return;
            if (/bot|crawl|spider|slurp|bing|yandex|baidu|duckduck|facebookexternalhit|lighthouse|pagespeed|headless|preview/i.test(navigator.userAgent || '')) return;
            var l = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
            if (l && l.indexOf('fr') !== 0) location.replace('${enPath}' + location.hash);
        } catch (e) { }
    })();
    </script>`;
}

function ldScript(obj) {
    return '<script type="application/ld+json">\n' + JSON.stringify(obj, null, 4).replace(/^/gm, '    ') + '\n    </script>';
}

/** Données structurées : un @graph (organisation, site, page) par page et par langue. */
function setJsonLd(html, lang, page, t, dates) {
    const own = pageUrl(lang, page);
    const homeUrl = pageUrl(lang, PAGES[0]);
    const price = (t.pricing_price_value || '').replace(/[^0-9,\.]/g, '').replace(',', '.');
    const screenshot = `${SITE}/images/Screenshot_Home_${lang.toUpperCase()}.png`;
    const seo = SEO[lang][page.key];

    const organization = {
        '@type': 'Organization',
        '@id': SITE + '/#organization',
        name: 'Osalyd Consulting',
        url: 'https://www.osalydconsulting.com/',
        logo: SITE + '/images/OneDrivePathCheckerLogo.svg',
        contactPoint: [{
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'support-pathchecker@osalydconsulting.com',
            availableLanguage: ['fr', 'en']
        }, {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'julie.bredeche@osalydconsulting.com',
            availableLanguage: ['fr', 'en']
        }],
        founder: {
            '@type': 'Person',
            name: 'Julie BREDECHE',
            sameAs: ['https://www.linkedin.com/in/juliebredeche/']
        }
    };

    const website = {
        '@type': 'WebSite',
        '@id': SITE + '/#website',
        name: 'OneDrive Path Checker',
        url: SITE + '/',
        inLanguage: ['fr', 'en'],
        publisher: { '@id': SITE + '/#organization' }
    };

    const pageTypes = { contact: 'ContactPage', faq: 'FAQPage', article: 'WebPage', video: 'WebPage', legal: 'WebPage', home: 'WebPage' };
    const webPage = {
        '@type': pageTypes[page.type],
        '@id': own + '#webpage',
        url: own,
        name: seo.title,
        description: seo.description,
        inLanguage: lang,
        isPartOf: { '@id': SITE + '/#website' },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}/images/share-${lang}.jpg`, width: 1200, height: 630 }
    };

    const graph = [organization, website, webPage];

    if (page.type === 'home') {
        const features = [1, 2, 3, 4]
            .map(n => t['pricing_b' + n + '_html'])
            .filter(Boolean)
            .map(stripTags);
        const msi = `${SITE}/download/OneDrivePathChecker-1.1.0.0-${lang}.msi`;
        webPage.mainEntity = { '@id': SITE + '/#software' };
        graph.push({
            '@type': 'SoftwareApplication',
            '@id': SITE + '/#software',
            name: 'OneDrive Path Checker',
            url: own,
            description: SEO[lang].schemaDescription,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Windows',
            softwareVersion: '1.1.0.0',
            inLanguage: ['fr', 'en'],
            image: screenshot,
            screenshot: screenshot,
            downloadUrl: msi,
            featureList: features,
            author: { '@id': SITE + '/#organization' },
            publisher: { '@id': SITE + '/#organization' },
            offers: {
                '@type': 'Offer',
                price: price || undefined,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: own + '#pricing',
                seller: { '@id': SITE + '/#organization' }
            }
        });
    }

    if (page.type === 'faq') {
        const entities = [];
        for (let n = 1; n <= 40; n++) {
            if (!t['faq_full_q' + n]) continue;
            const answer = t['faq_full_a' + n + '_html'];
            if (!answer) continue;
            entities.push({
                '@type': 'Question',
                name: t['faq_full_q' + n],
                acceptedAnswer: { '@type': 'Answer', text: stripTags(answer) }
            });
        }
        webPage.mainEntity = entities;
    }

    if (page.type === 'article') {
        graph.push({
            '@type': 'TechArticle',
            '@id': own + '#article',
            headline: t[page.prefix + '_h1'] || seo.title,
            description: seo.description,
            url: own,
            inLanguage: lang,
            datePublished: dates.published,
            dateModified: dates.lastmod,
            image: screenshot,
            mainEntityOfPage: { '@id': own + '#webpage' },
            author: { '@type': 'Person', name: 'Julie BREDECHE', sameAs: ['https://www.linkedin.com/in/juliebredeche/'] },
            publisher: { '@id': SITE + '/#organization' }
        });
    }

    if (page.type === 'video') {
        const v = VIDEOS[lang];
        const videoObj = {
            '@type': 'VideoObject',
            '@id': own + '#video',
            name: v.title,
            description: v.description,
            thumbnailUrl: [`${SITE}/images/${v.thumb}`],
            uploadDate: v.uploadDate,
            duration: v.isoDuration,
            contentUrl: `${SITE}/images/${v.file}`,
            width: v.width,
            height: v.height,
            inLanguage: lang,
            isFamilyFriendly: true,
            publisher: { '@id': SITE + '/#organization' }
        };
        webPage.mainEntity = { '@id': own + '#video' };
        webPage.video = { '@id': own + '#video' };
        graph.push(videoObj);
    }

    if (page.type !== 'home') {
        const name = page.type === 'faq' ? t.nav_faq : (page.type === 'contact' ? t.nav_contact : (t[page.prefix + '_h1'] || seo.title));
        graph.push({
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t.nav_home, item: homeUrl },
                { '@type': 'ListItem', position: 2, name: stripTags(name), item: own }
            ]
        });
    }

    const data = { '@context': 'https://schema.org', '@graph': graph };
    const re = /<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/;
    if (re.test(html)) return html.replace(re, () => ldScript(data));
    // Pas de bloc dans le modèle : on l'ajoute avant le titre
    return html.replace(/(\s*)<title>/, (m, sp) => '\n    ' + ldScript(data) + '\n' + sp + '<title>');
}

function setSwitcher(html, lang, page) {
    const frHref = LANGS.fr.urlDir + page.urlPath.fr;
    const enHref = LANGS.en.urlDir + page.urlPath.en;
    const block = `<div class="lang-switcher">
                    <a class="lang-btn" data-lang="fr" href="${frHref}" hreflang="fr" lang="fr" aria-label="Français">FR</a>
                    <a class="lang-btn" data-lang="en" href="${enHref}" hreflang="en" lang="en" aria-label="English">EN</a>
                </div>`;
    return html.replace(/<div class="lang-switcher">[\s\S]*?<\/div>/, () => block);
}

// ---------- Dates de modification (sitemap + articles) ----------
const LASTMOD_FILE = path.join(__dirname, 'lastmod.json');
const lastmodStore = fs.existsSync(LASTMOD_FILE) ? JSON.parse(fs.readFileSync(LASTMOD_FILE, 'utf8')) : {};

function trackDates(id, content) {
    const hash = crypto.createHash('sha1').update(content).digest('hex');
    const entry = lastmodStore[id];
    if (!entry) {
        lastmodStore[id] = { hash, published: TODAY, lastmod: TODAY };
    } else if (entry.hash !== hash) {
        entry.hash = hash;
        entry.lastmod = TODAY;
    }
    return lastmodStore[id];
}

// ---------- Génération des pages ----------
const BANNER = '<!-- FICHIER GÉNÉRÉ par tools/build.js : ne pas modifier ici (modifier src/ ou translations.js) -->\n';

for (const lang of Object.keys(LANGS)) {
    const t = TRANSLATIONS[lang];

    for (const page of PAGES) {
        const outName = page.out[lang];
        const ctx = `${lang}/${outName}`;
        let html = fs.readFileSync(path.join(ROOT, 'src', page.src), 'utf8').replace(/\r\n/g, '\n');
        html = fillText(html, t, ctx);
        html = fillAlt(html, t, ctx);
        html = fillAria(html, t, ctx);
        html = fillSrc(html, lang);
        html = fillHref(html, lang);
        html = fillPoster(html, lang);
        html = fillVideoData(html, lang);
        html = setHead(html, lang, page, t);
        html = setSwitcher(html, lang, page);
        if (lang === 'fr') {
            const enPath = LANGS.en.urlDir + page.urlPath.en;
            html = html.replace(/(<meta charset="UTF-8">)/, '$1\n    ' + langRedirectScript(enPath));
        }

        // La date de modification dépend du contenu (hors données structurées, qui contiennent les dates)
        const dates = trackDates(LANGS[lang].dir + outName, html);
        html = setJsonLd(html, lang, page, t, dates);

        html = versionAssets(html);
        if (GA_SNIPPET) html = html.replace(/<head>/, '<head>\n' + GA_SNIPPET);
        if (lang === 'en') html = fixAssetPaths(html);
        html = html.replace(/(<html[^>]*>)/, '$1\n' + BANNER.trim());

        const outDir = path.join(ROOT, LANGS[lang].dir);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, outName), html, 'utf8');
        console.log('✔ ' + LANGS[lang].dir + outName);
    }
}

fs.writeFileSync(LASTMOD_FILE, JSON.stringify(lastmodStore, null, 2) + '\n', 'utf8');

// ---------- Sitemap ----------
function sitemapEntry(lang, page, i) {
    const dates = lastmodStore[LANGS[lang].dir + page.out[lang]];
    const urlFr = pageUrl('fr', page);
    const urlEn = pageUrl('en', page);
    let video = '';
    if (page.type === 'video') {
        const v = VIDEOS[lang];
        video = `    <video:video>
      <video:thumbnail_loc>${SITE}/images/${v.thumb}</video:thumbnail_loc>
      <video:title>${escapeHtml(v.title)}</video:title>
      <video:description>${escapeHtml(v.description)}</video:description>
      <video:content_loc>${SITE}/images/${v.file}</video:content_loc>
      <video:duration>${v.duration}</video:duration>
      <video:publication_date>${v.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
`;
    }
    return `  <url>
    <loc>${pageUrl(lang, page)}</loc>
    <lastmod>${dates.lastmod}</lastmod>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority[i]}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${urlFr}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${urlEn}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFr}"/>
${video}  </url>
`;
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- FICHIER GÉNÉRÉ par tools/build.js -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;
for (const page of PAGES) {
    sitemap += `\n  <!-- ${page.key} -->\n` + sitemapEntry('fr', page, 0) + sitemapEntry('en', page, 1);
}
sitemap += '\n</urlset>\n';
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
console.log('✔ sitemap.xml (' + PAGES.length * 2 + ' URL)');
