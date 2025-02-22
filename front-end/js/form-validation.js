// JavaScript file for form input validation (e.g., booking form, contact form)

// Function to validate email format
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// Function to validate phone number format (example: +250 787173024)
function validatePhoneNumber(phone) {
    const phonePattern = /^\+250\s\d{9}$/;
    return phonePattern.test(phone);
}

// Function to check if a field is empty
function checkEmptyField(input) {
    return input.trim() !== '';
}

// Function to display error messages
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    // Remove existing error messages
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();

    // Add error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);

    // Highlight the input field
    input.classList.add('error');
}

// Function to clear error messages
function clearError(input) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    // Remove error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();

    // Remove error highlight
    input.classList.remove('error');
}

// Function to validate booking form
function validateBookingForm(event) {
    event.preventDefault(); // Prevent form submission to handle validation first

    // Get form input values
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const date = document.getElementById('date');
    const guests = document.getElementById('guests');

    let isValid = true;

    // Validate name
    if (!checkEmptyField(name.value)) {
        showError(name, 'Name is required.');
        isValid = false;
    } else {
        clearError(name);
    }

    // Validate email
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearError(email);
    }

    // Validate phone number
    if (!validatePhoneNumber(phone.value)) {
        showError(phone, 'Please enter a valid phone number (e.g., +250 787173024).');
        isValid = false;
    } else {
        clearError(phone);
    }

    // Validate booking date
    if (!checkEmptyField(date.value)) {
        showError(date, 'Please select a booking date.');
        isValid = false;
    } else {
        clearError(date);
    }

    // Validate number of guests
    if (!checkEmptyField(guests.value) || isNaN(guests.value) || guests.value <= 0) {
        showError(guests, 'Please enter a valid number of guests.');
        isValid = false;
    } else {
        clearError(guests);
    }

    // If all validations pass, submit the form (or handle further)
    if (isValid) {
        alert('Booking successfully submitted!');
        // For example, you could submit the form here:
        // document.getElementById('booking-form').submit();
    }
}

// Function to validate contact form
function validateContactForm(event) {
    event.preventDefault(); // Prevent form submission

    // Get form input values
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');

    let isValid = true;

    // Validate name
    if (!checkEmptyField(name.value)) {
        showError(name, 'Name is required.');
        isValid = false;
    } else {
        clearError(name);
    }

    // Validate email
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearError(email);
    }

    // Validate message
    if (!checkEmptyField(message.value)) {
        showError(message, 'Please enter a message.');
        isValid = false;
    } else {
        clearError(message);
    }

    // If all validations pass, submit the form (or handle further)
    if (isValid) {
        alert('Message successfully sent!');
        // For example, you could submit the form here:
        // document.getElementById('contact-form').submit();
    }
}

// Add event listeners to forms
document.getElementById('booking-form')?.addEventListener('submit', validateBookingForm);
document.getElementById('contact-form')?.addEventListener('submit', validateContactForm);

// Clear errors on input change
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        clearError(input);
    });
});