// Import Toastr.js (if using a module bundler like Webpack or Vite)
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

// Configure Toastr options
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-bottom-right', // Change position as needed
  timeOut: 5000, // Duration before disappearing (in milliseconds)
};

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle mobile navigation menu
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close menu when clicking outside of it (for mobile devices)
document.addEventListener('click', function (event) {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Scroll to top button functionality
const scrollToTopButton = document.getElementById('scrollToTopButton');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Replace alert with Toastr for button clicks
document.querySelectorAll('.btn-alert').forEach(button => {
    button.addEventListener('click', () => {
        toastr.info('Button clicked!');
    });
});

// Image carousel for showcasing food or rooms
let currentIndex = 0;
const carouselImages = document.querySelectorAll('.carousel-item');
const totalImages = carouselImages.length;

function showNextImage() {
    carouselImages[currentIndex].classList.remove('visible');
    currentIndex = (currentIndex + 1) % totalImages;
    carouselImages[currentIndex].classList.add('visible');
}

if (carouselImages.length > 0) {
    carouselImages[currentIndex].classList.add('visible');
    setInterval(showNextImage, 5000); // Change image every 5 seconds
}

// Form validation for contact and booking forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        let isValid = true;

        // Validate required fields
        form.querySelectorAll('input[required], textarea[required]').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        // Validate email format
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('error');
        } else if (emailInput) {
            emailInput.classList.remove('error');
        }

        if (!isValid) {
            e.preventDefault();
            toastr.error('Please fill out all required fields correctly.');
        } else {
            toastr.success('Form submitted successfully!');
        }
    });
});

// Dynamic room availability check (example)
const roomBookingForm = document.getElementById('room-booking-form');
if (roomBookingForm) {
    roomBookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const checkInDate = roomBookingForm.querySelector('#check-in-date').value;
        const checkOutDate = roomBookingForm.querySelector('#check-out-date').value;

        // Simulate room availability check
        if (checkInDate && checkOutDate) {
            toastr.info(`Checking availability for ${checkInDate} to ${checkOutDate}...`);
            // Add AJAX call to backend for real availability check
        } else {
            toastr.warning('Please select check-in and check-out dates.');
        }
    });
}

// Health-specific meal selection (example)
const healthMealForm = document.getElementById('health-meal-form');
if (healthMealForm) {
    healthMealForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const healthCondition = healthMealForm.querySelector('#health-condition').value;

        if (healthCondition) {
            toastr.info(`Customizing meals for ${healthCondition}...`);
            // Add logic to filter or customize meals based on health condition
        } else {
            toastr.warning('Please select a health condition.');
        }
    });
}

// Event registration form (example)
const eventRegistrationForm = document.getElementById('event-registration-form');
if (eventRegistrationForm) {
    eventRegistrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const eventName = eventRegistrationForm.querySelector('#event-name').value;
        const attendeeName = eventRegistrationForm.querySelector('#attendee-name').value;

        if (eventName && attendeeName) {
            toastr.success(`Registering ${attendeeName} for ${eventName}...`);
            // Add AJAX call to backend for event registration
        } else {
            toastr.error('Please fill out all required fields.');
        }
    });
}

// Customer feedback submission (example)
const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const feedbackMessage = feedbackForm.querySelector('#feedback-message').value;

        if (feedbackMessage) {
            toastr.success('Thank you for your feedback!');
            // Add AJAX call to backend to submit feedback
        } else {
            toastr.warning('Please provide your feedback.');
        }
    });
}

// Dark mode toggle (optional feature)
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Lazy loading for images (improves page load performance)
document.addEventListener('DOMContentLoaded', function () {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const lazyLoad = (image) => {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.onload = () => {
            image.removeAttribute('data-src');
        };
    };

    const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target);
                lazyImageObserver.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach((image) => {
        lazyImageObserver.observe(image);
    });
});