/**
 * OneDrive Path Checker - Main JavaScript Module
 * Organized by features (navigation, animations, modal, handlers)
 * =========================================================
 */

// ========== NAVIGATION MODULE ==========
const Navigation = (() => {
    const init = () => {
        const menuToggle = document.getElementById('menuToggle');
        const navCenter = document.getElementById('navCenter');

        if (!menuToggle || !navCenter) return;

        // Toggle menu
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navCenter.classList.toggle('active');
        });

        // Close menu on link click
        navCenter.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navCenter.classList.remove('active');
            });
        });
    };

    return { init };
})();

// ========== ANIMATIONS MODULE ==========
const Animations = (() => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const initScrollAnimations = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // General animations for section > div
        document.querySelectorAll('section > div').forEach(el => {
            observer.observe(el);
        });

        // Specific animations for contact cards
        document.querySelectorAll('.contact-card, .contact-include-item').forEach(el => {
            observer.observe(el);
        });
    };

    return { initScrollAnimations };
})();

// ========== COUNTER MODULE ==========
const Counter = (() => {
    const animate = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('fr-FR');
                clearInterval(interval);
            } else {
                element.textContent = Math.floor(current).toLocaleString('fr-FR');
            }
        }, 10);
    };

    const init = () => {
        const counters = document.querySelectorAll('.counter');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.dataset.target);
                    animate(entry.target, target);
                    entry.target.classList.add('counted');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        counters.forEach(counter => observer.observe(counter));
    };

    return { init };
})();

// ========== MODAL MODULE ==========
const Modal = (() => {
    const openGifModal = () => {
        const modal = document.getElementById('gifModal');
        const video = document.getElementById('demoVideo');
        
        if (!modal || !video) return;
        
        modal.style.display = 'flex';
        video.style.display = 'block';
        video.currentTime = 0;
        video.play().catch(() => {});
    };

    const closeGifModal = () => {
        const modal = document.getElementById('gifModal');
        const video = document.getElementById('demoVideo');
        
        if (!modal || !video) return;
        
        modal.style.display = 'none';
        video.pause();
        video.style.display = 'none';
    };

    // Expose functions to window for onclick handlers
    const init = () => {
        window.openGifModal = openGifModal;
        window.closeGifModal = closeGifModal;
    };

    return { init };
})();

// ========== FAQ ACCORDION MODULE ==========
const FAQ = (() => {
    const init = () => {
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', function() {
                const item = this.closest('.faq-item');
                const answer = item.querySelector('.faq-answer');
                const isOpen = item.classList.contains('open');

                // Close all others
                document.querySelectorAll('.faq-item.open').forEach(openItem => {
                    if (openItem !== item) {
                        openItem.classList.remove('open');
                        const openAnswer = openItem.querySelector('.faq-answer');
                        openAnswer.style.maxHeight = '0px';
                        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle clicked item
                if (!isOpen) {
                    item.classList.add('open');
                    this.setAttribute('aria-expanded', 'true');
                    
                    // Calculate real height
                    answer.style.maxHeight = 'none';
                    const fullHeight = answer.scrollHeight;
                    answer.style.maxHeight = '0px';
                    answer.getBoundingClientRect(); // force reflow
                    answer.style.maxHeight = fullHeight + 'px';
                } else {
                    item.classList.remove('open');
                    this.setAttribute('aria-expanded', 'false');
                    answer.style.maxHeight = '0px';
                }
            });
        });
    };

    return { init };
})();

