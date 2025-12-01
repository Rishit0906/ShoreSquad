/**
 * ShoreSquad - Main Application JavaScript
 * Features: Mobile navigation, smooth scrolling, animations, form handling
 */

(function () {
    'use strict';

    // ===================================
    // Constants & State
    // ===================================

    const state = {
        isMenuOpen: false,
        observers: []
    };

    // ===================================
    // DOM Elements
    // ===================================

    const elements = {
        navToggle: document.querySelector('.nav__toggle'),
        navMenu: document.querySelector('.nav__menu'),
        navLinks: document.querySelectorAll('.nav__link'),
        signupForm: document.getElementById('signupForm'),
        emailInput: document.getElementById('emailInput'),
        toast: document.getElementById('toast'),
        statNumbers: document.querySelectorAll('.stat__number'),
        getStartedBtn: document.getElementById('getStartedBtn'),
        featureCards: document.querySelectorAll('.feature-card'),
        communityCards: document.querySelectorAll('.community-card')
    };

    // ===================================
    // Mobile Navigation
    // ===================================

    function toggleMenu() {
        state.isMenuOpen = !state.isMenuOpen;
        elements.navMenu.classList.toggle('active');
        elements.navToggle.setAttribute('aria-expanded', state.isMenuOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
    }

    function closeMenu() {
        if (state.isMenuOpen) {
            state.isMenuOpen = false;
            elements.navMenu.classList.remove('active');
            elements.navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    function initNavigation() {
        if (elements.navToggle) {
            elements.navToggle.addEventListener('click', toggleMenu);
        }

        // Close menu when clicking nav links
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only prevent default and smooth scroll for anchor links
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').slice(1);
                    const targetSection = document.getElementById(targetId);

                    if (targetSection) {
                        closeMenu();
                        targetSection.scrollIntoView({ behavior: 'smooth' });

                        // Update URL without jumping
                        history.pushState(null, null, `#${targetId}`);
                    }
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (state.isMenuOpen &&
                !elements.navMenu.contains(e.target) &&
                !elements.navToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.isMenuOpen) {
                closeMenu();
            }
        });
    }

    // ===================================
    // Counter Animation
    // ===================================

    function animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }

    function initCounters() {
        // Only animate counters once when they come into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target); // Animate only once
                }
            });
        }, { threshold: 0.5 });

        elements.statNumbers.forEach(stat => {
            counterObserver.observe(stat);
        });

        state.observers.push(counterObserver);
    }

    // ===================================
    // Scroll Animations
    // ===================================

    function initScrollAnimations() {
        // Fade in feature cards
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100); // Stagger animation
                }
            });
        }, { threshold: 0.1 });

        // Set initial state and observe
        [...elements.featureCards, ...elements.communityCards].forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            fadeInObserver.observe(card);
        });

        state.observers.push(fadeInObserver);
    }

    // ===================================
    // Form Handling
    // ===================================

    function showToast(message, duration = 3000) {
        const toastMessage = elements.toast.querySelector('.toast__message');
        toastMessage.textContent = message;
        elements.toast.classList.add('show');

        setTimeout(() => {
            elements.toast.classList.remove('show');
        }, duration);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function initFormHandling() {
        if (elements.signupForm) {
            elements.signupForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const email = elements.emailInput.value.trim();

                // Validate email
                if (!validateEmail(email)) {
                    showToast('❌ Please enter a valid email address');
                    elements.emailInput.focus();
                    return;
                }

                // Simulate API call
                try {
                    // In production, replace with actual API endpoint
                    await simulateAPICall(email);

                    showToast('🎉 Welcome to ShoreSquad! Check your email.');
                    elements.signupForm.reset();

                    // Track conversion (Google Analytics example)
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'sign_up', {
                            method: 'Email'
                        });
                    }
                } catch (error) {
                    showToast('❌ Something went wrong. Please try again.');
                    console.error('Signup error:', error);
                }
            });
        }

        // Get Started button scrolls to signup
        if (elements.getStartedBtn) {
            elements.getStartedBtn.addEventListener('click', () => {
                const joinSection = document.getElementById('join');
                if (joinSection) {
                    joinSection.scrollIntoView({ behavior: 'smooth' });
                    // Focus on email input for better UX
                    setTimeout(() => {
                        elements.emailInput.focus();
                    }, 500);
                }
            });
        }
    }

    // Simulate API call (replace with real endpoint)
    function simulateAPICall(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Email submitted:', email);
                resolve({ success: true });
            }, 1000);
        });
    }

    // ===================================
    // Performance Optimizations
    // ===================================

    function initLazyLoading() {
        // Native lazy loading is already set on images via loading="lazy"
        // This is a fallback for older browsers
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });

            state.observers.push(imageObserver);
        }
    }

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===================================
    // Header Scroll Effect
    // ===================================

    function initHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScroll = 0;

        const handleScroll = debounce(() => {
            const currentScroll = window.pageYOffset;

            // Add shadow when scrolled
            if (currentScroll > 50) {
                header.style.boxShadow = 'var(--shadow-md)';
            } else {
                header.style.boxShadow = 'var(--shadow-sm)';
            }

            lastScroll = currentScroll;
        }, 10);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // ===================================
    // Accessibility Enhancements
    // ===================================

    function initAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'visually-hidden';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--color-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Announce dynamic content changes to screen readers
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'visually-hidden';
        document.body.appendChild(liveRegion);
    }

    // ===================================
    // Error Handling
    // ===================================

    function initErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            // In production, send to error tracking service
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            // In production, send to error tracking service
        });
    }

    // ===================================
    // Initialize App
    // ===================================

    function init() {
        console.log('🌊 ShoreSquad initializing...');

        // Initialize all features
        initNavigation();
        initCounters();
        initScrollAnimations();
        initFormHandling();
        initLazyLoading();
        initHeaderScroll();
        initAccessibility();
        initErrorHandling();

        console.log('✅ ShoreSquad ready!');
    }

    // ===================================
    // Cleanup on page unload
    // ===================================

    window.addEventListener('beforeunload', () => {
        state.observers.forEach(observer => observer.disconnect());
    });

    // ===================================
    // Start the app when DOM is ready
    // ===================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===================================
    // Expose API for external use (optional)
    // ===================================

    window.ShoreSquad = {
        showToast,
        closeMenu
    };

})();
