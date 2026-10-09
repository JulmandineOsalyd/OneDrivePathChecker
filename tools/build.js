/**
 * OneDrive Path Checker - Génération des pages FR et EN
 *
 * Usage :  node tools/build.js
 *
 * Lit les modèles de src/*.html et les textes de translations.js, puis écrit :
 *   - index.html, FAQ.html, contact.html            (français, à la racine)
 *   - en/index.html, en/FAQ.html, en/contact.html   (anglais)
 *
 * Les pages générées contiennent tout le texte en dur (aucun JavaScript requis
 * pour afficher le contenu). Ne modifiez PAS les fichiers générés : modifiez
 * src/*.html ou translations.js, puis relancez ce script.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://onedrivepathchecker.com';

// ---------- Textes ----------
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'translations.js'), 'utf8'), sandbox);
const TRANSLATIONS = sandbox.window.TRANSLATIONS;

// ---------- Pages et SEO ----------
const PAGES = [
    { file: 'index.html', urlPath: '' },
    { file: 'FAQ.html', urlPath: 'FAQ.html' },
    { file: 'contact.html', urlPath: 'contact.html' }
];

const LANGS = {
    fr: { dir: '', urlDir: '/', ogLocale: 'fr_FR' },
    en: { dir: 'en/', urlDir: '/en/', ogLocale: 'en_US' }
};

const SEO = {
    fr: {
        'index.html': {
            title: 'OneDrive Path Checker : chemins de fichiers trop longs',
            description: 'Repérez et corrigez les fichiers dont le chemin est trop long pour OneDrive. Score de conformité, renommage guidé, rapport PDF. 100 % local, essai gratuit.'
        },
        'FAQ.html': {
            title: 'FAQ chemins trop longs OneDrive | OneDrive Path Checker',
            description: 'Toutes vos questions sur l\'outil de détection de chemins de fichiers trop longs pour OneDrive : fonctionnement, sécurité, exports, licence.'
        },
        'contact.html': {
            title: 'Contact – OneDrive Path Checker | Support & Questions',
            description: 'Contactez l\'équipe OneDrive Path Checker pour toute question sur l\'outil de détection de chemins trop longs. Support technique et demandes commerciales.'
        },
        schemaDescription: 'Repérez et corrigez les fichiers dont le chemin est trop long pour OneDrive, avec un score de conformité et un rapport PDF.'
    },
    en: {
        'index.html': {
            title: 'OneDrive Path Checker: Long File Path Detector',
            description: 'Spot and fix files whose path is too long for OneDrive. Compliance score, guided renaming, PDF report. 100% local, free trial.'
        },
        'FAQ.html': {
            title: 'FAQ Long File Paths in OneDrive | OneDrive Path Checker',
            description: 'All your questions about the long file path detection tool for OneDrive: how it works, security, exports, licensing.'
        },
        'contact.html': {
            title: 'Contact – OneDrive Path Checker | Support & Questions',
            description: 'Contact the OneDrive Path Checker team for any question about the long file path detection tool. Technical support and sales inquiries.'
        },
        schemaDescription: 'Spot and fix files whose path is too long for OneDrive, with a compliance score and a PDF report.'
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

/** data-src-fr / data-src-en -> src de la langue courante. */
function fillSrc(html, lang) {
    return html.replace(/<(img|video)\b[^>]*?\sdata-src-fr="[^"]*"[^>]*>/g, tagStr => {
        const fr = tagStr.match(/\sdata-src-fr="([^"]*)"/)[1];
        const en = (tagStr.match(/\sdata-src-en="([^"]*)"/) || [])[1] || fr;
        let s = tagStr.replace(/\sdata-src-(fr|en)="[^"]*"/g, '');
        return s.replace(/\ssrc="[^"]*"/, ' src="' + (lang === 'fr' ? fr : en) + '"');
    });
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

