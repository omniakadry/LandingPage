
document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Intersection Observer for Animations (Efficiently shows elements on scroll) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    // Add animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Add animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // --- Header Scroll Effect ---
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
                // Scrolling down - hide header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show header
                header.style.transform = 'translateY(0)';
            }
            
            // Add or remove shadow based on scroll position
            if (scrollTop > 10) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = 'none'; // Better to remove the shadow
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // --- Simple Typing Effect for Hero Title ---
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = ''; // Clear text content
        setTimeout(() => {
            typeWriter(heroTitle, originalText);
        }, 500);
    }

    // --- Mobile Touch Effects ---
    // A more modern and robust way to handle touch state
    const touchElements = document.querySelectorAll('.service-card, .feature-card, .btn-order, .btn-cta-primary, .whatsapp-btn');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', (e) => {
            e.currentTarget.classList.add('touch-active');
        }, { passive: true });
        
        element.addEventListener('touchend', (e) => {
            e.currentTarget.classList.remove('touch-active');
        });

        element.addEventListener('touchcancel', (e) => {
            e.currentTarget.classList.remove('touch-active');
        });
    });

    // Add CSS for touch-active state
    const style = document.createElement('style');
    style.innerHTML = `
        .touch-active {
            transform: scale(0.98);
            filter: brightness(0.9);
            box-shadow: none !important;
        }
    `;
    document.head.appendChild(style);

});