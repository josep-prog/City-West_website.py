// Helper functions for form validation, data fetching, and other utilities

// Form validation function to check if all fields are filled
function validateForm(fields) {
    let isValid = true;

    fields.forEach(field => {
        const fieldElement = document.querySelector(`#${field}`);
        if (!fieldElement) return;

        const value = fieldElement.value.trim();
        if (!value) {
            isValid = false;
            showErrorMessage(field, 'This field is required.');
        } else {
            removeErrorMessage(field);
        }
    });

    return isValid;
}

// Show error message for invalid form fields
function showErrorMessage(field, message) {
    const fieldElement = document.querySelector(`#${field}`);
    if (!fieldElement) return;

    // Remove existing error message
    removeErrorMessage(field);

    // Create and append new error message
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    fieldElement.parentNode.appendChild(errorElement);

    // Highlight the input field
    fieldElement.classList.add('error');
}

// Remove error message when the field is corrected
function removeErrorMessage(field) {
    const fieldElement = document.querySelector(`#${field}`);
    if (!fieldElement) return;

    const errorElement = fieldElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }

    // Remove error highlight
    fieldElement.classList.remove('error');
}

// Function to fetch JSON data and populate content dynamically (e.g., for menu items)
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to format dates to a readable format (e.g., for events)
function formatDate(dateString, locale = 'en-US', options = { year: 'numeric', month: 'long', day: 'numeric' }) {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, options);
}

// Function to toggle the visibility of an element (for things like a mobile menu)
function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('hidden');
    }
}

// Utility function to generate a slug from a string (useful for URLs or IDs)
function generateSlug(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '') // Remove non-alphanumeric characters
        .replace(/\s+/g, '-')         // Replace spaces with hyphens
        .replace(/-+/g, '-');         // Remove consecutive hyphens
}

// Function to handle adding an item to the shopping cart (or similar task)
function addToCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(itemId)) {
        cart.push(itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart!');
    } else {
        alert('Item is already in the cart!');
    }
    updateCartCount();
}

// Function to remove an item from the shopping cart
function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item removed from cart!');
    updateCartCount();
}

// Function to update the cart count displayed on the page
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Function to clear the shopping cart
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
    alert('Cart cleared!');
}

// Function to initialize cart-related functionality
function initializeCart() {
    updateCartCount();
    document.addEventListener('DOMContentLoaded', updateCartCount);
}

// Function to debounce a function (useful for search or resize events)
function debounce(func, delay = 300) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Function to throttle a function (useful for scroll or mousemove events)
function throttle(func, limit = 300) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Text copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text:', err);
    });
}

// Initialize cart functionality on page load
initializeCart();