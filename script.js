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
        const counter = document.querySelector('.counter');
        if (!counter) return;

        const target = parseInt(counter.dataset.target);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    animate(entry.target, target);
                    entry.target.classList.add('counted');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(counter);
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
    const detect = () => {
        const lang = (navigator.language || navigator.userLanguage || 'fr').toLowerCase();
        return lang.startsWith('fr') ? 'fr' : 'en';
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

        // Store active language for other modules
        window._activeLang = lang;
    };

    const init = () => {
        const lang = detect();
        apply(lang);
    };

    return { init, detect };
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
        link.href = t.store_url || 'https://apps.microsoft.com/detail/9ph9dtrrrx30?cid=DevShareMCLPCS&hl=fr-FR&gl=FR';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePurchase = () => {
        const t = getT();
        const link = document.createElement('a');
        link.href = t.store_url || 'https://apps.microsoft.com/detail/9ph9dtrrrx30?cid=DevShareMCLPCS&hl=fr-FR&gl=FR';
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
