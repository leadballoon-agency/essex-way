// ========================================
// Mobile Navigation Toggle
// ========================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Show navbar when scrolling down from top
    if (currentScroll > 50) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }

    // Add scrolled class for additional styling
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Intersection Observer for Fade-in Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all treatment cards and review cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.treatment-card, .review-card');

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ========================================
// Booking Form Handling
// ========================================
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData);

    // Format date nicely (e.g., "Monday, 15 December 2025")
    let formattedDate = '';
    if (data.date) {
        const dateObj = new Date(data.date);
        formattedDate = dateObj.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    // Format time nicely (e.g., "2:00 PM")
    let formattedTime = '';
    if (data.time) {
        const [hours, minutes] = data.time.split(':');
        const hour = parseInt(hours);
        formattedTime = `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
    }

    // Build formatted notes for GHL
    const notes = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WEBSITE BOOKING REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 TREATMENT REQUESTED
   ${data.service || 'Not specified'}

📅 PREFERRED APPOINTMENT
   Date: ${formattedDate || 'Not specified'}
   Time: ${formattedTime || 'Not specified'}

💬 ADDITIONAL NOTES
   ${data.message || 'None provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Submitted: ${new Date().toLocaleString('en-GB')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

    // Prepare payload for GHL with formatted notes
    const ghlPayload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        notes: notes
    };

    // Submit button
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        // Send data to GHL webhook
        const response = await fetch('https://services.leadconnectorhq.com/hooks/Sm8uk9iJCYQXWnTkvYpa/webhook-trigger/699d9874-5df6-4ff8-9209-f238635fd859', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ghlPayload)
        });

        if (response.ok) {
            // Show success message
            alert('Thank you for your booking request! We will contact you shortly to confirm your appointment.');

            // Reset form
            bookingForm.reset();

            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            throw new Error('Failed to submit form');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your booking. Please try calling us directly at 07414 452441.');
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// ========================================
// Set minimum date for date picker (today)
// ========================================
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// ========================================
// Parallax Effect for Hero Section
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');

    if (hero) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ========================================
// Add active class to current nav item
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Loading Animation
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
