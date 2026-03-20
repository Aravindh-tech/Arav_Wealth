// Mobile Menu Toggle
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.onclick = function () {
    menu.classList.toggle("active");
};

// Close menu when clicking on a link
const menuLinks = document.querySelectorAll('#menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Custom Cursor
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    cursorDot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
    
    setTimeout(() => {
        cursorRing.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
    }, 50);
});

// Cursor expand on clickable elements
const clickables = document.querySelectorAll('a, button, input, textarea, .feature-card, .about-card');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.style.transform += ' scale(1.5)';
        cursorRing.style.borderColor = 'var(--primary-color)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorRing.style.transform = cursorRing.style.transform.replace(' scale(1.5)', '');
        cursorRing.style.borderColor = 'var(--primary-color)';
    });
});

// Animated Counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => counterObserver.observe(stat));

// Particles Background Effect
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 255, 153, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${startX}px;
        top: ${startY}px;
        animation: float-particle ${duration}s ${delay}s infinite ease-in-out;
        pointer-events: none;
    `;
    
    particlesContainer.appendChild(particle);
}

// Add particle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.about-card, .feature-card, .testimonial-card, .info-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// Table Row Animation
const tableRows = document.querySelectorAll('tbody tr');
tableRows.forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateX(-30px)';
    row.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        row.style.opacity = '1';
        row.style.transform = 'translateX(0)';
    }, index * 100 + 500);
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff99, #00cc77)';
        
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        }, 2000);
    }, 1500);
});

// Login Modal Functionality
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const mobileLogin = document.getElementById('mobileLogin');
const closeModal = document.querySelector('.close-modal');
const loginContainer = document.querySelector('.login-container');
const signupContainer = document.querySelector('.signup-container');
const showSignupBtn = document.getElementById('showSignup');
const showLoginBtn = document.getElementById('showLogin');

// Open modal
function openLoginModal() {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeLoginModal() {
    loginModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

loginBtn.addEventListener('click', openLoginModal);
mobileLogin.addEventListener('click', (e) => {
    e.preventDefault();
    openLoginModal();
    menu.classList.remove('active');
});

closeModal.addEventListener('click', closeLoginModal);

loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeLoginModal();
    }
});

// Toggle between login and signup
showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'block';
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

// Login Form Submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const loginButton = loginForm.querySelector('.login-btn');
    const originalText = loginButton.innerHTML;
    
    loginButton.innerHTML = '<span>Logging in...</span>';
    loginButton.disabled = true;
    
    // Simulate login
    setTimeout(() => {
        loginButton.innerHTML = '<span>Success! Redirecting...</span>';
        loginButton.style.background = 'linear-gradient(135deg, #00ff99, #00cc77)';
        
        setTimeout(() => {
            alert('Login successful! Welcome to Arav Wealth Dashboard.');
            closeLoginModal();
            loginForm.reset();
            loginButton.innerHTML = originalText;
            loginButton.disabled = false;
            loginButton.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        }, 1500);
    }, 1500);
});

// Signup Form Submission
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const signupButton = signupForm.querySelector('.login-btn');
    const originalText = signupButton.innerHTML;
    
    // Check if passwords match
    const password = signupForm.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    signupButton.innerHTML = '<span>Creating account...</span>';
    signupButton.disabled = true;
    
    // Simulate signup
    setTimeout(() => {
        signupButton.innerHTML = '<span>Account Created! ✓</span>';
        signupButton.style.background = 'linear-gradient(135deg, #00ff99, #00cc77)';
        
        setTimeout(() => {
            alert('Account created successfully! Please login.');
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'block';
            signupForm.reset();
            signupButton.innerHTML = originalText;
            signupButton.disabled = false;
            signupButton.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        }, 1500);
    }, 1500);
});

// Smooth Scroll Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax Effect on Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 800);
    }
});

// Typing Effect for Tagline
const taglineText = "Learn ⇨ Trade ⇨ Profit ⇨ Repeat";
const taglineElement = document.querySelector('.tagline-hero');
let charIndex = 0;

function typeTagline() {
    if (charIndex < taglineText.length) {
        taglineElement.textContent = taglineText.slice(0, charIndex + 1);
        charIndex++;
        setTimeout(typeTagline, 100);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        taglineElement.textContent = '';
        typeTagline();
    }, 1000);
});

// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Testimonial Card Tilt Effect
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Progress Bar on Scroll
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.cssText = `
        width: ${diameter}px;
        height: ${diameter}px;
        left: ${event.clientX - button.getBoundingClientRect().left - radius}px;
        top: ${event.clientY - button.getBoundingClientRect().top - radius}px;
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation style
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Apply ripple to all buttons
const allButtons = document.querySelectorAll('button, .primary-cta, .secondary-cta');
allButtons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 Secret unlocked! You found the easter egg! Contact us for a special discount code: TRADER2026');
        }, 2000);
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('%c🚀 Arav Wealth Trading Academy', 'color: #00ff99; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to the future of trading education!', 'color: #0066ff; font-size: 16px;');
console.log('%cInterested in joining our team? Email: careers@aravwealth.com', 'color: #fff; font-size: 14px;');


