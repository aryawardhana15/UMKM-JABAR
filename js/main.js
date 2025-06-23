// Enhanced Main JavaScript untuk JabarUMKM Hub

document.addEventListener('DOMContentLoaded', () => {
    // Efek loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000); // Waktu loading dikurangi untuk development
    }

    // Efek scroll pada navbar
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Toggle menu mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    }

    // Animasi statistik angka
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => {
        statsObserver.observe(el);
    });
});

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
        start += 1;
        element.textContent = start;
        if (start === target) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Enhanced Scroll Reveal dengan Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('[data-stagger]');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all elements with js-reveal class
document.querySelectorAll('.js-reveal').forEach(el => {
    observer.observe(el);
});

// Enhanced Product Card Interactions
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add floating animation
        this.style.animation = 'float 2s ease-in-out infinite';
        
        // Add glow effect
        this.style.boxShadow = '0 25px 50px rgba(160, 90, 44, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
        this.style.boxShadow = '';
    });
    
    // Add click effect
    card.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(249, 199, 79, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Ripple animation
const rippleKeyframes = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}`;

const style = document.createElement('style');
style.textContent = rippleKeyframes;
document.head.appendChild(style);

// Enhanced Button Interactions
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Enhanced Chatbot Button dengan Pulse Effect
const chatbotBtn = document.getElementById('chatbot-btn');
if (chatbotBtn) {
    // Add pulse notification
    const pulse = document.createElement('div');
    pulse.style.position = 'absolute';
    pulse.style.top = '-2px';
    pulse.style.right = '-2px';
    pulse.style.width = '20px';
    pulse.style.height = '20px';
    pulse.style.backgroundColor = '#F9C74F';
    pulse.style.borderRadius = '50%';
    pulse.style.animation = 'pulse 2s infinite';
    pulse.style.zIndex = '1';
    
    chatbotBtn.appendChild(pulse);
    
    // Remove pulse after first interaction
    chatbotBtn.addEventListener('click', function() {
        pulse.remove();
    });
}

// Enhanced Badge Popup dengan Confetti Effect
function showBadgePopup(badgeName, description) {
    const popup = document.getElementById('badge-popup');
    const badgeDesc = document.getElementById('badge-description');
    
    if (popup && badgeDesc) {
        badgeDesc.textContent = description;
        popup.classList.remove('hidden');
        
        // Enhanced entrance animation
        setTimeout(() => {
            popup.querySelector('.bg-white').classList.add('badge-popup-enter');
        }, 100);
        
        // Create enhanced confetti
        createConfetti();
    }
}

// Enhanced Confetti Function
function createConfetti() {
    const colors = ['#F9C74F', '#A05A2C', '#6B8E23', '#FF6B6B', '#4ECDC4'];
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)] === 'circle' ? '50%' : '0';
            
            if (shapes[Math.floor(Math.random() * shapes.length)] === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.borderLeft = '8px solid transparent';
                confetti.style.borderRight = '8px solid transparent';
                confetti.style.borderBottom = '16px solid ' + confetti.style.backgroundColor;
                confetti.style.backgroundColor = 'transparent';
            }
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 50);
    }
}

// Enhanced Map Interactions
function enhanceMapInteractions() {
    const mapRegions = document.querySelectorAll('.map-region');
    
    mapRegions.forEach(region => {
        region.addEventListener('mouseenter', function() {
            // Add floating effect
            this.style.animation = 'float 1s ease-in-out infinite';
            
            // Add glow effect
            this.style.filter = 'drop-shadow(0 0 10px rgba(249, 199, 79, 0.8))';
        });
        
        region.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
            this.style.filter = '';
        });
        
        region.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Enhanced Search/Filter Functionality
function enhanceProductFiltering() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Add active state animation
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products with animation
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const region = card.getAttribute('data-region');
                
                if (filter === 'all' || category === filter || region === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Enhanced Smooth Scrolling
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

// Enhanced Parallax Effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Enhanced Form Interactions
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Enhanced Loading States
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.disabled = false;
    element.innerHTML = originalText;
}

// Enhanced Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add custom error handling here
});

// Enhanced Accessibility
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal, #chatbot-modal, #badge-popup');
        modals.forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
            }
        });
    }
});

// Enhanced Touch Interactions untuk Mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.product-card, .badge-item').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    enhanceMapInteractions();
    enhanceProductFiltering();
    
    // Add enhanced scroll effects
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.setAttribute('data-parallax', '0.1');
    });
});

// Export functions for use in other modules
window.JabarUMKM = {
    showBadgePopup,
    createConfetti,
    animateCounter,
    enhanceMapInteractions,
    enhanceProductFiltering
};

// Counter Animation for About Page
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// FAQ Toggle Function
function initFAQ() {
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('span:last-child');
            
            // Close other FAQ items
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherContent = otherToggle.nextElementSibling;
                    const otherIcon = otherToggle.querySelector('span:last-child');
                    otherContent.classList.add('hidden');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ item
            content.classList.toggle('hidden');
            if (content.classList.contains('hidden')) {
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.style.transform = 'rotate(45deg)';
            }
        });
    });
}

/* 3. Card Tilt Effect */
const initTiltEffect = () => {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const { width, height } = rect;
            const rotateX = (y / height - 0.5) * -15; // Max rotation 7.5 deg
            const rotateY = (x / width - 0.5) * 15;   // Max rotation 7.5 deg

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
};

/* 4. Scroll-to-Top Button */
const initScrollToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg text-2xl z-50 hidden transition-opacity duration-300 hover:bg-accent focus:outline-none';
    button.style.opacity = '0';
    
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.remove('hidden');
            setTimeout(() => button.style.opacity = '1', 10);
        } else {
            button.style.opacity = '0';
            setTimeout(() => button.classList.add('hidden'), 300);
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

document.addEventListener('DOMContentLoaded', function() {
    // ... all other inits
    initTiltEffect();
    initScrollToTop();
}); 