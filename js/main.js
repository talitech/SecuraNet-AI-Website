// Main JavaScript file for SecuraNet AI

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize counters
    initializeCounters();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize smooth scrolling
    initializeSmoothScroll();
});

// Animation initialization
function initializeAnimations() {
    // Add animation classes to elements when they come into view
    const animatedElements = document.querySelectorAll('.elementor-animation-fade-in, .elementor-animation-slide-up, .about-hero-title, .feature-card, .service-grid-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // For elements with pre-defined animations, let them handle it.
                // For newly added animated elements, explicitly set properties if needed.
                if (!entry.target.classList.contains('elementor-animation-fade-in') && 
                    !entry.target.classList.contains('elementor-animation-slide-up') &&
                    !entry.target.classList.contains('about-hero-title')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    animatedElements.forEach(element => {
        // Set initial state only if it's not handled by other elementor animations
        if (!element.classList.contains('elementor-animation-fade-in') && 
            !element.classList.contains('elementor-animation-slide-up') &&
            !element.classList.contains('about-hero-title')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
        }
        observer.observe(element);
    });
}

// Counter initialization
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        entry.target.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Here you would typically send the form data to a server
                console.log('Form submitted:', new FormData(form));
                form.reset();
                alert('Thank you for your message! We will get back to you soon.');
            }
        });
    });
}

// Smooth scrolling
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.navbar-toggler');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        navbarCollapse.classList.toggle('show');
    });
}

// Add active class to current navigation item
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call setActiveNavItem on page load
setActiveNavItem(); 