// get the date and time on form page load and send it to the html timestamp
document.addEventListener("DOMContentLoaded", () => {
    const timestampInput = document.getElementById("timestamp");
    const currentDateTime = new Date();
    // Format the timestamp as an ISO string (e.g., "2024-11-16T15:30:45.123Z")
    timestampInput.value = currentDateTime.toISOString();
});

// MODAL
const membershipInfo = document.querySelector("#membership-info");
const npCard = document.querySelector("#np-card");
const bronzeCard = document.querySelector("#bronze-card");
const silverCard = document.querySelector("#silver-card");
const goldCard = document.querySelector("#gold-card");

function openMembershipInfo(membership) {
    // Clear the modal content
    membershipInfo.innerHTML = '';

    // Add close button to the modal
    const closeModal = document.createElement('button');
    closeModal.setAttribute('id', 'close-modal');
    closeModal.innerHTML = '❌';
    membershipInfo.appendChild(closeModal);

    // Add elements for membership description
    const modalP = document.createElement('p');

    // Populate contents based on membership type
    switch (membership) {
        case 'np':
            modalP.innerHTML = 'Non-Profit Membership: Ideal for non-profit organizations with no membership fee.';
            break;
        case 'bronze':
            modalP.innerHTML = 'Bronze Membership: Basic membership offering standard benefits for small businesses.';
            break;
        case 'silver':
            modalP.innerHTML = 'Silver Membership: Enhanced membership with additional networking opportunities.';
            break;
        case 'gold':
            modalP.innerHTML = 'Gold Membership: Premium membership with exclusive perks and maximum visibility.';
            break;
        default:
            modalP.innerHTML = 'Invalid membership type selected.';
    }

    // Append description to the modal container
    membershipInfo.appendChild(modalP);

    // Display the populated modal
    membershipInfo.showModal();

    // Add event listener to close button
    closeModal.addEventListener('click', () => {
        membershipInfo.close();
    });
}

// Attach event listeners to each membership card
npCard.addEventListener('click', () => {
    openMembershipInfo('np');
});
bronzeCard.addEventListener('click', () => {
    openMembershipInfo('bronze');
});
silverCard.addEventListener('click', () => {
    openMembershipInfo('silver');
});
goldCard.addEventListener('click', () => {
    openMembershipInfo('gold');
});