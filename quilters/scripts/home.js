// document.getElementById('newsletter-form').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent form submission to server
//
//     // SUBMIT EMAIL TO 3RD PARTY SERVICE
//
//     // Display the modal
//     const modal = document.getElementById('newsletter-modal');
//     modal.style.display = 'block';
//
//     // Clear the email input field
//     document.getElementById('email').value = '';
//
//     // Close the modal when clicking the close button
//     document.querySelector('.modal .close').addEventListener('click', function () {
//         modal.style.display = 'none';
//     });
//
//     // Close the modal when clicking outside the modal content
//     window.addEventListener('click', function (event) {
//         if (event.target === modal) {
//             modal.style.display = 'none';
//         }
//     });
// });

document.getElementById('newsletter-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;

    // Save state to localStorage
    localStorage.setItem('emailSubmitted', 'true');

    // Open the user's email client
    window.location.href = `mailto:ehenson1@byupathway.edu?subject=Newsletter%20Subscription&body=Please%20add%20${email}%20to%20the%20newsletter%20list.`;

    // Clear the email field
    document.getElementById('email').value = '';
});

// Function to show the modal if email submission is detected
function checkEmailSubmission() {
    const emailSubmitted = localStorage.getItem('emailSubmitted');

    if (emailSubmitted === 'true') {
        // Show the thank-you modal
        const modal = document.getElementById('newsletter-modal');
        modal.style.display = 'block';

        // Clear the state so the modal doesn't keep appearing
        localStorage.removeItem('emailSubmitted');
    }
}

// Close modal functionality
document.querySelector('.close-button').addEventListener('click', function () {
    const modal = document.getElementById('newsletter-modal');
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', function (event) {
    const modal = document.getElementById('newsletter-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Check for email submission state on page load
document.addEventListener('DOMContentLoaded', checkEmailSubmission);

