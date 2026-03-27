/**
 * ==========================================================================
 * CYPHRIXZ PORTFOLIO - CUSTOM JAVASCRIPT
 * Brutalist / Terminal Green Hacker Theme
 * ==========================================================================
 */

(function() {
    'use strict';

    // ==========================================================================
    // CUSTOM CURSOR
    // ==========================================================================
    const initCustomCursor = () => {
        const cursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.custom-cursor-dot');
        
        if (!cursor || !cursorDot) return;

        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        // Smooth cursor following
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        // Animate cursor with smooth interpolation
        const animateCursor = () => {
            // Smooth follow for main cursor
            dotX += (cursorX - dotX) * 0.9;
            dotY += (cursorY - dotY) * 0.9;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .blog-card, .btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
    };

    // ==========================================================================
    // HAMBURGER MENU
    // ==========================================================================
    const initHamburgerMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.nav-menu-mobile');
        const mobileLinks = document.querySelectorAll('.nav-menu-mobile .nav-link');

        if (!hamburger || !mobileMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    };

    // ==========================================================================
    // SMOOTH SCROLL NAVIGATION
    // ==========================================================================
    const initSmoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ==========================================================================
    // SCROLL-TRIGGERED FADE-IN ANIMATIONS
    // ==========================================================================
    const initScrollAnimations = () => {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        if (fadeElements.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally stop observing after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));
    };

    // ==========================================================================
    // BACK TO TOP BUTTON
    // ==========================================================================
    const initBackToTop = () => {
        const backToTopBtn = document.querySelector('.back-to-top');
        
        if (!backToTopBtn) return;

        // Show/hide button based on scroll position
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };

        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', toggleVisibility);
        toggleVisibility(); // Initial check
    };

    // ==========================================================================
    // LIGHTBOX GALLERY
    // ==========================================================================
    const initLightbox = () => {
        const lightbox = document.querySelector('.lightbox');
        const lightboxImage = document.querySelector('.lightbox-image');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');
        const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
        
        if (!lightbox || lightboxTriggers.length === 0) return;

        let currentIndex = 0;
        const images = Array.from(lightboxTriggers).map(trigger => trigger.dataset.lightbox);

        // Open lightbox
        const openLightbox = (index) => {
            currentIndex = index;
            lightboxImage.src = images[currentIndex];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Navigate to previous image
        const prevImage = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImage.src = images[currentIndex];
        };

        // Navigate to next image
        const nextImage = () => {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImage.src = images[currentIndex];
        };

        // Event listeners for triggers
        lightboxTriggers.forEach((trigger, index) => {
            trigger.addEventListener('click', () => openLightbox(index));
        });

        // Event listeners for controls
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
        if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        });
    };

    // ==========================================================================
    // MATRIX RAIN EFFECT
    // ==========================================================================
    const initMatrixRain = () => {
        const matrixContainer = document.querySelector('.matrix-rain');
        
        if (!matrixContainer) return;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const columns = Math.floor(window.innerWidth / 30);

        // Create matrix columns
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = (i * 30) + 'px';
            column.style.animationDuration = (Math.random() * 10 + 10) + 's';
            column.style.animationDelay = (Math.random() * 10) + 's';
            
            // Generate random characters
            let text = '';
            const length = Math.floor(Math.random() * 20) + 10;
            for (let j = 0; j < length; j++) {
                text += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            column.textContent = text;
            
            matrixContainer.appendChild(column);
        }
    };

    // ==========================================================================
    // TYPEWRITER EFFECT
    // ==========================================================================
    const initTypewriter = () => {
        const typewriterElement = document.querySelector('.hero-tagline .typewriter-text');
        
        if (!typewriterElement) return;

        const text = typewriterElement.dataset.text;
        const speed = parseInt(typewriterElement.dataset.speed) || 100;
        let index = 0;

        typewriterElement.textContent = '';

        const type = () => {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };

        // Start typing after a delay
        setTimeout(type, 1000);
    };

    // ==========================================================================
    // NAVBAR SCROLL EFFECT
    // ==========================================================================
    const initNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            // Add shadow on scroll
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });
    };

    // ==========================================================================
    // PROJECT FILTER
    // ==========================================================================
    const initProjectFilter = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterButtons.length === 0 || projectCards.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = '';
                        card.style.opacity = '1';
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    };

    // ==========================================================================
    // FORM VALIDATION
    // ==========================================================================
    const initFormValidation = () => {
        const form = document.querySelector('.contact-form form');
        
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });

            if (isValid) {
                // Show success message (in a real scenario, send to server)
                const submitBtn = form.querySelector('.form-submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#00ff88';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    form.reset();
                }, 2000);
            }
        });

        // Clear error state on input
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = '';
            });
        });
    };

    // ==========================================================================
    // STATS COUNTER ANIMATION
    // ==========================================================================
    const initStatsCounter = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) return;

        const animateCounter = (element) => {
            const target = parseInt(element.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    element.textContent = target;
                }
            };

            update();
        };

        // Use Intersection Observer to trigger animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    };

    // ==========================================================================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================================================================
    const initActiveNavOnScroll = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        if (sections.length === 0 || navLinks.length === 0) return;

        const updateActiveLink = () => {
            const scrollY = window.scrollY;
            const navHeight = document.querySelector('.navbar').offsetHeight;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Initial check
    };

    // ==========================================================================
    // PARALLAX EFFECT
    // ==========================================================================
    const initParallax = () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    };

    // ==========================================================================
    // PRELOADER
    // ==========================================================================
    const initPreloader = () => {
        const preloader = document.querySelector('.preloader');
        
        if (!preloader) return;

        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    };

    // ==========================================================================
    // TILT EFFECT FOR CARDS
    // ==========================================================================
    const initTiltEffect = () => {
        const tiltCards = document.querySelectorAll('.tilt-card');
        
        if (tiltCards.length === 0) return;

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    };

    // ==========================================================================
    // INITIALIZE ALL FEATURES
    // ==========================================================================
    const init = () => {
        initCustomCursor();
        initHamburgerMenu();
        initSmoothScroll();
        initScrollAnimations();
        initBackToTop();
        initLightbox();
        initMatrixRain();
        initTypewriter();
        initNavbarScroll();
        initProjectFilter();
        initFormValidation();
        initStatsCounter();
        initActiveNavOnScroll();
        initParallax();
        initPreloader();
        initTiltEffect();

        console.log('%c[cyphrixz] Portfolio initialized successfully', 'color: #00ff88; font-family: monospace;');
    };

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