// ========== LANGUAGE MODULE ==========
const Language = (() => {
    const SEO_META = {
        fr: {
            ogLocale: 'fr_FR',
            schemaDescription: 'Détectez les chemins de fichiers dépassant les limites Microsoft avant migration SharePoint ou synchronisation OneDrive.',
            pages: {
                '/': {
                    title: 'Détecteur de chemins trop longs – OneDrive & SharePoint | OneDrive PathChecker',
                    description: 'Détectez les chemins de fichiers dépassant 255 ou 400 caractères avant votre migration SharePoint ou synchronisation OneDrive. Outil portable, 100% local.'
                },
                '/FAQ.html': {
                    title: 'FAQ – Détecteur de chemins longs OneDrive & SharePoint | OneDrive PathChecker',
                    description: 'Toutes vos questions sur l\'outil de détection de chemins trop longs pour SharePoint et OneDrive. Fonctionnement, sécurité, export, licences.'
                },
                '/contact.html': {
                    title: 'Contact – OneDrive Path Checker | Support & Questions',
                    description: 'Contactez l\'équipe OneDrive Path Checker pour toute question sur l\'outil de détection de chemins trop longs. Support technique et demandes commerciales.'
                }
            }
        },
        en: {
            ogLocale: 'en_US',
            schemaDescription: 'Detect file paths exceeding Microsoft limits before SharePoint migration or OneDrive synchronization.',
            pages: {
                '/': {
                    title: 'Long File Path Detector – OneDrive & SharePoint | OneDrive PathChecker',
                    description: 'Detect file paths exceeding 255 or 400 characters before your SharePoint migration or OneDrive sync. Portable tool, 100% local, no installation required.'
                },
                '/FAQ.html': {
                    title: 'FAQ – Long File Path Detector OneDrive & SharePoint | OneDrive PathChecker',
                    description: 'All your questions about the long file path detection tool for SharePoint and OneDrive. How it works, security, export, licensing.'
                },
                '/contact.html': {
                    title: 'Contact – OneDrive Path Checker | Support & Questions',
                    description: 'Contact the OneDrive Path Checker team for any question about the long file path detection tool. Technical support and sales inquiries.'
                }
            }
        }
    };

    const getPageKey = () => {
        const path = window.location.pathname;
        if (path.endsWith('FAQ.html')) return '/FAQ.html';
        if (path.endsWith('contact.html')) return '/contact.html';
        return '/';
    };

    const getCanonicalUrl = (lang) => {
        const pageKey = getPageKey();
        const page = pageKey === '/' ? '' : pageKey;
        return `https://onedrivepathchecker.com${page}?lang=${lang}`;
    };

    const detect = () => {
        // Priorité 1 : paramètre URL ?lang=
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        if (urlLang === 'fr' || urlLang === 'en') return urlLang;

        // Priorité 2 : langue navigateur (fr par défaut)
        const lang = (navigator.language || navigator.userLanguage || 'fr').toLowerCase();
        return lang.startsWith('fr') ? 'fr' : 'en';
    };

    const updateSEOMeta = (lang) => {
        const langMeta = SEO_META[lang];
        if (!langMeta) return;

        const pageKey = getPageKey();
        const page = langMeta.pages[pageKey] || langMeta.pages['/'];
        const canonicalUrl = getCanonicalUrl(lang);

        document.title = page.title;

        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', page.description);

        const canonicalEl = document.querySelector('link[rel="canonical"]');
        if (canonicalEl) canonicalEl.setAttribute('href', canonicalUrl);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', page.title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', page.description);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) ogLocale.setAttribute('content', langMeta.ogLocale);

        document.documentElement.lang = lang;
    };

    const updateSchema = (lang) => {
        const meta = SEO_META[lang];
        if (!meta) return;

        const existing = document.querySelector('script[data-schema="true"]');
        if (existing) existing.remove();

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', 'true');
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'SoftwareApplication',
            'name': 'Path Checker for SharePoint & OneDrive',
            'operatingSystem': 'Windows',
            'applicationCategory': 'UtilitiesApplication',
            'description': meta.schemaDescription,
            'offers': {
                '@type': 'Offer',
                'price': '29.99',
                'priceCurrency': 'EUR'
            },
            'publisher': {
                '@type': 'Organization',
                'name': 'Osalyd Consulting',
                'url': 'https://onedrivepathchecker.com'
            }
        });
        document.head.appendChild(script);
    };

    const apply = (lang) => {
        if (!window.TRANSLATIONS) return;
        const t = window.TRANSLATIONS[lang];
        if (!t) return;

        // Update html lang attribute
        document.documentElement.lang = lang;

        // Apply text translations
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) el.textContent = t[key];
        });

        // Apply HTML translations
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (t[key] !== undefined) el.innerHTML = t[key];
        });

        // Mettre à jour les src dépendants de la langue (images, vidéos)
        document.querySelectorAll('[data-src-fr][data-src-en]').forEach(el => {
            const src = lang === 'fr' ? el.getAttribute('data-src-fr') : el.getAttribute('data-src-en');
            if (src) el.setAttribute('src', src);
        });

        // Store active language for other modules
        window._activeLang = lang;

        // Mettre à jour les balises SEO et le Schema.org
        updateSEOMeta(lang);
        updateSchema(lang);
    };

    // Changer la langue et mettre à jour l'URL via history.pushState
    const setLang = (lang) => {
        if (lang !== 'fr' && lang !== 'en') return;
        apply(lang);
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        history.pushState({ lang }, '', url.toString());
    };

    const init = () => {
        const lang = detect();
        apply(lang);

        // Synchroniser l'URL avec la langue détectée (sans créer d'entrée dans l'historique)
        const url = new URL(window.location.href);
        if (url.searchParams.get('lang') !== lang) {
            url.searchParams.set('lang', lang);
            history.replaceState({ lang }, '', url.toString());
        }

        // Exposer setLang globalement pour un éventuel sélecteur de langue
        window.setLang = setLang;
    };

    return { init, detect, setLang };
})();

// ========== CTA HANDLERS MODULE ==========
const CTAHandlers = (() => {
    const getT = () => {
        const lang = window._activeLang || Language.detect();
        return (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || {};
    };

    const handleDownload = () => {
        const t = getT();
        const link = document.createElement('a');
        link.href = t.store_url || 'https://apps.microsoft.com/detail/9ph9dtrrrx30?cid=DevShareMCLPCS';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePurchase = () => {
        const t = getT();
        const link = document.createElement('a');
        link.href = t.store_url || 'https://apps.microsoft.com/detail/9ph9dtrrrx30?cid=DevShareMCLPCS';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleContactSales = () => {
        const t = getT();
        const subject = encodeURIComponent(t.sales_email_subject || 'Demande de devis - OneDrive Path Checker');
        const body = encodeURIComponent(t.sales_email_body || '');
        window.location.href = `mailto:julie.bredeche@osalydconsulting.com?subject=${subject}&body=${body}`;
    };

    // Expose functions to window for onclick handlers
    const init = () => {
        window.handleDownload = handleDownload;
        window.handlePurchase = handlePurchase;
        window.handleContactSales = handleContactSales;
    };

    return { init };
})();

// ========== LAZY LOADING MODULE ==========
const LazyLoading = (() => {
    const init = () => {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    };

    return { init };
})();

// ========== MAIN APP INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Language.init();
    Navigation.init();
    Animations.initScrollAnimations();
    Counter.init();
    Modal.init();
    FAQ.init();
    CTAHandlers.init();
    LazyLoading.init();

    // Log initialization
    console.log('✅ OneDrive Path Checker - All modules initialized');
    console.log('✅ Navigation loaded');
    console.log('✅ Animations initialized');
    console.log('✅ FAQ Accordion activated');
    console.log('✅ Lazy loading enabled');
});
