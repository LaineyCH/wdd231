document.getElementById('newsletter-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission to server

    // SUBMIT USER'S EMAIL TO 3RD PARTY SERVICE FOR NEWSLETTER DISTRIBUTION

    // Display the modal
    const modal = document.getElementById('newsletter-modal');
    modal.style.display = 'block';

    // Clear the email input field
    document.getElementById('email').value = '';

    // Close the modal when clicking the close button
    document.querySelector('.modal .close').addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});


