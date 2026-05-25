/* ===================================
   $SUTYA Landing Page - JavaScript
   =================================== */

// Custom duck cursor - force it on all mouse states
const cursorUrl = 'url("Images/logo/cursor2_128.png") 0 0, auto';

// Force duck cursor during mousedown (clicking)
document.addEventListener('mousedown', () => {
    document.body.style.cursor = cursorUrl;
    document.querySelectorAll('*').forEach(el => {
        el.style.cursor = cursorUrl;
    });
});

document.addEventListener('mouseup', () => {
    // Reset to CSS-defined cursors
    document.body.style.cursor = '';
    document.querySelectorAll('*').forEach(el => {
        el.style.cursor = '';
    });
});

// Contract address
const CONTRACT_ADDRESS = 'EQBaCgUwOoc6gHCNln_oJzb0mVs79YG7wYoavh-o1ItaneLA';

// Copy contract address to clipboard
function copyContract() {
    navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
        // Show success feedback
        showToast('Contract address copied! 🦆');

        // Add pulse animation to copy buttons
        document.querySelectorAll('.copy-btn, .copy-btn-large').forEach(btn => {
            btn.classList.add('copy-success');
            setTimeout(() => btn.classList.remove('copy-success'), 300);
        });
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        fallbackCopy(CONTRACT_ADDRESS);
    });
}

// Fallback copy method
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showToast('Contract address copied! 🦆');
    } catch (err) {
        showToast('Failed to copy. Please copy manually.');
    }
    document.body.removeChild(textArea);
}

// Toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: linear-gradient(135deg, #FFD700 0%, #FFC107 100%);
        color: #1E293B;
        padding: 15px 30px;
        border-radius: 50px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 700;
        font-size: 1rem;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    // Remove after delay
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');

        // Create mobile menu if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');

        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <a href="#about">About</a>
                <a href="#how-to-buy">How to Buy</a>
                <a href="#tokenomics">Tokenomics</a>
                <a href="#community">Community</a>
                <a href="https://t.me/UtyaDuck" target="_blank" class="mobile-cta">Join the Flock 🦆</a>
            `;
            mobileMenu.style.cssText = `
                position: fixed;
                top: 75px;
                left: 0;
                right: 0;
                background: white;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 15px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 999;
            `;

            // Style links
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.style.cssText = `
                    font-family: 'Quicksand', sans-serif;
                    font-weight: 600;
                    font-size: 1.1rem;
                    color: #475569;
                    padding: 10px 0;
                    border-bottom: 1px solid #E2E8F0;
                `;
            });

            mobileMenu.querySelector('.mobile-cta').style.cssText = `
                background: linear-gradient(135deg, #FFD700 0%, #FFC107 100%);
                color: #1E293B;
                padding: 15px;
                border-radius: 12px;
                text-align: center;
                font-weight: 700;
                margin-top: 10px;
                border: none;
            `;

            document.body.appendChild(mobileMenu);

            // Close menu on link click
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.style.transform = 'translateY(-100%)';
                    mobileMenu.style.opacity = '0';
                    mobileMenuBtn.classList.remove('active');
                });
            });
        }

        // Toggle menu visibility
        if (mobileMenuBtn.classList.contains('active')) {
            mobileMenu.style.transform = 'translateY(0)';
            mobileMenu.style.opacity = '1';
        } else {
            mobileMenu.style.transform = 'translateY(-100%)';
            mobileMenu.style.opacity = '0';
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const animateElements = [
        '.step-card',
        '.token-card',
        '.social-card',
        '.about-content',
        '.roadmap-content',
        '.contract-box'
    ];

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
});

// Add parallax effect to floating ducks
document.addEventListener('mousemove', (e) => {
    const ducks = document.querySelectorAll('.float-duck, .deco-duck');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    ducks.forEach((duck, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        duck.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn, .copy-btn-large, .nav-cta').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Typing effect for hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    updateCounter();
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear infinite';
        showToast('🎉 QUACK MODE ACTIVATED! 🦆');

        // Add rainbow animation
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);

        // Remove after 5 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

console.log('🦆 $SUTYA Website Loaded! QUACK!');
console.log('Contract:', CONTRACT_ADDRESS);
