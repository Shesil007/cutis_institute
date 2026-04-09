// ============================================================
// CUTIS INSTITUTE APP LOGIC
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initNavbarScroll();
    initMobileMenu();
    initParallax();
    initRevealObserver();
    initCarouselDrag();
    initStatCounters();
    initTechFilter();
    initTrainingSlider();
});

/**
 * Hero Word Stagger Animation
 */
function initHeroAnimation() {
    const title = document.getElementById('hero-title');
    if (!title) return;
    
    const words = title.innerText.split(' ');
    title.innerHTML = '';
    words.forEach((word, idx) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.innerHTML = word + '&nbsp;';
        span.style.animationDelay = (idx * 0.15) + 's';
        title.appendChild(span);
    });
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
    const nav = document.getElementById('navbar');
    const toggle = document.querySelector('.hamburger');
    const links = document.querySelector('.nav-links');

    if (!nav || !toggle || !links) return;

    const closeMenu = () => {
        links.classList.remove('mobile-open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.setAttribute('role', 'button');
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = links.classList.toggle('mobile-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target)) closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) closeMenu();
    });
}

/**
 * Parallax Effects for Hero and Eco sections
 */
function initParallax() {
    const heroBg = document.getElementById('heroBg');
    const ecoBg = document.getElementById('ecoBg');
    const ecoSection = document.querySelector('.eco');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Hero Parallax
        if (heroBg && scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
        }

        // Eco Parallax
        if (ecoBg && ecoSection) {
            const rect = ecoSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = window.innerHeight - rect.top;
                ecoBg.style.transform = `translateY(${offset * 0.2}px)`;
            }
        }
    });
}

/**
 * Intersection Observer for Reveal animations
 */
function initRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('active');
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right').forEach(el => observer.observe(el));
}

/**
 * Drag to scroll for Centres Carousel
 */
function initCarouselDrag() {
    const carouselWrap = document.getElementById('centresCarouselWrap');
    const carousel = document.getElementById('centresCarousel');
    if (!carouselWrap || !carousel) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    carouselWrap.addEventListener('mousedown', (e) => {
        isDown = true;
        carouselWrap.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carouselWrap.addEventListener('mouseleave', () => {
        isDown = false;
        carouselWrap.style.cursor = 'grab';
    });

    carouselWrap.addEventListener('mouseup', () => {
        isDown = false;
        carouselWrap.style.cursor = 'grab';
    });

    carouselWrap.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

/**
 * Count Up Animation for Stats
 */
function initStatCounters() {
    const stats = document.querySelectorAll('.stat-num');
    const statsSection = document.querySelector('.stats');
    if (!stats.length || !statsSection) return;

    let hasCounted = false;
    const statObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            stats.forEach(st => {
                const target = +st.getAttribute('data-val');
                const duration = 2000;
                const framesPerSecond = 60;
                const totalFrames = (duration / 1000) * framesPerSecond;
                const inc = target / totalFrames;
                let cur = 0;

                const update = () => {
                    cur += inc;
                    if (cur < target) {
                        st.innerText = Math.ceil(cur).toLocaleString();
                        requestAnimationFrame(update);
                    } else {
                        st.innerText = target.toLocaleString() + (target > 500 ? '+' : '');
                    }
                };
                update();
            });
        }
    }, {
        threshold: 0.5
    });

    statObserver.observe(statsSection);
}

/**
 * Technology JS Filtering
 */
function initTechFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const techCards = document.querySelectorAll('.t-card');
    if (!filterBtns.length || !techCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            techCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => card.classList.remove('hidden'), 50);
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Research & Training image slider
 */
function initTrainingSlider() {
    const slider = document.getElementById('trainingSlider');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.training-slide'));
    const dotsWrap = slider.querySelector('.training-slider-dots');
    const prevBtn = slider.querySelector('.training-slider-control.prev');
    const nextBtn = slider.querySelector('.training-slider-control.next');
    if (!slides.length || !dotsWrap || !prevBtn || !nextBtn) return;

    let activeIndex = 0;
    let autoRotateId;

    const dots = slides.map((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'training-slider-dot';
        dot.setAttribute('aria-label', `Show training image ${index + 1}`);
        dot.addEventListener('click', () => {
            setActiveSlide(index);
            restartAutoRotate();
        });
        dotsWrap.appendChild(dot);
        return dot;
    });

    const setActiveSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle('active', slideIndex === activeIndex);
        });
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === activeIndex);
            dot.setAttribute('aria-current', dotIndex === activeIndex ? 'true' : 'false');
        });
    };

    const goToNext = () => setActiveSlide(activeIndex + 1);
    const goToPrev = () => setActiveSlide(activeIndex - 1);

    const startAutoRotate = () => {
        if (autoRotateId) return;
        autoRotateId = window.setInterval(goToNext, 3500);
    };

    const stopAutoRotate = () => {
        if (autoRotateId) {
            window.clearInterval(autoRotateId);
            autoRotateId = null;
        }
    };

    const restartAutoRotate = () => {
        stopAutoRotate();
        startAutoRotate();
    };

    prevBtn.addEventListener('click', () => {
        goToPrev();
        restartAutoRotate();
    });

    nextBtn.addEventListener('click', () => {
        goToNext();
        restartAutoRotate();
    });

    slider.addEventListener('mouseenter', stopAutoRotate);
    slider.addEventListener('mouseleave', startAutoRotate);
    slider.addEventListener('focusin', stopAutoRotate);
    slider.addEventListener('focusout', startAutoRotate);

    setActiveSlide(0);
    startAutoRotate();
}
