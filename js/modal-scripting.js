document.addEventListener('DOMContentLoaded', function () {
    console.log("Script Loaded Properly");

    // Function to handle modals
    const handleModal = () => {
        // Add click event listeners for each 'Learn More' button
        document.querySelectorAll('.cert-box-btn').forEach(function (button) {
            button.addEventListener('click', function () {
                const targetModalId = this.id.replace('btn', '-modal');
                const modal = document.getElementById(targetModalId);
                const overlay = document.getElementById('overlay');

                if (modal && overlay) {
                    modal.classList.add('active');
                    overlay.classList.add('active');
                    overlay.style.display = "block"; // Show the overlay
                }
            });
        });

        // Add event listeners to all close buttons
        document.querySelectorAll('.modal-close').forEach(function (closeButton) {
            closeButton.addEventListener('click', function () {
                const modal = this.closest('.modal');
                const overlay = document.getElementById('overlay');

                if (modal && overlay) {
                    modal.classList.remove('active');
                    overlay.classList.remove('active');
                    overlay.style.display = "none"; // Hide the overlay
                }
            });
        });
    };

    handleModal(); // Initialize modal handling

    // Observe dynamic content for modal functionality
    const observeDynamicContent = () => {
        const container = document.body; // Or the specific container where content is injected

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Reinitialize modal functionality for dynamically added elements
                    handleModal();
                }
            });
        });

        observer.observe(container, { childList: true, subtree: true });
    };

    observeDynamicContent(); // Observe dynamic content
});
