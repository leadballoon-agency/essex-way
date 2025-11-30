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

    // Get treatment from either 'service' (homepage) or 'treatment' (treatment pages)
    const treatment = data.service || data.treatment || null;

    // Get the page name from URL for context
    const pagePath = window.location.pathname;
    const pageName = pagePath === '/' || pagePath === '/index.html'
        ? 'Homepage'
        : pagePath.replace(/^\//, '').replace(/\.html$/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

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
   ${treatment || 'Not specified'}

📄 SOURCE PAGE
   ${pageName}

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

    // Helper function to show inline message
    const showFormMessage = (type, message) => {
        // Remove any existing message
        const existingMsg = bookingForm.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();

        // Create message element
        const msgEl = document.createElement('div');
        msgEl.className = `form-message form-message-${type}`;
        msgEl.innerHTML = `
            <div class="form-message-icon">${type === 'success' ? '✓' : '!'}</div>
            <div class="form-message-content">
                <strong>${type === 'success' ? 'Request Sent!' : 'Something went wrong'}</strong>
                <p>${message}</p>
            </div>
        `;

        // Insert before submit button
        submitButton.parentNode.insertBefore(msgEl, submitButton);

        // Auto-remove success message after 10 seconds
        if (type === 'success') {
            setTimeout(() => msgEl.remove(), 10000);
        }
    };

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
            showFormMessage('success', 'Thank you for your booking request! We\'ll contact you shortly to confirm your appointment.');

            // Reset form
            bookingForm.reset();

            // Scroll form into view
            bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            throw new Error(`Server responded with ${response.status}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showFormMessage('error', 'We couldn\'t send your request. Please call us directly on <a href="tel:07414452441">07414 452441</a> or try again in a moment.');
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
