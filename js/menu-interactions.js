// JavaScript file for menu item hover effects, filtering, and interactions

// Hover effect for menu items with smooth transitions
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.classList.add('hovered');
        item.style.transform = 'scale(1.05)'; // Slightly enlarge the item on hover
        item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        item.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow for depth
    });

    item.addEventListener('mouseleave', () => {
        item.classList.remove('hovered');
        item.style.transform = 'scale(1)'; // Reset size
        item.style.boxShadow = 'none'; // Remove shadow
    });
});

// Filter menu items by category (e.g., starters, main courses, desserts)
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCategoryItems = document.querySelectorAll('.menu-category');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        // Show or hide menu items based on the selected category
        menuCategoryItems.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease'; // Add fade-in animation
            } else {
                item.style.display = 'none';
            }
        });

        // Highlight the active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Optional: Add a default category display (if desired)
window.addEventListener('load', () => {
    const defaultCategory = 'all'; // Set this to any category you want to show by default
    document.querySelector(`[data-category="${defaultCategory}"]`).click();
});

// Search functionality for menu items
const searchInput = document.getElementById('menu-search');
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        menuCategoryItems.forEach(item => {
            const itemName = item.querySelector('.item-name').textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease'; // Add fade-in animation
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Health-specific meal filtering (e.g., diabetic-friendly, gluten-free)
const healthFilterButtons = document.querySelectorAll('.health-filter-btn');
if (healthFilterButtons.length > 0) {
    healthFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const healthCategory = button.getAttribute('data-health-category');

            // Show or hide menu items based on the selected health category
            menuCategoryItems.forEach(item => {
                if (healthCategory === 'all' || item.classList.contains(healthCategory)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease'; // Add fade-in animation
                } else {
                    item.style.display = 'none';
                }
            });

            // Highlight the active health filter button
            healthFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Add to cart functionality (example)
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-item-name');
            const itemPrice = button.getAttribute('data-item-price');

            alert(`Added ${itemName} ($${itemPrice}) to your cart!`);
            // Add logic to update the cart (e.g., via AJAX or localStorage)
        });
    });
}

// Fade-in animation for menu items
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(styleSheet);