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
            const open = navCenter.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        // Close menu on link click
        navCenter.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navCenter.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
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
// Les pages FR (racine) et EN (/en/) sont générées avec leur texte en dur par tools/build.js.
// Ce module ne traduit plus rien : il expose la langue de la page et redirige les anciens liens ?lang=.
const Language = (() => {
    const detect = () => (document.documentElement.lang === 'en' ? 'en' : 'fr');

    const init = () => {
        const lang = detect();
        window._activeLang = lang;

        // Anciens liens partagés (?lang=en / ?lang=fr) : renvoyer vers la bonne page
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        if (urlLang === 'en' && lang === 'fr') {
            const page = window.location.pathname.replace(/^\//, '');
            window.location.replace('/en/' + (page === 'index.html' ? '' : page));
        } else if (urlLang === 'fr' && lang === 'fr') {
            history.replaceState(null, '', window.location.pathname + window.location.hash);
        }
    };

    return { init, detect };
})();

// ========== CTA HANDLERS MODULE ==========
const CTAHandlers = (() => {
    const getT = () => {
        const lang = window._activeLang || Language.detect();
        return (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || {};
    };

    const handleContactSales = () => {
        const t = getT();
        const subject = encodeURIComponent(t.sales_email_subject || 'Demande de devis - OneDrive Path Checker');
        const body = encodeURIComponent(t.sales_email_body || '');
        window.location.href = `mailto:julie.bredeche@osalydconsulting.com?subject=${subject}&body=${body}`;
    };

    // Expose functions to window for onclick handlers
    const init = () => {
        window.handleContactSales = handleContactSales;
    };

    return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Language.init();
    Navigation.init();
    Animations.initScrollAnimations();
    Modal.init();
    FAQ.init();
    CTAHandlers.init();
});
