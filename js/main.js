// ============================================================
// CUTIS INSTITUTE APP LOGIC
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initNavbarScroll();
    initParallax();
    initRevealObserver();
    initCarouselDrag();
    initStatCounters();
    initTechFilter();
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