/** Les pages anglaises sont dans /en/ : les ressources locales remontent d'un niveau. */
function fixAssetPaths(html) {
    return html.replace(/(\s(?:src|href)=")((?:images\/|download\/|styles\.css|script\.js|translations\.js)[^"]*")/g, '$1../$2');
}

function pageUrl(lang, page) {
    return SITE + LANGS[lang].urlDir + page.urlPath;
}

function setHead(html, lang, page, t) {
    const seo = SEO[lang][page.file];
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

function ldScript(obj) {
    return '<script type="application/ld+json">\n' + JSON.stringify(obj, null, 4).replace(/^/gm, '    ') + '\n    </script>';
}

function setJsonLd(html, lang, page, t) {
    if (page.file === 'index.html') {
        const price = (t.pricing_price_value || '').replace(/[^0-9,\.]/g, '').replace(',', '.');
        const data = {
            '@context': 'https://schema.org/',
            '@type': 'SoftwareApplication',
            name: 'OneDrive Path Checker',
            operatingSystem: 'Windows',
            applicationCategory: 'UtilitiesApplication',
            softwareVersion: '1.1.0.0',
            inLanguage: lang,
            url: pageUrl(lang, page),
            description: SEO[lang].schemaDescription,
            offers: { '@type': 'Offer', price: price || undefined, priceCurrency: 'EUR' },
            publisher: { '@type': 'Organization', name: 'Osalyd Consulting', url: SITE }
        };
        return html.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/, () => ldScript(data));
    }
    if (page.file === 'FAQ.html') {
        const entities = [];
        for (let n = 1; t['faq_full_q' + n]; n++) {
            const answer = t['faq_full_a' + n + '_html'];
            if (!answer) continue;
            entities.push({
                '@type': 'Question',
                name: t['faq_full_q' + n],
                acceptedAnswer: { '@type': 'Answer', text: stripTags(answer) }
            });
        }
        const data = { '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: lang, mainEntity: entities };
        return html.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/, () => ldScript(data));
    }
    return html;
}

function setSwitcher(html, lang, page) {
    const frHref = LANGS.fr.urlDir + page.urlPath;
    const enHref = LANGS.en.urlDir + page.urlPath;
    const block = `<div class="lang-switcher">
                    <a class="lang-btn" data-lang="fr" href="${frHref}" hreflang="fr" lang="fr" aria-label="Français">FR</a>
                    <a class="lang-btn" data-lang="en" href="${enHref}" hreflang="en" lang="en" aria-label="English">EN</a>
                </div>`;
    return html.replace(/<div class="lang-switcher">[\s\S]*?<\/div>/, () => block);
}

// ---------- Génération ----------
const BANNER = '<!-- FICHIER GÉNÉRÉ par tools/build.js : ne pas modifier ici (modifier src/ ou translations.js) -->\n';

for (const lang of Object.keys(LANGS)) {
    const t = TRANSLATIONS[lang];
    // Aperçu FAQ de l'accueil (déjà calculé dans translations.js, mais on le garantit ici)
    [1, 2, 3].forEach(n => {
        t['faq_q' + n] = t['faq_full_q' + n];
        t['faq_a' + n + '_html'] = t['faq_full_a' + n + '_html'];
    });

    for (const page of PAGES) {
        const ctx = `${lang}/${page.file}`;
        let html = fs.readFileSync(path.join(ROOT, 'src', page.file), 'utf8').replace(/\r\n/g, '\n');
        html = fillText(html, t, ctx);
        html = fillAlt(html, t, ctx);
        html = fillSrc(html, lang);
        html = fillHref(html, lang);
        html = setHead(html, lang, page, t);
        html = setJsonLd(html, lang, page, t);
        html = setSwitcher(html, lang, page);
        if (lang === 'en') html = fixAssetPaths(html);
        html = html.replace(/(<html[^>]*>)/, '$1\n' + BANNER.trim());

        const outDir = path.join(ROOT, LANGS[lang].dir);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, page.file), html, 'utf8');
        console.log('✔ ' + LANGS[lang].dir + page.file);
    }
}
