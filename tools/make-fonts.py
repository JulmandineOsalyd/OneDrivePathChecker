"""
Génère fonts/ (Inter + sous-ensemble de Font Awesome 6 Free).
À relancer seulement si vous ajoutez une NOUVELLE icône Font Awesome au site.

Prérequis : python -m pip install fonttools brotli
Fichiers sources, à télécharger une fois dans un dossier hors du dépôt :
  - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css  -> fa-all.min.css
  - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2
    (idem fa-regular-400.woff2 et fa-brands-400.woff2)
  - le fichier Inter « latin » de Google Fonts, enregistré sous inter-latin-400.woff2
Usage : python tools/make-fonts.py <dossier des sources>
"""
import re, os, glob, shutil, sys
from fontTools import subset

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DL = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'tools', 'fa-source')
OUT = os.path.join(ROOT, 'fonts')
os.makedirs(OUT, exist_ok=True)

# 1) icônes utilisées (par style)
texts = []
for f in glob.glob(os.path.join(ROOT, 'src', '*.html')) + [os.path.join(ROOT, 'translations.js'), os.path.join(ROOT, 'tools', 'build.js'), os.path.join(ROOT, 'script.js')]:
    texts.append(open(f, encoding='utf-8').read())
corpus = '\n'.join(texts)
STYLE = {'fas': 'solid', 'fa-solid': 'solid', 'far': 'regular', 'fa-regular': 'regular', 'fab': 'brands', 'fa-brands': 'brands'}
used = {'solid': set(), 'regular': set(), 'brands': set()}
other = set()
for m in re.finditer(r'class="([^"]*\bfa[a-z-]*\b[^"]*)"', corpus):
    toks = m.group(1).split()
    styles = [STYLE[t] for t in toks if t in STYLE]
    icons = [t for t in toks if t.startswith('fa-') and t not in STYLE]
    for ic in icons:
        if styles:
            used[styles[0]].add(ic)
        else:
            other.add(ic)
print('icônes:', {k: sorted(v) for k, v in used.items()})
print('fa-* sans style:', sorted(other))

# 2) codepoints depuis le CSS officiel
css = open(os.path.join(DL, 'fa-all.min.css'), encoding='utf-8').read()
cp = {}
for sel, content in re.findall(r'((?:\.fa-[a-z0-9-]+:before,?)+)\{content:"\\([0-9a-f]+)"\}', css):
    pass
for m in re.finditer(r'((?:\.fa-[a-z0-9-]+:before,?)+)\{content:"\\([0-9a-fA-F]+)"\}', css):
    for name in re.findall(r'\.(fa-[a-z0-9-]+):before', m.group(1)):
        cp[name] = m.group(2)
missing = [i for s in used.values() for i in s if i not in cp]
print('sans codepoint:', missing)

# 3) sous-ensembles de polices
files = {'solid': 'fa-solid-900.woff2', 'regular': 'fa-regular-400.woff2', 'brands': 'fa-brands-400.woff2'}
for style, fname in files.items():
    codes = sorted({int(cp[i], 16) for i in used[style] if i in cp})
    if not codes:
        continue
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = []
    opts.name_IDs = []
    opts.notdef_outline = False
    font = subset.load_font(os.path.join(DL, fname), opts)
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=codes)
    sub.subset(font)
    dest = os.path.join(OUT, 'fa-%s.woff2' % style)
    subset.save_font(font, dest, opts)
    print(style, len(codes), 'icônes ->', os.path.getsize(dest), 'octets (source', os.path.getsize(os.path.join(DL, fname)), ')')

# 4) Inter (variable, latin) : un seul fichier
shutil.copy(os.path.join(DL, 'inter-latin-400.woff2'), os.path.join(OUT, 'inter-latin.woff2'))

# 5) feuille de style
rules = []
for style in ['solid', 'regular', 'brands']:
    for ic in sorted(used[style]):
        if ic in cp:
            rules.append('.%s::before { content: "\\%s"; }' % (ic, cp[ic]))
rules = sorted(set(rules))
fonts_css = '''/* Polices hébergées sur le site (aucun appel à Google Fonts ni à un CDN) */

/* Inter : police variable, sous-ensemble latin (français et anglais) */
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url(inter-latin.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* Icônes : sous-ensemble de Font Awesome 6 Free (uniquement les icônes utilisées par le site) */
@font-face {
    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;
    font-display: block;
    src: url(fa-solid.woff2) format('woff2');
}

@font-face {
    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: url(fa-regular.woff2) format('woff2');
}

@font-face {
    font-family: 'Font Awesome 6 Brands';
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: url(fa-brands.woff2) format('woff2');
}

.fas,
.far,
.fab {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    line-height: 1;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.fas {
    font-family: 'Font Awesome 6 Free';
    font-weight: 900;
}

.far {
    font-family: 'Font Awesome 6 Free';
    font-weight: 400;
}

.fab {
    font-family: 'Font Awesome 6 Brands';
    font-weight: 400;
}

''' + '\n'.join(rules) + '\n'
open(os.path.join(OUT, 'fonts.css'), 'w', encoding='utf-8', newline='\n').write(fonts_css)
print('fonts.css:', len(rules), 'icônes')
